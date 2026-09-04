import statusCode from "../constants/http-status-code.js";
import { Response } from 'express';

export const createErrorResponse = (error: unknown, response: Response) => {
    const errorMessage = 'Something went wrong. Please try again in a moment.';

    if (error instanceof Error) {
        return response.status(statusCode.internalServerError).json({
            message: errorMessage
        })
    }

    return response.status(statusCode.internalServerError).json({
        message: errorMessage
    });
}
