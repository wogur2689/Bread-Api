"use strict";

/**
 * Spring의 service 로직
 * 해당 데이터를 가지고 검증 및 조작
 */
const logger = require("../../config/logger");
const productDao = require("../dao/productDao");

class ProductService {
    constructor(body) {
        this.body = body; //기본생성자
    }

    //상품 리스트
    async getProductList() {
        const client = this.body; //클라이언트 값
        try {
            const data = await productDao.getProductList(client);
            return data;
        }
        catch (err) {
            return { success: false, msg: err };
        }
    }

    //상품 상세정보
    async getProductDetail() {
        const client = this.body; //클라이언트 값
        try {
            const data = await productDao.getProductDetail(client);
            return data;
        }
        catch (err) {
            return { success: false, msg: err };
        }
    }

}

module.exports = ProductService;