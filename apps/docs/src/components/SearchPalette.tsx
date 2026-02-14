import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { useSearch } from "../hooks/useSearch";

interface SearchPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchPalette({ isOpen, onClose }: SearchPaletteProps) {
  const { query, setQuery, results, selectedIndex, setSelectedIndex, moveSelection } =
    useSearch();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  function handleSelect(path: string) {
    navigate(path);
    onClose();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        moveSelection(1);
        break;
      case "ArrowUp":
        e.preventDefault();
        moveSelection(-1);
        break;
      case "Enter": {
        e.preventDefault();
        const item = results[selectedIndex];
        if (item) handleSelect(item.path);
        break;
      }
      case "Escape":
        e.preventDefault();
        onClose();
        break;
    }
  }

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const active = el.children[selectedIndex] as HTMLElement | undefined;
    active?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      className="animate-overlay"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: 120,
        backgroundColor: "var(--doc-color-bg-overlay)",
      }}
    >
      <div
        className="animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Search documentation"
        style={{
          width: "100%",
          maxWidth: 520,
          margin: "0 16px",
          borderRadius: 8,
          border: "1px solid var(--doc-color-border)",
          backgroundColor: "var(--doc-color-bg)",
          overflow: "hidden",
          boxShadow: "0 16px 48px rgba(0, 0, 0, 0.15)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 16px",
            borderBottom: "1px solid var(--doc-color-border)",
          }}
        >
          <Search size={16} style={{ color: "var(--doc-color-text-secondary)", flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search documentation..."
            aria-label="Search"
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              color: "var(--doc-color-text)",
              fontSize: "0.9375rem",
            }}
          />
          <kbd
            style={{
              padding: "2px 6px",
              fontSize: "0.6875rem",
              borderRadius: 4,
              border: "1px solid var(--doc-color-kbd-border)",
              backgroundColor: "var(--doc-color-kbd-bg)",
              color: "var(--doc-color-text-secondary)",
            }}
          >
            esc
          </kbd>
        </div>
        <div
          ref={listRef}
          role="listbox"
          style={{
            maxHeight: 320,
            overflowY: "auto",
            padding: "8px 0",
          }}
        >
          {results.length === 0 ? (
            <div
              style={{
                padding: "24px 16px",
                textAlign: "center",
                color: "var(--doc-color-text-secondary)",
                fontSize: "0.875rem",
              }}
            >
              No results found
            </div>
          ) : (
            results.map((entry, i) => (
              <button
                key={entry.path}
                role="option"
                aria-selected={i === selectedIndex}
                onClick={() => handleSelect(entry.path)}
                onMouseEnter={() => setSelectedIndex(i)}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px 16px",
                  border: "none",
                  background:
                    i === selectedIndex
                      ? "var(--doc-color-bg-secondary)"
                      : "transparent",
                  color: "var(--doc-color-text)",
                  textAlign: "left",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  lineHeight: "1.4",
                }}
              >
                {entry.title}
                <span
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    color: "var(--doc-color-text-tertiary)",
                    marginTop: 2,
                  }}
                >
                  {entry.path}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
