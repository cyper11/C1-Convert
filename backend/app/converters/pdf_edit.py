import pymupdf as fitz

def edit(input_path: str, output_path: str, operations: list) -> None:
    try:
        doc = fitz.open(input_path)
        
        # We need to handle reorder/delete carefully as it changes page indices
        # So we process them separately or apply in place
        
        for op in operations:
            op_type = op.get('type')
            if op_type == 'rotate':
                page_idx = op.get('page', 0)
                angle = op.get('angle', 90)
                page = doc[page_idx]
                page.set_rotation(angle)
            elif op_type == 'delete':
                page_idx = op.get('page', 0)
                doc.delete_page(page_idx)
            elif op_type == 'reorder':
                order = op.get('order', [])
                # reorder expects a 0-based list of page numbers
                doc.select(order)
            elif op_type == 'add_text':
                page_idx = op.get('page', 0)
                x = op.get('x', 0)
                y = op.get('y', 0)
                text = op.get('text', '')
                size = op.get('size', 12)
                color = op.get('color', [0,0,0])
                page = doc[page_idx]
                page.insert_text(fitz.Point(x, y), text, fontsize=size, color=color)
            elif op_type == 'highlight':
                page_idx = op.get('page', 0)
                rect = op.get('rect', [0, 0, 100, 100]) # x0, y0, x1, y1
                page = doc[page_idx]
                page.add_highlight_annot(fitz.Rect(*rect))
                
        doc.save(output_path)
        doc.close()
    except Exception as e:
        raise RuntimeError(f"PDF Edit failed: {str(e)}")
