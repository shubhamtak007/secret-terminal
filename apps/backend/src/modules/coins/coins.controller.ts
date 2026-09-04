import { Request, Response } from 'express';
import { createErrorResponse } from '../../services/handle-error.service.js';
import CoinService from '../coins/coins.service.js';

const getCoinList = async (request: Request, response: Response) => {
    try {
        const queryParams = request.query;
        const coins = await CoinService.retrieveCoinList(queryParams);

        return response.status(200).json({
            data: coins
        })
    } catch (error) {
        createErrorResponse(error, response);
    }
}

const getCoinById = async (request: Request, response: Response) => {
    try {
        const coin = await CoinService.retrieveCoinById(request.params.id.toString());

        return response.status(200).json({
            data: coin?.data
        })
    } catch (error) {
        createErrorResponse(error, response);
    }
}

export { getCoinList, getCoinById }