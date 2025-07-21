import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { UploadSectionProps } from './types';
import { useRef } from 'react';

export default function UploadSection({
  onUpload,
  disabled = false,
}: UploadSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };
  return (
    <main className="flex-grow flex items-center justify-center p-2">
      <div className="w-full h-full rounded-[32px] bg-white shadow-lg flex flex-col justify-center items-center text-center p-8">
        <div className="max-w-xs">
          <h2 className="text-4xl font-bold text-black">
            Build Your Aesthetic
          </h2>
          <p className="mt-4 text-base text-[#606367]">
            Transform your photo into a complete aesthetic reading including
            your vibe summary, celebrity match, color story, and a custom
            moodboard.
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            className="mt-8 bg-[#3c3c43] text-white rounded-full h-14 w-full text-lg font-semibold hover:bg-[#2c2c33] disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleUploadClick}
            disabled={disabled}
          >
            <PlusIcon className="mr-2 h-5 w-5" />
            Upload Photo
          </Button>
        </div>
      </div>
    </main>
  );
}
