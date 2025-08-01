// Formbold 表单 ID 配置
// 请将以下占位符替换为您的实际表单 ID

export const FORM_IDS = {
  // 联系表单
  CONTACT: '3VXwJ',
  
  // 八字阅读表单
  BAZI: '35AWZ',
  
  // 爱情配对表单
  LOVE: '3dpPE',
  
  // 护身符定制表单
  TALISMAN: '3OGNZ',
  
  // 其他表单可以在这里添加
  // GENERAL_CONSULTATION: 'YOUR_GENERAL_FORM_ID',
  // PAYMENT: 'YOUR_PAYMENT_FORM_ID',
}

// 获取表单提交URL的辅助函数
export const getFormUrl = (formType) => {
  const formId = FORM_IDS[formType]
  if (!formId) {
    throw new Error(`未找到表单类型: ${formType}`)
  }
  return `https://formbold.com/s/${formId}`
}

// 验证表单ID是否已设置
export const validateFormIds = () => {
  const missingIds = []
  
  Object.entries(FORM_IDS).forEach(([key, value]) => {
    if (value.startsWith('YOUR_') || value === 'contact-form-id') {
      missingIds.push(key)
    }
  })
  
  if (missingIds.length > 0) {
    console.warn('以下表单ID需要更新:', missingIds)
    return false
  }
  
  return true
} 