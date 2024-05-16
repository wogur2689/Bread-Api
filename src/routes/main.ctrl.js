"use strict";

const { response } = require("../../app");
const log = require("../util/logUtil");

//api
const process = {
    /**
     * health check ping
     */
    create: async (req, res) => {
        const url = {
            method:"GET",
            path:"/ping",
            status: response.err ? 500 : 200,
        }

        log(response, url);
        return res.status(url.status).json(response); //json 반환
    }
}
//index.js에서 사용하기 위해 모듈로 주입
module.exports = process;