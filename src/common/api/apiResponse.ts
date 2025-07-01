export interface ApiRes<T> {
    code: string;
    message: string;
    data?: T;
}

//code, msg return
function createApiRes<T>(
    code: string,
    message: string,
): ApiRes<T> {
    return { code, message };
}

//code, msg, data return
function createApiDataRes<T>(
    code: string,
    message: string,
    data?: T,
): ApiRes<T> {
    return { code, message, data };
}

export {
    createApiRes,
    createApiDataRes
}