/**
 * Dynamic Theme System
 *
 * Runtime theme application with CSS variable injection.
 * Supports global and scoped theme application.
 */

import type { Tokens } from './tokens.js'

export interface DynamicTheme {
  id: string
  name: string
  tokens: Partial<Tokens>
  metadata?: {
    description?: string
    author?: string
    createdAt?: string
    updatedAt?: string
  }
}

interface ThemeOptions {
  scope?: HTMLElement
  persist?: boolean
}

interface ActiveTheme {
  theme: DynamicTheme
  styleElement: HTMLStyleElement
  scope?: HTMLElement
}

// Track active themes globally and per-scope
const activeThemes = new Map<string, ActiveTheme>()
const scopedThemes = new WeakMap<HTMLElement, ActiveTheme>()
const themeWatchers = new Set<(theme: DynamicTheme) => void>()
const scopedWatchers = new WeakMap<HTMLElement, Set<(theme: DynamicTheme) => void>>()

/**
 * Convert token object to CSS variables
 */
function tokensToCss(tokens: Partial<Tokens>): string {
  const lines: string[] = []

  const entries = Object.entries(tokens) as Array<[string, any]>
  for (const [key, value] of entries) {
    if (typeof value === 'object' && value !== null) {
      // Nested object (e.g., colors.light or space)
      const nested = value as Record<string, string>
      for (const [nestedKey, nestedValue] of Object.entries(nested)) {
        const varName = `--st-${key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}-${nestedKey}`
        lines.push(`  ${varName}: ${nestedValue};`)
      }
    } else if (typeof value === 'string') {
      // Direct value
      const varName = `--st-${key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`
      lines.push(`  ${varName}: ${value};`)
    }
  }

  return lines.join('\n')
}

/**
 * Generate CSS for a theme
 */
function generateThemeCss(tokens: Partial<Tokens>, selector = ':root'): string {
  return `${selector} {\n${tokensToCss(tokens)}\n}`
}

/**
 * Apply a dynamic theme globally or to a specific scope
 */
export function applyDynamicTheme(theme: DynamicTheme, options: ThemeOptions = {}): void {
  const { scope, persist = false } = options
  const key = scope ? `scoped-${Math.random()}` : 'global'

  // Create or update style element
  let styleElement: HTMLStyleElement
  if (scope) {
    const existing = scopedThemes.get(scope)
    if (existing) {
      existing.styleElement.remove()
    }
    styleElement = document.createElement('style')
    styleElement.setAttribute('data-theme-id', theme.id)
    styleElement.setAttribute('data-scope', 'true')
    const selector = `[data-theme-id="${theme.id}"]`
    styleElement.textContent = generateThemeCss(theme.tokens, selector)
    scope.appendChild(styleElement)

    // Track scoped theme
    scopedThemes.set(scope, { theme, styleElement, scope })
    const watchers = scopedWatchers.get(scope) || new Set()
    watchers.forEach(fn => fn(theme))
  } else {
    // Global theme
    const existing = activeThemes.get(key)
    if (existing) {
      existing.styleElement.remove()
    }

    styleElement = document.createElement('style')
    styleElement.setAttribute('data-theme-id', theme.id)
    styleElement.textContent = generateThemeCss(theme.tokens)
    document.head.appendChild(styleElement)

    // Track global theme
    activeThemes.set(key, { theme, styleElement })

    // Persist to localStorage if requested
    if (persist) {
      try {
        localStorage.setItem(`staple-theme-${theme.id}`, JSON.stringify(theme))
      } catch (e) {
        console.warn('Failed to persist theme to localStorage:', e)
      }
    }

    // Notify watchers
    themeWatchers.forEach(fn => fn(theme))
  }
}

/**
 * Remove a dynamic theme
 */
export function removeDynamicTheme(themeId: string, scope?: HTMLElement): void {
  if (scope) {
    const theme = scopedThemes.get(scope)
    if (theme && theme.theme.id === themeId) {
      theme.styleElement.remove()
      // Note: can't delete WeakMap entries, but they'll be garbage collected
    }
  } else {
    const theme = activeThemes.get('global')
    if (theme && theme.theme.id === themeId) {
      theme.styleElement.remove()
      activeThemes.delete('global')

      // Remove from localStorage
      try {
        localStorage.removeItem(`staple-theme-${themeId}`)
      } catch (e) {
        console.warn('Failed to remove theme from localStorage:', e)
      }
    }
  }
}

/**
 * Get currently active theme
 */
export function getCurrentTheme(scope?: HTMLElement): DynamicTheme | null {
  if (scope) {
    const theme = scopedThemes.get(scope)
    return theme?.theme ?? null
  } else {
    const theme = activeThemes.get('global')
    return theme?.theme ?? null
  }
}

/**
 * Watch for theme changes
 */
export function watchTheme(
  callback: (theme: DynamicTheme) => void,
  scope?: HTMLElement
): () => void {
  if (scope) {
    const watchers = scopedWatchers.get(scope) || new Set()
    watchers.add(callback)
    scopedWatchers.set(scope, watchers)

    return () => {
      watchers.delete(callback)
    }
  } else {
    themeWatchers.add(callback)

    return () => {
      themeWatchers.delete(callback)
    }
  }
}

/**
 * Merge themes (partial override)
 */
export function mergeThemes(base: DynamicTheme, override: Partial<DynamicTheme>): DynamicTheme {
  return {
    ...base,
    ...override,
    tokens: {
      ...base.tokens,
      ...override.tokens,
    },
    metadata: {
      ...base.metadata,
      ...override.metadata,
      updatedAt: new Date().toISOString(),
    },
  }
}

/**
 * Load theme from localStorage
 */
export function loadThemeFromStorage(themeId: string): DynamicTheme | null {
  try {
    const stored = localStorage.getItem(`staple-theme-${themeId}`)
    if (stored) {
      return JSON.parse(stored) as DynamicTheme
    }
  } catch (e) {
    console.warn('Failed to load theme from localStorage:', e)
  }
  return null
}

/**
 * Save theme to localStorage
 */
export function saveThemeToStorage(theme: DynamicTheme): void {
  try {
    localStorage.setItem(`staple-theme-${theme.id}`, JSON.stringify(theme))
  } catch (e) {
    console.warn('Failed to save theme to localStorage:', e)
  }
}

/**
 * Export theme as JSON string
 */
export function themeToJson(theme: DynamicTheme): string {
  return JSON.stringify(theme, null, 2)
}

/**
 * Import theme from JSON string
 */
export function themeFromJson(json: string): DynamicTheme {
  return JSON.parse(json) as DynamicTheme
}
