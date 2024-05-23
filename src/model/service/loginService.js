"use strict";

/**
 * Spring의 service 로직
 * 해당 데이터를 가지고 검증 및 조작
 */
const { logInfo } = require("../../util/logUtil");
const LoginRepository = require("../repository/loginRepository");

class Login {
    constructor(body) {
        this.body = body; //기본생성자
    }

    //회원가입
    async signUp() {
        const client = this.body;
        try {
            const response = await LoginRepository.userSave(client);
            logInfo(`데이터`);
            logInfo(response);
            return response;
        } catch (err) {
            return { success: false, msg: err}
        }
    }

    //로그인
    async login() {
        const client = this.body;
        try {
            const response = await LoginRepository.getPw(client);
            logInfo(`${response.json} 데이터 `); 
            return response;
        } catch (err) {
            return { success: false, msg: err}
        } 
    }
}

module.exports = Login;