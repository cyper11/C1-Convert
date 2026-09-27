import os
import time
import asyncio
import logging
from datetime import datetime, timedelta
from ..config import TEMP_DIR, TEMP_FILE_RETENTION_MINUTES
from .file_handler import file_store

logger = logging.getLogger(__name__)

async def cleanup_temp_files():
    while True:
        try:
            now = datetime.now()
            cutoff = now - timedelta(minutes=TEMP_FILE_RETENTION_MINUTES)
            
            to_remove = []
            for file_id, info in file_store.get_all().items():
                if info["created_at"] < cutoff:
                    to_remove.append(file_id)
                    
            for file_id in to_remove:
                info = file_store.get_file(file_id)
                filepath = info["filepath"]
                if os.path.exists(filepath):
                    try:
                        os.remove(filepath)
                    except Exception as e:
                        logger.error(f"Error removing file {filepath}: {e}")
                file_store.remove_file(file_id)
                
            # Cleanup orphaned files in temp dir
            if os.path.exists(TEMP_DIR):
                for filename in os.listdir(TEMP_DIR):
                    filepath = os.path.join(TEMP_DIR, filename)
                    if os.path.isfile(filepath):
                        file_time = datetime.fromtimestamp(os.path.getmtime(filepath))
                        if file_time < cutoff:
                            try:
                                os.remove(filepath)
                            except Exception as e:
                                logger.error(f"Error removing orphaned file {filepath}: {e}")
                                
        except Exception as e:
            logger.error(f"Cleanup task error: {e}")
            
        await asyncio.sleep(60 * 5) # Check every 5 minutes
