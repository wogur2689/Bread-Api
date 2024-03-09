"use strict";

/**
 * Spring의 service 로직
 * 해당 데이터를 가지고 검증 및 조작
 */
const logger = require("../config/logger");
const dataStorage = require("./dataStorage");

class Daily {
    constructor(body) {
        this.body = body; //기본생성자
    }

    //일기 리스트
    async getDailyList() {
        const client = this.body; //클라이언트 값
        try {
            const data = await dataStorage.getDailyList(client);
            return data;
        }
        catch (err) {
            return { success: false, msg: err };
        }
    }

    //일기 저장
    async create() {
        const client = this.body; //클라이언트 값
        try {
            const response = await dataStorage.create(client);
            return response;
        } catch (err) {
            return { success: false, msg: err };
        }
    }

    //일기 읽기
    async read() {
        const client = this.body; //클라이언트 값
        try {
            const data = await dataStorage.read(client);
            return data;
        }
        catch (err) {
            return { success: false, msg: err };
        }
    }

    //일기 수정
    async update() {
        const client = this.body; //클라이언트 값
        try {
            const data = await dataStorage.update(client);
            return data;
        }
        catch (err) {
            return { success: false, msg: err };
        }
    }

    //일기 삭제
    async delete() {
        const client = this.body; //클라이언트 값
        try {
            const data = await dataStorage.delete(client);
            return data;
        }
        catch (err) {
            return { success: false, msg: err };
        }
    }
}

module.exports = Daily;