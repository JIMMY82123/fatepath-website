// 移动端性能监控工具

export const initMobilePerformanceMonitoring = () => {
  if (!isMobile()) return;

  console.log('📱 初始化移动端性能监控...');

  // 监控页面加载性能
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime, 'ms');
          if (entry.startTime > 2500) {
            console.warn('⚠️ 页面加载较慢，建议优化');
          }
        }
      }
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  }

  // 监控内存使用
  if ('memory' in performance) {
    setInterval(() => {
      const memory = performance.memory;
      const usedMB = Math.round(memory.usedJSHeapSize / 1024 / 1024);
      const totalMB = Math.round(memory.totalJSHeapSize / 1024 / 1024);
      
      if (usedMB > totalMB * 0.8) {
        console.warn('⚠️ 内存使用率较高:', usedMB, 'MB /', totalMB, 'MB');
      }
    }, 10000);
  }
};

// 检测是否为移动设备
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         window.innerWidth <= 768;
};

// 移动端优化建议
export const getMobileOptimizationTips = () => {
  const tips = [];
  
  if (navigator.connection) {
    const connection = navigator.connection;
    if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
      tips.push('网络连接较慢，建议切换到WiFi网络');
    }
  }
  
  if (navigator.deviceMemory && navigator.deviceMemory < 4) {
    tips.push('设备内存较低，建议关闭其他应用');
  }
  
  return tips;
};