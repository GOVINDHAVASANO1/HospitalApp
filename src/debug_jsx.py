from pathlib import Path
p = Path('HospitalApp.jsx')
lines = p.read_text(encoding='utf-8').splitlines()
for i in range(292, 324):
    print(f'{i+1}: {lines[i]!r}')
