/**
 * Navigation structure for the docs site
 * Organized in categories like Tailwind's sidebar
 */

export interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
  icon?: string;
}

export interface NavCategory {
  label: string;
  items: NavItem[];
}

export const navigationConfig: NavCategory[] = [
  {
    label: "Getting Started",
    items: [
      { label: "Home", href: "/" },
      { label: "Why Staple CSS", href: "/why" },
      { label: "Guides", href: "/guides" },
    ],
  },
  {
    label: "Foundations",
    items: [
      { label: "Tokens Overview", href: "/tokens" },
      { label: "Token Reference", href: "/token-reference" },
      { label: "Colors & Palettes", href: "/colors" },
      { label: "Visual System", href: "/visuals" },
    ],
  },
  {
    label: "Documentation",
    items: [
      { label: "Component Patterns", href: "/components" },
      { label: "Primitives", href: "/primitives" },
      { label: "Examples", href: "/examples" },
    ],
  },
  {
    label: "Tools",
    items: [
      { label: "Gradient Studio", href: "/gradient-studio" },
      { label: "Token Studio", href: "/tokens-studio" },
      { label: "Figma Integration", href: "/figma" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Storybook", href: "/storybook" },
    ],
  },
];

export function getAllNavLinks(): Array<{ label: string; href: string }> {
  const links: Array<{ label: string; href: string }> = [];

  navigationConfig.forEach((category) => {
    category.items.forEach((item) => {
      if (item.href) {
        links.push({ label: item.label, href: item.href });
      }
      if (item.children) {
        item.children.forEach((child) => {
          if (child.href) {
            links.push({ label: child.label, href: child.href });
          }
        });
      }
    });
  });

  return links;
}
