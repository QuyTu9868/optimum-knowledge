import re
"""Tiny SVG helper for the technology diagrams: same palette everywhere, and text must fit its box."""
BG, PANEL, PANEL2 = "#282C35", "#30353F", "#3A3F4A"
LINE, DIM, WHITE, TEXT, MUTED = "#969698", "#5B616D", "#F2F2F3", "#D9DADC", "#B4B6BC"
CODED, WARN, BLUE, GREEN, RED = "#A6B0FF", "#E3C27A", "#93C3EA", "#9FD3A6", "#E5A3A3"
FONT = "Helvetica Neue, Arial, sans-serif"
LANG, TR, MISSING = "en", {}, set()  # LANG = "vi" swaps every drawn string through TR (English string -> Vietnamese)


def set_lang(lang, tr=None):
    global LANG, TR
    LANG, TR = lang, tr or {}


def esc(t):
    return t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def width(t, size, weight=400):
    return len(t) * size * (0.60 if weight >= 600 else 0.56)


class SVG:
    def __init__(self, w, h, name):
        self.w, self.h, self.p, self.warn = w, h, [], []
        self.name = name + ("-vi" if LANG == "vi" else "")

    # --- primitives
    def rect(self, x, y, w, h, fill=PANEL, stroke=LINE, sw=1.3, rx=10, dash=None, op=None):
        d = f' stroke-dasharray="{dash}"' if dash else ""
        o = f' fill-opacity="{op}"' if op is not None else ""
        self.p.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}"{o} stroke="{stroke}" stroke-width="{sw}"{d}/>')

    def text(self, x, y, t, size=14, fill=WHITE, weight=400, anchor="middle", spacing=None, maxw=None):
        if LANG == "vi":
            if t in TR:
                t = TR[t]
            elif re.search(r"[A-Za-z]{3,}", t):
                MISSING.add(t)
        if maxw and width(t, size, weight) > maxw:
            self.warn.append(f'{self.name}: "{t}" is about {int(width(t, size, weight))}px, box allows {int(maxw)}px')
        sp = f' letter-spacing="{spacing}"' if spacing else ""
        self.p.append(f'<text x="{x}" y="{y}" fill="{fill}" font-size="{size}" font-weight="{weight}" text-anchor="{anchor}"{sp}>{esc(t)}</text>')

    def lines(self, x, y, items, size=14, fill=WHITE, weight=400, lh=None, anchor="middle", maxw=None):
        lh = lh or round(size * 1.35)
        for i, t in enumerate(items):
            self.text(x, y + i * lh, t, size, fill, weight, anchor, maxw=maxw)

    def line(self, x1, y1, x2, y2, color=LINE, w=1.5, dash=None):
        d = f' stroke-dasharray="{dash}"' if dash else ""
        self.p.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" stroke-width="{w}"{d}/>')

    def circle(self, x, y, r, fill=PANEL2, stroke=LINE, sw=1.5):
        self.p.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>')

    def arrow(self, x1, y1, x2, y2, color=LINE, w=1.6, dash=None, both=False):
        m = {LINE: "a", WARN: "aw", CODED: "al", BLUE: "ab"}.get(color, "a")
        d = f' stroke-dasharray="{dash}"' if dash else ""
        s = f' marker-start="url(#{m})"' if both else ""
        self.p.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" stroke-width="{w}"{d} marker-end="url(#{m})"{s}/>')

    def curve(self, d, color=LINE, w=1.6, dash=None):
        m = {LINE: "a", WARN: "aw", CODED: "al", BLUE: "ab"}.get(color, "a")
        dd = f' stroke-dasharray="{dash}"' if dash else ""
        self.p.append(f'<path d="{d}" stroke="{color}" stroke-width="{w}" fill="none"{dd} marker-end="url(#{m})"/>')

    # --- composed pieces
    def box(self, x, y, w, h, title, sub=None, fill=PANEL, stroke=LINE, tsize=15, ssize=12.5, dash=None, tcolor=WHITE, scolor=MUTED):
        self.rect(x, y, w, h, fill, stroke, dash=dash)
        n = 1 + (len(sub) if sub else 0)
        total = tsize + (len(sub) * 17 if sub else 0)
        top = y + (h - total) / 2 + tsize * 0.85
        self.text(x + w / 2, round(top, 1), title, tsize, tcolor, 600, maxw=w - 16)
        for i, t in enumerate(sub or []):
            self.text(x + w / 2, round(top + 8 + (i + 1) * 17, 1), t, ssize, scolor, maxw=w - 16)

    def chip(self, x, y, w, h, t, stroke=CODED, fill=PANEL2, color=WHITE, size=13, dash=None):
        self.rect(x, y, w, h, fill, stroke, 1.5, rx=7, dash=dash)
        self.text(x + w / 2, y + h / 2 + size * 0.36, t, size, color, 600, maxw=w - 8)

    def pill(self, x, y, w, t, color=MUTED, fill="rgba(255,255,255,0.06)", size=12):
        self.rect(x, y, w, 24, fill, "none", 0, rx=12)
        self.text(x + w / 2, y + 16.5, t, size, color, 600, maxw=w - 10)

    def cross(self, x, y, r=9, color=RED):
        self.line(x - r, y - r, x + r, y + r, color, 2.4)
        self.line(x - r, y + r, x + r, y - r, color, 2.4)

    def title(self, x, y, t):
        self.text(x, y, t, 12, MUTED, 600, "start", spacing="1")

    def save(self, folder):
        defs = "".join(
            f'<marker id="{i}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="{c}"/></marker>'
            for i, c in (("a", LINE), ("aw", WARN), ("al", CODED), ("ab", BLUE))
        )
        svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {self.w} {self.h}" font-family="{FONT}"><defs>{defs}</defs><rect width="{self.w}" height="{self.h}" fill="{BG}"/>' + "".join(self.p) + "</svg>"
        open(f"{folder}/{self.name}.svg", "w", encoding="utf8").write(svg)
        for w in self.warn:
            print("WIDTH WARNING:", w)
