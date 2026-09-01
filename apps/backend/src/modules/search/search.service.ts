import { coinGeckoClient } from "../../lib/api-client.js";
import { coinGeckoEndpoints } from "../../lib/endpoints.js";

async function search(params: any) {
    try {
        const response = await coinGeckoClient.get(coinGeckoEndpoints.coins.search, { params })
        const searchedCoins = response.data;
        return searchedCoins;

    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

const SearchService = {
    search
};

export default SearchService;