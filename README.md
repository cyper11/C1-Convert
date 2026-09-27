# C1 Convert

**Convert. Compress. Done.**

A fully functional, all-in-one file conversion and PDF utility application. No demos, no mocks — every tool processes real files end-to-end.

---

## Overview

C1 Convert is a self-hosted file conversion tool that handles documents, PDFs, images, and spreadsheets. Upload a file, choose a conversion, and download the result.

### Supported Conversions

| Tool | Input | Output | Engine |
|------|-------|--------|--------|
| PDF → Word | PDF | DOCX | pdf2docx |
| Word → PDF | DOCX | PDF | LibreOffice headless |
| PDF → Excel | PDF | XLSX | pdfplumber + openpyxl |
| Excel → PDF | XLSX | PDF | LibreOffice headless |
| JPG → PDF | JPG | PDF | img2pdf |
| PNG → PDF | PNG | PDF | img2pdf |
| PDF → JPG | PDF | JPG/ZIP | PyMuPDF |
| PDF → PNG | PDF | PNG/ZIP | PyMuPDF |
| Merge PDF | PDF × N | PDF | pypdf |
| Split PDF | PDF | PDF | pypdf |
| Compress PDF | PDF | PDF | Ghostscript |
| Rotate PDF | PDF | PDF | pypdf |
| OCR | PDF/JPG/PNG | PDF/TXT/DOCX | Tesseract OCR |
| Protect PDF | PDF | PDF | pypdf (AES encryption) |
| Unlock PDF | PDF | PDF | pypdf |
| PDF Editor | PDF | PDF | PyMuPDF |

---

## Requirements

### Software

- **Node.js** 18+ and npm
- **Python** 3.10+
- **LibreOffice** (for Word/Excel ↔ PDF)
- **Ghostscript** (for PDF compression)
- **Tesseract OCR** (for text recognition)

---

## Installation

### 1. Clone the repository

```bash
git clone <repo-url>
cd "C1 Convert"
```

### 2. Install system dependencies

#### Windows

**LibreOffice:**
- Download from https://www.libreoffice.org/download/
- Install to default location (`C:\Program Files\LibreOffice`)

**Ghostscript:**
- Download from https://www.ghostscript.com/releases/gsdnld.html
- Install and ensure `gswin64c` is on your PATH

**Tesseract OCR:**
- Download from https://github.com/UB-Mannheim/tesseract/wiki
- Install to default location (`C:\Program Files\Tesseract-OCR`)
- For non-English languages, select additional language data during installation

#### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install libreoffice ghostscript tesseract-ocr tesseract-ocr-eng tesseract-ocr-tgl tesseract-ocr-jpn tesseract-ocr-chi-sim
```

#### macOS

```bash
brew install libreoffice ghostscript tesseract tesseract-lang
```

### 3. Backend setup

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/macOS
source venv/bin/activate

pip install -r requirements.txt
```

### 4. Frontend setup

```bash
cd frontend
npm install
```

---

## Running the Application

### Start the backend

```bash
cd backend
# Activate virtual environment first
uvicorn app.main:app --reload --port 8000
```

### Start the frontend

```bash
cd frontend
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Default | Description |
|----------|---------|-------------|
| `BACKEND_PORT` | `8000` | Server port |
| `MAX_FILE_SIZE_MB` | `50` | Maximum upload size in MB |
| `TEMP_FILE_RETENTION_MINUTES` | `30` | Auto-cleanup interval |

### Frontend (`frontend/.env`)

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:8000` | Backend API URL |

---

## API Documentation

### Conversion Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/convert/pdf-to-word` | PDF → DOCX |
| POST | `/api/convert/word-to-pdf` | DOCX → PDF |
| POST | `/api/convert/pdf-to-excel` | PDF → XLSX |
| POST | `/api/convert/excel-to-pdf` | XLSX → PDF |
| POST | `/api/convert/jpg-to-pdf` | JPG → PDF |
| POST | `/api/convert/png-to-pdf` | PNG → PDF |
| POST | `/api/convert/pdf-to-jpg` | PDF → JPG |
| POST | `/api/convert/pdf-to-png` | PDF → PNG |

### PDF Tool Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/pdf/merge` | Merge multiple PDFs |
| POST | `/api/pdf/split` | Split PDF by pages |
| POST | `/api/pdf/compress` | Compress PDF |
| POST | `/api/pdf/rotate` | Rotate PDF pages |
| POST | `/api/pdf/protect` | Password-protect PDF |
| POST | `/api/pdf/unlock` | Unlock PDF with password |
| POST | `/api/pdf/ocr` | OCR processing |
| POST | `/api/pdf/edit` | Edit PDF (annotate, delete, rotate pages) |

### Utility Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/download/{file_id}` | Download generated file |
| GET | `/api/health` | System dependency check |
| GET | `/api/pdf/info/{file_id}` | PDF page information |
| GET | `/api/pdf/thumbnail/{file_id}/{page}` | Page thumbnail |

### Request Format

All upload endpoints use `multipart/form-data`.

### Response Format

```json
{
  "success": true,
  "filename": "document.docx",
  "download_url": "/api/download/abc123",
  "original_size": 1048576,
  "output_size": 524288
}
```

---

## Docker

```bash
cd backend
docker-compose up --build
```

This installs all system dependencies (LibreOffice, Ghostscript, Tesseract) automatically.

---

## Troubleshooting

### "LibreOffice is required for Word to PDF conversion"

LibreOffice is not installed or not found. Install it and ensure it's in the default location.

### "PDF Compress failed" / Ghostscript errors

- Windows: Ensure `gswin64c.exe` is on your PATH
- Linux: Install with `sudo apt install ghostscript`

### "OCR failed" / Tesseract errors

- Windows: Install Tesseract from https://github.com/UB-Mannheim/tesseract/wiki
- Linux: Install with `sudo apt install tesseract-ocr`
- Ensure language data files are installed for the selected language

### "File exceeds maximum size"

Default limit is 50 MB. Change with the `MAX_FILE_SIZE_MB` environment variable.

### CORS errors

The backend allows requests from `http://localhost:5173` by default. If your frontend runs on a different port, update the CORS settings in `backend/app/main.py`.

---

## Architecture

```
C1 Convert/
├── frontend/              # React + Vite + TypeScript + Tailwind
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route pages
│   │   ├── services/      # API client
│   │   ├── hooks/         # React hooks
│   │   ├── types/         # TypeScript types
│   │   └── config/        # Tool configurations
│   └── ...
├── backend/               # Python FastAPI
│   ├── app/
│   │   ├── routes/        # API endpoints
│   │   ├── converters/    # File conversion engines
│   │   ├── utils/         # File handling, cleanup
│   │   └── config.py      # Environment configuration
│   └── ...
└── README.md
```

---

## Security

- File extension and MIME type validation
- 50 MB upload size limit (configurable)
- Random UUIDs for temporary filenames
- Path traversal protection
- No shell command injection (subprocess uses list arguments)
- Automatic temp file cleanup
- Download URLs use secure file IDs (not filesystem paths)

---

## License

MIT
