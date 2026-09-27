import os
import uuid
import mimetypes
from datetime import datetime
from fastapi import UploadFile, HTTPException
from typing import Dict, Optional, Tuple
from ..config import TEMP_DIR, MAX_FILE_SIZE_MB

ALLOWED_TYPES = {
    '.pdf': ['application/pdf'],
    '.docx': ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    '.xlsx': ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    '.jpg': ['image/jpeg'],
    '.jpeg': ['image/jpeg'],
    '.png': ['image/png'],
}

class FileStore:
    def __init__(self):
        self.store = {}
    
    def add_file(self, filepath: str, original_name: str, content_type: str) -> str:
        file_id = str(uuid.uuid4())
        self.store[file_id] = {
            "filepath": filepath,
            "original_name": original_name,
            "content_type": content_type,
            "created_at": datetime.now()
        }
        return file_id
    
    def get_file(self, file_id: str) -> Optional[Dict]:
        return self.store.get(file_id)
        
    def remove_file(self, file_id: str):
        if file_id in self.store:
            del self.store[file_id]
            
    def get_all(self):
        return self.store

file_store = FileStore()

async def save_upload_file_temp(upload_file: UploadFile) -> Tuple[str, str, int]:
    ext = os.path.splitext(upload_file.filename)[1].lower()
    if ext not in ALLOWED_TYPES:
        raise HTTPException(status_code=400, detail="Extension not allowed")
    
    content_type = upload_file.content_type
    if content_type not in ALLOWED_TYPES[ext]:
        raise HTTPException(status_code=400, detail="Invalid MIME type")
        
    # Read file to check size
    content = await upload_file.read()
    size_mb = len(content) / (1024 * 1024)
    if size_mb > MAX_FILE_SIZE_MB:
        raise HTTPException(status_code=400, detail=f"File exceeds maximum size of {MAX_FILE_SIZE_MB}MB")
        
    os.makedirs(TEMP_DIR, exist_ok=True)
    temp_filename = f"{uuid.uuid4()}{ext}"
    temp_filepath = os.path.join(TEMP_DIR, temp_filename)
    
    with open(temp_filepath, "wb") as f:
        f.write(content)
        
    return temp_filepath, upload_file.filename, len(content)
