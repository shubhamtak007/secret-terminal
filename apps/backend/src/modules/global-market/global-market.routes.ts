import { Router } from "express";
import { getGlobalMarketData } from '../global-market/global-market.controller.js';

const globalMarketRoutes = Router();

globalMarketRoutes.get("", getGlobalMarketData)

export default globalMarketRoutes;