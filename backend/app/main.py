import asyncio
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import convert, pdf_tools, download, health
from .utils.cleanup import cleanup_temp_files
from .config import TEMP_DIR

app = FastAPI(title="C1 Convert API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(convert.router)
app.include_router(pdf_tools.router)
app.include_router(download.router)
app.include_router(health.router)

@app.on_event("startup")
async def startup_event():
    os.makedirs(TEMP_DIR, exist_ok=True)
    asyncio.create_task(cleanup_temp_files())

@app.get("/")
def root():
    return {"message": "C1 Convert API is running"}
