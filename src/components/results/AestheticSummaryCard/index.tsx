import { Card } from '@/components/ui/card';
import CelebrityMatchSection from '../CelebrityMatchSection';
import { AestheticSummaryCardProps } from './types';

export default function AestheticSummaryCard({
  analysis,
  celebrityMatch,
  userImageUrl,
}: AestheticSummaryCardProps) {
  return (
    <Card className="p-6 rounded-3xl shadow-sm border-none">
      <div className="space-y-6">
        {/* Your Aesthetic DNA Section */}
        <div className="text-left">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            Your Aesthetic DNA
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            {celebrityMatch && celebrityMatch.matches.length > 0 ? (
              <>
                You're radiating{' '}
                <span className="font-medium">
                  {celebrityMatch.matches[0].name}
                </span>{' '}
                energy - confident, chill and a little dreamy.
              </>
            ) : (
              <>
                Your vibe is:{' '}
                {analysis.styleDescription ||
                  `${analysis.style} ${analysis.mood}`.trim()}
              </>
            )}
          </p>
        </div>

        {/* Celebrity Match Section */}
        {celebrityMatch && (
          <CelebrityMatchSection
            celebrityMatch={celebrityMatch}
            userImageUrl={userImageUrl}
          />
        )}
      </div>
    </Card>
  );
}
