import subprocess
import os
from .word_to_pdf import get_libreoffice_path

def convert(input_path: str, output_dir: str) -> str:
    try:
        lo_path = get_libreoffice_path()
        result = subprocess.run(
            [lo_path, '--headless', '--convert-to', 'pdf', '--outdir', output_dir, input_path],
            capture_output=True, text=True, timeout=120
        )
        if result.returncode != 0:
            raise RuntimeError(f'LibreOffice conversion failed: {result.stderr}')
        
        filename = os.path.basename(input_path)
        name, _ = os.path.splitext(filename)
        output_file = os.path.join(output_dir, f"{name}.pdf")
        if not os.path.exists(output_file):
            raise RuntimeError("LibreOffice completed but output file not found")
        return output_file
    except subprocess.TimeoutExpired:
        raise RuntimeError("LibreOffice conversion timed out")
    except Exception as e:
        raise RuntimeError(f"Excel to PDF conversion failed: {str(e)}")
