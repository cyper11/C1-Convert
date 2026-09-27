import pytesseract
import pymupdf as fitz
import os
from docx import Document
from PIL import Image

def process(input_path: str, output_dir: str, language: str = 'English', output_format: str = 'txt') -> str:
    try:
        lang_map = {'English': 'eng', 'Filipino': 'tgl', 'Japanese': 'jpn', 'Chinese': 'chi_sim'}
        tess_lang = lang_map.get(language, 'eng')
        
        # If nt, pytesseract needs path to tesseract.exe
        if os.name == 'nt':
            if os.path.exists(r"C:\Program Files\Tesseract-OCR\tesseract.exe"):
                pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
            elif os.path.exists(r"C:\Program Files (x86)\Tesseract-OCR\tesseract.exe"):
                pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files (x86)\Tesseract-OCR\tesseract.exe"
                
        ext = os.path.splitext(input_path)[1].lower()
        text_content = ""
        temp_images = []
        
        if ext == '.pdf':
            doc = fitz.open(input_path)
            for i, page in enumerate(doc):
                pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
                img_path = os.path.join(output_dir, f"temp_ocr_{i}.png")
                pix.save(img_path)
                temp_images.append(img_path)
                text_content += pytesseract.image_to_string(img_path, lang=tess_lang) + "\n"
            doc.close()
        else:
            text_content = pytesseract.image_to_string(input_path, lang=tess_lang)
            temp_images.append(input_path)
            
        filename = os.path.splitext(os.path.basename(input_path))[0]
        
        # Normalize output format
        fmt = output_format.lower().strip()
        
        if fmt in ('txt', 'text'):
            out_path = os.path.join(output_dir, f"{filename}_ocr.txt")
            with open(out_path, 'w', encoding='utf-8') as f:
                f.write(text_content)
            _cleanup_temp(temp_images, input_path)
            return out_path
            
        elif fmt in ('docx',):
            doc = Document()
            for para in text_content.split('\n'):
                if para.strip():
                    doc.add_paragraph(para)
            out_path = os.path.join(output_dir, f"{filename}_ocr.docx")
            doc.save(out_path)
            _cleanup_temp(temp_images, input_path)
            return out_path
            
        elif fmt in ('searchable pdf', 'pdf', 'searchable_pdf'):
            # Create searchable PDF using Tesseract's PDF output
            out_path = os.path.join(output_dir, f"{filename}_ocr.pdf")
            
            if ext == '.pdf':
                # For PDFs: render each page to image, then create searchable PDF with Tesseract
                pdf_pages = []
                for img_path in temp_images:
                    pdf_bytes = pytesseract.image_to_pdf_or_hocr(img_path, lang=tess_lang, extension='pdf')
                    page_pdf_path = img_path.replace('.png', '_ocr.pdf')
                    with open(page_pdf_path, 'wb') as f:
                        f.write(pdf_bytes)
                    pdf_pages.append(page_pdf_path)
                
                # Merge all pages
                if len(pdf_pages) == 1:
                    os.rename(pdf_pages[0], out_path)
                else:
                    from pypdf import PdfWriter
                    writer = PdfWriter()
                    for pp in pdf_pages:
                        from pypdf import PdfReader
                        reader = PdfReader(pp)
                        for page in reader.pages:
                            writer.add_page(page)
                    with open(out_path, 'wb') as f:
                        writer.write(f)
                    for pp in pdf_pages:
                        if os.path.exists(pp):
                            os.remove(pp)
            else:
                # For images: directly convert to searchable PDF
                pdf_bytes = pytesseract.image_to_pdf_or_hocr(input_path, lang=tess_lang, extension='pdf')
                with open(out_path, 'wb') as f:
                    f.write(pdf_bytes)
            
            _cleanup_temp(temp_images, input_path)
            return out_path
        else:
            raise RuntimeError(f"Unsupported output format: {output_format}")
            
    except Exception as e:
        raise RuntimeError(f"OCR failed: {str(e)}")


def _cleanup_temp(temp_images: list, input_path: str):
    """Clean up temporary OCR image files"""
    for img_path in temp_images:
        if img_path != input_path and os.path.exists(img_path):
            try:
                os.remove(img_path)
            except OSError:
                pass
