from pypdf import PdfReader, PdfWriter
from typing import List

def rotate(input_path: str, output_path: str, angle: int, pages: List[int] = None) -> None:
    try:
        reader = PdfReader(input_path)
        writer = PdfWriter()
        for i, page in enumerate(reader.pages):
            if not pages or (i + 1) in pages:
                writer.add_page(page.rotate(angle))
            else:
                writer.add_page(page)
        with open(output_path, 'wb') as f:
            writer.write(f)
    except Exception as e:
        raise RuntimeError(f"PDF Rotate failed: {str(e)}")
