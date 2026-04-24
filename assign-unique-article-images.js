const fs = require("fs");
const path = require("path");

const root = __dirname;
const articlesDir = path.join(root, "articles");
const imagesDir = path.join(root, "assets", "article-images");
const site = "https://joynguyenwrites.com";

const articleFiles = fs.readdirSync(articlesDir)
  .filter((file) => file.endsWith(".html"))
  .sort();

fs.mkdirSync(imagesDir, { recursive: true });

const vietnamHints = [
  "vietnam", "hanoi", "ha-long", "hoi-an", "mekong", "da-nang", "danang", "dalat", "da-lat",
  "phong-nha", "quy-nhon", "ca-mau", "lac-village", "hue", "sam-son", "ben-tre",
  "con-dao", "cat-tien", "xuan-thuy", "tua-chua", "thanh-ha", "sapa", "sa-pa",
  "tra-vinh", "binh-thuan", "nha-trang", "cao-bang", "nhon-ly"
];

const palettes = [
  ["#123c35", "#2f7d6d", "#f1c56b", "#f7f8f5"],
  ["#18324a", "#4d8a9a", "#e6a45a", "#f5efe2"],
  ["#253b2d", "#7a9b64", "#d9a441", "#f6f2e8"],
  ["#2b3147", "#7e6aa8", "#dbb365", "#f5f2ee"],
  ["#153d5b", "#4aa3a4", "#f0b35a", "#f7f7f0"],
  ["#402f28", "#b66b3d", "#f2c46d", "#f8f4e9"]
];

function hash(value) {
  let h = 2166136261;
  for (const char of value) {
    h ^= char.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function titleFromHtml(html, slug) {
  const h1 = html.match(/<h1>([\s\S]*?)<\/h1>/);
  if (h1) return h1[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return slug.replace(/-/g, " ");
}

function isVietnam(slug, title) {
  const haystack = `${slug} ${title}`.toLowerCase();
  return vietnamHints.some((hint) => haystack.includes(hint));
}

function topicFor(slug, title) {
  if (isVietnam(slug, title)) {
    if (/ha-long|con-dao|coast|quy-nhon|binh-thuan|nha-trang/.test(slug)) return "bay";
    if (/hoi-an|hue|da-nang|danang|central|thanh-ha/.test(slug)) return "heritage";
    if (/mekong|ben-tre|tra-vinh|ca-mau/.test(slug)) return "river";
    if (/hanoi|city|app|ewom|brand|post-pandemic/.test(slug)) return "city";
    return "mountains";
  }
  if (/machu-picchu|cusco|sacred|puno|colca|arequipa/.test(slug)) return "andes";
  if (/paracas|huacachina|nazca|ica|coast|beach|playas|tumbes|piura/.test(slug)) return "desert";
  if (/lima|terminal|bus|sutran|mtc|transport|route|corridor|pickup/.test(slug)) return "road";
  return "culture";
}

function splitTitle(title) {
  const words = title.split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    if ((line + " " + word).trim().length > 27 && line) {
      lines.push(line);
      line = word;
    } else {
      line = (line + " " + word).trim();
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

function svgFor(slug, title, index) {
  const topic = topicFor(slug, title);
  const h = hash(slug);
  const [dark, mid, warm, paper] = palettes[h % palettes.length];
  const accent = palettes[(h + 2) % palettes.length][2];
  const sunX = 980 + (h % 260);
  const sunY = 150 + (h % 140);
  const roadShift = (h % 160) - 80;
  const lines = splitTitle(title);
  const label = isVietnam(slug, title) ? "VIETNAM RESEARCH" : "PERU RESEARCH";

  const landscape = {
    andes: `
      <path d="M0 705 L210 438 L350 600 L530 342 L730 650 L930 382 L1200 705 Z" fill="${mid}" opacity=".95"/>
      <path d="M260 705 L470 480 L610 635 L760 420 L1000 705 Z" fill="${dark}" opacity=".95"/>
      <path d="M520 342 L568 420 L492 420 Z" fill="${paper}" opacity=".8"/>
      <path d="M930 382 L985 470 L890 470 Z" fill="${paper}" opacity=".75"/>
      <path d="M455 705 C520 610 595 560 650 705 Z" fill="${warm}" opacity=".85"/>`,
    desert: `
      <path d="M0 690 C165 610 300 650 430 590 C620 505 805 612 1200 500 L1200 705 L0 705 Z" fill="${warm}" opacity=".9"/>
      <path d="M0 705 C210 615 370 708 580 610 C790 512 960 585 1200 545 L1200 705 Z" fill="${mid}" opacity=".72"/>
      <path d="M120 610 C240 575 310 585 438 548" stroke="${paper}" stroke-width="10" opacity=".25" fill="none"/>
      <path d="M685 610 C805 566 945 565 1080 525" stroke="${paper}" stroke-width="10" opacity=".22" fill="none"/>`,
    road: `
      <path d="M0 690 L280 470 L430 590 L650 355 L870 610 L1200 430 L1200 705 L0 705 Z" fill="${mid}" opacity=".9"/>
      <path d="M520 705 C585 575 632 470 640 352 C716 480 790 594 875 705 Z" fill="#20292f" opacity=".9"/>
      <path d="M675 705 C650 586 642 476 640 360" stroke="${paper}" stroke-width="8" stroke-dasharray="32 34" opacity=".8" fill="none"/>
      <rect x="${190 + roadShift}" y="560" width="150" height="60" rx="16" fill="${warm}"/>
      <circle cx="${230 + roadShift}" cy="625" r="18" fill="${dark}"/>
      <circle cx="${305 + roadShift}" cy="625" r="18" fill="${dark}"/>`,
    culture: `
      <path d="M0 620 C165 575 250 640 400 590 C610 520 720 630 915 555 C1030 510 1120 535 1200 500 L1200 705 L0 705 Z" fill="${mid}" opacity=".85"/>
      <rect x="98" y="415" width="110" height="230" rx="8" fill="${warm}" opacity=".9"/>
      <rect x="238" y="365" width="120" height="280" rx="8" fill="${accent}" opacity=".75"/>
      <rect x="388" y="445" width="112" height="200" rx="8" fill="${paper}" opacity=".45"/>
      <path d="M80 385 L522 385" stroke="${paper}" stroke-width="12" opacity=".35"/>
      <path d="M85 700 C245 610 415 610 570 700" stroke="${warm}" stroke-width="15" opacity=".75" fill="none"/>`,
    bay: `
      <path d="M0 620 C160 565 315 650 500 590 C735 515 930 610 1200 535 L1200 705 L0 705 Z" fill="${mid}" opacity=".65"/>
      <path d="M120 655 C210 520 285 512 350 655 Z" fill="${dark}" opacity=".95"/>
      <path d="M500 655 C590 450 720 450 805 655 Z" fill="${dark}" opacity=".88"/>
      <path d="M905 655 C990 520 1060 525 1128 655 Z" fill="${dark}" opacity=".9"/>
      <path d="M120 675 C370 640 650 710 1090 655" stroke="${paper}" stroke-width="13" opacity=".3" fill="none"/>`,
    river: `
      <path d="M0 610 C180 525 320 660 500 570 C700 470 900 610 1200 500 L1200 705 L0 705 Z" fill="${mid}" opacity=".78"/>
      <path d="M0 705 C215 605 330 662 508 595 C720 516 860 642 1200 545 L1200 705 Z" fill="#315f6d" opacity=".85"/>
      <path d="M125 620 C295 590 420 635 575 595" stroke="${paper}" stroke-width="10" opacity=".32" fill="none"/>
      <path d="M750 625 C875 585 1015 595 1125 552" stroke="${paper}" stroke-width="10" opacity=".28" fill="none"/>
      <path d="M690 570 l95 28 l-95 28 l-95 -28 Z" fill="${warm}" opacity=".9"/>`,
    heritage: `
      <path d="M0 625 C160 585 290 645 455 590 C655 520 830 610 1200 520 L1200 705 L0 705 Z" fill="${mid}" opacity=".82"/>
      <path d="M230 650 L230 430 L590 430 L590 650 Z" fill="${paper}" opacity=".34"/>
      <path d="M205 430 L410 305 L615 430 Z" fill="${warm}" opacity=".95"/>
      <path d="M670 650 L670 388 L950 388 L950 650 Z" fill="${dark}" opacity=".78"/>
      <circle cx="330" cy="505" r="34" fill="${accent}" opacity=".9"/>
      <circle cx="760" cy="478" r="30" fill="${warm}" opacity=".88"/>`,
    city: `
      <path d="M0 705 L0 512 L92 512 L92 442 L190 442 L190 565 L292 565 L292 398 L390 398 L390 705 Z" fill="${dark}" opacity=".9"/>
      <path d="M420 705 L420 460 L535 460 L535 350 L650 350 L650 545 L770 545 L770 430 L870 430 L870 705 Z" fill="${mid}" opacity=".88"/>
      <path d="M900 705 L900 515 L990 515 L990 455 L1078 455 L1078 590 L1200 590 L1200 705 Z" fill="${dark}" opacity=".78"/>
      <path d="M90 662 C330 612 560 690 805 630 C980 585 1080 615 1200 585" stroke="${warm}" stroke-width="13" opacity=".7" fill="none"/>`,
    mountains: `
      <path d="M0 705 L170 470 L310 618 L520 325 L700 660 L860 430 L1200 705 Z" fill="${mid}" opacity=".9"/>
      <path d="M420 705 L610 510 L765 705 Z" fill="${dark}" opacity=".72"/>
      <path d="M520 325 L570 410 L490 410 Z" fill="${paper}" opacity=".7"/>
      <path d="M82 682 C270 630 420 672 600 618 C825 550 980 620 1120 585" stroke="${warm}" stroke-width="13" opacity=".65" fill="none"/>`
  }[topic];

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1067" viewBox="0 0 1200 800" role="img" aria-labelledby="title desc">
  <title id="title">${escapeHtml(title)}</title>
  <desc id="desc">Generated travel illustration for ${escapeHtml(title)}.</desc>
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="${dark}"/>
      <stop offset="55%" stop-color="${mid}"/>
      <stop offset="100%" stop-color="${warm}"/>
    </linearGradient>
    <radialGradient id="sun" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${paper}" stop-opacity=".95"/>
      <stop offset="100%" stop-color="${warm}" stop-opacity=".35"/>
    </radialGradient>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer>
        <feFuncA type="table" tableValues="0 .08"/>
      </feComponentTransfer>
    </filter>
  </defs>
  <rect width="1200" height="800" fill="url(#bg)"/>
  <circle cx="${sunX}" cy="${sunY}" r="${120 + (h % 55)}" fill="url(#sun)" opacity=".86"/>
  <path d="M0 215 C190 125 310 230 505 150 C720 60 885 165 1200 85" stroke="${paper}" stroke-width="20" opacity=".11" fill="none"/>
  <path d="M0 315 C250 230 380 325 620 250 C805 195 1000 230 1200 172" stroke="${paper}" stroke-width="12" opacity=".13" fill="none"/>
  ${landscape}
  <rect width="1200" height="800" fill="${dark}" opacity=".14"/>
  <rect width="1200" height="800" filter="url(#grain)" opacity=".55"/>
  <g transform="translate(70 78)">
    <rect x="0" y="0" width="355" height="48" rx="24" fill="${paper}" opacity=".17"/>
    <text x="26" y="32" fill="${paper}" font-family="Inter, Arial, sans-serif" font-size="19" font-weight="800" letter-spacing="3">${label}</text>
  </g>
  <g transform="translate(72 485)">
    ${lines.map((line, i) => `<text x="0" y="${i * 58}" fill="${paper}" font-family="Georgia, 'Times New Roman', serif" font-size="${lines.length > 2 ? 44 : 50}" font-weight="700">${escapeHtml(line)}</text>`).join("\n    ")}
  </g>
</svg>
`;
}

function replaceFirstImage(html, image) {
  return html.replace(/<img([\s\S]*?)src="[^"]+"([\s\S]*?)alt="[^"]+"/, `<img$1src="${image.articleSrc}"$2alt="${image.alt}"`);
}

function replaceSchemaImage(html, image) {
  return html.replace(/"image":\s*"[^"]+"/, `"image": "${image.absoluteSrc}"`);
}

const imageMap = new Map();

articleFiles.forEach((file, index) => {
  const slug = file.replace(/\.html$/, "");
  const fullPath = path.join(articlesDir, file);
  let html = fs.readFileSync(fullPath, "utf8");
  const title = titleFromHtml(html, slug);
  const imageFile = `${slug}.svg`;
  const image = {
    articleSrc: `../assets/article-images/${imageFile}`,
    cardSrc: `assets/article-images/${imageFile}`,
    absoluteSrc: `${site}/assets/article-images/${imageFile}`,
    alt: `${title} travel article image`
  };
  fs.writeFileSync(path.join(imagesDir, imageFile), svgFor(slug, title, index));
  imageMap.set(file, image);
  html = replaceSchemaImage(replaceFirstImage(html, image), image);
  fs.writeFileSync(fullPath, html);
});

function replaceCardImage(pageHtml, articleFile, image) {
  const escapedFile = articleFile.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const cardPattern = new RegExp(`(<article>(?:(?!<\\/article>)[\\s\\S])*?<img(?:(?!<\\/article>)[\\s\\S])*?src=")[^"]+("(?:(?!<\\/article>)[\\s\\S])*?alt=")[^"]+("(?:(?!<\\/article>)[\\s\\S])*?<h3><a href="articles/${escapedFile}")`, "g");
  return pageHtml.replace(cardPattern, `$1${image.cardSrc}$2${image.alt}$3`);
}

["index.html", "vietnam-research-library.html", "peru-bus-tour-research-library.html"].forEach((page) => {
  const pagePath = path.join(root, page);
  if (!fs.existsSync(pagePath)) return;
  let html = fs.readFileSync(pagePath, "utf8");
  for (const [articleFile, image] of imageMap.entries()) {
    html = replaceCardImage(html, articleFile, image);
  }
  fs.writeFileSync(pagePath, html);
});

console.log(`Generated and assigned local SVG images for ${articleFiles.length} article files and visible preview cards.`);
