import React from 'react';
import { AlertTriangle, RefreshCw, Smartphone } from 'lucide-react';

class MobileErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      isMobile: false 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // 记录错误到控制台
    console.error('Mobile Error Boundary caught an error:', error, errorInfo);

    // 如果是移动端，记录更详细的错误信息
    if (this.isMobileDevice()) {
      this.logMobileError(error, errorInfo);
    }
  }

  componentDidMount() {
    this.setState({ isMobile: this.isMobileDevice() });
  }

  isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           window.innerWidth <= 768;
  }

  logMobileError(error, errorInfo) {
    const errorDetails = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      screenSize: `${window.screen.width}x${window.screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      timestamp: new Date().toISOString(),
      url: window.location.href
    };

    console.error('Mobile Error Details:', errorDetails);

    // 可以在这里发送错误信息到服务器或错误监控服务
    if (window.gtag) {
      try {
        window.gtag('event', 'mobile_error', {
          error_message: error.message,
          error_stack: error.stack?.substring(0, 500), // 限制长度
          user_agent: navigator.userAgent,
          screen_size: `${window.screen.width}x${window.screen.height}`,
          viewport_size: `${window.innerWidth}x${window.innerHeight}`
        });
      } catch (e) {
        console.error('Failed to send error to analytics:', e);
      }
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  handleReportError = () => {
    const errorReport = {
      message: this.state.error?.message || 'Unknown error',
      stack: this.state.error?.stack || '',
      componentStack: this.state.errorInfo?.componentStack || '',
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString()
    };

    // 复制错误报告到剪贴板
    if (navigator.clipboard) {
      navigator.clipboard.writeText(JSON.stringify(errorReport, null, 2))
        .then(() => {
          alert('错误报告已复制到剪贴板，请发送给技术支持');
        })
        .catch(() => {
          // 如果剪贴板不可用，显示错误信息
          alert('错误报告：\n' + JSON.stringify(errorReport, null, 2));
        });
    } else {
      alert('错误报告：\n' + JSON.stringify(errorReport, null, 2));
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-mystic-900 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-mystic-800 rounded-lg border border-mystic-600 p-6 text-center">
            {/* 错误图标 */}
            <div className="mx-auto mb-4 w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>

            {/* 错误标题 */}
            <h1 className="text-xl font-semibold text-white mb-2">
              页面出现错误
            </h1>

            {/* 移动端标识 */}
            {this.state.isMobile && (
              <div className="flex items-center justify-center space-x-2 mb-4 text-sm text-mystic-300">
                <Smartphone className="w-4 h-4" />
                <span>移动端检测到错误</span>
              </div>
            )}

            {/* 错误描述 */}
            <p className="text-mystic-300 mb-6">
              抱歉，页面加载时遇到了问题。这可能是由于网络连接、设备兼容性或代码错误导致的。
            </p>

            {/* 错误详情（开发环境显示） */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-4 text-left">
                <summary className="text-sm text-mystic-400 cursor-pointer mb-2">
                  错误详情（开发环境）
                </summary>
                <div className="bg-mystic-900 p-3 rounded text-xs text-red-300 overflow-auto max-h-32">
                  <div className="mb-2">
                    <strong>错误信息：</strong> {this.state.error.message}
                  </div>
                  {this.state.error.stack && (
                    <div>
                      <strong>错误堆栈：</strong>
                      <pre className="whitespace-pre-wrap mt-1">{this.state.error.stack}</pre>
                    </div>
                  )}
                </div>
              </details>
            )}

            {/* 操作按钮 */}
            <div className="space-y-3">
              <button
                onClick={this.handleRetry}
                className="w-full bg-gold-500 hover:bg-gold-600 text-mystic-900 font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>重新加载页面</span>
              </button>

              <button
                onClick={this.handleReportError}
                className="w-full bg-mystic-700 hover:bg-mystic-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
              >
                报告错误
              </button>

              {/* 移动端特殊提示 */}
              {this.state.isMobile && (
                <div className="text-xs text-mystic-400 bg-mystic-700/50 p-3 rounded">
                  <p className="mb-2">💡 移动端优化建议：</p>
                  <ul className="text-left space-y-1">
                    <li>• 检查网络连接是否稳定</li>
                    <li>• 尝试切换到WiFi网络</li>
                    <li>• 清除浏览器缓存</li>
                    <li>• 更新浏览器到最新版本</li>
                  </ul>
                </div>
              )}
            </div>

            {/* 联系信息 */}
            <div className="mt-6 pt-4 border-t border-mystic-600">
              <p className="text-xs text-mystic-400">
                如果问题持续存在，请联系技术支持：
              </p>
              <p className="text-xs text-gold-400 mt-1">
                chenxiao0801@hotmail.com
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default MobileErrorBoundary;
