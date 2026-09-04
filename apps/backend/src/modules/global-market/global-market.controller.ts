import { Request, Response } from 'express';
import GlobalMarketService from '../global-market/global-market.service.js';
import statusCode from '../../constants/http-status-code.js';

const getGlobalMarketData = async (request: Request, response: Response) => {
    try {
        const result = await GlobalMarketService.retrieveGlobalMarketData();

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

export { getGlobalMarketData }