import { Sidebar } from "./Sidebar";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <div
      className="animate-overlay"
      style={{
        position: "fixed",
        inset: 0,
        top: 56,
        zIndex: 50,
        backgroundColor: "var(--doc-color-bg)",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <div style={{ padding: "16px 0" }}>
        <Sidebar onNavigate={onClose} />
      </div>
    </div>
  );
}
