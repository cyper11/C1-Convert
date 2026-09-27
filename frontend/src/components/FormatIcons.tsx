interface IconProps {
  size?: number;
  className?: string;
}

export function WordIcon({ size = 28, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M 7 4 C 7 2.9 7.9 2 9 2 L 21 2 L 29 10 L 29 32 C 29 33.1 28.1 34 27 34 L 9 34 C 7.9 34 7 33.1 7 32 Z"
        fill="#2B579A"
      />
      <path d="M 21 2 L 29 10 L 22.5 10 C 21.7 10 21 9.3 21 8.5 Z" fill="#183B6D" />
      <rect x="5" y="14" width="16" height="16" rx="3.5" fill="#185ABD" />
      <path
        d="M 8.2 18.5 L 9.9 25.5 L 11.6 19.8 L 12.8 19.8 L 14.5 25.5 L 16.2 18.5 L 15 18.5 L 13.9 23 L 12.4 18.5 L 12.1 18.5 L 10.6 23 L 9.4 18.5 Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function PdfIcon({ size = 28, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M 7 4 C 7 2.9 7.9 2 9 2 L 21 2 L 29 10 L 29 32 C 29 33.1 28.1 34 27 34 L 9 34 C 7.9 34 7 33.1 7 32 Z"
        fill="#E11D48"
      />
      <path d="M 21 2 L 29 10 L 22.5 10 C 21.7 10 21 9.3 21 8.5 Z" fill="#9F1239" />
      <rect x="5" y="14" width="20" height="15" rx="3.5" fill="#BE123C" />
      <text
        x="15"
        y="25"
        fontFamily="'Inter', -apple-system, sans-serif"
        fontSize="9"
        fontWeight="900"
        fill="#FFFFFF"
        textAnchor="middle"
        letterSpacing="-0.02em"
      >
        PDF
      </text>
    </svg>
  );
}

export function ExcelIcon({ size = 28, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M 7 4 C 7 2.9 7.9 2 9 2 L 21 2 L 29 10 L 29 32 C 29 33.1 28.1 34 27 34 L 9 34 C 7.9 34 7 33.1 7 32 Z"
        fill="#107C41"
      />
      <path d="M 21 2 L 29 10 L 22.5 10 C 21.7 10 21 9.3 21 8.5 Z" fill="#0A4D28" />
      <rect x="5" y="14" width="16" height="16" rx="3.5" fill="#15803D" />
      <path
        d="M 9 18 L 11.5 22 L 8.8 26 L 10.8 26 L 12.3 23.3 L 13.8 26 L 15.8 26 L 13.1 22 L 15.5 18 L 13.6 18 L 12.3 20.6 L 10.9 18 Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function ExcelToPdfIcon({ size = 28, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M 6 6 C 6 4.9 6.9 4 8 4 L 18 4 L 24 10 L 24 28 C 24 29.1 23.1 30 22 30 L 8 30 C 6.9 30 6 29.1 6 28 Z"
        fill="#16A34A"
        opacity="0.5"
      />
      <path
        d="M 12 8 C 12 6.9 12.9 6 14 6 L 24 6 L 30 12 L 30 32 C 30 33.1 29.1 34 28 34 L 14 34 C 12.9 34 12 33.1 12 32 Z"
        fill="#E11D48"
      />
      <path d="M 24 6 L 30 12 L 25 12 C 24.4 12 24 11.6 24 11 Z" fill="#9F1239" />
      <text
        x="21"
        y="24"
        fontFamily="'Inter', sans-serif"
        fontSize="8.5"
        fontWeight="900"
        fill="#FFFFFF"
        textAnchor="middle"
        letterSpacing="-0.02em"
      >
        PDF
      </text>
    </svg>
  );
}

export function JpgIcon({ size = 28, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="4" y="5" width="28" height="26" rx="4" fill="#EA580C" />
      <rect x="6.5" y="7.5" width="23" height="16" rx="2.5" fill="#C2410C" />
      <circle cx="11.5" cy="11.5" r="2" fill="#FDE047" />
      <path d="M 8 21 L 14 14 L 19 20 L 22 16 L 28 23 L 8 23 Z" fill="#FED7AA" />
      <text
        x="18"
        y="29.5"
        fontFamily="'Inter', sans-serif"
        fontSize="6.5"
        fontWeight="900"
        fill="#FFFFFF"
        textAnchor="middle"
        letterSpacing="0.05em"
      >
        JPG
      </text>
    </svg>
  );
}

export function PngIcon({ size = 28, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="4" y="5" width="28" height="26" rx="4" fill="#7C3AED" />
      <rect x="6.5" y="7.5" width="23" height="16" rx="2.5" fill="#5B21B6" />
      <circle cx="12" cy="12" r="2.2" fill="#C4B5FD" />
      <path d="M 8 21 L 14 14 L 18 19 L 21 15 L 28 23 L 8 23 Z" fill="#DDD6FE" />
      <text
        x="18"
        y="29.5"
        fontFamily="'Inter', sans-serif"
        fontSize="6.5"
        fontWeight="900"
        fill="#FFFFFF"
        textAnchor="middle"
        letterSpacing="0.05em"
      >
        PNG
      </text>
    </svg>
  );
}

export function PdfToJpgIcon({ size = 28, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M 5 5 C 5 3.9 5.9 3 7 3 L 18 3 L 24 9 L 24 23 C 24 24.1 23.1 25 22 25 L 7 25 C 5.9 25 5 24.1 5 23 Z"
        fill="#E11D48"
      />
      <rect x="11" y="11" width="21" height="21" rx="3.5" fill="#EA580C" />
      <circle cx="16" cy="16" r="1.8" fill="#FDE047" />
      <path d="M 13 26 L 18 20 L 22 24 L 24 21 L 30 28 L 13 28 Z" fill="#FED7AA" />
    </svg>
  );
}

export function PdfToPngIcon({ size = 28, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M 5 5 C 5 3.9 5.9 3 7 3 L 18 3 L 24 9 L 24 23 C 24 24.1 23.1 25 22 25 L 7 25 C 5.9 25 5 24.1 5 23 Z"
        fill="#E11D48"
      />
      <rect x="11" y="11" width="21" height="21" rx="3.5" fill="#7C3AED" />
      <circle cx="16" cy="16" r="1.8" fill="#C4B5FD" />
      <path d="M 13 26 L 18 20 L 22 24 L 24 21 L 30 28 L 13 28 Z" fill="#DDD6FE" />
    </svg>
  );
}

export function MergePdfIcon({ size = 28, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M 4 8 C 4 6.9 4.9 6 6 6 L 15 6 L 20 11 L 20 28 C 20 29.1 19.1 30 18 30 L 6 30 C 4.9 30 4 29.1 4 28 Z"
        fill="#E11D48"
        opacity="0.8"
      />
      <path
        d="M 14 6 C 14 4.9 14.9 4 16 4 L 25 4 L 30 9 L 30 26 C 30 27.1 29.1 28 28 28 L 16 28 C 14.9 28 14 27.1 14 26 Z"
        fill="#BE123C"
      />
      <circle cx="18" cy="19" r="6" fill="#315CF5" />
      <path d="M 18 16 L 18 22 M 15 19 L 21 19" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function SplitPdfIcon({ size = 28, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M 5 6 C 5 4.9 5.9 4 7 4 L 16 4 L 16 32 L 7 32 C 5.9 32 5 31.1 5 30 Z" fill="#E11D48" />
      <path d="M 20 4 L 29 4 C 30.1 4 31 4.9 31 6 L 31 30 C 31 31.1 30.1 32 29 32 L 20 32 Z" fill="#E11D48" />
      <line x1="18" y1="4" x2="18" y2="32" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="2 2" />
      <circle cx="18" cy="18" r="4.5" fill="#315CF5" />
      <path d="M 16 16 L 20 20 M 16 20 L 20 16" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function CompressPdfIcon({ size = 28, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M 7 4 C 7 2.9 7.9 2 9 2 L 21 2 L 29 10 L 29 32 C 29 33.1 28.1 34 27 34 L 9 34 C 7.9 34 7 33.1 7 32 Z"
        fill="#0D9488"
      />
      <path d="M 21 2 L 29 10 L 22.5 10 C 21.7 10 21 9.3 21 8.5 Z" fill="#065F46" />
      <path
        d="M 18 12 L 18 19 M 15 15 L 18 12 L 21 15"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 18 28 L 18 21 M 15 25 L 18 28 L 21 25"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RotatePdfIcon({ size = 28, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M 7 4 C 7 2.9 7.9 2 9 2 L 21 2 L 29 10 L 29 32 C 29 33.1 28.1 34 27 34 L 9 34 C 7.9 34 7 33.1 7 32 Z"
        fill="#2563EB"
      />
      <path d="M 21 2 L 29 10 L 22.5 10 C 21.7 10 21 9.3 21 8.5 Z" fill="#1D4ED8" />
      <path
        d="M 14 16 A 5.5 5.5 0 1 1 13 22"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <polygon points="14,13 18,16 13,18" fill="#FFFFFF" />
    </svg>
  );
}

export function ProtectPdfIcon({ size = 28, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M 7 4 C 7 2.9 7.9 2 9 2 L 21 2 L 29 10 L 29 32 C 29 33.1 28.1 34 27 34 L 9 34 C 7.9 34 7 33.1 7 32 Z"
        fill="#475569"
      />
      <path d="M 21 2 L 29 10 L 22.5 10 C 21.7 10 21 9.3 21 8.5 Z" fill="#334155" />
      <rect x="12" y="19" width="12" height="10" rx="2" fill="#F59E0B" />
      <path
        d="M 14.5 19 L 14.5 15 C 14.5 13 16 11.5 18 11.5 C 20 11.5 21.5 13 21.5 15 L 21.5 19"
        fill="none"
        stroke="#F59E0B"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="18" cy="23.5" r="1.3" fill="#78350F" />
    </svg>
  );
}

export function UnlockPdfIcon({ size = 28, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M 7 4 C 7 2.9 7.9 2 9 2 L 21 2 L 29 10 L 29 32 C 29 33.1 28.1 34 27 34 L 9 34 C 7.9 34 7 33.1 7 32 Z"
        fill="#059669"
      />
      <path d="M 21 2 L 29 10 L 22.5 10 C 21.7 10 21 9.3 21 8.5 Z" fill="#047857" />
      <rect x="12" y="19" width="12" height="10" rx="2" fill="#10B981" />
      <path
        d="M 14.5 15 C 14.5 13 16 11.5 18 11.5 C 20 11.5 21.5 13 21.5 15 L 21.5 17"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="18" cy="23.5" r="1.3" fill="#064E3B" />
    </svg>
  );
}

export function OcrIcon({ size = 28, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M 7 4 C 7 2.9 7.9 2 9 2 L 21 2 L 29 10 L 29 32 C 29 33.1 28.1 34 27 34 L 9 34 C 7.9 34 7 33.1 7 32 Z"
        fill="#0284C7"
      />
      <path d="M 21 2 L 29 10 L 22.5 10 C 21.7 10 21 9.3 21 8.5 Z" fill="#0369A1" />
      <path d="M 12 16 L 10 16 L 10 26 L 12 26" fill="none" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 24 16 L 26 16 L 26 26 L 24 26" fill="none" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" />
      <text x="18" y="24" fontFamily="'Inter', sans-serif" fontSize="10" fontWeight="900" fill="#FFFFFF" textAnchor="middle">
        A
      </text>
      <line x1="8" y1="21" x2="28" y2="21" stroke="#FDE047" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

export function PdfEditorIcon({ size = 28, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M 7 4 C 7 2.9 7.9 2 9 2 L 21 2 L 29 10 L 29 32 C 29 33.1 28.1 34 27 34 L 9 34 C 7.9 34 7 33.1 7 32 Z"
        fill="#7C3AED"
      />
      <path d="M 21 2 L 29 10 L 22.5 10 C 21.7 10 21 9.3 21 8.5 Z" fill="#5B21B6" />
      <g transform="translate(18, 17) rotate(45)">
        <rect x="-2" y="-8" width="4" height="12" rx="1" fill="#F59E0B" />
        <polygon points="0,7 -2,4 2,4" fill="#38BDF8" />
      </g>
    </svg>
  );
}
