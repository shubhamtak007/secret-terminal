import { Router } from 'express';
import { addWatchlistCoin, deleteWatchlistCoin, retrieveWatchlistCoins } from '../watchlist-coin/watchlist-coin.controller.js';
import { watchlistCoinSchema } from './watchlist-coin.validation.js';
import tokenVerification from "../../middlewares/token.middleware.js";
import schemaVerification from '../../middlewares/schema.middleware.js';
import renewToken from '../../middlewares/renew-token.middleware.js';

const watchlistCoinRoutes = Router();

watchlistCoinRoutes.post('', tokenVerification, renewToken, schemaVerification(watchlistCoinSchema), addWatchlistCoin);
watchlistCoinRoutes.delete(['/:id'], tokenVerification, renewToken, deleteWatchlistCoin);
watchlistCoinRoutes.get('', tokenVerification, renewToken, retrieveWatchlistCoins);

export default watchlistCoinRoutes;