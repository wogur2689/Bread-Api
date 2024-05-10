"use strict"; //ECMA 스크립트 문법 준수
//자바스크립트 파일을 만들시에는 써줘야함.

//모듈
const express = require('express');
const { createConnection } = require('typeorm');
const dotenv = require("dotenv");
dotenv.config();
const app = express();

//라우팅
//const home = require('./src/routes/main');
const login = require('./src/routes');

//app 세팅
//app.engine('html', require('ejs').renderFile);
app.use(express.urlencoded({ extended: true })); //URL을 통해 전달되는 데이터 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(express.json()); //json데이터 파싱
//app.use("/", home); //미들웨어 등록
app.use("/login", login); //미들웨어 등록

createConnection()
    .then(async (connection) => {
        console.log('Database connected');
    })
    .catch((error) => {
        console.error('Error connecting to database:', error);
    }
);

module.exports = app;