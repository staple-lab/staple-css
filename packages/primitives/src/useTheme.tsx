/**
 * useTheme Hook
 *
 * React hook for managing dynamic themes
 */

import { useCallback, useEffect, useState } from 'react'
import {
  type DynamicTheme,
  applyDynamicTheme,
  removeDynamicTheme,
  getCurrentTheme,
  watchTheme,
} from '@staple-css/tokens/dynamic-theme'

export interface UseThemeOptions {
  scope?: HTMLElement
}

/**
 * useTheme Hook
 *
 * Provides theme management capabilities
 *
 * @example
 * ```tsx
 * const { theme, apply, remove } = useTheme();
 *
 * function handleThemeSwitch(newTheme) {
 *   apply(newTheme);
 * }
 *
 * return (
 *   <button onClick={() => handleThemeSwitch(darkTheme)}>
 *     Dark Mode
 *   </button>
 * );
 * ```
 */
export function useTheme(options: UseThemeOptions = {}) {
  const { scope } = options
  const [theme, setTheme] = useState<DynamicTheme | null>(() => getCurrentTheme(scope))

  useEffect(() => {
    const unsubscribe = watchTheme((newTheme) => {
      setTheme(newTheme)
    }, scope)

    return unsubscribe
  }, [scope])

  const apply = useCallback(
    (newTheme: DynamicTheme) => {
      applyDynamicTheme(newTheme, { scope })
      setTheme(newTheme)
    },
    [scope]
  )

  const remove = useCallback(
    (themeId: string) => {
      removeDynamicTheme(themeId, scope)
      setTheme(null)
    },
    [scope]
  )

  return { theme, apply, remove }
}
