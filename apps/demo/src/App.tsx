import { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { Container, Row, Text, Flex } from "@staple-css/primitives/full";
import { SettingsPage } from "./pages/SettingsPage";
import { DashboardPage } from "./pages/DashboardPage";

type Theme = "light" | "dark";
type Density = "comfortable" | "compact";

export function App() {
  const [theme, setTheme] = useState<Theme>("light");
  const [density, setDensity] = useState<Density>("comfortable");

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  const toggleDensity = () =>
    setDensity((d) => (d === "comfortable" ? "compact" : "comfortable"));

  return (
    <div data-theme={theme} data-density={density} className="app-root">
      <header className="app-header">
        <Container size="xl">
          <Row gap={4} align="center" justify="between">
            <Row gap={6} align="center">
              <Text as="span" size={3} weight="bold">
                Demo App
              </Text>
              <nav>
                <Flex as="ul" direction="row" gap={4} className="nav-list">
                  <li>
                    <NavLink to="/" className="nav-link">
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/settings" className="nav-link">
                      Settings
                    </NavLink>
                  </li>
                </Flex>
              </nav>
            </Row>
            <Row gap={2}>
              <button onClick={toggleTheme} className="toggle-btn">
                {theme === "light" ? "Dark" : "Light"}
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
          <Route path="/" element={<DashboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  );
}
