import { Suspense } from 'react';
import CoinAnalysisContainer from '@/src/components/features/coin-analysis/coin-analysis-container';
import Loading from './loading';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ id: string }>
    searchParams: Promise<Record<string, string | string[]>>
}

export async function generateMetadata({ params }: Props) {
    const { id } = await params;

    return {
        title: id.charAt(0).toUpperCase() + id.slice(1)
    }
}

async function CoinAnalysis({ params }: Props) {
    const { id } = await params;

    return (
        <Suspense fallback={<Loading />}>
            <CoinAnalysisContainer
                coinId={id}
            />
        </Suspense>
    )
}

export default CoinAnalysis;