import { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { Container, Inline, Text } from "@staple-css/primitives";
import { HomePage } from "./pages/HomePage";
import { TokensPage } from "./pages/TokensPage";
import { PrimitivesPage } from "./pages/PrimitivesPage";
import { WhyPage } from "./pages/WhyPage";

type Theme = "light" | "dark";
type Density = "comfortable" | "compact";

export function App() {
  const [theme, setTheme] = useState<Theme>("light");
  const [density, setDensity] = useState<Density>("comfortable");

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  const toggleDensity = () =>
    setDensity((d) => (d === "comfortable" ? "compact" : "comfortable"));

  return (
    <div
      data-theme={theme}
      data-density={density}
      className="app-root"
    >
      <header className="app-header">
        <Container size="xl">
          <Inline gap={4} align="center" justify="between">
            <Inline gap={6} align="center">
              <Text as="span" size={3} weight="bold">
                staple-css
              </Text>
              <nav>
                <Inline as="ul" gap={4} className="nav-list">
                  <li>
                    <NavLink to="/" className="nav-link">
                      Home
                    </NavLink>
                  </li>
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
                </Inline>
              </nav>
            </Inline>
            <Inline gap={2}>
              <button onClick={toggleTheme} className="toggle-btn">
                {theme === "light" ? "Dark" : "Light"}
              </button>
              <button onClick={toggleDensity} className="toggle-btn">
                {density === "comfortable" ? "Compact" : "Comfortable"}
              </button>
            </Inline>
          </Inline>
        </Container>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tokens" element={<TokensPage />} />
          <Route path="/primitives" element={<PrimitivesPage />} />
          <Route path="/why" element={<WhyPage />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <Container size="xl">
          <Inline justify="center">
            <Text size={1} tone="muted">
              staple-css — Tokens are the API
            </Text>
          </Inline>
        </Container>
      </footer>
    </div>
  );
}
