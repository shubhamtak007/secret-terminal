'use client';

import { useEffect, useState } from 'react';
import { CoinDetailsServerResponse, ClientCoinProperties } from '@/src/interfaces/coin-details.interface';
import { retrieveCoinDetailsByCoinId } from '@/src/services/coin.service';

type Bindings = {
    showDialog: boolean,
    coinId?: string
}

export default function useCoinDetailsDialog(bindings: Bindings) {
    const { showDialog, coinId } = bindings;
    const [coinDetails, setCoinDetails] = useState<ClientCoinProperties | null>(null);
    const [fetchingCoinDetails, setFetchingCoinDetails] = useState<boolean>(false);

    useEffect(() => {
        if (!showDialog) return;
    }, []);

    useEffect(() => {
        if (coinId) fetchCoinDetailsByCoinId(coinId);
    }, [coinId]);

    async function fetchCoinDetailsByCoinId(coinId: string) {
        if (!coinId) return;
        setFetchingCoinDetails(true);

        try {
            const response = await retrieveCoinDetailsByCoinId(coinId);
            const coinProperties = await createCoinProperties(response.data);
            if (coinProperties) setCoinDetails(coinProperties);
        } catch (error) {

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
            description: await summarizeDescription(serverCoinProperties.description.en, serverCoinProperties.name),
            imageUrl: serverCoinProperties.image.large,
            websiteUrl: serverCoinProperties.links.homepage[0],
            socialLinks: [
                { name: 'Reddit', url: serverCoinProperties.links.subreddit_url },
                { name: 'Github', url: serverCoinProperties.links.repos_url.github[0] }
            ],
            currentPrice: serverCoinProperties.market_data.current_price.usd
        }

        return properties
    }

    async function summarizeDescription(description: string, name: string) {
        if (description.length > 0 && description.length < 250) return description;

        if ('LanguageModel' in globalThis) {
            const session = await (self as any).LanguageModel.create();
            const response = await session.prompt(
                `Write a concise, factual description of ${name} in 50 to 100 words. Use simple, clear language.
                Focus on what it is, its main purpose, and its key features or characteristics. Avoid opinions,
                speculation, unnecessary details, and marketing language. Return only the description, with no title,
                introduction, or additional text.`
            );
            return response;
        }

        return `${description.split('.').slice(0, 3)}.`
    }

    return { fetchingCoinDetails, coinDetails };
}