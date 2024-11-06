"use strict";

const { log, logInfo } = require("../util/logUtil");
const logger = require("../config/logger");

//api
const process = {
    //menuList
    menu: async (req, res) => {
        // const service = new loginService(req.body);
        // let response = await service.login();
        let response = null;
        const url = {
            method:"POST",
            path:"/api/gnbMenu",
            status: response.err ? 500 : 200,
        }
        log(response, url);
        return res.status(url.status).json(response); //json 반환
    }
}

module.exports = process;