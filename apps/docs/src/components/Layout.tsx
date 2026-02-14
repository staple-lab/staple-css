import { useState, useEffect, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { SearchPalette } from "./SearchPalette";

export function Layout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  // Close mobile nav on route change
  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname]);

  // Cmd+K / Ctrl+K to open search
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "/" && !searchOpen) {
        const active = document.activeElement;
        const isInput =
          active instanceof HTMLInputElement ||
          active instanceof HTMLTextAreaElement;
        if (!isInput) {
          e.preventDefault();
          setSearchOpen(true);
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen]);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen]);

  const handleSearchOpen = useCallback(() => setSearchOpen(true), []);
  const handleSearchClose = useCallback(() => setSearchOpen(false), []);
  const handleMobileNavToggle = useCallback(
    () => setMobileNavOpen((prev) => !prev),
    [],
  );
  const handleSidebarNavigate = useCallback(
    () => setMobileNavOpen(false),
    [],
  );

  return (
    <div className="doc-layout">
      <aside className="doc-sidebar" aria-label="Sidebar navigation">
        <Sidebar onNavigate={handleSidebarNavigate} />
      </aside>
      <div className="doc-main-wrapper">
        <Header
          onSearchOpen={handleSearchOpen}
          isMobileNavOpen={mobileNavOpen}
          onMobileNavToggle={handleMobileNavToggle}
        />
        <main className="doc-content">
          <Outlet />
        </main>
        <footer className="doc-footer" role="contentinfo">
          staple-css
        </footer>
      </div>
      <MobileNav isOpen={mobileNavOpen} onClose={handleMobileNavToggle} />
      <SearchPalette isOpen={searchOpen} onClose={handleSearchClose} />
    </div>
  );
}
