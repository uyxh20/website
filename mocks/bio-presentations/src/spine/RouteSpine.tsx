import { SPINE, placeById, type PlaceId } from '../places'
import { GEO } from '../geo'
import { Continents } from './locators'
import { Note } from './Note'
import './shared.css'
import './RouteSpine.css'

export function RouteSpine({
  place,
  onPlace,
}: {
  place: PlaceId | null
  onPlace: (id: PlaceId | null) => void
}) {
  return (
    <div className="sv route">
      <p className="sv-lede">
        Europe on the left, Asia on the right. The rail is still time. Click a
        station for the note.
      </p>
      <div className="route-board">
        <p className="route-col-label route-col-label-w">Europe</p>
        <p className="route-col-label route-col-label-e">Asia</p>
        <Continents />
        <ol className="route-list">
          {SPINE.map((group) => {
            const west = group.ids.filter((id) => GEO[id].side === 'europe')
            const east = group.ids.filter((id) => GEO[id].side === 'asia')
            return (
              <li key={group.year} className="route-group">
                <div className="route-side route-west">
                  {west.map((id) => (
                    <Station
                      key={id}
                      id={id}
                      open={place === id}
                      onPlace={onPlace}
                    />
                  ))}
                </div>
                <time dateTime={group.year}>{group.year}</time>
                <div className="sv-rail" aria-hidden="true" />
                <div className="route-side route-east">
                  {east.map((id) => (
                    <Station
                      key={id}
                      id={id}
                      open={place === id}
                      onPlace={onPlace}
                    />
                  ))}
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

function Station({
  id,
  open,
  onPlace,
}: {
  id: PlaceId
  open: boolean
  onPlace: (id: PlaceId | null) => void
}) {
  const item = placeById(id)
  const side = GEO[id].side
  return (
    <article className={`route-station route-${side}${open ? ' is-open' : ''}`}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => onPlace(open ? null : id)}
      >
        <span className="route-dot" aria-hidden="true" />
        <span className="route-copy">
          <span className="route-name">{item.name}</span>
          <span className="route-years">{item.years}</span>
        </span>
      </button>
      {open ? <Note id={id} copy={item.copy} /> : null}
    </article>
  )
}
