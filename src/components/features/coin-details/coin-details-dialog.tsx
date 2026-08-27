'use client';

import React from 'react';
import Image from 'next/image';
import CoinDetailsBlock from '@/src/components/features/coin-details/coin-details-block';
import useCoinDetailsDialog from '@/src/hooks/use-coin-details-dialog';
import type { CoinDetailsDialogCoin } from '@/src/interfaces/coin.interface';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogDescription } from '@/src/components/ui/dialog';
import { coinSymbolImageSize } from '@/src/constants/app.constants';
import { DialogProps } from '@/src/interfaces/global.interface';

type Bindings = {
    coin: CoinDetailsDialogCoin | null,
    dialogLevel?: number
} & DialogProps;

function CoinDetailsDialog(bindings: Bindings) {
    const { showDialog, setShowDialog, coin, dialogLevel } = bindings;
    const { fetchingCoinDetails, coinDetails } = useCoinDetailsDialog({ showDialog, coinId: coin?.id });

    return (
        <Dialog
            open={showDialog}
            onOpenChange={setShowDialog}
        >
            <DialogContent dialogLevel={dialogLevel} size="sm">
                <DialogHeader>
                    <DialogTitle>
                        {coin && <div className="flex items-center gap-1.5 coin-image-wrapper">
                            {
                                coin.image ?
                                    <Image
                                        className="coin-symbol-image"
                                        width={coinSymbolImageSize.width}
                                        height={coinSymbolImageSize.height}
                                        alt={`Image of ${coin.name}`}
                                        src={coin.image}
                                    />
                                    :
                                    <div className="coin-letter-mark">
                                        {coin.symbol[0].toUpperCase()}
                                    </div>
                            }

                            <span>{coin.name ? coin.name : coin.symbol}</span>
                        </div>}

                        <DialogDescription
                            className="text-[11px] m-[4px_0px] sr-only"
                        >
                            {coin && coin.name} details dialog
                        </DialogDescription>
                    </DialogTitle>
                </DialogHeader>

                <DialogBody>
                    {coin?.name ? <CoinDetailsBlock
                        fetchingCoinDetails={fetchingCoinDetails}
                        coinDetails={coinDetails}
                    /> : <div className="no-value-text !text-center">No details available.</div>}
                </DialogBody>
            </DialogContent>
        </Dialog>
    )
}

export default React.memo(CoinDetailsDialog);