import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { navigationConfig } from "../navigation";
import "./Sidebar.css";

export function Sidebar() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(["Getting Started", "Foundations", "Documentation"])
  );
  const location = useLocation();

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
    <aside className="sidebar">
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
                <span className={`chevron ${isExpanded ? "open" : ""}`}>
                  ▶
                </span>
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
                              <span className="external-icon">↗</span>
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
  );
}
