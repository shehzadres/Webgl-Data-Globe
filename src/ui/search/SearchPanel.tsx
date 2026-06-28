import { memo, useState, useCallback, useMemo } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useSettingsStore } from '@/ui/settings/settingsStore'
import { useVisualizationStore } from '@/visualization'
import { focusLatLng } from '@/camera'
import { WORLD_CITIES_DATASET } from '@/visualization'
import styles from './SearchPanel.module.css'

export const SearchPanel = memo(() => {
  const showSearch = useSettingsStore((s) => s.ui.showSearch)
  const { toggleSearch } = useSettingsStore()
  const setSelected = useVisualizationStore((s) => s.setSelected)
  const [query, setQuery] = useState('')

  const spring = useSpring({
    opacity:   showSearch ? 1 : 0,
    translateY: showSearch ? 0 : -12,
    config: { tension: 300, friction: 28 },
  })

  const results = useMemo(() => {
    if (!query.trim()) return WORLD_CITIES_DATASET.points.slice(0, 8)
    const q = query.toLowerCase()
    return WORLD_CITIES_DATASET.points.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q),
    ).slice(0, 8)
  }, [query])

  const handleSelect = useCallback((id: string, lat: number, lng: number) => {
    setSelected(id)
    focusLatLng(lat, lng, 2.4, 1.4)
    toggleSearch()
    setQuery('')
  }, [setSelected, toggleSearch])

  if (!showSearch) return null

  return (
    <animated.div
      className={styles.panel}
      style={spring}
      role="dialog"
      aria-label="Location search"
    >
      <div className={styles.inputRow}>
        <span className={styles.icon} aria-hidden>⌕</span>
        <input
          className={styles.input}
          type="text"
          placeholder="Search locations…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          aria-label="Search locations"
        />
        <button
          className={styles.close}
          onClick={toggleSearch}
          aria-label="Close search"
        >×</button>
      </div>
      <ul className={styles.list} role="listbox">
        {results.map((point) => (
          <li key={point.id} role="option" aria-selected={false}>
            <button
              className={styles.item}
              onClick={() => handleSelect(point.id, point.lat, point.lng)}
            >
              <span className={styles.itemName}>{point.name}</span>
              <span className={styles.itemMeta}>{point.category}</span>
            </button>
          </li>
        ))}
        {results.length === 0 && (
          <li className={styles.empty}>No results for &quot;{query}&quot;</li>
        )}
      </ul>
    </animated.div>
  )
})

SearchPanel.displayName = 'SearchPanel'
