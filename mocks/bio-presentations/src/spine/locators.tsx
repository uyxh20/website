import type { ReactNode } from 'react'
import type { PlaceId } from '../places'
import './locators.css'

type Pin = { id: PlaceId; x: string; y: string; label: string; align?: 'left' | 'right' }

function Plate({
  children,
  pins,
  active,
  onPin,
  label,
}: {
  children: ReactNode
  pins: Pin[]
  active: PlaceId | null
  onPin: (id: PlaceId) => void
  label: string
}) {
  return (
    <div className="loc-plate" role="group" aria-label={label}>
      <svg viewBox="0 0 240 160" aria-hidden="true">
        {children}
      </svg>
      {pins.map((pin) => (
        <button
          key={pin.id}
          type="button"
          className={[
            'loc-pin',
            pin.align === 'left' ? 'loc-pin-left' : '',
            active === pin.id ? 'is-active' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          style={{ left: pin.x, top: pin.y }}
          aria-pressed={active === pin.id}
          onClick={(event) => {
            event.stopPropagation()
            onPin(pin.id)
          }}
        >
          <span className="loc-dot" />
          <span className="loc-lab">{pin.label}</span>
        </button>
      ))}
    </div>
  )
}

const land = { fill: '#f2f2f2', stroke: '#030303', strokeWidth: 1.2 }
const water = { fill: 'none', stroke: '#030303', strokeWidth: 0.6, strokeDasharray: '2 3' }

export function MapFrance({
  active,
  onPin,
}: {
  active: PlaceId | null
  onPin: (id: PlaceId) => void
}) {
  return (
    <Plate
      label="France"
      active={active}
      onPin={onPin}
      pins={[{ id: 'paris', x: '48%', y: '38%', label: 'Paris' }]}
    >
      <path
        d="M78 22 108 18l22 14 12 22-2 28-12 24-22 16-26 4-22-12-8-22 8-28 16-24z"
        style={land}
      />
      <path d="M132 118l10 6 2 10-8 4-8-4z" style={land} />
    </Plate>
  )
}

export function MapBritainBath({
  active,
  onPin,
}: {
  active: PlaceId | null
  onPin: (id: PlaceId) => void
}) {
  return (
    <Plate
      label="South-west England"
      active={active}
      onPin={onPin}
      pins={[{ id: 'bath', x: '42%', y: '58%', label: 'Bath', align: 'left' }]}
    >
      <path
        d="M96 14 118 20l12 18 4 28-6 26 8 22-12 18-20 8-16-6 2-22 6-28-10-24z"
        style={land}
      />
      <path d="M70 108l16 6 4 14-14 8-12-6z" style={land} />
    </Plate>
  )
}

export function MapBritainLondon({
  active,
  onPin,
}: {
  active: PlaceId | null
  onPin: (id: PlaceId) => void
}) {
  return (
    <Plate
      label="South-east England"
      active={active}
      onPin={onPin}
      pins={[{ id: 'london', x: '62%', y: '52%', label: 'London' }]}
    >
      <path
        d="M96 14 118 20l12 18 4 28-6 26 8 22-12 18-20 8-16-6 2-22 6-28-10-24z"
        style={land}
      />
      <path d="M70 108l16 6 4 14-14 8-12-6z" style={land} />
    </Plate>
  )
}

export function MapChina({
  active,
  onPin,
}: {
  active: PlaceId | null
  onPin: (id: PlaceId) => void
}) {
  return (
    <Plate
      label="China and Hong Kong"
      active={active}
      onPin={onPin}
      pins={[
        { id: 'chengdu', x: '36%', y: '48%', label: 'Chengdu', align: 'left' },
        { id: 'shanghai', x: '82%', y: '36%', label: 'Shanghai' },
        { id: 'shenzhen', x: '74%', y: '70%', label: 'Shenzhen', align: 'left' },
        { id: 'hong-kong', x: '84%', y: '82%', label: 'Hong Kong' },
      ]}
    >
      <path
        d="M38 58c8-28 42-40 78-36l48 14 22 20-4 28-18 32-36 18-42-4-28-16-16-24z"
        style={land}
      />
      <path d="M168 128c6 2 14 4 18 10" style={water} />
      <circle cx="196" cy="138" r="3.2" style={land} />
    </Plate>
  )
}

export function MapDenmark({
  active,
  onPin,
}: {
  active: PlaceId | null
  onPin: (id: PlaceId) => void
}) {
  return (
    <Plate
      label="Denmark"
      active={active}
      onPin={onPin}
      pins={[{ id: 'copenhagen', x: '68%', y: '48%', label: 'Copenhagen' }]}
    >
      <path d="M70 18 92 22l10 48-8 52-18 12-16-10 6-44z" style={land} />
      <path d="M118 58l28 6 8 22-10 16-24 2-10-12z" style={land} />
      <path d="M108 42h8v10h-8z" style={land} />
    </Plate>
  )
}

export function Continents() {
  return (
    <svg className="route-land" viewBox="0 0 640 720" aria-hidden="true">
      <path
        className="route-europe"
        d="M70 40c40-18 90-12 128 10l36 40c18 28 8 70-10 96l-24 88c-10 36 4 70 28 92l18 54c-38 22-92 18-128-6-30-20-48-62-44-98l12-70c8-40-6-78-28-102L30 86z"
      />
      <path
        className="route-asia"
        d="M360 210c48-36 120-44 186-20l48 40c22 28 26 70 8 104l-22 86c-8 40 10 78 46 98l-40 54c-70 18-150 4-198-36-32-26-48-70-40-110l18-80c8-44-4-86-20-120z"
      />
    </svg>
  )
}
