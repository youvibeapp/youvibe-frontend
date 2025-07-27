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
    <Card className="p-4 rounded-3xl shadow-sm border-none h-full flex flex-col overflow-hidden">
      <div className="flex-1 w-full">
        <div
          className="grid grid-cols-3 gap-2 h-full w-full"
          style={{
            gridTemplateRows: 'repeat(3, 1fr)',
          }}
        >
          {images.slice(0, 9).map((src, index) => (
            <div
              key={index}
              className="relative w-full h-full aspect-square overflow-hidden"
            >
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
      </div>
    </Card>
  );
}
