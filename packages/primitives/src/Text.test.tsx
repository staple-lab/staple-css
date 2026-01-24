import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Text } from "./Text";

describe("Text", () => {
  it("renders with base class", () => {
    const { container } = render(<Text>Content</Text>);
    const text = container.firstChild as HTMLElement;
    expect(text.className).toBe("st-Text");
    expect(text.nodeName).toBe("P");
  });

  it("renders with size variant", () => {
    const { container } = render(<Text size={3}>Content</Text>);
    const text = container.firstChild as HTMLElement;
    expect(text.className).toContain("st-Text--size-3");
  });

  it("renders with weight variant", () => {
    const { container } = render(<Text weight="bold">Content</Text>);
    const text = container.firstChild as HTMLElement;
    expect(text.className).toContain("st-Text--weight-bold");
  });

  it("renders with tone variant", () => {
    const { container } = render(<Text tone="primary">Content</Text>);
    const text = container.firstChild as HTMLElement;
    expect(text.className).toContain("st-Text--tone-primary");
  });

  it("renders with align variant", () => {
    const { container } = render(<Text align="center">Content</Text>);
    const text = container.firstChild as HTMLElement;
    expect(text.className).toContain("st-Text--align-center");
  });

  it("renders with leading variant", () => {
    const { container } = render(<Text leading="tight">Content</Text>);
    const text = container.firstChild as HTMLElement;
    expect(text.className).toContain("st-Text--leading-tight");
  });

  it("renders with mono variant", () => {
    const { container } = render(<Text mono>Content</Text>);
    const text = container.firstChild as HTMLElement;
    expect(text.className).toContain("st-Text--mono");
  });

  it("renders with multiple variants", () => {
    const { container } = render(
      <Text size={4} weight="semibold" tone="muted">
        Content
      </Text>
    );
    const text = container.firstChild as HTMLElement;
    expect(text.className).toBe(
      "st-Text st-Text--size-4 st-Text--weight-semibold st-Text--tone-muted"
    );
  });

  it("renders as span", () => {
    const { container } = render(<Text as="span">Content</Text>);
    expect(container.firstChild?.nodeName).toBe("SPAN");
  });

  it("renders as label", () => {
    const { container } = render(<Text as="label">Content</Text>);
    expect(container.firstChild?.nodeName).toBe("LABEL");
  });

  it("renders as heading", () => {
    const { container } = render(<Text as="h1">Content</Text>);
    expect(container.firstChild?.nodeName).toBe("H1");
  });

  it("accepts custom className", () => {
    const { container } = render(<Text className="custom">Content</Text>);
    const text = container.firstChild as HTMLElement;
    expect(text.className).toContain("custom");
  });
});
