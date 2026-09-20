import { SPINE, placeById, type PlaceId } from '../places'
import { Note } from './Note'
import './shared.css'
import './StampSpine.css'

export function StampSpine({
  place,
  onPlace,
}: {
  place: PlaceId | null
  onPlace: (id: PlaceId | null) => void
}) {
  return (
    <div className="sv stamp">
      <p className="sv-lede">
        A photograph of the place is the station. Wikimedia stills, not personal
        pictures. Click a stamp for the note.
      </p>
      <ol className="sv-list">
        {SPINE.map((group) => (
          <li key={group.year} className="sv-group">
            <time dateTime={group.year}>{group.year}</time>
            <div className="sv-rail" aria-hidden="true" />
            <div className="stamp-col">
              <div
                className={
                  group.ids.length > 1 ? 'stamp-row stamp-row-many' : 'stamp-row'
                }
              >
                {group.ids.map((id) => {
                  const item = placeById(id)
                  const open = place === id
                  return (
                    <article key={id} className={open ? 'stamp-card is-open' : 'stamp-card'}>
                      <button
                        type="button"
                        aria-expanded={open}
                        onClick={() => onPlace(open ? null : id)}
                      >
                        <img
                          src={`/stills/${id}.jpg`}
                          alt=""
                        />
                        <span className="stamp-dot" aria-hidden="true" />
                        <span className="stamp-cap">
                          <b>{item.name}</b>
                          <i>{item.years}</i>
                        </span>
                      </button>
                    </article>
                  )
                })}
              </div>
              {place && group.ids.includes(place) ? (
                <Note id={place} copy={placeById(place).copy} />
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
