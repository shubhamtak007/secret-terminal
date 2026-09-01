import { Request, Response } from 'express';
import MarketChartService from './market-chart.service.js';

const getMarketChartData = async (request: Request, response: Response) => {
    try {
        const coinId = request.params.id.toString();
        const queryParams = request.query;

        const result = await MarketChartService.retrieveMarketChartData(coinId, queryParams);
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

export { getMarketChartData }