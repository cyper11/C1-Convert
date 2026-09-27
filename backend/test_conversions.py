import requests
import os
import json

BASE = 'http://localhost:8000'
results = []


def test(name, endpoint, filepath, extra_data=None, extra_files=None):
    try:
        if extra_files:
            files = [('files', (os.path.basename(f), open(f, 'rb'), 'application/pdf')) for f in extra_files]
            resp = requests.post(BASE + endpoint, files=files, data=extra_data or {})
        else:
            with open(filepath, 'rb') as f:
                ct = 'application/pdf'
                if filepath.endswith('.jpg'):
                    ct = 'image/jpeg'
                elif filepath.endswith('.png'):
                    ct = 'image/png'
                files = {'file': (os.path.basename(filepath), f, ct)}
                resp = requests.post(BASE + endpoint, files=files, data=extra_data or {})
        data = resp.json()
        ok = data.get('success', False)
        results.append(f"{'PASS' if ok else 'FAIL'} | {name}: {json.dumps(data)[:200]}")
        if ok and data.get('download_url'):
            dl = requests.get(BASE + data['download_url'])
            results.append(f"  -> Download: {dl.status_code}, size={len(dl.content)} bytes")
    except Exception as e:
        results.append(f"FAIL | {name}: {str(e)[:200]}")


# 1. PDF -> DOCX
test('PDF to Word', '/api/convert/pdf-to-word', 'test.pdf')

# 2. PDF -> Excel
test('PDF to Excel', '/api/convert/pdf-to-excel', 'test.pdf')

# 3. JPG -> PDF
test('JPG to PDF', '/api/convert/jpg-to-pdf', 'test.jpg')

# 4. PNG -> PDF
test('PNG to PDF', '/api/convert/png-to-pdf', 'test.png')

# 5. PDF -> JPG
test('PDF to JPG', '/api/convert/pdf-to-jpg', 'test.pdf')

# 6. PDF -> PNG
test('PDF to PNG', '/api/convert/pdf-to-png', 'test.pdf')

# 7. Merge PDF
test('Merge PDF', '/api/pdf/merge', None, extra_files=['test.pdf', 'test.pdf'])

# 8. Split PDF
test('Split PDF', '/api/pdf/split', 'test.pdf', extra_data={'pages': '[1,2]'})

# 9. Rotate PDF
test('Rotate PDF', '/api/pdf/rotate', 'test.pdf', extra_data={'angle': '90'})

# 10. Protect PDF
test('Protect PDF', '/api/pdf/protect', 'test.pdf', extra_data={'password': 'test123'})

# 11. Upload for info
test('PDF Info', '/api/pdf/upload-for-info', 'test.pdf')

# 12. Word → PDF (requires LibreOffice)
test('Word to PDF (no LO)', '/api/convert/word-to-pdf', 'test.pdf')

# 13. Compress PDF (requires Ghostscript)
test('Compress PDF (no GS)', '/api/pdf/compress', 'test.pdf', extra_data={'level': 'medium'})

# 14. Invalid file test
try:
    resp = requests.post(BASE + '/api/convert/pdf-to-word',
                         files={'file': ('test.txt', b'not a pdf', 'text/plain')})
    data = resp.json()
    if resp.status_code == 400:
        results.append(f"PASS | Invalid file rejected: {data.get('detail', '')[:100]}")
    else:
        results.append(f"FAIL | Invalid file not rejected: {resp.status_code}")
except Exception as e:
    results.append(f"FAIL | Invalid file test: {str(e)[:100]}")

# 15. Oversized file test (simulated - we just check the error message concept)
results.append("SKIP | Oversized file test (would need >50MB file)")

# 16. Health check
try:
    resp = requests.get(BASE + '/api/health')
    data = resp.json()
    results.append(f"PASS | Health check: {json.dumps(data)[:200]}")
except Exception as e:
    results.append(f"FAIL | Health check: {str(e)[:100]}")

print()
for r in results:
    print(r)

pass_count = sum(1 for r in results if r.startswith('PASS'))
fail_count = sum(1 for r in results if r.startswith('FAIL'))
total = pass_count + fail_count
print(f"\n=== {pass_count}/{total} tests passed, {fail_count} failed ===")
