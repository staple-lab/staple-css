import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";

const HomePage = lazy(() =>
  import("./pages/HomePage").then((m) => ({ default: m.HomePage })),
);
const GettingStartedPage = lazy(() =>
  import("./pages/GettingStartedPage").then((m) => ({
    default: m.GettingStartedPage,
  })),
);
const WhyStaplePage = lazy(() =>
  import("./pages/WhyStaplePage").then((m) => ({
    default: m.WhyStaplePage,
  })),
);
const TokensOverviewPage = lazy(() =>
  import("./pages/TokensOverviewPage").then((m) => ({
    default: m.TokensOverviewPage,
  })),
);
const ColorTokensPage = lazy(() =>
  import("./pages/ColorTokensPage").then((m) => ({
    default: m.ColorTokensPage,
  })),
);
const SpacingTokensPage = lazy(() =>
  import("./pages/SpacingTokensPage").then((m) => ({
    default: m.SpacingTokensPage,
  })),
);
const TypographyTokensPage = lazy(() =>
  import("./pages/TypographyTokensPage").then((m) => ({
    default: m.TypographyTokensPage,
  })),
);
const ElevationTokensPage = lazy(() =>
  import("./pages/ElevationTokensPage").then((m) => ({
    default: m.ElevationTokensPage,
  })),
);
const MotionTokensPage = lazy(() =>
  import("./pages/MotionTokensPage").then((m) => ({
    default: m.MotionTokensPage,
  })),
);
const BorderTokensPage = lazy(() =>
  import("./pages/BorderTokensPage").then((m) => ({
    default: m.BorderTokensPage,
  })),
);
const LayoutTokensPage = lazy(() =>
  import("./pages/LayoutTokensPage").then((m) => ({
    default: m.LayoutTokensPage,
  })),
);
const PalettesPage = lazy(() =>
  import("./pages/PalettesPage").then((m) => ({
    default: m.PalettesPage,
  })),
);
const AIUsagePage = lazy(() =>
  import("./pages/AIUsagePage").then((m) => ({
    default: m.AIUsagePage,
  })),
);
const StudioPage = lazy(() =>
  import("./studio/StudioPage").then((m) => ({ default: m.StudioPage })),
);

function Loading() {
  return (
    <div
      style={{
        padding: 40,
        color: "var(--doc-color-text-secondary)",
        fontSize: "0.875rem",
      }}
    >
      Loading...
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="getting-started" element={<GettingStartedPage />} />
            <Route path="why-staple" element={<WhyStaplePage />} />
            <Route path="tokens" element={<TokensOverviewPage />} />
            <Route path="tokens/color" element={<ColorTokensPage />} />
            <Route path="tokens/spacing" element={<SpacingTokensPage />} />
            <Route path="tokens/typography" element={<TypographyTokensPage />} />
            <Route path="tokens/elevation" element={<ElevationTokensPage />} />
            <Route path="tokens/motion" element={<MotionTokensPage />} />
            <Route path="tokens/border" element={<BorderTokensPage />} />
            <Route path="tokens/layout" element={<LayoutTokensPage />} />
            <Route path="palettes" element={<PalettesPage />} />
            <Route path="ai-usage" element={<AIUsagePage />} />
            <Route path="studio" element={<StudioPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
