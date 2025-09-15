export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface TemplateUploadResponse {
  message: string;
  campos_detectados: string[];
}

export interface ProcessInvoiceRequest {
  ocr_engine: 'easyocr' | 'gemini';
  files: File[];
}

export type OcrEngine = 'easyocr' | 'gemini';