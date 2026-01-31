import { Controller, Post, Get, Body, Param, Logger, Query } from '@nestjs/common';
import { PaymentService } from '../service/payment.service';
import { PaymentRequestDto, PaymentCallbackDto, TransactionDto, PaymentCancelDto, PaymentInfoDto } from '../dto/payment.dto';
import { ApiRes, createApiDataRes } from 'src/common/api/apiResponse';
import { ApiResCode } from 'src/common/api/apiResCode';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}
    private readonly logger = new Logger(PaymentController.name);

    /**
     * 주문(결제 요청) 생성
     * 결제 대기 상태로 거래내역 저장
     */
    @Post('request')
    @ApiOperation({ summary: '결제 요청 생성' })
    @ApiResponse({ status: 200, description: '결제 요청이 성공적으로 생성되었습니다' })
    @ApiBody({ type: PaymentRequestDto })
    async createPaymentRequest(@Body() dto: PaymentRequestDto): Promise<ApiRes<TransactionDto>> {
        try {
            const result = await this.paymentService.createPaymentRequest(dto);
            this.logger.log(`결제 요청 생성 성공: orderId=${result.orderId}`);
            return createApiDataRes(ApiResCode.API_0000.code, ApiResCode.API_0000.msg, result);
        } catch (error) {
            this.logger.error(`결제 요청 생성 실패: ${error.message}`);
            return createApiDataRes(
                ApiResCode.API_9999.code, 
                `결제 요청 생성 실패: ${error.message}`, 
                null
            );
        }
    }

    /**
     * 결제 정보 조회 (EdiDate 포함)
     * 프론트엔드에서 결제창 호출 시 필요한 정보를 반환
     */
    @Get('info/:orderId')
    @ApiOperation({ summary: '결제 정보 조회 (EdiDate 포함)' })
    @ApiResponse({ status: 200, description: '결제 정보 조회 성공' })
    async getPaymentInfo(@Param('orderId') orderId: string): Promise<ApiRes<PaymentInfoDto>> {
        try {
            const transaction = await this.paymentService.getTransactionByOrderId(orderId);
            
            if (!transaction) {
                return createApiDataRes(
                    ApiResCode.API_9999.code, 
                    '거래내역을 찾을 수 없습니다.', 
                    null
                );
            }

            // EdiDate/Amt(12자리)/SignData 생성 - 폼에 넣는 Amt와 SignData 계산에 쓰는 Amt가 동일해야 위변조 검증 통과
            const ediDate = this.paymentService.generateEdiDate();
            const amt12 = this.paymentService.formatAmt12(transaction.totalAmt);
            const signData = this.paymentService.generateSignData(ediDate, amt12);

            const paymentInfo: PaymentInfoDto = {
                orderId: transaction.orderId,
                mid: process.env.NICEPAY_MID || 'nictest00m',
                moid: transaction.orderId,
                amt: amt12,
                goodsName: transaction.productName,
                ediDate: ediDate,
                signData: signData,
                payMethod: 'CARD',
                returnUrl: process.env.NICEPAY_RETURN_URL || 'http://localhost:3000/payment/success',
            };

            return createApiDataRes(ApiResCode.API_0000.code, ApiResCode.API_0000.msg, paymentInfo);
        } catch (error) {
            this.logger.error(`결제 정보 조회 실패: ${error.message}`);
            return createApiDataRes(
                ApiResCode.API_9999.code, 
                `결제 정보 조회 실패: ${error.message}`, 
                null
            );
        }
    }

    /**
     * 결제 완료 콜백 (나이스페이에서 호출)
     * POST 또는 GET 방식으로 받을 수 있도록 구현
     */
    @Post('callback')
    @ApiOperation({ summary: '결제 완료 콜백 (POST)' })
    @ApiResponse({ status: 200, description: '결제 완료 처리가 완료되었습니다' })
    async paymentCallbackPost(@Body() callbackDto: PaymentCallbackDto): Promise<ApiRes<TransactionDto>> {
        try {
            this.logger.log(`결제 콜백 수신 (POST): Moid=${callbackDto.Moid}, ResultCode=${callbackDto.ResultCode}`);
            const result = await this.paymentService.processPaymentCallback(callbackDto);
            return createApiDataRes(ApiResCode.API_0000.code, ApiResCode.API_0000.msg, result);
        } catch (error) {
            this.logger.error(`결제 콜백 처리 실패: ${error.message}`);
            return createApiDataRes(
                ApiResCode.API_9999.code, 
                `결제 콜백 처리 실패: ${error.message}`, 
                null
            );
        }
    }

    /**
     * 결제 완료 콜백 (GET 방식 - 나이스페이 ReturnURL)
     */
    @Get('callback')
    @ApiOperation({ summary: '결제 완료 콜백 (GET)' })
    @ApiResponse({ status: 200, description: '결제 완료 처리가 완료되었습니다' })
    async paymentCallbackGet(@Query() query: any): Promise<ApiRes<TransactionDto>> {
        try {
            // GET 파라미터를 PaymentCallbackDto 형식으로 변환
            const callbackDto: PaymentCallbackDto = {
                ResultCode: query.ResultCode,
                ResultMsg: query.ResultMsg,
                TID: query.TID,
                Moid: query.Moid,
                Amt: query.Amt,
                PayMethod: query.PayMethod,
                MID: query.MID,
                Signature: query.Signature,
                CardCode: query.CardCode,
                CardName: query.CardName,
                AuthDate: query.AuthDate,
                AuthCode: query.AuthCode,
                BuyerName: query.BuyerName,
                BuyerTel: query.BuyerTel,
                BuyerEmail: query.BuyerEmail,
            };

            this.logger.log(`결제 콜백 수신 (GET): Moid=${callbackDto.Moid}, ResultCode=${callbackDto.ResultCode}`);
            const result = await this.paymentService.processPaymentCallback(callbackDto);
            return createApiDataRes(ApiResCode.API_0000.code, ApiResCode.API_0000.msg, result);
        } catch (error) {
            this.logger.error(`결제 콜백 처리 실패: ${error.message}`);
            return createApiDataRes(
                ApiResCode.API_9999.code, 
                `결제 콜백 처리 실패: ${error.message}`, 
                null
            );
        }
    }

    /**
     * 거래내역 조회 (주문번호로)
     */
    @Get('transaction/:orderId')
    @ApiOperation({ summary: '거래내역 조회 (주문번호)' })
    @ApiResponse({ status: 200, description: '거래내역 조회 성공' })
    async getTransactionByOrderId(@Param('orderId') orderId: string): Promise<ApiRes<TransactionDto>> {
        try {
            const result = await this.paymentService.getTransactionByOrderId(orderId);
            if (!result) {
                return createApiDataRes(
                    ApiResCode.API_9999.code, 
                    '거래내역을 찾을 수 없습니다.', 
                    null
                );
            }
            return createApiDataRes(ApiResCode.API_0000.code, ApiResCode.API_0000.msg, result);
        } catch (error) {
            this.logger.error(`거래내역 조회 실패: ${error.message}`);
            return createApiDataRes(
                ApiResCode.API_9999.code, 
                `거래내역 조회 실패: ${error.message}`, 
                null
            );
        }
    }

    /**
     * 거래내역 조회 (ID로)
     */
    @Get('transaction/id/:id')
    @ApiOperation({ summary: '거래내역 조회 (ID)' })
    @ApiResponse({ status: 200, description: '거래내역 조회 성공' })
    async getTransactionById(@Param('id') id: number): Promise<ApiRes<TransactionDto>> {
        try {
            const result = await this.paymentService.getTransactionById(id);
            if (!result) {
                return createApiDataRes(
                    ApiResCode.API_9999.code, 
                    '거래내역을 찾을 수 없습니다.', 
                    null
                );
            }
            return createApiDataRes(ApiResCode.API_0000.code, ApiResCode.API_0000.msg, result);
        } catch (error) {
            this.logger.error(`거래내역 조회 실패: ${error.message}`);
            return createApiDataRes(
                ApiResCode.API_9999.code, 
                `거래내역 조회 실패: ${error.message}`, 
                null
            );
        }
    }

    /**
     * 사용자 거래내역 목록 조회
     */
    @Get('transactions/user/:userId')
    @ApiOperation({ summary: '사용자 거래내역 목록 조회' })
    @ApiResponse({ status: 200, description: '거래내역 목록 조회 성공' })
    async getTransactionsByUserId(@Param('userId') userId: number): Promise<ApiRes<TransactionDto[]>> {
        try {
            const result = await this.paymentService.getTransactionsByUserId(userId);
            return createApiDataRes(ApiResCode.API_0000.code, ApiResCode.API_0000.msg, result);
        } catch (error) {
            this.logger.error(`거래내역 목록 조회 실패: ${error.message}`);
            return createApiDataRes(
                ApiResCode.API_9999.code, 
                `거래내역 목록 조회 실패: ${error.message}`, 
                null
            );
        }
    }

    /**
     * 결제 취소
     * 완료된 결제를 취소합니다 (전체 취소 또는 부분 취소)
     */
    @Post('cancel')
    @ApiOperation({ summary: '결제 취소' })
    @ApiResponse({ status: 200, description: '결제 취소가 완료되었습니다' })
    @ApiBody({ type: PaymentCancelDto })
    async cancelPayment(@Body() cancelDto: PaymentCancelDto): Promise<ApiRes<TransactionDto>> {
        try {
            this.logger.log(`결제 취소 요청: orderId=${cancelDto.orderId}, cancelAmt=${cancelDto.cancelAmt || '전체'}`);
            const result = await this.paymentService.cancelPayment(cancelDto);
            return createApiDataRes(ApiResCode.API_0000.code, ApiResCode.API_0000.msg, result);
        } catch (error) {
            this.logger.error(`결제 취소 실패: ${error.message}`);
            return createApiDataRes(
                ApiResCode.API_9999.code, 
                `결제 취소 실패: ${error.message}`, 
                null
            );
        }
    }
}
