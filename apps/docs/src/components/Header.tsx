import { Search, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  onSearchOpen: () => void;
  isMobileNavOpen: boolean;
  onMobileNavToggle: () => void;
}

export function Header({
  onSearchOpen,
  isMobileNavOpen,
  onMobileNavToggle,
}: HeaderProps) {
  return (
    <header className="doc-header" role="banner">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button
          onClick={onMobileNavToggle}
          aria-label={isMobileNavOpen ? "Close menu" : "Open menu"}
          className="mobile-menu-btn"
          style={{
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            width: 44,
            height: 44,
            border: "none",
            background: "transparent",
            color: "var(--doc-color-text)",
            cursor: "pointer",
          }}
        >
          {isMobileNavOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <Link
          to="/"
          style={{
            fontSize: "1rem",
            fontWeight: 600,
            color: "var(--doc-color-text)",
            textDecoration: "none",
            letterSpacing: "-0.01em",
          }}
        >
          staple-css
        </Link>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button
          onClick={onSearchOpen}
          aria-label="Search documentation"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 12px",
            border: "1px solid var(--doc-color-border)",
            borderRadius: 6,
            background: "transparent",
            color: "var(--doc-color-text-secondary)",
            cursor: "pointer",
            fontSize: "0.8125rem",
            minHeight: 36,
          }}
        >
          <Search size={14} />
          <span className="search-shortcut">
            Search
            <kbd
              style={{
                marginLeft: 8,
                padding: "1px 5px",
                fontSize: "0.6875rem",
                borderRadius: 4,
                border: "1px solid var(--doc-color-kbd-border)",
                backgroundColor: "var(--doc-color-kbd-bg)",
              }}
            >
              /
            </kbd>
          </span>
        </button>
        <ThemeToggle />
        <a
          href="https://github.com/patrickdunne-dev/staple-css"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub repository"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            border: "1px solid var(--doc-color-border)",
            borderRadius: 6,
            color: "var(--doc-color-text-secondary)",
            textDecoration: "none",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>
      </div>
      <style>{`
        @media (max-width: 767px) {
          .mobile-menu-btn { display: inline-flex !important; }
          .search-shortcut kbd { display: none; }
        }
      `}</style>
    </header>
  );
}
