import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Download, FileText, GripVertical, Plus, X } from 'lucide-react';
import { Page } from '../components/Page';
import { Dropzone } from '../components/Dropzone';
import { FileRow } from '../components/FileRow';
import { PrivacyNote } from '../components/PrivacyNote';
import { ConversionStatusDisplay } from '../components/ConversionStatus';
import { uploadAndConvert, downloadFile } from '../services/api';
import { formatBytes } from '../utils';
import type { ConversionStatus } from '../types';

export function MergePage() {
  const [fs, setFs] = useState<File[]>([]);
  const [status, setStatus] = useState<ConversionStatus>('idle');
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ filename: string; download_url: string; output_size: number } | null>(null);

  const add = (l: FileList) => {
    const pdfs = Array.from(l).filter((f) => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'));
    if (pdfs.length === 0) {
      setError('Please select PDF files.');
      setStatus('error');
      return;
    }
    setFs((p) => [...p, ...pdfs]);
    setError('');
    setStatus('idle');
  };

  const move = (i: number, d: number) => {
    setFs((p) => {
      const a = [...p];
      const j = i + d;
      if (j < 0 || j >= a.length) return p;
      [a[i], a[j]] = [a[j], a[i]];
      return a;
    });
  };

  const merge = async () => {
    if (fs.length < 2) return;
    setStatus('processing');
    setError('');
    try {
      const data = await uploadAndConvert('/api/pdf/merge', fs);
      if (!data.success) {
        setError(data.error || 'Merge failed.');
        setStatus('error');
        return;
      }
      setResult({ filename: data.filename!, download_url: data.download_url!, output_size: data.output_size || 0 });
      setStatus('success');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Connection error. Is the backend running?');
      setStatus('error');
    }
  };

  const reset = () => {
    setFs([]);
    setStatus('idle');
    setError('');
    setResult(null);
  };

  return (
    <Page>
      <div className="page-container special-page">
        <Link className="back-link" to="/tools"><ArrowLeft size={15} /> All tools</Link>
        <div className="special-header">
          <span className="eyebrow">PDF</span>
          <h1>Merge PDF</h1>
          <p>Join multiple PDFs into one organized file.</p>
        </div>
        <div className="special-layout">
          <section className="card">
            {status === 'idle' && (
              <>
                <h2>{fs.length ? `${fs.length} files selected` : 'Add your PDFs'}</h2>
                {!fs.length ? (
                  <Dropzone accept="application/pdf,.pdf" multiple onFiles={add} label="Drop PDFs here" button="Choose PDFs" />
                ) : (
                  <div className="file-list">
                    {fs.map((f, i) => (
                      <div className="sortable-row" key={`${f.name}-${i}`}>
                        <GripVertical size={17} />
                        <FileRow file={f} index={i} remove={() => setFs((p) => p.filter((_, j) => j !== i))} />
                        <div className="sort-actions">
                          <button className="icon-button" onClick={() => move(i, -1)}>↑</button>
                          <button className="icon-button" onClick={() => move(i, 1)}>↓</button>
                        </div>
                      </div>
                    ))}
                    <button className="button button-secondary full" onClick={() => document.getElementById('more')?.click()}>
                      <Plus size={16} /> Add more PDFs
                    </button>
                    <input id="more" type="file" hidden multiple accept="application/pdf,.pdf" onChange={(e) => e.target.files && add(e.target.files)} />
                  </div>
                )}
                <div className="card-footer">
                  <PrivacyNote />
                  <button className="button button-primary" disabled={fs.length < 2} onClick={merge}>
                    Merge PDFs <ArrowRight size={16} />
                  </button>
                </div>
              </>
            )}

            {(status === 'uploading' || status === 'processing') && (
              <ConversionStatusDisplay status={status} onRetry={reset} />
            )}

            {status === 'success' && result && (
              <div className="result-state">
                <div className="result-heading">
                  <div className="success-mark"><Check size={22} /></div>
                  <div><span className="eyebrow">DONE</span><h3>Merge complete</h3></div>
                </div>
                <div className="conversion-files">
                  <div><FileText size={19} />{fs.length} PDFs merged</div>
                  <span className="arrow-down">↓</span>
                  <div><FileText size={19} />{result.filename}</div>
                </div>
                <div className="result-details">
                  <div><span>Files merged</span><strong>{fs.length}</strong></div>
                  <div><span>Output size</span><strong>{formatBytes(result.output_size)}</strong></div>
                  <div><span>Format</span><strong>PDF</strong></div>
                </div>
                <div className="result-actions">
                  <button className="button button-primary" onClick={() => downloadFile(result.download_url, result.filename)}>
                    <Download size={16} /> Download file
                  </button>
                  <button className="button button-secondary" onClick={reset}>Merge more</button>
                </div>
              </div>
            )}

            {status === 'error' && <ConversionStatusDisplay status="error" error={error} onRetry={reset} />}
          </section>
          <aside className="side-card">
            <h3>How it works</h3>
            <p className="muted">Add two or more PDFs, reorder them, then merge.</p>
          </aside>
        </div>
      </div>
    </Page>
  );
}
