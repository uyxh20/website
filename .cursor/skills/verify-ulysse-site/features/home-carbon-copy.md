# Home carbon copy

Home is the Webflow carbon copy served at `/`: hero “In-Between”, Bio heading, Portfolio, with no User Research tabs and no visible Made in Webflow badge.

## Sub-features

- `home-root` serves `public/site.html` at `/` (Next rewrite), not the empty React `app/page.tsx`.
- `home-hero` shows `h1.heading-8` In-Between, subtitle Where Human Digital Intersect, and the Ulysse Ha intro.
- `home-bio-heading` shows `h1.body` Bio above `#uh-bio`.
- `home-portfolio` shows `h1.heading-6` Portfolio above the Face iframe.
- `home-no-case-studies` keeps User Research, PROGRAM MANAGEMENT, Communication, and Ops Optimisation off the page.
- `home-no-webflow-badge` keeps “Made in Webflow” off screen.
- `home-nav` shows Writings and LinkedIn in the top nav.
- `home-insight-links` puts Contact and LinkedIn on one line with no `.text-block-2` hairlines.

## How to get to it (user POV)

- Open `/` in the browser.
- Open `/site.html` directly (same document).
- Read the hero, then scroll to Bio and Portfolio.
- Look at the top right for Writings and LinkedIn.

## Driving it with control-ulysse

Preconditions:

- The site is healthy at the isolated URL from `control-ulysse doctor`.
- Viewport 1440×900.

- **Root rewrite.** Open `/`. Run `control-ulysse browser goto --path /`. The title is `Ulysse H` and `#uh-bio` exists. That cannot happen if the rewrite missed and React rendered `app/page.tsx` (`null`).
- **Static twin.** Open the file URL. Run `control-ulysse browser goto --path /site.html`. Same title and `#uh-bio`.
- **Hero.** Read the first heading. The element `h1.heading-8` contains `In-Between` and `.text-block-15` is `Where Human Digital Intersect`. Screenshot `artifacts/home-carbon-copy/home-hero.png` with that heading in frame.
- **Bio heading.** Scroll to Bio. `h1.body` text is `Bio` and it precedes `#uh-bio`.
- **Portfolio.** `h1.heading-6` text is `Portfolio` and `#uh-face-portfolio` follows it.
- **No badge.** Dump the page. Run `control-ulysse browser dump --path artifacts/home-carbon-copy/home-dump.json`. `webflowBadgeVisible` is false and body innerText does not include `Made in Webflow`. `html` has no `data-wf-domain`.
- **Nav.** The banner nav contains a Writings link (`a.nav-link-3`) and a LinkedIn link (`a.nav-link-4`) whose href is `https://www.linkedin.com/in/ulysse-ha-5945b91ab/`.
- **Packaged drive.** Run `control-ulysse drive --feature home-carbon-copy --evidence "$EVIDENCE_DIR"`. `RESULT.json` has `ok: true`.

## Gotchas

- `app/page.tsx` returning null is not a failed home page. The rewrite in `next.config.ts` is the user path.
- There is no `h1.heading-5` User Research heading anymore. A dump that still contains those case-study headings fails this feature.
- Writings href is `http://` on the carbon copy. Do not “fix” it in a verification run and do not treat that as a harness failure.
- Google Fonts or WebFont.js can delay webfonts. Wait for `#uh-bio`, not `networkidle`.
- A 200 on `/` that is the Next error overlay is not a pass. Require the title `Ulysse H` and `#uh-bio`.
