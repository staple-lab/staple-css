import { useLocation, Link } from 'react-router-dom';
import { Box, Column, Row, Text } from '@staple-css/primitives/full';
import {
  Home,
  Lightbulb,
  Compass,
  FileText,
  Palette,
  Layers,
  Grid3x3,
  Eye,
  Zap,
  Settings,
  Share2,
  Book,
} from 'lucide-react';
import './SidebarNav.css';

const navigationStructure = [
  {
    title: 'Foundation',
    items: [
      { href: '/', label: 'Home', icon: Home },
      { href: '/why', label: 'Why staple-css?', icon: Lightbulb },
      { href: '/guides', label: 'Design Guides', icon: Compass },
    ],
  },
  {
    title: 'Tokens',
    items: [
      { href: '/tokens', label: 'All Tokens', icon: FileText },
      { href: '/token-reference', label: 'Token Reference', icon: Book },
      { href: '/colors', label: 'Colors', icon: Palette },
    ],
  },
  {
    title: 'Components',
    items: [
      { href: '/primitives', label: 'Primitives', icon: Layers },
      { href: '/components', label: 'Patterns', icon: Grid3x3 },
      { href: '/visuals', label: 'Visuals', icon: Eye },
    ],
  },
  {
    title: 'Tools',
    items: [
      { href: '/gradient-studio', label: 'Gradient Studio', icon: Zap },
      { href: '/token-reference', label: 'Token Studio', icon: Settings },
      { href: '/figma', label: 'Figma Integration', icon: Share2 },
    ],
  },
];

export function SidebarNav() {
  const location = useLocation();

  return (
    <Box as="nav" className="sidebar-nav">
      <Column gap={4} style={{ padding: 'var(--st-space-4)' }}>
        {navigationStructure.map((section) => (
          <SidebarSection key={section.title} title={section.title}>
            {section.items.map((item) => (
              <SidebarItem
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                isActive={location.pathname === item.href}
              />
            ))}
          </SidebarSection>
        ))}
      </Column>
    </Box>
  );
}

function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Column gap={3}>
      <Text
        size={0}
        weight="semibold"
        tone="muted"
        style={{
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          paddingLeft: 'var(--st-space-2)',
          fontSize: '0.75rem',
        }}
      >
        {title}
      </Text>
      <Column gap={1}>{children}</Column>
    </Column>
  );
}

interface SidebarItemProps {
  href: string;
  label: string;
  icon: React.ComponentType<{ size: number; strokeWidth?: number }>;
  isActive: boolean;
}

function SidebarItem({ href, label, icon: Icon, isActive }: SidebarItemProps) {
  return (
    <Link
      to={href}
      className={`sidebar-item ${isActive ? 'active' : ''}`}
      aria-current={isActive ? 'page' : undefined}
    >
      <Row gap={3} align="center" style={{ width: '100%' }}>
        <div
          className={`sidebar-icon ${isActive ? 'active' : ''}`}
        >
          <Icon size={18} strokeWidth={1.5} />
        </div>
        <Text
          size={1}
          weight={isActive ? 'semibold' : 'normal'}
          style={{
            color: isActive
              ? 'var(--st-color-primary)'
              : 'var(--st-color-text)',
            transition: 'color 150ms cubic-bezier(0.2, 0, 0.38, 0.9)',
          }}
        >
          {label}
        </Text>
      </Row>
    </Link>
  );
}
