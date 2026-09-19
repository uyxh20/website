# Portfolio folders mock

Standalone clickable mock of **Portfolio** as hanging-file folders. Aesthetic follows [Inspora 8-1 / File cabinet slide](https://www.inspora.design/posts/8-1) (trapezoid “eye” tabs, one open folder at a time). This is **not** wired into `public/site.html`.

Seven exact product titles plus the existing portfolio category, status and project-hook copy — no invented biography, metrics or links. An open folder shows a compact project brief.

## Run

```bash
cd mocks/portfolio-folders
npm install
npm run dev
```

Preview: [http://127.0.0.1:45621](http://127.0.0.1:45621) — **left tabs** (default).

Previous zigzag: [http://127.0.0.1:45621/?tabs=alt](http://127.0.0.1:45621/?tabs=alt)

Click a folder tab (or the hanging-file header) to expand it. Click again to close. Opening another folder closes the current one. Optional deep link: `/?open=01` through `/?open=07`.
