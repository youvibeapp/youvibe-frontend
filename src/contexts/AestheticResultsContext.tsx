'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { AestheticResult } from '@/lib/types/aesthetic';

interface AestheticResultsContextType {
  result: AestheticResult | null;
  originalImageUrl: string | null;
  setResult: (
    result: AestheticResult | null,
    originalImageUrl?: string
  ) => void;
  clearResult: () => void;
}

const AestheticResultsContext = createContext<
  AestheticResultsContextType | undefined
>(undefined);

export function AestheticResultsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [result, setResult] = useState<AestheticResult | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);

  const setResultWithImage = (
    newResult: AestheticResult | null,
    imageUrl?: string
  ) => {
    setResult(newResult);
    if (imageUrl !== undefined) {
      setOriginalImageUrl(imageUrl);
    }
  };

  const clearResult = () => {
    setResult(null);
    setOriginalImageUrl(null);
  };

  return (
    <AestheticResultsContext.Provider
      value={{
        result,
        originalImageUrl,
        setResult: setResultWithImage,
        clearResult,
      }}
    >
      {children}
    </AestheticResultsContext.Provider>
  );
}

export function useAestheticResults() {
  const context = useContext(AestheticResultsContext);
  if (context === undefined) {
    throw new Error(
      'useAestheticResults must be used within an AestheticResultsProvider'
    );
  }
  return context;
}
