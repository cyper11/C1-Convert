import { FileText, X } from 'lucide-react';
import { formatBytes } from '../utils';

interface FileRowProps {
  file: File;
  remove: () => void;
  index?: number;
}

export function FileRow({ file, remove, index }: FileRowProps) {
  return (
    <div className="file-row">
      <div className="file-icon">
        <FileText size={18} />
      </div>
      <div className="file-details">
        {index !== undefined && (
          <span className="file-index">{String(index + 1).padStart(2, '0')}</span>
        )}
        <strong>{file.name}</strong>
        <span>
          {formatBytes(file.size)} · {file.type || 'Unknown type'}
        </span>
      </div>
      <button className="icon-button" aria-label={`Remove ${file.name}`} onClick={remove}>
        <X size={17} />
      </button>
    </div>
  );
}
