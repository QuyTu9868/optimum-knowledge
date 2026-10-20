"""Run: python tools/diagrams/gen_all.py   (from the site folder). Builds every diagram in English and in Vietnamese (-vi.svg), then the Vietnamese timeline."""
import os, sys, re
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import svglib
from vi_strings import TR, TIMELINE

OUT = os.path.join(HERE, "..", "..", "public", "diagrams")
src = open(os.path.join(HERE, "gen_diagrams.py"), encoding="utf8").read()

for lang in ("en", "vi"):
    svglib.set_lang(lang, TR if lang == "vi" else {})
    exec(compile(src, "gen_diagrams.py", "exec"), {"__name__": "gen", "__file__": os.path.join(HERE, "gen_diagrams.py")})

if svglib.MISSING:
    print("UNTRANSLATED:", sorted(svglib.MISSING))

t = open(OUT + "/timeline.svg", encoding="utf8").read()
unused = set(TIMELINE)
for en, vi in TIMELINE.items():
    new = t.replace(">" + en + "<", ">" + vi.replace("&", "&amp;") + "<")
    if new != t:
        unused.discard(en)
    t = new
open(OUT + "/timeline-vi.svg", "w", encoding="utf8").write(t)
print("timeline-vi written; unused entries:", sorted(unused))
