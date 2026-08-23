const secretTerminalEndpoints = {
    auth: {
        signUp: 'v1/auth/sign-up',
        signIn: 'v1/auth/sign-in',
        signOut: 'v1/auth/sign-out',
        refreshToken: 'v1/auth/refresh-token',
        forgotPassword: 'v1/auth/forgot-password',
        verifyResetCode: 'v1/auth/verify-reset-code',
        changePassword: 'v1/auth/change-password'

    }, users: {
        me: 'v1/users/me'
    }, news: {
        latest: 'v1/news/latest'
    },
    coins: {
        coinList: 'v1/coins',
        trending: 'v1/trending',
        globalMarket: 'v1/global-market'
    },
    watchlists: 'v1/watchlists',
    watchlistCoins: 'v1/watchlistCoins'
}

const coinGeckoEndpoints = {
    coins: {
        coinListWithMarketData: 'v3/coins/markets',
        coinDataById: 'v3/coins',
        search: 'v3/search',
        trending: 'v3/search/trending',
        globalMarket: 'v3/global'
    }
}

const binanceEndpoints = {
    coins: {
        exchangeInfo: 'v3/exchangeInfo',
        '24hrPriceChangeStats': 'v3/ticker/24hr'
    }
}

export { secretTerminalEndpoints, coinGeckoEndpoints, binanceEndpoints };