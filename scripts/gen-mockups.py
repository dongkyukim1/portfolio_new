#!/usr/bin/env python3
"""Generate consistent, procedural product mockups (SVG) for every project card.

One visual language for all cards: near-black scene, one accent per project, glass device
frames (browser / phone / desktop window) with skeleton UI. Run: python3 scripts/gen-mockups.py
"""
import os, random

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "mockups")
os.makedirs(OUT, exist_ok=True)

W, H = 1200, 900
INK = "#eef0f6"
G1, G2, G3 = "rgba(255,255,255,0.10)", "rgba(255,255,255,0.06)", "rgba(255,255,255,0.035)"

PROJECTS = [
    # id, accent, kind, label
    ("ilro", "#2997ff", "web", "ilro · LMS"),
    ("scp", "#30d158", "both", "Science Circuit"),
    ("challengers", "#bf5af2", "mobile", "challengers"),
    ("rundem", "#ff375f", "both", "런덤메이트"),
    # vibeshield.svg is hand-authored from real app screenshots — not generated
    ("mission-control", "#64d2ff", "web", "mission-control"),
    ("megastudy", "#ffd60a", "both", "megastudy"),
    ("portfolio-2026", "#5e5ce6", "web", "portfolio_2026"),
    ("consulting-automation", "#30d158", "desktop", "consulting-automation"),
    ("gildongmu", "#2997ff", "web", "길동무 MVP"),
    ("tmt", "#bf5af2", "web", "TMT Album Board"),
    ("littlebank", "#ff9f0a", "mobile", "LittleBank"),
]


def rect(x, y, w, h, fill, r=6, extra=""):
    return f'<rect x="{x:.0f}" y="{y:.0f}" width="{w:.0f}" height="{h:.0f}" rx="{r}" fill="{fill}" {extra}/>'


def lines(rng, x, y, w, n, gap=18, h=8):
    out = []
    for i in range(n):
        ww = w * rng.uniform(0.45, 1.0) if i else w * 0.9
        out.append(rect(x, y + i * gap, ww, h, G1, 4))
    return "".join(out)


def browser(rng, accent, x, y, w, h, dense=True):
    s = [rect(x, y, w, h, "#12141c", 18, 'stroke="rgba(255,255,255,0.12)"')]
    # top bar
    s.append(rect(x, y, w, 44, "rgba(255,255,255,0.04)", 18))
    s.append(rect(x, y + 26, w, 18, "rgba(255,255,255,0.04)", 0))
    for i, c in enumerate(["#ff5f57", "#febc2e", "#28c840"]):
        s.append(f'<circle cx="{x+22+i*18}" cy="{y+22}" r="5" fill="{c}" opacity="0.9"/>')
    s.append(rect(x + w * 0.3, y + 13, w * 0.4, 18, G2, 9))
    # sidebar
    sx, sy = x + 18, y + 64
    s.append(rect(sx, sy, 160, h - 82, G3, 12))
    for i in range(7):
        fill = accent if i == 1 else G1
        s.append(rect(sx + 14, sy + 16 + i * 34, 120 if i != 1 else 132, 12, fill, 6, 'opacity="0.9"' if i == 1 else ""))
    # header
    cx, cy, cw = sx + 184, sy, w - 220
    s.append(rect(cx, cy, cw * 0.42, 20, INK, 6, 'opacity="0.85"'))
    s.append(rect(cx + cw - 120, cy - 2, 120, 30, accent, 15))
    # KPI tiles
    ty = cy + 44
    tw = (cw - 3 * 14) / 4
    for i in range(4):
        s.append(rect(cx + i * (tw + 14), ty, tw, 84, G2, 14))
        s.append(rect(cx + i * (tw + 14) + 14, ty + 16, tw * 0.5, 10, G1, 5))
        s.append(rect(cx + i * (tw + 14) + 14, ty + 40, tw * 0.62, 22, INK, 6, 'opacity="0.8"'))
    # chart
    chy = ty + 108
    s.append(rect(cx, chy, cw * 0.62, 190, G2, 14))
    bars = 14
    bw = (cw * 0.62 - 40) / bars
    for i in range(bars):
        bh = rng.uniform(30, 150)
        s.append(rect(cx + 20 + i * bw, chy + 170 - bh, bw * 0.62, bh, accent, 4, f'opacity="{rng.uniform(0.35,1):.2f}"'))
    # side list
    lx = cx + cw * 0.62 + 16
    s.append(rect(lx, chy, cw * 0.38 - 16, 190, G2, 14))
    for i in range(5):
        s.append(rect(lx + 14, chy + 18 + i * 34, 18, 18, accent, 9, f'opacity="{0.9 - i*0.15:.2f}"'))
        s.append(rect(lx + 42, chy + 22 + i * 34, (cw * 0.38 - 90) * rng.uniform(0.5, 0.95), 10, G1, 5))
    # table rows
    if dense:
        ry = chy + 214
        for i in range(4):
            if ry + i * 38 + 28 > y + h - 16:
                break
            s.append(rect(cx, ry + i * 38, cw, 28, G3, 8))
            s.append(rect(cx + 14, ry + i * 38 + 9, cw * 0.22, 10, G1, 5))
            s.append(rect(cx + cw * 0.3, ry + i * 38 + 9, cw * 0.3 * rng.uniform(0.5, 1), 10, G1, 5))
            s.append(rect(cx + cw - 90, ry + i * 38 + 7, 70, 14, accent, 7, 'opacity="0.35"'))
    return "".join(s)


def phone(rng, accent, x, y, w=300, h=620, tint=1.0):
    s = [rect(x, y, w, h, "#0f1117", 44, 'stroke="rgba(255,255,255,0.16)" stroke-width="2"')]
    s.append(rect(x + 8, y + 8, w - 16, h - 16, "#13151d", 38))
    s.append(rect(x + w / 2 - 50, y + 20, 100, 28, "#05060a", 14))  # island
    # status
    s.append(rect(x + 28, y + 26, 34, 10, INK, 5, 'opacity="0.8"'))
    # app bar
    s.append(rect(x + 24, y + 74, w * 0.5, 18, INK, 6, 'opacity="0.9"'))
    s.append(f'<circle cx="{x+w-44}" cy="{y+83}" r="14" fill="{accent}" opacity="0.9"/>')
    # hero card
    s.append(rect(x + 24, y + 112, w - 48, 120, accent, 20, f'opacity="{0.85*tint:.2f}"'))
    s.append(rect(x + 44, y + 132, (w - 88) * 0.55, 12, "#ffffff", 6, 'opacity="0.9"'))
    s.append(rect(x + 44, y + 156, (w - 88) * 0.8, 10, "#ffffff", 5, 'opacity="0.6"'))
    s.append(rect(x + 44, y + 196, 90, 22, "#ffffff", 11, 'opacity="0.9"'))
    # list
    for i in range(5):
        yy = y + 256 + i * 62
        s.append(rect(x + 24, yy, w - 48, 50, G2, 14))
        s.append(rect(x + 38, yy + 12, 26, 26, accent, 13, f'opacity="{0.9 - i*0.12:.2f}"'))
        s.append(rect(x + 76, yy + 14, (w - 130) * rng.uniform(0.5, 0.9), 9, G1, 4))
        s.append(rect(x + 76, yy + 30, (w - 130) * rng.uniform(0.3, 0.6), 7, G2, 4))
    # tab bar
    s.append(rect(x + 8, y + h - 74, w - 16, 66, "rgba(255,255,255,0.05)", 0))
    for i in range(4):
        tx = x + 40 + i * (w - 80) / 3
        s.append(f'<circle cx="{tx}" cy="{y+h-44}" r="9" fill="{accent if i==0 else G1}"/>')
    s.append(rect(x + w / 2 - 50, y + h - 18, 100, 5, INK, 3, 'opacity="0.8"'))
    return "".join(s)


def desktop(rng, accent, x, y, w, h):
    s = [rect(x, y, w, h, "#12141c", 16, 'stroke="rgba(255,255,255,0.12)"')]
    s.append(rect(x, y, w, 36, "rgba(255,255,255,0.05)", 16))
    s.append(rect(x, y + 20, w, 16, "rgba(255,255,255,0.05)", 0))
    for i, c in enumerate(["#ff5f57", "#febc2e", "#28c840"]):
        s.append(f'<circle cx="{x+20+i*18}" cy="{y+18}" r="5" fill="{c}" opacity="0.9"/>')
    s.append(rect(x + w / 2 - 80, y + 11, 160, 14, G1, 7))
    # sidebar
    s.append(rect(x, y + 36, 190, h - 36, "rgba(255,255,255,0.03)", 0))
    for i in range(8):
        s.append(rect(x + 22, y + 66 + i * 36, 130 if i != 2 else 146, 12, accent if i == 2 else G1, 6))
    # KPIs
    cx, cy, cw = x + 216, y + 64, w - 240
    s.append(rect(cx, cy, cw * 0.35, 22, INK, 6, 'opacity="0.85"'))
    tw = (cw - 2 * 16) / 3
    for i in range(3):
        s.append(rect(cx + i * (tw + 16), cy + 46, tw, 96, G2, 14))
        s.append(rect(cx + i * (tw + 16) + 16, cy + 62, tw * 0.45, 10, G1, 5))
        s.append(rect(cx + i * (tw + 16) + 16, cy + 90, tw * 0.55, 26, [accent, INK, INK][i], 6, 'opacity="0.85"'))
    # severity bars
    by = cy + 170
    s.append(rect(cx, by, cw, h - (by - y) - 24, G2, 14))
    for i in range(6):
        yy = by + 22 + i * 30
        s.append(rect(cx + 18, yy, 90, 10, G1, 5))
        s.append(rect(cx + 124, yy - 2, (cw - 160) * rng.uniform(0.15, 0.95), 14, accent, 7, f'opacity="{0.95 - i*0.13:.2f}"'))
    return "".join(s)


def scene(pid, accent, kind, label):
    rng = random.Random(pid)
    s = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">']
    s.append(f'''<defs>
  <filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="90"/></filter>
  <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b0d16" stop-opacity="0"/><stop offset="1" stop-color="#0b0d16"/></linearGradient>
</defs>''')
    s.append(rect(0, 0, W, H, "#0b0d16", 0))
    s.append(f'<circle cx="{W*0.28}" cy="{H*0.3}" r="260" fill="{accent}" opacity="0.32" filter="url(#blur)"/>')
    s.append(f'<circle cx="{W*0.8}" cy="{H*0.75}" r="220" fill="{accent}" opacity="0.18" filter="url(#blur)"/>')
    # subtle grid
    s.append('<g stroke="rgba(255,255,255,0.035)" stroke-width="1">' + "".join(f'<line x1="{i*80}" y1="0" x2="{i*80}" y2="{H}"/>' for i in range(1, 15)) + "".join(f'<line x1="0" y1="{i*80}" x2="{W}" y2="{i*80}"/>' for i in range(1, 12)) + "</g>")
    if kind == "web":
        s.append(browser(rng, accent, 110, 150, 980, 720))
    elif kind == "mobile":
        s.append(phone(rng, accent, 380, 150, tint=0.6))
        s.append(phone(rng, accent, 520, 210))
    elif kind == "both":
        s.append(browser(rng, accent, 80, 160, 860, 660, dense=False))
        s.append(phone(rng, accent, 840, 230))
    elif kind == "desktop":
        s.append(desktop(rng, accent, 110, 150, 980, 720))
    s.append(rect(0, H - 220, W, 220, "url(#fade)", 0))
    s.append(f'<text x="48" y="72" font-family="ui-monospace, SF Mono, Menlo, monospace" font-size="20" letter-spacing="4" fill="rgba(255,255,255,0.55)">{label.upper()}</text>')
    s.append(f'<rect x="48" y="88" width="56" height="4" rx="2" fill="{accent}"/>')
    s.append("</svg>")
    return "".join(s)


for pid, accent, kind, label in PROJECTS:
    with open(os.path.join(OUT, f"{pid}.svg"), "w") as f:
        f.write(scene(pid, accent, kind, label))
    print("wrote", pid)
