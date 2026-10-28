import re
from pathlib import Path

html = Path(__file__).with_name("linkedin.html").read_text(encoding="utf-8")
for pid in ("post-kort", "post-lang"):
    m = re.search(rf'id="{pid}">(.*?)</div>', html, re.S)
    paras = re.findall(r"<p[^>]*>(.*?)</p>", m.group(1), re.S)
    clean = []
    for p in paras:
        t = re.sub(r"<[^>]+>", "", p)
        t = re.sub(r"\s+", " ", t).strip()
        clean.append(t)
    words = " ".join(t for t in clean if not t.startswith("http")).split()
    print(pid, len(words))
