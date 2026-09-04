import { isAxiosError } from "axios";
import { coinGeckoClient } from "../../lib/api-client.js";
import { coinGeckoEndpoints } from "../../lib/endpoints.js";

async function search(params: any) {
    try {
        const response = await coinGeckoClient.get(coinGeckoEndpoints.coins.search, { params })
        const searchedCoins = response.data;
        return searchedCoins;

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

const SearchService = {
    search
};

export default SearchService;