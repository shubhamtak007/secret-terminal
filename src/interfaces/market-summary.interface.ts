import type { CryptoCurrency } from '@/src/interfaces/coin.interface';

interface MarketSummary {
    key: string,
    marketSummaryItem: MarketSummaryItem,
}

interface MarketSummaryItem {
    id: string,
    title: string,
    coins: CryptoCurrency[]
}

export type { MarketSummary, MarketSummaryItem }