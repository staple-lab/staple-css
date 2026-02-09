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
import { SizingPrimitivesPage } from "./pages/SizingPrimitivesPage";
import { TypePrimitivesPage } from "./pages/TypePrimitivesPage";
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
import {
  ColorTextTokensPage,
  ColorBackgroundTokensPage,
  ColorBorderTokensPage,
  ColorInteractiveTokensPage,
  ColorFeedbackTokensPage,
  ColorIconTokensPage,
  ColorFocusTokensPage,
  SpacingComponentTokensPage,
  SpacingLayoutTokensPage,
  SpacingInsetTokensPage,
  SizingComponentsTokensPage,
  SizingLayoutTokensPage,
  BordersTokensPage,
  ZIndexTokensPage,
  MotionTokensPage,
  OpacityTokensPage,
} from "./pages/tokens";
import { SearchPalette } from "./components/SearchPalette";
import { SearchBar } from "./components/SearchBar";
import { SidebarNav } from "./components/SidebarNav";
import { MobileNav } from "./components/MobileNav";
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
      <header className="app-header-v2">
        <Link to="/" className="app-header-v2-logo">
          <span className="app-header-v2-logo-icon">S</span>
        </Link>
        <div className="app-header-v2-right">
          <button onClick={cycleTheme} className="app-header-v2-icon-btn" title="Toggle theme">
            {theme === "system" ? <Monitor size={16} strokeWidth={1.5} /> : theme === "light" ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      <div className="app-content-wrapper">
        <SidebarNav />
        <main className="app-main">
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
                <Route path="/sizing-primitives" element={<SizingPrimitivesPage />} />
                <Route path="/type-primitives" element={<TypePrimitivesPage />} />
                <Route path="/visuals" element={<VisualsPage />} />
                <Route path="/components" element={<ComponentPatternsPage />} />
                <Route path="/gradient-studio" element={<GradientStudioPage />} />
                <Route path="/figma" element={<FigmaIntegrationPage />} />
                <Route path="/primitives" element={<PrimitivesPage />} />
                <Route path="/why" element={<WhyPage />} />
                <Route path="/examples" element={<ExamplesPage />} />
                {/* Semantic Color Tokens */}
                <Route path="/tokens/color-text" element={<ColorTextTokensPage />} />
                <Route path="/tokens/color-background" element={<ColorBackgroundTokensPage />} />
                <Route path="/tokens/color-border" element={<ColorBorderTokensPage />} />
                <Route path="/tokens/color-interactive" element={<ColorInteractiveTokensPage />} />
                <Route path="/tokens/color-feedback" element={<ColorFeedbackTokensPage />} />
                <Route path="/tokens/color-icon" element={<ColorIconTokensPage />} />
                <Route path="/tokens/color-focus" element={<ColorFocusTokensPage />} />
                {/* Semantic Spacing Tokens */}
                <Route path="/tokens/spacing-component" element={<SpacingComponentTokensPage />} />
                <Route path="/tokens/spacing-layout" element={<SpacingLayoutTokensPage />} />
                <Route path="/tokens/spacing-inset" element={<SpacingInsetTokensPage />} />
                {/* Semantic Sizing Tokens */}
                <Route path="/tokens/sizing-components" element={<SizingComponentsTokensPage />} />
                <Route path="/tokens/sizing-layout" element={<SizingLayoutTokensPage />} />
                {/* Other Tokens */}
                <Route path="/tokens/borders" element={<BordersTokensPage />} />
                <Route path="/tokens/z-index" element={<ZIndexTokensPage />} />
                <Route path="/tokens/motion" element={<MotionTokensPage />} />
                <Route path="/tokens/opacity" element={<OpacityTokensPage />} />
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
