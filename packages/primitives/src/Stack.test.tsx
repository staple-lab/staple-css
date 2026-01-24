import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Stack } from "./Stack";

describe("Stack", () => {
  it("renders with base class", () => {
    const { container } = render(<Stack>Content</Stack>);
    const stack = container.firstChild as HTMLElement;
    expect(stack.className).toBe("st-Stack");
  });

  it("renders with gap variant", () => {
    const { container } = render(<Stack gap={4}>Content</Stack>);
    const stack = container.firstChild as HTMLElement;
    expect(stack.className).toContain("st-Stack--gap-4");
  });

  it("renders with align variant", () => {
    const { container } = render(<Stack align="center">Content</Stack>);
    const stack = container.firstChild as HTMLElement;
    expect(stack.className).toContain("st-Stack--align-center");
  });

  it("renders with multiple variants", () => {
    const { container } = render(
      <Stack gap={3} align="start">
        Content
      </Stack>
    );
    const stack = container.firstChild as HTMLElement;
    expect(stack.className).toBe("st-Stack st-Stack--gap-3 st-Stack--align-start");
  });

  it("accepts custom className", () => {
    const { container } = render(<Stack className="custom">Content</Stack>);
    const stack = container.firstChild as HTMLElement;
    expect(stack.className).toContain("custom");
  });

  it("renders as different element via as prop", () => {
    const { container } = render(<Stack as="ul">Content</Stack>);
    expect(container.firstChild?.nodeName).toBe("UL");
  });

  it("renders multiple children", () => {
    const { getByText } = render(
      <Stack gap={2}>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
      </Stack>
    );
    expect(getByText("First")).toBeTruthy();
    expect(getByText("Second")).toBeTruthy();
    expect(getByText("Third")).toBeTruthy();
  });
});
