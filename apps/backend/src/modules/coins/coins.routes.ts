import { Router } from "express";
import { getCoinById, getCoinList } from '../coins/coins.controller.js';

const coinsRoutes = Router();

coinsRoutes.get("", getCoinList);
coinsRoutes.get(["/:id"], getCoinById);

export default coinsRoutes;