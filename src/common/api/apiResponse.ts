export interface ApiResponse<T> {
    code: number;
    message: string;
    data?: T;
}

//code, msg return
function createApiResponse<T>(
    code: number,
    message: string,
): ApiResponse<T> {
    return { code, message };
}

//code, msg, data return
function createApiDataResponse<T>(
    code: number,
    message: string,
    data?: T,
): ApiResponse<T> {
    return { code, message, data };
}

export {
    createApiResponse,
    createApiDataResponse
}