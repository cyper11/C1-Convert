import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Download, UnlockKeyhole } from 'lucide-react';
import { Page } from '../components/Page';
import { Dropzone } from '../components/Dropzone';
import { FileRow } from '../components/FileRow';
import { PrivacyNote } from '../components/PrivacyNote';
import { ConversionStatusDisplay } from '../components/ConversionStatus';
import { uploadAndConvert, downloadFile } from '../services/api';
import { formatBytes } from '../utils';
import type { ConversionStatus } from '../types';

export function UnlockPage() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<ConversionStatus>('idle');
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ filename: string; download_url: string; output_size: number } | null>(null);

  const unlock = async () => {
    if (!file) return;
    if (!password) { setError('Please enter the PDF password.'); setStatus('error'); return; }
    setStatus('processing');
    setError('');
    try {
      const data = await uploadAndConvert('/api/pdf/unlock', [file], { password });
      if (!data.success) {
        setError(data.error || 'Unlock failed. The password may be incorrect.');
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

  const reset = () => { setFile(null); setPassword(''); setStatus('idle'); setError(''); setResult(null); };

  return (
    <Page>
      <div className="page-container special-page">
        <Link className="back-link" to="/tools"><ArrowLeft size={15} /> All tools</Link>
        <div className="special-header">
          <span className="eyebrow">SECURITY</span>
          <h1>Unlock PDF</h1>
          <p>Remove known restrictions from a PDF.</p>
        </div>
        <div className="compress-layout">
          <section className="card">
            {status === 'idle' && !file && (
              <Dropzone accept="application/pdf,.pdf" onFiles={(f) => setFile(f[0])} label="Drop your password-protected PDF here" button="Choose PDF" />
            )}
            {status === 'idle' && file && (
              <>
                <FileRow file={file} remove={reset} />
                <div style={{ margin: '20px 0' }}>
                  <label style={{ display: 'grid', gap: 7, fontSize: 12, fontWeight: 700 }}>
                    PDF Password
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter the PDF password" style={{ height: 40, border: '1px solid #dfe5ee', borderRadius: 8, padding: '0 10px', fontSize: 14, fontWeight: 400 }} />
                  </label>
                </div>
                <button className="button button-primary full" onClick={unlock} disabled={!password}>
                  <UnlockKeyhole size={16} /> Unlock PDF <ArrowRight size={16} />
                </button>
                <PrivacyNote />
              </>
            )}
            {(status === 'uploading' || status === 'processing') && <ConversionStatusDisplay status={status} onRetry={reset} />}
            {status === 'success' && result && (
              <div className="result-state">
                <div className="result-heading">
                  <div className="success-mark"><Check size={22} /></div>
                  <div><span className="eyebrow">DONE</span><h3>PDF unlocked</h3></div>
                </div>
                <div className="result-details">
                  <div><span>Output size</span><strong>{formatBytes(result.output_size)}</strong></div>
                  <div><span>Status</span><strong>Unlocked</strong></div>
                  <div><span>Format</span><strong>PDF</strong></div>
                </div>
                <div className="result-actions">
                  <button className="button button-primary" onClick={() => downloadFile(result.download_url, result.filename)}>
                    <Download size={16} /> Download
                  </button>
                  <button className="button button-secondary" onClick={reset}>Unlock another</button>
                </div>
              </div>
            )}
            {status === 'error' && <ConversionStatusDisplay status="error" error={error} onRetry={reset} />}
          </section>
          <aside className="side-card">
            <h3>About unlocking</h3>
            <p className="muted">You must know the correct password. This tool does not bypass unknown passwords.</p>
          </aside>
        </div>
      </div>
    </Page>
  );
}
