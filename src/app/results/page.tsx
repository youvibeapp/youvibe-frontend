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
  const { result, clearResult } = useAestheticResults();

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
  const summaryProps = transformToSummaryProps(result);

  // Handler for starting over
  const handleStartOver = () => {
    clearResult();
    router.push('/');
  };

  return (
    <AppShell>
      <Header />
      <main className="flex-grow flex flex-col space-y-4 p-2 overflow-y-auto">
        <AestheticSummaryCard {...summaryProps} />
        <MoodboardGrid {...moodboardProps} />
        <ActionButtons onStartOver={handleStartOver} />
      </main>
    </AppShell>
  );
}
