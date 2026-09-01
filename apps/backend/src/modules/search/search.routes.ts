import { Router } from "express";
import { getSearchData } from '../search/search.controller.js';

const searchRoutes = Router();

searchRoutes.get("", getSearchData)

export default searchRoutes;