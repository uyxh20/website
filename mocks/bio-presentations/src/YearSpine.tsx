import {
  FLAG_SRC,
  SPINE_GROUPS,
  spineStationById,
  type SpineStationId,
} from './places'
import './YearSpine.css'

export function YearSpine({
  station,
  onStation,
}: {
  station: SpineStationId | null
  onStation: (id: SpineStationId | null) => void
}) {
  return (
    <div className="spine">
      <p className="spine-lede">
        Read top to bottom. Hong Kong returns along the rail. Click a station
        for the note.
      </p>
      <ol className="spine-list">
        {SPINE_GROUPS.map((group) => (
          <li key={group.key} className="spine-group">
            {group.year ? (
              <time className="spine-year" dateTime={group.year}>
                {group.year}
              </time>
            ) : (
              <span className="spine-year" />
            )}
            <div className="spine-rail" aria-hidden="true" />
            <div className="spine-stations">
              {group.ids.map((id) => {
                const item = spineStationById(id)
                const open = station === id
                return (
                  <article
                    key={id}
                    data-station={id}
                    className={open ? 'spine-station is-open' : 'spine-station'}
                  >
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={`spine-note-${id}`}
                      onClick={() => onStation(open ? null : id)}
                    >
                      <img
                        className="spine-flag"
                        src={FLAG_SRC[item.placeId]}
                        alt=""
                        aria-hidden="true"
                      />
                      <span className="spine-name">{item.name}</span>
                      <span className="spine-meta">{item.line}</span>
                    </button>
                    {open ? (
                      <p className="spine-note" id={`spine-note-${id}`}>
                        {item.copy}
                      </p>
                    ) : null}
                  </article>
                )
              })}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
