export const API_BASE_URL = 'http://127.0.0.1:8000';

export const ENDPOINTS = {
  UPLOAD_TEMPLATE: '/upload-template/',
  PROCESS_INVOICE: '/process-invoice/'
} as const;

export const ACCEPTED_FILE_TYPES = {
  TEMPLATE: '.xlsx,.xls',
  INVOICE: '.png,.jpg,.jpeg,.pdf'
} as const;

export const OCR_ENGINES = [
  { value: 'easyocr', label: 'EasyOCR' },
  { value: 'gemini', label: 'Gemini' }
] as const;