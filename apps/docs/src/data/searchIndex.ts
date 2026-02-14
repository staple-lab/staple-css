import { allNavItems } from "./navigation";

export interface SearchEntry {
  title: string;
  path: string;
  keywords: string[];
}

const extraKeywords: Record<string, string[]> = {
  "/": ["home", "install", "npm", "quick", "start", "overview"],
  "/getting-started": ["install", "npm", "import", "css", "setup", "theme", "data-theme", "typescript"],
  "/why-staple": ["why", "principles", "contract", "semantic", "zero", "runtime", "dark", "mode"],
  "/tokens": ["tokens", "overview", "naming", "convention", "categories", "hierarchy"],
  "/tokens/color": ["color", "background", "foreground", "border", "icon", "ring", "light", "dark", "theme", "semantic", "bg", "fg", "bd", "status", "interactive", "surface"],
  "/tokens/spacing": ["space", "spacing", "padding", "margin", "gap", "rem", "px", "scale"],
  "/tokens/typography": ["type", "typography", "font", "size", "weight", "leading", "line-height", "tracking", "letter-spacing", "family", "sans", "mono"],
  "/tokens/elevation": ["elevation", "shadow", "box-shadow", "depth", "card", "dropdown", "modal"],
  "/tokens/motion": ["motion", "animation", "transition", "duration", "easing", "cubic-bezier", "spring"],
  "/tokens/border": ["border", "radius", "width", "rounded", "pill", "full", "sharp"],
  "/tokens/layout": ["layout", "container", "breakpoint", "screen", "z-index", "responsive", "media", "query", "sm", "md", "lg", "xl"],
  "/palettes": ["palette", "color", "tailwind", "shade", "50", "100", "500", "900", "ramp", "slate", "blue", "red", "green"],
  "/ai-usage": ["ai", "llm", "prompt", "claude", "cursor", "copilot", "chatgpt", "rules", "guide"],
};

export const searchIndex: SearchEntry[] = allNavItems.map((item) => ({
  title: item.label,
  path: item.path,
  keywords: [
    ...item.label.toLowerCase().split(/\s+/),
    ...(extraKeywords[item.path] ?? []),
  ],
}));
