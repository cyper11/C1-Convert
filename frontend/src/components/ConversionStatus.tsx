import { Zap, X } from 'lucide-react';
import type { ConversionStatus } from '../types';

interface ConversionStatusDisplayProps {
  status: ConversionStatus;
  error?: string;
  onRetry: () => void;
}

export function ConversionStatusDisplay({ status, error, onRetry }: ConversionStatusDisplayProps) {
  if (status === 'uploading') {
    return (
      <div className="processing-state">
        <div className="spinner">
          <Zap size={22} />
        </div>
        <h3>Uploading your file</h3>
        <p>Sending the file to the server for processing.</p>
        <div className="progress-wrap">
          <div className="progress-label">
            <span>Uploading</span>
          </div>
          <div className="progress">
            <span style={{ width: '100%', animation: 'pulse 1.5s infinite' }} />
          </div>
        </div>
      </div>
    );
  }

  if (status === 'processing') {
    return (
      <div className="processing-state">
        <div className="spinner">
          <Zap size={22} />
        </div>
        <h3>Converting document...</h3>
        <p>Applying the requested output format.</p>
        <div className="progress-wrap">
          <div className="progress-label">
            <span>Processing</span>
          </div>
          <div className="progress">
            <span style={{ width: '100%', animation: 'pulse 1.5s infinite' }} />
          </div>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="error-state">
        <div className="error-mark">
          <X size={22} />
        </div>
        <h3>Conversion failed</h3>
        <p>{error || 'An unexpected error occurred.'}</p>
        <button className="button button-secondary" onClick={onRetry}>
          Try again
        </button>
      </div>
    );
  }

  return null;
}
