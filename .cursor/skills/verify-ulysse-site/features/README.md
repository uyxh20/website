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
- Mutation here is in-page only (`#uh-bio-card` `hidden`/`data-place`, specimen `hidden`). Re-read those attributes after the click.
- Record the feature ID in the evidence folder.
- Report an unreachable path with the attempted selector and the unmet precondition.
- Do not report a skipped city or specimen as verified through a different one.

## Features

- [Home carbon copy](./home-carbon-copy.md) covers `/` rewriting to `site.html`, the In-Between hero, Bio heading, Portfolio, and no visible Made in Webflow badge.
- [Bio map chips](./bio-map-chips.md) covers eight city chips, popover/docked cards, a two-thirds map, no Gantt, and no Timeline lightbox.
- [Face iframe](./face-iframe.md) covers the portfolio iframe under Portfolio, the seven specimens, and click-to-filter.
- [No Webflow case studies](./no-webflow-case-studies.md) covers deletion of User Research through Ops Optimisation.
