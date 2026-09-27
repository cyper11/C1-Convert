import { useRef, useState } from 'react';
import { UploadCloud, FileUp } from 'lucide-react';

interface DropzoneProps {
  accept: string;
  onFiles: (files: FileList) => void;
  multiple?: boolean;
  label?: string;
  button?: string;
  hint?: string;
}

export function Dropzone({
  accept,
  onFiles,
  multiple = false,
  label = 'Drop your file here',
  button = 'Choose file',
  hint,
}: DropzoneProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  // Extract friendly extensions for format badges
  const formats = accept
    .split(',')
    .map((item) =>
      item
        .trim()
        .replace('application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'DOCX')
        .replace('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'XLSX')
        .replace('application/pdf', 'PDF')
        .replace('image/jpeg', 'JPG')
        .replace('image/png', 'PNG')
        .replace('.', '')
        .toUpperCase()
    )
    .filter((v, i, a) => v && a.indexOf(v) === i)
    .slice(0, 5);

  return (
    <div
      className={`dropzone ${drag ? 'dragging' : ''}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        if (e.dataTransfer.files.length) onFiles(e.dataTransfer.files);
      }}
      onClick={(e) => {
        // If clicking background area, trigger file dialog
        if ((e.target as HTMLElement).tagName !== 'BUTTON') {
          ref.current?.click();
        }
      }}
    >
      <div className="drop-icon-wrap">
        <UploadCloud size={36} className="drop-icon" />
      </div>

      <p className="drop-title">{label}</p>
      <p className="drop-sub">Drag and drop files here, or browse your folders</p>

      <div className="drop-actions">
        <button
          type="button"
          className="button button-primary drop-btn"
          onClick={(e) => {
            e.stopPropagation();
            ref.current?.click();
          }}
        >
          <FileUp size={18} />
          {button}
        </button>
      </div>

      <input
        ref={ref}
        hidden
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => e.target.files && onFiles(e.target.files)}
      />

      <div className="drop-footer">
        <div className="format-chips">
          {formats.map((fmt) => (
            <span key={fmt} className="format-chip">
              .{fmt.toLowerCase()}
            </span>
          ))}
        </div>
        <span className="drop-meta">
          {hint || 'Up to 50 MB · Automatic cleanup after conversion'}
        </span>
      </div>
    </div>
  );
}
