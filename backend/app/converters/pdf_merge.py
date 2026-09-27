from pypdf import PdfReader, PdfWriter
from typing import List

def merge(input_paths: List[str], output_path: str) -> None:
    try:
        writer = PdfWriter()
        for path in input_paths:
            reader = PdfReader(path)
            for page in reader.pages:
                writer.add_page(page)
        with open(output_path, 'wb') as f:
            writer.write(f)
    except Exception as e:
        raise RuntimeError(f"PDF Merge failed: {str(e)}")
