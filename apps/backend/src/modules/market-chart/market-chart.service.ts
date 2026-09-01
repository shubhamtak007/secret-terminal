import { coinGeckoClient } from "../../lib/api-client.js";
import { coinGeckoEndpoints } from "../../lib/endpoints.js";

async function retrieveMarketChartData(coinId: string, queryParams: any) {
    try {
        const response = await coinGeckoClient.get(`${coinGeckoEndpoints.coins.coinDataById}/${coinId}/market_chart`, { params: queryParams });
        return response.data;

    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

const MarketChartService = {
    retrieveMarketChartData
};

export default MarketChartService;