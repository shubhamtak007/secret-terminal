import { Request, Response } from 'express';
import CoinService from '../coins/coins.service.js';

const getCoinList = async (request: Request, response: Response) => {
    try {
        const queryParams = request.query;
        const coins = await CoinService.retrieveCoinList(queryParams);

        return response.status(200).json({
            data: coins
        })
    } catch (error) {
        if (error instanceof Error) {
            return response.status(401).json({
                message: error.message
            })
        }
    }
}

const getCoinById = async (request: Request, response: Response) => {
    try {
        const coin = await CoinService.retrieveCoinById(request.params.id.toString());

        return response.status(200).json({
            data: coin?.data
        })
    } catch (error) {
        if (error instanceof Error) {
            return response.status(401).json({
                message: error.message
            })
        }
    }
}

export { getCoinList, getCoinById }