type CoinAnalysis = {
    coinProperties: { [key: string]: string }
}

type DataPoint = { date: number, value: number };

type ChartMarketData = {
    priceList: DataPoint[],
    marketCapitalList: DataPoint[],
    volumeList: DataPoint[]
}

type axisConfig = {
    domain: number[]
    ticks?: number[]
}

type ChartAxisConfig = {
    x: axisConfig,
    y: axisConfig
}

export type { CoinAnalysis, ChartMarketData, ChartAxisConfig }