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

// 移动端性能监控
export const initPerformanceMonitoring = () => {
  if (!isMobile()) return;

  // 监控 Core Web Vitals
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log(`Mobile Performance - ${entry.name}: ${entry.value}`);
        
        // 发送性能数据到分析服务
        if (entry.name === 'largest-contentful-paint' && entry.value > 2500) {
          console.warn('Mobile LCP is too slow:', entry.value);
        }
      }
    });
    
    observer.observe({ 
      entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] 
    });
  }
}

// 移动端错误监控
export const initErrorMonitoring = () => {
  if (!isMobile()) return;

  window.addEventListener('error', (event) => {
    console.error('Mobile Error:', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      userAgent: navigator.userAgent,
      screenSize: `${window.screen.width}x${window.screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    console.error('Mobile Unhandled Promise Rejection:', event.reason);
  });
}

// 移动端用户体验优化
export const optimizeUserExperience = () => {
  if (!isMobile()) return;

  // 添加触摸反馈
  const addTouchFeedback = (element) => {
    element.addEventListener('touchstart', () => {
      element.style.transform = 'scale(0.98)';
    }, { passive: true });
    
    element.addEventListener('touchend', () => {
      element.style.transform = 'scale(1)';
    }, { passive: true });
  };

  // 为所有按钮添加触摸反馈
  document.querySelectorAll('button, .btn, .touch-target').forEach(addTouchFeedback);

  // 优化长按选择
  document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  });

  // 防止双击缩放
  let lastTouchEnd = 0;
  document.addEventListener('touchend', (event) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
}

// 移动端内存优化
export const optimizeMemoryUsage = () => {
  if (!isMobile()) return;

  // 清理不必要的事件监听器
  const cleanupEventListeners = () => {
    // 在页面卸载时清理
    window.addEventListener('beforeunload', () => {
      // 清理自定义事件监听器
    });
  };

  // 优化图片内存使用
  const optimizeImages = () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (img.complete && img.naturalWidth === 0) {
        // 图片加载失败，移除或替换
        img.style.display = 'none';
      }
    });
  };

  cleanupEventListeners();
  optimizeImages();
}

// 移动端网络状态监控
export const monitorNetworkStatus = () => {
  if (!isMobile()) return;

  if ('connection' in navigator) {
    const connection = navigator.connection;
    
    const updateNetworkInfo = () => {
      console.log('Mobile Network:', {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData
      });
    };

    connection.addEventListener('change', updateNetworkInfo);
    updateNetworkInfo();
  }
}

// 初始化所有移动端优化
export const initMobileOptimizations = () => {
  if (!isMobile()) return;

  // 基础优化
  optimizeScrollForMobile();
  optimizeFontsForMobile();
  optimizeNetworkForMobile();
  optimizeCacheForMobile();
  
  // 性能监控
  initPerformanceMonitoring();
  initErrorMonitoring();
  
  // 用户体验优化
  optimizeUserExperience();
  optimizeMemoryUsage();
  monitorNetworkStatus();
  
  // 添加移动端特定的类名
  document.body.classList.add('mobile-device');
  
  // 设置视口优化
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
  }
  
  console.log('Mobile optimizations initialized');
};

// 移动端特定的工具函数
export const mobileUtils = {
  // 获取安全的触摸目标大小
  getTouchTargetSize: () => {
    const dpr = getDevicePixelRatio();
    return Math.max(44, 44 * dpr);
  },
  
  // 检测是否为低端设备
  isLowEndDevice: () => {
    const memory = navigator.deviceMemory || 4;
    const cores = navigator.hardwareConcurrency || 4;
    return memory < 4 || cores < 4;
  },
  
  // 获取设备信息
  getDeviceInfo: () => {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      screenSize: `${window.screen.width}x${window.screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      pixelRatio: getDevicePixelRatio(),
      memory: navigator.deviceMemory,
      cores: navigator.hardwareConcurrency,
      connection: navigator.connection?.effectiveType || 'unknown'
    };
  }
}; 