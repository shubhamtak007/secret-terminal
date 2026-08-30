import { secretTerminalDb } from "../../config/db.js";

async function addWatchlistCoin(requestBody: Record<string, string>) {
    const foundWatchlistCoin = await secretTerminalDb.watchlistCoin.findFirst({
        where: {
            coinId: requestBody.coinId,
            watchlistId: requestBody.watchlistId
        }
    })

    if (foundWatchlistCoin?.id) {
        throw new Error(`${requestBody.name} already added in watchlist!!`)
    }

    const watchlistCoin = await secretTerminalDb.watchlistCoin.create({
        data: {
            watchlistId: requestBody.watchlistId,
            coinId: requestBody.coinId,
            name: requestBody.name,
            symbol: requestBody.symbol,
            imageUrl: requestBody.imageUrl
        }
    })

    return watchlistCoin;
}

async function deleteWatchListCoin(watchlistCoinId: string) {
    if (!watchlistCoinId) {
        throw new Error('watchlistCoinId is required!!');
    }

    const deletedWatchlistCoin = await secretTerminalDb.watchlistCoin.delete({
        where: { id: watchlistCoinId }
    })

    return deletedWatchlistCoin;
}

async function retrieveWatchlistCoins(params: Record<string, string | null | undefined>) {
    const watchlistCoins = await secretTerminalDb.watchlistCoin.findMany(params.watchlistId ? {
        where: {
            watchlistId: params.watchlistId
        }, orderBy: {
            updatedAt: 'desc'
        }
    } : undefined);

    return watchlistCoins;
}

const WatchlistCoinService = { addWatchlistCoin, deleteWatchListCoin, retrieveWatchlistCoins };

export default WatchlistCoinService;