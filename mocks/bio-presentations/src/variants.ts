export const VARIANTS = [
  { id: 1, slug: 'spine', label: 'Year spine' },
  { id: 2, slug: 'directory', label: 'Place directory' },
  { id: 3, slug: 'chapters', label: 'Chapter reader' },
  { id: 4, slug: 'ledger', label: 'Field ledger' },
] as const

export type VariantId = (typeof VARIANTS)[number]['id']

export const SPINE_VISUALS = [
  { id: 1, slug: 'stills', label: 'Stills' },
  { id: 2, slug: 'maps', label: 'Locator maps' },
  { id: 3, slug: 'duration', label: 'Duration' },
  { id: 4, slug: 'route', label: 'Europe / Asia' },
] as const

export type SpineVisualId = (typeof SPINE_VISUALS)[number]['id']
