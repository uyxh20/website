import { PLACES, type PlaceId } from './places'
import './Ledger.css'

export function Ledger({
  place,
  onPlace,
}: {
  place: PlaceId | null
  onPlace: (id: PlaceId | null) => void
}) {
  return (
    <div className="ledger">
      <p className="ledger-lede">
        Field log. Each row is a place, its years, and a line from the note.
        Click a row for the full text.
      </p>
      <div className="ledger-sheet" role="table" aria-label="Places">
        <div className="ledger-head" role="row">
          <span role="columnheader">No.</span>
          <span role="columnheader">Place</span>
          <span role="columnheader">Years</span>
          <span role="columnheader">Line</span>
        </div>
        {PLACES.map((item) => {
          const open = place === item.id
          return (
            <div
              key={item.id}
              className={open ? 'ledger-item is-open' : 'ledger-item'}
              role="row"
            >
              <button
                type="button"
                aria-expanded={open}
                onClick={() => onPlace(open ? null : item.id)}
              >
                <span className="ledger-num">{item.n}</span>
                <span className="ledger-place">{item.name}</span>
                <span className="ledger-years">{item.years}</span>
                <span className="ledger-line">{item.line}</span>
              </button>
              {open ? (
                <p className="ledger-copy" role="cell">
                  {item.copy}
                </p>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}
