import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Download, FileText } from 'lucide-react';
import { Page } from '../components/Page';
import { Dropzone } from '../components/Dropzone';
import { FileRow } from '../components/FileRow';
import { PrivacyNote } from '../components/PrivacyNote';
import { ConversionStatusDisplay } from '../components/ConversionStatus';
import { uploadAndConvert, uploadForInfo, downloadFile, getThumbnailUrl } from '../services/api';
import { formatBytes } from '../utils';
import type { ConversionStatus } from '../types';

export function SplitPage() {
  const [file, setFile] = useState<File | null>(null);
  const [fileId, setFileId] = useState<string>('');
  const [pageCount, setPageCount] = useState(0);
  const [sel, setSel] = useState<number[]>([]);
  const [status, setStatus] = useState<ConversionStatus>('idle');
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ filename: string; download_url: string; output_size: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (fs: FileList) => {
    const f = fs[0];
    if (!f) return;
    setFile(f);
    setLoading(true);
    try {
      const info = await uploadForInfo(f);
      setFileId(info.file_id);
      setPageCount(info.page_count);
      setSel([]);
      setLoading(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to analyze PDF');
      setStatus('error');
      setLoading(false);
    }
  };

  const split = async () => {
    if (!file || sel.length === 0) return;
    setStatus('processing');
    setError('');
    try {
      const data = await uploadAndConvert('/api/pdf/split', [file], { pages: JSON.stringify(sel) });
      if (!data.success) {
        setError(data.error || 'Split failed.');
        setStatus('error');
        return;
      }
      setResult({ filename: data.filename!, download_url: data.download_url!, output_size: data.output_size || 0 });
      setStatus('success');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Connection error.');
      setStatus('error');
    }
  };

  const reset = () => {
    setFile(null);
    setFileId('');
    setPageCount(0);
    setSel([]);
    setStatus('idle');
    setError('');
    setResult(null);
  };

  const selectAll = () => {
    setSel(Array.from({ length: pageCount }, (_, i) => i + 1));
  };

  return (
    <Page>
      <div className="page-container special-page">
        <Link className="back-link" to="/tools"><ArrowLeft size={15} /> All tools</Link>
        <div className="special-header">
          <span className="eyebrow">PDF</span>
          <h1>Split PDF</h1>
          <p>Separate pages or ranges into new PDFs.</p>
        </div>
        <div className="split-layout">
          <section className="card">
            {status === 'idle' && !file && (
              <Dropzone accept="application/pdf,.pdf" onFiles={handleUpload} label="Drop your PDF here" button="Choose PDF" />
            )}

            {status === 'idle' && file && !loading && (
              <>
                <FileRow file={file} remove={reset} />
                <div className="page-picker">
                  <div className="card-top">
                    <h3>Pages ({pageCount} total)</h3>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="text-button" onClick={selectAll}>Select all</button>
                      <span className="muted">{sel.length} selected</span>
                    </div>
                  </div>
                  <div className="page-grid">
                    {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        className={`page-thumb ${sel.includes(p) ? 'selected' : ''}`}
                        onClick={() => setSel((s) => (s.includes(p) ? s.filter((x) => x !== p) : [...s, p]))}
                      >
                        <span>{p}</span>
                        {fileId ? (
                          <img
                            src={getThumbnailUrl(fileId, p)}
                            alt={`Page ${p}`}
                            style={{ width: '100%', height: 80, objectFit: 'contain', borderRadius: 4 }}
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                          />
                        ) : (
                          <FileText size={20} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                <button className="button button-primary full" disabled={sel.length === 0} onClick={split}>
                  Split PDF <ArrowRight size={16} />
                </button>
                <PrivacyNote />
              </>
            )}

            {loading && (
              <div className="processing-state">
                <div className="spinner"><FileText size={22} /></div>
                <h3>Analyzing PDF...</h3>
                <p>Reading page information.</p>
              </div>
            )}

            {(status === 'uploading' || status === 'processing') && (
              <ConversionStatusDisplay status={status} onRetry={reset} />
            )}

            {status === 'success' && result && (
              <div className="result-state">
                <div className="result-heading">
                  <div className="success-mark"><Check size={22} /></div>
                  <div><span className="eyebrow">DONE</span><h3>Split complete</h3></div>
                </div>
                <div className="result-details">
                  <div><span>Pages extracted</span><strong>{sel.length}</strong></div>
                  <div><span>Output size</span><strong>{formatBytes(result.output_size)}</strong></div>
                  <div><span>Format</span><strong>PDF</strong></div>
                </div>
                <div className="result-actions">
                  <button className="button button-primary" onClick={() => downloadFile(result.download_url, result.filename)}>
                    <Download size={16} /> Download
                  </button>
                  <button className="button button-secondary" onClick={reset}>Split another</button>
                </div>
              </div>
            )}

            {status === 'error' && <ConversionStatusDisplay status="error" error={error} onRetry={reset} />}
          </section>
          <aside className="side-card">
            <h3>Split options</h3>
            <p className="muted">Select individual pages, split every page, or define ranges.</p>
          </aside>
        </div>
      </div>
    </Page>
  );
}
