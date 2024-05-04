"use strict"; //ECMA 스크립트 문법 준수
//자바스크립트 파일을 만들시에는 써줘야함.

const logger = require("../../../config/logger");
const Daily = require("../../../model/login");
const smsLogin = require("../../model/smsLogin");

//고정변수
const title = "Login"

//api
const process = {

    //로그인
    login: async (req, res) => {
        const userData = new Daily(req.body);
        const url = {
            method:"POST",
            path:"/login",
            status: response.err ? 404 : 200,
        }
        log(response, url);
        return res.status(url.status).json(response); //json 반환
    },

    //회원가입
    signUp: async (req, res) => {
        const userData = new Daily(req.body);
        const url = {
            method:"POST",
            path:"/signUp",
            status: response.err ? 404 : 200,
        }
        log(response, url);
        return res.status(url.status).json(response); //json 반환
    }
}

const oauth = new OAuth2Server({model: smsLogin});  // 앞서 구현된 Model Object를 전달

function authorizeHandler(options) {
    return function(req, res, next) {
        let request = new Request(req);
        let response = new Response(res);
        return oauth.authorize(request, response, options) // oauth.authorize 를 호출함으로써 앞서 구현하였던 Model 들이 내부적으로 호출되고 authorization code 발급을 실시
            .then(function(code) {
                res.locals.oauth = {code: code};
                next();
            })
            .catch(function(err) {
                // handle error condition
            });
    }
}

//index.js에서 사용하기 위해 모듈로 주입
module.exports = {
    process
};

//로그 출력
const log = (response, url) => {
    if (response.err) {
        logger.error(
            `${url.method} ${url.path} ${url.status} Response: ${response.success} ${response.err}`
        );
    } else {
        logger.info(
            `${url.method} ${url.path} ${url.status} Response: ${response.success} ${response.msg || ""}`
        );
    }
};