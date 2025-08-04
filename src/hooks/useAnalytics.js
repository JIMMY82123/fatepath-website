import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  trackPageView, 
  trackEvent, 
  trackServiceClick, 
  trackBlogRead,
  trackContactSubmit,
  trackPaymentStart,
  trackPaymentComplete,
  trackToolUsage,
  trackSocialShare,
  trackError,
  trackEngagement
} from '../utils/analytics';

// 自动页面浏览跟踪Hook
export const usePageTracking = () => {
  const location = useLocation();
  
  useEffect(() => {
    // 页面加载时跟踪页面浏览
    trackPageView(document.title, location.pathname);
  }, [location]);
};

// 服务点击跟踪Hook
export const useServiceTracking = () => {
  const handleServiceClick = (serviceName, servicePrice) => {
    trackServiceClick(serviceName, servicePrice);
  };
  
  return { handleServiceClick };
};

// 博客阅读跟踪Hook
export const useBlogTracking = () => {
  const handleBlogRead = (articleTitle, readTime) => {
    trackBlogRead(articleTitle, readTime);
  };
  
  return { handleBlogRead };
};

// 联系表单跟踪Hook
export const useContactTracking = () => {
  const handleContactSubmit = (formType) => {
    trackContactSubmit(formType);
  };
  
  return { handleContactSubmit };
};

// 支付流程跟踪Hook
export const usePaymentTracking = () => {
  const handlePaymentStart = (serviceName, amount) => {
    trackPaymentStart(serviceName, amount);
  };
  
  const handlePaymentComplete = (serviceName, amount, transactionId) => {
    trackPaymentComplete(serviceName, amount, transactionId);
  };
  
  return { handlePaymentStart, handlePaymentComplete };
};

// 工具使用跟踪Hook
export const useToolTracking = () => {
  const handleToolUsage = (toolName, resultType) => {
    trackToolUsage(toolName, resultType);
  };
  
  return { handleToolUsage };
};

// 社交媒体分享跟踪Hook
export const useSocialTracking = () => {
  const handleSocialShare = (platform, contentType) => {
    trackSocialShare(platform, contentType);
  };
  
  return { handleSocialShare };
};

// 错误跟踪Hook
export const useErrorTracking = () => {
  const handleError = (errorMessage, errorType) => {
    trackError(errorMessage, errorType);
  };
  
  return { handleError };
};

// 用户参与度跟踪Hook
export const useEngagementTracking = () => {
  const handleEngagement = (action, element) => {
    trackEngagement(action, element);
  };
  
  return { handleEngagement };
};

// 通用事件跟踪Hook
export const useEventTracking = () => {
  const handleEvent = (eventName, parameters = {}) => {
    trackEvent(eventName, parameters);
  };
  
  return { handleEvent };
}; 