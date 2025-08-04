// Google Analytics 工具函数

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

// 博客文章阅读跟踪
export const trackBlogRead = (articleTitle, readTime) => {
  trackEvent('blog_read', {
    category: 'content',
    label: articleTitle,
    value: readTime,
    article_title: articleTitle,
    read_time: readTime
  });
};

// 联系表单提交跟踪
export const trackContactSubmit = (formType) => {
  trackEvent('contact_submit', {
    category: 'conversion',
    label: formType,
    form_type: formType
  });
};

// 支付流程跟踪
export const trackPaymentStart = (serviceName, amount) => {
  trackEvent('payment_start', {
    category: 'ecommerce',
    label: serviceName,
    value: amount,
    service_name: serviceName,
    amount: amount
  });
};

// 支付完成跟踪
export const trackPaymentComplete = (serviceName, amount, transactionId) => {
  trackEvent('purchase', {
    transaction_id: transactionId,
    value: amount,
    currency: 'USD',
    items: [{
      item_id: serviceName.toLowerCase().replace(/\s+/g, '_'),
      item_name: serviceName,
      price: amount,
      quantity: 1
    }]
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

// 社交媒体分享跟踪
export const trackSocialShare = (platform, contentType) => {
  trackEvent('social_share', {
    category: 'social',
    label: platform,
    platform: platform,
    content_type: contentType
  });
};

// 错误跟踪
export const trackError = (errorMessage, errorType) => {
  trackEvent('error', {
    category: 'error',
    label: errorType,
    error_message: errorMessage,
    error_type: errorType
  });
};

// 用户参与度跟踪
export const trackEngagement = (action, element) => {
  trackEvent('engagement', {
    category: 'user_engagement',
    label: action,
    action: action,
    element: element
  });
};

// 初始化GA（如果需要）
export const initializeGA = (measurementId) => {
  if (typeof window === 'undefined') return;
  
  // 如果GA已经初始化，跳过
  if (window.gtag) return;
  
  // 动态加载GA脚本
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
  
  // 初始化dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };
  
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    'allow_google_signals': false,
    'allow_ad_personalization_signals': false
  });
}; 