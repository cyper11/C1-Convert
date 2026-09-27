import type { ElementType } from 'react';

export type ToolCategory = 'Documents' | 'PDF' | 'Images' | 'Compression' | 'Security' | 'OCR';

export interface ToolConfig {
  id: string;
  name: string;
  description: string;
  inputFormat: string;
  outputFormat: string;
  accepted: string[];
  category: ToolCategory;
  icon: ElementType;
  route: string;
  accent: string;
  apiEndpoint: string;
  multiple?: boolean;
}

export type ConversionStatus = 'idle' | 'uploading' | 'processing' | 'success' | 'error';

export interface ConversionResult {
  success: boolean;
  filename: string;
  download_url: string;
  original_size: number;
  output_size: number;
  error?: string;
}

export interface HealthStatus {
  status: string;
  dependencies: {
    libreoffice: boolean;
    ghostscript: boolean;
    tesseract: boolean;
  };
}

export interface PdfInfo {
  page_count: number;
  pages: Array<{ width: number; height: number }>;
}
