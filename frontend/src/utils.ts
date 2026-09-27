export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1048576) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1048576).toFixed(1)} MB`;
}

export function validateFile(
  file: File,
  accepted: string[],
  inputFormat: string,
  maxSizeMB = 50
): string {
  if (file.size > maxSizeMB * 1048576) {
    return `File is too large. Maximum size is ${maxSizeMB} MB.`;
  }
  const ext = '.' + file.name.split('.').pop()?.toLowerCase();
  if (accepted.includes(file.type) || accepted.includes(ext)) {
    return '';
  }
  return `Unsupported file type. Please choose a ${inputFormat} file.`;
}
