import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  Download,
  FileText,
  Highlighter,
  Pencil,
  Plus,
  Redo2,
  RotateCw,
  Trash2,
  Undo2,
} from 'lucide-react';
import { Page } from '../components/Page';
import { Dropzone } from '../components/Dropzone';
import { ConversionStatusDisplay } from '../components/ConversionStatus';
import { uploadAndConvert, uploadForInfo, downloadFile, getThumbnailUrl } from '../services/api';
import { formatBytes } from '../utils';
import type { ConversionStatus } from '../types';

interface EditOp {
  type: string;
  page?: number;
  angle?: number;
  order?: number[];
  x?: number;
  y?: number;
  text?: string;
  size?: number;
  color?: number[];
  rect?: number[];
}

export function EditorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [fileId, setFileId] = useState('');
  const [pageCount, setPageCount] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [operations, setOperations] = useState<EditOp[]>([]);
  const [undoStack, setUndoStack] = useState<EditOp[][]>([]);
  const [status, setStatus] = useState<ConversionStatus>('idle');
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ filename: string; download_url: string; output_size: number } | null>(null);
  const [activeTool, setActiveTool] = useState('select');
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
      setActivePage(1);
      setLoading(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load PDF');
      setStatus('error');
      setLoading(false);
    }
  };

  const addOp = (op: EditOp) => {
    setUndoStack((prev) => [...prev, operations]);
    setOperations((prev) => [...prev, op]);
  };

  const undo = () => {
    if (undoStack.length === 0) return;
    const prev = undoStack[undoStack.length - 1];
    setOperations(prev);
    setUndoStack((s) => s.slice(0, -1));
  };

  const save = async () => {
    if (!file) return;
    setStatus('processing');
    setError('');
    try {
      const data = await uploadAndConvert('/api/pdf/edit', [file], {
        operations: JSON.stringify(operations),
      });
      if (!data.success) {
        setError(data.error || 'Edit failed.');
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
    setOperations([]);
    setUndoStack([]);
    setStatus('idle');
    setError('');
    setResult(null);
  };

  if (status === 'success' && result) {
    return (
      <Page>
        <div className="page-container special-page">
          <Link className="back-link" to="/tools"><ArrowLeft size={15} /> All tools</Link>
          <div className="result-state" style={{ maxWidth: 600, margin: '40px auto' }}>
            <div className="result-heading">
              <div className="success-mark"><Check size={22} /></div>
              <div><span className="eyebrow">DONE</span><h3>PDF edited successfully</h3></div>
            </div>
            <div className="result-details">
              <div><span>Operations</span><strong>{operations.length}</strong></div>
              <div><span>Output size</span><strong>{formatBytes(result.output_size)}</strong></div>
              <div><span>Format</span><strong>PDF</strong></div>
            </div>
            <div className="result-actions">
              <button className="button button-primary" onClick={() => downloadFile(result.download_url, result.filename)}>
                <Download size={16} /> Download edited PDF
              </button>
              <button className="button button-secondary" onClick={reset}>Edit another</button>
            </div>
          </div>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <div className="page-container special-page">
        <Link className="back-link" to="/tools"><ArrowLeft size={15} /> All tools</Link>
        <div className="special-header">
          <span className="eyebrow">PDF WORKSPACE</span>
          <h1>PDF Editor</h1>
          <p>Review, annotate, and organize a PDF.</p>
        </div>

        {!file && !loading && status !== 'error' && (
          <Dropzone accept="application/pdf,.pdf" onFiles={handleUpload} label="Drop your PDF here" button="Choose PDF" />
        )}

        {loading && (
          <div className="processing-state">
            <div className="spinner"><FileText size={22} /></div>
            <h3>Loading PDF...</h3>
            <p>Reading pages and generating previews.</p>
          </div>
        )}

        {status === 'error' && <ConversionStatusDisplay status="error" error={error} onRetry={reset} />}

        {(status === 'uploading' || status === 'processing') && (
          <ConversionStatusDisplay status={status} onRetry={reset} />
        )}

        {file && !loading && status === 'idle' && (
          <div className="editor-shell">
            <div className="editor-toolbar">
              <div className="toolbar-group">
                <button className="icon-button" onClick={undo} title="Undo"><Undo2 size={17} /></button>
                <button className="icon-button" disabled title="Redo"><Redo2 size={17} /></button>
                <button className={`toolbar-button ${activeTool === 'select' ? 'active' : ''}`} onClick={() => setActiveTool('select')}>
                  <Pencil size={16} /> Select
                </button>
                <button
                  className={`toolbar-button ${activeTool === 'text' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTool('text');
                    const text = prompt('Enter text annotation:');
                    if (text) {
                      addOp({ type: 'add_text', page: activePage - 1, x: 100, y: 100, text, size: 12, color: [0, 0, 1] });
                    }
                  }}
                >
                  <Pencil size={16} /> Text
                </button>
                <button
                  className={`toolbar-button ${activeTool === 'highlight' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTool('highlight');
                    addOp({ type: 'highlight', page: activePage - 1, rect: [72, 72, 300, 92] });
                  }}
                >
                  <Highlighter size={16} /> Highlight
                </button>
                <button className="toolbar-button" onClick={() => addOp({ type: 'rotate', page: activePage - 1, angle: 90 })}>
                  <RotateCw size={16} /> Rotate
                </button>
                <button className="toolbar-button" onClick={() => {
                  if (pageCount <= 1) return;
                  addOp({ type: 'delete', page: activePage - 1 });
                  setPageCount((c) => c - 1);
                  if (activePage > pageCount - 1) setActivePage(Math.max(1, pageCount - 1));
                }}>
                  <Trash2 size={16} /> Delete page
                </button>
              </div>
              <div className="toolbar-group">
                <button className="icon-button" onClick={() => setZoom(Math.max(50, zoom - 10))}>−</button>
                <span className="zoom-label">{zoom}%</span>
                <button className="icon-button" onClick={() => setZoom(Math.min(200, zoom + 10))}>+</button>
              </div>
            </div>
            <div className="editor-body">
              <div className="thumbnails">
                {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
                  <button key={p} className={`thumbnail ${p === activePage ? 'selected' : ''}`} onClick={() => setActivePage(p)} style={p === activePage ? { borderColor: '#315efb' } : {}}>
                    <span>{p}</span>
                    {fileId && (
                      <img
                        src={getThumbnailUrl(fileId, p)}
                        alt={`Page ${p}`}
                        style={{ width: '100%', height: 126, objectFit: 'contain', borderRadius: 4 }}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    )}
                  </button>
                ))}
                <button className="add-page" onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = '.pdf';
                  input.click();
                }}>
                  <Plus size={18} />Add page
                </button>
              </div>
              <div className="canvas-area">
                {fileId ? (
                  <img
                    src={getThumbnailUrl(fileId, activePage)}
                    alt={`Page ${activePage}`}
                    style={{ maxWidth: '100%', maxHeight: '100%', transform: `scale(${zoom / 100})`, transformOrigin: 'center', boxShadow: '0 10px 28px #1a2a5129' }}
                  />
                ) : (
                  <div className="canvas-paper" style={{ transform: `scale(${zoom / 100})` }}>
                    <div className="paper-header">C1 Convert <span>DOCUMENT PREVIEW</span></div>
                    <h2>Loading...</h2>
                  </div>
                )}
              </div>
            </div>
            <div style={{ padding: '12px 16px', borderTop: '1px solid #e0e5ee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: '#7b8799' }}>
                {operations.length} edit{operations.length !== 1 ? 's' : ''} pending
              </span>
              <button className="button button-primary" onClick={save} disabled={operations.length === 0}>
                Save & Download
              </button>
            </div>
          </div>
        )}
      </div>
    </Page>
  );
}
