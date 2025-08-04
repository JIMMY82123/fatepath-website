import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    }
  }

  static getDerivedStateFromError(error) {
    // 更新状态，下次渲染时显示错误UI
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // 记录错误信息
    this.setState({
      error: error,
      errorInfo: errorInfo
    })

    // 发送错误到分析服务
    this.logErrorToService(error, errorInfo)
  }

  logErrorToService = (error, errorInfo) => {
    // 发送到Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'exception', {
        description: error.toString(),
        fatal: true,
        error_stack: errorInfo.componentStack
      })
    }

    // 发送到自定义分析服务
    this.sendToAnalytics({
      type: 'error_boundary',
      error: error.toString(),
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: Date.now()
    })

    // 开发环境控制台输出
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary caught an error:', error, errorInfo)
    }
  }

  sendToAnalytics = (data) => {
    // 这里可以集成您的错误报告服务
    // 例如：Sentry, LogRocket, 自定义API等
    
    // 示例：发送到自定义API
    /*
    fetch('/api/error-reporting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).catch(error => {
      console.error('Failed to send error report:', error)
    })
    */
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-mystic-900 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full text-center"
          >
            {/* 错误图标 */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-6 w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center"
            >
              <AlertTriangle className="w-10 h-10 text-red-400" />
            </motion.div>

            {/* 错误标题 */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-cinzel font-bold text-white mb-4"
            >
              Oops! Something went wrong
            </motion.h1>

            {/* 错误描述 */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-mystic-300 mb-8 leading-relaxed"
            >
              We're sorry, but something unexpected happened. 
              Our team has been notified and is working to fix this issue.
            </motion.p>

            {/* 操作按钮 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              {/* 重试按钮 */}
              <button
                onClick={this.handleRetry}
                className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold py-3 px-6 rounded-lg hover:from-gold-400 hover:to-gold-500 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Try Again</span>
              </button>

              {/* 返回首页按钮 */}
              <Link
                to="/"
                className="block w-full bg-mystic-800 text-mystic-300 font-semibold py-3 px-6 rounded-lg hover:bg-mystic-700 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Home className="w-5 h-5" />
                <span>Go to Homepage</span>
              </Link>
            </motion.div>

            {/* 错误详情（仅开发环境显示） */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <motion.details
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ delay: 0.6 }}
                className="mt-8 text-left"
              >
                <summary className="cursor-pointer text-mystic-400 hover:text-mystic-300 mb-2">
                  Error Details (Development)
                </summary>
                <div className="bg-mystic-800 p-4 rounded-lg text-xs text-mystic-400 overflow-auto max-h-40">
                  <div className="mb-2">
                    <strong>Error:</strong> {this.state.error.toString()}
                  </div>
                  <div className="mb-2">
                    <strong>Stack:</strong>
                    <pre className="whitespace-pre-wrap mt-1">
                      {this.state.error.stack}
                    </pre>
                  </div>
                  <div>
                    <strong>Component Stack:</strong>
                    <pre className="whitespace-pre-wrap mt-1">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </div>
                </div>
              </motion.details>
            )}

            {/* 联系信息 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8 pt-6 border-t border-mystic-700"
            >
              <p className="text-sm text-mystic-400">
                Need help? Contact us at{' '}
                <a 
                  href="mailto:chenxiao0801@hotmail.com" 
                  className="text-gold-400 hover:text-gold-300"
                >
                  chenxiao0801@hotmail.com
                </a>
              </p>
            </motion.div>
          </motion.div>
        </div>
      )
    }

    // 正常渲染子组件
    return this.props.children
  }
}

export default ErrorBoundary 