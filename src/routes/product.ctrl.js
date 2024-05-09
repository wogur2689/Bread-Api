"use strict"; //ECMA 스크립트 문법 준수
//자바스크립트 파일을 만들시에는 써줘야함.

const log = require("../util/logUtil");
const Product = require("../model/service/loginService");

//고정변수
//api
const productCtrl = {
    /**
     * 상품 리스트 출력
     */
    create: async (req, res) => {
        const product = new Product(req.body); //서비스 객체 생성
        //1. DB 데이터 갖고 오기
        const response = await daily.create();

        const url = {
            method:"POST",
            path:"/create",
            status: response.err ? 404 : 200,
        }

        log(response, url);
        return res.status(url.status).json(response); //json 반환
    },

    /**
     * 일기 수정
     */
    update: async (req, res) => {
        const daily = new Daily(req.body); //서비스 객체 생성
        const response = await daily.update(); //수정

        const url = {
            method:"POST",
            path:"/update",
            status: response.err ? 404 : 200,
        }

        log(response, url);
        return res.status(url.status).json(response); //json 반환
    },

    /**
     * 일기 삭제
     */
    delete: async (req, res) => {
        const daily = new Daily(req.body); //서비스 객체 생성
        const response = await daily.delete();

        const url = {
            method:"POST",
            path:"/delete",
            status: response.err ? 404 : 200,
        }

        log(response, url);
        return res.status(url.status).json(response); //json 반환
    }
}


//index.js에서 사용하기 위해 모듈로 주입
module.exports = productCtrl;