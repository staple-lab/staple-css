import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Box } from "./Box";

describe("Box", () => {
  it("renders with base class", () => {
    const { container } = render(<Box>Content</Box>);
    const box = container.firstChild as HTMLElement;
    expect(box.className).toBe("st-Box");
  });

  it("renders with pad variant", () => {
    const { container } = render(<Box pad={4}>Content</Box>);
    const box = container.firstChild as HTMLElement;
    expect(box.className).toContain("st-Box");
    expect(box.className).toContain("st-Box--pad-4");
  });

  it("renders with radius variant", () => {
    const { container } = render(<Box radius={2}>Content</Box>);
    const box = container.firstChild as HTMLElement;
    expect(box.className).toContain("st-Box--radius-2");
  });

  it("renders with shadow variant", () => {
    const { container } = render(<Box shadow={1}>Content</Box>);
    const box = container.firstChild as HTMLElement;
    expect(box.className).toContain("st-Box--shadow-1");
  });

  it("renders with multiple variants", () => {
    const { container } = render(
      <Box pad={3} radius={2} shadow={1}>
        Content
      </Box>
    );
    const box = container.firstChild as HTMLElement;
    expect(box.className).toBe("st-Box st-Box--pad-3 st-Box--radius-2 st-Box--shadow-1");
  });

  it("accepts custom className", () => {
    const { container } = render(<Box className="custom">Content</Box>);
    const box = container.firstChild as HTMLElement;
    expect(box.className).toContain("custom");
  });

  it("renders as different element via as prop", () => {
    const { container } = render(<Box as="section">Content</Box>);
    expect(container.firstChild?.nodeName).toBe("SECTION");
  });

  it("accepts style prop with allowed properties", () => {
    const { container } = render(
      <Box style={{ width: "100px", height: "50px" }}>Content</Box>
    );
    const box = container.firstChild as HTMLElement;
    expect(box.style.width).toBe("100px");
    expect(box.style.height).toBe("50px");
  });

  it("passes through other HTML attributes", () => {
    const { container } = render(
      <Box data-testid="test-box" aria-label="Test">
        Content
      </Box>
    );
    const box = container.firstChild as HTMLElement;
    expect(box.getAttribute("data-testid")).toBe("test-box");
    expect(box.getAttribute("aria-label")).toBe("Test");
  });

  it("renders children correctly", () => {
    const { getByText } = render(<Box>Hello World</Box>);
    expect(getByText("Hello World")).toBeTruthy();
  });
});
