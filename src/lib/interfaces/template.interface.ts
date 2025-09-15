export interface ExcelTemplate {
  file: File | null;
  fields: string[];
  uploaded: boolean;
  isValid: boolean;
}