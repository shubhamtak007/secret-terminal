import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    cacheComponents: true,
    partialPrefetching: true,

    reactCompiler: true,
    typedRoutes: true,

    devIndicators: false,
    productionBrowserSourceMaps: false,
    reactStrictMode: false,

    images: {
        minimumCacheTTL: 31536000,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'coin-images.coingecko.com',
                pathname: '/**'
            }, {
                protocol: 'https',
                hostname: 'assets.coingecko.com',
                pathname: '/**'
            }
        ]
    }
};

export default nextConfig;
