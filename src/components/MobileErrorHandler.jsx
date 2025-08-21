import React, { useEffect } from 'react';

// 移动端错误处理组件
const MobileErrorHandler = ({ children }) => {
  useEffect(() => {
    // 全局错误处理
    const handleError = (event) => {
      console.error('Mobile Error:', event.error);
      
      // 显示用户友好的错误信息
      const errorDiv = document.createElement('div');
      errorDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #1a1a1a;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        padding: 20px;
        text-align: center;
      `;
      
      errorDiv.innerHTML = `
        <h2 style="color: #fbbf24; margin-bottom: 16px;">页面加载出现问题</h2>
        <p style="margin-bottom: 20px;">请刷新页面重试，如果问题持续存在，请检查网络连接</p>
        <button onclick="window.location.reload()" style="
          background: #fbbf24;
          color: #1a1a1a;
          padding: 12px 24px;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
        ">刷新页面</button>
      `;
      
      document.body.appendChild(errorDiv);
    };

    const handleUnhandledRejection = (event) => {
      console.error('Unhandled Promise Rejection:', event.reason);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return children;
};

export default MobileErrorHandler;