import { describe, it, expect } from "vitest";
import { cx } from "./cx";

describe("cx", () => {
  it("returns empty string for no arguments", () => {
    expect(cx()).toBe("");
  });

  it("returns single class", () => {
    expect(cx("foo")).toBe("foo");
  });

  it("joins multiple classes", () => {
    expect(cx("foo", "bar", "baz")).toBe("foo bar baz");
  });

  it("filters out falsy values", () => {
    expect(cx("foo", false, "bar", null, "baz", undefined)).toBe("foo bar baz");
  });

  it("handles conditional classes", () => {
    const isActive = true;
    const isDisabled = false;
    expect(cx("base", isActive && "active", isDisabled && "disabled")).toBe(
      "base active"
    );
  });

  it("handles all falsy values", () => {
    expect(cx(false, null, undefined, false)).toBe("");
  });

  it("preserves spaces in class names", () => {
    expect(cx("foo bar")).toBe("foo bar");
  });
});
