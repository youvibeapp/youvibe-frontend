import { Card } from '@/components/ui/card';
import { AestheticSummaryCardProps } from './types';

export default function AestheticSummaryCard({
  aestheticSummary = 'Your vibe is: a cozy soft girl aesthetic that has endless confidence.',
  celebrityMatch = 'Your aesthetic match is: ✨ Hailey Bieber ✨',
  colorStory = [
    { color: '#d2bdb1', percentage: 35 },
    { color: '#f38695', percentage: 30 },
    { color: '#0c2a6b', percentage: 25 },
    { color: '#fffcf4', percentage: 10 },
  ],
}: AestheticSummaryCardProps) {
  return (
    <Card className="p-6 rounded-3xl shadow-sm border-none">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-black">
            Aesthetic Summary
          </h3>
          <p className="text-sm text-[#606367] mt-1">{aestheticSummary}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-black">Celebrity Match</h3>
          <p className="text-sm text-[#606367] mt-1">{celebrityMatch}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-black">Your Color Story</h3>
          <div className="w-full h-3 rounded-full overflow-hidden flex mt-2">
            {colorStory.map((colorItem, index) => (
              <div
                key={index}
                className="bg-[#d2bdb1]"
                style={{
                  backgroundColor: colorItem.color,
                  width: `${colorItem.percentage}%`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
