import { Request, Response } from 'express';
import GlobalMarketService from '../global-market/global-market.service.js';

const getGlobalMarketData = async (request: Request, response: Response) => {
    try {
        const result = await GlobalMarketService.retrieveGlobalMarketData();

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

export { getGlobalMarketData }