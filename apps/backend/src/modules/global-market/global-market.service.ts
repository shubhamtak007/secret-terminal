import { coinGeckoClient } from "../../lib/api-client.js";
import { coinGeckoEndpoints } from "../../lib/endpoints.js";
import { formatValueIntoCommaSeparated, roundOffNumber } from '@secret-terminal/services/utils.service';
import { GlobalMarketDataCoinGecko } from '@secret-terminal/types/global-market.types';

async function retrieveGlobalMarketData() {
    try {
        const response = await coinGeckoClient.get(coinGeckoEndpoints.coins.globalMarket);
        const globalMarketData = createGlobalMarketStatistics(response.data.data)
        return globalMarketData;

    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

function createGlobalMarketStatistics(globalMarketData: GlobalMarketDataCoinGecko) {
    const marketStats = {
        totalCoins: formatValueIntoCommaSeparated(globalMarketData.active_cryptocurrencies),
        exchanges: formatValueIntoCommaSeparated(globalMarketData.markets),
        totalMarketCapital: {
            value: globalMarketData.total_market_cap.usd,
            marketCapShareList: createMarketCapShareList(globalMarketData.market_cap_percentage)
        },
        marketCapitalChangePercentage24hUsd: globalMarketData.market_cap_change_percentage_24h_usd,
        volumeChangePercentage24hUsd: globalMarketData.volume_change_percentage_24h_usd,
        totalVolume: globalMarketData.total_volume.usd,
        lastUpdatedAt: new Date(globalMarketData.updated_at * 1000)
    }

    return marketStats;
}

function createMarketCapShareList(marketCapSharePercentProperties: Record<string, number>) {
    const marketCapShareList = Object.entries(marketCapSharePercentProperties);
    marketCapShareList.sort((a, b) => b[1] - a[1]);

    let symbolAndPercentList = [];

    for (const marketCapShareItem of marketCapShareList) {
        symbolAndPercentList.push({
            name: marketCapShareItem[0].toUpperCase(),
            value: roundOffNumber(marketCapShareItem[1], 2) + '%'
        })
    }

    return symbolAndPercentList;
}

const GlobalMarketService = {
    retrieveGlobalMarketData
};

export default GlobalMarketService;