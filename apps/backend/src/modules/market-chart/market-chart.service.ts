import { isAxiosError } from "axios";
import { coinGeckoClient } from "../../lib/api-client.js";
import { coinGeckoEndpoints } from "../../lib/endpoints.js";

async function retrieveMarketChartData(coinId: string, queryParams: any) {
    try {
        const response = await coinGeckoClient.get(`${coinGeckoEndpoints.coins.coinDataById}/${coinId}/market_chart`, { params: queryParams });
        return response.data;

    } catch (error: unknown) {
        if (isAxiosError(error)) {
            throw new Error(error?.response?.data.message ?? error.message);
        }

        if (error instanceof Error) {
            throw new Error(error.message);
        }

        throw new Error("An unknown error occurred");
    }
}

const MarketChartService = {
    retrieveMarketChartData
};

export default MarketChartService;