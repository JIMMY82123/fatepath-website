// 简化的Google Analytics工具函数

// 检查GA是否已加载
export const isGAReady = () => {
  return typeof window !== 'undefined' && window.gtag;
};

// 页面浏览跟踪
export const trackPageView = (pageTitle, pagePath) => {
  if (!isGAReady()) return;
  
  window.gtag('event', 'page_view', {
    page_title: pageTitle || document.title,
    page_location: pagePath || window.location.href,
    page_path: pagePath || window.location.pathname
  });
};

// 自定义事件跟踪
export const trackEvent = (eventName, parameters = {}) => {
  if (!isGAReady()) return;
  
  window.gtag('event', eventName, {
    event_category: parameters.category || 'engagement',
    event_label: parameters.label,
    value: parameters.value,
    ...parameters
  });
};

// 服务点击跟踪
export const trackServiceClick = (serviceName, servicePrice) => {
  trackEvent('service_click', {
    category: 'services',
    label: serviceName,
    value: servicePrice,
    service_name: serviceName,
    service_price: servicePrice
  });
};

// 工具使用跟踪（如Sacred Oracle）
export const trackToolUsage = (toolName, resultType) => {
  trackEvent('tool_usage', {
    category: 'tools',
    label: toolName,
    tool_name: toolName,
    result_type: resultType
  });
}; 