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
  `created_at` datetime(6) NOT NULL,
  `created_by` varchar(10) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(10) DEFAULT NULL,
  `amt` bigint DEFAULT NULL,
  `cnt` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `order_id` varchar(255) DEFAULT NULL,
  `order_no` varchar(255) DEFAULT NULL,
  `total_amt` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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

