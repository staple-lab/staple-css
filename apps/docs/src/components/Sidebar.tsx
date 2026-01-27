import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronRight, ExternalLink } from "lucide-react";
import { navigationConfig } from "../navigation";
import "./Sidebar.css";

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

const SIDEBAR_SCROLL_KEY = "sidebar-scroll";
const SIDEBAR_EXPANDED_KEY = "sidebar-expanded";

export function Sidebar({ isOpen: controlledIsOpen, onToggle }: SidebarProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(["Getting Started", "Foundations", "Documentation"])
  );
  const location = useLocation();
  const sidebarRef = useRef<HTMLElement>(null);

  // Handle controlled vs uncontrolled state
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const handleToggle = () => {
    const newState = !isOpen;
    setInternalIsOpen(newState);
    onToggle?.(newState);
  };

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setInternalIsOpen(false);
    }
  }, [location]);

  // Save expanded categories to session storage
  useEffect(() => {
    const categories = Array.from(expandedCategories);
    sessionStorage.setItem(`${SIDEBAR_EXPANDED_KEY}-${location.pathname}`, JSON.stringify(categories));
  }, [expandedCategories, location.pathname]);

  // Save scroll position to session storage
  useEffect(() => {
    const handleSidebarScroll = () => {
      if (sidebarRef.current) {
        sessionStorage.setItem(
          `${SIDEBAR_SCROLL_KEY}-${location.pathname}`,
          sidebarRef.current.scrollTop.toString()
        );
      }
    };

    const sidebar = sidebarRef.current;
    if (sidebar) {
      sidebar.addEventListener("scroll", handleSidebarScroll, { passive: true });
      return () => sidebar.removeEventListener("scroll", handleSidebarScroll);
    }
  }, [location.pathname]);

  // Restore expanded categories and scroll position on mount
  useEffect(() => {
    const savedExpanded = sessionStorage.getItem(`${SIDEBAR_EXPANDED_KEY}-${location.pathname}`);
    if (savedExpanded) {
      try {
        setExpandedCategories(new Set(JSON.parse(savedExpanded)));
      } catch {
        // Ignore parse errors
      }
    }

    // Restore scroll position
    if (sidebarRef.current) {
      const savedScroll = sessionStorage.getItem(`${SIDEBAR_SCROLL_KEY}-${location.pathname}`);
      if (savedScroll) {
        setTimeout(() => {
          if (sidebarRef.current) {
            sidebarRef.current.scrollTop = parseInt(savedScroll, 10);
          }
        }, 0);
      }
    }
  }, [location.pathname]);

  const toggleCategory = (categoryLabel: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryLabel)) {
      newExpanded.delete(categoryLabel);
    } else {
      newExpanded.add(categoryLabel);
    }
    setExpandedCategories(newExpanded);
  };

  const isCategoryActive = (items: typeof navigationConfig[0]["items"]) => {
    return items.some((item) => {
      if (item.href === location.pathname) return true;
      if (item.children) {
        return item.children.some((child) => child.href === location.pathname);
      }
      return false;
    });
  };

  return (
    <>
      {/* Mobile menu toggle button */}
      <button
        className="sidebar-toggle"
        onClick={handleToggle}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        title="Toggle sidebar"
      >
        {isOpen ? (
          <X size={24} strokeWidth={2} />
        ) : (
          <Menu size={24} strokeWidth={2} />
        )}
      </button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="sidebar-backdrop"
          onClick={handleToggle}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`} ref={sidebarRef}>
      <nav className="sidebar-nav">
        {navigationConfig.map((category) => {
          const isExpanded = expandedCategories.has(category.label);
          const isActive = isCategoryActive(category.items);

          return (
            <div key={category.label} className="nav-category">
              <button
                className={`nav-category-label ${isActive ? "active" : ""}`}
                onClick={() => toggleCategory(category.label)}
                aria-expanded={isExpanded}
              >
                <span>{category.label}</span>
                <ChevronRight
                  size={18}
                  strokeWidth={2}
                  className={`chevron ${isExpanded ? "open" : ""}`}
                />
              </button>

              {isExpanded && (
                <ul className="nav-items">
                  {category.items.map((item) => {
                    const isExternal =
                      item.href && (item.href.startsWith("http") || item.href === "/storybook");
                    return (
                      <li key={item.label}>
                        {item.href ? (
                          isExternal ? (
                            <a
                              href={item.href}
                              className="nav-link"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.label}
                              <ExternalLink size={14} strokeWidth={2} className="external-icon" />
                            </a>
                          ) : (
                            <NavLink
                              to={item.href}
                              className={({ isActive }) =>
                                `nav-link ${isActive ? "active" : ""}`
                              }
                            >
                              {item.label}
                            </NavLink>
                          )
                        ) : (
                          <span className="nav-label">{item.label}</span>
                        )}
                        {item.children && item.children.length > 0 && (
                          <ul className="nav-subitems">
                            {item.children.map((child) => (
                              <li key={child.label}>
                                <NavLink
                                  to={child.href || "#"}
                                  className={({ isActive }) =>
                                    `nav-link child ${isActive ? "active" : ""}`
                                  }
                                >
                                  {child.label}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
      </aside>
    </>
  );
}
