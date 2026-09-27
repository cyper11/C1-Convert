import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Download, FileText } from 'lucide-react';
import { Page } from '../components/Page';
import { Dropzone } from '../components/Dropzone';
import { FileRow } from '../components/FileRow';
import { PrivacyNote } from '../components/PrivacyNote';
import { ConversionStatusDisplay } from '../components/ConversionStatus';
import { uploadAndConvert, downloadFile } from '../services/api';
import { formatBytes } from '../utils';
import type { ConversionStatus } from '../types';

export function CompressPage() {
  const [file, setFile] = useState<File | null>(null);
  const [level, setLevel] = useState('medium');
  const [status, setStatus] = useState<ConversionStatus>('idle');
  const [error, setError] = useState('');
  const [result, setResult] = useState<{
    filename: string;
    download_url: string;
    original_size: number;
    output_size: number;
  } | null>(null);

  const compress = async () => {
    if (!file) return;
    setStatus('processing');
    setError('');
    try {
      const data = await uploadAndConvert('/api/pdf/compress', [file], { level });
      if (!data.success) {
        setError(data.error || 'Compression failed.');
        setStatus('error');
        return;
      }
      setResult({
        filename: data.filename!,
        download_url: data.download_url!,
        original_size: data.original_size || file.size,
        output_size: data.output_size || 0,
      });
      setStatus('success');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Connection error.');
      setStatus('error');
    }
  };

  const reset = () => {
    setFile(null);
    setLevel('medium');
    setStatus('idle');
    setError('');
    setResult(null);
  };

  return (
    <Page>
      <div className="page-container special-page">
        <Link className="back-link" to="/tools"><ArrowLeft size={15} /> All tools</Link>
        <div className="special-header">
          <span className="eyebrow">COMPRESSION</span>
          <h1>Compress PDF</h1>
          <p>Reduce PDF size while keeping it readable.</p>
        </div>
        <div className="compress-layout">
          <section className="card">
            {status === 'idle' && !file && (
              <Dropzone accept="application/pdf,.pdf" onFiles={(f) => setFile(f[0])} label="Drop your PDF here" button="Choose PDF" />
            )}

            {status === 'idle' && file && (
              <>
                <FileRow file={file} remove={reset} />
                <div className="compression-levels">
                  <h3>Compression level</h3>
                  {(['low', 'medium', 'high'] as const).map((x) => (
                    <button
                      key={x}
                      className={`compression-option ${level === x ? 'selected' : ''}`}
                      onClick={() => setLevel(x)}
                    >
                      <span className="radio-dot" />
                      <span>
                        <strong>{x[0].toUpperCase() + x.slice(1)} compression</strong>
                        <small>
                          {x === 'low' ? 'Best quality' : x === 'medium' ? 'Balanced result' : 'Smallest file'}
                        </small>
                      </span>
                    </button>
                  ))}
                </div>
                <button className="button button-primary full" onClick={compress}>
                  Compress PDF <ArrowRight size={16} />
                </button>
              </>
            )}

            {(status === 'uploading' || status === 'processing') && (
              <ConversionStatusDisplay status={status} onRetry={reset} />
            )}

            {status === 'success' && result && (
              <div className="result-state">
                <div className="result-heading">
                  <div className="success-mark"><Check size={22} /></div>
                  <div><span className="eyebrow">DONE</span><h3>Compression complete</h3></div>
                </div>
                <div className="result-details">
                  <div><span>Original size</span><strong>{formatBytes(result.original_size)}</strong></div>
                  <div><span>Output size</span><strong>{formatBytes(result.output_size)}</strong></div>
                  <div>
                    <span>Reduction</span>
                    <strong>
                      {result.original_size > 0
                        ? `${Math.round(((result.original_size - result.output_size) / result.original_size) * 100)}%`
                        : '—'}
                    </strong>
                  </div>
                </div>
                <div className="result-actions">
                  <button className="button button-primary" onClick={() => downloadFile(result.download_url, result.filename)}>
                    <Download size={16} /> Download compressed PDF
                  </button>
                  <button className="button button-secondary" onClick={reset}>Compress another</button>
                </div>
              </div>
            )}

            {status === 'error' && <ConversionStatusDisplay status="error" error={error} onRetry={reset} />}
            <PrivacyNote />
          </section>
          <aside className="side-card">
            <h3>Keep control</h3>
            <p className="muted">Actual compression results depend on the PDF content. Results shown are from real Ghostscript processing.</p>
          </aside>
        </div>
      </div>
    </Page>
  );
}
