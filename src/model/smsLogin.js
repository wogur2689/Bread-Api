"use strict";

/**
 * Spring의 service 로직
 * 해당 데이터를 가지고 검증 및 조작
 */
const logger = require("../config/logger");
const dataStorage = require("./dataStorage");
const OAuth2Server = require('oauth2-server');

class NaverLogin {
    constructor(body) {
        this.body = body; //기본생성자
    }

    // naver guide oauth2
    // We support returning promises.
    getAccessToken() {
        return new Promise('works!');
    }
    
    // Or, calling a Node-style callback.
    getAuthorizationCode(done) {
        done(null, 'works!');
    }
    
    // Or, using generators.
    getClient(clientId, clientSecret) {
        // DB 등에서 정보를 가져와 client Object를 만들어 반환
        return new Promise(client);
    }
    
    // Or, async/wait (using Babel).
    async getUser() {
        await somethingAsync();
        return 'works!';
    }
}

class KaKaoLogin {
    constructor(body) {
        this.body = body; //기본생성자
    }
    //requestCodeUrl = 'https://kauth.kakao.com/oauth/authorize'
}

module.exports = {
    NaverLogin,
    KaKaoLogin
};