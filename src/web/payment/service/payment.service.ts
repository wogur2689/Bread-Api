import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction, PaymentStatus } from '../entity/transaction.entity';
import { PaymentRequestDto, PaymentCallbackDto, TransactionDto, PaymentCancelDto } from '../dto/payment.dto';
import * as CryptoJS from 'crypto-js';
import axios from 'axios';

@Injectable()
export class PaymentService {
    private readonly logger = new Logger(PaymentService.name);
    private readonly nicepayMerchantKey: string;
    private readonly nicepayMid: string;

    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,
    ) {
        // 환경 변수에서 나이스페이 설정 로드
        this.nicepayMerchantKey = process.env.NICEPAY_MERCHANT_KEY || '';
        this.nicepayMid = process.env.NICEPAY_MID || '';
        
        if (!this.nicepayMerchantKey) {
            this.logger.warn('나이스페이 상점키가 설정되지 않았습니다. NICEPAY_MERCHANT_KEY 환경 변수를 확인하세요.');
        }
    }

    /**
     * 나이스페이 EdiDate 생성
     * EdiDate = YYYYMMDDHHMISS (요청 시간)
     */
    generateEdiDate(date: Date = new Date()): string {
        const yyyy = date.getFullYear().toString();
        const mm = (date.getMonth() + 1).toString().padStart(2, '0');
        const dd = date.getDate().toString().padStart(2, '0');
        const hh = date.getHours().toString().padStart(2, '0');
        const mi = date.getMinutes().toString().padStart(2, '0');
        const ss = date.getSeconds().toString().padStart(2, '0');
        return `${yyyy}${mm}${dd}${hh}${mi}${ss}`;
    }

    /**
     * 나이스페이 Amt 12자리 포맷 (매뉴얼: 12 byte, 제로패딩)
     * 폼 전송값과 SignData 계산 시 반드시 동일한 문자열 사용해야 위변조 검증 통과
     */
    formatAmt12(amount: number): string {
        return String(amount).padStart(12, '0');
    }

    /**
     * 나이스페이 SignData 생성 (위변조 검증 데이터)
     * SignData = hex(sha256(EdiDate + MID + Amt + MerchantKey))
     * - Amt: 반드시 12자리 제로패딩 (formatAmt12 사용)
     * - EdiDate: YYYYMMDDHHMISS 14자
     */
    generateSignData(ediDate: string, amt12: string): string {
        const mid = this.nicepayMid || 'nictest00m';
        const key = this.nicepayMerchantKey || '';
        if (!mid) {
            this.logger.warn('나이스페이 MID가 설정되지 않았습니다.');
            return '';
        }
        const merchantKey = key || (mid.toLowerCase() === 'nictest00m' ? 'EYzu8jGGMfqaDEp76gSckuvnaHHu+bC4opsSN6lHv3b2lurNYkVXrZ7Z1AoqQnXI3eLuaUFyoRNC6FkrzVjceg==' : '');
        if (!merchantKey) {
            this.logger.warn('나이스페이 상점키가 설정되지 않았습니다. NICEPAY_MERCHANT_KEY 환경 변수를 확인하세요.');
            return '';
        }
        const plainText = `${ediDate}${mid}${amt12}${merchantKey}`;
        const signData = CryptoJS.SHA256(plainText).toString(CryptoJS.enc.Hex);
        this.logger.debug(`SignData plainText(Amt 제외) length: ${plainText.length}, amt12: ${amt12}`);
        return signData;
    }

    /**
     * 주문(결제 요청) 생성
     * 결제 대기 상태로 거래내역 저장
     */
    async createPaymentRequest(dto: PaymentRequestDto): Promise<TransactionDto> {
        try {
            // 주문번호 생성 (Moid)
            const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

            this.logger.log(`orderID : orderId=${orderId}`);
            this.logger.log('결제 totalAmt ', dto.productName);
            
            const transaction = this.transactionRepository.create({
                orderId: orderId,
                orderNo: dto.orderNo || orderId,
                productId: dto.productId,
                productName: dto.productName,
                quantity: dto.quantity,
                totalAmt: dto.totalAmt,
                paymentStatus: PaymentStatus.PENDING,
                userId: dto.userId || null,
            });

            const saved = await this.transactionRepository.save(transaction);
            this.logger.log(`결제 요청 생성: orderId=${orderId}, totalAmt=${dto.totalAmt}`);

            return this.toDto(saved);
        } catch (error) {
            this.logger.error(`결제 요청 생성 실패: ${error.message}`, error.stack);
            throw error;
        }
    }

    /**
     * 나이스페이 승인 응답 Signature 검증
     * Signature = hex(sha256(TID + MID + Amt + MerchantKey))
     */
    private verifyPaymentSignature(tid: string, mid: string, amt: string, signature: string): boolean {
        if (!signature || !this.nicepayMerchantKey) return true;
        const calculated = CryptoJS.SHA256(`${tid}${mid}${amt}${this.nicepayMerchantKey}`).toString(CryptoJS.enc.Hex);
        return calculated.toLowerCase() === signature.toLowerCase();
    }

    /**
     * 결제 완료 콜백 처리
     * 나이스페이에서 받은 결제 결과로 거래내역 업데이트
     */
    async processPaymentCallback(callbackDto: PaymentCallbackDto): Promise<TransactionDto> {
        try {
            // 주문번호(Moid)로 거래내역 조회
            const transaction = await this.transactionRepository.findOne({
                where: { orderId: callbackDto.Moid }
            });

            if (!transaction) {
                this.logger.error(`거래내역을 찾을 수 없음: orderId=${callbackDto.Moid}`);
                throw new NotFoundException(`거래내역을 찾을 수 없습니다: ${callbackDto.Moid}`);
            }

            // 승인 응답 위변조(Signature) 검증 (응답에 Signature/MID가 있는 경우)
            if (callbackDto.Signature && callbackDto.MID && callbackDto.TID) {
                const ok = this.verifyPaymentSignature(callbackDto.TID, callbackDto.MID, callbackDto.Amt, callbackDto.Signature);
                if (!ok) {
                    this.logger.error(`결제 Signature 위변조 검증 실패: orderId=${callbackDto.Moid}`);
                    throw new BadRequestException('결제 데이터 위변조가 감지되었습니다.');
                }
            }

            // 금액 검증 (DB에 저장된 금액과 일치하는지 확인)
            if (transaction.totalAmt !== parseInt(callbackDto.Amt)) {
                this.logger.error(`결제 금액 불일치: DB=${transaction.totalAmt}, 받은 금액=${callbackDto.Amt}`);
                throw new BadRequestException('결제 금액이 일치하지 않습니다.');
            }

            // 결제 성공 여부 확인 (결제수단별 성공코드)
            const payMethod = (callbackDto.PayMethod || '').toUpperCase();
            const isSuccess =
                (payMethod === 'CARD' && callbackDto.ResultCode === '3001') ||
                (payMethod === 'BANK' && callbackDto.ResultCode === '4000') ||
                (payMethod === 'VBANK' && callbackDto.ResultCode === '4100') ||
                (payMethod === 'CELLPHONE' && callbackDto.ResultCode === 'A000') ||
                // 일부 간편결제/계좌는 0000으로 오는 경우가 있어 보수적으로 허용
                (callbackDto.ResultCode === '0000');

            // 거래내역 업데이트
            transaction.tid = callbackDto.TID;
            transaction.resultCode = callbackDto.ResultCode;
            transaction.resultMsg = callbackDto.ResultMsg;
            transaction.paymentMethod = callbackDto.PayMethod;
            transaction.cardCode = callbackDto.CardCode || null;
            transaction.cardName = callbackDto.CardName || null;
            
            if (isSuccess) {
                transaction.paymentStatus = PaymentStatus.COMPLETED;
            } else {
                // 결제 실패 시 상태만 업데이트 (실제로 결제가 안 된 것이므로 취소 불필요)
                transaction.paymentStatus = PaymentStatus.FAILED;
                this.logger.warn(`결제 실패: orderId=${callbackDto.Moid}, ResultCode=${callbackDto.ResultCode}, ResultMsg=${callbackDto.ResultMsg}`);
            }

            // 승인일시 파싱 (YYYYMMDDHHmmss 형식)
            if (callbackDto.AuthDate) {
                const authDateStr = callbackDto.AuthDate;
                const year = authDateStr.substring(0, 4);
                const month = authDateStr.substring(4, 6);
                const day = authDateStr.substring(6, 8);
                const hour = authDateStr.substring(8, 10);
                const minute = authDateStr.substring(10, 12);
                const second = authDateStr.substring(12, 14);
                transaction.approvedAt = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);
            }

            const updated = await this.transactionRepository.save(transaction);
            this.logger.log(`결제 완료 처리: orderId=${callbackDto.Moid}, status=${updated.paymentStatus}`);

            return this.toDto(updated);
        } catch (error) {
            this.logger.error(`결제 완료 처리 실패: ${error.message}`, error.stack);
            throw error;
        }
    }

    /**
     * 거래내역 조회 (주문번호로)
     */
    async getTransactionByOrderId(orderId: string): Promise<TransactionDto | null> {
        try {
            const transaction = await this.transactionRepository.findOne({
                where: { orderId }
            });

            return transaction ? this.toDto(transaction) : null;
        } catch (error) {
            this.logger.error(`거래내역 조회 실패: ${error.message}`, error.stack);
            throw error;
        }
    }

    /**
     * 거래내역 조회 (ID로)
     */
    async getTransactionById(id: number): Promise<TransactionDto | null> {
        try {
            const transaction = await this.transactionRepository.findOne({
                where: { id }
            });

            return transaction ? this.toDto(transaction) : null;
        } catch (error) {
            this.logger.error(`거래내역 조회 실패: ${error.message}`, error.stack);
            throw error;
        }
    }

    /**
     * 사용자 거래내역 목록 조회
     */
    async getTransactionsByUserId(userId: number): Promise<TransactionDto[]> {
        try {
            const transactions = await this.transactionRepository.find({
                where: { userId },
                order: { createdAt: 'DESC' }
            });

            return transactions.map(t => this.toDto(t));
        } catch (error) {
            this.logger.error(`거래내역 목록 조회 실패: ${error.message}`, error.stack);
            throw error;
        }
    }

    /**
     * 나이스페이 결제 취소 API 호출
     * 실제 나이스페이 취소 API를 호출하여 결제를 취소합니다.
     */
    private async callNicePayCancelApi(tid: string, cancelAmt: number, cancelReason: string): Promise<any> {
        try {
            // 나이스페이 취소 API 엔드포인트 (실제 URL로 변경 필요)
            const cancelUrl = process.env.NICEPAY_CANCEL_URL || 'https://webapi.nicepay.co.kr/webapi/cancel_process.jsp';
            
            // 취소 요청 데이터 생성
            const cancelData = {
                TID: tid,
                MID: this.nicepayMid,
                CancelAmt: cancelAmt.toString(),
                CancelMsg: cancelReason,
                PartialCancelCode: cancelAmt > 0 ? '1' : '0', // 부분취소 여부
            };

            // EdiDate 생성 (취소 검증용)
            const ediDateString = tid + cancelAmt.toString() + this.nicepayMerchantKey;
            const ediDate = CryptoJS.SHA256(ediDateString).toString(CryptoJS.enc.Hex).toUpperCase();
            cancelData['EdiDate'] = ediDate;

            this.logger.log(`나이스페이 취소 API 호출: TID=${tid}, CancelAmt=${cancelAmt}`);

            // 나이스페이 취소 API 호출
            const response = await axios.post(cancelUrl, cancelData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            this.logger.log(`나이스페이 취소 API 응답: ${JSON.stringify(response.data)}`);
            return response.data;
        } catch (error) {
            this.logger.error(`나이스페이 취소 API 호출 실패: ${error.message}`, error.stack);
            throw error;
        }
    }

    /**
     * 결제 취소 처리
     * 완료된 결제를 취소합니다 (전체 취소 또는 부분 취소)
     */
    async cancelPayment(cancelDto: PaymentCancelDto): Promise<TransactionDto> {
        try {
            // 거래내역 조회
            const transaction = await this.transactionRepository.findOne({
                where: { orderId: cancelDto.orderId }
            });

            if (!transaction) {
                throw new NotFoundException(`거래내역을 찾을 수 없습니다: ${cancelDto.orderId}`);
            }

            // 취소 가능 여부 확인
            if (transaction.paymentStatus !== PaymentStatus.COMPLETED) {
                throw new BadRequestException(`취소할 수 없는 결제 상태입니다. 현재 상태: ${transaction.paymentStatus}`);
            }

            if (!transaction.tid) {
                throw new BadRequestException('거래번호(TID)가 없어 취소할 수 없습니다.');
            }

            // 취소 금액 설정 (부분 취소 또는 전체 취소)
            const cancelAmt = cancelDto.cancelAmt || transaction.totalAmt;
            
            if (cancelAmt > transaction.totalAmt - (transaction.cancelAmt || 0)) {
                throw new BadRequestException('취소 금액이 남은 결제 금액을 초과합니다.');
            }

            // 나이스페이 취소 API 호출
            const cancelResult = await this.callNicePayCancelApi(
                transaction.tid,
                cancelAmt,
                cancelDto.cancelReason
            );

            // 취소 결과 확인 (나이스페이 응답 코드 확인 필요)
            const isCancelSuccess = cancelResult?.ResultCode === '2001'; // 나이스페이 취소 성공 코드 (실제 코드 확인 필요)

            if (!isCancelSuccess) {
                this.logger.error(`나이스페이 취소 실패: ${JSON.stringify(cancelResult)}`);
                throw new BadRequestException(`결제 취소 실패: ${cancelResult?.ResultMsg || '알 수 없는 오류'}`);
            }

            // 거래내역 업데이트
            transaction.cancelAmt = (transaction.cancelAmt || 0) + cancelAmt;
            transaction.cancelReason = cancelDto.cancelReason;

            // 전체 취소인 경우 상태 변경
            if (transaction.cancelAmt >= transaction.totalAmt) {
                transaction.paymentStatus = PaymentStatus.CANCELLED;
            }

            const updated = await this.transactionRepository.save(transaction);
            this.logger.log(`결제 취소 완료: orderId=${cancelDto.orderId}, cancelAmt=${cancelAmt}`);

            return this.toDto(updated);
        } catch (error) {
            this.logger.error(`결제 취소 처리 실패: ${error.message}`, error.stack);
            throw error;
        }
    }

    /**
     * 결제 실패 시 자동 취소 처리 (필요한 경우)
     * 주의: 일반적으로 결제 실패는 결제가 진행되지 않은 것이므로 취소가 필요 없습니다.
     * 하지만 부분 승인 후 실패한 경우 등 특수 상황에서 사용할 수 있습니다.
     */
    async autoCancelOnFailure(orderId: string, reason: string = '결제 실패로 인한 자동 취소'): Promise<void> {
        try {
            const transaction = await this.transactionRepository.findOne({
                where: { orderId }
            });

            if (!transaction) {
                this.logger.warn(`자동 취소 대상 거래내역을 찾을 수 없음: orderId=${orderId}`);
                return;
            }

            // 이미 완료된 결제이고 TID가 있는 경우에만 취소 시도
            if (transaction.paymentStatus === PaymentStatus.COMPLETED && transaction.tid) {
                this.logger.log(`결제 실패로 인한 자동 취소 시도: orderId=${orderId}`);
                await this.cancelPayment({
                    orderId: orderId,
                    cancelReason: reason,
                });
            } else {
                this.logger.log(`자동 취소 불필요: orderId=${orderId}, status=${transaction.paymentStatus}`);
            }
        } catch (error) {
            this.logger.error(`자동 취소 처리 실패: ${error.message}`, error.stack);
            // 자동 취소 실패는 로그만 남기고 예외를 던지지 않음 (결제 실패 처리에 영향 주지 않도록)
        }
    }

    /**
     * Entity를 DTO로 변환
     */
    private toDto(transaction: Transaction): TransactionDto {
        return {
            id: transaction.id,
            orderId: transaction.orderId,
            orderNo: transaction.orderNo,
            productId: transaction.productId,
            productName: transaction.productName,
            quantity: transaction.quantity,
            totalAmt: transaction.totalAmt,
            paymentStatus: transaction.paymentStatus,
            tid: transaction.tid,
            resultCode: transaction.resultCode,
            resultMsg: transaction.resultMsg,
            paymentMethod: transaction.paymentMethod,
            cardCode: transaction.cardCode,
            cardName: transaction.cardName,
            approvedAt: transaction.approvedAt,
            userId: transaction.userId,
            cancelAmt: transaction.cancelAmt,
            cancelReason: transaction.cancelReason,
            createdAt: transaction.createdAt,
            updatedAt: transaction.updatedAt,
        };
    }
}
