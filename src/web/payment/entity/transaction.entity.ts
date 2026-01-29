import { BaseTimeEntity } from "src/common/entity/time.entity";
import { Column, Entity, PrimaryGeneratedColumn, Index } from "typeorm";

export enum PaymentStatus {
    PENDING = 'PENDING',           // 결제 대기
    COMPLETED = 'COMPLETED',       // 결제 완료
    FAILED = 'FAILED',             // 결제 실패
    CANCELLED = 'CANCELLED',        // 결제 취소
}

@Entity()
@Index(['orderId'])  // 주문번호로 빠른 조회를 위한 인덱스
@Index(['tid'])      // TID로 빠른 조회를 위한 인덱스
export class Transaction extends BaseTimeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    // 주문 정보
    @Column({ name: 'order_id', type: 'varchar', length: 100, nullable: false, comment: '나이스페이 주문번호(Moid)' })
    orderId: string;

    @Column({ name: 'order_no', type: 'varchar', length: 100, nullable: true, comment: '내부 주문번호' })
    orderNo: string;

    @Column({ name: 'product_id', type: 'int', nullable: true, comment: '상품 ID' })
    productId: number;

    @Column({ name: 'product_name', type: 'varchar', length: 200, nullable: false, comment: '상품명' })
    productName: string;

    @Column({ name: 'quantity', type: 'int', nullable: false, default: 1, comment: '수량' })
    quantity: number;

    @Column({ name: 'total_amt', type: 'bigint', nullable: false, comment: '총 결제 금액' })
    totalAmt: number;

    // 결제 정보
    @Column({ 
        name: 'payment_status', 
        type: 'enum', 
        enum: PaymentStatus, 
        default: PaymentStatus.PENDING,
        nullable: false,
        comment: '결제 상태'
    })
    paymentStatus: PaymentStatus;

    @Column({ name: 'tid', type: 'varchar', length: 100, nullable: true, comment: '나이스페이 거래번호(TID)' })
    tid: string;

    @Column({ name: 'result_code', type: 'varchar', length: 10, nullable: true, comment: '결제 결과 코드' })
    resultCode: string;

    @Column({ name: 'result_msg', type: 'varchar', length: 500, nullable: true, comment: '결제 결과 메시지' })
    resultMsg: string;

    @Column({ name: 'payment_method', type: 'varchar', length: 50, nullable: true, comment: '결제 수단 (CARD, BANK, VBANK 등)' })
    paymentMethod: string;

    @Column({ name: 'card_code', type: 'varchar', length: 50, nullable: true, comment: '카드사 코드' })
    cardCode: string;

    @Column({ name: 'card_name', type: 'varchar', length: 100, nullable: true, comment: '카드사명' })
    cardName: string;

    @Column({ name: 'approved_at', type: 'datetime', nullable: true, comment: '결제 승인 일시' })
    approvedAt: Date;

    @Column({ name: 'user_id', type: 'bigint', nullable: true, comment: '사용자 ID (선택사항)' })
    userId: number;

    @Column({ name: 'cancel_amt', type: 'bigint', nullable: true, default: 0, comment: '취소 금액' })
    cancelAmt: number;

    @Column({ name: 'cancel_reason', type: 'varchar', length: 500, nullable: true, comment: '취소 사유' })
    cancelReason: string;
}
