import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Download, RotateCw } from 'lucide-react';
import { Page } from '../components/Page';
import { Dropzone } from '../components/Dropzone';
import { FileRow } from '../components/FileRow';
import { PrivacyNote } from '../components/PrivacyNote';
import { ConversionStatusDisplay } from '../components/ConversionStatus';
import { uploadAndConvert, downloadFile } from '../services/api';
import { formatBytes } from '../utils';
import type { ConversionStatus } from '../types';

export function RotatePage() {
  const [file, setFile] = useState<File | null>(null);
  const [angle, setAngle] = useState(90);
  const [status, setStatus] = useState<ConversionStatus>('idle');
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ filename: string; download_url: string; output_size: number } | null>(null);

  const rotate = async () => {
    if (!file) return;
    setStatus('processing');
    setError('');
    try {
      const data = await uploadAndConvert('/api/pdf/rotate', [file], { angle: String(angle) });
      if (!data.success) {
        setError(data.error || 'Rotation failed.');
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

  const reset = () => { setFile(null); setStatus('idle'); setError(''); setResult(null); };

  return (
    <Page>
      <div className="page-container special-page">
        <Link className="back-link" to="/tools"><ArrowLeft size={15} /> All tools</Link>
        <div className="special-header">
          <span className="eyebrow">PDF</span>
          <h1>Rotate PDF</h1>
          <p>Fix page orientation in seconds.</p>
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
                  <h3>Rotation angle</h3>
                  {[90, 180, 270].map((a) => (
                    <button key={a} className={`compression-option ${angle === a ? 'selected' : ''}`} onClick={() => setAngle(a)}>
                      <span className="radio-dot" />
                      <span>
                        <strong>{a}° clockwise</strong>
                        <small>{a === 90 ? 'Quarter turn right' : a === 180 ? 'Upside down' : 'Quarter turn left'}</small>
                      </span>
                      <RotateCw size={16} style={{ transform: `rotate(${a}deg)`, marginLeft: 'auto', opacity: 0.5 }} />
                    </button>
                  ))}
                </div>
                <button className="button button-primary full" onClick={rotate}>
                  Rotate PDF <ArrowRight size={16} />
                </button>
                <PrivacyNote />
              </>
            )}
            {(status === 'uploading' || status === 'processing') && <ConversionStatusDisplay status={status} onRetry={reset} />}
            {status === 'success' && result && (
              <div className="result-state">
                <div className="result-heading">
                  <div className="success-mark"><Check size={22} /></div>
                  <div><span className="eyebrow">DONE</span><h3>Rotation complete</h3></div>
                </div>
                <div className="result-details">
                  <div><span>Angle</span><strong>{angle}°</strong></div>
                  <div><span>Output size</span><strong>{formatBytes(result.output_size)}</strong></div>
                  <div><span>Format</span><strong>PDF</strong></div>
                </div>
                <div className="result-actions">
                  <button className="button button-primary" onClick={() => downloadFile(result.download_url, result.filename)}>
                    <Download size={16} /> Download
                  </button>
                  <button className="button button-secondary" onClick={reset}>Rotate another</button>
                </div>
              </div>
            )}
            {status === 'error' && <ConversionStatusDisplay status="error" error={error} onRetry={reset} />}
          </section>
          <aside className="side-card">
            <h3>All pages</h3>
            <p className="muted">Rotation is applied to all pages in the PDF.</p>
          </aside>
        </div>
      </div>
    </Page>
  );
}
