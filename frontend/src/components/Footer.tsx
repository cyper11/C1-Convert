import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand-col">
        <Link to="/" className="brand" aria-label="C1 Convert Home">
          <Logo size="md" />
        </Link>
        <p className="footer-desc">
          Fast, private, and dependable file conversion utility for everyday documents, PDFs, and images.
        </p>
        <div className="footer-badge">
          <ShieldCheck size={14} />
          <span>Files processed locally & never retained</span>
        </div>
      </div>

      <div className="footer-nav-groups">
        <div className="footer-col">
          <span className="footer-col-title">Popular Tools</span>
          <Link to="/tools/pdf-to-word">PDF to Word</Link>
          <Link to="/tools/word-to-pdf">Word to PDF</Link>
          <Link to="/tools/pdf-to-excel">PDF to Excel</Link>
          <Link to="/tools/compress-pdf">Compress PDF</Link>
        </div>

        <div className="footer-col">
          <span className="footer-col-title">PDF Utilities</span>
          <Link to="/tools/merge-pdf">Merge PDF</Link>
          <Link to="/tools/split-pdf">Split PDF</Link>
          <Link to="/tools/ocr">OCR Text Recognition</Link>
          <Link to="/tools/rotate-pdf">Rotate PDF</Link>
          <Link to="/tools/pdf-editor">PDF Editor</Link>
        </div>

        <div className="footer-col">
          <span className="footer-col-title">Trust & Legal</span>
          <Link to="/privacy">Privacy Notice</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/ethics">Ethical Considerations</Link>
          <a href="https://github.com/cyper11" target="_blank" rel="noreferrer">
            GitHub (@cyper11)
          </a>
          <Link to="/tools">All Tools</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 C1 Convert. Convert. Compress. Done.</span>
        <div className="footer-status">
          <span className="status-dot" />
          <span>100% Private & Secure</span>
        </div>
      </div>
    </footer>
  );
}
