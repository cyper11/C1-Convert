import { Shield } from 'lucide-react';

export function PrivacyNote() {
  return (
    <p className="privacy-note">
      <Shield size={14} /> Your files are processed only when you start a conversion. Files are
      temporarily stored while being processed and are automatically removed after processing.
    </p>
  );
}
