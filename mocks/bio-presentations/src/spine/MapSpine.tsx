import type { ComponentType } from 'react'
import { SPINE, placeById, type PlaceId } from '../places'
import {
  MapBritainBath,
  MapBritainLondon,
  MapChina,
  MapDenmark,
  MapFrance,
} from './locators'
import { Note } from './Note'
import './shared.css'
import './MapSpine.css'

export function MapSpine({
  place,
  onPlace,
}: {
  place: PlaceId | null
  onPlace: (id: PlaceId | null) => void
}) {
  return (
    <div className="sv maps">
      <p className="sv-lede">
        Each year gets a locator. 2017 is one map: Shanghai, Chengdu, Shenzhen,
        Hong Kong. Click a pin for the note.
      </p>
      <ol className="sv-list">
        {SPINE.map((group) => {
          const Map = MAPS[group.year]
          const openId = group.ids.find((id) => id === place) ?? null
          const openItem = openId ? placeById(openId) : null
          return (
            <li key={group.year} className="sv-group">
              <time dateTime={group.year}>{group.year}</time>
              <div className="sv-rail" aria-hidden="true" />
              <div className="map-station">
                <span className="map-dot" aria-hidden="true" />
                {Map ? (
                  <Map
                    active={openId}
                    onPin={(id) => onPlace(openId === id ? null : id)}
                  />
                ) : null}
                {openItem ? <Note id={openItem.id} copy={openItem.copy} /> : null}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

const MAPS: Record<
  string,
  ComponentType<{ active: PlaceId | null; onPin: (id: PlaceId) => void }>
> = {
  '2011': MapFrance,
  '2015': MapBritainBath,
  '2017': MapChina,
  '2019': MapBritainLondon,
  '2022': MapDenmark,
}
