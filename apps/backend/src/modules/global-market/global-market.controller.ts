import { Request, Response } from 'express';
import { createErrorResponse } from '../../services/handle-error.service.js';
import GlobalMarketService from '../global-market/global-market.service.js';
import statusCode from '../../constants/http-status-code.js';

const getGlobalMarketData = async (request: Request, response: Response) => {
    try {
        const result = await GlobalMarketService.retrieveGlobalMarketData();

        return response.status(statusCode.ok).json({
            data: result
        })
    } catch (error) {
        createErrorResponse(error, response);
    }
}

export { getGlobalMarketData }