# Ulysse Ha — personal site

Owned-code site for U H. Replaces [the Webflow site](https://ulysseh.webflow.io/) and hosts the interactive AI product portfolio from the private GitHub repo `uyxh20/Face` (the `FaceSo` URL does not exist).

## What’s here

- **Work (`/`)** — the Face interactive dashboard (seven product journeys), unchanged HTML, served from this repo.
- **Background (`/background`)** — research, programs, comms, and ops copy taken off Webflow.
- **Writings (`/writings`)** — Medium.

No auth, no database. Domain and hosting are later.

## Run locally

```bash
npm install
npm run dev
```

Dev server: [http://127.0.0.1:43141](http://127.0.0.1:43141)

```bash
npm run build
npm start -- --port 43141
```

## Stack

Next.js, TypeScript, Tailwind CSS, shadcn/ui.
