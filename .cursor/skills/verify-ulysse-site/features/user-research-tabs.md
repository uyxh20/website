# User Research tabs

User Research is the Webflow tab set under `h1.heading-5`, with four projects the user can switch without leaving `/`.

## Sub-features

- `uxr-default` shows Sales Tool (SFA) as the current tab (`data-w-tab="CS Marketplace"`).
- `uxr-sfa` shows the SFA pane copy including UX Researcher @ Carlsberg Group Digital Studio.
- `uxr-cadi` switches to B2B Marketplace (`data-w-tab="Cadi"`).
- `uxr-journey` switches to Global Customer Journey (`data-w-tab="Journey Mapping"`).
- `uxr-ucl` switches to Graduate Research (`data-w-tab="UCL"`).

## How to get to it (user POV)

- Scroll past Face to **User Research**.
- Choose **Sales Tool (SFA)**, **B2B Marketplace**, **Global Customer Journey**, or **Graduate Research**.

## Driving it with control-ulysse

Preconditions:

- The site is healthy at the isolated URL from `control-ulysse doctor`.
- Viewport 1440×900.
- Webflow’s tab script has loaded (the tab menu is visible).

- **Default tab.** Open `/` and scroll to User Research. Run `control-ulysse browser goto --path /`. `a.w-tab-link.w--current` has `data-w-tab="CS Marketplace"` and the visible pane mentions `UX Researcher @ Carlsberg Group Digital Studio`.
- **B2B Marketplace.** Choose that tab. Run `control-ulysse browser click --selector 'a.w-tab-link[data-w-tab="Cadi"]'`. That link has `w--current`, the pane `[data-w-tab="Cadi"]` has `w--tab-active`, and its text includes `B2B e-com`.
- **Global Customer Journey.** Run `control-ulysse browser click --selector 'a.w-tab-link[data-w-tab="Journey Mapping"]'`. The active pane includes `Data integration project manager`.
- **Graduate Research.** Run `control-ulysse browser click --selector 'a.w-tab-link[data-w-tab="UCL"]'`. The active pane includes `User Researcher @ Carlsberg Group`.
- **Proof.** Screenshot `.uxr-tabs` after each switch. Run `control-ulysse drive --feature user-research-tabs --evidence "$EVIDENCE_DIR"`. `RESULT.json` has `ok: true`.

## Gotchas

- Visible labels are not the `data-w-tab` values. **B2B Marketplace** is `Cadi`; **Sales Tool (SFA)** is `CS Marketplace`; **Graduate Research** is `UCL`. Click by `data-w-tab`.
- The B2B label uses a non-breaking space (`B2B Marketplace`). Do not click by exact innerText `B2B Marketplace` with a normal space.
- Tab panes stay in the DOM. Assert `w--tab-active` / `w--current`, not merely that the copy exists somewhere.
- Webflow tabs need the page’s JS. A dump of raw HTML from `GET /` cannot prove a switch.
- Heading text is `User Research ` with a trailing space. Use `h1.heading-5`.
