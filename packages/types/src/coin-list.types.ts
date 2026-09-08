interface CoinListApiParams {
    vs_currency?: string | null;
    precision?: string | null;
    symbols?: string | null;
    page?: number | null;
    per_page?: number | null;
    price_change_percentage?: string | null;
    order?: string | null;
    names?: string | null;
    ids?: string | null;
}

interface CoingeckoCoin {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    currentPriceWithCurrencySymbol?: string;
    price_change_24h: number;
    market_cap: number;
    market_cap_rank: number;
    total_volume: number;
    price_change_percentage_24h: number;
    price_change_percentage_1h_in_currency: number;
    price_change_percentage_7d_in_currency: number;
    circulating_supply: number;
    fully_diluted_valuation: number;
    total_supply: number;
    max_supply: number;
    [key: string]: number | string | undefined;
}

interface StCoin {
    id: string;
    name: string;
    symbol: string;
    imageUrl: string;
    currentPrice: number;
    marketCapital: number;
    circulatingSupply: number;
    totalVolume: number;
    marketCapRank: number;
    fullDilutedValuation: number;
    currentPriceWithCurrencySymbol: string;
    totalSupply: number;
    maximumSupply: number;
    priceChangePercent: {
        "1hr": number;
        "24hr": number;
        "30d": number;
        "7d": number;
        "200d": number;
        "1y": number;
    };
}

export type { CoinListApiParams, CoingeckoCoin, StCoin };
