import { CryptoCurrency } from '@/interfaces/coin.interface';
import { roundOffNumber } from '@secret-terminal/services/utils.service';
import { secretTerminalClient, binanceClient } from '@/lib/api-client';
import { CoinListApiParams } from '@secret-terminal/types/coin-list.types';
import { binanceEndpoints, secretTerminalEndpoints } from '@/lib/endpoints';

async function retrieveCoinList(params: CoinListApiParams, signal?: AbortSignal) {
    try {
        const response = await secretTerminalClient.get(secretTerminalEndpoints.coins.coinList, { params, signal });
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

async function retrieveTrendingCoins() {
    try {
        const response = await secretTerminalClient.get(secretTerminalEndpoints.coins.trending);
        return response.data.data.coins;
    } catch (error) {
        throw error;
    }
};

async function retrieveTrendingCoinsCategoriesAndNfts() {
    try {
        const response = await secretTerminalClient.get(secretTerminalEndpoints.coins.trending);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

async function retrieveGlobalMarketData() {
    try {
        const response = await secretTerminalClient.get(secretTerminalEndpoints.coins.globalMarket);
        return response;
    } catch (error) {
        throw error;
    }
};

async function retrieveAllCoins() {
    const queryParameters = {
        symbolStatus: 'TRADING'
    }

    try {
        const promises = [
            binanceClient.get(binanceEndpoints.coins.exchangeInfo, { params: queryParameters }),
            binanceClient.get(binanceEndpoints.coins['24hrPriceChangeStats'], { params: queryParameters })
        ]

        const responses = await Promise.all(promises);
        const masterSymbolList = responses[0].data.symbols.filter((symbol: Record<string, string>) => {
            return symbol.quoteAsset === 'USDT' && !symbol.symbol.includes('WBTC')
        });

        const cryptoPriceList = responses[1].data;
        return createCryptoCurrencyList(masterSymbolList, cryptoPriceList);

    } catch (error) {
        throw error;
    }
};

async function retrieveCoinMarketChartData(coinUuid: string, params: unknown) {
    try {
        const response = await secretTerminalClient.get(`${secretTerminalEndpoints.coins.marketChart}/${coinUuid}`, { params });
        return response;
    } catch (error) {
        throw error;
    }
};

async function retrieveCoinDetailsByCoinId(coinId: string) {
    try {
        const response = await secretTerminalClient.get(`${secretTerminalEndpoints.coins.coinList}/${coinId}`);
        return response;
    } catch (error) {
        throw error;
    }
};

async function search(params: { query: string }, signal?: AbortSignal) {
    try {
        const response = await secretTerminalClient.get(secretTerminalEndpoints.coins.search, { params, signal })
        return response;
    } catch (error) {
        throw error;
    }
};


function createCryptoCurrencyList(masterSymbolList: Record<string, string>[], cryptoPriceList: CryptoCurrency[]) {
    let cryptoCurrencyList = [];

    for (const masterSymbol of masterSymbolList) {
        const matchedCrypto = cryptoPriceList.find((cryptoPrice: CryptoCurrency) => {
            return cryptoPrice.symbol === masterSymbol.symbol
        })

        if (matchedCrypto) {
            matchedCrypto.baseAsset = masterSymbol.baseAsset;
            matchedCrypto.quoteAsset = masterSymbol.quoteAsset;
        }

        if (matchedCrypto) {
            cryptoCurrencyList.push({
                id: self.crypto.randomUUID(),
                baseAsset: matchedCrypto.baseAsset,
                quoteAsset: masterSymbol.quoteAsset,
                symbol: matchedCrypto.baseAsset,
                lastPrice: Number(matchedCrypto.lastPrice),
                priceChange: roundOffNumber(Number(matchedCrypto.priceChange), 9),
                priceChangePercent: roundOffNumber(Number(matchedCrypto.priceChangePercent), 2),
                volume: Number(matchedCrypto.volume),
                quoteVolume: Number(matchedCrypto.quoteVolume),
                weightedAvgPrice: Number(matchedCrypto.weightedAvgPrice),
                count: matchedCrypto.count
            })
        }
    }

    return cryptoCurrencyList;
}

export {
    retrieveAllCoins, retrieveCoinDetailsByCoinId, retrieveCoinList, retrieveCoinMarketChartData,
    retrieveGlobalMarketData, retrieveTrendingCoins, retrieveTrendingCoinsCategoriesAndNfts, search
};