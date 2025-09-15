import type { OcrEngine, TemplateUploadResponse } from "$lib/interfaces/api.interface";

const API_BASE_URL = 'http://127.0.0.1:8000';

export class ApiService {
  static async uploadTemplate(file: File): Promise<TemplateUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/upload-template/`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  static async processInvoices(files: File[], ocrEngine: OcrEngine): Promise<Blob> {
    const formData = new FormData();
    formData.append('ocr_engine', ocrEngine);
    
    files.forEach((file) => {
      formData.append('file', file);
    });

    const response = await fetch(`${API_BASE_URL}/process-invoice/`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    return response.blob();
  }
}