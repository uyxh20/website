import { useEffect, useId, useState } from 'react'
import { PRODUCTS, type Product } from './products'
import './App.css'

const PRODUCT_IDS = new Set(PRODUCTS.map((product) => product.id))

type TabLayout = 'left' | 'alt'

function readOpenId(): string | null {
  const id = new URLSearchParams(window.location.search).get('open')
  return id && PRODUCT_IDS.has(id) ? id : null
}

function readTabLayout(): TabLayout {
  return new URLSearchParams(window.location.search).get('tabs') === 'alt'
    ? 'alt'
    : 'left'
}

export default function App() {
  const [openId, setOpenId] = useState<string | null>(readOpenId)
  const [tabLayout, setTabLayout] = useState<TabLayout>(readTabLayout)

  function toggle(id: string) {
    setOpenId((current) => (current === id ? null : id))
  }

  useEffect(() => {
    const url = new URL(window.location.href)
    if (openId) url.searchParams.set('open', openId)
    else url.searchParams.delete('open')
    if (tabLayout === 'alt') url.searchParams.set('tabs', 'alt')
    else url.searchParams.delete('tabs')
    window.history.replaceState(null, '', `${url.pathname}${url.search}`)
  }, [openId, tabLayout])

  return (
    <div className="page">
      <Cabinet
        openId={openId}
        tabLayout={tabLayout}
        onToggle={toggle}
        onTabLayout={setTabLayout}
      />
    </div>
  )
}

function Cabinet({
  openId,
  tabLayout,
  onToggle,
  onTabLayout,
}: {
  openId: string | null
  tabLayout: TabLayout
  onToggle: (id: string) => void
  onTabLayout: (layout: TabLayout) => void
}) {
  return (
    <div className={`cabinet cabinet-${tabLayout}`}>
      <ul className="stack">
        {PRODUCTS.map((product, index) => (
          <Folder
            key={product.id}
            product={product}
            index={index}
            tabLayout={tabLayout}
            open={openId === product.id}
            onToggle={() => onToggle(product.id)}
          />
        ))}
      </ul>
      <Drawer />
      <LayoutSwitch layout={tabLayout} onChange={onTabLayout} />
    </div>
  )
}

function LayoutSwitch({
  layout,
  onChange,
}: {
  layout: TabLayout
  onChange: (layout: TabLayout) => void
}) {
  return (
    <p className="layout-switch">
      <button
        type="button"
        aria-pressed={layout === 'left'}
        onClick={() => onChange('left')}
      >
        Left tabs
      </button>
      <span aria-hidden="true">·</span>
      <button
        type="button"
        aria-pressed={layout === 'alt'}
        onClick={() => onChange('alt')}
      >
        Alternating
      </button>
    </p>
  )
}

function Folder({
  product,
  index,
  tabLayout,
  open,
  onToggle,
}: {
  product: Product
  index: number
  tabLayout: TabLayout
  open: boolean
  onToggle: () => void
}) {
  const panelId = useId()
  const align = tabLayout === 'alt' && index % 2 === 1 ? 'right' : 'left'

  useEffect(() => {
    if (!open) return
    const node = document.getElementById(`folder-${product.id}`)
    node?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [open, product.id])

  return (
    <li
      id={`folder-${product.id}`}
      className={open ? 'folder is-open' : 'folder'}
      style={{ zIndex: index + 1 }}
    >
      <button
        type="button"
        className="folder-head"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className={`tab tab-${align} ${open ? 'is-on' : ''}`}>
          <span className="tab-shape" aria-hidden="true" />
          <span className="tab-label">
            <span className="tab-num">{product.id}</span>
            <span className="tab-name">{product.name}</span>
          </span>
        </span>
      </button>

      <div className="sleeve">
        <div
          className="panel"
          id={panelId}
          role="region"
          aria-hidden={!open}
          inert={!open}
        >
          <div className="panel-inner">
            <header className="folder-meta">
              <h2>{product.name}</h2>
              <p>{product.id}</p>
            </header>
            <div className="gallery-slot" aria-label="Gallery">
              <span className="gallery-mark" aria-hidden="true" />
              <span className="gallery-label">Gallery</span>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

function Drawer() {
  return (
    <div className="drawer">
      <svg className="drawer-shape" viewBox="0 0 720 88" preserveAspectRatio="none">
        <path d="M48 1.2 H672 L718 86.8 H2 Z" />
      </svg>
      <h1 className="drawer-label">Portfolio</h1>
    </div>
  )
}
