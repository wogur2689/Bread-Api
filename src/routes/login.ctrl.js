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
            path:"/api/login",
            status: response.err ? 500 : 200,
        }
        log(response, url);
        //로그인 성공시 세션에 유저정보 저장
        if(response.code == "0000") {
            req.session.user = { id: req.body.userId };
        }
        return res.status(url.status).json(response); //json 반환
    },

    //회원가입
    signUp: async (req, res) => {
        const service = new loginService(req.body);
        let response = await service.signUp();
    
        const url = {
            method:"POST",
            path:"/api/signUp",
            status: response.err ? 500 : 200,
        }
        log(response, url);
        return res.status(url.status).json(response); //json 반환
    },

    //마이페이지 데이터
    mypage: async (req, res) => {
        let response = 200;
        const url = {
            method:"POST",
            path:"/api/getMyPageData",
            status: response.err ? 500 : 200,
        }
        log(response, url);
        return res.status(url.status).json(response); //json 반환
    },

    //마이페이지 정보 수정
    myPageUpdate: async (req, res) => {
        let response = 200;
        const url = {
            method:"POST",
            path:"/api/myPageUpdate",
            status: response.err ? 500 : 200,
        }
        log(response, url);
        return res.status(url.status).json(response); //json 반환
    },

    //로그인 세션 인증
    protected: (req, res) => {
        if (req.session.user) {
            res.json({ code: '0000', msg: 'Access granted', user: req.session.user });
        } else {
            res.status(401).json({ code: '1003', msg: '로그인 해주세요.' });
        }
    }
}

module.exports = process;