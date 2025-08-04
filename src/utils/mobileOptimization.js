// 移动端优化工具函数

// 检测是否为移动设备
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         window.innerWidth <= 768;
}

// 检测是否为触摸设备
export const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// 检测设备像素比
export const getDevicePixelRatio = () => {
  return window.devicePixelRatio || 1;
}

// 优化图片加载（根据设备像素比）
export const optimizeImageSrc = (src, mobileSrc = null) => {
  if (isMobile() && mobileSrc) {
    return mobileSrc;
  }
  return src;
}

// 延迟加载优化
export const lazyLoadOptimization = () => {
  if (isMobile()) {
    // 移动端使用更激进的懒加载
    return {
      rootMargin: '50px',
      threshold: 0.1
    };
  }
  return {
    rootMargin: '100px',
    threshold: 0.2
  };
}

// 动画性能优化
export const getAnimationSettings = () => {
  if (isMobile()) {
    return {
      duration: 0.3, // 移动端使用更短的动画时间
      ease: 'easeOut'
    };
  }
  return {
    duration: 0.5,
    ease: 'easeInOut'
  };
}

// 触摸事件优化
export const addTouchOptimization = (element) => {
  if (!isTouchDevice()) return;

  let startY = 0;
  let startX = 0;

  const handleTouchStart = (e) => {
    startY = e.touches[0].clientY;
    startX = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!startY || !startX) return;

    const deltaY = Math.abs(e.touches[0].clientY - startY);
    const deltaX = Math.abs(e.touches[0].clientX - startX);

    // 如果是垂直滚动，阻止水平滚动
    if (deltaY > deltaX && deltaY > 10) {
      e.preventDefault();
    }
  };

  element.addEventListener('touchstart', handleTouchStart, { passive: true });
  element.addEventListener('touchmove', handleTouchMove, { passive: false });

  return () => {
    element.removeEventListener('touchstart', handleTouchStart);
    element.removeEventListener('touchmove', handleTouchMove);
  };
}

// 移动端表单优化
export const optimizeFormForMobile = (formElement) => {
  if (!isMobile()) return;

  const inputs = formElement.querySelectorAll('input, textarea, select');
  
  inputs.forEach(input => {
    // 添加触摸优化类
    input.classList.add('touch-target');
    
    // 优化输入体验
    if (input.type === 'text' || input.type === 'email' || input.type === 'tel') {
      input.addEventListener('focus', () => {
        // 确保输入框在视口中
        setTimeout(() => {
          input.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      });
    }
  });
}

// 移动端滚动优化
export const optimizeScrollForMobile = () => {
  if (!isMobile()) return;

  // 添加平滑滚动
  document.documentElement.style.scrollBehavior = 'smooth';
  
  // 优化滚动性能
  document.addEventListener('scroll', () => {
    // 使用 requestAnimationFrame 优化滚动性能
    requestAnimationFrame(() => {
      // 滚动时的优化逻辑
    });
  }, { passive: true });
}

// 移动端字体优化
export const optimizeFontsForMobile = () => {
  if (!isMobile()) return;

  // 预加载关键字体
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.as = 'font';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap';
  fontLink.crossOrigin = 'anonymous';
  document.head.appendChild(fontLink);
}

// 移动端缓存优化
export const optimizeCacheForMobile = () => {
  if (!isMobile()) return;

  // 设置缓存策略
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registered for mobile optimization');
      })
      .catch(error => {
        console.log('Service Worker registration failed:', error);
      });
  }
}

// 移动端网络优化
export const optimizeNetworkForMobile = () => {
  if (!isMobile()) return;

  // 预连接到常用域名
  const preconnectLinks = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://www.googletagmanager.com'
  ];

  preconnectLinks.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = href;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

// 初始化所有移动端优化
export const initMobileOptimizations = () => {
  if (!isMobile()) return;

  optimizeScrollForMobile();
  optimizeFontsForMobile();
  optimizeNetworkForMobile();
  
  // 添加移动端特定的类名
  document.body.classList.add('mobile-device');
  
  console.log('Mobile optimizations initialized');
}; 