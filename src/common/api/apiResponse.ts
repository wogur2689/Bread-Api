export interface ApiResponse<T> {
    code: string;
    message: string;
    data?: T;
}

//code, msg return
function createApiResponse<T>(
    code: string,
    message: string,
): ApiResponse<T> {
    return { code, message };
}

//code, msg, data return
function createApiDataResponse<T>(
    code: string,
    message: string,
    data?: T,
): ApiResponse<T> {
    return { code, message, data };
}

export {
    createApiResponse,
    createApiDataResponse
}