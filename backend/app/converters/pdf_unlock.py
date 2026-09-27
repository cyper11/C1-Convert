from pypdf import PdfReader, PdfWriter
from pypdf.errors import FileNotDecryptedError

def unlock(input_path: str, output_path: str, password: str) -> None:
    try:
        reader = PdfReader(input_path)
        if reader.is_encrypted:
            result = reader.decrypt(password)
            if result == 0: # 0 means decryption failed
                raise RuntimeError("Incorrect password provided")
        
        writer = PdfWriter()
        for page in reader.pages:
            writer.add_page(page)
        with open(output_path, 'wb') as f:
            writer.write(f)
    except Exception as e:
        if "Incorrect password" in str(e):
            raise
        raise RuntimeError(f"PDF Unlock failed: {str(e)}")
