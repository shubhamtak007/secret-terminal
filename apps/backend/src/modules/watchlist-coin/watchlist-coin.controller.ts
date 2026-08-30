import { Request, Response } from "express";
import WatchlistCoinService from "./watchlist-coin.service.js";

async function addWatchlistCoin(request: Request, response: Response) {
    try {
        const watchlistCoin = await WatchlistCoinService.addWatchlistCoin(request.body);

        return response.status(200).json({
            data: watchlistCoin,
            message: 'Added Successfully!!'
        })
    } catch (error: unknown) {
        return handleError(error, response);
    }
}

async function deleteWatchlistCoin(request: Request, response: Response) {
    try {
        const watchlistCoinId = request.params.id.toString();
        const deletedWatchlistCoin = await WatchlistCoinService.deleteWatchListCoin(watchlistCoinId);

        if (deletedWatchlistCoin.id) {
            return response.status(200).json({
                message: 'Deleted Successfully!!'
            })
        }
    } catch (error: unknown) {
        return handleError(error, response);
    }
}

async function retrieveWatchlistCoins(request: Request, response: Response) {
    try {
        const params = {
            watchlistId: request.query.watchlistId ? String(request.query.watchlistId) : null
        }

        const watchListList = await WatchlistCoinService.retrieveWatchlistCoins(params);

        return response.status(200).json({
            data: watchListList
        })
    } catch (error: unknown) {
        return handleError(error, response);
    }
}

function handleError(error: unknown, response: Response) {
    return response.status(400).json({
        message: (error instanceof Error) ? error.message : JSON.stringify(error)
    })
}

export { addWatchlistCoin, deleteWatchlistCoin, retrieveWatchlistCoins };