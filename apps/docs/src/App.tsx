import { useState, useEffect } from "react";
import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { Container, Row, Text } from "@staple-css/primitives/full";
import { Monitor, Sun, Moon } from "lucide-react";
import { HomePageNew as HomePage } from "./pages/HomePageNew";
import { TokensPage } from "./pages/TokensPage";
import { ColorSystemPage } from "./pages/ColorSystemPage";
import { ColorsPage } from "./pages/ColorsPage";
import { ColorPrimitiveRampsPage } from "./pages/ColorPrimitiveRampsPage";
import { SpacingPrimitivesPage } from "./pages/SpacingPrimitivesPage";
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
import { SearchBar } from "./components/SearchBar";
import { SidebarNav } from "./components/SidebarNav";
import { MobileNav } from "./components/MobileNav";
import { Breadcrumb } from "./components/Breadcrumb";
import { TableOfContents } from "./components/TableOfContents";
import { ScrollToTop } from "./components/ScrollToTop";

type Theme = "light" | "dark" | "system";

function getSystemTheme(): "light" | "dark" {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "light";
}

export function App() {
  const [theme, setTheme] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(getSystemTheme);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

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

  return (
    <div
      data-theme={resolvedTheme}
      className="app-root"
    >
      <header className="app-header">
        <Container size="xl">
          <Row gap={4} align="center" className="header-layout">
            <MobileNav />
            <Link to="/" className="logo-link">
              <Text as="span" size={3} weight="bold">
                staple-css
              </Text>
            </Link>
            <div className="header-center">
              <SearchBar />
            </div>
            <Row gap={2} className="header-right">
              <button onClick={cycleTheme} className="toggle-btn" title="Toggle theme" style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                borderRadius: "6px",
                border: "1px solid var(--st-color-border)",
                background: "transparent",
                cursor: "pointer",
                color: "inherit",
                transition: "all 200ms ease"
              }} onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--st-color-surface)";
                e.currentTarget.style.borderColor = "var(--st-color-primary)";
              }} onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "var(--st-color-border)";
              }}>
                {theme === "system" ? <Monitor size={18} strokeWidth={1.5} /> : theme === "light" ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
              </button>
            </Row>
          </Row>
        </Container>
      </header>

      <div className="app-content-wrapper">
        <SidebarNav />
        <main className="app-main">
          <div style={{ paddingBottom: "var(--st-space-5)", marginBottom: "var(--st-space-4)" }}>
            <Breadcrumb />
          </div>
          <div className="app-main-content">
            <div style={{ flex: 1 }}>
              <Routes>
                {/* Regular pages with max-width constraint */}
                <Route path="/" element={<HomePage />} />
                <Route path="/guides" element={<GuidesPage />} />
                <Route path="/tokens" element={<TokensPage />} />
                <Route path="/token-reference" element={<TokenReferencePage />} />
                <Route path="/colors" element={<ColorSystemPage />} />
                <Route path="/color-ramp" element={<ColorsPage />} />
                <Route path="/color-primitives" element={<ColorPrimitiveRampsPage />} />
                <Route path="/spacing-primitives" element={<SpacingPrimitivesPage />} />
                <Route path="/visuals" element={<VisualsPage />} />
                <Route path="/components" element={<ComponentPatternsPage />} />
                <Route path="/gradient-studio" element={<GradientStudioPage />} />
                <Route path="/figma" element={<FigmaIntegrationPage />} />
                <Route path="/primitives" element={<PrimitivesPage />} />
                <Route path="/why" element={<WhyPage />} />
                <Route path="/examples" element={<ExamplesPage />} />
                {/* Full-width interactive builder */}
                <Route path="/tokens-studio" element={
                  <div className="builder-page-wrapper">
                    <BuilderPage />
                  </div>
                } />
                {/* Redirect old studio routes */}
                <Route path="/tokens-studio/*" element={<Navigate to="/tokens-studio" replace />} />
                <Route path="/studio" element={<Navigate to="/tokens-studio" replace />} />
                <Route path="/studio/*" element={<Navigate to="/tokens-studio" replace />} />
              </Routes>
            </div>
            <TableOfContents />
          </div>
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

      <ScrollToTop />
    </div>
  );
}
