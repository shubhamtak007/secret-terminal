import TrendingCoinsCategoriesAndNftsContainer from '@/components/features/trending/trending-coins-categories-and-nfts-container';
import Loading from '@/app/loading';
import { Suspense } from 'react';

async function Trending() {
    return (
        <Suspense fallback={<Loading />}>
            <TrendingCoinsCategoriesAndNftsContainer />
        </Suspense>
    )
}

export default Trending;