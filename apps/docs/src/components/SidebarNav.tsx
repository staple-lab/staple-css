import { useLocation, Link } from 'react-router-dom';
import { Box, Column, Text } from '@staple-css/primitives/full';
import './SidebarNav.css';

const navigationStructure = [
  {
    title: 'Foundation',
    items: [
      { href: '/', label: 'Home' },
      { href: '/why', label: 'Why staple-css?' },
      { href: '/guides', label: 'Design Guides' },
    ],
  },
  {
    title: 'Tokens',
    items: [
      { href: '/tokens', label: 'All Tokens' },
      { href: '/token-reference', label: 'Token Reference' },
      { href: '/colors', label: 'Colors' },
    ],
  },
  {
    title: 'Components',
    items: [
      { href: '/primitives', label: 'Primitives' },
      { href: '/components', label: 'Patterns' },
      { href: '/visuals', label: 'Visuals' },
    ],
  },
  {
    title: 'Tools',
    items: [
      { href: '/gradient-studio', label: 'Gradient Studio' },
      { href: '/token-reference', label: 'Token Studio' },
      { href: '/figma', label: 'Figma Integration' },
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
  isActive: boolean;
}

function SidebarItem({ href, label, isActive }: SidebarItemProps) {
  return (
    <Link
      to={href}
      className={`sidebar-item ${isActive ? 'active' : ''}`}
      aria-current={isActive ? 'page' : undefined}
    >
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
    </Link>
  );
}
