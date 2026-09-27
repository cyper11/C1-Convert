import pdfplumber
from openpyxl import Workbook
import os

def convert(input_path: str, output_path: str) -> None:
    try:
        wb = Workbook()
        with pdfplumber.open(input_path) as pdf:
            for i, page in enumerate(pdf.pages):
                tables = page.extract_tables()
                ws = wb.active if i == 0 else wb.create_sheet(f'Page {i+1}')
                if tables:
                    for table in tables:
                        for row in table:
                            ws.append(row)
                else:
                    text = page.extract_text()
                    if text:
                        for line in text.split('\n'):
                            ws.append([line])
        wb.save(output_path)
    except Exception as e:
        raise RuntimeError(f"PDF to Excel conversion failed: {str(e)}")
