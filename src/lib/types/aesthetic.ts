// Note: Backend types are imported directly where needed

// =============================================
// AESTHETIC PROCESSOR TYPES
// =============================================

// Processing states for the aesthetic workflow
export type ProcessingState =
  | 'idle' // Ready to start
  | 'analyzing' // Running image analysis
  | 'generating' // Generating moodboard images
  | 'complete' // Workflow finished successfully
  | 'error'; // Error occurred

// Input to the aesthetic processing hook
export interface AestheticInput {
  imageBase64: string;
  options?: {
    analysisEngine?: string; // 'pydantic-ai', etc.
    generationProvider?: string; // 'flickr', 'pexels', etc.
    maxImages?: number; // Max moodboard images to generate
  };
}

// Processed analysis data in frontend-friendly format
export interface ProcessedAnalysis {
  // Descriptive metadata
  tags: string[];
  caption: string;
  style: string;
  mood: string;
  colorPalette: string[]; // Hex color codes

  // Optional semantic data
  embedding?: number[];

  // Derived properties for UI
  primaryColor: string; // First color from palette
  mainTags: string[]; // First 3-5 most relevant tags
  styleDescription: string; // Formatted style + mood combination
}

// Generated moodboard images in frontend-friendly format
export interface ProcessedImages {
  images: MoodboardImage[];
  totalFound: number;
  query: string; // The query used to generate these
  provider: string; // Which provider was used
}

export interface MoodboardImage {
  id: string;
  title?: string;
  description?: string;
  imageUrl: string;
  tags?: string[];
  owner?: string;
  sourcePage?: string;
  sourceType: 'search' | 'generative';
}

// Combined result from the aesthetic processing hook
export interface AestheticResult {
  analysis: ProcessedAnalysis;
  images: ProcessedImages;
  metadata: {
    processingTimeMs: number;
    timestamp: Date;
  };
}

// Error types for the aesthetic processor
export interface AestheticError {
  type:
    | 'analysis_failed'
    | 'generation_failed'
    | 'network_error'
    | 'validation_error';
  message: string;
  details?: string;
  originalError?: unknown;
}
