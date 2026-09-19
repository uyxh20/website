# Ulysse Ha — personal site

Carbon copy of [ulysseh.webflow.io](https://ulysseh.webflow.io/) with the Face product specimens on the same page, directly under **Past Projects** and before the User Research tabs.

Bio keeps the Timeline.jpg dotted map. Coral circle chips sit on the four places, each with a city label (Hong Kong, London, Paris, Copenhagen). Click a chip for an in-flow box folded from the JPEG Gantt strings. The original figure remains under **View full timeline**.

Face page chrome uses the Webflow tokens (white, Roboto, 940px). Interactive demos stay nested inside each specimen. No extra site nav, chips, or copy rewrites.

## Run locally

```bash
npm install
npm run dev
```

Dev server: [http://127.0.0.1:43177](http://127.0.0.1:43177)

`/` serves `public/site.html`.

`scripts/assemble-site.py` re-injects local `public/portfolio.html` after the Past Projects heading. It does not append Face at `</body>`. Pass `--from-live` only when you intend to re-fetch the Webflow page.
