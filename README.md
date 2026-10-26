# RetroType Studio

**Make retro title graphics that can carry CJK and mixed-script text.** Type, style, preview, and export a shareable image without an account or AI service.

![Mixed-script title graphic exported from RetroType Studio](assets/sample-artwork.svg)

## Open the editor

**[Use RetroType Studio](https://lydiatools.github.io/retrotype-studio/)** · [中文说明](README.zh-CN.md)

## What it does

- Typeset Latin, Chinese, Japanese, Korean, and mixed-script titles using system fonts or a font file loaded locally in your browser.
- Apply four original layered styles: Soda Pop, Chrome Fold, Print Bloom, and Night Signal.
- Choose square, wide, or portrait canvases; set a color or transparent background.
- Export a ready-to-share PNG or editable SVG.
- Keep the text preview and font file on your device. The app sends no prompt, image, or font to an AI or server.

## Quick start

Open the live editor, change the sample title, choose a style and canvas, then export PNG or SVG. To run the source locally:

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173` in a browser.

## Fonts and exports

The editor uses fonts available to your browser. If a character is missing or a different typeface is needed, load a `.woff`, `.woff2`, `.ttf`, or `.otf` file. The font is read in the current browser session and is not uploaded. Uploaded files over 12 MB are not accepted.

PNG captures the current browser rendering. SVG keeps text editable and normally references the selected font by family name. The optional font-embedding control can package a loaded font inside the SVG; use it only when that font's license permits embedding. Other devices may use a fallback font if the selected font is unavailable.

## Run without a build step

RetroType Studio is a static browser app. It uses no package manager, AI API, analytics, login, or server-side font storage. GitHub Pages deploys the files in this repository.

## Project notes

This is an independent implementation built around script coverage and local font choice. It does not use TitleArt's code, images, or assets, and it is not affiliated with Microsoft or any font maker. No font files are bundled; check the license of any font you load or embed.

## License

The source code is available under the [MIT License](LICENSE). The license does not grant rights to fonts you choose to load.
