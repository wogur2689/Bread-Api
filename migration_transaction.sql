-- Transaction 테이블 마이그레이션 SQL
-- 나이스페이 결제를 위한 거래내역 테이블 구조 업데이트
-- 실행 전에 기존 컬럼이 있는지 확인하고, 없을 경우에만 실행하세요.

-- 기존 컬럼 수정
ALTER TABLE `transaction` 
    MODIFY COLUMN `order_id` VARCHAR(100) NOT NULL COMMENT '나이스페이 주문번호(Moid)',
    MODIFY COLUMN `order_no` VARCHAR(100) NULL COMMENT '내부 주문번호',
    MODIFY COLUMN `name` VARCHAR(200) NOT NULL COMMENT '상품명',
    MODIFY COLUMN `total_amt` BIGINT NOT NULL COMMENT '총 결제 금액',
    MODIFY COLUMN `amt` BIGINT NULL COMMENT '결제한 금액',
    MODIFY COLUMN `cnt` INT NOT NULL DEFAULT 1 COMMENT '수량';

-- 새로운 컬럼 추가 (컬럼이 이미 있으면 에러가 발생할 수 있습니다)
ALTER TABLE `transaction`
    ADD COLUMN `product_id` INT NULL COMMENT '상품 ID' AFTER `order_no`,
    ADD COLUMN `product_name` VARCHAR(200) NULL COMMENT '상품명' AFTER `product_id`,
    ADD COLUMN `quantity` INT NOT NULL DEFAULT 1 COMMENT '수량' AFTER `product_name`,
    ADD COLUMN `payment_status` ENUM('PENDING', 'COMPLETED', 'FAILED', 'CANCELLED') NOT NULL DEFAULT 'PENDING' COMMENT '결제 상태' AFTER `total_amt`,
    ADD COLUMN `tid` VARCHAR(100) NULL COMMENT '나이스페이 거래번호(TID)' AFTER `payment_status`,
    ADD COLUMN `result_code` VARCHAR(10) NULL COMMENT '결제 결과 코드' AFTER `tid`,
    ADD COLUMN `result_msg` VARCHAR(500) NULL COMMENT '결제 결과 메시지' AFTER `result_code`,
    ADD COLUMN `payment_method` VARCHAR(50) NULL COMMENT '결제 수단 (CARD, BANK, VBANK 등)' AFTER `result_msg`,
    ADD COLUMN `card_code` VARCHAR(50) NULL COMMENT '카드사 코드' AFTER `payment_method`,
    ADD COLUMN `card_name` VARCHAR(100) NULL COMMENT '카드사명' AFTER `card_code`,
    ADD COLUMN `approved_at` DATETIME NULL COMMENT '결제 승인 일시' AFTER `card_name`,
    ADD COLUMN `user_id` BIGINT NULL COMMENT '사용자 ID (선택사항)' AFTER `approved_at`,
    ADD COLUMN `cancel_amt` BIGINT NULL DEFAULT 0 COMMENT '취소 금액' AFTER `user_id`,
    ADD COLUMN `cancel_reason` VARCHAR(500) NULL COMMENT '취소 사유' AFTER `cancel_amt`;

-- 인덱스 추가 (인덱스가 이미 있으면 에러가 발생할 수 있습니다)
CREATE INDEX `idx_order_id` ON `transaction` (`order_id`);
CREATE INDEX `idx_tid` ON `transaction` (`tid`);
CREATE INDEX `idx_user_id` ON `transaction` (`user_id`);
CREATE INDEX `idx_payment_status` ON `transaction` (`payment_status`);

-- 기존 데이터 마이그레이션
UPDATE `transaction` SET `product_name` = `name` WHERE `product_name` IS NULL;
UPDATE `transaction` SET `quantity` = `cnt` WHERE `quantity` IS NULL OR `quantity` = 1;
