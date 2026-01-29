import { PaymentStatus } from '../entity/transaction.entity';

// 주문 요청 DTO
export class PaymentRequestDto {
    productId: number;
    productName: string;
    quantity: number;
    totalAmt: number;
    orderNo?: string;
    userId?: number;
}

// 결제 완료 콜백 DTO (나이스페이 응답)
export class PaymentCallbackDto {
    ResultCode: string;        // 결과코드
    ResultMsg: string;         // 결과메시지
    TID: string;               // 거래번호
    Moid: string;              // 주문번호
    Amt: string;               // 금액
    PayMethod: string;         // 결제수단
    CardCode?: string;         // 카드사코드
    CardName?: string;         // 카드사명
    AuthDate?: string;         // 승인일시 (YYYYMMDDHHmmss)
    AuthCode?: string;         // 승인번호
    BuyerName?: string;        // 구매자명
    BuyerTel?: string;         // 구매자전화번호
    BuyerEmail?: string;       // 구매자이메일
}

// 거래내역 조회 DTO
export class TransactionDto {
    id: number;
    orderId: string;
    orderNo: string;
    productId: number;
    productName: string;
    quantity: number;
    totalAmt: number;
    paymentStatus: PaymentStatus;
    tid: string;
    resultCode: string;
    resultMsg: string;
    paymentMethod: string;
    cardCode: string;
    cardName: string;
    approvedAt: Date;
    userId: number;
    cancelAmt: number;
    createdAt: Date;
    updatedAt: Date;
}

// 기존 productDto (유지)
export class productDto {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    desc: string;
}
