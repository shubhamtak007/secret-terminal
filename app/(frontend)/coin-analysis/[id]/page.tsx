import { Suspense } from 'react';
import CoinAnalysisContainer from '@/components/features/coin-analysis/coin-analysis-container';
import Loading from './loading';

type Props = {
    params: Promise<{ id: string }>
    searchParams: Promise<Record<string, string | string[]>>
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