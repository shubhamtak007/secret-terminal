import { StCoin } from "@secret-terminal/types/coin-list.types";

interface Watchlist {
    id?: string;
    name: string;
    description?: string | null;
}

interface WatchlistCoin {
    id: string;
    coinId: string;
    name: string;
    symbol: string;
    imageUrl: string;
    watchlistId: string;
    marketData: StCoin;
}

export type { Watchlist, WatchlistCoin };
