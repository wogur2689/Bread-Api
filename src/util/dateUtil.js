"use strict"; //ECMA 스크립트 문법 준수
//자바스크립트 파일을 만들시에는 써줘야함.
const moment = require("moment");

const dateUtil = {
    /**
     * date -> String
     * @param {*} date 
     * @returns 
     */
    DateToString: (date) => {
        return moment(date).toString();
    },

    /**
     * yyyy-mm-dd
     * @param {*} date 
     * @returns 
     */
    getDateStrYYYYMMDD: (date) => {
        var year = date.getFullYear();
        var month = ("0"+(date.getMonth()+1)).slice(-2);
        var day = ("0"+date.getDate()).slice(-2);
        return ( year + '-' + month + '-' + day );
    },

    /**
     * 몇일 전 날짜
     * @param {*} days (일)
     * @returns 
     */
    prevDay: (days) => {
        var d = new Date();
        var prev = new Date(d);
        prev.setDate(d.getDate() - parseInt(days));
        return prev;
    },

    /**
     * 몇개월 전 날짜
     * @param {*} month (월)
     * @returns 
     */
    prevMonth: (month) => {
        var d = new Date();
        var prev = new Date(d);
        prev.setMonth(d.getMonth() + 1 - parseInt(month));
        return prev;
    }
}

module.exports = dateUtil;