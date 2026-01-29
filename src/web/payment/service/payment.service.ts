import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction, PaymentStatus } from '../entity/transaction.entity';
import { PaymentRequestDto, PaymentCallbackDto, TransactionDto } from '../dto/payment.dto';

@Injectable()
export class PaymentService {
    private readonly logger = new Logger(PaymentService.name);

    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,
    ) {}

    /**
     * 주문(결제 요청) 생성
     * 결제 대기 상태로 거래내역 저장
     */
    async createPaymentRequest(dto: PaymentRequestDto): Promise<TransactionDto> {
        try {
            // 주문번호 생성 (Moid)
            const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            
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

            // 결제 성공 여부 확인
            const isSuccess = callbackDto.ResultCode === '3001'; // 나이스페이 성공 코드 (실제 코드 확인 필요)

            // 거래내역 업데이트
            transaction.tid = callbackDto.TID;
            transaction.resultCode = callbackDto.ResultCode;
            transaction.resultMsg = callbackDto.ResultMsg;
            transaction.paymentMethod = callbackDto.PayMethod;
            transaction.cardCode = callbackDto.CardCode || null;
            transaction.cardName = callbackDto.CardName || null;
            transaction.paymentStatus = isSuccess ? PaymentStatus.COMPLETED : PaymentStatus.FAILED;

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
            createdAt: transaction.createdAt,
            updatedAt: transaction.updatedAt,
        };
    }
}
