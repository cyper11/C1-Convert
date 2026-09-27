from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
import os
from ..utils.file_handler import file_store

router = APIRouter(prefix="/api/download", tags=["download"])

@router.get("/{file_id}")
async def download_file(file_id: str):
    file_info = file_store.get_file(file_id)
    if not file_info:
        raise HTTPException(status_code=404, detail="File not found or expired")
        
    filepath = file_info["filepath"]
    if not os.path.exists(filepath):
        raise HTTPException(status_code=404, detail="File has been deleted")
        
    return FileResponse(
        path=filepath, 
        filename=file_info["original_name"],
        media_type=file_info["content_type"]
    )
