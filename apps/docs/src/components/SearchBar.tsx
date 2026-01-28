import { useState, useEffect, useRef } from 'react';
import { Box, Column, Row, Text } from '@staple-css/primitives/full';
import { Search, X } from 'lucide-react';
import { searchPages, type SearchResult } from '../data/searchIndex';
import './SearchBar.css';

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle Cmd+K / Ctrl+K to open search
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle search input
  function handleSearch(value: string) {
    setQuery(value);
    setSelectedIndex(-1);
    if (value.length >= 2) {
      setResults(searchPages(value));
    } else {
      setResults([]);
    }
  }

  // Handle keyboard navigation
  function handleKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          navigateToResult(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  }

  // Navigate to search result
  function navigateToResult(result: SearchResult) {
    setIsOpen(false);
    setQuery('');
    setResults([]);
    window.location.href = result.url;
  }

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <>
      {/* Search Button in Nav */}
      <button
        className="search-trigger"
        onClick={() => {
          setIsOpen(true);
          setTimeout(() => inputRef.current?.focus(), 0);
        }}
        aria-label="Search documentation"
      >
        <Search size={18} />
        <span className="search-shortcut">⌘K</span>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="search-modal-overlay">
          <div className="search-modal" ref={modalRef}>
            <Column gap={0}>
              {/* Search Input */}
              <Row
                gap={2}
                align="center"
                className="search-input-wrapper"
                style={{
                  padding: 'var(--st-space-4)',
                  borderBottom: '1px solid var(--st-color-border)',
                }}
              >
                <Search size={20} className="search-icon" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search pages, tokens..."
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="search-input"
                />
                {query && (
                  <button
                    className="search-clear"
                    onClick={() => handleSearch('')}
                    aria-label="Clear search"
                  >
                    <X size={18} />
                  </button>
                )}
              </Row>

              {/* Search Results */}
              <Column
                gap={0}
                className="search-results"
                style={{ maxHeight: '400px', overflowY: 'auto' }}
              >
                {results.length > 0 ? (
                  results.slice(0, 10).map((result, index) => (
                    <button
                      key={result.id}
                      className={`search-result ${
                        index === selectedIndex ? 'active' : ''
                      }`}
                      onClick={() => navigateToResult(result)}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <Column gap={1} style={{ width: '100%' }}>
                        <Row
                          justify="between"
                          align="center"
                          style={{ width: '100%' }}
                        >
                          <Text
                            weight="semibold"
                            size={1}
                            style={{ color: 'var(--st-color-text)' }}
                          >
                            {result.title}
                          </Text>
                          <Text
                            size={0}
                            tone="muted"
                            style={{
                              fontSize: '0.75rem',
                              padding: '2px 8px',
                              background: 'var(--st-color-surface)',
                              borderRadius: 'var(--st-radius-1)',
                            }}
                          >
                            {result.type === 'token' ? 'Token' : 'Page'}
                          </Text>
                        </Row>
                        <Text
                          size={0}
                          tone="muted"
                          style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {result.description}
                        </Text>
                      </Column>
                    </button>
                  ))
                ) : query.length >= 2 ? (
                  <Box
                    style={{
                      padding: 'var(--st-space-6)',
                      textAlign: 'center',
                    }}
                  >
                    <Text tone="muted">No results found</Text>
                  </Box>
                ) : (
                  <Box
                    style={{
                      padding: 'var(--st-space-6)',
                      textAlign: 'center',
                    }}
                  >
                    <Text tone="muted" size={1}>
                      Start typing to search...
                    </Text>
                  </Box>
                )}
              </Column>

              {/* Footer */}
              <Row
                gap={2}
                justify="between"
                align="center"
                style={{
                  padding: 'var(--st-space-3) var(--st-space-4)',
                  borderTop: '1px solid var(--st-color-border)',
                  fontSize: 'var(--st-font-size-0)',
                  color: 'var(--st-color-text-muted)',
                }}
              >
                <Row gap={2}>
                  <span>↑↓ Navigate</span>
                  <span>↵ Select</span>
                </Row>
                <span>Esc Close</span>
              </Row>
            </Column>
          </div>
        </div>
      )}
    </>
  );
}
