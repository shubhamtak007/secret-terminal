'use client';

import useTrendingCoinsCategoriesAndNfts from "@/src/hooks/use-trending-coins-categories-and-nfts";
import TrendingCoinsCategoriesAndNftsTable from "@/src/components/features/trending/trending-coins-categories-and-nfts-table";
import { TrendingCoinsCategoriesAndNftsClient } from '@/src/interfaces/trending.interface';
import { Skeleton } from '@/src/components/ui/skeleton';

function TrendingCoinsCategoriesAndNftsContainer() {
    const { fetchingTrendingCoinsCategoriesAndNfts, trendingCoinsCategoriesAndNfts } = useTrendingCoinsCategoriesAndNfts();

    return (
        <div
            className="trending-coins-categories-and-nfts-container"
        >
            {fetchingTrendingCoinsCategoriesAndNfts ?
                [...Array(3)].map((_, index) => {
                    return (
                        <Skeleton key={'indicator' + index} className="min-w-[200px] item h-[262px]" />
                    )
                })
                :
                trendingCoinsCategoriesAndNfts.map((trendingItem: TrendingCoinsCategoriesAndNftsClient) => {
                    return (
                        <div
                            key={trendingItem.id}
                            className="item"
                        >
                            <h6 className="text-[12px] mb-[12px]">
                                {trendingItem.header}
                            </h6>

                            <TrendingCoinsCategoriesAndNftsTable
                                type={trendingItem.type}
                                list={trendingItem.list}
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TrendingCoinsCategoriesAndNftsContainer;