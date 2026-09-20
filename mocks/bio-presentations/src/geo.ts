import type { PlaceId } from './places'

/** City locations — geography, not biography. */
export const GEO: Record<PlaceId, { lon: number; lat: number; side: 'europe' | 'asia' }> = {
  paris: { lon: 2.35, lat: 48.86, side: 'europe' },
  bath: { lon: -2.36, lat: 51.38, side: 'europe' },
  london: { lon: -0.13, lat: 51.51, side: 'europe' },
  copenhagen: { lon: 12.57, lat: 55.68, side: 'europe' },
  shanghai: { lon: 121.47, lat: 31.23, side: 'asia' },
  chengdu: { lon: 104.06, lat: 30.67, side: 'asia' },
  shenzhen: { lon: 114.06, lat: 22.54, side: 'asia' },
  'hong-kong': { lon: 114.17, lat: 22.32, side: 'asia' },
}

/** Year spans taken only from bio-map.md copy. `end: null` = “From ~Jun 2022”. */
export type Span = { start: number; end: number | null }

export const SPANS: Record<PlaceId, Span[]> = {
  paris: [{ start: 2011, end: 2015 }],
  bath: [{ start: 2015, end: 2019 }],
  shanghai: [{ start: 2017, end: 2018 }],
  chengdu: [{ start: 2017, end: 2018 }],
  shenzhen: [{ start: 2017, end: 2018 }],
  'hong-kong': [
    { start: 2017, end: 2018 },
    { start: 2021, end: 2021 },
    { start: 2021.75, end: 2022.5 },
  ],
  london: [{ start: 2019, end: 2020 }],
  copenhagen: [{ start: 2022.5, end: null }],
}

export const YEAR_START = 2011
export const YEAR_END = 2026

export function spanYears(span: Span): number {
  if (span.end == null) return YEAR_END - span.start
  if (span.end === span.start) return 0.35
  return Math.max(0.35, span.end - span.start)
}
