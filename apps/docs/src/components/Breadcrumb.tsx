import { useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { Row, Text } from "@staple-css/primitives/full";
import { Edit2 } from "lucide-react";
import { navigationConfig } from "../navigation";
import "./Breadcrumb.css";

function getGitHubEditUrl(pathname: string): string {
  // Map routes to file paths
  const routeMap: Record<string, string> = {
    "/guides": "GuidesPage",
    "/tokens": "TokensPage",
    "/token-reference": "TokenReferencePage",
    "/colors": "ColorSystemPage",
    "/visuals": "VisualsPage",
    "/components": "ComponentPatternsPage",
    "/gradient-studio": "GradientStudioPage",
    "/figma": "FigmaIntegrationPage",
    "/primitives": "PrimitivesPage",
    "/why": "WhyPage",
    "/examples": "ExamplesPage",
  };

  const fileName = routeMap[pathname];
  if (!fileName) return "";

  const baseUrl = "https://github.com/anthropics/staple-css/edit/main/apps/docs/src/pages";
  return `${baseUrl}/${fileName}.tsx`;
}

interface BreadcrumbItem {
  label: string;
  path: string;
  isActive: boolean;
}

function findPageInNav(pathname: string): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", path: "/", isActive: false }];

  // Find the page in navigation
  for (const category of navigationConfig) {
    for (const item of category.items) {
      if (item.href === pathname) {
        breadcrumbs.push({
          label: category.label,
          path: "#",
          isActive: false,
        });
        breadcrumbs.push({
          label: item.label,
          path: item.href,
          isActive: true,
        });
        return breadcrumbs;
      }

      // Check children
      if (item.children) {
        for (const child of item.children) {
          if (child.href === pathname) {
            breadcrumbs.push({
              label: category.label,
              path: "#",
              isActive: false,
            });
            breadcrumbs.push({
              label: item.label,
              path: item.href || "#",
              isActive: false,
            });
            breadcrumbs.push({
              label: child.label,
              path: child.href,
              isActive: true,
            });
            return breadcrumbs;
          }
        }
      }
    }
  }

  // If not found in nav, just show home + current path
  if (pathname !== "/") {
    breadcrumbs.push({
      label: pathname.replace(/\//g, " ").trim() || "Page",
      path: pathname,
      isActive: true,
    });
  }

  return breadcrumbs;
}

export function Breadcrumb() {
  const location = useLocation();

  const breadcrumbs = useMemo(
    () => findPageInNav(location.pathname),
    [location.pathname]
  );

  // Don't show breadcrumb on home page
  if (location.pathname === "/") {
    return null;
  }

  const githubUrl = getGitHubEditUrl(location.pathname);

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <Row gap={2} align="center" justify="between" className="breadcrumb-list">
        <Row gap={2} align="center" className="breadcrumb-items">
          {breadcrumbs.map((item, idx) => (
            <span key={`${item.path}-${idx}`} className="breadcrumb-item">
              {item.isActive ? (
                <span className="breadcrumb-current">
                  <Text as="span" size={0} tone="muted">
                    {item.label}
                  </Text>
                </span>
              ) : (
                <>
                  <Link to={item.path} className="breadcrumb-link">
                    <Text as="span" size={0}>
                      {item.label}
                    </Text>
                  </Link>
                  <Text as="span" size={0} tone="muted" className="breadcrumb-separator">
                    /
                  </Text>
                </>
              )}
            </span>
          ))}
        </Row>
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="breadcrumb-github"
            title="Edit this page on GitHub"
            aria-label="Edit this page on GitHub"
          >
            <Edit2 size={16} strokeWidth={2} className="github-icon" />
            <Text as="span" size={0}>
              Edit
            </Text>
          </a>
        )}
      </Row>
    </nav>
  );
}
