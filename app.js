const copy = {
  en: {
    local: "Fonts stay on this device", localFontNotice: "This font file is read in your browser only.", editor: "Type editor", makeTitle: "Make a title",
    intro: "Mix scripts, find the right weight, and export the artwork.", titleText: "Title text",
    lineHint: "Line breaks stay in the artwork.", scriptFallback: "Script fallback", fontStyle: "Font style",
    font: "Font", fontHeavy: "Heavy sans", fontRounded: "Rounded", fontSerif: "Serif", fontMono: "Mono",
    loadFont: "Load font", systemFonts: "Using system fonts", removeFont: "Remove", fontLoaded: "Local font loaded",
    fontFailed: "Could not load that font. System fonts are still active.", fontTooLarge: "Font file is over 12 MB.",
    embedFont: "Embed loaded font in SVG when its license allows", style: "Style", soda: "Soda Pop",
    chrome: "Chrome Fold", print: "Print Bloom", laser: "Night Signal", size: "Type size", spacing: "Letter spacing",
    canvas: "Canvas", square: "Square", wide: "Wide", portrait: "Portrait", background: "Background",
    transparent: "Transparent", liveCanvas: "Live canvas", reset: "Reset", exportPng: "Export PNG",
    exportSvg: "Export SVG", exportHint: "PNG keeps the current look. SVG keeps the text editable.",
    pngDone: "PNG downloaded.", svgDone: "SVG downloaded.", svgFontHint: "SVG references your selected font unless you embed it.",
    exportFailed: "Could not export this artwork. Try another font or a shorter title.",
    footer: "An independent title-art editor. No account or AI service.", feedback: "Report an issue", ariaArtwork: "Live title artwork",
    ariaChooseStyle: "Choose a title style", ariaCanvas: "Canvas size", emptyTitle: "Type a title",
    language: "中文",
    resetDone: "Preview reset.", scriptAuto: "Auto", scriptZh: "中文", scriptJa: "日本語", scriptKo: "한국어"
  },
  zh: {
    local: "字体只在此设备使用", localFontNotice: "字体文件只在当前浏览器中读取。", editor: "文字编辑", makeTitle: "制作标题图",
    intro: "混排不同文字，调好风格，再导出图片。", titleText: "标题文字",
    lineHint: "换行会保留在成图中。", scriptFallback: "文字系统回退字体", fontStyle: "字体风格",
    font: "字体", fontHeavy: "粗体无衬线", fontRounded: "圆体", fontSerif: "衬线体", fontMono: "等宽体",
    loadFont: "载入字体", systemFonts: "使用系统字体", removeFont: "移除", fontLoaded: "已载入本地字体",
    fontFailed: "无法载入该字体，继续使用系统字体。", fontTooLarge: "字体文件超过 12 MB。",
    embedFont: "字体授权允许时，将其嵌入 SVG", style: "效果", soda: "汽水字",
    chrome: "冷光镀铬", print: "套色印刷", laser: "夜光信号", size: "文字大小", spacing: "字距",
    canvas: "画布", square: "正方形", wide: "横版", portrait: "竖版", background: "背景",
    transparent: "透明背景", liveCanvas: "实时画布", reset: "重置", exportPng: "导出 PNG",
    exportSvg: "导出 SVG", exportHint: "PNG 保留当前视觉效果；SVG 中的文字可继续编辑。",
    pngDone: "PNG 已下载。", svgDone: "SVG 已下载。", svgFontHint: "SVG 会引用当前字体；如授权允许，可选择嵌入。",
    exportFailed: "无法导出这张图。请换一种字体或缩短标题。",
    footer: "独立制作的标题图编辑器。不需要账号或 AI 服务。", feedback: "反馈问题", ariaArtwork: "标题图实时预览",
    ariaChooseStyle: "选择标题风格", ariaCanvas: "选择画布比例", emptyTitle: "输入标题文字",
    language: "EN",
    resetDone: "预览已重置。", scriptAuto: "自动", scriptZh: "简体中文", scriptJa: "日文", scriptKo: "韩文"
  }
};

const ratios = {
  square: { width: 1080, height: 1080 },
  wide: { width: 1600, height: 900 },
  portrait: { width: 1080, height: 1350 }
};

const styles = {
  soda: { label: "Soda Pop", top: "url(#sodaFill)", edge: "#342956", shadow: "#b04b63", mode: "soda" },
  chrome: { label: "Chrome Fold", top: "url(#chromeFill)", edge: "#314d69", shadow: "#304b64", mode: "chrome" },
  print: { label: "Print Bloom", top: "url(#printFill)", edge: "#282747", shadow: "#e2646d", mode: "print" },
  laser: { label: "Night Signal", top: "#fff8df", edge: "#376379", shadow: "#5bd3ca", mode: "laser" }
};

const scriptStacks = {
  auto: '"PingFang SC", "Hiragino Sans GB", "Yu Gothic", "Meiryo", "Malgun Gothic", "Microsoft YaHei", "Noto Sans CJK SC", sans-serif',
  zh: '"PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", "Source Han Sans SC", sans-serif',
  ja: '"Hiragino Kaku Gothic ProN", "Yu Gothic", "Meiryo", "Noto Sans CJK JP", "Source Han Sans JP", sans-serif',
  ko: '"Apple SD Gothic Neo", "Malgun Gothic", "Noto Sans CJK KR", "Source Han Sans K", sans-serif'
};

const fontPresets = {
  heavy: '"Arial Black", "Avenir Next", "PingFang SC", "Microsoft YaHei", sans-serif',
  rounded: '"Arial Rounded MT Bold", "Avenir Next", "PingFang SC", "Hiragino Sans", "Microsoft YaHei", sans-serif',
  serif: '"Iowan Old Style", Georgia, "Songti SC", "Noto Serif CJK SC", serif',
  mono: '"SFMono-Regular", "Cascadia Code", "Noto Sans Mono CJK SC", monospace'
};

const els = {
  title: document.querySelector("#titleInput"),
  svg: document.querySelector("#previewSvg"),
  font: document.querySelector("#fontSelect"),
  script: document.querySelector("#scriptSelect"),
  fontFile: document.querySelector("#fontFile"),
  fontStatus: document.querySelector("#fontStatus"),
  removeFont: document.querySelector("#removeFont"),
  embedFont: document.querySelector("#embedFont"),
  size: document.querySelector("#sizeRange"),
  sizeValue: document.querySelector("#sizeValue"),
  spacing: document.querySelector("#spacingRange"),
  spacingValue: document.querySelector("#spacingValue"),
  background: document.querySelector("#backgroundColor"),
  transparent: document.querySelector("#transparent"),
  dimensions: document.querySelector("#canvasDimensions"),
  canvasLabel: document.querySelector("#canvasLabel"),
  exportDimensions: document.querySelector("#exportDimensions"),
  charCount: document.querySelector("#charCount"),
  exportHint: document.querySelector("#exportHint"),
  languageButton: document.querySelector("#languageButton")
};

let language = "en";
let ratio = "square";
let selectedStyle = "soda";
let localFont = null;
let fontObjectUrl = null;

function tr(key) { return copy[language][key] || copy.en[key] || key; }

function escapeXml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" }[char]));
}

function selectedFontFamily() {
  const scriptStack = scriptStacks[els.script.value] || scriptStacks.auto;
  if (localFont) return `"${localFont.family}", ${scriptStack}`;
  return `${fontPresets[els.font.value] || fontPresets.heavy}, ${scriptStack}`;
}

function textMarkup(lines, width, height, fontSize, letterSpacing, style, options = {}) {
  const y0 = height / 2 + fontSize * 0.34 - ((lines.length - 1) * fontSize * 1.08) / 2;
  const family = escapeXml(selectedFontFamily());
  const fontWeight = els.font.value === "serif" ? 800 : 900;
  const filter = options.filter ? ` filter="url(#${options.filter})"` : "";
  const opacity = options.opacity == null ? 1 : options.opacity;
  const transform = options.transform ? ` transform="${options.transform}"` : "";
  const stroke = options.stroke || "none";
  const strokeWidth = options.strokeWidth || 0;
  const fill = options.fill || style.top;
  const paintOrder = strokeWidth ? ` paint-order="stroke fill" stroke-linejoin="round"` : "";
  return `<g${transform} opacity="${opacity}"${filter}>${lines.map((line, index) => `<text x="${width / 2}" y="${y0 + index * fontSize * 1.08}" text-anchor="middle" font-family="${family}" font-size="${fontSize}" font-weight="${fontWeight}" letter-spacing="${letterSpacing}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"${paintOrder}>${escapeXml(line)}</text>`).join("")}</g>`;
}

function defsMarkup() {
  return `<defs>
    <linearGradient id="sodaFill" x1="0" y1="0" x2="0.8" y2="1"><stop offset="0" stop-color="#ffbf6b"/><stop offset=".5" stop-color="#ff7965"/><stop offset="1" stop-color="#ed4d84"/></linearGradient>
    <linearGradient id="chromeFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".18" stop-color="#91bbc9"/><stop offset=".34" stop-color="#f6f2dc"/><stop offset=".55" stop-color="#6687a6"/><stop offset=".72" stop-color="#e1e7df"/><stop offset="1" stop-color="#7591ad"/></linearGradient>
    <linearGradient id="printFill" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f7ed86"/><stop offset=".52" stop-color="#f6c95e"/><stop offset="1" stop-color="#f49767"/></linearGradient>
    <filter id="softGlow" x="-45%" y="-45%" width="190%" height="190%"><feGaussianBlur stdDeviation="13" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>`;
}

function buildArtwork() {
  const { width, height } = ratios[ratio];
  const style = styles[selectedStyle];
  const text = els.title.value.replace(/\r/g, "").slice(0, 90);
  const lines = text.split("\n");
  const size = Math.min(width, height) * (Number(els.size.value) / 100);
  const spacing = Number(els.spacing.value);
  const background = els.transparent.checked ? "none" : els.background.value;
  const fontSize = size;
  const safeLines = lines.length ? lines : [""];
  const backdrop = `<rect width="${width}" height="${height}" fill="${background}"/>`;

  let layers = "";
  if (text.trim()) {
    if (style.mode === "soda") {
      layers += textMarkup(safeLines, width, height, fontSize, spacing, style, { transform: "translate(0 18)", fill: style.shadow, stroke: style.shadow, strokeWidth: 13 });
      layers += textMarkup(safeLines, width, height, fontSize, spacing, style, { fill: style.top, stroke: "#fff4d5", strokeWidth: 19 });
      layers += textMarkup(safeLines, width, height, fontSize, spacing, style, { fill: style.top, stroke: style.edge, strokeWidth: 5 });
    } else if (style.mode === "chrome") {
      layers += textMarkup(safeLines, width, height, fontSize, spacing, style, { transform: "translate(13 17)", fill: style.shadow, stroke: style.shadow, strokeWidth: 10 });
      layers += textMarkup(safeLines, width, height, fontSize, spacing, style, { fill: style.top, stroke: "#f9f5e9", strokeWidth: 17 });
      layers += textMarkup(safeLines, width, height, fontSize, spacing, style, { fill: style.top, stroke: style.edge, strokeWidth: 5 });
    } else if (style.mode === "print") {
      layers += textMarkup(safeLines, width, height, fontSize, spacing, style, { transform: "translate(-9 4)", fill: "#43bfb6", stroke: "#43bfb6", strokeWidth: 10, opacity: .94 });
      layers += textMarkup(safeLines, width, height, fontSize, spacing, style, { transform: "translate(9 -4)", fill: "#f26d76", stroke: "#f26d76", strokeWidth: 10, opacity: .9 });
      layers += textMarkup(safeLines, width, height, fontSize, spacing, style, { fill: style.top, stroke: style.edge, strokeWidth: 7 });
    } else {
      layers += textMarkup(safeLines, width, height, fontSize, spacing, style, { fill: "none", stroke: style.shadow, strokeWidth: 30, filter: "softGlow", opacity: .8 });
      layers += textMarkup(safeLines, width, height, fontSize, spacing, style, { transform: "translate(6 8)", fill: "#1e2a49", stroke: "#1e2a49", strokeWidth: 12 });
      layers += textMarkup(safeLines, width, height, fontSize, spacing, style, { fill: style.top, stroke: style.edge, strokeWidth: 5 });
    }
  } else {
    const message = escapeXml(tr("emptyTitle"));
    layers = `<text x="${width / 2}" y="${height / 2}" text-anchor="middle" font-family="${escapeXml(selectedFontFamily())}" font-size="34" fill="#627080" opacity=".7">${message}</text>`;
  }

  els.svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  els.svg.setAttribute("width", width);
  els.svg.setAttribute("height", height);
  els.svg.setAttribute("aria-label", `${tr("ariaArtwork")}: ${text.replace(/\n/g, " / ") || tr("emptyTitle")}`);
  els.svg.innerHTML = `${defsMarkup()}${backdrop}<g id="fitGroup">${layers}</g>`;

  const fitGroup = els.svg.querySelector("#fitGroup");
  try {
    const box = fitGroup.getBBox();
    if (box.width > 0 && box.height > 0) {
      const scale = Math.min(1, (width * .84) / box.width, (height * .66) / box.height);
      fitGroup.setAttribute("transform", `translate(${width / 2} ${height / 2}) scale(${scale}) translate(${-width / 2} ${-height / 2})`);
    }
  } catch (_) {
    // The initial artwork remains visible if a browser cannot measure SVG text.
  }

  els.dimensions.textContent = `${width} × ${height}`;
  const ratioLabel = tr(ratio);
  els.canvasLabel.textContent = `${ratioLabel} / ${width} × ${height}`;
  els.exportDimensions.textContent = `PNG ${width * 2} × ${height * 2} px · SVG ${width} × ${height}`;
  els.sizeValue.textContent = `${els.size.value}%`;
  els.spacingValue.textContent = String(spacing);
  els.charCount.textContent = `${text.length} / 90`;
  document.querySelector("#styleName").textContent = tr(selectedStyle);
  document.querySelector("#stageWrap").classList.toggle("is-transparent", els.transparent.checked);
  fitArtboard();
}

function fitArtboard() {
  const frame = document.querySelector(".artboard-frame");
  const stage = document.querySelector("#stageWrap");
  if (!frame || !stage || stage.clientWidth < 1 || stage.clientHeight < 1) return;
  const { width, height } = ratios[ratio];
  const mobile = window.matchMedia("(max-width: 680px)").matches;
  const maxWidth = Math.max(140, Math.min(stage.clientWidth - (mobile ? 36 : 56), 690));
  const maxHeight = Math.max(180, Math.min(window.innerHeight * (mobile ? .48 : .72), stage.clientHeight - (mobile ? 34 : 44)));
  const scale = Math.min(maxWidth / width, maxHeight / height);
  frame.style.width = `${Math.round(width * scale)}px`;
  frame.style.height = `${Math.round(height * scale)}px`;
  frame.style.aspectRatio = `${width} / ${height}`;
}

function setLanguage(next) {
  language = next;
  document.documentElement.lang = next === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-copy]").forEach((node) => {
    const key = node.dataset.copy;
    if (copy[next][key]) node.textContent = copy[next][key];
  });
  els.languageButton.textContent = tr("language");
  els.fontStatus.textContent = localFont ? `${tr("fontLoaded")}: ${localFont.filename}` : tr("systemFonts");
  els.languageButton.setAttribute("aria-label", next === "en" ? "Switch to Chinese" : "Switch to English");
  document.querySelector("#scriptSelect").setAttribute("aria-label", tr("scriptFallback"));
  document.querySelector("#fontSelect").setAttribute("aria-label", tr("fontStyle"));
  document.querySelector(".style-grid").setAttribute("aria-label", tr("ariaChooseStyle"));
  document.querySelector(".ratio-switch").setAttribute("aria-label", tr("ariaCanvas"));
  document.querySelector("#backgroundColor").setAttribute("aria-label", tr("background"));
  Array.from(els.script.options).forEach((option) => {
    const map = { auto: "scriptAuto", zh: "scriptZh", ja: "scriptJa", ko: "scriptKo" };
    option.textContent = tr(map[option.value]);
  });
  buildArtwork();
}

function fontMime(file) {
  const ext = file.name.toLowerCase().split(".").pop();
  return ({ woff2: "font/woff2", woff: "font/woff", ttf: "font/ttf", otf: "font/otf" })[ext] || file.type || "application/octet-stream";
}

function fileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Font file could not be read."));
    reader.readAsDataURL(file);
  });
}

async function loadLocalFont(file) {
  if (!file) return;
  if (file.size > 12 * 1024 * 1024) {
    els.fontStatus.textContent = tr("fontTooLarge");
    els.fontFile.value = "";
    return;
  }
  try {
    if (localFont?.face) document.fonts.delete(localFont.face);
    if (fontObjectUrl) URL.revokeObjectURL(fontObjectUrl);
    localFont = null;
    els.removeFont.classList.add("hidden");
    els.embedFont.checked = false;
    els.embedFont.disabled = true;
    fontObjectUrl = URL.createObjectURL(file);
    const family = `RetroTypeLocal${Date.now()}`;
    const face = new FontFace(family, `url("${fontObjectUrl}")`);
    await face.load();
    document.fonts.add(face);
    const dataUrl = await fileAsDataUrl(file);
    localFont = { family, dataUrl, mime: fontMime(file), filename: file.name, face };
    els.fontStatus.textContent = `${tr("fontLoaded")}: ${file.name}`;
    els.removeFont.classList.remove("hidden");
    els.embedFont.disabled = false;
    buildArtwork();
  } catch (_) {
    localFont = null;
    els.fontStatus.textContent = tr("fontFailed");
    els.removeFont.classList.add("hidden");
  }
  els.fontFile.value = "";
}

function clearLocalFont() {
  if (fontObjectUrl) URL.revokeObjectURL(fontObjectUrl);
  fontObjectUrl = null;
  if (localFont?.face) document.fonts.delete(localFont.face);
  localFont = null;
  els.embedFont.checked = false;
  els.embedFont.disabled = true;
  els.fontStatus.textContent = tr("systemFonts");
  els.removeFont.classList.add("hidden");
  buildArtwork();
}

function svgForDownload(embedFont) {
  const clone = els.svg.cloneNode(true);
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("width", ratios[ratio].width);
  clone.setAttribute("height", ratios[ratio].height);
  if (embedFont && localFont) {
    const style = document.createElementNS("http://www.w3.org/2000/svg", "style");
    const format = localFont.mime.includes("woff2") ? "woff2" : localFont.mime.includes("woff") ? "woff" : localFont.mime.includes("otf") ? "opentype" : "truetype";
    style.textContent = `@font-face{font-family:"${localFont.family}";src:url("${localFont.dataUrl}") format("${format}");font-weight:100 900;font-style:normal}`;
    clone.insertBefore(style, clone.firstChild);
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n${new XMLSerializer().serializeToString(clone)}`;
}

function safeName() {
  const stem = els.title.value.trim().split("\n")[0].toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
  return `retrotype-${stem || "title"}`;
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function exportPng() {
  els.exportHint.textContent = "…";
  const temporaryUrl = URL.createObjectURL(new Blob([svgForDownload(Boolean(localFont))], { type: "image/svg+xml;charset=utf-8" }));
  try {
    const image = new Image();
    image.src = temporaryUrl;
    await image.decode();
    const { width, height } = ratios[ratio];
    const canvas = document.createElement("canvas");
    canvas.width = width * 2;
    canvas.height = height * 2;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas is unavailable.");
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise((resolve, reject) => canvas.toBlob((value) => value ? resolve(value) : reject(new Error("PNG encoding failed.")), "image/png"));
    downloadBlob(blob, `${safeName()}.png`);
    els.exportHint.textContent = tr("pngDone");
  } catch (_) {
    els.exportHint.textContent = tr("exportFailed");
  } finally {
    URL.revokeObjectURL(temporaryUrl);
  }
}

function exportSvg() {
  const embed = Boolean(localFont && els.embedFont.checked);
  downloadBlob(new Blob([svgForDownload(embed)], { type: "image/svg+xml;charset=utf-8" }), `${safeName()}.svg`);
  els.exportHint.textContent = localFont && !embed ? tr("svgFontHint") : tr("svgDone");
}

function resetAll() {
  els.title.value = "AFTER HOURS\n午夜电台";
  els.font.value = "heavy";
  els.script.value = "auto";
  els.size.value = "17";
  els.spacing.value = "2";
  els.background.value = "#f3e9d6";
  els.transparent.checked = false;
  ratio = "square";
  selectedStyle = "soda";
  clearLocalFont();
  document.querySelectorAll(".style-choice").forEach((button) => {
    const active = button.dataset.style === selectedStyle;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  document.querySelectorAll(".ratio-choice").forEach((button) => {
    const active = button.dataset.ratio === ratio;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  els.exportHint.textContent = tr("resetDone");
  buildArtwork();
}

document.querySelectorAll("[data-style]").forEach((button) => button.addEventListener("click", () => {
  selectedStyle = button.dataset.style;
  document.querySelectorAll(".style-choice").forEach((choice) => {
    const active = choice === button;
    choice.classList.toggle("active", active);
    choice.setAttribute("aria-pressed", String(active));
  });
  buildArtwork();
}));

document.querySelectorAll("[data-ratio]").forEach((button) => button.addEventListener("click", () => {
  ratio = button.dataset.ratio;
  document.querySelectorAll(".ratio-choice").forEach((choice) => {
    const active = choice === button;
    choice.classList.toggle("active", active);
    choice.setAttribute("aria-pressed", String(active));
  });
  document.querySelector(".artboard-frame").style.aspectRatio = `${ratios[ratio].width} / ${ratios[ratio].height}`;
  buildArtwork();
}));

[els.title, els.font, els.script, els.size, els.spacing, els.background, els.transparent].forEach((element) => element.addEventListener("input", buildArtwork));
els.fontFile.addEventListener("change", () => loadLocalFont(els.fontFile.files[0]));
els.removeFont.addEventListener("click", clearLocalFont);
els.exportPng = document.querySelector("#exportPng");
els.exportPng.addEventListener("click", exportPng);
document.querySelector("#exportSvg").addEventListener("click", exportSvg);
document.querySelector("#resetButton").addEventListener("click", resetAll);
els.languageButton.addEventListener("click", () => setLanguage(language === "en" ? "zh" : "en"));
els.embedFont.disabled = true;
document.querySelector(".artboard-frame").style.aspectRatio = "1 / 1";
buildArtwork();
window.addEventListener("resize", fitArtboard);
