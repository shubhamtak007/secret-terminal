'use client';

import { useEffect, useState } from 'react';
import { CoinDetailsServerResponse, ClientCoinProperties } from '@/src/interfaces/coin-details.interface';
import { retrieveCoinDetailsByCoinId } from '@/src/services/coin.service';
import { CoinDetailsDialogCoin } from '../interfaces/coin.interface';

type Bindings = {
    showDialog: boolean,
    coin: CoinDetailsDialogCoin | null
}

export default function useCoinDetailsDialog(bindings: Bindings) {
    const { showDialog, coin } = bindings;
    const coinId = coin?.id;
    const [coinDetails, setCoinDetails] = useState<ClientCoinProperties | null>(null);
    const [fetchingCoinDetails, setFetchingCoinDetails] = useState<boolean>(false);

    useEffect(() => {
        if (!showDialog || !coin || !coin.name) return;
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

        const descriptionPrompt = `Write a factual, easy to understand description of ${name} in 50 to 100 words.
                        Explain what ${name} is, its primary purpose, how it works at a high level, and its key
                        features or use cases. Use clear, neutral language and include only verifiable information.
                        Avoid opinions, speculation, predictions, hype, marketing language, price information,
                        investment advice, and unnecessary technical details. Return only the description. Do not
                        include the cryptocurrency name as a heading or at the beginning of the description.`

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

        return `${description.split('.').slice(0, 3)}.`
    }

    return { fetchingCoinDetails, coinDetails };
}