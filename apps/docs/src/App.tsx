import { useState, useEffect } from "react";
import { Routes, Route, NavLink, Navigate, Link } from "react-router-dom";
import { Container, Row, Text, Flex } from "@staple-css/primitives";
import { HomePage } from "./pages/HomePage";
import { TokensPage } from "./pages/TokensPage";
import { PrimitivesPage } from "./pages/PrimitivesPage";
import { WhyPage } from "./pages/WhyPage";
import { ExamplesPage } from "./pages/ExamplesPage";
import { BuilderPage } from "./pages/tokens-studio";

type Theme = "light" | "dark" | "system";
type Density = "comfortable" | "compact";

function getSystemTheme(): "light" | "dark" {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "light";
}

export function App() {
  const [theme, setTheme] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(getSystemTheme);
  const [density, setDensity] = useState<Density>("comfortable");

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== "system") {
      setResolvedTheme(theme);
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setResolvedTheme(mediaQuery.matches ? "dark" : "light");

    const handler = (e: MediaQueryListEvent) => {
      setResolvedTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [theme]);

  const cycleTheme = () => {
    setTheme((t) => {
      if (t === "system") return "light";
      if (t === "light") return "dark";
      return "system";
    });
  };

  const toggleDensity = () =>
    setDensity((d) => (d === "comfortable" ? "compact" : "comfortable"));

  const themeLabel = theme === "system" ? `System (${resolvedTheme})` : theme === "light" ? "Light" : "Dark";

  return (
    <div
      data-theme={resolvedTheme}
      data-density={density}
      className="app-root"
    >
      <header className="app-header">
        <Container size="xl">
          <Row gap={4} align="center" justify="between">
            <Row gap={6} align="center">
              <Link to="/" className="logo-link">
                <Text as="span" size={3} weight="bold">
                  staple-css
                </Text>
              </Link>
              <nav>
                <Flex as="ul" direction="row" gap={4} className="nav-list">
                  <li>
                    <NavLink to="/tokens" className="nav-link">
                      Tokens
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/primitives" className="nav-link">
                      Primitives
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/why" className="nav-link">
                      Why
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/examples" className="nav-link">
                      Examples
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/tokens-studio" className="nav-link">
                      Studio
                    </NavLink>
                  </li>
                  <li>
                    <a href="/storybook" className="nav-link" target="_blank" rel="noopener noreferrer">
                      Storybook
                    </a>
                  </li>
                </Flex>
              </nav>
            </Row>
            <Row gap={2}>
              <button onClick={cycleTheme} className="toggle-btn">
                {themeLabel}
              </button>
              <button onClick={toggleDensity} className="toggle-btn">
                {density === "comfortable" ? "Compact" : "Comfortable"}
              </button>
            </Row>
          </Row>
        </Container>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tokens" element={<TokensPage />} />
          <Route path="/primitives" element={<PrimitivesPage />} />
          <Route path="/why" element={<WhyPage />} />
          <Route path="/examples" element={<ExamplesPage />} />
          {/* Tokens Studio */}
          <Route path="/tokens-studio" element={<BuilderPage />} />
          {/* Redirect old studio routes */}
          <Route path="/tokens-studio/*" element={<Navigate to="/tokens-studio" replace />} />
          <Route path="/studio" element={<Navigate to="/tokens-studio" replace />} />
          <Route path="/studio/*" element={<Navigate to="/tokens-studio" replace />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <Container size="xl">
          <Row justify="center">
            <Text size={1} tone="muted">
              staple-css — Tokens are the API
            </Text>
          </Row>
        </Container>
      </footer>
    </div>
  );
}
