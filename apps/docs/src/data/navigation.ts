export interface NavItem {
  label: string;
  path: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navigation: NavSection[] = [
  {
    title: "Overview",
    items: [
      { label: "Home", path: "/" },
      { label: "Getting Started", path: "/getting-started" },
      { label: "Why Staple", path: "/why-staple" },
    ],
  },
  {
    title: "Tokens",
    items: [
      { label: "Overview", path: "/tokens" },
      { label: "Color", path: "/tokens/color" },
      { label: "Spacing", path: "/tokens/spacing" },
      { label: "Typography", path: "/tokens/typography" },
      { label: "Elevation", path: "/tokens/elevation" },
      { label: "Motion", path: "/tokens/motion" },
      { label: "Border", path: "/tokens/border" },
      { label: "Layout", path: "/tokens/layout" },
    ],
  },
  {
    title: "Studio",
    items: [
      { label: "Token Studio", path: "/studio" },
    ],
  },
  {
    title: "Advanced",
    items: [
      { label: "Palettes", path: "/palettes" },
      { label: "AI Usage", path: "/ai-usage" },
    ],
  },
];

export const allNavItems: NavItem[] = navigation.flatMap((s) => s.items);
