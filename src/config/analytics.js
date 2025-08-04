// Google Analytics 配置

// GA4 测量ID - 请替换为你的实际测量ID
export const GA_MEASUREMENT_ID = 'G-GCNP2F5NJC'; // 你的实际测量ID

// 网站配置
export const SITE_CONFIG = {
  name: 'FatePath',
  domain: 'fatepath.me',
  environment: process.env.NODE_ENV || 'development'
};

// 事件配置
export const EVENT_CONFIG = {
  // 服务相关事件
  services: {
    bazi_reading: {
      name: 'Detailed Bazi Reading',
      price: 38,
      category: 'services'
    },
    love_compatibility: {
      name: 'Love Compatibility Reading',
      price: 44,
      category: 'services'
    },
    custom_talisman: {
      name: 'Custom Talisman',
      price: 129,
      category: 'services'
    }
  },
  
  // 工具相关事件
  tools: {
    sacred_oracle: {
      name: 'Sacred Oracle',
      category: 'tools'
    }
  },
  
  // 内容相关事件
  content: {
    blog: {
      category: 'content',
      type: 'blog_post'
    },
    faq: {
      category: 'content',
      type: 'faq'
    }
  },
  
  // 转化相关事件
  conversion: {
    contact_form: {
      category: 'conversion',
      type: 'contact'
    },
    payment: {
      category: 'conversion',
      type: 'payment'
    }
  }
};

// 自定义维度配置
export const CUSTOM_DIMENSIONS = {
  user_type: 'cd1',
  service_category: 'cd2',
  content_type: 'cd3',
  device_type: 'cd4'
};

// 自定义指标配置
export const CUSTOM_METRICS = {
  session_duration: 'cm1',
  page_load_time: 'cm2',
  scroll_depth: 'cm3'
};

// 隐私设置
export const PRIVACY_CONFIG = {
  // 禁用个性化广告（GDPR合规）
  allow_google_signals: false,
  allow_ad_personalization_signals: false,
  
  // 匿名化IP地址
  anonymize_ip: true,
  
  // 禁用用户ID跟踪
  user_id: null
};

// 调试模式
export const DEBUG_MODE = process.env.NODE_ENV === 'development';

// 验证配置
export const validateConfig = () => {
  if (GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    console.warn('⚠️ 请设置正确的Google Analytics测量ID');
    return false;
  }
  return true;
}; 