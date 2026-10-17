"""Turns the two Gemini sprite sheets into transparent WebP files the website can use.

Usage (from the optimum-docs-site folder):
    python scripts/process-mascot.py characters/op            # background colour #FF00FF (magenta, the default)
    python scripts/process-mascot.py characters/op 00FF00     # if the sheets were drawn on green instead

Reads  <folder>/directions.png and <folder>/reactions.png (3x3 grids, square, at least 1024x1024),
writes public/mascots/op-directions.webp and public/mascots/op-reactions.webp,
and warns when a drawing touches the edge of its cell (a sign the sheet should be drawn again).
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image

OUT_SIZE = 768  # each sheet is saved at 768x768, so one cell is 256x256
EDGE = 0.02  # a drawing closer than 2% of a cell to the cell edge counts as touching it


def key_out(img: Image.Image, key: tuple[int, int, int]) -> Image.Image:
    """Makes the background colour transparent. Edge pixels keep only their own colour (no pink or green halo)."""
    rgb = np.asarray(img.convert("RGB"), dtype=np.float32)
    dist = np.sqrt(((rgb - np.array(key, dtype=np.float32)) ** 2).sum(axis=2))
    alpha = np.clip((dist - 60.0) / (150.0 - 60.0), 0.0, 1.0)  # fully background below 60, fully character above 150
    a3 = alpha[..., None]
    # Remove the background colour mixed into semi-transparent edge pixels.
    unmixed = np.where(a3 > 0.02, (rgb - (1.0 - a3) * np.array(key, dtype=np.float32)) / np.maximum(a3, 0.02), rgb)
    out = np.dstack([np.clip(unmixed, 0, 255), alpha * 255.0]).astype(np.uint8)
    return Image.fromarray(out, "RGBA")


def check_cells(img: Image.Image, name: str) -> list[str]:
    """Each of the 9 cells must hold something and must not touch its own edge."""
    problems = []
    a = np.asarray(img)[..., 3]
    h, w = a.shape
    ch, cw = h // 3, w // 3
    for n in range(9):
        r, c = divmod(n, 3)
        cell = a[r * ch:(r + 1) * ch, c * cw:(c + 1) * cw] > 24
        if not cell.any():
            problems.append(f"{name} cell {n + 1}: empty")
            continue
        ys, xs = np.where(cell)
        m = EDGE
        if xs.min() < cw * m or xs.max() > cw * (1 - m) or ys.min() < ch * m or ys.max() > ch * (1 - m):
            problems.append(f"{name} cell {n + 1}: the drawing touches the cell edge")
    return problems


def main() -> int:
    if len(sys.argv) < 2:
        print(__doc__)
        return 2
    folder = Path(sys.argv[1])
    hexkey = (sys.argv[2] if len(sys.argv) > 2 else "FF00FF").lstrip("#")
    key = tuple(int(hexkey[i:i + 2], 16) for i in (0, 2, 4))
    out_dir = Path("public/mascots")
    out_dir.mkdir(parents=True, exist_ok=True)
    problems = []
    for sheet in ("directions", "reactions"):
        src = folder / f"{sheet}.png"
        if not src.exists():
            print(f"missing file: {src}")
            return 1
        img = Image.open(src)
        if img.width != img.height or img.width < 1024:
            problems.append(f"{sheet}: image is {img.width}x{img.height}, it should be square and at least 1024x1024")
        keyed = key_out(img.resize((OUT_SIZE, OUT_SIZE), Image.LANCZOS), key)
        problems += check_cells(keyed, sheet)
        keyed.save(out_dir / f"op-{sheet}.webp", "WEBP", quality=92, method=6, lossless=False, exact=True)
        print(f"wrote {out_dir / f'op-{sheet}.webp'}")
    if problems:
        print("\nProblems (draw BOTH sheets again in a new Gemini chat):")
        for p in problems:
            print(" -", p)
        return 1
    print("\nready: both sheets are clean")
    return 0


if __name__ == "__main__":
    sys.exit(main())
