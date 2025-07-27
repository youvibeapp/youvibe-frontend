import { Button } from '@/components/ui/button';
import { ActionButtonsProps } from './types';

export default function ActionButtons({
  onDownload,
  onStartOver,
}: ActionButtonsProps) {
  return (
    <div className="pt-4 space-y-3">
      <Button
        variant="outline"
        className="w-full h-12 rounded-full font-semibold border-gray-300 text-[#3c3c43] hover:bg-gray-100 bg-transparent"
        onClick={onDownload}
      >
        Download Moodboard
      </Button>
      {onStartOver && (
        <Button
          variant="outline"
          className="w-full h-12 rounded-full font-semibold border-gray-200 text-gray-500 hover:bg-gray-50 bg-transparent"
          onClick={onStartOver}
        >
          Start Over
        </Button>
      )}
    </div>
  );
}
