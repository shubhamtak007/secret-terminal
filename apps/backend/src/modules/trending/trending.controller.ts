import { Request, Response } from 'express';
import { createErrorResponse } from '../../services/handle-error.service.js';
import TrendingService from '../trending/trending.service.js';
import statusCode from '../../constants/http-status-code.js';

const getTrendingData = async (request: Request, response: Response) => {
    try {
        const result = await TrendingService.retrieveTrendingData();
        return response.status(statusCode.ok).json({
            data: result
        })
    } catch (error) {
        createErrorResponse(error, response);
    }
}

export { getTrendingData }