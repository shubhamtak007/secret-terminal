import TrendingCoinsCategoriesAndNftsContainer from '@/src/components/features/trending/trending-coins-categories-and-nfts-container';
import Loading from '@/src/app/loading';
import { Suspense } from 'react';

export async function generateMetadata() {
    return { title: 'Trending' }
}

async function Trending() {
    return (
        <Suspense fallback={<Loading />}>
            <TrendingCoinsCategoriesAndNftsContainer />
        </Suspense>
    )
}

export default Trending;