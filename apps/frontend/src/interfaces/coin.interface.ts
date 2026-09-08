import { StCoin } from "@secret-terminal/types/coin-list.types";

type CoinDetailsDialogCoin = {
    id: string;
    name: string;
    imageUrl: string;
    symbol: string;
};

interface CryptoCurrency {
    id: string;
    name: string;
    imageUrl: string;
    symbol: string;
    lastPrice?: number;
    priceChange?: number;
    priceChangePercent?: number;
    volume?: number;
    quoteVolume?: number;
    weightedAvgPrice?: number;
    count?: number;
    baseAsset?: string;
    quoteAsset?: string;
}

interface TrendingCoinItem {
    id: string;
    name: string;
    large: string;
    symbol: string;
    data: {
        price: number;
        price_change_percentage_24h: {
            usd: number;
        };
    };
}

interface TrendingCoin {
    item: TrendingCoinItem;
}

interface MarketSummaryRefMap {
    gainers: CryptoCurrency[];
    losers: CryptoCurrency[];
    volumes: CryptoCurrency[];
    trendingCoins: CryptoCurrency[];
}

interface SearchApiCoin {
    api_symbol: string;
    id: string;
    large: string;
    market_cap_rank: string;
    name: string;
    symbol: string;
    thumb: string;
    loading: boolean;
    marketData: StCoin;
}

export type { CryptoCurrency, TrendingCoinItem, TrendingCoin, MarketSummaryRefMap, SearchApiCoin, CoinDetailsDialogCoin };
