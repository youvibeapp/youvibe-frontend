// Note: Backend types are imported directly where needed

// =============================================
// AESTHETIC PROCESSOR TYPES
// =============================================

// Processing states for the aesthetic workflow
export type ProcessingState =
  | 'idle' // Ready to start
  | 'analyzing' // Running image analysis
  | 'matching' // Finding celebrity matches
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

  // Facial analysis metadata (optional)
  facialAnalysis?: {
    // Basic demographics
    ageRange: string;
    gender: string;
    ethnicity?: string;

    // Facial Structure Analysis
    jawLine: string;
    chin: string;
    cheeks: string;
    forehead: string;

    // Individual Facial Features
    eyebrows: string;
    eyes: string;
    nose: string;
    lips: string;

    // Style & Grooming Assessment
    skinTexture: string;
    beardMoustacheArea: string;
    currentHairStyle: string;
    hairStyleImprovementSuggestions: string;
    clothingStyleSuggestions: string;

    // Overall Assessment
    overallAppearance: string;
    confidenceScore: number;
  };

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

// Celebrity match data in frontend-friendly format
export interface ProcessedCelebrityMatch {
  matches: CelebrityMatch[];
  searchSummary: string;
}

export interface CelebrityMatch {
  name: string;
  description: string; // Brief description of why they match
  confidenceScore: number; // 0.0 to 1.0
  profession: string; // e.g., "Actor", "Singer", "Model"
  matchReasons: string[]; // Top 2-3 matching features
  images: CelebrityImage[]; // Celebrity profile images
}

export interface CelebrityImage {
  filePath: string; // TMDB image path
  width: number;
  height: number;
  // Computed full URL for display
  fullUrl?: string;
}

// Combined result from the aesthetic processing hook
export interface AestheticResult {
  analysis: ProcessedAnalysis;
  images: ProcessedImages;
  celebrityMatch?: ProcessedCelebrityMatch; // Optional celebrity matching results
  metadata: {
    processingTimeMs: number;
    timestamp: Date;
  };
}

// Error types for the aesthetic processor
export interface AestheticError {
  type:
    | 'analysis_failed'
    | 'celebrity_match_failed'
    | 'generation_failed'
    | 'network_error'
    | 'validation_error';
  message: string;
  details?: string;
  originalError?: unknown;
}
