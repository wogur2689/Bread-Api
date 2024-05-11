"use strict";

const { getManager } = require("typeorm");
/**
 * DB를 CRUD하는 역할만 수행
 * Spring의 Repository, dao
 */
//const { myDataSource } = require('../../config/db.js');
const User = require("../entity/User.js");
const { myDataSource } = require("../../config/db.js");
// #변수 : public -> private로 접근 지정
const entityManager = myDataSource.manager;

class LoginRepository {

    //회원가입
    static userSave(data) { 
        return entityManager.save(data);
        // return new Promise((resolve, reject) => { //resolve는 성공을, reject는 실패를 반환
        //     const query = loadQuery('insertUserInfo');
        //     db.query(query, data, (err, data) => {
        //         if(err) reject(`${err}`);
        //         else resolve(data);
        //     });
        // });
    }

    static getPw(data) {
        return entityManager.getRepository(User).findOneBy({pwd : data});
        // return new Promise((resolve, reject) => { //resolve는 성공을, reject는 실패를 반환
        //     const query = loadQuery('login');
        //     db.query(query, data.user_id ,(err, data) => {
        //         if(err) reject(`${err}`);
        //         else resolve(data);
        //     });
        // });
    }
}

module.exports = LoginRepository;