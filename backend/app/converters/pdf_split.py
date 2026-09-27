from pypdf import PdfReader, PdfWriter
from typing import List

def split(input_path: str, output_path: str, pages: List[int]) -> None:
    try:
        reader = PdfReader(input_path)
        writer = PdfWriter()
        for page_num in pages:
            # 0-indexed in pypdf, assuming user gives 1-indexed
            idx = page_num - 1
            if 0 <= idx < len(reader.pages):
                writer.add_page(reader.pages[idx])
        with open(output_path, 'wb') as f:
            writer.write(f)
    except Exception as e:
        raise RuntimeError(f"PDF Split failed: {str(e)}")
