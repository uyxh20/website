# Ulysse Ha — personal site

Carbon copy of [ulysseh.webflow.io](https://ulysseh.webflow.io/) with the Face product specimens on the same page, directly under **Past Projects** and before the User Research tabs.

Bio keeps the Timeline.jpg dotted map (cropped from that JPEG) and the four coral lanes as an HTML Gantt. Place chips stay **UK / DENMARK / FRANCE / HONG KONG**. Click a chip or lane to open an in-flow box whose strings are transcribed from the JPEG. The original figure remains under **View full timeline**.

Face page chrome uses the Webflow tokens (white, Roboto, 940px). Interactive demos stay nested inside each specimen. No extra site nav, chips, or copy rewrites.

## Run locally

```bash
npm install
npm run dev
```

Dev server: [http://127.0.0.1:43177](http://127.0.0.1:43177)

`/` serves `public/site.html`.

`scripts/assemble-site.py` re-injects local `public/portfolio.html` after the Past Projects heading. It does not append Face at `</body>`. Pass `--from-live` only when you intend to re-fetch the Webflow page.
