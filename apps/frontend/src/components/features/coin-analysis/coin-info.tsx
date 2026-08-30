'use client';

import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { Skeleton } from '@/src/components/ui/skeleton';
import { formatValueIntoCommaSeparated, roundOffNumber, formatValueInUsdCompact } from '@/src/services/utils.service';
import { useCoinAnalysisContext } from '@/src/contexts/coin-analysis.context';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from '@/src/components/ui/tooltip';
import { coinKeyList, coinSymbolImageSize } from '@/src/constants/app.constants';
import type { CoinAnalysis } from '@/src/interfaces/coin-analysis.interface';
import type { CoingeckoCrypto } from '@/src/interfaces/coin.interface';
import useCoinInfo from '@/src/hooks/use-coin-info';
import CoinDetailsDialog from '@/src/components/features/coin-details/coin-details-dialog';

type Bindings = CoinAnalysis;

function CoinInfo({ coinProperties }: Bindings) {
    const { coinInfo, fetchingCoinInfo } = useCoinInfo({ coinProperties });
    const { timeFrame, setPriceStatus } = useCoinAnalysisContext();
    const [priceChangePercentage, setPriceChangePercentage] = useState<number | null>(null);
    const [showCoinDetailsDialog, setShowCoinDetailsDialog] = useState<boolean>(false);
    const coinInfoRef = useRef<CoingeckoCrypto>(null);

    useEffect(() => {
        if (coinInfo && timeFrame?.name) {
            const timeFrameName = timeFrame.name === '1M' ? '30d' : timeFrame.name;
            const key = `price_change_percentage_${timeFrameName.toLowerCase()}_in_currency`;
            const percent = Number(coinInfo[key as keyof typeof coinInfo]);

            const priceChangePercentRoundOffValue = roundOffNumber(percent, 2);
            const priceStatus = (percent > 0) ? 'up' : 'down';

            setPriceStatus(priceStatus);
            setPriceChangePercentage(priceChangePercentRoundOffValue);
        }
    }, [coinInfo, timeFrame?.name]);

    const onCoinInfoNameAndImgClick = () => {
        coinInfoRef.current = coinInfo;
        setShowCoinDetailsDialog(true);
    }

    return (
        fetchingCoinInfo ? <Skeleton className="w-full min-h-[308px]" /> :
            <div className="coin-info-container">
                {
                    coinInfo &&
                    <>
                        <div className="header">
                            <div className="rank">
                                #{coinInfo.market_cap_rank}
                            </div>

                            <div
                                className="flex items-center cursor-pointer"
                                onClick={() => { onCoinInfoNameAndImgClick() }}
                            >
                                <div className="coin-image-wrapper">
                                    <Image
                                        className="coin-symbol-image"
                                        width={coinSymbolImageSize.width}
                                        height={coinSymbolImageSize.height}
                                        alt={`Image of ${coinInfo.name}`}
                                        src={coinInfo.image}
                                    />
                                </div>

                                <div className="name">
                                    {coinInfo.name}
                                </div>
                            </div>
                        </div>

                        <div className={`coin-price`}>
                            <div className="current-price">
                                {coinInfo.currentPriceWithCurrencySymbol}
                            </div>

                            {(priceChangePercentage && priceChangePercentage !== 0) &&
                                <div className={`price-change-percent ${(priceChangePercentage > 0 ? 'success-text' : 'danger-text')}`}>
                                    {
                                        (priceChangePercentage > 0) ? <FaCaretUp /> : <FaCaretDown />
                                    }
                                    {formatValueInUsdCompact(Math.abs(priceChangePercentage), 2, false)}%
                                </div>}
                        </div>

                        <div className="other-info-wrapper">
                            {
                                coinKeyList.map((coinKeyItem, index) => {
                                    return (
                                        <div
                                            key={`${index}-${coinKeyItem.key}`}
                                            className="pair"
                                        >
                                            <div className="key flex items-center">
                                                <div className="mr-[4px]">
                                                    {coinKeyItem.name}
                                                </div>

                                                {coinKeyItem.toolTipValue ? <Tooltip>
                                                    <TooltipTrigger>
                                                        <Info size={'15'} />
                                                    </TooltipTrigger>

                                                    <TooltipContent
                                                        side="bottom"
                                                        className="max-w-[260px]"
                                                    >
                                                        {coinKeyItem.toolTipValue}
                                                    </TooltipContent>
                                                </Tooltip> : undefined}
                                            </div>

                                            <div className="font-medium">
                                                {formatValueIntoCommaSeparated(Number(coinInfo[coinKeyItem.key]), 0, true)}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </>
                }

                {
                    (showCoinDetailsDialog === true) && <CoinDetailsDialog
                        key={crypto.randomUUID()}
                        coin={coinInfoRef.current}
                        showDialog={showCoinDetailsDialog}
                        setShowDialog={setShowCoinDetailsDialog}
                    />
                }
            </div>
    )
}

export default CoinInfo;