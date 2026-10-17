"""Turns the Gemini sprite sheets into transparent WebP files the website can use.

Usage (from the optimum-docs-site folder):
    python scripts/process-mascot.py characters/op            # background colour #FF00FF (magenta, the default)
    python scripts/process-mascot.py characters/op 00FF00     # if the sheets were drawn on green instead

Reads  <folder>/directions.png and/or <folder>/reactions.png (3x3 grids, square, at least 1024x1024),
writes public/mascots/op-directions.webp and public/mascots/op-reactions.webp,
and <folder>/preview.png (every cell on a dark and a light background, to check by eye).
It erases the thin grid lines Gemini often draws between cells. The bottom of each cell may be cut off
(the website shows the mascot peeking up from the bottom edge of the window), but nothing may touch the other three edges.
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image

OUT_SIZE = 768  # each sheet is saved at 768x768, so one cell is 256x256
EDGE = 0.02  # a drawing closer than 2% of a cell to the left, right or top edge counts as touching it
GRID_BAND = 7  # pixels erased on each side of every cell border (at 1024 px) to remove drawn grid lines


def erase_grid(img: Image.Image, key: tuple[int, int, int]) -> Image.Image:
    """Paints the background colour over the thin lines at the cell borders and over the outer 3 px frame."""
    a = np.array(img.convert("RGB"))
    h, w, _ = a.shape
    for k in (1, 2):
        for band in (slice(round(h * k / 3) - GRID_BAND, round(h * k / 3) + GRID_BAND),):
            a[band, :, :] = key
        a[:, round(w * k / 3) - GRID_BAND:round(w * k / 3) + GRID_BAND, :] = key
    a[:3, :, :] = key
    a[:, :3, :] = key
    a[:, -3:, :] = key
    a[-3:, :, :] = key
    return Image.fromarray(a, "RGB")


def key_out(img: Image.Image, key: tuple[int, int, int]) -> Image.Image:
    """Makes the background colour transparent, without a pink halo around the drawing.

    For a magenta background a pixel's "magenta amount" is min(red, blue) - green: 255 on the background, about 0 on white,
    black, lavender and neon green. An edge pixel that is a mix of the background and a dark outline therefore gets exactly
    the right transparency, and its colour is un-mixed back to the outline colour."""
    rgb = np.asarray(img.convert("RGB"), dtype=np.float32)
    k = np.array(key, dtype=np.float32)
    if key == (255, 0, 255):
        amount = np.minimum(rgb[..., 0], rgb[..., 2]) - rgb[..., 1]
        t = np.clip((amount - 20.0) / (255.0 - 20.0), 0.0, 1.0)  # share of the background colour in this pixel
    else:  # any other background colour: plain colour distance (can leave a faint halo)
        dist = np.sqrt(((rgb - k) ** 2).sum(axis=2))
        t = 1.0 - np.clip((dist - 60.0) / (150.0 - 60.0), 0.0, 1.0)
    alpha = 1.0 - t
    a3 = alpha[..., None]
    unmixed = np.where(a3 > 0.04, (rgb - (1.0 - a3) * k) / np.maximum(a3, 0.04), rgb)  # remove background mixed into edges
    alpha = np.where(alpha < 0.04, 0.0, alpha)  # tiny leftovers become fully transparent
    out = np.dstack([np.clip(unmixed, 0, 255), alpha * 255.0]).astype(np.uint8)
    return Image.fromarray(out, "RGBA")


def check_cells(img: Image.Image, name: str) -> list[str]:
    """Each of the 9 cells must hold something and must not touch its left, right or top edge (the bottom may be cut)."""
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
        if xs.min() < cw * EDGE or xs.max() > cw * (1 - EDGE) or ys.min() < ch * EDGE:
            problems.append(f"{name} cell {n + 1}: the drawing touches the left, right or top edge of its cell")
    return problems


def preview(sheets: dict[str, Image.Image], path: Path) -> None:
    """All cells of every sheet, on dark and light backgrounds side by side."""
    tiles = []
    for im in sheets.values():
        for bg in ((20, 22, 29), (235, 235, 240)):
            canvas = Image.new("RGB", im.size, bg)
            canvas.paste(im, (0, 0), im)
            tiles.append(canvas)
    w = sum(t.width for t in tiles[:2])
    out = Image.new("RGB", (w, sum(t.height for t in tiles[::2])), (0, 0, 0))
    y = 0
    for i in range(0, len(tiles), 2):
        out.paste(tiles[i], (0, y))
        out.paste(tiles[i + 1], (tiles[i].width, y))
        y += tiles[i].height
    out.save(path)


def main() -> int:
    if len(sys.argv) < 2:
        print(__doc__)
        return 2
    folder = Path(sys.argv[1])
    hexkey = (sys.argv[2] if len(sys.argv) > 2 else "FF00FF").lstrip("#")
    key = tuple(int(hexkey[i:i + 2], 16) for i in (0, 2, 4))
    out_dir = Path("public/mascots")
    out_dir.mkdir(parents=True, exist_ok=True)
    problems, done = [], {}
    for sheet in ("directions", "reactions"):
        src = folder / f"{sheet}.png"
        if not src.exists():
            print(f"(no {src}, skipped)")
            continue
        img = Image.open(src)
        if img.width != img.height or img.width < 1024:
            problems.append(f"{sheet}: image is {img.width}x{img.height}, it should be square and at least 1024x1024")
        keyed = key_out(erase_grid(img.resize((1024, 1024), Image.LANCZOS), key).resize((OUT_SIZE, OUT_SIZE), Image.LANCZOS), key)
        problems += check_cells(keyed, sheet)
        keyed.save(out_dir / f"op-{sheet}.webp", "WEBP", quality=92, method=6, lossless=False, exact=True)
        done[sheet] = keyed
        print(f"wrote {out_dir / f'op-{sheet}.webp'}")
    if done:
        preview(done, folder / "preview.png")
        print(f"wrote {folder / 'preview.png'} (look at it to check edges and halos)")
    if problems:
        print("\nProblems:")
        for p in problems:
            print(" -", p)
        return 1
    print("\nready" if len(done) == 2 else "\nthis sheet is clean (the other one is still missing)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
