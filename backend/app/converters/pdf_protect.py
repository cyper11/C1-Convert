from pypdf import PdfReader, PdfWriter

def protect(input_path: str, output_path: str, password: str) -> None:
    try:
        reader = PdfReader(input_path)
        writer = PdfWriter()
        for page in reader.pages:
            writer.add_page(page)
        writer.encrypt(password)
        with open(output_path, 'wb') as f:
            writer.write(f)
    except Exception as e:
        raise RuntimeError(f"PDF Protect failed: {str(e)}")
