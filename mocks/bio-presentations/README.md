# Bio presentations — standalone mocks

Four clickable layouts for the same Bio copy. Not on the live site. Not in `public/site.html`. Not the hanging-file Portfolio mock.

GitHub PR (do not merge): https://github.com/uyxh20/website/pull/7

Copy source: eight places from `docs/bio-map.md` (Paris, Hong Kong, Bath, Shanghai, Chengdu, Shenzhen, London, Copenhagen). No invented biography. Year spine (`/?v=1`) is the pick: flags, Hong Kong as four stations, years on the left rail only (no duplicate 2017 on the HK placement station; no `2011–2015 ·` prefixes in station lines).

## Run

```bash
cd mocks/bio-presentations
npm install
npm run dev
```

Port **46287** (`vite.config.ts`, `strictPort`). Do not use 43177 (the site) or 45621 (Portfolio folders).

- Chooser: `/`
- Year spine: `/?v=1` · Hong Kong is four stations (`&place=hong-kong-grew`, `hong-kong-stints`, `hong-kong-placement`, `hong-kong-office`)
- Place directory: `/?v=2`
- Chapter reader: `/?v=3`
- Field ledger: `/?v=4`
- Spine stills: `/?sv=1`
- Spine locator maps: `/?sv=2`
- Spine duration: `/?sv=3`
- Spine Europe / Asia: `/?sv=4`
