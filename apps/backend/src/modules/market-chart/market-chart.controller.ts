import { Request, Response } from 'express';
import MarketChartService from './market-chart.service.js';
import statusCode from '../../constants/http-status-code.js';

const getMarketChartData = async (request: Request, response: Response) => {
    try {
        const coinId = request.params.id.toString();
        const queryParams = request.query;

        const result = await MarketChartService.retrieveMarketChartData(coinId, queryParams);
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

export { getMarketChartData }