export interface TemplateResponse {
  message: string;
  campos_detectados: string[];
}

export interface ProcessingState {
  isLoading: boolean;
  progress: number;
  currentFile?: string;
}

export interface FileUploadState {
  files: File[];
  isDragOver: boolean;
  isUploading: boolean;
}

export interface AppState {
  templateLoaded: boolean;
  detectedFields: string[];
  processedData: Blob | null;
  currentStep: 'template' | 'upload' | 'processing' | 'results';
}