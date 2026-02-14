import { useState, useMemo, useCallback, useEffect } from "react";
import { searchIndex, type SearchEntry } from "../data/searchIndex";

function fuzzyMatch(query: string, text: string): boolean {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (t.includes(q)) return true;
  let qi = 0;
  for (let i = 0; i < t.length && qi < q.length; i++) {
    if (t[i] === q[qi]) qi++;
  }
  return qi === q.length;
}

export function useSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const results: SearchEntry[] = useMemo(() => {
    if (!query.trim()) return searchIndex;
    return searchIndex.filter(
      (entry) =>
        fuzzyMatch(query, entry.title) ||
        entry.keywords.some((kw) => fuzzyMatch(query, kw)),
    );
  }, [query]);

  const open = useCallback(() => {
    setIsOpen(true);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  const moveSelection = useCallback(
    (delta: number) => {
      setSelectedIndex((prev) => {
        const len = results.length;
        if (len === 0) return 0;
        return (prev + delta + len) % len;
      });
    },
    [results],
  );

  return {
    query,
    setQuery,
    results,
    isOpen,
    open,
    close,
    selectedIndex,
    setSelectedIndex,
    moveSelection,
  } as const;
}
