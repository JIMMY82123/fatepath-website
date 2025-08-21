// 移动端诊断工具
export class MobileDiagnostics {
  constructor() {
    this.diagnostics = {
      deviceInfo: {},
      performance: {},
      errors: [],
      warnings: [],
      recommendations: []
    };
  }

  // 运行完整诊断
  async runFullDiagnostics() {
    console.log('🔍 开始移动端诊断...');
    
    try {
      await this.collectDeviceInfo();
      await this.collectPerformanceData();
      await this.checkCompatibility();
      await this.checkNetworkStatus();
      await this.generateRecommendations();
      
      this.logDiagnostics();
      return this.diagnostics;
    } catch (error) {
      console.error('诊断过程中出现错误:', error);
      this.diagnostics.errors.push({
        type: 'diagnostic_error',
        message: error.message,
        timestamp: new Date().toISOString()
      });
      return this.diagnostics;
    }
  }

  // 收集设备信息
  async collectDeviceInfo() {
    this.diagnostics.deviceInfo = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      screenSize: `${window.screen.width}x${window.screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      pixelRatio: window.devicePixelRatio || 1,
      memory: navigator.deviceMemory || 'unknown',
      cores: navigator.hardwareConcurrency || 'unknown',
      connection: this.getConnectionInfo(),
      battery: await this.getBatteryInfo(),
      touchSupport: 'ontouchstart' in window,
      orientation: window.screen.orientation?.type || 'unknown'
    };
  }

  // 收集性能数据
  async collectPerformanceData() {
    if ('performance' in window) {
      const perf = performance;
      const navigation = perf.getEntriesByType('navigation')[0];
      
      this.diagnostics.performance = {
        loadTime: navigation ? Math.round(navigation.loadEventEnd - navigation.loadEventStart) : 'unknown',
        domContentLoaded: navigation ? Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart) : 'unknown',
        firstPaint: this.getFirstPaint(),
        firstContentfulPaint: this.getFirstContentfulPaint(),
        largestContentfulPaint: this.getLargestContentfulPaint(),
        memoryUsage: this.getMemoryUsage(),
        resourceCount: perf.getEntriesByType('resource').length
      };
    }
  }

  // 检查兼容性
  async checkCompatibility() {
    const checks = [
      { name: 'ES6 Support', test: () => typeof Promise !== 'undefined' && typeof fetch !== 'undefined' },
      { name: 'Service Worker', test: () => 'serviceWorker' in navigator },
      { name: 'WebGL', test: () => !!window.WebGLRenderingContext },
      { name: 'Web Audio', test: () => !!window.AudioContext || !!window.webkitAudioContext },
      { name: 'Local Storage', test: () => !!window.localStorage },
      { name: 'Session Storage', test: () => !!window.sessionStorage },
      { name: 'IndexedDB', test: () => !!window.indexedDB },
      { name: 'Web Workers', test: () => !!window.Worker },
      { name: 'Geolocation', test: () => !!navigator.geolocation },
      { name: 'Notifications', test: () => !!window.Notification }
    ];

    this.diagnostics.compatibility = checks.map(check => ({
      feature: check.name,
      supported: check.test(),
      timestamp: new Date().toISOString()
    }));
  }

  // 检查网络状态
  async checkNetworkStatus() {
    if ('connection' in navigator) {
      const connection = navigator.connection;
      this.diagnostics.network = {
        effectiveType: connection.effectiveType || 'unknown',
        downlink: connection.downlink || 'unknown',
        rtt: connection.rtt || 'unknown',
        saveData: connection.saveData || false
      };
    } else {
      this.diagnostics.network = { status: 'not_supported' };
    }
  }

  // 生成建议
  async generateRecommendations() {
    const recommendations = [];

    // 检查设备性能
    if (this.diagnostics.deviceInfo.memory < 4) {
      recommendations.push({
        type: 'performance',
        priority: 'high',
        message: '设备内存较低，建议关闭其他应用以提升性能',
        action: 'close_other_apps'
      });
    }

    // 检查网络状态
    if (this.diagnostics.network.effectiveType === '2g' || this.diagnostics.network.effectiveType === 'slow-2g') {
      recommendations.push({
        type: 'network',
        priority: 'high',
        message: '网络连接较慢，建议切换到WiFi网络',
        action: 'switch_to_wifi'
      });
    }

    // 检查浏览器兼容性
    const unsupportedFeatures = this.diagnostics.compatibility.filter(f => !f.supported);
    if (unsupportedFeatures.length > 0) {
      recommendations.push({
        type: 'compatibility',
        priority: 'medium',
        message: `检测到 ${unsupportedFeatures.length} 个不支持的浏览器功能`,
        action: 'update_browser',
        details: unsupportedFeatures.map(f => f.feature)
      });
    }

    // 检查页面加载性能
    if (this.diagnostics.performance.loadTime > 5000) {
      recommendations.push({
        type: 'performance',
        priority: 'medium',
        message: '页面加载时间较长，建议检查网络连接',
        action: 'check_network'
      });
    }

    this.diagnostics.recommendations = recommendations;
  }

  // 获取连接信息
  getConnectionInfo() {
    if ('connection' in navigator) {
      const conn = navigator.connection;
      return {
        effectiveType: conn.effectiveType || 'unknown',
        downlink: conn.downlink || 'unknown',
        rtt: conn.rtt || 'unknown',
        saveData: conn.saveData || false
      };
    }
    return { status: 'not_supported' };
  }

  // 获取电池信息
  async getBatteryInfo() {
    if ('getBattery' in navigator) {
      try {
        const battery = await navigator.getBattery();
        return {
          level: Math.round(battery.level * 100),
          charging: battery.charging,
          chargingTime: battery.chargingTime,
          dischargingTime: battery.dischargingTime
        };
      } catch (error) {
        return { error: error.message };
      }
    }
    return { status: 'not_supported' };
  }

  // 获取首次绘制时间
  getFirstPaint() {
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-paint') {
              return Math.round(entry.startTime);
            }
          }
        });
        observer.observe({ entryTypes: ['paint'] });
      } catch (error) {
        return 'unknown';
      }
    }
    return 'unknown';
  }

  // 获取首次内容绘制时间
  getFirstContentfulPaint() {
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              return Math.round(entry.startTime);
            }
          }
        });
        observer.observe({ entryTypes: ['paint'] });
      } catch (error) {
        return 'unknown';
      }
    }
    return 'unknown';
  }

  // 获取最大内容绘制时间
  getLargestContentfulPaint() {
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
              return Math.round(entry.startTime);
            }
          }
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (error) {
        return 'unknown';
      }
    }
    return 'unknown';
  }

  // 获取内存使用情况
  getMemoryUsage() {
    if ('memory' in performance) {
      const memory = performance.memory;
      return {
        used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
        total: Math.round(memory.totalJSHeapSize / 1024 / 1024),
        limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024)
      };
    }
    return { status: 'not_supported' };
  }

  // 记录诊断结果
  logDiagnostics() {
    console.group('📱 移动端诊断结果');
    console.log('设备信息:', this.diagnostics.deviceInfo);
    console.log('性能数据:', this.diagnostics.performance);
    console.log('兼容性检查:', this.diagnostics.compatibility);
    console.log('网络状态:', this.diagnostics.network);
    console.log('建议:', this.diagnostics.recommendations);
    console.groupEnd();
  }

  // 导出诊断报告
  exportReport() {
    const report = {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      ...this.diagnostics
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `mobile-diagnostics-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
  }

  // 快速诊断（简化版）
  async quickDiagnostics() {
    const quickChecks = [
      { name: '网络连接', test: () => navigator.onLine },
      { name: 'JavaScript支持', test: () => typeof window !== 'undefined' },
      { name: 'DOM支持', test: () => typeof document !== 'undefined' },
      { name: '触摸支持', test: () => 'ontouchstart' in window },
      { name: '视口大小', test: () => window.innerWidth > 0 && window.innerHeight > 0 }
    ];

    const results = quickChecks.map(check => ({
      check: check.name,
      passed: check.test(),
      timestamp: new Date().toISOString()
    }));

    const passed = results.filter(r => r.passed).length;
    const total = results.length;

    console.log(`🔍 快速诊断: ${passed}/${total} 项检查通过`);
    
    if (passed < total) {
      console.warn('⚠️ 发现问题:', results.filter(r => !r.passed));
    }

    return { results, summary: `${passed}/${total} 通过` };
  }
}

// 创建全局诊断实例
export const mobileDiagnostics = new MobileDiagnostics();

// 自动运行诊断（开发环境）
if (process.env.NODE_ENV === 'development') {
  // 延迟运行，确保页面完全加载
  setTimeout(() => {
    mobileDiagnostics.quickDiagnostics();
  }, 2000);
}

// 导出诊断函数
export const runMobileDiagnostics = () => mobileDiagnostics.runFullDiagnostics();
export const quickMobileCheck = () => mobileDiagnostics.quickDiagnostics();
export const exportDiagnosticsReport = () => mobileDiagnostics.exportReport();
