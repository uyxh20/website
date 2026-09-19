# Ulysse Ha — personal site

Carbon copy of [ulysseh.webflow.io](https://ulysseh.webflow.io/) with the Face product specimens on the same page, directly under **Past Projects** and before the User Research tabs.

Bio keeps the dotted map. Eight coral circle chips (Paris, Hong Kong, Bath, Shanghai, Chengdu, Shenzhen, London, Copenhagen) open a small popover card beside the chip. On a phone the same card docks under the map. There is no Gantt JPEG and no View full timeline.

Face page chrome uses the Webflow tokens (white, Roboto, 940px). Interactive demos stay nested inside each specimen. No extra site nav, chips, or copy rewrites.

## Run locally

```bash
npm install
npm run dev
```

Dev server: [http://127.0.0.1:43177](http://127.0.0.1:43177)

`/` serves `public/site.html`.

`scripts/assemble-site.py` re-injects local `public/portfolio.html` after the Past Projects heading. It does not append Face at `</body>`. Pass `--from-live` only when you intend to re-fetch the Webflow page.
