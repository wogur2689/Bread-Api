"use strict";

const { log, logInfo } = require("../util/logUtil");
const loginService = require("../model/service/loginService");
const logger = require("../config/logger");

//api
const process = {

    //로그인
    login: async (req, res) => {
        const service = new loginService(req.body);
        let response = await service.login();
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
        let response = await service.signUp();
    
        const url = {
            method:"POST",
            path:"/signUp",
            status: response.err ? 500 : 200,
        }
        log(response, url);
        return res.status(url.status).json(response); //json 반환
    }
}

module.exports = process;