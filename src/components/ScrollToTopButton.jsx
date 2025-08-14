import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { isMobile } from '../utils/mobileOptimization';

// 移动端回到顶部按钮组件
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isMobile()) return;

    // 监听滚动事件
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 300); // 滚动超过300px时显示按钮
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    <>
      {/* 回到顶部按钮 */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 z-40 bg-gradient-to-r from-gold-400 to-gold-600 text-white p-3 rounded-full shadow-lg hover:from-gold-500 hover:to-gold-700 transition-all duration-300 transform hover:scale-110 active:scale-95"
          title="Back to Top"
          aria-label="Scroll to top of page"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      {/* 回到顶部按钮（页面底部固定版本） */}
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
    </>
  );
};

export default ScrollToTopButton;
