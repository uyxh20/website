# Ulysse Ha — personal site

**This GitHub repository is the source of truth.** Clone from GitHub. Origin `u-h/genesis` is no longer the source of truth.

Carbon copy of [ulysseh.webflow.io](https://ulysseh.webflow.io/) with the Face product specimens on the same page, directly under **Past Projects** and before the User Research tabs.

Bio keeps the dotted map. Eight coral circle chips (Paris, Hong Kong, Bath, Shanghai, Chengdu, Shenzhen, London, Copenhagen) open a small popover card beside the chip. On a phone the same card docks under the map. There is no Gantt JPEG and no View full timeline.

Face page chrome uses the Webflow tokens (white, Roboto, 940px). Interactive demos stay nested inside each specimen. No extra site nav, chips, or copy rewrites.

This repo is **private**. The public page is GitHub Pages at [https://uyxh20.github.io/website/](https://uyxh20.github.io/website/) when the account plan allows Pages from a private repo. The published site is public; the git history stays private. Do not flip this repository to public to work around a Free-plan Pages block.

Static files live in `public/` (`site.html`, `portfolio.html`, `webflow/` assets). GitHub Pages copies those files to the site root and serves `site.html` as `index.html`. Asset paths are relative so they work at `/` locally and at `/website/` on Pages.

## Clone and run

```bash
git clone https://github.com/uyxh20/website.git
cd website
npm install
npm run dev
```

Dev server: [http://127.0.0.1:43177](http://127.0.0.1:43177)

`/` serves `public/site.html`.

`scripts/assemble-site.py` re-injects local `public/portfolio.html` after the Past Projects heading. It does not append Face at `</body>`. Pass `--from-live` only when you intend to re-fetch the Webflow page.
