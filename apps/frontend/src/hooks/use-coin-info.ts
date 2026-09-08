"use client";

import { useState, useEffect, useRef } from "react";
import { formatValueIntoCommaSeparated, roundOffNumber } from "@secret-terminal/services/utils.service";
import { retrieveCoinList } from "@/services/coin.service";
import { StCoin } from "@secret-terminal/types/coin-list.types";
import type { CoinAnalysis } from "@/interfaces/coin-analysis.interface";
import { useCoinAnalysisContext } from "@/contexts/coin-analysis.context";

type Bindings = CoinAnalysis;

function useCoinInfo({ coinProperties }: Bindings) {
    const [coinInfo, setCoinInfo] = useState<StCoin | null>(null);
    const [fetchingCoinInfo, setFetchingCoinInfo] = useState<boolean>(true);
    const { timeFrame, setPriceStatus } = useCoinAnalysisContext();
    const [priceChangePercentage, setPriceChangePercentage] = useState<number | null>(null);
    const [showCoinDetailsDialog, setShowCoinDetailsDialog] = useState<boolean>(false);
    const coinInfoRef = useRef<StCoin>(null);

    useEffect(() => {
        if (coinInfo && timeFrame?.name) {
            const percent = Number(
                coinInfo.priceChangePercent[getTimeFrameKey(timeFrame?.name) as keyof typeof coinInfo.priceChangePercent],
            );

            const priceChangePercentRoundOffValue = roundOffNumber(percent, 2);
            const priceStatus = percent > 0 ? "up" : "down";

            setPriceStatus(priceStatus);
            setPriceChangePercentage(priceChangePercentRoundOffValue);
        }
    }, [coinInfo, timeFrame?.name]);

    const onCoinInfoNameAndImgClick = () => {
        coinInfoRef.current = coinInfo;
        setShowCoinDetailsDialog(true);
    };

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

    const getTimeFrameKey = (name: string) => {
        const timeFrames: Record<string, string> = {
            "24H": "24hr",
            "7D": "7d",
            "14D": "14d",
            "1M": "30d",
            "200D": "200d",
            "1Y": "1y",
        };

        return timeFrames[name];
    };

    return {
        coinInfo,
        fetchingCoinInfo,
        onCoinInfoNameAndImgClick,
        priceChangePercentage,
        showCoinDetailsDialog,
        setShowCoinDetailsDialog,
        coinInfoRef,
    };
}

export default useCoinInfo;
