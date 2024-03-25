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

    //유저정보 보기
    static getProductDetail(data) {
        return new Promise((resolve, reject) => { //resolve는 성공을, reject는 실패를 반환
            const query = loadQuery('getUserInfo');;
            db.query(query, data.id ,(err, data) => {
                if(err) reject(`${err}`);
                else resolve(data);
            });
        });
    }
}

module.exports = ProductDao;