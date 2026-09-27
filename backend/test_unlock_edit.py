import requests
import json

BASE = 'http://localhost:8000'

# First, download the protected PDF
resp = requests.get(BASE + '/api/download/e199aebc-2237-4e1e-b1cf-992b7d84f941')
with open('protected_test.pdf', 'wb') as f:
    f.write(resp.content)

# Test unlock with correct password
with open('protected_test.pdf', 'rb') as f:
    resp = requests.post(BASE + '/api/pdf/unlock',
                        files={'file': ('protected_test.pdf', f, 'application/pdf')},
                        data={'password': 'test123'})
data = resp.json()
status = 'PASS' if data.get('success') else 'FAIL'
print(f"Unlock correct password: {status} - {json.dumps(data)[:200]}")
if data.get('download_url'):
    dl = requests.get(BASE + data['download_url'])
    print(f"  -> Download: {dl.status_code}, size={len(dl.content)} bytes")

# Test unlock with wrong password  
with open('protected_test.pdf', 'rb') as f:
    resp = requests.post(BASE + '/api/pdf/unlock',
                        files={'file': ('protected_test.pdf', f, 'application/pdf')},
                        data={'password': 'wrongpass'})
data = resp.json()
expected_fail = not data.get('success', True)
status = 'PASS' if expected_fail else 'FAIL'
print(f"Unlock wrong password: {status} - {json.dumps(data)[:200]}")

# Test PDF Edit
with open('test.pdf', 'rb') as f:
    ops = json.dumps([
        {"type": "rotate", "page": 0, "angle": 90},
        {"type": "add_text", "page": 1, "x": 100, "y": 200, "text": "Hello Annotation", "size": 14, "color": [1, 0, 0]}
    ])
    resp = requests.post(BASE + '/api/pdf/edit',
                        files={'file': ('test.pdf', f, 'application/pdf')},
                        data={'operations': ops})
data = resp.json()
status = 'PASS' if data.get('success') else 'FAIL'
print(f"PDF Edit: {status} - {json.dumps(data)[:200]}")
if data.get('download_url'):
    dl = requests.get(BASE + data['download_url'])
    print(f"  -> Download: {dl.status_code}, size={len(dl.content)} bytes")
