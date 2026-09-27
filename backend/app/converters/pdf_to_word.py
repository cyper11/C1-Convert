from pdf2docx import Converter

def convert(input_path: str, output_path: str) -> None:
    try:
        cv = Converter(input_path)
        cv.convert(output_path)
        cv.close()
    except Exception as e:
        raise RuntimeError(f"PDF to Word conversion failed: {str(e)}")
