"use strict"; //ECMA 스크립트 문법 준수
//자바스크립트 파일을 만들시에는 써줘야함.

//모듈
const express = require('express');
const dotenv = require("dotenv");
const cors = require('cors');
const session = require('express-session');
const app = express();

dotenv.config();

//라우팅
const routes = require('./src/routes');

//cors
const corsOptions = {
    origin: process.env.FRONT_END_URL, // 허용할 도메인
    credentials: true, // 쿠키를 공유하기 위해 설정
    optionsSuccessStatus: 200 // 일부 오래된 브라우저를 위한 옵션
};

app.use(cors(corsOptions));

//세션
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // HTTPS를 사용하는 경우 true로 설정
}));

//app 세팅
app.use(express.urlencoded({ extended: true })); //URL을 통해 전달되는 데이터 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(express.json()); //json데이터 파싱

app.use("/", routes); //미들웨어 등록

module.exports = app;