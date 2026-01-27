import { Column, Container, Text } from "@staple-css/primitives/full";
import { GradientMaker } from "../components/GradientMaker";

export function GradientStudioPage() {
  return (
    <Container size="md" style={{ paddingTop: "var(--st-space-4)", paddingBottom: "var(--st-space-4)" }}>
      <Column gap={4}>
        {/* Header */}
        <Column gap={2}>
          <Text as="h1" size={4} weight="bold">
            Gradient Studio
          </Text>
          <Text size={1} tone="muted">
            Design and export custom gradients for your design system.
          </Text>
        </Column>

        {/* Gradient Maker */}
        <GradientMaker />
      </Column>
    </Container>
  );
}
