import { FileUpload, UploadError } from './types';

export const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function validateFile(file: File): UploadError | null {
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      message: 'Please select a valid image file (JPEG, PNG, or WebP)',
      code: 'INVALID_FILE_TYPE',
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      message: 'File size must be less than 10MB',
      code: 'FILE_TOO_LARGE',
    };
  }

  return null;
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
}

export async function processFileUpload(file: File): Promise<FileUpload> {
  const validationError = validateFile(file);
  if (validationError) {
    throw new Error(validationError.message);
  }

  const base64 = await fileToBase64(file);

  return {
    file,
    base64,
    preview: base64,
  };
}
