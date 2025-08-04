// 性能监控工具

class PerformanceMonitor {
  constructor() {
    this.metrics = {}
    this.observers = []
    this.isInitialized = false
  }

  // 初始化性能监控
  init() {
    if (this.isInitialized) return
    
    this.setupCoreWebVitals()
    this.setupCustomMetrics()
    this.setupErrorTracking()
    this.setupNetworkMonitoring()
    
    this.isInitialized = true
    console.log('Performance monitor initialized')
  }

  // 设置Core Web Vitals监控
  setupCoreWebVitals() {
    // LCP (Largest Contentful Paint)
    this.observeLCP()
    
    // FID (First Input Delay)
    this.observeFID()
    
    // CLS (Cumulative Layout Shift)
    this.observeCLS()
    
    // FCP (First Contentful Paint)
    this.observeFCP()
    
    // TTFB (Time to First Byte)
    this.observeTTFB()
  }

  // 监控LCP
  observeLCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        
        this.metrics.lcp = lastEntry.startTime
        this.reportMetric('LCP', lastEntry.startTime)
      })
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] })
      this.observers.push(observer)
    }
  }

  // 监控FID
  observeFID() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          this.metrics.fid = entry.processingStart - entry.startTime
          this.reportMetric('FID', entry.processingStart - entry.startTime)
        })
      })
      
      observer.observe({ entryTypes: ['first-input'] })
      this.observers.push(observer)
    }
  }

  // 监控CLS
  observeCLS() {
    if ('PerformanceObserver' in window) {
      let clsValue = 0
      let clsEntries = []
      
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
            clsEntries.push(entry)
          }
        })
        
        this.metrics.cls = clsValue
        this.reportMetric('CLS', clsValue)
      })
      
      observer.observe({ entryTypes: ['layout-shift'] })
      this.observers.push(observer)
    }
  }

  // 监控FCP
  observeFCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const firstEntry = entries[0]
        
        this.metrics.fcp = firstEntry.startTime
        this.reportMetric('FCP', firstEntry.startTime)
      })
      
      observer.observe({ entryTypes: ['paint'] })
      this.observers.push(observer)
    }
  }

  // 监控TTFB
  observeTTFB() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if (entry.entryType === 'navigation') {
            this.metrics.ttfb = entry.responseStart - entry.requestStart
            this.reportMetric('TTFB', entry.responseStart - entry.requestStart)
          }
        })
      })
      
      observer.observe({ entryTypes: ['navigation'] })
      this.observers.push(observer)
    }
  }

  // 设置自定义指标监控
  setupCustomMetrics() {
    // 页面加载时间
    this.measurePageLoadTime()
    
    // DOM内容加载时间
    this.measureDOMContentLoaded()
    
    // 资源加载时间
    this.measureResourceTiming()
    
    // 内存使用情况
    this.measureMemoryUsage()
  }

  // 测量页面加载时间
  measurePageLoadTime() {
    window.addEventListener('load', () => {
      const loadTime = performance.now()
      this.metrics.pageLoadTime = loadTime
      this.reportMetric('PageLoadTime', loadTime)
    })
  }

  // 测量DOM内容加载时间
  measureDOMContentLoaded() {
    document.addEventListener('DOMContentLoaded', () => {
      const domReadyTime = performance.now()
      this.metrics.domReadyTime = domReadyTime
      this.reportMetric('DOMReadyTime', domReadyTime)
    })
  }

  // 测量资源加载时间
  measureResourceTiming() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if (entry.initiatorType === 'img' || entry.initiatorType === 'css' || entry.initiatorType === 'script') {
            this.reportMetric(`${entry.initiatorType}LoadTime`, entry.duration)
          }
        })
      })
      
      observer.observe({ entryTypes: ['resource'] })
      this.observers.push(observer)
    }
  }

  // 测量内存使用情况
  measureMemoryUsage() {
    if ('memory' in performance) {
      setInterval(() => {
        const memory = performance.memory
        this.reportMetric('MemoryUsage', {
          used: memory.usedJSHeapSize,
          total: memory.totalJSHeapSize,
          limit: memory.jsHeapSizeLimit
        })
      }, 30000) // 每30秒测量一次
    }
  }

  // 设置错误跟踪
  setupErrorTracking() {
    // JavaScript错误
    window.addEventListener('error', (event) => {
      this.reportError('JavaScript', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error?.stack
      })
    })

    // Promise错误
    window.addEventListener('unhandledrejection', (event) => {
      this.reportError('Promise', {
        reason: event.reason,
        promise: event.promise
      })
    })

    // 资源加载错误
    window.addEventListener('error', (event) => {
      if (event.target !== window) {
        this.reportError('Resource', {
          type: event.target.tagName,
          src: event.target.src || event.target.href,
          message: 'Resource failed to load'
        })
      }
    }, true)
  }

  // 设置网络监控
  setupNetworkMonitoring() {
    // 网络状态变化
    window.addEventListener('online', () => {
      this.reportMetric('NetworkStatus', 'online')
    })

    window.addEventListener('offline', () => {
      this.reportMetric('NetworkStatus', 'offline')
    })

    // 网络连接信息
    if ('connection' in navigator) {
      const connection = navigator.connection
      this.reportMetric('NetworkInfo', {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt
      })
    }
  }

  // 报告指标
  reportMetric(name, value) {
    // 发送到Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'performance_metric', {
        metric_name: name,
        metric_value: value,
        page_location: window.location.href,
        user_agent: navigator.userAgent
      })
    }

    // 发送到自定义分析服务
    this.sendToAnalytics({
      type: 'metric',
      name,
      value,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent
    })

    // 控制台输出（开发环境）
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 ${name}:`, value)
    }
  }

  // 报告错误
  reportError(type, error) {
    // 发送到Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'exception', {
        description: error.message || error.reason,
        fatal: false
      })
    }

    // 发送到自定义分析服务
    this.sendToAnalytics({
      type: 'error',
      errorType: type,
      error,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent
    })

    // 控制台输出（开发环境）
    if (process.env.NODE_ENV === 'development') {
      console.error(`❌ ${type} Error:`, error)
    }
  }

  // 发送到分析服务
  sendToAnalytics(data) {
    // 这里可以集成您的分析服务
    // 例如：Google Analytics, Mixpanel, 自定义API等
    
    // 示例：发送到自定义API
    /*
    fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).catch(error => {
      console.error('Failed to send analytics:', error)
    })
    */
  }

  // 获取所有指标
  getMetrics() {
    return this.metrics
  }

  // 清理观察器
  destroy() {
    this.observers.forEach(observer => {
      if (observer && observer.disconnect) {
        observer.disconnect()
      }
    })
    this.observers = []
    this.isInitialized = false
  }

  // 手动测量自定义指标
  measureCustomMetric(name, fn) {
    const start = performance.now()
    const result = fn()
    const duration = performance.now() - start
    
    this.reportMetric(name, duration)
    return result
  }

  // 测量异步操作
  async measureAsyncMetric(name, asyncFn) {
    const start = performance.now()
    const result = await asyncFn()
    const duration = performance.now() - start
    
    this.reportMetric(name, duration)
    return result
  }
}

// 创建单例实例
const performanceMonitor = new PerformanceMonitor()

export default performanceMonitor 