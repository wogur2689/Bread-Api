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
    static userSave(param) { 
        return new Promise((resolve, reject) => {
            const query = loadQuery('insertUserInfo');
            db.query(query, [param.userId, param.name, param.pwd, param.age, param.phone, param.address], (err, data) => {
                if(err) reject(`${err}`);
                else resolve({code : "0000", msg : "success"});
            });
        });
    }

    static getPw(param) {
        return new Promise((resolve, reject) => {
            const query = loadQuery('selectGetPwd');
            db.query(query, param.userId, (err, data) => {
                if(err) reject(`${err}`);
                else {
                    if(data.length > 0) {
                        if(param.pwd == data[0].pwd) {
                            resolve({code : "0000", msg : "success"})
                        }
                        else {
                            resolve({code : "1001", msg : "비밀번호가 틀립니다."});
                        }
                    }
                    else resolve({code : "1002", msg : "입력하신 아이디는 없는 사용자입니다."}); 
                }
            });
        });
    }
}

module.exports = LoginRepository;