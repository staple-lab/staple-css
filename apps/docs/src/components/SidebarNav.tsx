import { useLocation, Link } from 'react-router-dom';
import {
  Home,
  HelpCircle,
  BookOpen,
  Palette,
  SwatchBook,
  Eye,
  LayoutGrid,
  Layers,
  FileCode,
  Blend,
  Wrench,
  Figma,
  ExternalLink,
  Ruler,
  Box,
  Type,
} from 'lucide-react';
import './SidebarNav.css';

const topNavItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/why', label: 'Why Staple CSS', icon: HelpCircle },
  { href: '/guides', label: 'Guides', icon: BookOpen },
  { href: '/tokens', label: 'Tokens', icon: SwatchBook },
  { href: '/token-reference', label: 'Token Reference', icon: FileCode },
  { href: '/colors', label: 'Colors', icon: Palette },
  { href: '/visuals', label: 'Visuals', icon: Eye },
  { href: '/primitives', label: 'Primitives', icon: Layers },
  { href: '/components', label: 'Patterns', icon: LayoutGrid },
  { href: '/examples', label: 'Examples', icon: Box },
];

const toolItems = [
  { href: '/gradient-studio', label: 'Gradient Studio', icon: Blend },
  { href: '/tokens-studio', label: 'Token Studio', icon: Wrench },
  { href: '/figma', label: 'Figma', icon: Figma },
];

const primitiveItems = [
  { href: '/color-primitives', label: 'Colour', icon: Palette },
  { href: '/spacing-primitives', label: 'Spacing', icon: Ruler },
  { href: '/sizing-primitives', label: 'Sizing', icon: Box },
  { href: '/type-primitives', label: 'Typography', icon: Type },
];

const resourceItems = [
  { href: '/storybook', label: 'Storybook', icon: ExternalLink, external: true },
];

export function SidebarNav() {
  const location = useLocation();

  return (
    <nav className="sidebar-nav-v2">
      <div className="sidebar-nav-v2-top">
        {topNavItems.map((item) => (
          <SidebarLink
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            isActive={location.pathname === item.href}
          />
        ))}

        <div className="sidebar-nav-v2-divider" />
        <div className="sidebar-nav-v2-section-label">Primitives</div>
        {primitiveItems.map((item) => (
          <SidebarLink
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            isActive={location.pathname === item.href}
          />
        ))}

        <div className="sidebar-nav-v2-divider" />
        <div className="sidebar-nav-v2-section-label">Tools</div>
        {toolItems.map((item) => (
          <SidebarLink
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            isActive={location.pathname === item.href}
          />
        ))}

        <div className="sidebar-nav-v2-divider" />
        <div className="sidebar-nav-v2-section-label">Resources</div>
        {resourceItems.map((item) => (
          <SidebarLink
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            isActive={location.pathname === item.href}
            external={'external' in item}
          />
        ))}
      </div>
    </nav>
  );
}

interface SidebarLinkProps {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  isActive: boolean;
  external?: boolean;
}

function SidebarLink({ href, label, icon: Icon, isActive, external }: SidebarLinkProps) {
  if (external) {
    return (
      <a
        href={href}
        className="sidebar-nav-v2-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon size={16} strokeWidth={1.5} />
        <span>{label}</span>
      </a>
    );
  }

  return (
    <Link
      to={href}
      className={`sidebar-nav-v2-link ${isActive ? 'active' : ''}`}
      aria-current={isActive ? 'page' : undefined}
    >
      <Icon size={16} strokeWidth={1.5} />
      <span>{label}</span>
    </Link>
  );
}
