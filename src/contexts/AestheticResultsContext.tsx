'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { AestheticResult } from '@/lib/types/aesthetic';

interface AestheticResultsContextType {
  result: AestheticResult | null;
  setResult: (result: AestheticResult | null) => void;
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

  const clearResult = () => setResult(null);

  return (
    <AestheticResultsContext.Provider
      value={{ result, setResult, clearResult }}
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
