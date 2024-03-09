"use strict"; //ECMA 스크립트 문법 준수
//자바스크립트 파일을 만들시에는 써줘야함.

const app = require("../app");
const logger = require("../src/config/logger"); //로그 관리 모듈

const PORT = process.env.PORT || 3000; //서버 포트 default 3000
/* 이프로젝트는 로컬 프로젝트라 env설정은 따로 없음. */

app.listen(PORT, () => {
    logger.info(`${PORT} 포트에서 서버가 가동되었습니다.`);
});