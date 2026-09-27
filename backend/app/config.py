import os
import shutil
import subprocess

MAX_FILE_SIZE_MB = int(os.getenv("MAX_FILE_SIZE_MB", 50))
TEMP_DIR = os.getenv("TEMP_DIR", os.path.join(os.environ.get("TEMP", "/tmp"), "c1convert"))
TEMP_FILE_RETENTION_MINUTES = int(os.getenv("TEMP_FILE_RETENTION_MINUTES", 30))
BACKEND_PORT = int(os.getenv("BACKEND_PORT", 8000))

def check_libreoffice():
    if os.name == 'nt':
        common_paths = [
            r"C:\Program Files\LibreOffice\program\soffice.exe",
            r"C:\Program Files (x86)\LibreOffice\program\soffice.exe"
        ]
        for p in common_paths:
            if os.path.exists(p):
                return True
        return False
    return shutil.which("libreoffice") is not None

def check_ghostscript():
    if os.name == 'nt':
        return shutil.which("gswin64c") is not None or shutil.which("gswin32c") is not None
    return shutil.which("gs") is not None

def check_tesseract():
    if os.name == 'nt':
        common_paths = [
            r"C:\Program Files\Tesseract-OCR\tesseract.exe",
            r"C:\Program Files (x86)\Tesseract-OCR\tesseract.exe"
        ]
        for p in common_paths:
            if os.path.exists(p):
                return True
        return shutil.which("tesseract") is not None
    return shutil.which("tesseract") is not None

LIBREOFFICE_AVAILABLE = check_libreoffice()
GHOSTSCRIPT_AVAILABLE = check_ghostscript()
TESSERACT_AVAILABLE = check_tesseract()
