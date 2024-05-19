"use strict";

class CodeEnum {
    #code;
    #msg;

    CodeEnum(code, msg) {
        this.#code = code;
        this.#msg = msg;
    }

    getCode() {
        return this.#code;
    }
    getMsg() {
        return this.#msg;
    }

    static getMessageByCode(code) {
        for (let key in this) {
            if (this[key] instanceof CodeEnum && this[key].getCode() === code) {
                return this[key].getMsg();
            }
        }
        return '코드에 해당하는 메시지가 없습니다.';
    }
};

// success
CodeEnum.API_0000 = new CodeEnum('0000', '정상 처리되었습니다.');
// user
CodeEnum.API_1000 = new CodeEnum('1000', '회원가입에 실패하였습니다. 관리자에게 문의해주세요.');
// fail
CodeEnum.API_9999 = new CodeEnum('9999', '일시적인 오류입니다. 다시 시도해 주세요.');

module.exports = ApiUtil;