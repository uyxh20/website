import { SPINE, placeById, type PlaceId } from '../places'
import { SPANS, spanYears, type Span } from '../geo'
import { Note } from './Note'
import './shared.css'
import './DurationSpine.css'

export function DurationSpine({
  place,
  onPlace,
}: {
  place: PlaceId | null
  onPlace: (id: PlaceId | null) => void
}) {
  return (
    <div className="sv duration">
      <p className="sv-lede">
        Gaps follow the years in the copy. Coral marks are the spans — Hong Kong
        has three, Copenhagen stays open. Click a station for the note.
      </p>
      <ol className="sv-list duration-list">
        {SPINE.map((group, index) => {
          const prev = index === 0 ? Number(group.year) : Number(SPINE[index - 1].year)
          const gap = index === 0 ? 0 : (Number(group.year) - prev) * 26
          return (
            <li
              key={group.year}
              className="sv-group"
              style={{ marginTop: gap }}
            >
              <time dateTime={group.year}>{group.year}</time>
              <div className="sv-rail" aria-hidden="true" />
              <div className="dur-stations">
                {group.ids.map((id) => {
                  const item = placeById(id)
                  const open = place === id
                  return (
                    <article
                      key={id}
                      className={open ? 'dur-station is-open' : 'dur-station'}
                    >
                      <button
                        type="button"
                        aria-expanded={open}
                        onClick={() => onPlace(open ? null : id)}
                      >
                        <span className="dur-dot" aria-hidden="true" />
                        <span className="dur-name">{item.name}</span>
                        <span className="dur-bars" aria-hidden="true">
                          {SPANS[id].map((span, spanIndex) => (
                            <Bar key={spanIndex} span={span} />
                          ))}
                        </span>
                      </button>
                      {open ? <Note id={id} copy={item.copy} /> : null}
                    </article>
                  )
                })}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function Bar({ span }: { span: Span }) {
  const years = spanYears(span)
  const open = span.end == null
  const width = Math.round(years * 28)
  return (
    <span
      className={open ? 'dur-bar is-open-end' : 'dur-bar'}
      style={{ width: Math.max(10, width) }}
    />
  )
}
