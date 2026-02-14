import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const icons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
} as const;

const labels = {
  light: "Light mode",
  dark: "Dark mode",
  system: "System theme",
} as const;

export function ThemeToggle() {
  const { theme, cycle } = useTheme();
  const Icon = icons[theme];

  return (
    <button
      onClick={cycle}
      aria-label={labels[theme]}
      title={labels[theme]}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 36,
        height: 36,
        border: "1px solid var(--doc-color-border)",
        borderRadius: 6,
        background: "transparent",
        color: "var(--doc-color-text-secondary)",
        cursor: "pointer",
      }}
    >
      <Icon size={16} />
    </button>
  );
}
