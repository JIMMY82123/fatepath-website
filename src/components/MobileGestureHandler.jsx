import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { isMobile, isTouchDevice } from '../utils/mobileOptimization';

// 移动端手势处理组件
const MobileGestureHandler = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isGestureEnabled, setIsGestureEnabled] = useState(true);
  
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });
  const touchEndRef = useRef({ x: 0, y: 0, time: 0 });
  const gestureHistoryRef = useRef([]);
  const lastGestureTimeRef = useRef(0);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    if (!isMobile() || !isTouchDevice()) return;

    // 初始化手势处理
    initGestureHandling();

    // 清理函数
    return () => {
      cleanupGestureHandling();
    };
  }, [location.pathname]);

  // 初始化手势处理
  const initGestureHandling = () => {
    // 添加触摸事件监听器
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    // 监听滚动事件，检测是否正在滚动
    document.addEventListener('scroll', handleScroll, { passive: true });

    // 添加手势反馈样式
    addGestureStyles();
  };

  // 清理手势处理
  const cleanupGestureHandling = () => {
    document.removeEventListener('touchstart', handleTouchStart);
    document.removeEventListener('touchend', handleTouchEnd);
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('scroll', handleScroll);
  };

  // 处理滚动事件
  const handleScroll = () => {
    isScrollingRef.current = true;
    // 滚动停止后重置标志
    clearTimeout(window.scrollTimeout);
    window.scrollTimeout = setTimeout(() => {
      isScrollingRef.current = false;
    }, 150);
  };

  // 触摸开始处理
  const handleTouchStart = (e) => {
    if (!isGestureEnabled) return;

    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };

    // 记录触摸开始位置
    gestureHistoryRef.current.push({
      type: 'start',
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    });
  };

  // 触摸移动处理
  const handleTouchMove = (e) => {
    if (!isGestureEnabled) return;

    const touch = e.touches[0];
    const currentX = touch.clientX;
    const currentY = touch.clientY;
    const startX = touchStartRef.current.x;
    const startY = touchStartRef.current.y;

    // 计算移动距离
    const deltaX = currentX - startX;
    const deltaY = currentY - startY;

    // 如果是水平滑动且距离较大，阻止默认滚动
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 20) {
      e.preventDefault();
    }

    // 记录手势轨迹
    if (gestureHistoryRef.current.length > 0) {
      const lastGesture = gestureHistoryRef.current[gestureHistoryRef.current.length - 1];
      if (lastGesture.type === 'move') {
        lastGesture.x = currentX;
        lastGesture.y = currentY;
      } else {
        gestureHistoryRef.current.push({
          type: 'move',
          x: currentX,
          y: currentY,
          time: Date.now()
        });
      }
    }
  };

  // 触摸结束处理
  const handleTouchEnd = (e) => {
    if (!isGestureEnabled) return;

    const touch = e.changedTouches[0];
    touchEndRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };

    // 分析手势
    analyzeGesture();
  };

  // 分析手势类型
  const analyzeGesture = () => {
    const start = touchStartRef.current;
    const end = touchEndRef.current;
    const deltaTime = end.time - start.time;
    const deltaX = end.x - start.x;
    const deltaY = end.y - start.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // 防止误触（距离太短或时间太短）
    if (distance < 50 || deltaTime < 200) {
      return;
    }

    // 防止手势过于频繁
    const now = Date.now();
    if (now - lastGestureTimeRef.current < 800) {
      return;
    }

    // 如果正在滚动，不触发手势
    if (isScrollingRef.current) {
      return;
    }

    lastGestureTimeRef.current = now;

    // 判断手势类型 - 更严格的触发条件
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // 水平手势 - 需要更大的距离
      if (deltaX > 80) {
        handleSwipeRight();
      } else if (deltaX < -80) {
        handleSwipeLeft();
      }
    } else {
      // 垂直手势 - 需要更大的距离
      if (deltaY > 80) {
        handleSwipeDown();
      } else if (deltaY < -80) {
        handleSwipeUp();
      }
    }

    // 清理手势历史
    gestureHistoryRef.current = [];
  };

  // 处理右滑手势
  const handleSwipeRight = () => {
    // 右滑返回上一页
    if (window.history.length > 1) {
      setTimeout(() => {
        navigate(-1);
      }, 300);
    }
  };

  // 处理左滑手势
  const handleSwipeLeft = () => {
    // 左滑前进（如果有的话）
    if (window.history.length > 1) {
      setTimeout(() => {
        navigate(1);
      }, 300);
    }
  };

  // 处理下滑手势
  const handleSwipeDown = () => {
    // 下滑刷新页面
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  // 处理上滑手势
  const handleSwipeUp = () => {
    // 上滑回到顶部
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // 移除手势反馈相关代码
  // const showGestureFeedback = (message, type = 'info') => { ... }

  // 添加手势样式
  const addGestureStyles = () => {
    if (document.getElementById('gesture-styles')) return;

    const style = document.createElement('style');
    style.id = 'gesture-styles';
    style.textContent = `
      .touch-feedback {
        position: absolute;
        pointer-events: none;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
        animation: touchRipple 0.6s ease-out;
        z-index: 9999;
      }

      @keyframes touchRipple {
        0% {
          transform: scale(0);
          opacity: 1;
        }
        100% {
          transform: scale(2);
          opacity: 0;
        }
      }
    `;

    document.head.appendChild(style);
  };

  // 添加触摸反馈效果
  const addTouchFeedback = (element) => {
    if (!isMobile() || !isTouchDevice()) return;

    const handleTouch = (e) => {
      const touch = e.touches[0];
      const rect = element.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      // 创建触摸反馈元素
      const feedback = document.createElement('div');
      feedback.className = 'touch-feedback';
      feedback.style.left = x + 'px';
      feedback.style.top = y + 'px';
      feedback.style.width = '40px';
      feedback.style.height = '40px';

      element.style.position = 'relative';
      element.appendChild(feedback);

      // 动画结束后移除
      setTimeout(() => {
        if (feedback.parentNode) {
          feedback.parentNode.removeChild(feedback);
        }
      }, 600);
    };

    element.addEventListener('touchstart', handleTouch, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouch);
    };
  };

  // 为所有可交互元素添加触摸反馈
  useEffect(() => {
    if (!isMobile() || !isTouchDevice()) return;

    const interactiveElements = document.querySelectorAll('button, a, .touch-target, [role="button"]');
    const cleanupFunctions = [];

    interactiveElements.forEach(element => {
      const cleanup = addTouchFeedback(element);
      if (cleanup) {
        cleanupFunctions.push(cleanup);
      }
    });

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, [location.pathname]);

  if (!isMobile()) {
    return children;
  }

  return (
    <>
      {children}
      
      {/* 手势反馈提示 */}
      {/* Removed gestureFeedback rendering */}
    </>
  );
};

export default MobileGestureHandler;
