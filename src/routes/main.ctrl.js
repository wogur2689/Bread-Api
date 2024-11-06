"use strict";

const log = require("../util/logUtil");

//api
const process = {
    /**
     * health check ping
     */
    ping: async (req, res) => {
        log.logInfo("GET / ping");
        const url = {
            method:"GET",
            path:"/api/ping",
            status: 200,
        }

        return res.status(url.status); //json 반환
    }
}
//index.js에서 사용하기 위해 모듈로 주입
module.exports = process;