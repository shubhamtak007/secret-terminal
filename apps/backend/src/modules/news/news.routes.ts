import { Router } from "express";
import { retrieveLatestNews } from '../news/news.controller.js';

const newsRoutes = Router();

newsRoutes.get("/latest", retrieveLatestNews)

export default newsRoutes;