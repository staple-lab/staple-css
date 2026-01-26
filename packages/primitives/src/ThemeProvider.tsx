/**
 * ThemeProvider Component
 *
 * React context provider for theme management
 */

import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import type { DynamicTheme } from '@staple-css/tokens/dynamic-theme'
import { applyDynamicTheme, removeDynamicTheme } from '@staple-css/tokens/dynamic-theme'

export interface ThemeProviderProps {
  theme: DynamicTheme
  children: ReactNode
  scope?: 'root' | 'container'
}

/**
 * ThemeProvider Component
 *
 * Applies a dynamic theme to the app or a container subtree
 *
 * @example
 * ```tsx
 * import { ThemeProvider } from '@staple-css/primitives';
 * import { customTheme } from './themes';
 *
 * export default function App() {
 *   return (
 *     <ThemeProvider theme={customTheme} scope="root">
 *       <Header />
 *       <Main />
 *       <Footer />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 *
 * @example Container-scoped theme
 * ```tsx
 * <ThemeProvider theme={brandATheme} scope="container">
 *   <Section />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  theme,
  children,
  scope = 'root',
}: ThemeProviderProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = scope === 'root' ? undefined : containerRef.current ?? undefined
    applyDynamicTheme(theme, { scope: element })

    return () => {
      removeDynamicTheme(theme.id, element)
    }
  }, [theme, scope])

  if (scope === 'container') {
    return (
      <div ref={containerRef} data-theme-id={theme.id}>
        {children}
      </div>
    )
  }

  return <>{children}</>
}
