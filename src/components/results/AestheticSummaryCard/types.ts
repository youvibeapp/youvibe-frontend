import type {
  ProcessedAnalysis,
  ProcessedCelebrityMatch,
} from '@/lib/types/aesthetic';

export interface AestheticSummaryCardProps {
  analysis: ProcessedAnalysis;
  celebrityMatch?: ProcessedCelebrityMatch;
  userImageUrl?: string;
}
