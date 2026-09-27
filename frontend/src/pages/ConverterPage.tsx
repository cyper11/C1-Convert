import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Download, FileText, ShieldCheck, UploadCloud, X } from 'lucide-react';
import { Page } from '../components/Page';
import { ConversionStatusDisplay } from '../components/ConversionStatus';
import { ToolGrid } from '../components/ToolCard';
import { uploadAndConvert, downloadFile } from '../services/api';
import { formatBytes, validateFile } from '../utils';
import { tools } from '../config/tools';
import type { ToolConfig, ConversionStatus } from '../types';

export function ConverterPage({ c }: { c: ToolConfig }) {
  const [files, setFiles] = useState<File[]>([]);
  const [drag, setDrag] = useState(false);
  const [status, setStatus] = useState<ConversionStatus>('idle');
  const [error, setError] = useState('');
  const [result, setResult] = useState<{
    filename: string;
    download_url: string;
    original_size: number;
    output_size: number;
  } | null>(null);

  const handleFiles = (fileList: FileList) => {
    const fileArr = Array.from(fileList);
    for (const f of fileArr) {
      const err = validateFile(f, c.accepted, c.inputFormat);
      if (err) {
        setError(err);
        setStatus('error');
        return;
      }
    }
    setFiles(c.multiple ? [...files, ...fileArr] : [fileArr[0]]);
    setStatus('idle');
    setError('');
  };

  const start = async () => {
    if (files.length === 0) {
      setError('Please choose a file before converting.');
      setStatus('error');
      return;
    }
    setStatus('uploading');
    setError('');

    try {
      setStatus('processing');
      const data = await uploadAndConvert(c.apiEndpoint, files);

      if (!data.success) {
        setError(data.error || 'Conversion failed.');
        setStatus('error');
        return;
      }

      setResult({
        filename: data.filename!,
        download_url: data.download_url!,
        original_size: data.original_size || files[0].size,
        output_size: data.output_size || 0,
      });
      setStatus('success');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Connection error. Is the backend running?';
      setError(message);
      setStatus('error');
    }
  };

  const handleDownload = async () => {
    if (result) {
      try {
        await downloadFile(result.download_url, result.filename);
      } catch {
        setError('Download failed. The file may have expired.');
        setStatus('error');
      }
    }
  };

  const reset = () => {
    setFiles([]);
    setStatus('idle');
    setError('');
    setResult(null);
  };

  // Other tools excluding current
  const otherTools = tools.filter((t) => t.id !== c.id).slice(0, 4);

  return (
    <Page>
      <div className="page-container aid-converter-container">
        {/* Breadcrumb Navigation */}
        <nav className="aid-breadcrumbs">
          <Link to="/">Home</Link>
          <span className="bc-sep">/</span>
          <Link to="/tools">Tools</Link>
          <span className="bc-sep">/</span>
          <span className="bc-active">{c.name}</span>
        </nav>

        {/* 2-Column Hero Section matching pdfaid.com */}
        <div className="aid-hero-grid">
          {/* Left Column: Title & Feature bullets */}
          <div className="aid-overview-col">
            <h1 className="aid-page-title">{c.name}</h1>
            <p className="aid-caption">{c.description}</p>

            <ul className="aid-feature-list">
              <li>
                <span className="aid-bullet-check"><Check size={16} /></span>
                <span>Work directly in your browser without software</span>
              </li>
              <li>
                <span className="aid-bullet-check"><Check size={16} /></span>
                <span>Keep original formatting, images, and tables intact</span>
              </li>
              <li>
                <span className="aid-bullet-check"><Check size={16} /></span>
                <span>Fast conversion and instant file downloads</span>
              </li>
              <li>
                <span className="aid-bullet-check"><Check size={16} /></span>
                <span>Files are automatically deleted after processing</span>
              </li>
            </ul>

            <div className="hero-trust-banner">
              <ShieldCheck size={20} />
              <span>
                <strong>Private &amp; Secure:</strong> Zero model training. Automatic purge in 30 mins.{' '}
                <Link to="/ethics">Ethical Commitments →</Link>
              </span>
            </div>
          </div>

          {/* Right Column: Upload Card */}
          <div className="aid-field-col">
            <div className="upload-box-card">
              <div className="upload-box-header">
                <h3>Upload your {c.inputFormat} file</h3>
                <span className="upload-box-limit">Max 50 MB</span>
              </div>

              {status === 'idle' && files.length === 0 && (
                <div
                  className={`upload-drop-area ${drag ? 'dragging' : ''}`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDrag(true);
                  }}
                  onDragLeave={() => setDrag(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDrag(false);
                    if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
                  }}
                >
                  <div className="upload-illustration">
                    <div className="doc-icon-wrap">
                      <UploadCloud size={38} />
                    </div>
                  </div>

                  <p className="drop-caption">Drop {c.inputFormat} file here</p>
                  <div className="or-divider">
                    <span>OR</span>
                  </div>

                  <label className="button button-primary upload-main-btn">
                    <UploadCloud size={19} />
                    <span>Choose {c.inputFormat}</span>
                    <input
                      type="file"
                      hidden
                      accept={c.accepted.join(',')}
                      multiple={c.multiple}
                      onChange={(e) => e.target.files && handleFiles(e.target.files)}
                    />
                  </label>

                  <span className="drop-sub-notice">
                    Upload documents up to 50 MB
                  </span>
                </div>
              )}

              {status === 'idle' && files.length > 0 && (
                <div className="upload-selected-state">
                  <div className="selected-files-list">
                    {files.map((f, i) => (
                      <div key={`${f.name}-${i}`} className="selected-file-row">
                        <div className="file-icon-badge">
                          <FileText size={22} />
                        </div>
                        <div className="selected-file-meta">
                          <strong>{f.name}</strong>
                          <span>{formatBytes(f.size)}</span>
                        </div>
                        <button
                          type="button"
                          className="icon-button small remove-btn"
                          onClick={() => {
                            const next = files.filter((_, j) => j !== i);
                            setFiles(next);
                            if (next.length === 0) reset();
                          }}
                          title="Remove file"
                        >
                          <X size={17} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="upload-action-row">
                    <button
                      type="button"
                      className="button button-primary full large-btn"
                      onClick={start}
                    >
                      <span>Convert to {c.outputFormat}</span>
                      <ArrowRight size={18} />
                    </button>
                    <button
                      type="button"
                      className="button button-secondary full"
                      onClick={reset}
                    >
                      Choose another file
                    </button>
                  </div>
                </div>
              )}

              {(status === 'uploading' || status === 'processing') && (
                <ConversionStatusDisplay status={status} onRetry={reset} />
              )}

              {status === 'success' && result && (
                <div className="result-state">
                  <div className="result-heading">
                    <div className="success-mark">
                      <Check size={24} />
                    </div>
                    <div>
                      <span className="eyebrow">SUCCESS</span>
                      <h3>Conversion complete</h3>
                    </div>
                  </div>

                  <div className="conversion-files">
                    <div>
                      <FileText size={20} />
                      <span>{files[0]?.name || 'Original'}</span>
                    </div>
                    <span className="arrow-down">→</span>
                    <div>
                      <FileText size={20} />
                      <span>{result.filename}</span>
                    </div>
                  </div>

                  <div className="result-details">
                    <div>
                      <span>Original</span>
                      <strong>{formatBytes(result.original_size)}</strong>
                    </div>
                    <div>
                      <span>Output</span>
                      <strong>{formatBytes(result.output_size)}</strong>
                    </div>
                    <div>
                      <span>Format</span>
                      <strong>{c.outputFormat}</strong>
                    </div>
                  </div>

                  <div className="result-actions">
                    <button className="button button-primary large-btn" onClick={handleDownload}>
                      <Download size={18} /> Download {c.outputFormat}
                    </button>
                    <button className="button button-secondary" onClick={reset}>
                      Convert another
                    </button>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <ConversionStatusDisplay status="error" error={error} onRetry={reset} />
              )}

              <div className="upload-box-footer">
                <span>🔒 Secure SSL processing · Files automatically cleared after 30 min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Other Tools Section below */}
        <section className="aid-other-tools">
          <div className="section-heading">
            <div>
              <span className="eyebrow">MORE TOOLS</span>
              <h2>Explore more PDF tools</h2>
            </div>
            <Link className="text-link" to="/tools">
              View all tools <ArrowRight size={14} />
            </Link>
          </div>
          <ToolGrid items={otherTools} />
        </section>
      </div>
    </Page>
  );
}
