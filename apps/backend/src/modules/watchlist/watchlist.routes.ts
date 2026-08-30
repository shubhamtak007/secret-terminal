import Router from "express";
import { addWatchlist, updateWatchlist, deleteWatchlist, retrieveWatchlists } from './watchlist.controller.js';
import tokenVerification from "../../middlewares/token.middleware.js";
import renewToken from "../../middlewares/renew-token.middleware.js";

const watchlistRoutes = Router();

watchlistRoutes.post("", tokenVerification, renewToken, addWatchlist);
watchlistRoutes.patch(["/:id"], tokenVerification, renewToken, updateWatchlist);
watchlistRoutes.delete(["/:id"], tokenVerification, renewToken, deleteWatchlist);
watchlistRoutes.get("", tokenVerification, renewToken, retrieveWatchlists);

export default watchlistRoutes;