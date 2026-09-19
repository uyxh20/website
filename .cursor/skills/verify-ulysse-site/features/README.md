# Ulysse H verification map

This directory is the maintained source for verifying the user-facing behavior of the Ulysse H personal site. Read the index before driving the app, then use the matching feature file as the recipe.

## Baseline preconditions

- Launch an isolated Next instance with `control-ulysse launch --port 43311 --run-id "$ULYSSE_VERIFY_RUN"`.
- Doctor must report `http://127.0.0.1:<port>/`, title `Ulysse H`, `#uh-bio`, and `/portfolio.html` 200.
- Never drive 43177 or 43241 unless this run’s state pid owns that port.
- Put `control-ulysse` on your command path as `.cursor/skills/verify-ulysse-site/helpers/control-ulysse`.
- Do not run `scripts/assemble-site.py --from-live` during a proof.

## Driving conventions

- Start every recipe from `GET /` unless the feature’s preconditions say otherwise.
- Prefer `data-place`, `data-w-tab`, and element ids (`#uh-bio`, `#uh-face-portfolio`, `#specimen-01`) over coordinates.
- Treat every command as literal. Keep quoted selectors and city ids unchanged.
- Run page actions through `control-ulysse browser` or `control-ulysse drive --feature <id>`.
- Face interactions that target specimen DOM must pass `--frame iframe#uh-face-portfolio`.
- Restore nothing: the site is static. Cleanup removes the instance, not proof artifacts.

## Proof and skip reporting

- Capture the user action and the resulting state, not only the final screen.
- UI proof includes a JSON dump (`control-ulysse browser dump`) and a screenshot with page identity visible.
- Mutation here is in-page only (`details.open`, tab `w--current`, lightbox). Re-read those attributes after the click.
- Record the feature ID in the evidence folder.
- Report an unreachable path with the attempted selector and the unmet precondition.
- Do not report a skipped city, tab, or specimen as verified through a different one.

## Feature entry contract

Each feature file starts with an H1 title and one paragraph describing the user-visible behavior. It then uses exactly four H2 sections in this order.

1. `Sub-features` lists short IDs with one line for each behavior.
2. `How to get to it (user POV)` lists every user entry point.
3. `Driving it with control-ulysse` starts with `Preconditions:` and uses labeled bullets that pair each user action with an exact command and observable result.
4. `Gotchas` lists traps that can waste or invalidate a verification run.

Keep implementation details out of the map. Name only user paths, stable handles, required state, commands, and observable proof.

## Features

- [Home carbon copy](./home-carbon-copy.md) covers `/` rewriting to `site.html`, the Go-Between hero, Bio heading, and no visible Made in Webflow badge.
- [Bio map chips](./bio-map-chips.md) covers Hong Kong / London / Paris / Copenhagen chips, in-flow boxes, no Gantt, and View full timeline.
- [Face iframe](./face-iframe.md) covers the portfolio iframe under Past Projects and the seven specimens.
- [User Research tabs](./user-research-tabs.md) covers the four Webflow tabs under User Research.
