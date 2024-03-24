"use strict";

/**
 * DB를 CRUD하는 역할만 수행
 * Spring의 Repository, dao
 */
const db = require("../../config/db");
const logger = require("../../config/logger");
const dateUtil = require("../util/dateUtil.js");
const loadQuery = require('../query/queryLoader');
// #변수 : public -> private로 접근 지정

class ProductDao {
    //상품 리스트 조회
    static getProductList(data) {
        //처음에는 생성된지 1달치만 조회.
        var a = data.a;
        var b = data.b;
        if(typeof a == "undefined" || typeof b == "undefined") {
            a = dateUtil.getDateStrYYYYMMDD(dateUtil.prevMonth(3));
            b = dateUtil.getDateStrYYYYMMDD(dateUtil.prevMonth(0));
        }

        return new Promise((resolve, reject) => { //resolve는 성공을, reject는 실패를 반환
            const query = loadQuery('getProductList');
            db.query(query, [a, b], (err, data) => {
                if(err) reject(`${err}`);
                else resolve(data);
            });
        });
    }

    //상품정보 상세보기
    static getProductDetail(data) {
        return new Promise((resolve, reject) => { //resolve는 성공을, reject는 실패를 반환
            const query = loadQuery('getProductDetail');;
            db.query(query, data.id ,(err, data) => {
                if(err) reject(`${err}`);
                else resolve(data);
            });
        });
    }
}

module.exports = ProductDao;