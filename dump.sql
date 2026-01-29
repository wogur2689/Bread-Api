-- bread.board definition

CREATE TABLE `board` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `created_by` varchar(10) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(10) DEFAULT NULL,
  `contents` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- bread.log_history definition

CREATE TABLE `log_history` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `created_by` varchar(10) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(10) DEFAULT NULL,
  `contents` varchar(255) NOT NULL,
  `subject` varchar(50) NOT NULL,
  `log_name` varchar(50) NOT NULL,
  `log_type` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- bread.menu definition

CREATE TABLE `menu` (
  `menu_role` varchar(255) NOT NULL,
  `is_visible` varchar(1) NOT NULL DEFAULT 'N',
  `sort_order` int DEFAULT NULL,
  `menu_desc` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `created_by` varchar(20) NOT NULL DEFAULT 'system',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `updated_by` varchar(20) NOT NULL DEFAULT 'system',
  `menu_name` varchar(100) NOT NULL,
  `menu_level` varchar(2) NOT NULL,
  `menu_url` varchar(512) NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `parent_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- bread.product definition

CREATE TABLE `product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `created_by` varchar(10) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(10) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` bigint DEFAULT NULL,
  `desc` varchar(200) DEFAULT NULL COMMENT '상세설명',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- bread.`transaction` definition

CREATE TABLE `transaction` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `amt` bigint DEFAULT NULL COMMENT '결제한 금액',
  `cnt` int NOT NULL DEFAULT '1' COMMENT '수량',
  `order_id` varchar(100) NOT NULL COMMENT '나이스페이 주문번호(Moid)',
  `order_no` varchar(100) DEFAULT NULL COMMENT '내부 주문번호',
  `product_id` int DEFAULT NULL COMMENT '상품 ID',
  `product_name` varchar(200) DEFAULT NULL COMMENT '상품명',
  `quantity` int NOT NULL DEFAULT '1' COMMENT '수량',
  `total_amt` bigint NOT NULL COMMENT '총 결제 금액',
  `payment_status` enum('PENDING','COMPLETED','FAILED','CANCELLED') NOT NULL DEFAULT 'PENDING' COMMENT '결제 상태',
  `tid` varchar(100) DEFAULT NULL COMMENT '나이스페이 거래번호(TID)',
  `result_code` varchar(10) DEFAULT NULL COMMENT '결제 결과 코드',
  `result_msg` varchar(500) DEFAULT NULL COMMENT '결제 결과 메시지',
  `payment_method` varchar(50) DEFAULT NULL COMMENT '결제 수단 (CARD, BANK, VBANK 등)',
  `card_code` varchar(50) DEFAULT NULL COMMENT '카드사 코드',
  `card_name` varchar(100) DEFAULT NULL COMMENT '카드사명',
  `approved_at` datetime DEFAULT NULL COMMENT '결제 승인 일시',
  `user_id` bigint DEFAULT NULL COMMENT '사용자 ID (선택사항)',
  `cancel_amt` bigint DEFAULT '0' COMMENT '취소 금액',
  `cancel_reason` varchar(500) DEFAULT NULL COMMENT '취소 사유',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `created_by` varchar(20) NOT NULL DEFAULT 'system',
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `updated_by` varchar(20) NOT NULL DEFAULT 'system',
  PRIMARY KEY (`id`),
  KEY `idx_order_id` (`order_id`),
  KEY `idx_tid` (`tid`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_payment_status` (`payment_status`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- bread.users definition

CREATE TABLE `users` (
  `user_id` varchar(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `created_by` varchar(20) NOT NULL DEFAULT 'system',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `updated_by` varchar(20) NOT NULL DEFAULT 'system',
  `password` varchar(200) NOT NULL,
  `email` varchar(50) NOT NULL,
  `nick_name` varchar(20) NOT NULL,
  `birth_date` varchar(20) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `address` varchar(200) NOT NULL,
  `role` varchar(20) NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

