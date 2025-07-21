export type UploadState =
  | 'idle'
  | 'uploading'
  | 'processing'
  | 'complete'
  | 'error';

export interface FileUpload {
  file: File;
  base64: string;
  preview?: string;
}

export interface AestheticResult {
  aestheticSummary: string;
  celebrityMatch: string;
  colorStory: Array<{
    color: string;
    percentage: number;
  }>;
  moodboardImages: string[];
}

export interface UploadError {
  message: string;
  code?: string;
}
