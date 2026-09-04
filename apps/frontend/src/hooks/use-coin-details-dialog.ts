'use client';

import { useEffect, useState } from 'react';
import { CoinDetailsServerResponse, ClientCoinProperties } from '@/interfaces/coin-details.interface';
import { retrieveCoinDetailsByCoinId } from '@/services/coin.service';
import { CoinDetailsDialogCoin } from '../interfaces/coin.interface';

type Bindings = {
    showDialog: boolean,
    coin: CoinDetailsDialogCoin | null
}

export default function useCoinDetailsDialog(bindings: Bindings) {
    const { showDialog, coin } = bindings;
    const coinId = coin?.id;
    const coinSymbol = coin?.symbol;
    const [coinDetails, setCoinDetails] = useState<ClientCoinProperties | null>(null);
    const [fetchingCoinDetails, setFetchingCoinDetails] = useState<boolean>(false);

    useEffect(() => {
        if (!showDialog) return;
        if (!coin) return;

        const parts = coinId?.split('-');

        if (coinId && parts && parts.length > 0 && (parts.length < 2 || !parts[2].startsWith('4'))) {
            fetchCoinDetailsByCoinId(coinId);
        } else {
            if (coinSymbol) fetchCoinDetailsByName(coinSymbol);
        }
    }, [coinId, coinSymbol, showDialog]);

    async function fetchCoinDetailsByCoinId(coinId: string) {
        if (!coinId) return;
        setCoinDetails(null);
        setFetchingCoinDetails(true);

        try {
            const response = await retrieveCoinDetailsByCoinId(coinId);
            const coinProperties = await createCoinProperties(response.data.data);
            if (coinProperties) setCoinDetails(coinProperties);
        } catch (error) {
            console.log(error);
        } finally {
            setFetchingCoinDetails(false);
        }
    }

    async function fetchCoinDetailsByName(coinSymbol: string) {
        if (!coin) return;

        setCoinDetails(null);
        setFetchingCoinDetails(true);

        try {
            const description = await getCoinDescription(null, coinSymbol);
            setCoinDetails({
                id: coin.id,
                symbol: coin.symbol,
                description: description
            })
        } catch (error) {
            console.log(error);
        } finally {
            setFetchingCoinDetails(false);
        }
    }

    async function createCoinProperties(serverCoinProperties: CoinDetailsServerResponse) {
        if (!serverCoinProperties) return null;

        const properties = {
            id: serverCoinProperties.id,
            name: serverCoinProperties.name,
            symbol: serverCoinProperties.symbol,
            description: await getCoinDescription(serverCoinProperties.description.en, serverCoinProperties.name),
            imageUrl: serverCoinProperties.image.large,
            websiteUrl: serverCoinProperties.links.homepage[0],
            socialLinks: [
                { name: 'Reddit', url: serverCoinProperties.links.subreddit_url },
                { name: 'Github', url: serverCoinProperties.links.repos_url.github[0] }
            ],
            currentPrice: serverCoinProperties.market_data.current_price.usd
        }

        return properties;
    }

    async function getCoinDescription(description: string | null, name: string) {
        if (description && description.length < 250) return description;

        const descriptionPrompt = `Explain ${name} in 50 to 100 words. Briefly cover what it is,
        its main purpose, how it works, its key features, and what makes it different from other cryptocurrencies.
        Use simple, clear language suitable for someone who understands basic cryptocurrency concepts. Avoid
        unnecessary technical details, speculation, and overly promotional language.`

        if ('LanguageModel' in globalThis) {
            const session = await (self as any).LanguageModel.create({
                expectedInputs: [
                    { type: "text", languages: ["en"] }
                ],
                expectedOutputs: [
                    { type: "text", languages: ["en"] }
                ]
            });
            const response = await session.prompt(descriptionPrompt);
            return response;
        }
    }

    return { fetchingCoinDetails, coinDetails };
}