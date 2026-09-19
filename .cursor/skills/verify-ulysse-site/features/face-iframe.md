# Face iframe

Face is the AI product portfolio, shown in an iframe directly under Past Projects and before User Research, and also as its own page at `/portfolio.html`.

## Sub-features

- `face-iframe-src` loads `/portfolio.html` in `#uh-face-portfolio`.
- `face-placement` puts that iframe after `h1.heading-6` Past Projects and before `h1.heading-5` User Research.
- `face-specimens` lists seven specimens `#specimen-01` … `#specimen-07`.
- `face-demo-open` leaves specimen 01’s `details.specimen-demo` open.
- `face-direct` serves the same document at `/portfolio.html`.
- `face-fit` sizes the iframe from `main.shell` so it is not a 0-height or 100vh flash.

## How to get to it (user POV)

- Scroll to **Past Projects** on `/`.
- Use the specimen index links inside the iframe (01–07).
- Open `/portfolio.html` in its own tab.

## Driving it with control-ulysse

Preconditions:

- The site is healthy at the isolated URL from `control-ulysse doctor`.
- `/portfolio.html` returns 200.
- Viewport 1440×900.

- **Find the iframe.** Open `/` and scroll to Past Projects. Run `control-ulysse browser goto --path /`. `#uh-face-portfolio` has `src="/portfolio.html"` and title `Ulysse AI Product and Transformation Portfolio`.
- **Placement.** Dump the page. Run `control-ulysse browser dump --path artifacts/face-iframe/face-dump.json`. `faceAfterPastProjects` is true and `faceBeforeUserResearch` is true.
- **Specimens.** Target the frame. Run `control-ulysse browser wait --selector '#specimen-07' --frame iframe#uh-face-portfolio`. The frame contains `#specimen-01` through `#specimen-07`. Index titles include `SKU Profitability and Complexity Optimisation Agent` and `Asset Lifecycle Analytics`.
- **First demo open.** `#specimen-01 details.specimen-demo` is `open`. Later specimens’ demos are not required to be open.
- **Height.** After load, the iframe’s inline height is greater than 200px (fitted from `main.shell`, not `min-height: 100vh`).
- **Direct page.** Open the portfolio URL. Run `control-ulysse browser goto --path /portfolio.html`. The title matches `/Portfolio/` and `#specimen-01` is in the top document.
- **Packaged drive.** Run `control-ulysse drive --feature face-iframe --evidence "$EVIDENCE_DIR"`. `RESULT.json` has `ok: true`.

## Gotchas

- Specimen DOM is inside the iframe. Clicks without `--frame iframe#uh-face-portfolio` hit the parent Webflow page.
- Do not restyle Face demos as part of a Bio proof. Dark demo chrome inside `.specimen-demo` is expected.
- iframe height starts at 0 and is set on `load`. Screenshot too early and you capture a blank strip; wait for `main.shell` in the frame.
- `/portfolio.html` is the same file the iframe uses. A pass on the direct page does not prove placement under Past Projects — do both.
- There is no extra site nav for Face. If you see sticky chips or a second page chrome on `/`, the join is wrong.
