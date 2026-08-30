import { Router } from "express";
import authRoutes from "../../modules/auth/auth.routes.js";
import userRoutes from "../../modules/user/user.routes.js";
import newsRoutes from "../../modules/news/news.routes.js";
import watchlistRoutes from '../../modules/watchlist/watchlist.routes.js';
import watchlistCoinRoutes from '../../modules/watchlist-coin/watchlist-coin.routes.js';

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/users", userRoutes);
routes.use("/news", newsRoutes);
routes.use("/watchlists", watchlistRoutes);
routes.use("/watchlistCoins", watchlistCoinRoutes);

export default routes;