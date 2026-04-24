from __future__ import annotations

import html
import json
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path


ROOT = Path(__file__).resolve().parent
ARTICLES = ROOT / "articles"
CREDITS = ROOT / "assets" / "article-images" / "wikimedia-credits.json"
API = "https://commons.wikimedia.org/w/api.php"
UA = "JoyNguyenWrites/1.0 (local development; relevant Wikimedia Commons image matching)"

BLACKLIST = {
    "snake", "cobra", "python", "viper", "serpent", "lizard", "macaque", "monkey",
    "fulvetta", "broadbill", "bird", "frog", "toad", "insect", "dragonfly", "libellula",
    "spider", "butterfly", "beetle", "zoo", "flora", "flower", "plant", "botanical",
    "jatropha", "hibiscus", "ixora", "canna", "lantana", "clitoria", "caryota",
    "capsicum", "nelumbo", "mirabilis", "bougainvillea", "gerbera", "echinodorus",
    "war", "vietnamkrieg", "refugee", "nara", "gallica", "congress", "soldier",
    "bank", "bottle", "cocada", "black background", "logo", "flag", "map", "diagram",
    "copernicus", "satellite", "sentinel", "decision", "archives", "archive",
    "journal", "review", "book", "engraving", "illustration", "grand canyon",
    "entrance sign", "bolivia", "ecuador",
}

PERU_TERMS = {
    "peru", "perú", "lima", "cusco", "cuzco", "machu", "arequipa", "colca",
    "puno", "titicaca", "paracas", "huacachina", "ica", "nazca", "nasca",
    "iquitos", "trujillo", "chiclayo", "mancora", "urubamba", "aguas calientes",
    "pisac", "ollantaytambo", "sacred valley",
}

VIETNAM_TERMS = {
    "vietnam", "viet nam", "hanoi", "ha noi", "ha long", "hạ long", "halong",
    "hoi an", "hội an", "hue", "huế", "da nang", "danang", "hai van", "hải vân",
    "dalat", "da lat", "đà lạt", "phong nha", "quy nhon", "quy nhơn", "binh dinh",
    "ca mau", "mekong", "sapa", "sa pa", "mai chau", "mái châu", "lac village",
    "cat tien", "cát tiên", "con dao", "côn đảo", "cao bang", "cao bằng", "ban gioc",
    "bản giốc", "ben tre", "bến tre", "mui ne", "mũi né", "binh thuan", "bình thuận",
    "nha trang", "tra vinh", "trà vinh", "xuan thuy", "xuân thủy", "tua chua",
    "tủa chùa", "ho chi minh", "hồ chí minh", "hcmc",
}

GOOD_WORDS = {
    "travel", "tourism", "city", "street", "road", "bus", "station", "terminal",
    "landscape", "view", "panorama", "bay", "beach", "coast", "island", "river",
    "delta", "mountain", "canyon", "lake", "ruins", "temple", "pagoda", "bridge",
    "market", "village", "cave", "desert", "dunes", "railway", "harbor", "harbour",
    "old town", "historic", "valley", "reserve", "national park",
}

QUERY_RULES = [
    ("ancon", "Ancón Lima Peru coast road"),
    ("lima-callao", "Lima Callao Peru travel"),
    ("lima-paracas", "Paracas Ica Nazca Peru route"),
    ("lima-to-huacachina", "Huacachina Peru dunes"),
    ("lima-to-nazca", "Nazca Lines Peru"),
    ("lima-to-machu", "Cusco Machu Picchu Peru"),
    ("lima", "Lima Peru city travel"),
    ("machu-picchu", "Machu Picchu Peru travel"),
    ("cusco-machu", "Cusco Machu Picchu Peru"),
    ("cusco-puno", "Cusco Puno Peru road"),
    ("cusco", "Cusco Peru travel"),
    ("arequipa-colca", "Colca Canyon Arequipa Peru"),
    ("playas-inkasur", "Arequipa Peru coast beach"),
    ("puno", "Lake Titicaca Puno Peru"),
    ("titicaca", "Lake Titicaca Puno Peru"),
    ("paracas-ballestas", "Paracas Ballestas Islands Peru"),
    ("paracas", "Paracas National Reserve Peru"),
    ("huacachina", "Huacachina Peru dunes"),
    ("ica", "Ica Peru Huacachina"),
    ("nazca", "Nazca Lines Peru"),
    ("iquitos", "Iquitos Amazon Peru"),
    ("moche", "Chan Chan Trujillo Peru"),
    ("trujillo", "Trujillo Peru Chan Chan"),
    ("chiclayo", "Chiclayo Peru travel"),
    ("north-beaches", "Mancora Peru beach"),
    ("sutran", "Peru highway bus travel"),
    ("terminal", "Lima Peru travel terminal"),
    ("operator", "Peru travel agency tour bus"),
    ("holiday-demand", "Cusco Peru tourism crowds"),
    ("rainy-season", "Peru Andes rainy season road"),
    ("altitude-pacing", "Cusco Peru travel"),
    ("tour-booking", "Peru guided tour travel"),
    ("private-tour", "Peru group tour travel"),
    ("first-timer", "Peru travel landscape"),
    ("public-bus", "Peru road Andes"),
    ("safest-routes", "Peru Andes highway"),
    ("speeding-seatbelts", "Peru mountain road"),
    ("travel-scams", "Lima Peru street travel"),
    ("technical-safety", "Peru highway travel"),
    ("passengers-should-not-stand", "Peru road travel"),
    ("authorization-check", "Peru bus station travel"),
    ("informal-transport", "Lima Peru street traffic"),
    ("viaje-seguro", "Peru highway Andes travel"),
    ("bus-travel-scale", "Peru bus travel"),
    ("bus", "Peru bus travel Andes"),
    ("peru", "Peru travel landscape"),
    ("da-lat", "Da Lat Vietnam travel"),
    ("dalat", "Da Lat Vietnam travel"),
    ("da-nang", "Da Nang Vietnam travel"),
    ("danang", "Da Nang Vietnam travel"),
    ("ha-long", "Ha Long Bay Vietnam travel"),
    ("hanoi", "Hanoi Vietnam Old Quarter"),
    ("hoi-an", "Hoi An Vietnam Old Town"),
    ("hue", "Hue Vietnam Imperial City"),
    ("mekong", "Mekong Delta Vietnam travel"),
    ("ben-tre", "Ben Tre Mekong Delta Vietnam"),
    ("ca-mau", "Ca Mau Vietnam travel"),
    ("tra-vinh", "Tra Vinh Vietnam travel"),
    ("phong-nha", "Phong Nha Ke Bang Vietnam cave"),
    ("quy-nhon", "Quy Nhon Vietnam beach"),
    ("nhon-ly", "Nhon Ly Quy Nhon Vietnam"),
    ("con-dao", "Con Dao Vietnam island"),
    ("cat-tien", "Cat Tien National Park Vietnam landscape"),
    ("xuan-thuy", "Xuan Thuy National Park Vietnam"),
    ("tua-chua", "Tua Chua Vietnam karst"),
    ("cao-bang", "Cao Bang Vietnam Ban Gioc"),
    ("lac-village", "Mai Chau Lac Village Vietnam"),
    ("sapa", "Sa Pa Vietnam rice terraces"),
    ("binh-thuan", "Mui Ne Binh Thuan Vietnam"),
    ("ho-chi-minh", "Ho Chi Minh City Vietnam travel"),
    ("south-central", "Nha Trang Vietnam coast"),
    ("vietnam", "Vietnam travel landscape"),
]


def request_json(params: dict[str, str]) -> dict:
    req = urllib.request.Request(
        API + "?" + urllib.parse.urlencode(params),
        headers={"User-Agent": UA},
    )
    with urllib.request.urlopen(req, timeout=30) as response:
        return json.loads(response.read().decode("utf-8"))


def clean_text(value: str) -> str:
    value = re.sub(r"<[^>]+>", " ", value or "")
    return html.unescape(re.sub(r"\s+", " ", value)).strip()


def file_path_src(title: str) -> str:
    name = title.removeprefix("File:").replace(" ", "_")
    return "https://commons.wikimedia.org/wiki/Special:FilePath/" + urllib.parse.quote(name, safe="(),._-") + "?width=1200"


def query_for(slug: str, title: str) -> str:
    haystack = f"{slug} {title}".lower()
    for token, query in QUERY_RULES:
        if token in haystack:
            return query
    return f"{title} travel"


def search_commons(query: str, limit: int = 80) -> list[dict]:
    data = request_json({
        "action": "query",
        "format": "json",
        "generator": "search",
        "gsrsearch": query,
        "gsrnamespace": "6",
        "gsrlimit": str(limit),
        "prop": "imageinfo",
        "iiprop": "url|mime|size|extmetadata",
    })
    pages = list(data.get("query", {}).get("pages", {}).values())
    pages.sort(key=lambda page: page.get("index", 9999))
    out = []
    for page in pages:
        info = (page.get("imageinfo") or [{}])[0]
        title = page.get("title", "")
        meta = info.get("extmetadata", {})
        if not title or info.get("mime") != "image/jpeg":
            continue
        if title.lower().endswith(".svg"):
            continue
        desc = clean_text(meta.get("ImageDescription", {}).get("value", ""))
        out.append({
            "title": title,
            "src": file_path_src(title),
            "page": "https://commons.wikimedia.org/wiki/" + urllib.parse.quote(title.replace(" ", "_"), safe="/:_"),
            "artist": meta.get("Artist", {}).get("value", ""),
            "license": meta.get("LicenseShortName", {}).get("value", ""),
            "width": info.get("width", 0),
            "height": info.get("height", 0),
            "description": desc,
            "query": query,
        })
    return out


def score(candidate: dict, query: str) -> int:
    text = f"{candidate['title']} {candidate.get('description', '')}".lower().replace("_", " ")
    if any(term in text for term in BLACKLIST):
        return -1000
    query_lower = query.lower()
    if "peru" in query_lower and not any(term in text for term in PERU_TERMS):
        return -1000
    if "vietnam" in query_lower and not any(term in text for term in VIETNAM_TERMS):
        return -1000
    if candidate.get("width", 0) < 700 or candidate.get("height", 0) < 400:
        return -120
    score_value = 0
    for term in re.findall(r"[a-zà-ỹáéíóúñç]+", query.lower()):
        if len(term) > 2 and term in text:
            score_value += 12
    for term in GOOD_WORDS:
        if term in text:
            score_value += 6
    if "file:" in text:
        score_value += 1
    return score_value


def title_from_html(text: str, slug: str) -> str:
    match = re.search(r"<h1>([\s\S]*?)</h1>", text)
    if match:
        return clean_text(match.group(1))
    return slug.replace("-", " ").title()


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


def choose_image(slug: str, title: str, used: set[str], cache: dict[str, list[dict]]) -> dict:
    base = query_for(slug, title)
    regional_fallbacks = (
        ["Peru travel landscape", "Cusco Peru travel", "Lima Peru travel", "Arequipa Peru travel", "Paracas Peru travel", "Machu Picchu Peru travel"]
        if "peru" in base.lower()
        else ["Vietnam travel landscape", "Hanoi Vietnam travel", "Hoi An Vietnam travel", "Da Nang Vietnam travel", "Mekong Delta Vietnam travel", "Ha Long Bay Vietnam travel"]
    )
    queries = [base, base.replace(" travel", ""), f"{base} tourism", *regional_fallbacks]
    candidates: list[dict] = []
    for query in dict.fromkeys(queries):
        if query not in cache:
            cache[query] = search_commons(query)
            time.sleep(0.08)
        candidates.extend(cache[query])
    ranked = sorted(candidates, key=lambda item: score(item, base), reverse=True)
    for candidate in ranked:
        if candidate["title"] not in used and score(candidate, base) > -100:
            used.add(candidate["title"])
            return candidate
    raise SystemExit(f"No relevant Wikimedia image found for {slug}: {title} ({base})")


def update_home_social_image(src: str) -> None:
    index = ROOT / "index.html"
    text = index.read_text()
    text = re.sub(r'(<meta property="og:image" content=")[^"]+(")', rf'\1{src}\2', text, count=1)
    text = re.sub(r'(<meta name="twitter:image" content=")[^"]+(")', rf'\1{src}\2', text, count=1)
    text = re.sub(r'("primaryImageOfPage":\s*\{[\s\S]*?"url":\s*")[^"]+(")', rf'\1{src}\2', text, count=1)
    text = text.replace('<link rel="preconnect" href="https://images.unsplash.com" />\n', '')
    index.write_text(text)


article_files = sorted(ARTICLES.glob("*.html"))
titles = {file.name: title_from_html(file.read_text(), file.stem) for file in article_files}
used: set[str] = set()
cache: dict[str, list[dict]] = {}
assignments: dict[str, dict] = {}

for file in article_files:
    title = titles[file.name]
    image = choose_image(file.stem, title, used, cache)
    alt = f"{title} destination photo from Wikimedia Commons"
    text = file.read_text()
    file.write_text(replace_schema_image(replace_first_image(text, image["src"], alt), image["src"]))
    assignments[file.name] = {**image, "alt": alt}

for page_name in ["index.html", "vietnam-research-library.html", "peru-bus-tour-research-library.html"]:
    page = ROOT / page_name
    text = page.read_text()
    for article_file, image in assignments.items():
        text = replace_card_image(text, article_file, image["src"], image["alt"])
    page.write_text(text)

cover_updates = {
    "vietnam-research-library.html": ("vietnam-tourism-growth-planning.html", "Vietnam research library destination photo from Wikimedia Commons"),
    "peru-bus-tour-research-library.html": ("peru-bus-travel-scale-2024.html", "Peru bus and tour research library destination photo from Wikimedia Commons"),
}
for page_name, (article_file, alt) in cover_updates.items():
    page = ROOT / page_name
    src = assignments[article_file]["src"]
    text = page.read_text()
    text = re.sub(
        r'(<section class="article-hero">[\s\S]*?<img[\s\S]*?src=")[^"]+("[\s\S]*?alt=")[^"]+(")',
        rf'\1{src}\2{alt}\3',
        text,
        count=1,
    )
    page.write_text(text)

update_home_social_image(assignments["what-travelers-want-peru.html"]["src"])
CREDITS.write_text(json.dumps(assignments, indent=2, ensure_ascii=False))
print(f"Assigned {len(assignments)} destination-matched Wikimedia Commons images.")
