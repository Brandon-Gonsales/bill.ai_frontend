import type { OcrEngine } from "./api.interface";

export interface ProcessingJob {
  id: string;
  files: File[];
  ocrEngine: OcrEngine;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  result?: ProcessingResult;
  error?: string;
}

export interface ProcessingResult {
  downloadUrl: string;
  processedCount: number;
  totalFiles: number;
  excelData?: unknown[];
}

export interface FileProcessingStatus {
  fileName: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  error?: string;
}