import { CoinListApiParams } from '@secret-terminal/types/coin-list.types';
import { coinGeckoClient } from '../../lib/api-client.js';
import { coinGeckoEndpoints } from '../../lib/endpoints.js';
import { getRowsPerPageDefaultValue } from '@secret-terminal/services/utils.service';

async function retrieveCoinList(params: CoinListApiParams) {
    const queryParams: CoinListApiParams = {
        vs_currency: 'usd',
        precision: params.precision ? params.precision : "3",
        symbols: params.symbols ? params.symbols : null,
        page: params.page ? Number(params.page) : 1,
        per_page: params.per_page ? Number(params.per_page) : getRowsPerPageDefaultValue(),
        price_change_percentage: '1h,24h,7d,14d,30d,200d,1y',
        order: params.order ? params.order : 'market_cap_desc',
        names: params.names ? params.names : null,
        ids: params.ids ? params.ids : null
    }

    try {
        const response = await coinGeckoClient.get(coinGeckoEndpoints.coins.coinListWithMarketData, { params: queryParams });
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

async function retrieveCoinById(id: string) {
    try {
        const response = await coinGeckoClient.get(`${coinGeckoEndpoints.coins.coinDataById}/${id}`)
        return response;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

const CoinService = {
    retrieveCoinList, retrieveCoinById
}

export default CoinService;