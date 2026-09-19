# Ulysse Ha — personal site

**This GitHub repository is the source of truth.** Clone from GitHub. Origin `u-h/genesis` is no longer the source of truth.

Carbon copy of [ulysseh.webflow.io](https://ulysseh.webflow.io/) with the Face product specimens on the same page, directly under **Portfolio**. The old Webflow case-study tabs (User Research, program management, comms, ops) are not on this page.

Hero title is **In-Between**, subtitle **Where Human Digital Intersect**. Bio keeps the dotted map at about two-thirds of the column, centered. Eight coral circle chips (Paris, Hong Kong, Bath, Shanghai, Chengdu, Shenzhen, London, Copenhagen) open a small popover card beside the chip. On a phone the same card docks under the map. There is no Gantt JPEG and no View full timeline.

Face page chrome uses the Webflow tokens (white, Roboto, 940px). The 01–07 index has no row underlines; clicking a row shows only that product (01 selected by default). Interactive demos stay nested inside each specimen. No extra site nav, chips, or copy rewrites.

This repository is **public**. GitHub Pages: [https://uyxh20.github.io/website/](https://uyxh20.github.io/website/). The `Deploy GitHub Pages` workflow publishes `public/` on every push to `main` (`site.html` as `index.html`, plus `portfolio.html` and `webflow/` assets). Asset paths are relative so they work at `/` locally and at `/website/` on Pages.

## Clone and run

```bash
git clone https://github.com/uyxh20/website.git
cd website
npm install
npm run dev
```

Dev server: [http://127.0.0.1:43177](http://127.0.0.1:43177)

`/` serves `public/site.html`.

`scripts/assemble-site.py` re-injects local `public/portfolio.html` after the Portfolio heading. It does not append Face at `</body>`. Pass `--from-live` only when you intend to re-fetch the Webflow page (the script then renames Past Projects → Portfolio and strips the old case studies).
