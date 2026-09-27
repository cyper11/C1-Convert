import img2pdf
from PIL import Image
import os
from typing import List

def convert(input_paths: List[str], output_path: str) -> None:
    try:
        processed_paths = []
        for path in input_paths:
            img = Image.open(path)
            if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                rgb_img = img.convert('RGB')
                processed_path = path + "_rgb.jpg"
                rgb_img.save(processed_path)
                processed_paths.append(processed_path)
            else:
                processed_paths.append(path)
                
        with open(output_path, 'wb') as f:
            f.write(img2pdf.convert(processed_paths))
            
        # Clean up processed RGB images
        for p in processed_paths:
            if p.endswith('_rgb.jpg') and p not in input_paths:
                try:
                    os.remove(p)
                except:
                    pass
    except Exception as e:
        raise RuntimeError(f"Image to PDF conversion failed: {str(e)}")
