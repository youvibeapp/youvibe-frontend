// Backend API Types - These match the FastAPI backend schemas

export interface BackendImageAnalysisInput {
  image_bytes?: string; // base64 encoded bytes
  image_base64?: string;
}

export interface BackendImageDescriptiveMetadata {
  tags: string[];
  caption: string;
  style: string;
  mood: string;
  color_palette_hexcodes: string[];
}

export interface BackendFacialAnalysisMetadata {
  // Basic demographics
  age_range: string;
  gender: string;
  ethnicity?: string;

  // Facial Structure Analysis
  jaw_line: string;
  chin: string;
  cheeks: string;
  forehead: string;

  // Individual Facial Features
  eyebrows: string;
  eyes: string;
  nose: string;
  lips: string;

  // Style & Grooming Assessment
  skin_texture: string;
  beard_moustache_area: string;
  current_hair_style: string;
  hair_style_improvement_suggestions: string;
  clothing_style_suggestions: string;

  // Overall Assessment
  overall_appearance: string;
  confidence_score: number;
}

export interface BackendImageAnalysisResult {
  descriptive_metadata?: BackendImageDescriptiveMetadata;
  facial_metadata?: BackendFacialAnalysisMetadata;
  semantic_embedding?: number[];
}

export interface BackendImageQueryInput {
  query?: string;
  tags?: string;
  orientation?: string;
  color?: string;
  prompt?: string;
  metadata?: Record<string, unknown>;
}

export interface BackendImageSearchResult {
  id: string;
  title?: string;
  description?: string;
  tags?: string;
  owner?: string;
  image_url?: string;
  image_bytes?: string; // base64 encoded
  source_page?: string;
  source_type: 'search' | 'generative';
}

// Celebrity Match Types
export interface BackendCelebrityMatchInput {
  facial_metadata: BackendFacialAnalysisMetadata;
  max_matches?: number;
  search_criteria?: string;
}

export interface BackendCelebrityImage {
  file_path: string; // TMDB image path
  width: number;
  height: number;
}

export interface BackendCelebrityMatch {
  name: string;
  description: string; // Brief description of why they match
  confidence_score: number; // 0.0 to 1.0
  profession: string; // e.g., "Actor", "Singer", "Model"
  match_reasons: string[]; // Top 2-3 matching features
  images: BackendCelebrityImage[]; // Celebrity profile images
}

export interface BackendCelebrityMatchResult {
  matches: BackendCelebrityMatch[];
  search_summary: string; // Brief summary of matching process
}

// API Error Response
export interface BackendErrorResponse {
  detail: string;
}
