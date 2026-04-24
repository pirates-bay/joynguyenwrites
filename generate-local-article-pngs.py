from __future__ import annotations

import html
import math
import re
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parent
ARTICLES = ROOT / "articles"
OUT = ROOT / "assets" / "article-images"
SITE = "https://joynguyenwrites.com"
WIDTH, HEIGHT = 1600, 1067

OUT.mkdir(parents=True, exist_ok=True)

VIETNAM_HINTS = {
    "vietnam", "hanoi", "ha-long", "hoi-an", "mekong", "da-nang", "danang", "dalat", "da-lat",
    "phong-nha", "quy-nhon", "ca-mau", "lac-village", "hue", "sam-son", "ben-tre",
    "con-dao", "cat-tien", "xuan-thuy", "tua-chua", "thanh-ha", "sapa", "sa-pa",
    "tra-vinh", "binh-thuan", "nha-trang", "cao-bang", "nhon-ly",
}

PALETTES = [
    ((18, 60, 53), (47, 125, 109), (241, 197, 107), (247, 248, 245)),
    ((24, 50, 74), (77, 138, 154), (230, 164, 90), (245, 239, 226)),
    ((37, 59, 45), (122, 155, 100), (217, 164, 65), (246, 242, 232)),
    ((43, 49, 71), (126, 106, 168), (219, 179, 101), (245, 242, 238)),
    ((21, 61, 91), (74, 163, 164), (240, 179, 90), (247, 247, 240)),
    ((64, 47, 40), (182, 107, 61), (242, 196, 109), (248, 244, 233)),
]


def fnv(value: str) -> int:
    h = 2166136261
    for char in value:
        h ^= ord(char)
        h = (h * 16777619) & 0xFFFFFFFF
    return h


def title_from_html(text: str, slug: str) -> str:
    match = re.search(r"<h1>([\s\S]*?)</h1>", text)
    if match:
        clean = re.sub(r"<[^>]+>", " ", match.group(1))
        return re.sub(r"\s+", " ", html.unescape(clean)).strip()
    return slug.replace("-", " ").title()


def is_vietnam(slug: str, title: str) -> bool:
    haystack = f"{slug} {title}".lower()
    return any(hint in haystack for hint in VIETNAM_HINTS)


def topic_for(slug: str, title: str) -> str:
    if is_vietnam(slug, title):
        if re.search(r"ha-long|con-dao|coast|quy-nhon|binh-thuan|nha-trang", slug):
            return "bay"
        if re.search(r"hoi-an|hue|da-nang|danang|central|thanh-ha", slug):
            return "heritage"
        if re.search(r"mekong|ben-tre|tra-vinh|ca-mau", slug):
            return "river"
        if re.search(r"hanoi|city|app|ewom|brand|post-pandemic", slug):
            return "city"
        return "mountains"
    if re.search(r"machu-picchu|cusco|sacred|puno|colca|arequipa", slug):
        return "andes"
    if re.search(r"paracas|huacachina|nazca|ica|coast|beach|playas|tumbes|piura", slug):
        return "desert"
    if re.search(r"lima|terminal|bus|sutran|mtc|transport|route|corridor|pickup", slug):
        return "road"
    return "culture"


def font(size: int, serif: bool = False) -> ImageFont.FreeTypeFont:
    candidates = [
        "/System/Library/Fonts/Supplemental/Georgia.ttf" if serif else "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/System/Library/Fonts/Supplemental/Times New Roman Bold.ttf" if serif else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/Library/Fonts/Arial.ttf",
    ]
    for candidate in candidates:
        if candidate and Path(candidate).exists():
            return ImageFont.truetype(candidate, size=size)
    return ImageFont.load_default()


def blend(a: tuple[int, int, int], b: tuple[int, int, int], t: float) -> tuple[int, int, int]:
    return tuple(round(a[i] * (1 - t) + b[i] * t) for i in range(3))


def gradient(size: tuple[int, int], dark, mid, warm) -> Image.Image:
    img = Image.new("RGB", size)
    px = img.load()
    w, h = size
    for y in range(h):
        for x in range(w):
            t = (x / w * 0.45) + (y / h * 0.55)
            color = blend(dark, mid, min(t * 1.5, 1)) if t < 0.66 else blend(mid, warm, (t - 0.66) / 0.34)
            px[x, y] = color
    return img


def polygon(draw: ImageDraw.ImageDraw, points, fill):
    draw.polygon([(round(x), round(y)) for x, y in points], fill=fill)


def draw_landscape(draw: ImageDraw.ImageDraw, topic: str, dark, mid, warm, paper, seed: int):
    s = seed % 120 - 60
    if topic == "andes":
        polygon(draw, [(0, 940), (285, 585), (465, 800), (705, 460), (970, 940)], mid)
        polygon(draw, [(455, 940), (720, 610), (900, 940)], dark)
        polygon(draw, [(945, 940), (1240, 520), (1600, 940)], mid)
        polygon(draw, [(705, 460), (760, 575), (650, 575)], paper)
    elif topic == "desert":
        draw.ellipse((-160, 650, 760, 1220), fill=warm)
        draw.ellipse((455, 590, 1750, 1245), fill=mid)
        draw.arc((110, 615, 620, 900), 190, 335, fill=paper, width=12)
        draw.arc((790, 650, 1510, 970), 195, 330, fill=paper, width=12)
    elif topic == "road":
        polygon(draw, [(0, 930), (370, 625), (575, 785), (865, 485), (1220, 920), (1600, 600), (1600, 1067), (0, 1067)], mid)
        polygon(draw, [(700, 1067), (850, 505), (1110, 1067)], (26, 34, 40))
        draw.line([(905, 1067), (850, 520)], fill=paper, width=13)
        y = 650
        draw.rounded_rectangle((260 + s, y, 475 + s, y + 86), radius=22, fill=warm)
        draw.rectangle((305 + s, y - 38, 420 + s, y), fill=warm)
        draw.ellipse((310 + s, y + 70, 365 + s, y + 125), fill=dark)
        draw.ellipse((415 + s, y + 70, 470 + s, y + 125), fill=dark)
    elif topic == "bay":
        draw.ellipse((-180, 705, 1720, 1300), fill=mid)
        polygon(draw, [(170, 910), (300, 650), (440, 910)], dark)
        polygon(draw, [(675, 910), (870, 520), (1070, 910)], dark)
        polygon(draw, [(1200, 910), (1335, 650), (1510, 910)], dark)
        draw.arc((90, 805, 1515, 1065), 190, 340, fill=paper, width=14)
    elif topic == "river":
        draw.ellipse((-160, 720, 840, 1240), fill=mid)
        draw.ellipse((430, 630, 1830, 1275), fill=(49, 95, 109))
        draw.line([(165, 835), (395, 805), (690, 835)], fill=paper, width=12)
        polygon(draw, [(870, 760), (1020, 805), (870, 850), (720, 805)], warm)
    elif topic == "heritage":
        draw.ellipse((-120, 760, 1720, 1230), fill=mid)
        draw.rectangle((295, 545, 770, 885), fill=tuple(round(c * 0.9) for c in paper))
        polygon(draw, [(250, 545), (535, 385), (820, 545)], warm)
        draw.rectangle((900, 495, 1280, 890), fill=dark)
        draw.ellipse((430, 625, 515, 710), fill=warm)
        draw.ellipse((1015, 610, 1095, 690), fill=warm)
    elif topic == "city":
        buildings = [(0, 690, 120, 1067), (125, 590, 260, 1067), (280, 735, 420, 1067), (560, 610, 720, 1067), (725, 485, 880, 1067), (900, 700, 1060, 1067), (1210, 620, 1370, 1067), (1380, 735, 1600, 1067)]
        for i, rect in enumerate(buildings):
            draw.rectangle(rect, fill=dark if i % 2 else mid)
        draw.arc((50, 760, 1620, 1115), 190, 340, fill=warm, width=17)
    else:
        polygon(draw, [(0, 940), (225, 625), (425, 820), (690, 435), (950, 940)], mid)
        polygon(draw, [(560, 940), (820, 675), (1045, 940)], dark)
        polygon(draw, [(690, 435), (750, 555), (635, 555)], paper)
        draw.arc((105, 780, 1540, 1090), 190, 335, fill=warm, width=15)


def wrap_title(title: str) -> list[str]:
    words = title.split()
    lines: list[str] = []
    line = ""
    for word in words:
        if len((line + " " + word).strip()) > 27 and line:
            lines.append(line)
            line = word
        else:
            line = (line + " " + word).strip()
    if line:
        lines.append(line)
    return lines[:3]


def make_image(slug: str, title: str, index: int):
    seed = fnv(slug)
    dark, mid, warm, paper = PALETTES[seed % len(PALETTES)]
    img = gradient((WIDTH, HEIGHT), dark, mid, warm).convert("RGBA")
    draw = ImageDraw.Draw(img, "RGBA")
    sun_r = 150 + seed % 80
    sun_x = 1240 + seed % 250
    sun_y = 160 + seed % 180
    draw.ellipse((sun_x - sun_r, sun_y - sun_r, sun_x + sun_r, sun_y + sun_r), fill=(*paper, 145))
    draw.arc((-120, 185, 830, 430), 190, 350, fill=(*paper, 34), width=25)
    draw.arc((250, 275, 1680, 540), 190, 350, fill=(*paper, 28), width=16)
    draw_landscape(draw, topic_for(slug, title), dark, mid, warm, paper, seed)
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (*dark, 62))
    img = Image.alpha_composite(img, overlay)
    noise = Image.effect_noise((WIDTH, HEIGHT), 38).convert("L").filter(ImageFilter.GaussianBlur(0.4))
    img.putalpha(255)
    img = Image.composite(Image.new("RGBA", (WIDTH, HEIGHT), (*paper, 14)), img, noise.point(lambda p: 28 if p > 160 else 0))
    draw = ImageDraw.Draw(img, "RGBA")

    label = "VIETNAM RESEARCH" if is_vietnam(slug, title) else "PERU RESEARCH"
    label_font = font(27)
    draw.rounded_rectangle((92, 82, 545, 145), radius=32, fill=(*paper, 38))
    draw.text((128, 101), label, font=label_font, fill=paper, spacing=4)

    title_font = font(67 if len(title) < 48 else 58, serif=True)
    y = 655
    for line in wrap_title(title):
        draw.text((92, y), line, font=title_font, fill=paper)
        y += 78

    out_path = OUT / f"{slug}.png"
    img.convert("RGB").save(out_path, quality=90, optimize=True)


def replace_first_image(text: str, src: str, alt: str) -> str:
    return re.sub(
        r'(<img[\s\S]*?src=")[^"]+("[\s\S]*?alt=")[^"]+(")',
        rf'\1{src}\2{html.escape(alt, quote=True)}\3',
        text,
        count=1,
    )


def replace_schema_image(text: str, src: str) -> str:
    return re.sub(r'"image":\s*"[^"]+"', f'"image": "{src}"', text, count=1)


def replace_card_image(text: str, article_file: str, src: str, alt: str) -> str:
    escaped = re.escape(article_file)
    pattern = re.compile(
        rf'(<article>(?:(?!</article>)[\s\S])*?<img(?:(?!</article>)[\s\S])*?src=")[^"]+'
        rf'("(?:(?!</article>)[\s\S])*?alt=")[^"]+'
        rf'("(?:(?!</article>)[\s\S])*?<h3><a href="articles/{escaped}")'
    )
    return pattern.sub(rf'\1{src}\2{html.escape(alt, quote=True)}\3', text)


image_map: dict[str, tuple[str, str, str]] = {}

for index, file in enumerate(sorted(ARTICLES.glob("*.html"))):
    slug = file.stem
    text = file.read_text()
    title = title_from_html(text, slug)
    make_image(slug, title, index)
    alt = f"{title} travel article image"
    article_src = f"../assets/article-images/{slug}.png"
    card_src = f"assets/article-images/{slug}.png"
    absolute_src = f"{SITE}/assets/article-images/{slug}.png"
    text = replace_schema_image(replace_first_image(text, article_src, alt), absolute_src)
    file.write_text(text)
    image_map[file.name] = (card_src, article_src, alt)

for page_name in ["index.html", "vietnam-research-library.html", "peru-bus-tour-research-library.html"]:
    page = ROOT / page_name
    if not page.exists():
        continue
    text = page.read_text()
    for article_file, (card_src, _, alt) in image_map.items():
        text = replace_card_image(text, article_file, card_src, alt)
    page.write_text(text)

print(f"Generated and assigned local PNG images for {len(image_map)} article files and visible preview cards.")
