import { Request, Response } from 'express';
import TrendingService from '../trending/trending.service.js';
import statusCode from '../../constants/http-status-code.js';

const getTrendingData = async (request: Request, response: Response) => {
    try {
        const result = await TrendingService.retrieveTrendingData();
        return response.status(statusCode.ok).json({
            data: result
        })
    } catch (error) {
        if (error instanceof Error) {
            return response.status(statusCode.internalServerError).json({
                message: error.message
            })
        }

        return response.status(statusCode.internalServerError).json({
            message: "An unknown error occurred"
        });
    }
}

export { getTrendingData }