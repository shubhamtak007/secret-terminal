'use client'

import { useState, useEffect, useRef } from 'react';
import { retrieveCoinMarketChartData } from '@/src/services/coin.service';
import type { CoinAnalysis, ChartMarketData, ChartAxisConfig } from '@/src/interfaces/coin-analysis.interface';

type Bindings = CoinAnalysis & {
    days: string,
    currentChartView: string
};

const axisConfigDefaultValues = {
    x: { domain: [], ticks: [] },
    y: { domain: [], ticks: [] }
}

const tickCount = 5;

export default function useCoinMarketChartData({ coinProperties, days, currentChartView }: Bindings) {
    const [fetchingMarketDataPointList, setFetchingMarketDataPointList] = useState(true);
    const [marketDataPointList, setMarketDataPointList] = useState<Record<string, number>[]>([]);
    const [axisConfig, setAxisConfig] = useState<ChartAxisConfig>(axisConfigDefaultValues);
    const marketDataRef = useRef<ChartMarketData>({ priceList: [], marketCapitalList: [], volumeList: [] });

    useEffect(() => {
        if (coinProperties && coinProperties.id) fetchCoinPriceHistory();
    }, [coinProperties.name, days]);

    useEffect(() => {
        createMarketDataPointListByView();
    }, [currentChartView]);

    useEffect(() => {
        if (marketDataPointList.length > 0) setAxisConfigValues();
    }, [marketDataPointList]);

    async function fetchCoinPriceHistory() {
        const params = {
            vs_currency: 'usd',
            days: days,
            precision: '6',
            interval: null
        }

        setFetchingMarketDataPointList(true);
        setMarketDataPointList([]);

        try {
            const response = await retrieveCoinMarketChartData(coinProperties.id, params);
            marketDataRef.current = { priceList: [], marketCapitalList: [], volumeList: [] };

            for (const priceDataPoint of response.data.prices) {
                marketDataRef.current.priceList.push({
                    date: priceDataPoint[0],
                    value: priceDataPoint[1]
                })
            }

            for (const marketCapPoint of response.data.market_caps) {
                marketDataRef.current.marketCapitalList.push({
                    date: marketCapPoint[0],
                    value: marketCapPoint[1]
                })
            }

            for (const volumePoint of response.data.total_volumes) {
                marketDataRef.current.volumeList.push({
                    date: volumePoint[0],
                    value: volumePoint[1]
                })
            }

            createMarketDataPointListByView();
        } catch (error) {

        } finally {
            setFetchingMarketDataPointList(false);
        }
    }

    function createMarketDataPointListByView() {
        switch (currentChartView) {
            case 'price': return setMarketDataPointList(marketDataRef.current.priceList);
            case 'marketCapital': return setMarketDataPointList(marketDataRef.current.marketCapitalList);
            case 'volume': return setMarketDataPointList(marketDataRef.current.volumeList);
            default: return setMarketDataPointList(marketDataRef.current.priceList);
        }
    }

    function setAxisConfigValues() {
        if (marketDataPointList.length > 0) {
            let yMin = Infinity;
            let yMax = -Infinity;
            let xMin = Infinity;
            let xMax = -Infinity;

            for (const dataPoint of marketDataPointList) {
                yMin = Math.min(yMin, dataPoint.value);
                yMax = Math.max(yMax, dataPoint.value);

                xMin = Math.min(xMin, dataPoint.date);
                xMax = Math.max(xMax, dataPoint.date);
            }

            setAxisConfig({
                y: {
                    domain: [yMin, yMax],
                    ticks: calculateTicks(yMin, yMax, tickCount)
                },
                x: {
                    domain: [xMin, xMax],
                    ticks: calculateTicks(xMin, xMax, tickCount)
                },
            })
        }
    }

    function calculateTicks(min: number, max: number, tickCount: number) {
        const interval = (max - min) / (tickCount - 1);

        const ticks = Array.from(
            { length: tickCount },
            (_, index) => min + index * interval
        );

        const hasDuplicates = (ticks: number[]) => new Set(ticks).size !== ticks.length;

        return hasDuplicates(ticks) ? [ticks[0]] : ticks;
    }

    return { fetchingMarketDataPointList, marketDataPointList, axisConfig, calculateTicks, tickCount }
}