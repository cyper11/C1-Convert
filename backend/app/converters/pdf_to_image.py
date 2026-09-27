import pymupdf as fitz
import os
import zipfile

def convert(input_path: str, output_dir: str, format: str = 'jpg', pages: list = None, dpi: int = 200) -> str:
    try:
        doc = fitz.open(input_path)
        output_files = []
        for i, page in enumerate(doc):
            if pages and (i+1) not in pages:
                continue
            mat = fitz.Matrix(dpi/72, dpi/72)
            pix = page.get_pixmap(matrix=mat)
            ext = 'jpg' if format == 'jpg' else 'png'
            out = os.path.join(output_dir, f'page_{i+1}.{ext}')
            if format == 'jpg':
                pix.save(out, jpg_quality=95)
            else:
                pix.save(out)
            output_files.append(out)
        doc.close()
        
        if len(output_files) == 1:
            return output_files[0]
            
        zip_path = os.path.join(output_dir, "images.zip")
        with zipfile.ZipFile(zip_path, 'w') as zipf:
            for file in output_files:
                zipf.write(file, os.path.basename(file))
                
        return zip_path
    except Exception as e:
        raise RuntimeError(f"PDF to Image conversion failed: {str(e)}")
