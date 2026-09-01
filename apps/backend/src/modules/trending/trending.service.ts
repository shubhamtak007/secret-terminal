import { coinGeckoClient } from "../../lib/api-client.js";
import { coinGeckoEndpoints } from "../../lib/endpoints.js";

async function retrieveTrendingData() {
    try {
        const response = await coinGeckoClient.get(coinGeckoEndpoints.coins.trending);
        const trendingData = response.data;
        return trendingData;

    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

const TrendingService = {
    retrieveTrendingData
};

export default TrendingService;