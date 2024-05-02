"use strict";

/**
 * Spring의 service 로직
 * 해당 데이터를 가지고 검증 및 조작
 */
const logger = require("../../config/logger");
const LoginDao = require("../dao/loginDao");
const OAuth2Server = require('oauth2-server');

class Daily {
    constructor(body) {
        this.body = body; //기본생성자
    }

    //회원가입
    async signUp() {
        const client = this.body;
        try {
            const response = await LoginDao.userSave(client);
            return response;
        } catch (err) {
            return { success: false, msg: err}
        }
    }

    //로그인
    async login() {
        const client = this.body;
        try {
            const response = await LoginDao.create(client);
            return response;
        } catch (err) {
            return { success: false, msg: err}
        } 
    }
}

module.exports = Daily;