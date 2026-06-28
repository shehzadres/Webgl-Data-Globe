/** Design tokens — single source of truth for all UI styling. */
export const theme = {
  colors: {
    // Background layers
    bg0: '#050a14',
    bg1: 'rgba(5, 10, 20, 0.82)',
    bg2: 'rgba(8, 16, 32, 0.92)',
    bg3: 'rgba(12, 24, 48, 0.96)',

    // Border
    border:       '#1a3a52',
    borderHover:  '#2a6a9a',
    borderActive: '#4a9adc',

    // Text
    textPrimary:   '#e8f4ff',
    textSecondary: '#a8c8e8',
    textMuted:     '#4a7fa8',
    textDim:       '#2d5a7a',

    // Accent
    accent:      '#64b5f6',
    accentDim:   '#4a7fa8',
    accentGlow:  'rgba(100, 181, 246, 0.25)',
    accentBright:'#90caf9',

    // Status
    statusOk:   '#22c55e',
    statusWarn: '#f59e0b',
    statusErr:  '#ef4444',

    // Category colors (match visualization palette)
    asia:     '#4fc3f7',
    europe:   '#81c784',
    americas: '#ffb74d',
    africa:   '#f06292',
    oceania:  '#ce93d8',
  },

  font: {
    mono: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
  },

  radius: {
    sm: '4px',
    md: '6px',
    lg: '10px',
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '14px',
    lg: '20px',
    xl: '28px',
  },

  shadow: {
    panel: '0 4px 24px rgba(0,0,0,0.5)',
    glow:  '0 0 12px rgba(100, 181, 246, 0.25)',
  },

  blur: 'blur(10px)',

  zIndex: {
    canvas:    1,
    scroll:    2,
    overlay:  100,
    panel:    150,
    hud:      160,
    tooltip:  200,
    debug:    300,
  },
} as const

export type Theme = typeof theme
