import React from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-16 right-6 sm:right-16 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition z-10"
    >
      <FaArrowUp size={20} />
    </button>
  );
};

export default ScrollToTopButton;
