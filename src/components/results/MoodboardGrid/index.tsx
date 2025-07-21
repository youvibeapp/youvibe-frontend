import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { MoodboardGridProps } from './types';

const defaultImages = [
  '/placeholder.svg?height=100&width=100',
  '/placeholder.svg?height=100&width=100',
  '/placeholder.svg?height=100&width=100',
  '/placeholder.svg?height=100&width=100',
  '/placeholder.svg?height=100&width=100',
  '/placeholder.svg?height=100&width=100',
  '/placeholder.svg?height=100&width=100',
  '/placeholder.svg?height=100&width=100',
  '/placeholder.svg?height=100&width=100',
];

export default function MoodboardGrid({
  images = defaultImages,
}: MoodboardGridProps) {
  return (
    <Card className="p-4 rounded-3xl shadow-sm border-none">
      <div className="grid grid-cols-3 gap-2">
        {images.map((src, index) => (
          <div key={index} className="aspect-square relative">
            <Image
              src={src || '/placeholder.svg'}
              alt={`Moodboard image ${index + 1}`}
              fill
              sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
              className="rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
