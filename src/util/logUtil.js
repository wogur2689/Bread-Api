"use strict";
const logger = require('../config/logger');

//log 출력
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

// info
const logInfo = (data) => {
    logger.info(data);
}

const logError = (data) => {
    logger.error(data);
}

module.exports = { log, logInfo, logError };