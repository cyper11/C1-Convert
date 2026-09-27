# C1 Convert Backend

FastAPI backend for file conversion application.

## Requirements
- Python 3.10+
- LibreOffice
- Ghostscript
- Tesseract

## Installation

### Windows
1. Install dependencies (LibreOffice, Ghostscript, Tesseract) using official installers
2. Create virtual environment: `python -m venv venv`
3. Activate: `venv\Scripts\activate`
4. Install python dependencies: `pip install -r requirements.txt`
5. Run: `uvicorn app.main:app --reload --port 8000`

### Linux
1. `sudo apt-get install libreoffice ghostscript tesseract-ocr`
2. Create virtual environment and install python dependencies
3. Run using uvicorn

## Environment Variables
- `BACKEND_PORT`: Port to run the server on (default: 8000)
- `MAX_FILE_SIZE_MB`: Maximum file upload size in MB (default: 50)
- `TEMP_FILE_RETENTION_MINUTES`: Time to keep converted files (default: 30)

## API Endpoints
- `/api/health` - Dependency status
- `/api/convert/*` - Conversion tools
- `/api/pdf/*` - PDF manipulation tools
- `/api/download/{id}` - File download
