'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppShell from '@/components/layout/AppShell';
import Header from '@/components/layout/Header';
import UploadSection from '@/components/upload/UploadSection';
import LoadingOverlay from '@/components/reading/LoadingOverlay';
import { fileToBase64 } from '@/lib/fileUtils';
import { uploadImage } from '@/lib/mockApi';

// New imports for aesthetic processor
import { useAestheticProcessorWithProgress } from '@/hooks/useAestheticProcessor';
import {
  analyzeImage,
  matchCelebrities,
  generateImages,
} from '@/lib/api-client';
import { useAestheticResults } from '@/contexts/AestheticResultsContext';

export default function UploadPage() {
  // Legacy state for mock functionality (keeping for comparison)
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const router = useRouter();

  // Use the aesthetic results context
  const { setResult: setContextResult, clearResult } = useAestheticResults();

  // New: Use the aesthetic processor hook
  const {
    state,
    result,
    error,
    isIdle,
    isProcessing,
    isComplete,
    hasError,
    processImage,
    reset,
    retry,
  } = useAestheticProcessorWithProgress(
    analyzeImage,
    matchCelebrities,
    generateImages
  );

  // Auto-navigate to results when processing is complete
  useEffect(() => {
    if (isComplete && result) {
      // Store result in context for results page with original image
      setContextResult(result, previewImage || undefined);

      // Navigate to results page
      router.push('/results');
    }
  }, [isComplete, result, setContextResult, router, previewImage]);

  // Handle file selection and processing
  const handleFileChange = async (file: File) => {
    try {
      // Convert file to base64 and set preview
      const base64 = await fileToBase64(file);
      setPreviewImage(base64);

      // Upload for compatibility (mock API)
      await uploadImage(base64);

      // Process with new aesthetic service
      await processImage(base64, {
        analysisEngine: 'pydantic-ai',
        generationProvider: 'pexels',
        maxImages: 9,
      });
    } catch (err) {
      console.error('File processing failed:', err);
      // The hook handles the error state, so we don't need manual error handling
    }
  };

  // Handle retry button click
  const handleRetry = async () => {
    await retry();
  };

  // Handle reset button click
  const handleReset = () => {
    reset();
    setPreviewImage(null);
    clearResult(); // Clear context as well
  };

  // Get appropriate loading text based on processing state
  const getLoadingText = () => {
    switch (state) {
      case 'analyzing':
        return 'analyzing your aesthetic...';
      case 'matching':
        return 'finding your celebrity twin...';
      case 'generating':
        return 'creating your moodboard...';
      case 'complete':
        return 'complete! redirecting...';
      case 'error':
        return error?.message || 'something went wrong';
      default:
        return 'processing...';
    }
  };

  // Show retry button for errors
  const showRetryButton = hasError && error?.type !== 'validation_error';

  return (
    <AppShell>
      <Header />

      {/* Upload Section - Show when idle */}
      {isIdle && <UploadSection onUpload={handleFileChange} />}

      {/* Processing/Loading Overlay */}
      {(isProcessing || isComplete || hasError) && (
        <div className="relative">
          <LoadingOverlay
            backgroundImage={previewImage || undefined}
            loadingText={getLoadingText()}
            showIcon={!hasError}
          />

          {/* Error Actions */}
          {hasError && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
              {showRetryButton && (
                <button
                  onClick={handleRetry}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
              )}
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Start Over
              </button>
            </div>
          )}
        </div>
      )}
    </AppShell>
  );
}
