import { PLACES, placeById, type PlaceId } from './places'
import './Directory.css'

export function Directory({
  place,
  onPlace,
}: {
  place: PlaceId | null
  onPlace: (id: PlaceId | null) => void
}) {
  const current = placeById(place ?? 'paris')

  return (
    <div className="directory">
      <nav className="dir-index" aria-label="Places">
        {PLACES.map((item) => {
          const selected = item.id === current.id
          return (
            <button
              key={item.id}
              type="button"
              className={selected ? 'is-selected' : undefined}
              aria-current={selected ? 'true' : undefined}
              onClick={() => onPlace(item.id)}
            >
              <span className="dir-n">{item.n}</span>
              <span className="dir-index-name">{item.name}</span>
              <span className="dir-index-years">{item.years}</span>
              <span className="dir-index-line">{item.line}</span>
            </button>
          )
        })}
      </nav>
      <article className="dir-entry" aria-live="polite">
        <p className="dir-entry-n">{current.n} / 08</p>
        <h2>{current.name}</h2>
        <p className="dir-entry-years">{current.years}</p>
        <p className="dir-entry-copy">{current.copy}</p>
      </article>
    </div>
  )
}
