from __future__ import annotations

import json
import re
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path


ROOT = Path(__file__).resolve().parent
ARTICLES = ROOT / "articles"
OUT = ROOT / "assets" / "article-images"
SITE = "https://joynguyenwrites.com"
API = "https://commons.wikimedia.org/w/api.php"
UA = "JoyNguyenTravelSiteBuilder/1.0 (local development; Wikimedia Commons image selection)"

OUT.mkdir(parents=True, exist_ok=True)

PERU_CATEGORIES = [
    "Category:Quality images of Peru",
    "Category:Featured pictures of Peru",
    "Category:Machu Picchu",
    "Category:Cusco",
    "Category:Arequipa",
    "Category:Colca Canyon",
    "Category:Lake Titicaca",
    "Category:Huacachina",
    "Category:Paracas National Reserve",
    "Category:Nazca Lines",
    "Category:Lima",
    "Category:Streets in Lima",
    "Category:Transport in Lima",
    "Category:Buses in Peru",
    "Category:Roads in Peru",
    "Category:Tourism in Peru",
    "Category:Trujillo, Peru",
    "Category:Chiclayo",
    "Category:Iquitos",
]

VIETNAM_CATEGORIES = [
    "Category:Featured pictures of Vietnam",
    "Category:Quality images of Vietnam",
    "Category:Valued images of Vietnam",
    "Category:Hanoi",
    "Category:Ho Chi Minh City",
    "Category:Da Nang",
    "Category:Hội An",
    "Category:Huế",
    "Category:Hạ Long Bay",
    "Category:Mekong Delta",
    "Category:Sa Pa",
    "Category:Phong Nha-Kẻ Bàng National Park",
    "Category:Cát Tiên National Park",
    "Category:Côn Đảo",
    "Category:Đà Lạt",
    "Category:Tourism in Vietnam",
    "Category:Road transport in Vietnam",
    "Category:Streets in Vietnam",
]

VIETNAM_HINTS = {
    "vietnam", "hanoi", "ha-long", "hoi-an", "mekong", "da-nang", "danang", "dalat", "da-lat",
    "phong-nha", "quy-nhon", "ca-mau", "lac-village", "hue", "sam-son", "ben-tre",
    "con-dao", "cat-tien", "xuan-thuy", "tua-chua", "thanh-ha", "sapa", "sa-pa",
    "tra-vinh", "binh-thuan", "nha-trang", "cao-bang", "nhon-ly",
}


def request_json(params: dict[str, str]) -> dict:
    url = API + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as response:
        return json.loads(response.read().decode("utf-8"))


def fetch_category(category: str, limit: int = 80) -> list[dict]:
    files: list[dict] = []
    cont: dict[str, str] = {}
    while len(files) < limit:
        params = {
            "action": "query",
            "format": "json",
            "generator": "categorymembers",
            "gcmtitle": category,
            "gcmtype": "file",
            "gcmlimit": "50",
            "prop": "imageinfo",
            "iiprop": "url|mime|extmetadata",
            "iiurlwidth": "1200",
            **cont,
        }
        data = request_json(params)
        pages = data.get("query", {}).get("pages", {})
        for page in pages.values():
            info = (page.get("imageinfo") or [{}])[0]
            mime = info.get("mime", "")
            thumb = info.get("thumburl") or info.get("url")
            title = page.get("title", "")
            if not thumb or not mime.startswith("image/"):
                continue
            if thumb.lower().endswith((".svg", ".svg.png")):
                continue
            files.append({
                "title": title,
                "thumburl": thumb,
                "page": "https://commons.wikimedia.org/wiki/" + urllib.parse.quote(title.replace(" ", "_"), safe="/:_"),
                "artist": info.get("extmetadata", {}).get("Artist", {}).get("value", ""),
                "license": info.get("extmetadata", {}).get("LicenseShortName", {}).get("value", ""),
            })
        cont = data.get("continue", {})
        if not cont:
            break
    return files[:limit]


def collect(categories: list[str], needed: int) -> list[dict]:
    seen: set[str] = set()
    out: list[dict] = []
    for category in categories:
        try:
            for item in fetch_category(category):
                if item["title"] in seen:
                    continue
                seen.add(item["title"])
                item["category"] = category
                out.append(item)
                if len(out) >= needed:
                    return out
        except Exception as exc:
            print(f"Warning: skipped {category}: {exc}")
        time.sleep(0.1)
    return out


def title_from_html(text: str, slug: str) -> str:
    match = re.search(r"<h1>([\s\S]*?)</h1>", text)
    if match:
        clean = re.sub(r"<[^>]+>", " ", match.group(1))
        return re.sub(r"\s+", " ", clean).strip()
    return slug.replace("-", " ").title()


def is_vietnam(slug: str, title: str) -> bool:
    haystack = f"{slug} {title}".lower()
    return any(hint in haystack for hint in VIETNAM_HINTS)


def download(url: str, target: Path) -> None:
    if target.exists() and target.stat().st_size > 10_000:
        return
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    last_error: Exception | None = None
    for attempt in range(6):
        try:
            with urllib.request.urlopen(req, timeout=45) as response:
                content_type = response.headers.get("Content-Type", "")
                data = response.read()
            break
        except urllib.error.HTTPError as exc:
            last_error = exc
            if exc.code == 429:
                time.sleep(8 + attempt * 8)
                continue
            raise
        except Exception as exc:
            last_error = exc
            time.sleep(2 + attempt * 2)
    else:
        raise RuntimeError(f"Could not download {url}: {last_error}")
    if not content_type.startswith("image/") or len(data) < 10_000:
        raise RuntimeError(f"Bad image response for {url}")
    target.write_bytes(data)
    time.sleep(0.35)


def replace_first_image(text: str, src: str, alt: str) -> str:
    return re.sub(
        r'(<img[\s\S]*?src=")[^"]+("[\s\S]*?alt=")[^"]+(")',
        rf'\1{src}\2{alt}\3',
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
    return pattern.sub(rf'\1{src}\2{alt}\3', text)


article_files = sorted(ARTICLES.glob("*.html"))
titles = {file.name: title_from_html(file.read_text(), file.stem) for file in article_files}
peru_files = [file for file in article_files if not is_vietnam(file.stem, titles[file.name])]
vietnam_files = [file for file in article_files if is_vietnam(file.stem, titles[file.name])]

peru_images = collect(PERU_CATEGORIES, len(peru_files) + 2)
vietnam_images = collect(VIETNAM_CATEGORIES, len(vietnam_files) + 2)

if len(peru_images) < len(peru_files):
    raise SystemExit(f"Not enough Peru images: {len(peru_images)} for {len(peru_files)} articles")
if len(vietnam_images) < len(vietnam_files):
    raise SystemExit(f"Not enough Vietnam images: {len(vietnam_images)} for {len(vietnam_files)} articles")

assignments: dict[str, dict] = {}

for group, images in [(peru_files, peru_images), (vietnam_files, vietnam_images)]:
    for file, image in zip(group, images):
        slug = file.stem
        image_name = f"{slug}.jpg"
        target = OUT / image_name
        download(image["thumburl"], target)
        title = titles[file.name]
        alt = f"{title} travel photo from Wikimedia Commons"
        article_src = f"../assets/article-images/{image_name}"
        card_src = f"assets/article-images/{image_name}"
        absolute_src = f"{SITE}/assets/article-images/{image_name}"
        text = file.read_text()
        text = replace_schema_image(replace_first_image(text, article_src, alt), absolute_src)
        file.write_text(text)
        assignments[file.name] = {
            **image,
            "local": card_src,
            "article": article_src,
            "absolute": absolute_src,
            "alt": alt,
        }

for page_name in ["index.html", "vietnam-research-library.html", "peru-bus-tour-research-library.html"]:
    page = ROOT / page_name
    text = page.read_text()
    for article_file, image in assignments.items():
        text = replace_card_image(text, article_file, image["local"], image["alt"])
    page.write_text(text)

if peru_images:
    download(peru_images[-1]["thumburl"], OUT / "peru-bus-tour-library-cover.jpg")
if vietnam_images:
    download(vietnam_images[-1]["thumburl"], OUT / "vietnam-research-library-cover.jpg")

for page_name, src, alt in [
    ("peru-bus-tour-research-library.html", "assets/article-images/peru-bus-tour-library-cover.jpg", "Peru bus and tour research library Wikimedia Commons travel photo"),
    ("vietnam-research-library.html", "assets/article-images/vietnam-research-library-cover.jpg", "Vietnam research library Wikimedia Commons travel photo"),
]:
    page = ROOT / page_name
    text = page.read_text()
    text = re.sub(
        r'(<section class="article-hero">[\s\S]*?<img[\s\S]*?src=")[^"]+("[\s\S]*?alt=")[^"]+(")',
        rf'\1{src}\2{alt}\3',
        text,
        count=1,
    )
    page.write_text(text)

(OUT / "wikimedia-credits.json").write_text(json.dumps(assignments, indent=2, ensure_ascii=False))
print(f"Assigned {len(assignments)} Wikimedia Commons photos: {len(peru_files)} Peru, {len(vietnam_files)} Vietnam.")
