import React from 'react';
import { isMobile } from '../utils/mobileOptimization';

// 移动端回到顶部按钮组件 - 只显示固定按钮
const ScrollToTopButton = () => {
  // 回到顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // 只在移动端显示
  if (!isMobile()) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
      <button
        onClick={scrollToTop}
        className="bg-gradient-to-r from-mystic-700 to-mystic-800 text-mystic-200 px-4 py-2 rounded-full shadow-lg border border-mystic-600/50 hover:from-mystic-600 hover:to-mystic-700 hover:text-white transition-all duration-300 text-sm font-medium backdrop-blur-md"
        title="Back to Top"
        aria-label="Scroll to top of page"
      >
        Back to Top
      </button>
    </div>
  );
};

export default ScrollToTopButton;
