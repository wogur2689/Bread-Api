CREATE TABLE IF NOT EXISTS `faq` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category` varchar(50) NOT NULL,
  `question` varchar(200) NOT NULL,
  `answer` text NOT NULL,
  `is_visible` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(10) NOT NULL DEFAULT 'system',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_faq_visible_order` (`is_visible`, `sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `faq` (`category`, `question`, `answer`, `sort_order`) VALUES
('주문/결제', '주문 후 결제 수단을 변경할 수 있나요?', '결제 완료 후에는 결제 수단을 변경할 수 없습니다. 주문을 취소한 뒤 다시 주문해 주세요.', 10),
('배송/픽업', '주문한 빵은 언제 받을 수 있나요?', '상품과 매장 운영 상황에 따라 준비 시간이 달라질 수 있으며, 주문 상세 화면에서 상태를 확인할 수 있습니다.', 20),
('취소/환불', '주문 취소는 어떻게 하나요?', '상품 준비 전에는 마이페이지의 주문 내역에서 취소할 수 있습니다. 준비가 시작된 뒤에는 고객센터로 문의해 주세요.', 30);
