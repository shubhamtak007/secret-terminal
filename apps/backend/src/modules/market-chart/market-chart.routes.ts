import { Router } from "express";
import { getMarketChartData } from './market-chart.controller.js';

const marketChartRoutes = Router();

marketChartRoutes.get(['/:id'], getMarketChartData)

export default marketChartRoutes;