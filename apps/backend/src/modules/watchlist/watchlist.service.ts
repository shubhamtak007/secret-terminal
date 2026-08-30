import { secretTerminalDb } from "../../config/db.js";

async function addWatchlist(body: Record<string, string>, userId: string) {
    if (!body.name) {
        throw new Error("Name is required!!");
    }

    const foundWatchlist = await secretTerminalDb.watchlist.findFirst({
        where: {
            name: body.name,
            userId: userId
        }
    })

    if (foundWatchlist?.id) {
        throw new Error(`${body.name} is already exist!!`);
    }

    const watchlist = await secretTerminalDb.watchlist.create({
        data: {
            name: body.name,
            description: body.description,
            userId: userId
        }
    })

    return watchlist;
}

async function updateWatchlist(watchlistId: string, body: Record<string, string>) {
    if (!watchlistId) {
        throw new Error("watchlistId is required!!");
    }

    const updatedEntry = await secretTerminalDb.watchlist.update({
        where: {
            id: watchlistId
        },
        data: {
            name: body.name,
            description: body.description
        }
    })

    return updatedEntry;
}

async function deleteWatchlist(watchlistId: string) {
    if (!watchlistId) {
        throw new Error("watchlistId is required!!");
    }

    const deletedEntry = await secretTerminalDb.watchlist.delete({
        where: {
            id: watchlistId
        }
    })

    return deletedEntry;
}

async function retrieveWatchlists(userId: string) {
    const watchlists = await secretTerminalDb.watchlist.findMany({
        where: {
            userId: userId
        }, orderBy: {
            updatedAt: 'desc'
        }
    });

    return watchlists;
}

const WatchlistService = {
    addWatchlist, updateWatchlist, deleteWatchlist, retrieveWatchlists
}

export default WatchlistService;
