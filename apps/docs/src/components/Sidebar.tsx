import { NavLink } from "react-router-dom";
import { navigation } from "../data/navigation";

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  return (
    <nav aria-label="Documentation">
      {navigation.map((section) => (
        <div key={section.title} style={{ marginBottom: 24 }}>
          <div
            style={{
              padding: "0 20px",
              marginBottom: 4,
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--doc-color-text-secondary)",
            }}
          >
            {section.title}
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {section.items.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === "/"}
                  onClick={onNavigate}
                  style={({ isActive }) => ({
                    display: "block",
                    padding: "6px 20px",
                    fontSize: "0.875rem",
                    lineHeight: "1.5",
                    color: isActive
                      ? "var(--doc-color-text)"
                      : "var(--doc-color-text-secondary)",
                    fontWeight: isActive ? 600 : 400,
                    textDecoration: "none",
                    minHeight: 36,
                    alignContent: "center",
                  })}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
