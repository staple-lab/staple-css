import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Box, Column } from '@staple-css/primitives/full';
import { SidebarNav } from './SidebarNav';
import './MobileNav.css';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger button - visible only on mobile */}
      <button
        className="mobile-nav-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile navigation overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="mobile-nav-backdrop" onClick={handleClose} aria-hidden="true" />

          {/* Navigation panel */}
          <Box className="mobile-nav-panel">
            <div className="mobile-nav-header">
              <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 700 }}>Menu</h2>
              <button
                className="mobile-nav-close"
                onClick={handleClose}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation items */}
            <div className="mobile-nav-content">
              <SidebarNav />
            </div>
          </Box>
        </>
      )}
    </>
  );
}
