'use client';

import { lazy } from 'react';
import { CoinAnalysisContextProvider } from '@/src/contexts/coin-analysis.context';
const CoinMarketChart = lazy(() => import('@/src/components/features/coin-analysis/coin-market-chart'));
const CoinInfo = lazy(() => import('@/src/components/features/coin-analysis/coin-info'));

type Bindings = {
    coinId: string
}

function CoinAnalysisContainer({ coinId }: Bindings) {
    let properties = {
        id: coinId
    }

    return (
        <CoinAnalysisContextProvider>
            <div className="coin-analysis-container">
                <div className="coin-info-col">
                    <CoinInfo coinProperties={properties} />
                </div>

                <div className="coin-price-change-chart-col">
                    <CoinMarketChart coinProperties={properties} />
                </div>
            </div>
        </CoinAnalysisContextProvider>
    )
}

export default CoinAnalysisContainer;