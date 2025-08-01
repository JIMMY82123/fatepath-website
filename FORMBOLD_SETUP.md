# Formbold 表单设置指南

## 概述
Formbold 是一个强大的表单构建平台，可以轻松创建各种类型的表单并处理表单提交。本指南将帮助您在 Formbold 上创建表单并将其集成到您的命理师网站中。

## 步骤 1: 创建 Formbold 账户
1. 访问 [formbold.com](https://formbold.com)
2. 点击 "Sign Up" 创建账户
3. 验证您的邮箱地址

## 步骤 2: 创建联系表单

### 2.1 创建新表单
1. 登录 Formbold 后，点击 "Create Form"
2. 选择 "Blank Form" 或使用模板
3. 为表单命名，例如："Contact Form"

### 2.2 添加表单字段
根据您的联系表单图片，添加以下字段：

#### 必填字段：
- **First Name** (Text Input)
  - 类型：Short Text
  - 标签：First Name *
  - 占位符：Your first name
  - 必填：是

- **Last Name** (Text Input)
  - 类型：Short Text
  - 标签：Last Name *
  - 占位符：Your last name
  - 必填：是

- **Email** (Email Input)
  - 类型：Email
  - 标签：Email *
  - 占位符：your.email@example.com
  - 必填：是

- **Message** (Text Area)
  - 类型：Long Text
  - 标签：Message *
  - 占位符：Tell me about what you're seeking guidance on...
  - 必填：是

#### 可选字段：
- **Service Interest** (Dropdown)
  - 类型：Dropdown
  - 标签：Service Interest
  - 选项：
    - Select a service
    - Bazi Reading
    - Love Compatibility
    - Custom Talisman
    - General Consultation
  - 必填：否

### 2.3 配置表单设置
1. **表单标题**：Send Me a Message
2. **提交按钮文本**：Send Message
3. **成功消息**：Thank you for your message! I'll get back to you within 24 hours.
4. **重定向 URL**：可选，提交后跳转到特定页面

## 步骤 3: 获取表单集成代码

### 3.1 获取表单 ID
创建表单后，Formbold 会提供一个唯一的表单 ID，格式类似：`35AWZ`

**当前配置的表单ID：**
- 联系表单：`3VXwJ` ✅
- 八字阅读表单：`35AWZ` ✅
- 爱情配对表单：`3dpPE` ✅
- 护身符定制表单：`3OGNZ` ✅

### 3.2 获取 API 端点
Formbold 的 API 端点为：
```
https://formbold.com/s/{FORM_ID}
```

## 步骤 4: 集成到 React 组件

### 4.1 更新 Contact.jsx
将以下代码集成到您的 Contact 组件中：

```javascript
const handleSubmit = async (e) => {
  e.preventDefault()
  setIsSubmitting(true)

  try {
    const response = await fetch('https://formbold.com/s/YOUR_FORM_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service: 'Contact Form',
        ...formData
      })
    })

    if (response.ok) {
      setIsSubmitted(true)
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        serviceInterest: '',
        message: ''
      })
    } else {
      throw new Error('Submission failed')
    }
  } catch (error) {
    console.error('Error submitting form:', error)
    alert('There was an error submitting your message. Please try again.')
  } finally {
    setIsSubmitting(false)
  }
}
```

## 步骤 5: 创建其他类型的表单

### 5.1 Bazi 阅读表单
创建专门的八字阅读表单，包含：
- 全名
- 性别
- 出生日期
- 出生时间
- 出生地点
- 具体问题

### 5.2 爱情配对表单
创建爱情配对表单，包含：
- 您的信息（姓名、出生日期、时间、地点）
- 伴侣信息（姓名、出生日期、时间、地点）
- 关系状态
- 具体问题

### 5.3 定制护身符表单
创建护身符定制表单，包含：
- 客户信息
- 护身符类型偏好
- 特殊要求
- 预算范围

## 步骤 6: 表单管理

### 6.1 查看提交
1. 在 Formbold 仪表板中查看所有表单提交
2. 设置邮件通知
3. 导出数据为 CSV

### 6.2 自定义通知
- 设置提交确认邮件
- 配置管理员通知
- 自定义邮件模板

## 步骤 7: 高级功能

### 7.1 条件逻辑
- 根据服务选择显示不同字段
- 设置必填字段条件

### 7.2 文件上传
- 允许客户上传照片或文档
- 设置文件大小限制

### 7.3 支付集成
- 集成 Stripe 或其他支付方式
- 设置不同服务的价格

## 注意事项

1. **替换表单 ID**：确保将代码中的 `YOUR_FORM_ID` 替换为实际的表单 ID
2. **测试表单**：在部署前充分测试表单功能
3. **数据保护**：确保符合数据保护法规
4. **备份数据**：定期导出重要数据

## 故障排除

### 常见问题：
1. **表单提交失败**：检查表单 ID 是否正确
2. **CORS 错误**：Formbold 通常处理 CORS，但可能需要检查
3. **字段不匹配**：确保表单字段名称与代码中的字段名称一致

## 联系支持
如果遇到问题，可以：
- 查看 Formbold 官方文档
- 联系 Formbold 支持团队
- 检查浏览器控制台错误信息 