import { useMemo } from "react";
import { Column, Text, Row, Card } from "@staple-css/primitives/full";
import {
  wcagContrastHex,
  apcaContrastHex,
  wcagRating,
  apcaRating,
  bestTextColor,
} from "@staple-css/tokens/color";

interface ContrastCheckerProps {
  foreground: string;
  background: string;
}

export function ContrastChecker({ foreground, background }: ContrastCheckerProps) {
  const results = useMemo(() => {
    const wcag = wcagContrastHex(foreground, background);
    const apca = apcaContrastHex(foreground, background);
    const wcagResult = wcagRating(wcag);
    const apcaResult = apcaRating(apca, "body");
    const wcagPasses = wcagResult !== "Fail";
    const apcaPasses = apcaResult === "Pass";

    return { wcag, apca, wcagResult, apcaResult, wcagPasses, apcaPasses };
  }, [foreground, background]);

  return (
    <Column gap={4}>
      {/* Preview */}
      <Card pad={0} radius={2} className="contrast-preview">
        <div
          className="contrast-preview-bg"
          style={{ backgroundColor: background, padding: "var(--st-space-5)" }}
        >
          <Column gap={3} align="center">
            <span
              style={{
                color: foreground,
                fontSize: "var(--st-font-size-5)",
                fontWeight: "var(--st-font-weight-bold)",
              }}
            >
              Aa
            </span>
            <span style={{ color: foreground, fontSize: "var(--st-font-size-2)" }}>
              The quick brown fox jumps over the lazy dog.
            </span>
            <span style={{ color: foreground, fontSize: "var(--st-font-size-1)" }}>
              ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789
            </span>
          </Column>
        </div>
      </Card>

      {/* Results */}
      <Row gap={4} wrap="wrap">
        {/* WCAG */}
        <Card pad={4} radius={2} className="contrast-result">
          <Column gap={3}>
            <Row gap={2} align="center" justify="between">
              <Text size={1} weight="semibold">
                WCAG 2.1
              </Text>
              <span
                className={`contrast-badge contrast-badge--${results.wcagPasses ? "pass" : "fail"}`}
              >
                {results.wcagResult}
              </span>
            </Row>
            <Text size={4} weight="bold" mono>
              {results.wcag.toFixed(2)}:1
            </Text>
            <Column gap={1}>
              <ContrastLevel
                label="Normal Text (AA)"
                pass={results.wcag >= 4.5}
                requirement="4.5:1"
              />
              <ContrastLevel
                label="Large Text (AA)"
                pass={results.wcag >= 3}
                requirement="3:1"
              />
              <ContrastLevel
                label="Normal Text (AAA)"
                pass={results.wcag >= 7}
                requirement="7:1"
              />
              <ContrastLevel
                label="Large Text (AAA)"
                pass={results.wcag >= 4.5}
                requirement="4.5:1"
              />
            </Column>
          </Column>
        </Card>

        {/* APCA */}
        <Card pad={4} radius={2} className="contrast-result">
          <Column gap={3}>
            <Row gap={2} align="center" justify="between">
              <Text size={1} weight="semibold">
                APCA (WCAG 3.0 Draft)
              </Text>
              <span
                className={`contrast-badge contrast-badge--${results.apcaPasses ? "pass" : "fail"}`}
              >
                {results.apcaResult}
              </span>
            </Row>
            <Text size={4} weight="bold" mono>
              Lc {Math.abs(results.apca).toFixed(1)}
            </Text>
            <Column gap={1}>
              <ContrastLevel
                label="Body Text (16px)"
                pass={Math.abs(results.apca) >= 75}
                requirement="Lc 75"
              />
              <ContrastLevel
                label="Large Text (24px)"
                pass={Math.abs(results.apca) >= 60}
                requirement="Lc 60"
              />
              <ContrastLevel
                label="Headlines (32px+)"
                pass={Math.abs(results.apca) >= 45}
                requirement="Lc 45"
              />
              <ContrastLevel
                label="Non-text (Icons)"
                pass={Math.abs(results.apca) >= 30}
                requirement="Lc 30"
              />
            </Column>
          </Column>
        </Card>
      </Row>

      {/* Recommendation */}
      <Card pad={3} radius={2} tone="primary" className="contrast-recommendation">
        <Row gap={2} align="center">
          <Text size={1}>Recommended text color on this background:</Text>
          <span
            className="color-swatch"
            style={{ backgroundColor: bestTextColor(background) }}
          />
          <Text mono size={1}>
            {bestTextColor(background)}
          </Text>
        </Row>
      </Card>
    </Column>
  );
}

function ContrastLevel({
  label,
  pass,
  requirement,
}: {
  label: string;
  pass: boolean;
  requirement: string;
}) {
  return (
    <Row gap={2} align="center" justify="between">
      <Text size={0} tone="muted">
        {label}
      </Text>
      <Row gap={1} align="center">
        <Text size={0} mono tone="muted">
          {requirement}
        </Text>
        <span className={`contrast-indicator contrast-indicator--${pass ? "pass" : "fail"}`}>
          {pass ? "✓" : "✗"}
        </span>
      </Row>
    </Row>
  );
}
