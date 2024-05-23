"use strict";

/**
 * DB를 CRUD하는 역할만 수행
 * Spring의 Repository, dao
 */
const db = require("../../config/db");
const { logInfo } = require("../../util/logUtil");
const loadQuery = require("../query/queryLoader");
// #변수 : public -> private로 접근 지정
//resolve는 성공을, reject는 실패를 반환

class LoginRepository {

    //회원가입
    static userSave(data) { 
        return new Promise((resolve, reject) => {
            const query = loadQuery('insertUserInfo');
            db.query(query, [data.userId, data.name, data.pwd, data.age, data.phone, data.address], (err, data) => {
                if(err) reject(`${err}`);
                else resolve(data);
            });
        });
    }

    static getPw(data) {
        return new Promise((resolve, reject) => {
            const query = loadQuery('login');
            db.query(query, data.userId ,(err, data) => {
                if(err) reject(`${err}`);
                else resolve(data);
            });
        });
    }
}

module.exports = LoginRepository;