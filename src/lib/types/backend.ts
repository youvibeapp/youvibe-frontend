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

export interface BackendImageAnalysisResult {
  descriptive_metadata?: BackendImageDescriptiveMetadata;
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

// API Error Response
export interface BackendErrorResponse {
  detail: string;
}
