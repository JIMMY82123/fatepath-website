// Google Ads 转化事件跟踪工具

/**
 * 触发Google Ads转化事件
 * @param {string} conversionId - 转化ID (AW-17430671654)
 * @param {string} conversionLabel - 转化标签 (e2eYCNWo1P4aEKbiy_dA)
 * @param {number} value - 转化价值 (美元)
 * @param {string} currency - 货币代码 (USD)
 * @param {string} transactionId - 交易ID
 */
export const trackConversion = (conversionId = 'AW-17430671654', conversionLabel = 'e2eYCNWo1P4aEKbiy_dA', value = 30.00, currency = 'USD', transactionId = null) => {
  // 检查gtag是否可用
  if (typeof window !== 'undefined' && window.gtag) {
    try {
      // 首先确保Google Ads配置正确
      window.gtag('config', 'AW-17430671654', {
        'conversion_id': 'AW-17430671654',
        'conversion_label': 'e2eYCNWo1P4aEKbiy_dA'
      });
      
      const eventData = {
        'send_to': `${conversionId}/${conversionLabel}`,
        'value': value,
        'currency': currency
      };
      
      // 如果有交易ID，添加到事件数据中
      if (transactionId) {
        eventData.transaction_id = transactionId;
      }
      
      // 触发转化事件
      window.gtag('event', 'conversion', eventData);
      
      // 开发环境日志
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('🎯 转化事件已触发:', eventData);
        console.log('✅ Google Ads 转化配置已更新');
      }
      
      return true;
    } catch (error) {
      console.error('❌ 转化事件触发失败:', error);
      return false;
    }
  } else {
    console.warn('⚠️ gtag 未加载，无法触发转化事件');
    return false;
  }
};

/**
 * 触发BaZi折扣服务转化事件
 * @param {string} transactionId - 可选的交易ID
 */
export const trackBaziDiscountConversion = (transactionId = null) => {
  const id = transactionId || `bazi_${Date.now()}`;
  return trackConversion('AW-17430671654', 'e2eYCNWo1P4aEKbiy_dA', 30.00, 'USD', id);
};

/**
 * 触发表单提交转化事件
 * @param {string} formType - 表单类型
 * @param {string} transactionId - 可选的交易ID
 */
export const trackFormSubmission = (formType = 'bazi_discount', transactionId = null) => {
  const id = transactionId || `${formType}_${Date.now()}`;
  
  // 根据表单类型设置不同的价值
  let value = 30.00; // 默认BaZi折扣服务价值
  
  if (formType === 'bazi_regular') {
    value = 38.00;
  } else if (formType === 'love_compatibility') {
    value = 25.00;
  } else if (formType === 'custom_talisman') {
    value = 45.00;
  }
  
  return trackConversion('AW-17430671654', 'e2eYCNWo1P4aEKbiy_dA', value, 'USD', id);
};

/**
 * 检查转化跟踪是否正常工作
 */
export const checkConversionTracking = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    console.log('✅ Google Ads 转化跟踪已就绪');
    console.log('📊 转化ID: AW-17430671654');
    console.log('🏷️ 转化标签: e2eYCNWo1P4aEKbiy_dA');
    
    // 确保配置正确
    window.gtag('config', 'AW-17430671654', {
      'conversion_id': 'AW-17430671654',
      'conversion_label': 'e2eYCNWo1P4aEKbiy_dA'
    });
    
    return true;
  } else {
    console.warn('❌ Google Ads 转化跟踪未就绪');
    return false;
  }
};

export default {
  trackConversion,
  trackBaziDiscountConversion,
  trackFormSubmission,
  checkConversionTracking
};
