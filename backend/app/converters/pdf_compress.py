import subprocess
import os

def compress(input_path: str, output_path: str, level: str = 'medium') -> None:
    try:
        quality_map = {
            'low': '/default',
            'medium': '/ebook',
            'high': '/screen'
        }
        gs_quality = quality_map.get(level, '/ebook')
        
        gs_cmd = 'gswin64c' if os.name == 'nt' else 'gs'
        
        cmd = [
            gs_cmd, '-sDEVICE=pdfwrite', '-dCompatibilityLevel=1.4',
            f'-dPDFSETTINGS={gs_quality}',
            '-dNOPAUSE', '-dQUIET', '-dBATCH',
            f'-sOutputFile={output_path}', input_path
        ]
        subprocess.run(cmd, check=True, timeout=120)
    except subprocess.TimeoutExpired:
        raise RuntimeError("PDF Compress timed out")
    except subprocess.CalledProcessError as e:
        raise RuntimeError(f"PDF Compress failed with code {e.returncode}")
    except Exception as e:
        raise RuntimeError(f"PDF Compress failed: {str(e)}")
