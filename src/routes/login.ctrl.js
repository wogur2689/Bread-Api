"use strict";

const log = require("../util/logUtil");
const loginService = require("../model/service/loginService");
//const smsLogin = require("../model/smsLogin");

//고정변수
const title = "Login"

//api
const process = {

    //로그인
    login: async (req, res) => {
        
        const url = {
            method:"POST",
            path:"/login",
            status: response.err ? 500 : 200,
        }
        log(response, url);
        return res.status(url.status).json(response); //json 반환
    },

    //회원가입
    signUp: async (req, res) => {
        const service = new loginService(req.body);
        let response = service.signUp();
        const url = {
            method:"POST",
            path:"/signUp",
            status: response.err ? 500 : 200,
        }
        log(response, url);
        return res.status(url.status).json(response); //json 반환
    }
}

// const oauth = new OAuth2Server({model: smsLogin});  // 앞서 구현된 Model Object를 전달

// function authorizeHandler(options) {
//     return function(req, res, next) {
//         let request = new Request(req);
//         let response = new Response(res);
//         return oauth.authorize(request, response, options) // oauth.authorize 를 호출함으로써 앞서 구현하였던 Model 들이 내부적으로 호출되고 authorization code 발급을 실시
//             .then(function(code) {
//                 res.locals.oauth = {code: code};
//                 next();
//             })
//             .catch(function(err) {
//                 // handle error condition
//             });
//     }
// }

//index.js에서 사용하기 위해 모듈로 주입
module.exports = process;