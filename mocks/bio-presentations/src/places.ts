export const PLACE_IDS = [
  'paris',
  'hong-kong',
  'bath',
  'shanghai',
  'chengdu',
  'shenzhen',
  'london',
  'copenhagen',
] as const

export type PlaceId = (typeof PLACE_IDS)[number]

export type Place = {
  id: PlaceId
  n: string
  name: string
  years: string
  line: string
  copy: string
}

/** Exact Bio copy from docs/bio-map.md. Years and lines are sliced from that copy, not invented. */
export const PLACES: Place[] = [
  {
    id: 'paris',
    n: '01',
    name: 'Paris',
    years: '2011–2015',
    line: 'Born there; formative years in lycée.',
    copy: 'Born there; formative years in lycée 2011–2015.',
  },
  {
    id: 'hong-kong',
    n: '02',
    name: 'Hong Kong',
    years: '2017–2018 · 2021 · ~Sep 2021–mid 2022',
    line: 'Grew up. Back home for some stints plus placement.',
    copy: 'Grew up. Back home for some stints plus placement: 2017–2018; urban planning internship with Cushman, worked around China. 2021: did market research professionally for companies like Google/Tencent, realised that was the quickest way to kill passion. Then ~Sep 2021–mid 2022: Carlsberg digital graduate program, first post-grad job, ~8 months in the HK office (ERP and CRM rollout).',
  },
  {
    id: 'bath',
    n: '03',
    name: 'Bath',
    years: '2015–2019',
    line: 'University of Bath, BSc Sociology. Read a lot of text.',
    copy: '2015–2019 University of Bath, BSc Sociology. Read a lot of text.',
  },
  {
    id: 'shanghai',
    n: '04',
    name: 'Shanghai',
    years: '2017–2018',
    line: 'Placement year with Cushman & Wakefield. Research transit-oriented development.',
    copy: '2017–2018 placement year with Cushman & Wakefield. Research transit-oriented development.',
  },
  {
    id: 'chengdu',
    n: '05',
    name: 'Chengdu',
    years: '2017–2018',
    line: 'Research transit-oriented development.',
    copy: '2017–2018 research transit-oriented development.',
  },
  {
    id: 'shenzhen',
    n: '06',
    name: 'Shenzhen',
    years: '2017–2018',
    line: 'Research transit-oriented development.',
    copy: '2017–2018 research transit-oriented development.',
  },
  {
    id: 'london',
    n: '07',
    name: 'London',
    years: '2019–2020',
    line: 'UCL, MSc Digital Anthropology (distinction / Dean’s list). Talked to a lot of people and wrote about them.',
    copy: '2019–2020 UCL, MSc Digital Anthropology (distinction / Dean’s list). Talked to a lot of people and wrote about them.',
  },
  {
    id: 'copenhagen',
    n: '08',
    name: 'Copenhagen',
    years: 'From ~Jun 2022',
    line: 'Product management → AI product management.',
    copy: 'From ~Jun 2022: product management → AI product management.',
  },
]

export const PLACE_BY_ID: Record<PlaceId, Place> = Object.fromEntries(
  PLACES.map((place) => [place.id, place]),
) as Record<PlaceId, Place>

/** First dated year in the copy — used by the visual spines (`/?sv=`). HK stays in the 2017 group there. */
export const SPINE: { year: string; ids: PlaceId[] }[] = [
  { year: '2011', ids: ['paris'] },
  { year: '2015', ids: ['bath'] },
  { year: '2017', ids: ['shanghai', 'chengdu', 'shenzhen', 'hong-kong'] },
  { year: '2019', ids: ['london'] },
  { year: '2022', ids: ['copenhagen'] },
]

export const FLAG_SRC: Record<PlaceId, string> = {
  paris: '/flags/france.svg',
  bath: '/flags/uk.svg',
  london: '/flags/uk.svg',
  copenhagen: '/flags/denmark.svg',
  shanghai: '/flags/china.svg',
  chengdu: '/flags/china.svg',
  shenzhen: '/flags/china.svg',
  'hong-kong': '/flags/hong-kong.svg',
}

/**
 * Year spine (`/?v=1`) stations. Hong Kong is four stops, copy sliced from the
 * single HK note — nothing added. Other layouts still use one `hong-kong` place.
 */
export const SPINE_STATION_IDS = [
  'hong-kong-grew',
  'paris',
  'hong-kong-stints',
  'bath',
  'shanghai',
  'chengdu',
  'shenzhen',
  'hong-kong-placement',
  'london',
  'hong-kong-office',
  'copenhagen',
] as const

export type SpineStationId = (typeof SPINE_STATION_IDS)[number]

export type SpineStation = {
  id: SpineStationId
  placeId: PlaceId
  name: string
  /** Left-column year. Empty when that slice of the note has no year. */
  year: string
  years: string
  line: string
  copy: string
}

export const SPINE_STATIONS: SpineStation[] = [
  {
    id: 'hong-kong-grew',
    placeId: 'hong-kong',
    name: 'Hong Kong',
    year: '',
    years: '',
    line: 'Grew up.',
    copy: 'Grew up.',
  },
  {
    id: 'paris',
    placeId: 'paris',
    name: 'Paris',
    year: '2011',
    years: '2011–2015',
    line: 'Born there; formative years in lycée.',
    copy: 'Born there; formative years in lycée 2011–2015.',
  },
  {
    id: 'hong-kong-stints',
    placeId: 'hong-kong',
    name: 'Hong Kong',
    year: '',
    years: '',
    line: 'Back home for some stints',
    copy: 'Back home for some stints',
  },
  {
    id: 'bath',
    placeId: 'bath',
    name: 'Bath',
    year: '2015',
    years: '2015–2019',
    line: 'University of Bath, BSc Sociology. Read a lot of text.',
    copy: '2015–2019 University of Bath, BSc Sociology. Read a lot of text.',
  },
  {
    id: 'shanghai',
    placeId: 'shanghai',
    name: 'Shanghai',
    year: '2017',
    years: '2017–2018',
    line: 'Placement year with Cushman & Wakefield. Research transit-oriented development.',
    copy: '2017–2018 placement year with Cushman & Wakefield. Research transit-oriented development.',
  },
  {
    id: 'chengdu',
    placeId: 'chengdu',
    name: 'Chengdu',
    year: '2017',
    years: '2017–2018',
    line: 'Research transit-oriented development.',
    copy: '2017–2018 research transit-oriented development.',
  },
  {
    id: 'shenzhen',
    placeId: 'shenzhen',
    name: 'Shenzhen',
    year: '2017',
    years: '2017–2018',
    line: 'Research transit-oriented development.',
    copy: '2017–2018 research transit-oriented development.',
  },
  {
    id: 'hong-kong-placement',
    placeId: 'hong-kong',
    name: 'Hong Kong',
    year: '',
    years: '2017–2018',
    line: 'urban planning internship with Cushman, worked around China.',
    copy: 'placement: 2017–2018; urban planning internship with Cushman, worked around China.',
  },
  {
    id: 'london',
    placeId: 'london',
    name: 'London',
    year: '2019',
    years: '2019–2020',
    line: 'UCL, MSc Digital Anthropology (distinction / Dean’s list). Talked to a lot of people and wrote about them.',
    copy: '2019–2020 UCL, MSc Digital Anthropology (distinction / Dean’s list). Talked to a lot of people and wrote about them.',
  },
  {
    id: 'hong-kong-office',
    placeId: 'hong-kong',
    name: 'Hong Kong',
    year: '2021',
    years: '2021 · ~Sep 2021–mid 2022',
    line: 'did market research professionally for companies like Google/Tencent, realised that was the quickest way to kill passion.',
    copy: '2021: did market research professionally for companies like Google/Tencent, realised that was the quickest way to kill passion. Then ~Sep 2021–mid 2022: Carlsberg digital graduate program, first post-grad job, ~8 months in the HK office (ERP and CRM rollout).',
  },
  {
    id: 'copenhagen',
    placeId: 'copenhagen',
    name: 'Copenhagen',
    year: '2022',
    years: 'From ~Jun 2022',
    line: 'Product management → AI product management.',
    copy: 'From ~Jun 2022: product management → AI product management.',
  },
]

export const SPINE_STATION_BY_ID: Record<SpineStationId, SpineStation> =
  Object.fromEntries(SPINE_STATIONS.map((station) => [station.id, station])) as Record<
    SpineStationId,
    SpineStation
  >

/** Year-spine groups. HK is never stacked with the 2017 China cities. */
export const SPINE_GROUPS: { key: string; year: string; ids: SpineStationId[] }[] = [
  { key: 'hong-kong-grew', year: '', ids: ['hong-kong-grew'] },
  { key: 'paris', year: '2011', ids: ['paris'] },
  { key: 'hong-kong-stints', year: '', ids: ['hong-kong-stints'] },
  { key: 'bath', year: '2015', ids: ['bath'] },
  { key: 'china-2017', year: '2017', ids: ['shanghai', 'chengdu', 'shenzhen'] },
  { key: 'hong-kong-placement', year: '', ids: ['hong-kong-placement'] },
  { key: 'london', year: '2019', ids: ['london'] },
  { key: 'hong-kong-office', year: '2021', ids: ['hong-kong-office'] },
  { key: 'copenhagen', year: '2022', ids: ['copenhagen'] },
]

export function isPlaceId(value: string | null): value is PlaceId {
  return PLACE_IDS.includes(value as PlaceId)
}

export function isSpineStationId(value: string | null): value is SpineStationId {
  return SPINE_STATION_IDS.includes(value as SpineStationId)
}

export function placeById(id: PlaceId): Place {
  return PLACE_BY_ID[id]
}

export function spineStationById(id: SpineStationId): SpineStation {
  return SPINE_STATION_BY_ID[id]
}

/** Map a year-spine station id back to the single place used by the other layouts. */
export function asPlaceId(value: string | null): PlaceId | null {
  if (!value) return null
  if (isPlaceId(value)) return value
  if (isSpineStationId(value)) return spineStationById(value).placeId
  return null
}
