import { Request, Response } from 'express';
import CoinService from '../coins/coins.service.js';
import { isAxiosError } from 'axios';
import statusCode from '../../constants/http-status-code.js';

const getCoinList = async (request: Request, response: Response) => {
    try {
        const queryParams = request.query;
        const coins = await CoinService.retrieveCoinList(queryParams);

        return response.status(200).json({
            data: coins
        })
    } catch (error) {
        handleError(error, response);
    }
}

const getCoinById = async (request: Request, response: Response) => {
    try {
        const coin = await CoinService.retrieveCoinById(request.params.id.toString());

        return response.status(200).json({
            data: coin?.data
        })
    } catch (error) {
        handleError(error, response);
    }
}

function handleError(error: unknown, response: Response) {
    if (error instanceof Error) {
        return response.status(statusCode.internalServerError).json({
            message: error.message
        })
    }

    return response.status(statusCode.internalServerError).json({
        message: "An unknown error occurred"
    });
}

export { getCoinList, getCoinById }