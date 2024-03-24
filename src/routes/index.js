"use strict"; //ECMA 스크립트 문법 준수
//자바스크립트 파일을 만들시에는 써줘야함.

const express = require('express'); //express import
const router = express.Router(); //express import
const ctrl = require('./main/main.ctrl'); //import

//라우팅하는 것들은 라우트에서 관리
//get방식 통신 
// 첫번째는 url, 두번째는 서버로 보낼 요청값과 결과값

router.post("/create", ctrl.process.create);
router.post("/update", ctrl.process.update);
router.post("/delete", ctrl.process.delete);

//이미지 불러오기
// router.get("/image/:name", (req, res) => {
//     fs.readFile("./resouces/img/" + req.params.name, (err, data) => {
//         res.writeHead(200, {'Context-Type':'text/html'});
//         res.end(data);
//     }) 
// });

module.exports = router; //모듈로 던지기