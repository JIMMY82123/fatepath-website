# 联系表单设置指南

## 📋 概述
联系页面的留言表单现在已经具备实际功能，使用Formbold处理表单提交。您需要完成以下设置才能让表单正常工作。

## 🔧 需要配置的内容

### 1. 更新联系方式
在 `src/pages/Contact.jsx` 文件中，需要更新以下信息：

#### WhatsApp号码
```javascript
const phoneNumber = 'your-whatsapp-number' // 替换为您的实际WhatsApp号码
```
**示例：** `+1234567890` 或 `1234567890`

#### 电话号码
```javascript
value: "your-phone-number", // 替换为您的实际电话号码
action: () => window.open('tel:your-phone-number'), // 替换为您的实际电话号码
```

### 2. 创建Formbold表单
1. 访问 [Formbold.com](https://formbold.com)
2. 注册/登录账户
3. 创建新表单
4. 添加以下字段：
   - First Name (文本)
   - Last Name (文本)
   - Email (邮箱)
   - Service Interest (下拉选择)
   - Message (文本区域)

### 3. 更新Formbold表单ID
在 `src/pages/Contact.jsx` 文件中找到：
```javascript
const response = await fetch('https://formbold.com/s/contact-form-id', {
```
将 `contact-form-id` 替换为您的实际Formbold表单ID。

## 📝 表单字段说明

### 必填字段
- **First Name**：客户名字
- **Last Name**：客户姓氏
- **Email**：客户邮箱地址
- **Message**：客户留言内容

### 可选字段
- **Service Interest**：客户感兴趣的服务
  - Detailed Bazi Reading
  - Love Compatibility Reading
  - Custom Talisman
  - General Inquiry

## 🎯 表单功能特性

### ✅ 已实现的功能
1. **表单验证**：必填字段验证
2. **提交状态**：显示"发送中..."状态
3. **成功反馈**：提交成功后显示确认信息
4. **错误处理**：提交失败时显示错误信息
5. **表单重置**：提交成功后清空表单
6. **重新发送**：可以发送多条消息

### 🔄 用户体验
- 实时表单验证
- 平滑的动画效果
- 清晰的视觉反馈
- 响应式设计

## 🚀 部署步骤

### 1. 更新联系信息
```javascript
// 在 src/pages/Contact.jsx 中更新
const phoneNumber = '您的WhatsApp号码'
value: "您的电话号码"
```

### 2. 配置Formbold
1. 创建Formbold表单
2. 获取表单ID
3. 更新代码中的表单ID

### 3. 测试功能
1. 填写表单并提交
2. 检查邮箱是否收到通知
3. 测试所有联系方式链接

## 📧 邮件通知设置

### Formbold自动通知
- 表单提交后自动发送邮件到您的邮箱
- 包含所有表单字段信息
- 可自定义邮件模板

### 自定义设置
1. 登录Formbold账户
2. 进入表单设置
3. 配置邮件通知
4. 设置邮件模板

## 💡 建议

### 响应时间
- 建议在24小时内回复客户
- 可以设置自动回复邮件
- 考虑添加营业时间说明

### 隐私保护
- Formbold提供数据加密
- 符合GDPR要求
- 可设置数据保留期限

### 备份方案
- 考虑添加备用联系方式
- 设置邮件转发规则
- 定期备份表单数据

## 🔗 相关文件
- `src/pages/Contact.jsx` - 联系页面主文件
- Formbold表单配置
- 邮件通知设置

## 📞 技术支持
如需修改表单样式或功能，请参考：
- React Hooks文档
- Formbold API文档
- Tailwind CSS文档 