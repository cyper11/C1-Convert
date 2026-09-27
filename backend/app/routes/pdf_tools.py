import os
import pymupdf as fitz
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import JSONResponse, FileResponse
from typing import List, Optional
import json
import uuid

from ..utils.file_handler import save_upload_file_temp, file_store
from ..config import TEMP_DIR
from ..converters import pdf_merge, pdf_split, pdf_compress, pdf_rotate, pdf_protect, pdf_unlock, ocr, pdf_edit

router = APIRouter(prefix="/api/pdf", tags=["pdf_tools"])

@router.post("/upload-for-info")
async def api_upload_for_info(file: UploadFile = File(...)):
    try:
        temp_filepath, original_name, size = await save_upload_file_temp(file)
        doc = fitz.open(temp_filepath)
        page_count = len(doc)
        pages = [{"width": page.rect.width, "height": page.rect.height} for page in doc]
        doc.close()
        
        file_id = file_store.add_file(temp_filepath, original_name, "application/pdf")
        return {
            "success": True,
            "file_id": file_id,
            "page_count": page_count,
            "pages": pages
        }
    except Exception as e:
        return JSONResponse(status_code=500, content={"success": False, "error": str(e)})

@router.post("/merge")
async def api_pdf_merge(files: List[UploadFile] = File(...)):
    try:
        input_paths = []
        total_size = 0
        for f in files:
            path, _, size = await save_upload_file_temp(f)
            input_paths.append(path)
            total_size += size
            
        output_filename = f"merged_{uuid.uuid4()}.pdf"
        output_path = os.path.join(TEMP_DIR, output_filename)
        
        pdf_merge.merge(input_paths, output_path)
        
        file_id = file_store.add_file(output_path, "merged.pdf", "application/pdf")
        return {
            "success": True,
            "filename": "merged.pdf",
            "download_url": f"/api/download/{file_id}",
            "original_size": total_size,
            "output_size": os.path.getsize(output_path)
        }
    except Exception as e:
        return JSONResponse(status_code=500, content={"success": False, "error": str(e)})

@router.post("/split")
async def api_pdf_split(file: UploadFile = File(...), pages: str = Form(...)):
    try:
        pages_list = json.loads(pages)
        temp_filepath, original_name, size = await save_upload_file_temp(file)
        
        output_filename = f"split_{uuid.uuid4()}.pdf"
        output_path = os.path.join(TEMP_DIR, output_filename)
        
        pdf_split.split(temp_filepath, output_path, pages_list)
        
        file_id = file_store.add_file(output_path, f"split_{original_name}", "application/pdf")
        return {
            "success": True,
            "filename": f"split_{original_name}",
            "download_url": f"/api/download/{file_id}",
            "original_size": size,
            "output_size": os.path.getsize(output_path)
        }
    except Exception as e:
        return JSONResponse(status_code=500, content={"success": False, "error": str(e)})

@router.post("/compress")
async def api_pdf_compress(file: UploadFile = File(...), level: str = Form("medium")):
    try:
        temp_filepath, original_name, size = await save_upload_file_temp(file)
        output_filename = f"compressed_{uuid.uuid4()}.pdf"
        output_path = os.path.join(TEMP_DIR, output_filename)
        
        pdf_compress.compress(temp_filepath, output_path, level)
        
        file_id = file_store.add_file(output_path, f"compressed_{original_name}", "application/pdf")
        return {
            "success": True,
            "filename": f"compressed_{original_name}",
            "download_url": f"/api/download/{file_id}",
            "original_size": size,
            "output_size": os.path.getsize(output_path)
        }
    except Exception as e:
        return JSONResponse(status_code=500, content={"success": False, "error": str(e)})

@router.post("/rotate")
async def api_pdf_rotate(file: UploadFile = File(...), angle: int = Form(...), pages: str = Form(None)):
    try:
        temp_filepath, original_name, size = await save_upload_file_temp(file)
        pages_list = json.loads(pages) if pages else None
        
        output_filename = f"rotated_{uuid.uuid4()}.pdf"
        output_path = os.path.join(TEMP_DIR, output_filename)
        
        pdf_rotate.rotate(temp_filepath, output_path, angle, pages_list)
        
        file_id = file_store.add_file(output_path, f"rotated_{original_name}", "application/pdf")
        return {
            "success": True,
            "filename": f"rotated_{original_name}",
            "download_url": f"/api/download/{file_id}",
            "original_size": size,
            "output_size": os.path.getsize(output_path)
        }
    except Exception as e:
        return JSONResponse(status_code=500, content={"success": False, "error": str(e)})

@router.post("/protect")
async def api_pdf_protect(file: UploadFile = File(...), password: str = Form(...)):
    try:
        temp_filepath, original_name, size = await save_upload_file_temp(file)
        output_filename = f"protected_{uuid.uuid4()}.pdf"
        output_path = os.path.join(TEMP_DIR, output_filename)
        
        pdf_protect.protect(temp_filepath, output_path, password)
        
        file_id = file_store.add_file(output_path, f"protected_{original_name}", "application/pdf")
        return {
            "success": True,
            "filename": f"protected_{original_name}",
            "download_url": f"/api/download/{file_id}",
            "original_size": size,
            "output_size": os.path.getsize(output_path)
        }
    except Exception as e:
        return JSONResponse(status_code=500, content={"success": False, "error": str(e)})

@router.post("/unlock")
async def api_pdf_unlock(file: UploadFile = File(...), password: str = Form(...)):
    try:
        temp_filepath, original_name, size = await save_upload_file_temp(file)
        output_filename = f"unlocked_{uuid.uuid4()}.pdf"
        output_path = os.path.join(TEMP_DIR, output_filename)
        
        pdf_unlock.unlock(temp_filepath, output_path, password)
        
        file_id = file_store.add_file(output_path, f"unlocked_{original_name}", "application/pdf")
        return {
            "success": True,
            "filename": f"unlocked_{original_name}",
            "download_url": f"/api/download/{file_id}",
            "original_size": size,
            "output_size": os.path.getsize(output_path)
        }
    except Exception as e:
        return JSONResponse(status_code=400, content={"success": False, "error": str(e)})

@router.post("/ocr")
async def api_ocr(file: UploadFile = File(...), language: str = Form("English"), output_format: str = Form("txt")):
    try:
        temp_filepath, original_name, size = await save_upload_file_temp(file)
        
        result_path = ocr.process(temp_filepath, TEMP_DIR, language, output_format)
        
        content_type = "text/plain" if output_format == "txt" else "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        
        file_id = file_store.add_file(result_path, os.path.basename(result_path), content_type)
        return {
            "success": True,
            "filename": os.path.basename(result_path),
            "download_url": f"/api/download/{file_id}",
            "original_size": size,
            "output_size": os.path.getsize(result_path)
        }
    except Exception as e:
        return JSONResponse(status_code=500, content={"success": False, "error": str(e)})

@router.post("/edit")
async def api_pdf_edit(file: UploadFile = File(...), operations: str = Form(...)):
    try:
        parsed = json.loads(operations)
        ops = parsed if isinstance(parsed, list) else parsed.get("operations", [])
        temp_filepath, original_name, size = await save_upload_file_temp(file)
        
        output_filename = f"edited_{uuid.uuid4()}.pdf"
        output_path = os.path.join(TEMP_DIR, output_filename)
        
        pdf_edit.edit(temp_filepath, output_path, ops)
        
        file_id = file_store.add_file(output_path, f"edited_{original_name}", "application/pdf")
        return {
            "success": True,
            "filename": f"edited_{original_name}",
            "download_url": f"/api/download/{file_id}",
            "original_size": size,
            "output_size": os.path.getsize(output_path)
        }
    except Exception as e:
        return JSONResponse(status_code=500, content={"success": False, "error": str(e)})

@router.get("/info/{file_id}")
async def api_pdf_info(file_id: str):
    info = file_store.get_file(file_id)
    if not info or not os.path.exists(info["filepath"]):
        raise HTTPException(status_code=404, detail="File not found")
        
    try:
        doc = fitz.open(info["filepath"])
        page_count = len(doc)
        sizes = [page.rect.round() for page in doc]
        doc.close()
        return {"success": True, "page_count": page_count, "sizes": sizes}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/thumbnail/{file_id}/{page}")
async def api_pdf_thumbnail(file_id: str, page: int):
    info = file_store.get_file(file_id)
    if not info or not os.path.exists(info["filepath"]):
        raise HTTPException(status_code=404, detail="File not found")
        
    try:
        doc = fitz.open(info["filepath"])
        if page < 1 or page > len(doc):
            raise HTTPException(status_code=400, detail="Invalid page number")
            
        p = doc[page - 1]
        pix = p.get_pixmap(matrix=fitz.Matrix(0.2, 0.2))
        thumb_path = os.path.join(TEMP_DIR, f"thumb_{file_id}_{page}.jpg")
        pix.save(thumb_path)
        doc.close()
        
        return FileResponse(thumb_path, media_type="image/jpeg")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
