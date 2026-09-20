import type { PlaceId } from '../places'

export function Note({
  id,
  copy,
}: {
  id: PlaceId
  copy: string
}) {
  return (
    <p className="sv-note" id={`sv-note-${id}`}>
      {copy}
    </p>
  )
}
