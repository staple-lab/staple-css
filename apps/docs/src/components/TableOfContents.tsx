import { useEffect, useState } from "react";
import { Text } from "@staple-css/primitives/full";
import "./TableOfContents.css";

interface Heading {
  id: string;
  text: string;
  level: number; // 1-6 for h1-h6
}

function extractHeadings(): Heading[] {
  const main = document.querySelector("main");
  if (!main) return [];

  const headings: Heading[] = [];
  const selector = "h2, h3, h4"; // Only capture h2-h4 for TOC

  main.querySelectorAll(selector).forEach((element) => {
    const el = element as HTMLElement;

    // Generate ID if not present
    if (!el.id) {
      el.id = `heading-${headings.length}`;
    }

    const levelStr = el.tagName[1];
    if (levelStr) {
      headings.push({
        id: el.id,
        text: el.textContent || "",
        level: parseInt(levelStr, 10),
      });
    }
  });

  return headings;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // Extract headings on mount and when DOM changes
  useEffect(() => {
    const extracted = extractHeadings();
    setHeadings(extracted);

    // Set initial active heading
    if (extracted.length > 0 && extracted[0]) {
      setActiveId(extracted[0].id);
    }
  }, []);

  // Track active heading during scroll
  useEffect(() => {
    const handleScroll = () => {
      if (headings.length === 0) return;

      let currentActive = headings[0]?.id || "";

      for (const heading of headings) {
        const element = document.getElementById(heading.id);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        if (!rect) continue;

        // Check if heading is in viewport (with offset for sticky header)
        if (rect.top > -200 && rect.top < 400) {
          currentActive = heading.id;
          break;
        }
      }

      setActiveId(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="table-of-contents">
      <nav aria-label="Page Table of Contents">
        <Text as="h3" size={0} weight="bold" className="toc-title">
          On This Page
        </Text>
        <ul className="toc-list">
          {headings.map((heading) => (
            <li key={heading.id} className={`toc-item level-${heading.level}`}>
              <a
                href={`#${heading.id}`}
                className={`toc-link ${activeId === heading.id ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(heading.id);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                    setActiveId(heading.id);
                  }
                }}
              >
                <span className="toc-text">{heading.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
