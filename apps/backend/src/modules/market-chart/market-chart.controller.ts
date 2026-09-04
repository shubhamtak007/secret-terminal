import { Request, Response } from 'express';
import { createErrorResponse } from '../../services/handle-error.service.js';
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
        createErrorResponse(error, response);
    }
}

export { getMarketChartData }