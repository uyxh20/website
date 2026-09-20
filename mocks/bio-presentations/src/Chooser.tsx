import type { PlaceId } from './places'
import type { SpineVisualId, VariantId } from './variants'
import './Chooser.css'

export function Chooser({
  onOpenVariant,
  onOpenVisual,
}: {
  onOpenVariant: (variant: VariantId, place?: PlaceId | null) => void
  onOpenVisual: (visual: SpineVisualId, place?: PlaceId | null) => void
}) {
  return (
    <div className="chooser">
      <header className="chooser-head">
        <p className="chooser-mark">Standalone mocks</p>
        <h1>Bio</h1>
        <p className="chooser-lede">
          Same eight places, same copy. U H picked the year spine (flags, Hong
          Kong more than once on the rail). The first four layouts stay here;
          the second set is that spine made more visual.
        </p>
      </header>
      <p className="chooser-k">Four presentations</p>
      <ol className="chooser-list">
        {CHOICES.map((choice) => (
          <li key={choice.id}>
            <a
              href={`/?v=${choice.id}`}
              onClick={(event) => {
                event.preventDefault()
                onOpenVariant(choice.id)
              }}
            >
              <span className="chooser-n">{choice.id}</span>
              <span className="chooser-copy">
                <strong>{choice.label}</strong>
                <em>{choice.blurb}</em>
              </span>
            </a>
          </li>
        ))}
      </ol>
      <p className="chooser-k">Year spine, more visual</p>
      <ol className="chooser-list">
        {VISUALS.map((choice) => (
          <li key={choice.id}>
            <a
              href={`/?sv=${choice.id}`}
              onClick={(event) => {
                event.preventDefault()
                onOpenVisual(choice.id)
              }}
            >
              <span className="chooser-n">{choice.id}</span>
              <span className="chooser-copy">
                <strong>{choice.label}</strong>
                <em>{choice.blurb}</em>
              </span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  )
}

const CHOICES: { id: VariantId; label: string; blurb: string }[] = [
  {
    id: 1,
    label: 'Year spine',
    blurb:
      'The picked structure: time as a vertical rail, flags at each station, Hong Kong returns along the rail.',
  },
  {
    id: 2,
    label: 'Place directory',
    blurb: 'A gazetteer: names on the left, the entry on the right.',
  },
  {
    id: 3,
    label: 'Chapter reader',
    blurb: 'One city to a page. Turn forward or pick a name.',
  },
  {
    id: 4,
    label: 'Field ledger',
    blurb: 'A log of place, years, and a line. Open a row for the rest.',
  },
]

const VISUALS: { id: SpineVisualId; label: string; blurb: string }[] = [
  {
    id: 1,
    label: 'Stills',
    blurb: 'A photograph of the place is the station mark.',
  },
  {
    id: 2,
    label: 'Locator maps',
    blurb: 'A regional map at each year. 2017 is one China map with four pins.',
  },
  {
    id: 3,
    label: 'Duration',
    blurb: 'Gaps follow the years. Coral bars are the spans in the copy.',
  },
  {
    id: 4,
    label: 'Europe / Asia',
    blurb: 'Europe left, Asia right. The rail in the middle is still time.',
  },
]
