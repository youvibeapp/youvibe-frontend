import Image from 'next/image';
import { LoadingOverlayProps } from './types';

export default function LoadingOverlay({
  backgroundImage = 'https://upload.wikimedia.org/wikipedia/en/7/7d/Lenna_%28test_image%29.png',
  loadingText = 'reading your aura...',
  showIcon = true,
}: LoadingOverlayProps) {
  return (
    <main className="flex-grow flex items-center justify-center p-2 h-[647px]">
      <div className="relative w-full max-w-xl h-full rounded-[32px] overflow-hidden shadow-lg mx-auto">
        {backgroundImage && (
          <Image
            src={backgroundImage}
            alt="User uploaded content"
            fill
            className="z-0 object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/20 z-10" />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white">
          {showIcon && (
            <div className="animate-bounce">
              <Image
                src="/loading-state.svg"
                alt="Loading icon"
                width={100}
                height={100}
              />
            </div>
          )}
          <p
            className={`text-lg font-medium animate-bounce ${showIcon ? 'mt-4' : ''}`}
          >
            {loadingText}
          </p>
        </div>
      </div>
    </main>
  );
}
