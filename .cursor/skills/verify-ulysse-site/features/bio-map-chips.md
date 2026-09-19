# Bio map chips

Bio lets a user pick Paris, Hong Kong, Bath, Shanghai, Chengdu, Shenzhen, London, or Copenhagen on the dotted map and read that place’s note in a small card. The card sits beside the chip on desktop and docks under the map on a phone. There is no Gantt and no Timeline.jpg lightbox.

## Sub-features

- `chip-labels` shows eight city labels on coral circle chips.
- `chip-open-paris` opens the Paris card with the lycée 2011–2015 copy.
- `chip-open-hong-kong` opens the Hong Kong card with the Cushman / Google/Tencent / Carlsberg copy.
- `chip-open-bath` opens the Bath card with University of Bath, BSc Sociology.
- `chip-open-shanghai` opens the Shanghai card with Cushman & Wakefield.
- `chip-open-chengdu` opens the Chengdu card with transit-oriented development.
- `chip-open-shenzhen` opens the Shenzhen card with transit-oriented development.
- `chip-open-london` opens the London card with UCL MSc Digital Anthropology.
- `chip-open-copenhagen` opens the Copenhagen card with product management → AI product management.
- `chip-exclusive` keeps only one card open at a time.
- `chip-toggle` closes the open card when its chip is clicked again.
- `card-popover` places the desktop card next to the chip, not as a modal and not full-width.
- `card-dock-mobile` docks the same card under the map at 390×844.
- `no-gantt` keeps `.uh-bio-gantt`, `.uh-bio-lane`, and `.uh-bio-box` out of the document.
- `no-lightbox` keeps View full timeline and Timeline.jpg out of Bio.
- `map-two-thirds` keeps `.uh-bio-map` at about two-thirds of the Bio column, centered.

## How to get to it (user POV)

- Scroll to the **Bio** heading, then the dotted map in `#uh-bio`.
- Choose a city chip on the map.
- On a narrow phone viewport, choose the same chips; the card appears under the map.

## Driving it with control-ulysse

Preconditions:

- The site is healthy at the isolated URL from `control-ulysse doctor`.
- Viewport starts at 1440×900.
- `control-ulysse doctor` reports title `Ulysse H` and `#uh-bio`.

- **Closed map.** Open `/` and scroll to Bio. Run `control-ulysse browser goto --path /` then `control-ulysse browser screenshot --path artifacts/bio-map-chips/bio-chips-closed.png --selector '#uh-bio'`. Eight chips are visible with labels Paris, Hong Kong, Bath, Shanghai, Chengdu, Shenzhen, London, Copenhagen. `#uh-bio-card` is hidden. No `.uh-bio-gantt`, `.uh-bio-box`, or `a.uh-bio-lightbox` exists. Bio HTML does not include `Timeline.jpg` or `View full timeline`.
- **Paris.** Choose the Paris chip. Run `control-ulysse browser click --selector '.uh-bio-chip[data-place="paris"]'`. `#uh-bio-card` is not hidden, `data-place="paris"`, `aria-expanded` on that chip is `true`, and the card text is `Paris` plus `Born there; formative years in lycée 2011–2015.` The card is not `role="dialog"` and is narrower than the map.
- **Hong Kong.** Choose Hong Kong. Run `control-ulysse browser click --selector '.uh-bio-chip[data-place="hong-kong"]'`. The card `data-place` is `hong-kong` and the copy includes `Carlsberg digital graduate program` and `Google/Tencent`. The Paris chip is not expanded.
- **Bath.** Run `control-ulysse browser click --selector '.uh-bio-chip[data-place="bath"]'`. Card copy is `2015–2019 University of Bath, BSc Sociology. Read a lot of text.`
- **Shanghai.** Run `control-ulysse browser click --selector '.uh-bio-chip[data-place="shanghai"]'`. Card copy is `2017–2018 placement year with Cushman & Wakefield. Research transit-oriented development.`
- **Chengdu.** Run `control-ulysse browser click --selector '.uh-bio-chip[data-place="chengdu"]'`. Card copy is `2017–2018 research transit-oriented development.`
- **Shenzhen.** Run `control-ulysse browser click --selector '.uh-bio-chip[data-place="shenzhen"]'`. Card copy is `2017–2018 research transit-oriented development.`
- **London.** Run `control-ulysse browser click --selector '.uh-bio-chip[data-place="london"]'`. Card copy is `2019–2020 UCL, MSc Digital Anthropology (distinction / Dean’s list). Talked to a lot of people and wrote about them.`
- **Copenhagen.** Run `control-ulysse browser click --selector '.uh-bio-chip[data-place="copenhagen"]'`. Card copy is `From ~Jun 2022: product management → AI product management.`
- **Toggle closed.** Click the open city’s chip again. `#uh-bio-card` is hidden and every chip has `aria-expanded="false"`.
- **No Gantt / no badge / no lightbox.** Dump the page. Run `control-ulysse browser dump --path artifacts/bio-map-chips/bio-closed-dump.json`. `ganttCount` is `0`, `boxCount` is `0`, `lightboxCount` is `0`, `webflowBadgeVisible` is false.
- **Mobile dock.** Set 390×844 and open Hong Kong. Run `control-ulysse browser viewport --width 390 --height 844` and `control-ulysse browser click --selector '.uh-bio-chip[data-place="hong-kong"]'`. The card is visible with the Hong Kong copy and its box sits below the map.
- **Packaged drive.** Run `control-ulysse drive --feature bio-map-chips --evidence "$EVIDENCE_DIR"`. `RESULT.json` has `ok: true` and one screenshot per opened city plus `bio-mobile-hong-kong.png`. There is no `bio-lightbox.png`.

## Gotchas

- Chip `data-place` values are `paris`, `hong-kong`, `bath`, `shanghai`, `chengdu`, `shenzhen`, `london`, `copenhagen`.
- Assert the rendered card copy, including en dashes, `lycée`, `Dean’s` (right single quote), `Cushman & Wakefield`, and `→`.
- The card is `#uh-bio-card`, not a `<details>` box. Closed means `hidden`, not `open === false`.
- Clicking a chip that is already open closes the card. Click the next city from a known closed or other-city state.
- `#uh-bio` sits below a tall hero. Scroll it into view before screenshotting.
- Fail on **visible** “Made in Webflow”, not merely on a `.w-webflow-badge` node with `display:none`.
- A Bio screenshot that still shows “View full timeline” or a Gantt JPEG fails this feature.
- Do not invent extra biography. If the card text drifts from the feature bullets, the fold is wrong.
