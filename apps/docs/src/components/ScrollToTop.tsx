import { useState, useEffect } from "react";
import "./ScrollToTop.css";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      className="scroll-to-top"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Back to top"
    >
      <span className="scroll-icon">↑</span>
    </button>
  );
}
