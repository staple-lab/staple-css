import { useState, useEffect, useRef, useCallback } from "react";
import { Box, Column, Row, Text, Flex } from "@staple-css/primitives/full";
import "./SearchPalette.css";

/**
 * Search index entry
 */
interface SearchEntry {
  id: string;
  title: string;
  description?: string;
  category: "tokens" | "pages" | "patterns";
  type: "color" | "space" | "typography" | "motion" | "radius" | "shadow" | "page" | "pattern";
  query: string; // searchable string
  path?: string; // navigation path
  icon?: string;
}

/**
 * Build the static search index
 */
function buildSearchIndex(): SearchEntry[] {
  return [
    // Color tokens
    {
      id: "color-primary",
      title: "Primary",
      category: "tokens",
      type: "color",
      query: "primary color brand",
    },
    {
      id: "color-danger",
      title: "Danger",
      category: "tokens",
      type: "color",
      query: "danger color red error",
    },
    {
      id: "color-success",
      title: "Success",
      category: "tokens",
      type: "color",
      query: "success color green valid",
    },
    {
      id: "color-warn",
      title: "Warning",
      category: "tokens",
      type: "color",
      query: "warn warning color yellow",
    },
    {
      id: "color-neutral",
      title: "Neutral",
      category: "tokens",
      type: "color",
      query: "neutral color gray",
    },

    // Space tokens
    {
      id: "space-0",
      title: "Space 0",
      description: "0px",
      category: "tokens",
      type: "space",
      query: "space 0 spacing padding margin none",
    },
    {
      id: "space-1",
      title: "Space 1",
      description: "4px",
      category: "tokens",
      type: "space",
      query: "space 1 spacing padding margin",
    },
    {
      id: "space-2",
      title: "Space 2",
      description: "8px",
      category: "tokens",
      type: "space",
      query: "space 2 spacing padding margin",
    },
    {
      id: "space-3",
      title: "Space 3",
      description: "12px",
      category: "tokens",
      type: "space",
      query: "space 3 spacing padding margin",
    },
    {
      id: "space-4",
      title: "Space 4",
      description: "16px",
      category: "tokens",
      type: "space",
      query: "space 4 spacing padding margin",
    },
    {
      id: "space-5",
      title: "Space 5",
      description: "24px",
      category: "tokens",
      type: "space",
      query: "space 5 spacing padding margin",
    },
    {
      id: "space-6",
      title: "Space 6",
      description: "32px",
      category: "tokens",
      type: "space",
      query: "space 6 spacing padding margin",
    },
    {
      id: "space-7",
      title: "Space 7",
      description: "48px",
      category: "tokens",
      type: "space",
      query: "space 7 spacing padding margin",
    },
    {
      id: "space-8",
      title: "Space 8",
      description: "64px",
      category: "tokens",
      type: "space",
      query: "space 8 spacing padding margin",
    },

    // Radius tokens
    {
      id: "radius-0",
      title: "Radius 0",
      description: "sharp",
      category: "tokens",
      type: "radius",
      query: "radius 0 sharp border corner",
    },
    {
      id: "radius-1",
      title: "Radius 1",
      description: "subtle",
      category: "tokens",
      type: "radius",
      query: "radius 1 subtle border corner rounded",
    },
    {
      id: "radius-2",
      title: "Radius 2",
      description: "standard",
      category: "tokens",
      type: "radius",
      query: "radius 2 standard border corner",
    },
    {
      id: "radius-3",
      title: "Radius 3",
      description: "prominent",
      category: "tokens",
      type: "radius",
      query: "radius 3 prominent border corner",
    },
    {
      id: "radius-4",
      title: "Radius 4",
      description: "pill",
      category: "tokens",
      type: "radius",
      query: "radius 4 pill border corner rounded",
    },

    // Shadow tokens
    {
      id: "shadow-0",
      title: "Shadow 0",
      description: "none",
      category: "tokens",
      type: "shadow",
      query: "shadow 0 elevation none",
    },
    {
      id: "shadow-1",
      title: "Shadow 1",
      description: "subtle",
      category: "tokens",
      type: "shadow",
      query: "shadow 1 subtle elevation",
    },
    {
      id: "shadow-2",
      title: "Shadow 2",
      description: "standard",
      category: "tokens",
      type: "shadow",
      query: "shadow 2 standard elevation",
    },
    {
      id: "shadow-3",
      title: "Shadow 3",
      description: "strong",
      category: "tokens",
      type: "shadow",
      query: "shadow 3 strong elevation",
    },

    // Typography tokens
    {
      id: "type-size-0",
      title: "Size 0 (XS)",
      description: "12px",
      category: "tokens",
      type: "typography",
      query: "typography size 0 extra small",
    },
    {
      id: "type-size-1",
      title: "Size 1 (S)",
      description: "14px",
      category: "tokens",
      type: "typography",
      query: "typography size 1 small",
    },
    {
      id: "type-size-2",
      title: "Size 2 (M)",
      description: "16px",
      category: "tokens",
      type: "typography",
      query: "typography size 2 medium",
    },
    {
      id: "type-size-3",
      title: "Size 3 (L)",
      description: "18px",
      category: "tokens",
      type: "typography",
      query: "typography size 3 large",
    },
    {
      id: "type-size-4",
      title: "Size 4 (XL)",
      description: "21px",
      category: "tokens",
      type: "typography",
      query: "typography size 4 extra large",
    },
    {
      id: "type-size-5",
      title: "Size 5 (2XL)",
      description: "24px",
      category: "tokens",
      type: "typography",
      query: "typography size 5 2xl",
    },
    {
      id: "type-size-6",
      title: "Size 6 (3XL)",
      description: "32px",
      category: "tokens",
      type: "typography",
      query: "typography size 6 3xl",
    },

    // Motion tokens
    {
      id: "motion-fast",
      title: "Duration Fast",
      category: "tokens",
      type: "motion",
      query: "motion animation duration fast quick",
    },
    {
      id: "motion-normal",
      title: "Duration Normal",
      category: "tokens",
      type: "motion",
      query: "motion animation duration normal standard",
    },
    {
      id: "motion-slow",
      title: "Duration Slow",
      category: "tokens",
      type: "motion",
      query: "motion animation duration slow",
    },
    {
      id: "easing-default",
      title: "Easing Default",
      category: "tokens",
      type: "motion",
      query: "easing animation curve default",
    },
    {
      id: "easing-in",
      title: "Easing In",
      category: "tokens",
      type: "motion",
      query: "easing animation curve in",
    },
    {
      id: "easing-out",
      title: "Easing Out",
      category: "tokens",
      type: "motion",
      query: "easing animation curve out",
    },

    // Pages
    {
      id: "page-home",
      title: "Home",
      category: "pages",
      type: "page",
      query: "home start welcome",
      path: "/",
    },
    {
      id: "page-tokens",
      title: "Tokens",
      category: "pages",
      type: "page",
      query: "tokens design system variables",
      path: "/tokens",
    },
    {
      id: "page-reference",
      title: "Token Reference",
      category: "pages",
      type: "page",
      query: "reference token documentation",
      path: "/token-reference",
    },
    {
      id: "page-guides",
      title: "Guides",
      category: "pages",
      type: "page",
      query: "guides documentation tutorials how-to",
      path: "/guides",
    },
    {
      id: "page-colors",
      title: "Colors & Gradients",
      category: "pages",
      type: "page",
      query: "colors gradients palette visual",
      path: "/colors",
    },
    {
      id: "page-visuals",
      title: "Visuals",
      category: "pages",
      type: "page",
      query: "visuals imagery assets",
      path: "/visuals",
    },
    {
      id: "page-components",
      title: "Components",
      category: "pages",
      type: "page",
      query: "components patterns ui kit",
      path: "/components",
    },
    {
      id: "page-gradient-studio",
      title: "Gradient Studio",
      category: "pages",
      type: "page",
      query: "gradient studio tool generator",
      path: "/gradient-studio",
    },
    {
      id: "page-figma",
      title: "Figma Integration",
      category: "pages",
      type: "page",
      query: "figma integration design tool",
      path: "/figma",
    },
    {
      id: "page-primitives",
      title: "Primitives",
      category: "pages",
      type: "page",
      query: "primitives components react box text",
      path: "/primitives",
    },
    {
      id: "page-why",
      title: "Why staple-css",
      category: "pages",
      type: "page",
      query: "why philosophy rationale",
      path: "/why",
    },
    {
      id: "page-examples",
      title: "Examples",
      category: "pages",
      type: "page",
      query: "examples code samples",
      path: "/examples",
    },
    {
      id: "page-studio",
      title: "Tokens Studio",
      category: "pages",
      type: "page",
      query: "studio tokens builder editor",
      path: "/tokens-studio",
    },

    // Common patterns
    {
      id: "pattern-button-primary",
      title: "Button Primary",
      description: "Primary action button",
      category: "patterns",
      type: "pattern",
      query: "button primary action call-to-action",
    },
    {
      id: "pattern-button-secondary",
      title: "Button Secondary",
      description: "Secondary action button",
      category: "patterns",
      type: "pattern",
      query: "button secondary alternative",
    },
    {
      id: "pattern-button-danger",
      title: "Button Danger",
      description: "Destructive action button",
      category: "patterns",
      type: "pattern",
      query: "button danger destructive delete",
    },
    {
      id: "pattern-card-elevated",
      title: "Card Elevated",
      description: "Elevated card surface",
      category: "patterns",
      type: "pattern",
      query: "card elevated shadow surface",
    },
    {
      id: "pattern-card-flat",
      title: "Card Flat",
      description: "Flat card surface",
      category: "patterns",
      type: "pattern",
      query: "card flat minimal surface",
    },
    {
      id: "pattern-badge-primary",
      title: "Badge Primary",
      description: "Primary status badge",
      category: "patterns",
      type: "pattern",
      query: "badge status label tag",
    },
    {
      id: "pattern-badge-success",
      title: "Badge Success",
      description: "Success status badge",
      category: "patterns",
      type: "pattern",
      query: "badge success status",
    },
    {
      id: "pattern-alert-info",
      title: "Alert Info",
      description: "Informational alert",
      category: "patterns",
      type: "pattern",
      query: "alert info notification message",
    },
    {
      id: "pattern-alert-warning",
      title: "Alert Warning",
      description: "Warning alert",
      category: "patterns",
      type: "pattern",
      query: "alert warning caution",
    },
    {
      id: "pattern-alert-error",
      title: "Alert Error",
      description: "Error alert",
      category: "patterns",
      type: "pattern",
      query: "alert error danger failure",
    },
    {
      id: "pattern-form-field",
      title: "Form Field",
      description: "Standard form input field",
      category: "patterns",
      type: "pattern",
      query: "form field input label",
    },
    {
      id: "pattern-modal",
      title: "Modal Dialog",
      description: "Modal overlay dialog",
      category: "patterns",
      type: "pattern",
      query: "modal dialog overlay popup",
    },
    {
      id: "pattern-dropdown-menu",
      title: "Dropdown Menu",
      description: "Dropdown menu component",
      category: "patterns",
      type: "pattern",
      query: "dropdown menu select options",
    },
    {
      id: "pattern-tabs",
      title: "Tabs",
      description: "Tab navigation component",
      category: "patterns",
      type: "pattern",
      query: "tabs navigation tabbed interface",
    },
  ];
}

/**
 * Simple fuzzy search function
 */
function fuzzySearch(query: string, text: string): number {
  const queryLower = query.toLowerCase();
  const textLower = text.toLowerCase();

  if (textLower.includes(queryLower)) {
    // Exact substring match
    return 100;
  }

  let score = 0;
  let queryIndex = 0;
  let textIndex = 0;
  let consecutive = 0;

  while (queryIndex < queryLower.length && textIndex < textLower.length) {
    if (queryLower[queryIndex] === textLower[textIndex]) {
      consecutive += 1;
      queryIndex += 1;
      score += (10 * consecutive) / textLower.length;
    } else {
      consecutive = 0;
      queryIndex = 0;
    }
    textIndex += 1;
  }

  return queryIndex === queryLower.length ? score : 0;
}

/**
 * Group results by category
 */
function groupResults(
  results: SearchEntry[]
): Record<string, SearchEntry[]> {
  return results.reduce<Record<string, SearchEntry[]>>(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category]!.push(item);
      return acc;
    },
    {}
  );
}

interface SearchPaletteProps {
  onNavigate?: (path: string) => void;
}

export function SearchPalette({ onNavigate }: SearchPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const searchIndex = buildSearchIndex();

  // Filter and score results
  const results = query.trim()
    ? searchIndex
        .map((entry) => ({
          entry,
          score: fuzzySearch(query, entry.query),
        }))
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 20)
        .map(({ entry }) => entry)
    : searchIndex.slice(0, 12);

  const grouped = groupResults(results);
  const flatResults = Object.values(grouped).flat();

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform);
      const modifier = isMac ? e.metaKey : e.ctrlKey;

      if (modifier && e.key === "k") {
        e.preventDefault();
        setIsOpen(!isOpen);
        if (!isOpen) {
          setQuery("");
          setSelectedIndex(0);
        }
      }

      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : flatResults.length - 1
          );
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < flatResults.length - 1 ? prev + 1 : 0
          );
          break;
        case "Enter":
          e.preventDefault();
          if (flatResults[selectedIndex]) {
            handleSelect(flatResults[selectedIndex]);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, flatResults, selectedIndex]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const selectedElement = listRef.current.querySelector(
        '[data-selected="true"]'
      );
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  const handleSelect = (entry: SearchEntry) => {
    if (entry.path) {
      onNavigate?.(entry.path);
      window.location.hash = entry.path;
    }
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(0);
  };

  const getCategoryLabel = (category: string): string => {
    const labels: Record<string, string> = {
      tokens: "Design Tokens",
      pages: "Documentation",
      patterns: "UI Patterns",
    };
    return labels[category] || category;
  };

  return (
    <>
      {/* Keyboard hint button in header */}
      <button
        onClick={() => setIsOpen(true)}
        className="search-trigger"
        title="Press Cmd+K (Mac) or Ctrl+K (Windows/Linux) to search"
        aria-label="Open search palette"
      >
        <span className="search-icon">🔍</span>
        <span className="search-text">Search</span>
        <span className="search-hint">
          {/Mac|iPhone|iPad|iPod/.test(navigator.platform) ? "⌘K" : "Ctrl+K"}
        </span>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <Box
          as="div"
          className="search-backdrop"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Search Palette Modal */}
      {isOpen && (
        <Box
          as="div"
          className="search-palette-container"
          role="dialog"
          aria-labelledby="search-title"
          aria-modal="true"
        >
          <Box
            as="div"
            className="search-palette"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <Box className="search-input-wrapper" pad={4} borderWidth={0}>
              <Box as="div" className="search-field-icon">
                🔍
              </Box>
              <input
                ref={inputRef}
                type="text"
                className="search-input"
                placeholder="Search tokens, pages, patterns..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                aria-label="Search"
                aria-autocomplete="list"
                aria-controls="search-results"
                aria-expanded={isOpen}
              />
            </Box>

            {/* Results */}
            {flatResults.length > 0 ? (
              <div
                className="search-results"
                ref={listRef}
                id="search-results"
                role="listbox"
              >
                {Object.entries(grouped).map(([category, items]) => (
                  <Box key={category} as="div" className="search-group">
                    <Text
                      as="h3"
                      className="search-group-title"
                      size={0}
                      weight="semibold"
                      tone="muted"
                    >
                      {getCategoryLabel(category)}
                    </Text>
                    <Box as="ul" className="search-items">
                      {items.map((entry, idx) => {
                        const globalIndex = flatResults.indexOf(entry);
                        return (
                          <Box
                            key={entry.id}
                            as="li"
                            className={`search-item ${
                              globalIndex === selectedIndex ? "selected" : ""
                            }`}
                            data-selected={globalIndex === selectedIndex}
                            role="option"
                            aria-selected={globalIndex === selectedIndex}
                            onClick={() => handleSelect(entry)}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                          >
                            <Row gap={3} align="center" className="search-item-content">
                              <Box as="span" className="search-item-icon" style={{
                                width: "20px",
                                height: "20px",
                                borderRadius: "2px",
                                background: entry.type === "color" ? "var(--st-color-primary)" : entry.type === "space" ? "var(--st-color-primary)" : entry.type === "typography" ? "var(--st-color-primary)" : entry.type === "radius" ? "var(--st-color-primary)" : entry.type === "shadow" ? "var(--st-color-primary)" : entry.type === "motion" ? "var(--st-color-primary)" : "var(--st-color-primary)",
                                opacity: 0.2,
                                flexShrink: 0
                              }} />
                              <Column gap={1} className="search-item-text">
                                <Text
                                  as="span"
                                  size={1}
                                  weight="medium"
                                  className="search-item-title"
                                >
                                  {entry.title}
                                </Text>
                                {entry.description && (
                                  <Text
                                    as="span"
                                    size={0}
                                    tone="muted"
                                    className="search-item-description"
                                  >
                                    {entry.description}
                                  </Text>
                                )}
                              </Column>
                            </Row>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                ))}
              </div>
            ) : query.trim() ? (
              <Box className="search-empty" pad={6} align="center">
                <Text tone="muted" align="center">
                  No results found for "{query}"
                </Text>
              </Box>
            ) : null}

            {/* Footer with keyboard hints */}
            <Box className="search-footer" pad={3}>
              <Row gap={4} justify="between" align="center">
                <Row gap={4} align="center">
                  <Row gap={2} align="center" className="search-hint-row">
                    <Box as="kbd" className="search-kbd">
                      ↑↓
                    </Box>
                    <Text as="span" size={0} tone="muted">
                      Navigate
                    </Text>
                  </Row>
                  <Row gap={2} align="center" className="search-hint-row">
                    <Box as="kbd" className="search-kbd">
                      ↵
                    </Box>
                    <Text as="span" size={0} tone="muted">
                      Select
                    </Text>
                  </Row>
                </Row>
                <Row gap={2} align="center" className="search-hint-row">
                  <Box as="kbd" className="search-kbd">
                    Esc
                  </Box>
                  <Text as="span" size={0} tone="muted">
                    Close
                  </Text>
                </Row>
              </Row>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
