import { Request, Response } from 'express';
import TrendingService from '../trending/trending.service.js';

const getTrendingData = async (request: Request, response: Response) => {
    try {
        const result = await TrendingService.retrieveTrendingData();
        return response.status(200).json({
            data: result
        })
    } catch (error) {
        if (error instanceof Error) {
            return response.status(401).json({
                message: error.message
            })
        }
    }
}

export { getTrendingData }