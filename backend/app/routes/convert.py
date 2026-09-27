import os
import uuid
from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from ..utils.file_handler import save_upload_file_temp, file_store
from ..config import TEMP_DIR
from ..converters import pdf_to_word, word_to_pdf, pdf_to_excel, excel_to_pdf, image_to_pdf, pdf_to_image

router = APIRouter(prefix="/api/convert", tags=["convert"])


@router.post("/pdf-to-word")
async def api_pdf_to_word(file: UploadFile = File(...)):
    temp_filepath, original_name, size = await save_upload_file_temp(file)
    try:
        name = os.path.splitext(original_name)[0]
        output_path = os.path.join(TEMP_DIR, f"{uuid.uuid4()}_{name}.docx")
        pdf_to_word.convert(temp_filepath, output_path)
        if not os.path.exists(output_path):
            raise RuntimeError("Output file not generated")
        output_size = os.path.getsize(output_path)
        file_id = file_store.add_file(output_path, f"{name}.docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
        return {"success": True, "filename": f"{name}.docx", "download_url": f"/api/download/{file_id}", "original_size": size, "output_size": output_size}
    except Exception as e:
        return JSONResponse(status_code=500, content={"success": False, "error": str(e)})


@router.post("/word-to-pdf")
async def api_word_to_pdf(file: UploadFile = File(...)):
    temp_filepath, original_name, size = await save_upload_file_temp(file)
    try:
        result_path = word_to_pdf.convert(temp_filepath, TEMP_DIR)
        if not os.path.exists(result_path):
            raise RuntimeError("Output file not generated")
        name = os.path.splitext(original_name)[0]
        output_size = os.path.getsize(result_path)
        file_id = file_store.add_file(result_path, f"{name}.pdf", "application/pdf")
        return {"success": True, "filename": f"{name}.pdf", "download_url": f"/api/download/{file_id}", "original_size": size, "output_size": output_size}
    except Exception as e:
        return JSONResponse(status_code=500, content={"success": False, "error": str(e)})


@router.post("/pdf-to-excel")
async def api_pdf_to_excel(file: UploadFile = File(...)):
    temp_filepath, original_name, size = await save_upload_file_temp(file)
    try:
        name = os.path.splitext(original_name)[0]
        output_path = os.path.join(TEMP_DIR, f"{uuid.uuid4()}_{name}.xlsx")
        pdf_to_excel.convert(temp_filepath, output_path)
        if not os.path.exists(output_path):
            raise RuntimeError("Output file not generated")
        output_size = os.path.getsize(output_path)
        file_id = file_store.add_file(output_path, f"{name}.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
        return {"success": True, "filename": f"{name}.xlsx", "download_url": f"/api/download/{file_id}", "original_size": size, "output_size": output_size}
    except Exception as e:
        return JSONResponse(status_code=500, content={"success": False, "error": str(e)})


@router.post("/excel-to-pdf")
async def api_excel_to_pdf(file: UploadFile = File(...)):
    temp_filepath, original_name, size = await save_upload_file_temp(file)
    try:
        result_path = excel_to_pdf.convert(temp_filepath, TEMP_DIR)
        if not os.path.exists(result_path):
            raise RuntimeError("Output file not generated")
        name = os.path.splitext(original_name)[0]
        output_size = os.path.getsize(result_path)
        file_id = file_store.add_file(result_path, f"{name}.pdf", "application/pdf")
        return {"success": True, "filename": f"{name}.pdf", "download_url": f"/api/download/{file_id}", "original_size": size, "output_size": output_size}
    except Exception as e:
        return JSONResponse(status_code=500, content={"success": False, "error": str(e)})


@router.post("/jpg-to-pdf")
async def api_jpg_to_pdf(file: UploadFile = File(...)):
    temp_filepath, original_name, size = await save_upload_file_temp(file)
    try:
        name = os.path.splitext(original_name)[0]
        output_path = os.path.join(TEMP_DIR, f"{uuid.uuid4()}_{name}.pdf")
        image_to_pdf.convert([temp_filepath], output_path)
        if not os.path.exists(output_path):
            raise RuntimeError("Output file not generated")
        output_size = os.path.getsize(output_path)
        file_id = file_store.add_file(output_path, f"{name}.pdf", "application/pdf")
        return {"success": True, "filename": f"{name}.pdf", "download_url": f"/api/download/{file_id}", "original_size": size, "output_size": output_size}
    except Exception as e:
        return JSONResponse(status_code=500, content={"success": False, "error": str(e)})


@router.post("/png-to-pdf")
async def api_png_to_pdf(file: UploadFile = File(...)):
    temp_filepath, original_name, size = await save_upload_file_temp(file)
    try:
        name = os.path.splitext(original_name)[0]
        output_path = os.path.join(TEMP_DIR, f"{uuid.uuid4()}_{name}.pdf")
        image_to_pdf.convert([temp_filepath], output_path)
        if not os.path.exists(output_path):
            raise RuntimeError("Output file not generated")
        output_size = os.path.getsize(output_path)
        file_id = file_store.add_file(output_path, f"{name}.pdf", "application/pdf")
        return {"success": True, "filename": f"{name}.pdf", "download_url": f"/api/download/{file_id}", "original_size": size, "output_size": output_size}
    except Exception as e:
        return JSONResponse(status_code=500, content={"success": False, "error": str(e)})


@router.post("/pdf-to-jpg")
async def api_pdf_to_jpg(file: UploadFile = File(...)):
    temp_filepath, original_name, size = await save_upload_file_temp(file)
    try:
        name = os.path.splitext(original_name)[0]
        sub_dir = os.path.join(TEMP_DIR, str(uuid.uuid4()))
        os.makedirs(sub_dir, exist_ok=True)
        result_path = pdf_to_image.convert(temp_filepath, sub_dir, format='jpg')
        if not os.path.exists(result_path):
            raise RuntimeError("Output file not generated")
        output_size = os.path.getsize(result_path)
        out_name = f"{name}_pages.jpg" if result_path.endswith('.jpg') else f"{name}_pages.zip"
        content_type = "image/jpeg" if result_path.endswith('.jpg') else "application/zip"
        file_id = file_store.add_file(result_path, out_name, content_type)
        return {"success": True, "filename": out_name, "download_url": f"/api/download/{file_id}", "original_size": size, "output_size": output_size}
    except Exception as e:
        return JSONResponse(status_code=500, content={"success": False, "error": str(e)})


@router.post("/pdf-to-png")
async def api_pdf_to_png(file: UploadFile = File(...)):
    temp_filepath, original_name, size = await save_upload_file_temp(file)
    try:
        name = os.path.splitext(original_name)[0]
        sub_dir = os.path.join(TEMP_DIR, str(uuid.uuid4()))
        os.makedirs(sub_dir, exist_ok=True)
        result_path = pdf_to_image.convert(temp_filepath, sub_dir, format='png')
        if not os.path.exists(result_path):
            raise RuntimeError("Output file not generated")
        output_size = os.path.getsize(result_path)
        out_name = f"{name}_pages.png" if result_path.endswith('.png') else f"{name}_pages.zip"
        content_type = "image/png" if result_path.endswith('.png') else "application/zip"
        file_id = file_store.add_file(result_path, out_name, content_type)
        return {"success": True, "filename": out_name, "download_url": f"/api/download/{file_id}", "original_size": size, "output_size": output_size}
    except Exception as e:
        return JSONResponse(status_code=500, content={"success": False, "error": str(e)})
