"use strict";

const ApiUtil = {

    commonReturn: (res, url, response) => {
        return res.status(url.status).json(response)
    },

    commonDataReturn: (res, url, response) => {
        return res.status(url.status).json(response)
    }
};

module.exports = ApiUtil;