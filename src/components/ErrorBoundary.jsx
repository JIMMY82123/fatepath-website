import React from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { isMobile } from '../utils/mobileOptimization';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorCount: 0,
      lastErrorTime: null
    };
    
    // 移动端错误计数重置定时器
    this.errorResetTimer = null;
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 记录错误信息
    this.setState(prevState => ({
      error,
      errorInfo,
      errorCount: prevState.errorCount + 1,
      lastErrorTime: Date.now()
    }));

    // 移动端特定的错误处理
    if (isMobile()) {
      this.handleMobileError(error, errorInfo);
    }

    // 记录错误到控制台（开发环境）
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // 生产环境错误上报
    this.logErrorToService(error, errorInfo);
  }

  // 移动端错误处理
  handleMobileError = (error, errorInfo) => {
    // 检查是否为内存相关错误
    if (error.message.includes('memory') || error.message.includes('out of memory')) {
      this.handleMemoryError();
    }
    
    // 检查是否为网络相关错误
    if (error.message.includes('network') || error.message.includes('fetch')) {
      this.handleNetworkError();
    }

    // 检查是否为渲染相关错误
    if (error.message.includes('render') || error.message.includes('component')) {
      this.handleRenderError();
    }
  }

  // 处理内存错误
  handleMemoryError = () => {
    // 清理不必要的资源
    if (window.gc) {
      window.gc();
    }
    
    // 清理图片缓存
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (img.dataset.lazy === 'true') {
        img.src = '';
        img.dataset.src = '';
      }
    });

    // 强制垃圾回收
    setTimeout(() => {
      if (window.gc) {
        window.gc();
      }
    }, 100);
  }

  // 处理网络错误
  handleNetworkError = () => {
    // 检查网络状态
    if ('connection' in navigator) {
      const connection = navigator.connection;
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        // 低网速环境，减少资源加载
        this.setState({ networkSlow: true });
      }
    }
  }

  // 处理渲染错误
  handleRenderError = () => {
    // 尝试重新渲染组件
    setTimeout(() => {
      this.setState({ hasError: false, error: null, errorInfo: null });
    }, 2000);
  }

  // 错误上报服务
  logErrorToService = (error, errorInfo) => {
    try {
      // 这里可以集成错误监控服务，如 Sentry
      const errorData = {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        userAgent: navigator.userAgent,
        url: window.location.href,
        timestamp: new Date().toISOString(),
        isMobile: isMobile(),
        errorCount: this.state.errorCount,
        deviceInfo: this.getDeviceInfo()
      };

      // 开发环境打印，生产环境可以发送到服务器
      if (process.env.NODE_ENV === 'development') {
        console.log('Error data for reporting:', errorData);
      }
    } catch (reportingError) {
      console.error('Error reporting failed:', reportingError);
    }
  }

  // 获取设备信息
  getDeviceInfo = () => {
    return {
      screenSize: `${window.screen.width}x${window.screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      pixelRatio: window.devicePixelRatio || 1,
      memory: navigator.deviceMemory || 'unknown',
      cores: navigator.hardwareConcurrency || 'unknown',
      connection: navigator.connection?.effectiveType || 'unknown'
    };
  }

  // 重置错误状态
  resetError = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
    
    // 清理错误重置定时器
    if (this.errorResetTimer) {
      clearTimeout(this.errorResetTimer);
    }
  }

  // 返回首页
  goHome = () => {
    window.location.href = '/';
  }

  // 组件卸载时清理
  componentWillUnmount() {
    if (this.errorResetTimer) {
      clearTimeout(this.errorResetTimer);
    }
  }

  render() {
    if (this.state.hasError) {
      // 移动端优化的错误页面
      if (isMobile()) {
        return this.renderMobileErrorPage();
      }
      
      // 桌面端错误页面
      return this.renderDesktopErrorPage();
    }

    return this.props.children;
  }

  // 移动端错误页面
  renderMobileErrorPage = () => {
    const { errorCount, networkSlow } = this.state;
    
    return (
      <div className="min-h-screen bg-mystic-900 pt-20 flex items-center justify-center px-4">
        <div className="text-center max-w-sm mx-auto">
          <div className="mb-6">
            <AlertCircle className="h-16 w-16 text-red-400 mx-auto" />
          </div>
          
          <h1 className="text-xl font-bold text-white mb-3">
            {errorCount > 2 ? '页面遇到问题' : '页面加载异常'}
          </h1>
          
          <p className="text-mystic-300 mb-6 text-sm leading-relaxed">
            {networkSlow 
              ? '网络连接较慢，请检查网络后重试'
              : '页面渲染出现问题，正在尝试修复'
            }
          </p>

          <div className="space-y-3">
            <button
              onClick={this.resetError}
              className="w-full bg-gradient-to-r from-gold-400 to-gold-600 text-white px-6 py-3 rounded-lg hover:from-gold-500 hover:to-gold-700 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>重新加载</span>
            </button>
            
            <button
              onClick={this.goHome}
              className="w-full border border-mystic-600 text-mystic-300 px-6 py-3 rounded-lg hover:border-mystic-500 hover:text-mystic-200 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Home className="h-4 w-4" />
              <span>返回首页</span>
            </button>
          </div>

          {errorCount > 1 && (
            <p className="text-xs text-mystic-500 mt-4">
              错误次数: {errorCount} - 如果问题持续，请刷新页面
            </p>
          )}
        </div>
      </div>
    );
  }

  // 桌面端错误页面
  renderDesktopErrorPage = () => {
    const { error, errorInfo, errorCount } = this.state;
    
    return (
      <div className="min-h-screen bg-mystic-900 pt-20 flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-white mb-4">页面渲染错误</h1>
          <p className="text-mystic-300 mb-6">
            页面遇到了一个错误，我们正在努力修复这个问题。
          </p>
          
          <div className="space-y-3">
            <button
              onClick={this.resetError}
              className="w-full bg-gradient-to-r from-gold-400 to-gold-600 text-white px-6 py-3 rounded-lg hover:from-gold-500 hover:to-gold-700 transition-all duration-300"
            >
              重新加载页面
            </button>
            
            <button
              onClick={this.goHome}
              className="w-full border border-mystic-600 text-mystic-300 px-6 py-3 rounded-lg hover:border-mystic-500 hover:text-mystic-200 transition-all duration-300"
            >
              返回首页
            </button>
          </div>

          {process.env.NODE_ENV === 'development' && (
            <details className="mt-6 text-left">
              <summary className="text-mystic-400 cursor-pointer text-sm">
                错误详情 (开发环境)
              </summary>
              <div className="mt-2 p-3 bg-mystic-800 rounded text-xs text-mystic-300 overflow-auto max-h-40">
                <p><strong>错误信息:</strong> {error?.message}</p>
                <p><strong>错误次数:</strong> {errorCount}</p>
                <pre className="mt-2 text-xs">{errorInfo?.componentStack}</pre>
              </div>
            </details>
          )}
        </div>
      </div>
    );
  }
}

export default ErrorBoundary; 