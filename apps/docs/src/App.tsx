import { useState, useEffect } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import { Container, Row, Text } from "@staple-css/primitives/full";
import { HomePageNew as HomePage } from "./pages/HomePageNew";
import { TokensPage } from "./pages/TokensPage";
import { ColorSystemPage } from "./pages/ColorSystemPage";
import { VisualsPage } from "./pages/VisualsPage";
import { GradientStudioPage } from "./pages/GradientStudioPage";
import { FigmaIntegrationPage } from "./pages/FigmaIntegrationPage";
import { TokenReferencePage } from "./pages/TokenReferencePage";
import { ComponentPatternsPage } from "./pages/ComponentPatternsPage";
import { GuidesPage } from "./pages/GuidesPage";
import { PrimitivesPage } from "./pages/PrimitivesPage";
import { WhyPage } from "./pages/WhyPage";
import { ExamplesPage } from "./pages/ExamplesPage";
import { BuilderPage } from "./pages/tokens-studio";
import { SearchPalette } from "./components/SearchPalette";
import { Sidebar } from "./components/Sidebar";
import { Breadcrumb } from "./components/Breadcrumb";

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
            <Link to="/" className="logo-link">
              <Text as="span" size={3} weight="bold">
                staple-css
              </Text>
            </Link>
            <Row gap={2}>
              <SearchPalette />
              <button onClick={cycleTheme} className="toggle-btn" title="Toggle theme">
                {theme === "system" ? "🖥️" : theme === "light" ? "☀️" : "🌙"} {themeLabel}
              </button>
              <button onClick={toggleDensity} className="toggle-btn" title="Toggle density">
                {density === "comfortable" ? "◻️ Comfortable" : "■ Compact"}
              </button>
            </Row>
          </Row>
        </Container>
      </header>

      <div className="app-content-wrapper">
        <Sidebar />
        <main className="app-main">
          <Breadcrumb />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/guides" element={<GuidesPage />} />
            <Route path="/tokens" element={<TokensPage />} />
            <Route path="/token-reference" element={<TokenReferencePage />} />
            <Route path="/colors" element={<ColorSystemPage />} />
            <Route path="/visuals" element={<VisualsPage />} />
            <Route path="/components" element={<ComponentPatternsPage />} />
            <Route path="/gradient-studio" element={<GradientStudioPage />} />
            <Route path="/figma" element={<FigmaIntegrationPage />} />
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
      </div>

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
