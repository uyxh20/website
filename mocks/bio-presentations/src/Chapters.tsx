import { useEffect } from 'react'
import { PLACE_IDS, PLACES, placeById, type PlaceId } from './places'
import './Chapters.css'

export function Chapters({
  place,
  onPlace,
}: {
  place: PlaceId | null
  onPlace: (id: PlaceId | null) => void
}) {
  const current = placeById(place ?? 'paris')
  const index = PLACE_IDS.indexOf(current.id)
  const prev = PLACES[(index + PLACES.length - 1) % PLACES.length]
  const next = PLACES[(index + 1) % PLACES.length]

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        onPlace(prev.id)
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        onPlace(next.id)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next.id, onPlace, prev.id])

  return (
    <article className="chapter">
      <p className="chapter-count">
        {current.n} <span>/ 08</span>
      </p>
      <h2>{current.name}</h2>
      <p className="chapter-years">{current.years}</p>
      {current.copy.length > current.line.length + 30 ? (
        <>
          <p className="chapter-line">{current.line}</p>
          <p className="chapter-copy">{current.copy}</p>
        </>
      ) : (
        <p className="chapter-copy">{current.copy}</p>
      )}
      <footer className="chapter-nav">
        <button type="button" className="chapter-turn" onClick={() => onPlace(prev.id)}>
          <span>Previous</span>
          {prev.name}
        </button>
        <ol>
          {PLACES.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                aria-label={item.name}
                aria-current={item.id === current.id ? 'page' : undefined}
                onClick={() => onPlace(item.id)}
              />
            </li>
          ))}
        </ol>
        <button type="button" className="chapter-turn" onClick={() => onPlace(next.id)}>
          <span>Next</span>
          {next.name}
        </button>
      </footer>
    </article>
  )
}
