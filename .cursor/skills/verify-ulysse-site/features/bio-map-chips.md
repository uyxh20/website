# Bio map chips

Bio lets a user pick Hong Kong, London, Paris, or Copenhagen on the dotted map, read that place’s from–to strings in an in-flow box, and open the original Timeline.jpg via View full timeline. There is no Gantt chart on the page.

## Sub-features

- `chip-labels` shows city labels Hong Kong, London, Paris, Copenhagen on coral circle chips.
- `chip-open-hong-kong` opens the Hong Kong box with LIFE EMERGED – 2022.
- `chip-open-london` opens the London box with ESSAYS.. – ANTHRO!.
- `chip-open-paris` opens the Paris box with GROWING.
- `chip-open-copenhagen` opens the Copenhagen box with ENTERPRISE APPLICATION – UX and 2022.
- `chip-exclusive` keeps only one box open at a time.
- `chip-toggle` closes the open box when its chip is clicked again.
- `no-gantt` keeps `.uh-bio-gantt` and `.uh-bio-lane` out of the document.
- `timeline-lightbox` opens Timeline.jpg from View full timeline.
- `mobile-chips` keeps chips clickable at a 390×844 viewport.

## How to get to it (user POV)

- Scroll to the **Bio** heading, then the dotted map in `#uh-bio`.
- Choose a city chip on the map (Hong Kong, London, Paris, Copenhagen).
- Choose **View full timeline** under the map.
- On a narrow phone viewport, choose the same chips.

## Driving it with control-ulysse

Preconditions:

- The site is healthy at the isolated URL from `control-ulysse doctor`.
- Viewport starts at 1440×900.
- `control-ulysse doctor` reports title `Ulysse H` and `#uh-bio`.

- **Closed map.** Open `/` and scroll to Bio. Run `control-ulysse browser goto --path /` then `control-ulysse browser screenshot --path artifacts/bio-map-chips/bio-chips-closed.png --selector '#uh-bio'`. Four chips are visible with labels `Copenhagen`, `London`, `Paris`, `Hong Kong`. No `.uh-bio-gantt` exists. No box border bar is sitting empty under the map (closed `details` summaries are clipped).
- **Hong Kong.** Choose the Hong Kong chip. Run `control-ulysse browser click --selector '.uh-bio-chip[data-place="hong-kong"]'`. `#uh-bio-box-hong-kong` is `open`, `aria-expanded` on that chip is `true`, and the box text contains `Hong Kong`, `LIFE EMERGED – 2022`, and `LIFE EMERGED`. It does not contain `Carlsberg` or `ethnographic`.
- **London.** Choose London. Run `control-ulysse browser click --selector '.uh-bio-chip[data-place="london"]'`. `#uh-bio-box-london` is `open` and contains `ESSAYS.. – ANTHRO!`, `ESSAYS..`, and `ANTHRO!`. The Hong Kong box is not `open`.
- **Paris.** Choose Paris. Run `control-ulysse browser click --selector '.uh-bio-chip[data-place="paris"]'`. `#uh-bio-box-paris` is `open` and contains `GROWING`.
- **Copenhagen.** Choose Copenhagen. Run `control-ulysse browser click --selector '.uh-bio-chip[data-place="copenhagen"]'`. `#uh-bio-box-copenhagen` is `open` and contains `ENTERPRISE APPLICATION – UX`, `ENTERPRISE APPLICATION`, `UX`, and `2022`.
- **Toggle closed.** Click the open city’s chip again. Run the same `click` selector. That box’s `open` is false and every chip has `aria-expanded="false"`.
- **No Gantt / no badge.** Dump the page. Run `control-ulysse browser dump --path artifacts/bio-map-chips/bio-closed-dump.json`. `ganttCount` is `0`, `webflowBadgeVisible` is false, and `document.body.innerText` does not include `Made in Webflow`.
- **View full timeline.** Choose the lightbox link. Run `control-ulysse browser click --selector 'a.uh-bio-lightbox'` then `control-ulysse browser wait --selector '.w-lightbox-view'`. The lightbox image URL contains `Timeline.jpg`.
- **Mobile.** Set 390×844 and open Hong Kong. Run `control-ulysse browser viewport --width 390 --height 844` and `control-ulysse browser click --selector '.uh-bio-chip[data-place="hong-kong"]'`. The chip’s box is still `open` and the chip bounding box is at least 20px tall.
- **Packaged drive.** Run `control-ulysse drive --feature bio-map-chips --evidence "$EVIDENCE_DIR"`. `RESULT.json` has `ok: true` and one screenshot per opened city plus `bio-lightbox.png` and `bio-mobile-hong-kong.png`.

## Gotchas

- Chip `data-place` values are `hong-kong`, `london`, `paris`, `copenhagen` — not UK/FRANCE/DENMARK and not `hongkong`.
- Box copy uses an en dash (`LIFE EMERGED – 2022`). Assert the rendered strings, not hyphen-minus.
- Closed `<details>` summaries are visually clipped on purpose. Do not treat a missing summary as a missing box in the DOM.
- Clicking a chip that is already open closes it. Click the next city from a known closed or known other-city state.
- `#uh-bio` sits below a tall hero. Scroll it into view before screenshotting or the PNG is a white slab.
- The Webflow badge CSS hide is a backup. Fail on **visible** “Made in Webflow”, not merely on a `.w-webflow-badge` node with `display:none`.
- `View full timeline` is `a.uh-bio-lightbox.w-lightbox`. A screenshot of the closed map does not prove the lightbox.
- Do not type city prose that is not in the box (`Carlsberg`, degrees, Past Projects titles). If it appears, the fold is wrong.
