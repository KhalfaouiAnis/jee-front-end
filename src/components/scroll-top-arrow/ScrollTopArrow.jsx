import { useState } from "react";
import "./scroll-to-top.styles.css";

export default function ScrollTopArrow() {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", checkScrollTop);

  return (
    <div
      className="scrollTop"
      style={{ height: 40, display: showScroll ? "flex" : "none" }}
    >
      <i className="fas fa-arrow-up scroll-arrow" onClick={scrollTop} />
    </div>
  );
}
