import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  FileUp,
  UploadCloud,
  FileText,
  ShieldCheck,
  X,
} from 'lucide-react';
import { Page } from '../components/Page';
import { ToolGrid } from '../components/ToolCard';
import { tools } from '../config/tools';
import { formatBytes } from '../utils';

export function Home() {
  const [pick, setPick] = useState<File | null>(null);
  const [drag, setDrag] = useState(false);
  const nav = useNavigate();

  const handleFiles = (files: FileList) => {
    if (files.length > 0) {
      setPick(files[0]);
    }
  };

  // Determine suggested destination based on file extension
  const getDestinationRoute = (file: File) => {
    const name = file.name.toLowerCase();
    if (name.endsWith('.pdf')) return '/tools/pdf-to-word';
    if (name.endsWith('.docx')) return '/tools/word-to-pdf';
    if (name.endsWith('.xlsx')) return '/tools/excel-to-pdf';
    if (name.endsWith('.jpg') || name.endsWith('.jpeg')) return '/tools/jpg-to-pdf';
    if (name.endsWith('.png')) return '/tools/png-to-pdf';
    return '/tools/pdf-to-word';
  };

  const handleContinue = () => {
    if (!pick) return;
    nav(getDestinationRoute(pick));
  };

  return (
    <Page>
      {/* Main Hero / Converter Section (Based on PDFAid clean layout) */}
      <section className="hero-aid-section">
        <div className="hero-aid-grid">
          {/* Left Column: Clear value proposition & feature list */}
          <div className="hero-aid-info">
            <span className="hero-aid-tag">All-in-one File Converter</span>
            <h1 className="hero-aid-title">
              Convert your files
              <br />
              quickly and securely
            </h1>
            <p className="hero-aid-desc">
              Convert, compress, and edit PDFs, Word documents, spreadsheets, and images directly in your browser.
            </p>

            <ul className="hero-aid-list">
              <li>
                <span className="check-bullet"><Check size={16} /></span>
                <span>Work directly in your browser with no software install</span>
              </li>
              <li>
                <span className="check-bullet"><Check size={16} /></span>
                <span>Preserve original document layout, fonts, and tables</span>
              </li>
              <li>
                <span className="check-bullet"><Check size={16} /></span>
                <span>Fast conversion and instant file downloads</span>
              </li>
              <li>
                <span className="check-bullet"><Check size={16} /></span>
                <span>Files are automatically deleted after 30 minutes</span>
              </li>
            </ul>

            <div className="hero-trust-banner">
              <ShieldCheck size={20} />
              <span>
                <strong>Ethical Promise:</strong> Zero AI training. Files purged in 30 mins.{' '}
                <Link to="/ethics">Read our Ethics &amp; Privacy Charter →</Link>
              </span>
            </div>
          </div>

          {/* Right Column: Direct File Upload Box */}
          <div className="hero-aid-upload">
            <div className="upload-box-card">
              <div className="upload-box-header">
                <h3>Upload files to convert</h3>
                <span className="upload-box-limit">Max 50 MB</span>
              </div>

              {!pick ? (
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

                  <p className="drop-caption">Drop files here</p>
                  <div className="or-divider">
                    <span>OR</span>
                  </div>

                  <label className="button button-primary upload-main-btn">
                    <FileUp size={19} />
                    <span>Upload to convert</span>
                    <input
                      type="file"
                      hidden
                      accept=".pdf,.docx,.xlsx,.jpg,.jpeg,.png"
                      onChange={(e) => e.target.files && handleFiles(e.target.files)}
                    />
                  </label>

                  <div className="upload-formats-row">
                    <span className="fmt-tag">PDF</span>
                    <span className="fmt-tag">DOCX</span>
                    <span className="fmt-tag">XLSX</span>
                    <span className="fmt-tag">JPG</span>
                    <span className="fmt-tag">PNG</span>
                  </div>
                </div>
              ) : (
                <div className="upload-selected-state">
                  <div className="selected-file-row">
                    <div className="file-icon-badge">
                      <FileText size={22} />
                    </div>
                    <div className="selected-file-meta">
                      <strong>{pick.name}</strong>
                      <span>{formatBytes(pick.size)}</span>
                    </div>
                    <button
                      type="button"
                      className="icon-button small remove-btn"
                      onClick={() => setPick(null)}
                      title="Remove file"
                    >
                      <X size={17} />
                    </button>
                  </div>

                  <div className="upload-action-row">
                    <button
                      type="button"
                      className="button button-primary full large-btn"
                      onClick={handleContinue}
                    >
                      <span>Continue to convert</span>
                      <ArrowRight size={18} />
                    </button>
                    <button
                      type="button"
                      className="button button-secondary full"
                      onClick={() => setPick(null)}
                    >
                      Choose another file
                    </button>
                  </div>
                </div>
              )}

              <div className="upload-box-footer">
                <span>🔒 Secure 256-bit SSL processing · Auto-cleanup</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="section aid-tools-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">ALL TOOLS</span>
            <h2>Unlimited access to all our tools</h2>
          </div>
          <Link className="text-link" to="/tools">
            Browse all tools <ArrowRight size={15} />
          </Link>
        </div>
        <ToolGrid items={tools.slice(0, 8)} />
      </section>

      {/* Simple 3-Step Process (Clean, like PDFAid) */}
      <section className="section how-it-works-section">
        <div className="how-it-works-heading">
          <h2>How to convert files with C1 Convert</h2>
          <p>Convert any file in three simple steps without watermarks or hidden fees.</p>
        </div>
        <div className="steps-grid">
          <div className="step-card">
            <span className="step-number">1</span>
            <h3>Upload your file</h3>
            <p>Select your PDF, document, spreadsheet, or image file from your device, or drag and drop it into the box.</p>
          </div>
          <div className="step-card">
            <span className="step-number">2</span>
            <h3>Choose your tool</h3>
            <p>Select the target format such as Word, Excel, or PDF. Customize settings like page ranges or passwords if needed.</p>
          </div>
          <div className="step-card">
            <span className="step-number">3</span>
            <h3>Download result</h3>
            <p>Once converted, download your new document immediately. Files are automatically cleared from the server.</p>
          </div>
        </div>
      </section>
    </Page>
  );
}
