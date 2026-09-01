import { Router } from "express";
import { getTrendingData } from '../trending/trending.controller.js';

const trendingRoutes = Router();

trendingRoutes.get("", getTrendingData)

export default trendingRoutes;