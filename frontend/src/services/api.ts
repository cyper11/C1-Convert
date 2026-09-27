const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export async function uploadAndConvert(
  endpoint: string,
  files: File[],
  extraFields?: Record<string, string>
): Promise<{
  success: boolean;
  filename?: string;
  download_url?: string;
  original_size?: number;
  output_size?: number;
  error?: string;
  page_count?: number;
}> {
  const formData = new FormData();

  if (files.length === 1) {
    formData.append('file', files[0]);
  } else {
    files.forEach((f) => formData.append('files', f));
  }

  if (extraFields) {
    Object.entries(extraFields).forEach(([key, value]) => {
      formData.append(key, value);
    });
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      success: false,
      error: data.detail || data.error || `Server error (${response.status})`,
    };
  }

  return data;
}

export async function downloadFile(downloadUrl: string, filename: string): Promise<void> {
  const response = await fetch(`${API_BASE}${downloadUrl}`);
  if (!response.ok) {
    throw new Error(`Download failed: ${response.statusText}`);
  }
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function getPdfInfo(fileId: string): Promise<{
  page_count: number;
  pages: Array<{ width: number; height: number }>;
}> {
  const response = await fetch(`${API_BASE}/api/pdf/info/${fileId}`);
  if (!response.ok) {
    throw new Error('Failed to get PDF info');
  }
  return response.json();
}

export async function uploadForInfo(file: File): Promise<{
  file_id: string;
  page_count: number;
  pages: Array<{ width: number; height: number }>;
}> {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch(`${API_BASE}/api/pdf/upload-for-info`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.detail || 'Failed to upload file');
  }
  return response.json();
}

export function getThumbnailUrl(fileId: string, page: number): string {
  return `${API_BASE}/api/pdf/thumbnail/${fileId}/${page}`;
}

export async function checkHealth(): Promise<{
  status: string;
  dependencies: Record<string, boolean>;
}> {
  const response = await fetch(`${API_BASE}/api/health`);
  return response.json();
}
