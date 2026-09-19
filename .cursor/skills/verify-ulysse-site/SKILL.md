---
name: verify-ulysse-site
description: Drive the Ulysse H personal site (Webflow carbon copy at public/site.html, Next rewrite of / to that page, Bio map chips, Face iframe at /portfolio.html) in a real Chrome session. Use when proving Bio chips, Face specimens, User Research tabs, absence of Gantt or Made in Webflow, or any user-visible change on the served site.
---

# Verify Ulysse H site

Project-local control skill for the next agent. The user-facing app is a one-page site: Next.js serves `public/site.html` at `/` and embeds Face at `/portfolio.html`. There is no in-repo Playwright suite. Drive the **served** page, not `app/page.tsx` (that file returns `null`).

Export a run id before any command so launch, doctor, drive, and cleanup share state:

```bash
export ULYSSE_VERIFY_RUN=verify-local
export ULYSSE_VERIFY_REPO="$(pwd)"
```

`CONTROL` below is `.cursor/skills/verify-ulysse-site/helpers/control-ulysse` from the repo root.

## Launch

Install app deps if needed (`npm install` at the repo root). Then start an **isolated** Next instance. Do not attach to the README port `43177` or to an already-running preview on `43241`.

```bash
chmod +x .cursor/skills/verify-ulysse-site/helpers/control-ulysse
$CONTROL launch --port 43311 --run-id "$ULYSSE_VERIFY_RUN"
```

What this starts:

- `node_modules/.bin/next dev --port <port> --hostname 127.0.0.1` with `ULYSSE_VERIFY_DIST_DIR=.next-verify/<run-id>`. Next 16 exclusive-locks `<distDir>/lock` (the live preview uses `.next/dev/lock` on 43241). A second instance must not steal that lock and must not `kill` the preview pid.
- Headless Google Chrome (`$CHROME_PATH`, default `/usr/local/bin/google-chrome`) with a unique `--user-data-dir` under `/tmp/ulysse-verify-<run-id>/` and a CDP port.

Ready when `GET http://127.0.0.1:<port>/` returns **200**, `<title>Ulysse H</title>`, and the HTML contains `id="uh-bio"`. The helper blocks until that is true (about a minute on a cold Next compile) and prints JSON with `url`, `pid`, `chromePid`, `cdp`, and `runDir`.

Default isolated port is **43311**. If it is taken, the helper walks upward, skipping reserved ports `3000`, `5173`, `8080`, `43177`, `43241`.

Teardown is **Cleanup**, not `pkill next` / `pkill chrome`.

## Doctor

Read-only. Run this first whenever the instance looks wrong.

```bash
$CONTROL doctor
```

A healthy report has `ok: true` and these checks:

| Check | Pass means |
| --- | --- |
| `next-pid-alive` | The pid from state is running |
| `next-cmdline-owns-port` | `/proc/<pid>/cmdline` contains `--port <that port>` |
| `chrome-pid-alive` | The Chrome pid from state is running |
| `chrome-cmdline-owns-profile` | Chrome cmdline contains this run's `user-data-dir` |
| `http-200` | `GET <url>/` is 200 |
| `title-ulysse-h` | Document title is `Ulysse H` |
| `has-uh-bio` | Markup includes `#uh-bio` |
| `portfolio-http` | `GET <url>/portfolio.html` is 200 |
| `chrome-cdp` | `GET <cdp>/json/version` is 200 |

If doctor fails, **cleanup** (so the broken attempt does not keep the port) then **launch** again. Never drive some other Next process that happens to answer on 43177 or 43241.

## Drive

Harness: Playwright-core launches a short-lived headless Chrome for each `browser` / `drive` command against the isolated Next URL (`control-ulysse browser` / `control-ulysse drive`). Do not attach to the preview on 43241. Stable handles from `public/site.html` and `public/portfolio.html`:

| Handle | What it is |
| --- | --- |
| `h1.heading-8` | Hero “The Go-Between” |
| `h1.body` | “Bio” |
| `#uh-bio` | Bio widget root |
| `.uh-bio-map` | Dotted map (`aria-label` names the eight cities) |
| `.uh-bio-chip[data-place="paris"\|hong-kong\|bath\|shanghai\|chengdu\|shenzhen\|london\|copenhagen]` | Coral circle chips with city labels |
| `#uh-bio-card` | Popover card (desktop) / docked card (mobile) |
| `h1.heading-6` | “Past Projects” |
| `#uh-face-portfolio` | iframe `src="/portfolio.html"` |
| iframe `#specimen-01` … `#specimen-07` | Face specimens |
| `h1.heading-5` | “User Research” (trailing space in the heading text) |
| `a.w-tab-link[data-w-tab="Cadi"\|CS Marketplace\|Journey Mapping\|UCL]` | User Research tabs |

Recipe for one mapped feature (preferred):

```bash
$CONTROL drive --feature bio-map-chips --evidence "$EVIDENCE_DIR"
$CONTROL drive --feature home-carbon-copy --evidence "$EVIDENCE_DIR"
$CONTROL drive --feature face-iframe --evidence "$EVIDENCE_DIR"
$CONTROL drive --feature user-research-tabs --evidence "$EVIDENCE_DIR"
```

`--places paris` limits Bio chips to one city (enough for a first proof). Omit it to drive all eight.

Manual clicks when a feature file says so:

```bash
$CONTROL browser goto --path /
$CONTROL browser viewport --width 1440 --height 900
$CONTROL browser click --selector '.uh-bio-chip[data-place="hong-kong"]'
$CONTROL browser wait --selector '#uh-bio-card:not([hidden])'
$CONTROL browser screenshot --path "$EVIDENCE_DIR/bio-hong-kong-open.png" --selector '#uh-bio'
$CONTROL browser dump --path "$EVIDENCE_DIR/bio-hong-kong-dump.json"
$CONTROL browser click --selector 'a.w-tab-link[data-w-tab="Cadi"]'
$CONTROL browser click --selector '#specimen-02' --frame 'iframe#uh-face-portfolio'
```

Read the matching file under `features/` before driving. A proof that only hits one convenient entry point is incomplete when that file lists others.

Do not call `scripts/assemble-site.py --from-live` as part of verification; that re-fetches Webflow and can wipe Bio markup.

## Evidence

Proof lives in a directory **you** name. It is never under the launch scratch dir.

- Durable default for this workspace: `/cursor/stores/bc-d0271476-18e6-487d-adb2-3875ba4d3c0e/media/`
- Local default if you omit `--evidence`: `.cursor/skills/verify-ulysse-site/artifacts/<run-id>/<feature>/`

Each `drive` writes `RESULT.json` plus action/result screenshots and JSON dumps. Standards:

- Exercise the real page (`/` → `site.html`, clicks on chips/tabs). Do not stub Bio by setting card text from a test-only endpoint; there isn’t one.
- Capture the **action and the resulting state** (closed chips, then the opened card), not only the last frame.
- Side effects to verify: DOM (`#uh-bio-card` not hidden, `data-place`, `aria-expanded`, exclusive chips), HTTP 200 on `/` and `/portfolio.html`, **absence** of `.uh-bio-gantt`, `a.uh-bio-lightbox`, `Timeline.jpg` in Bio, and visible “Made in Webflow”.
- Mocks: none. Web fonts may still load from Google; that is the production boundary. Do not mock `portfolio.html`.
- Screenshots must show the Ulysse H page identity (hero, Bio heading, or Past Projects) plus the widget under test. Reject files under ~800 bytes.
- Record the feature id in the evidence folder name (`bio-map-chips/`, `home-carbon-copy/`, …).

## Cleanup

```bash
$CONTROL cleanup
```

Kills **only** the Next pid and Chrome pid recorded in `/tmp/ulysse-verify-<run-id>/state.json`, after checking `/proc/<pid>/cmdline` still matches `--port <port>` and this run’s Chrome user-data-dir. Then deletes that scratch directory.

Cleanup **does not** delete evidence. If `RESULT.json` or screenshots vanish after cleanup, the skill failed.

Never `pkill -f next`, `killall chrome`, or close the process on 43241/43177 unless doctor proved **this run** owns that pid.

After a failed launch/drive, still run cleanup before the next attempt.

## Helpers

`helpers/control-ulysse` is executable. `helpers/package.json` pins `playwright-core@1.55.0` (verification scaffolding; `npm install` in `helpers/` on first launch). Chrome is system Google Chrome, not Playwright’s downloaded browser.

```bash
$CONTROL launch --port 43311 --run-id "$ULYSSE_VERIFY_RUN"
$CONTROL doctor
$CONTROL drive --feature home-carbon-copy --evidence "$EVIDENCE_DIR"
$CONTROL cleanup
```

Feature recipes live in `features/`. Keep them honest with `/maintain-verification-skill` when the served markup changes.
