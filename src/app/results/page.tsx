'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AppShell from '@/components/layout/AppShell';
import Header from '@/components/layout/Header';
import AestheticSummaryCard from '@/components/results/AestheticSummaryCard';
import MoodboardGrid from '@/components/results/MoodboardGrid';
import ActionButtons from '@/components/results/ActionButtons';
import { useAestheticResults } from '@/contexts/AestheticResultsContext';
import {
  transformToMoodboardProps,
  transformToSummaryProps,
  hasValidResult,
} from '@/lib/transformers/aestheticTransformers';

export default function ResultsPage() {
  const router = useRouter();
  const { result, originalImageUrl, clearResult } = useAestheticResults();

  // Redirect to home if no result data
  useEffect(() => {
    if (!hasValidResult(result)) {
      router.push('/');
    }
  }, [result, router]);

  // Don't render if no valid result
  if (!hasValidResult(result)) {
    return null; // or a loading spinner
  }

  // Transform data for components
  const moodboardProps = transformToMoodboardProps(result);
  const summaryProps = transformToSummaryProps(
    result,
    originalImageUrl || undefined
  );

  // Handler for starting over
  const handleStartOver = () => {
    clearResult();
    router.push('/');
  };

  return (
    <AppShell>
      <Header />
      <main className="flex-grow flex flex-col p-2 overflow-hidden h-full">
        {/* Summary Section - Fixed Height with max constraint */}
        <div className="flex-shrink-0 mb-3 max-h-[35vh] overflow-y-auto">
          <AestheticSummaryCard {...summaryProps} />
        </div>

        {/* Moodboard Section - Flexible Height */}
        <div className="flex-1 mb-3 min-h-0 overflow-hidden">
          <MoodboardGrid {...moodboardProps} />
        </div>

        {/* Actions Section - Fixed Height */}
        <div className="flex-shrink-0">
          <ActionButtons onStartOver={handleStartOver} />
        </div>
      </main>
    </AppShell>
  );
}
