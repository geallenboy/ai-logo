export type ActionResponse<T = any> = {
    success: boolean;
    data?: T;
    error?: string;
    statusCode?: number;
};

export function successResponse<T>(data: T, statusCode = 200): ActionResponse<T> {
    return {
        success: true,
        data,
        statusCode
    };
}

export function errorResponse(error: string, statusCode = 400): ActionResponse {
    return {
        success: false,
        error,
        statusCode
    };
}