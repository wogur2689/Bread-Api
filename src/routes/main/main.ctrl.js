"use strict"; //ECMA 스크립트 문법 준수
//자바스크립트 파일을 만들시에는 써줘야함.

const logger = require("../../../config/logger");
const Daily = require("../../../model/login");

//고정변수
const title = "My Diary"

//page
const output = {
    /**
     * 시작페이지(main 컨트롤러 함수)
     * @param {\} req 
     * @param {*} res 
     */
    mainPage: async (req, res) => {
        logger.info(`GET / "메인 화면"`);
        const daily = new Daily(req.body); //서비스 객체 생성
        let response = await daily.getDailyList(); //전체 데이터 읽어오기
        res.render("main/index", {
            title: title,
            code: "success",
            dailys: response
        }) //파일 랜더링
    },

    /**
     * 일기 쓰기
     * @param {\} req 
     * @param {*} res 
     */
    writePage: (req, res) => {
        logger.info(`GET /write "일기 작성화면"`);
        res.render("main/write", {
            title: title,
            code: "success"
        }) //파일 랜더링
    },

    /**
     * 일기 읽기
     * @param {\} req 
     * @param {*} res
     */
    readPage: async(req, res) => {
        logger.info(`GET /read "일기 내용"`);
        const daily = new Daily(req.params); //서비스 객체 생성
        let response = await daily.read();
  
        res.render("main/read", {
            title: title,
            code: "success",
            daily: response[0]
        }) //파일 랜더링
    },
}

//api
const process = {
    /**
     * 일기 저장
     */
    create: async (req, res) => {
        const daily = new Daily(req.body); //서비스 객체 생성
        const response = await daily.create();

        const url = {
            method:"POST",
            path:"/create",
            status: response.err ? 400 : 200,
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
            status: response.err ? 400 : 200,
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
            status: response.err ? 400 : 200,
        }

        log(response, url);
        return res.status(url.status).json(response); //json 반환
    }
}


//index.js에서 사용하기 위해 모듈로 주입
module.exports = {
    output,
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