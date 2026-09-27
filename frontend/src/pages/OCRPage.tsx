import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Download, Languages } from 'lucide-react';
import { Page } from '../components/Page';
import { Dropzone } from '../components/Dropzone';
import { FileRow } from '../components/FileRow';
import { PrivacyNote } from '../components/PrivacyNote';
import { ConversionStatusDisplay } from '../components/ConversionStatus';
import { uploadAndConvert, downloadFile } from '../services/api';
import { formatBytes } from '../utils';
import type { ConversionStatus } from '../types';

export function OCRPage() {
  const [file, setFile] = useState<File | null>(null);
  const [language, setLanguage] = useState('English');
  const [outputFormat, setOutputFormat] = useState('Searchable PDF');
  const [status, setStatus] = useState<ConversionStatus>('idle');
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ filename: string; download_url: string; output_size: number } | null>(null);

  const run = async () => {
    if (!file) return;
    setStatus('processing');
    setError('');
    try {
      const data = await uploadAndConvert('/api/pdf/ocr', [file], {
        language,
        output_format: outputFormat,
      });
      if (!data.success) {
        setError(data.error || 'OCR failed.');
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
    setStatus('idle');
    setError('');
    setResult(null);
  };

  return (
    <Page>
      <div className="page-container special-page">
        <Link className="back-link" to="/tools"><ArrowLeft size={15} /> All tools</Link>
        <div className="special-header">
          <span className="eyebrow">OCR</span>
          <h1>Turn scanned documents into searchable text.</h1>
          <p>Recognize text in PDFs and images, then export it in the format you need.</p>
        </div>
        <div className="ocr-layout">
          <section className="card">
            {status === 'idle' && !file && (
              <Dropzone accept=".pdf,.jpg,.jpeg,.png" onFiles={(f) => setFile(f[0])} label="Drop your PDF or image here" button="Choose file" />
            )}

            {status === 'idle' && file && (
              <>
                <FileRow file={file} remove={reset} />
                <div className="form-grid">
                  <label>
                    Language
                    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                      <option>English</option>
                      <option>Filipino</option>
                      <option>Japanese</option>
                      <option>Chinese</option>
                    </select>
                  </label>
                  <label>
                    Output
                    <select value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)}>
                      <option>Searchable PDF</option>
                      <option>TXT</option>
                      <option>DOCX</option>
                    </select>
                  </label>
                </div>
                <button className="button button-primary full" onClick={run}>
                  Run OCR <ArrowRight size={16} />
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
                  <div><span className="eyebrow">DONE</span><h3>OCR complete</h3></div>
                </div>
                <div className="result-details">
                  <div><span>Language</span><strong>{language}</strong></div>
                  <div><span>Output size</span><strong>{formatBytes(result.output_size)}</strong></div>
                  <div><span>Format</span><strong>{outputFormat}</strong></div>
                </div>
                <div className="result-actions">
                  <button className="button button-primary" onClick={() => downloadFile(result.download_url, result.filename)}>
                    <Download size={16} /> Download
                  </button>
                  <button className="button button-secondary" onClick={reset}>OCR another</button>
                </div>
              </div>
            )}

            {status === 'error' && <ConversionStatusDisplay status="error" error={error} onRetry={reset} />}
            <PrivacyNote />
          </section>
          <aside className="side-card">
            <Languages size={20} />
            <h3>Better recognition</h3>
            <p className="muted">Choose the primary language in your document for more accurate results.</p>
          </aside>
        </div>
      </div>
    </Page>
  );
}
