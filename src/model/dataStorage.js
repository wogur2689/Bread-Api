"use strict";

/**
 * DB를 CRUD하는 역할만 수행
 * Spring의 Repository, dao
 */
const db = require("../config/db");
const logger = require("../config/logger");
const dateUtil = require("../util/dateUtil.js");
// #변수 : public -> private로 접근 지정

class DataStorage {
    //일기 리스트 조회
    static getDailyList(data) {
        //처음에는 생성된지 1달치만 조회.
        var a = data.a;
        var b = data.b;
        if(typeof a == "undefined" || typeof b == "undefined") {
            a = dateUtil.getDateStrYYYYMMDD(dateUtil.prevMonth(3));
            b = dateUtil.getDateStrYYYYMMDD(dateUtil.prevMonth(0));
        }

        return new Promise((resolve, reject) => { //resolve는 성공을, reject는 실패를 반환
            const query = "SELECT * FROM daily Where create_at between ? and ?";
            db.query(query, [a, b], (err, data) => {
                if(err) reject(`${err}`);
                else resolve(data);
            });
        });
    }

    //일기 내용보기
    static read(data) {
        return new Promise((resolve, reject) => { //resolve는 성공을, reject는 실패를 반환
            const query = "SELECT * FROM daily Where id = ? LIMIT 1";
            db.query(query, data.id ,(err, data) => {
                if(err) reject(`${err}`);
                else resolve(data);
            });
        });
    }

    //일기 저장
    static async create(data) {
        const today = dateUtil.getDateStrYYYYMMDD(dateUtil.prevDay(0));
        return new Promise((resolve, reject) => { //resolve는 성공을, reject는 실패를 반환
            const query = "INSERT INTO daily(title, user_name, content, create_at, update_at) VALUES( ?, ?, ?, ?, ?)";
            db.query(query, [data.title, data.userName, data.content, today, today], (err, data) => {
                if(err) reject(err);
                else resolve({ success: true });
            });
        });
    }

    //일기 수정
    static async update(data) {
        const today = dateUtil.getDateStrYYYYMMDD(dateUtil.prevDay(0));
        logger.info(today);
        return new Promise((resolve, reject) => { //resolve는 성공을, reject는 실패를 반환
            const query = "UPDATE daily SET title = ?, user_name = ?, content = ?, update_at = ? where id = ?";
            db.query(query, [data.title, data.userName, data.content, today, data.id], (err, data) => {
                if(err) reject(err);
                else resolve({ success: true });
            });
        });
    }

    //일기 삭제
    static async delete(data) {
        return new Promise((resolve, reject) => { //resolve는 성공을, reject는 실패를 반환
            const query = "delete from daily where id = ?";
            db.query(query, [data.id], (err) => {
                if(err) reject(err);
                else resolve({ success: true });
            });
        });
    }
}

module.exports = DataStorage;