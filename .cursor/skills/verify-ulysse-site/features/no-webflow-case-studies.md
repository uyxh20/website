# No Webflow case studies

The old Webflow case-study stack is gone: User Research, program management, Communication, and Ops Optimisation are not on `/`.

## Sub-features

- `no-user-research` keeps `h1.heading-5` User Research and `.uxr-tabs` out of the document.
- `no-program-management` keeps PROGRAM MANAGEMENT and `.program-tabs` out of the document.
- `no-communication` keeps the Communication case-study heading out of the document.
- `no-ops` keeps Ops Optimisation and `.ops-tabs` out of the document.

## How to get to it (user POV)

- Open `/` and scroll past Portfolio / Face. The page ends after the Face iframe; there is no second case-study stack.

## Driving it with control-ulysse

Preconditions:

- The site is healthy at the isolated URL from `control-ulysse doctor`.
- Viewport 1440×900.

- **Dump headings.** Open `/`. Run `control-ulysse browser goto --path /` then `control-ulysse browser dump --path artifacts/no-webflow-case-studies/no-case-studies-dump.json`. Headings do not include User Research, PROGRAM MANAGEMENT, Communication, or Ops Optimisation.
- **No tab widgets.** `.uxr-tabs`, `.program-tabs`, and `.ops-tabs` counts are 0.
- **Packaged drive.** Run `control-ulysse drive --feature no-webflow-case-studies --evidence "$EVIDENCE_DIR"`. `RESULT.json` has `ok: true`. The old `--feature user-research-tabs` id runs the same absence checks.

## Gotchas

- “Communication” as a nav-adjacent word is fine; the removed block is `h1.heading-5` Communication.
- Do not treat a 404 on a deleted screenshot selector as a pass. Assert the headings list and tab-widget counts.
- Independent QA of the In-Between pass is a separate session; this file is the recipe for that session.
