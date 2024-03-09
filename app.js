"use strict"; //ECMA 스크립트 문법 준수
//자바스크립트 파일을 만들시에는 써줘야함.

//모듈
const express = require('express');
// const bodyParser = require('body-parser');
const dotenv = require("dotenv");
dotenv.config();
const app = express();

//라우팅
const home = require('./src/routes/main');

//app 세팅
app.engine('html', require('ejs').renderFile);
// app.set("views", "./src/views"); //경로
// app.set("view engine", "ejs"); //확장자
app.use(express.urlencoded({ extended: true })); //URL을 통해 전달되는 데이터 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(express.json()); //json데이터 파싱
/* bodyParser은 미들웨어 등록 이전에 선언해야 함. 안그러면 api통신시 req.body에서 undefined 뜸.*/
//이제 express에 bodyParser이 포함된듯?
app.use("/", home); //미들웨어 등록
app.use("/", express.static(__dirname+'/src/public')); //정적 경로 추가
//app.use(bodyParser.json()); //json데이터 파싱
//app.use(bodyParser.urlencoded({ extended: true }));

app.locals.moment = require('moment');//날짜 형식 변환 ejs에 내려줌.

module.exports = app;