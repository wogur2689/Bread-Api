"use strict"; //ECMA 스크립트 문법 준수
//자바스크립트 파일을 만들시에는 써줘야함.

const express = require('express'); //express import
const router = express.Router();
const mainCtrl = require('./main.ctrl');
const loginCtrl = require('./login.ctrl');
const menuCtrl = require('./menu.ctrl');

//라우팅하는 것들은 라우트에서 관리
//첫번째는 url, 두번째는 서버로 보낼 요청값과 결과값
//여기선 전부 api니 기본적으로 /api를 붙일것.
router.get("/api/ping", mainCtrl.ping);
router.get("/api/loginCheck", loginCtrl.isLogin);
router.get("/api/getMypageData", loginCtrl.mypage);

router.post("/api/login", loginCtrl.login);
router.post("/api/signUp", loginCtrl.signUp);
router.post("/api/myPageUpdate", loginCtrl.myPageUpdate);
router.post("/api/gnbMenu", menuCtrl.menu);

//이미지 불러오기
// router.get("/image/:name", (req, res) => {
//     fs.readFile("./resouces/img/" + req.params.name, (err, data) => {
//         res.writeHead(200, {'Context-Type':'text/html'});
//         res.end(data);
//     }) 
// });

module.exports = router; //모듈로 던지기