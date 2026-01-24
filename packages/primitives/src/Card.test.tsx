import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Card } from "./Card";

describe("Card", () => {
  it("renders with base class and default variants", () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("st-Card");
    expect(card.className).toContain("st-Card--pad-4");
    expect(card.className).toContain("st-Card--radius-2");
    expect(card.className).toContain("st-Card--tone-neutral");
  });

  it("renders with custom pad", () => {
    const { container } = render(<Card pad={6}>Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("st-Card--pad-6");
  });

  it("renders with custom radius", () => {
    const { container } = render(<Card radius={3}>Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("st-Card--radius-3");
  });

  it("renders with shadow", () => {
    const { container } = render(<Card shadow={1}>Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("st-Card--shadow-1");
  });

  it("renders with tone variants", () => {
    const tones = ["neutral", "primary", "danger", "warn", "success"] as const;
    tones.forEach((tone) => {
      const { container } = render(<Card tone={tone}>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain(`st-Card--tone-${tone}`);
    });
  });

  it("renders as section", () => {
    const { container } = render(<Card as="section">Content</Card>);
    expect(container.firstChild?.nodeName).toBe("SECTION");
  });

  it("renders as article", () => {
    const { container } = render(<Card as="article">Content</Card>);
    expect(container.firstChild?.nodeName).toBe("ARTICLE");
  });

  it("accepts aria-label", () => {
    const { container } = render(
      <Card aria-label="Test card">Content</Card>
    );
    const card = container.firstChild as HTMLElement;
    expect(card.getAttribute("aria-label")).toBe("Test card");
  });

  it("accepts role", () => {
    const { container } = render(<Card role="region">Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.getAttribute("role")).toBe("region");
  });

  it("accepts custom className", () => {
    const { container } = render(<Card className="custom">Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("custom");
  });
});
