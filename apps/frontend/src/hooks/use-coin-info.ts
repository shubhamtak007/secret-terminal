"use client";

import { useState, useEffect } from "react";
import { formatValueIntoCommaSeparated } from "@secret-terminal/services/utils.service";
import { retrieveCoinList } from "@/services/coin.service";
import { StCoin } from "@secret-terminal/types/coin-list.types";
import type { CoinAnalysis } from "@/interfaces/coin-analysis.interface";

type Bindings = CoinAnalysis;

function useCoinInfo({ coinProperties }: Bindings) {
    const [coinInfo, setCoinInfo] = useState<StCoin | null>(null);
    const [fetchingCoinInfo, setFetchingCoinInfo] = useState<boolean>(true);

    useEffect(() => {
        document.title = coinProperties.id;
        if (coinProperties.id) fetchCoinInfoByName();
    }, []);

    async function fetchCoinInfoByName() {
        if (fetchingCoinInfo === false) setFetchingCoinInfo(true);

        try {
            const params = {
                ids: coinProperties.id,
            };
            const coins = await retrieveCoinList(params);

            if (coins.length > 0) {
                document.title = coins[0].name;
                formatValues(coins);
                setCoinInfo(coins[0]);
            }
        } catch (error) {
        } finally {
            setFetchingCoinInfo(false);
        }
    }

    function formatValues(data: StCoin[]) {
        for (const coin of data) {
            if (coin.currentPrice) {
                coin.currentPriceWithCurrencySymbol = formatValueIntoCommaSeparated(coin.currentPrice, 6, true);
            } else {
                coin.currentPriceWithCurrencySymbol = `$0`;
            }
        }
    }

    return { coinInfo, fetchingCoinInfo };
}

export default useCoinInfo;
