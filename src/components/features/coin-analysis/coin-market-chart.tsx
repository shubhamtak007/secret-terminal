'use client';

import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/src/components/ui/chart';
import { AreaChart, XAxis, YAxis, Area, CartesianGrid } from 'recharts';
import { Spinner } from '@/src/components/ui/spinner';
import { Tabs, TabsList, TabsTrigger } from '@/src/components/ui/tabs';
import { useCoinAnalysisContext } from '@/src/contexts/coin-analysis-context';
import { timeFrameList, chartViewList, chartStrokeWidth } from '@/src/constants/chart.constants';
import useCoinMarketChartData from '@/src/hooks/use-coin-market-chart-data';
import useCoinChart from '@/src/hooks/use-coin-chart';
import type { CoinAnalysis } from '@/src/interfaces/coin-analysis.interface';

type Bindings = CoinAnalysis;

function CoinPriceChart({ coinProperties }: Bindings) {
    const { priceStatus } = useCoinAnalysisContext();
    const {
        chartConfiguration, xAxisDataKey, yAxisDataKey, formatXAxisTick, formatYAxisTick,
        onChartViewChange, onTimeFrameChange, chartTimeFrame, chartView
    } = useCoinChart();

    const {
        fetchingMarketDataPointList, marketDataPointList, axisConfig, tickCount
    } = useCoinMarketChartData({ coinProperties, days: chartTimeFrame.value, currentChartView: chartView.value });

    return (
        <div
            className="coin-chart-wrapper"
        >
            <div className="tabs-wrapper">
                <Tabs
                    id={'chart-view-tabs'}
                    onValueChange={(value) => { onChartViewChange(value) }}
                    defaultValue={chartView.value}
                >
                    <TabsList>
                        {
                            chartViewList.map((chartView) => {
                                return (
                                    <TabsTrigger
                                        key={chartView.value}
                                        value={String(chartView.value)}
                                        disabled={fetchingMarketDataPointList}
                                    >
                                        {chartView.name}
                                    </TabsTrigger>
                                )
                            })
                        }
                    </TabsList>
                </Tabs>

                <Tabs
                    id={'time-frame-tabs'}
                    onValueChange={(value) => { onTimeFrameChange(value) }}
                    defaultValue={chartTimeFrame.value}
                >
                    <TabsList>
                        {
                            timeFrameList.map((timeframe) => {
                                return (
                                    <TabsTrigger
                                        key={timeframe.value}
                                        value={String(timeframe.value)}
                                        disabled={fetchingMarketDataPointList}
                                    >
                                        {timeframe.name}
                                    </TabsTrigger>
                                )
                            })
                        }
                    </TabsList>
                </Tabs>
            </div>

            <div className="chart-container">
                {
                    fetchingMarketDataPointList ?
                        <div className="loading-spinner">
                            <Spinner className="size-15" />
                        </div>
                        : <>
                            {
                                marketDataPointList.length > 0 ?
                                    <ChartContainer
                                        config={chartConfiguration}
                                    >
                                        <AreaChart
                                            accessibilityLayer
                                            data={marketDataPointList}
                                        >
                                            <CartesianGrid vertical={true} />

                                            <YAxis
                                                ticks={axisConfig.y.ticks?.slice(1, -1)}
                                                tickCount={tickCount}
                                                dataKey={yAxisDataKey.current}
                                                axisLine={false}
                                                tickFormatter={formatYAxisTick}
                                            />

                                            <XAxis
                                                type="number"
                                                ticks={axisConfig.x.ticks?.slice(1, -1)}
                                                tickCount={tickCount}
                                                domain={axisConfig.x.domain}
                                                dataKey={xAxisDataKey.current}
                                                tickLine={false}
                                                axisLine={false}
                                                tickFormatter={formatXAxisTick}
                                            />

                                            <ChartTooltip
                                                content={
                                                    <ChartTooltipContent
                                                        indicator="line"
                                                        xAxisDataKey={xAxisDataKey.current}
                                                        yAxisDataKey={yAxisDataKey.current}
                                                    />
                                                }
                                            />

                                            <Area
                                                dataKey={yAxisDataKey.current}
                                                type="monotone"
                                                fill={priceStatus === 'up' ? 'var(--chart-2)' : 'var(--chart-1)'}
                                                fillOpacity={0.1}
                                                stroke={priceStatus === 'up' ? 'var(--chart-2)' : 'var(--chart-1)'}
                                                strokeWidth={chartStrokeWidth}
                                            />
                                        </AreaChart>
                                    </ChartContainer>
                                    :
                                    <div className="no-value-text p-[12px]">
                                        No data found.
                                    </div>
                            }
                        </>
                }
            </div>
        </div>
    )
}

export default CoinPriceChart;