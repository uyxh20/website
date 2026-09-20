import { useEffect, useState } from 'react'
import { Chooser } from './Chooser'
import { YearSpine } from './YearSpine'
import { Directory } from './Directory'
import { Chapters } from './Chapters'
import { Ledger } from './Ledger'
import { StampSpine } from './spine/StampSpine'
import { MapSpine } from './spine/MapSpine'
import { DurationSpine } from './spine/DurationSpine'
import { RouteSpine } from './spine/RouteSpine'
import {
  asPlaceId,
  isPlaceId,
  isSpineStationId,
  type PlaceId,
  type SpineStationId,
} from './places'
import {
  SPINE_VISUALS,
  VARIANTS,
  type SpineVisualId,
  type VariantId,
} from './variants'
import './App.css'

type OpenId = PlaceId | SpineStationId

type Route = {
  variant: VariantId | 0
  visual: SpineVisualId | 0
  place: OpenId | null
}

function readRoute(): Route {
  const query = new URLSearchParams(window.location.search)
  const sv = Number(query.get('sv'))
  const visual: SpineVisualId | 0 =
    sv === 1 || sv === 2 || sv === 3 || sv === 4 ? sv : 0
  const raw = Number(query.get('v'))
  const variant: VariantId | 0 =
    raw === 1 || raw === 2 || raw === 3 || raw === 4 ? raw : 0
  const placeParam = query.get('place')
  const place =
    isSpineStationId(placeParam) || isPlaceId(placeParam) ? placeParam : null
  if (visual) return { variant: 0, visual, place }
  return { variant, visual: 0, place }
}

function writeRoute(route: Route) {
  const url = new URL(window.location.href)
  if (route.visual) {
    url.searchParams.set('sv', String(route.visual))
    url.searchParams.delete('v')
  } else if (route.variant) {
    url.searchParams.set('v', String(route.variant))
    url.searchParams.delete('sv')
  } else {
    url.searchParams.delete('v')
    url.searchParams.delete('sv')
  }
  if (route.place) url.searchParams.set('place', route.place)
  else url.searchParams.delete('place')
  window.history.replaceState(null, '', `${url.pathname}${url.search}`)
}

export default function App() {
  const [route, setRoute] = useState<Route>(readRoute)

  useEffect(() => {
    writeRoute(route)
  }, [route])

  useEffect(() => {
    function onPop() {
      setRoute(readRoute())
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  function openVariant(variant: VariantId, place: OpenId | null = route.place) {
    setRoute({
      variant,
      visual: 0,
      place: variant === 1 ? place : asPlaceId(place),
    })
  }

  function openVisual(visual: SpineVisualId, place: OpenId | null = route.place) {
    setRoute({ variant: 0, visual, place: asPlaceId(place) })
  }

  function setPlace(place: OpenId | null) {
    setRoute((current) => ({ ...current, place }))
  }

  const placeId = asPlaceId(route.place)
  const spineStation = isSpineStationId(route.place) ? route.place : null

  if (route.variant === 0 && route.visual === 0) {
    return <Chooser onOpenVariant={openVariant} onOpenVisual={openVisual} />
  }

  const mockClass = route.visual
    ? `mock mock-sv mock-sv-${route.visual}`
    : `mock mock-${route.variant}`

  return (
    <div className={mockClass}>
      <header className="mock-bar">
        <a
          className="mock-home"
          href="/"
          onClick={(event) => {
            event.preventDefault()
            setRoute({ variant: 0, visual: 0, place: null })
          }}
        >
          Bio mocks
        </a>
        <nav className="mock-switch" aria-label="Presentation variants">
          {VARIANTS.map((item) => {
            const href = route.place
              ? `/?v=${item.id}&place=${route.place}`
              : `/?v=${item.id}`
            return (
              <a
                key={item.id}
                href={href}
                aria-current={item.id === route.variant ? 'page' : undefined}
                onClick={(event) => {
                  event.preventDefault()
                  openVariant(item.id)
                }}
              >
                <span className="mock-switch-n">{item.id}</span>
                {item.label}
              </a>
            )
          })}
        </nav>
        <nav className="mock-switch mock-switch-sv" aria-label="Year spine visuals">
          <span className="mock-switch-label">Spine visuals</span>
          {SPINE_VISUALS.map((item) => {
            const href = route.place
              ? `/?sv=${item.id}&place=${route.place}`
              : `/?sv=${item.id}`
            return (
              <a
                key={item.id}
                href={href}
                aria-current={item.id === route.visual ? 'page' : undefined}
                onClick={(event) => {
                  event.preventDefault()
                  openVisual(item.id)
                }}
              >
                <span className="mock-switch-n">{item.id}</span>
                {item.label}
              </a>
            )
          })}
        </nav>
        <p className="mock-note">Standalone mock · not the live site</p>
      </header>

      <div className="bio-frame">
        <p className="bio-kicker">Bio</p>
        <p className="breaker breaker-01">01 /</p>
        <div className="bio-body">
          {route.variant === 1 && (
            <YearSpine station={spineStation} onStation={setPlace} />
          )}
          {route.variant === 2 && (
            <Directory place={placeId} onPlace={setPlace} />
          )}
          {route.variant === 3 && (
            <Chapters place={placeId} onPlace={setPlace} />
          )}
          {route.variant === 4 && (
            <Ledger place={placeId} onPlace={setPlace} />
          )}
          {route.visual === 1 && (
            <StampSpine place={placeId} onPlace={setPlace} />
          )}
          {route.visual === 2 && (
            <MapSpine place={placeId} onPlace={setPlace} />
          )}
          {route.visual === 3 && (
            <DurationSpine place={placeId} onPlace={setPlace} />
          )}
          {route.visual === 4 && (
            <RouteSpine place={placeId} onPlace={setPlace} />
          )}
        </div>
        <p className="breaker breaker-02">02 /</p>
      </div>
    </div>
  )
}
