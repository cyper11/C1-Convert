from fastapi import APIRouter
from ..config import LIBREOFFICE_AVAILABLE, GHOSTSCRIPT_AVAILABLE, TESSERACT_AVAILABLE

router = APIRouter(prefix="/api/health", tags=["health"])

@router.get("")
async def health_check():
    return {
        "status": "ok",
        "dependencies": {
            "libreoffice": LIBREOFFICE_AVAILABLE,
            "ghostscript": GHOSTSCRIPT_AVAILABLE,
            "tesseract": TESSERACT_AVAILABLE
        }
    }
