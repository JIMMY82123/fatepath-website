# Formspree 设置指南

## 📋 **Formspree 账户设置**

### 第 1 步：注册账户
1. 访问 [formspree.io](https://formspree.io)
2. 点击 "Sign Up" 或 "Get Started"
3. 使用您的邮箱：`chenxiao0801@hotmail.com`
4. 验证邮箱地址

### 第 2 步：创建表单

#### 选项 A：创建单个通用表单（推荐）
1. 登录后点击 "New Form"
2. 选择 "Contact Form"
3. 表单名称：`numerology-services`
4. 记录表单 ID（例如：`xpzgwqjq`）

#### 选项 B：创建三个独立表单
1. **八字详批表单**
   - 名称：`bazi-reading-form`
   - 表单 ID：`[您的表单ID1]`

2. **爱情合盘表单**
   - 名称：`love-compatibility-form`
   - 表单 ID：`[您的表单ID2]`

3. **定制护符表单**
   - 名称：`custom-talisman-form`
   - 表单 ID：`[您的表单ID3]`

### 第 3 步：配置表单设置
1. 在表单设置中，确保：
   - ✅ 启用邮件通知
   - ✅ 设置收件邮箱为 `chenxiao0801@hotmail.com`
   - ✅ 启用垃圾邮件保护
   - ✅ 设置成功页面重定向（可选）

### 第 4 步：更新代码

#### 如果使用单个表单（推荐）
所有表单文件中的 Formspree URL 已经是正确的：
```javascript
'https://formspree.io/f/xpzgwqjq'
```
只需要将 `xpzgwqjq` 替换为您的真实表单 ID。

#### 如果使用三个独立表单
需要更新以下文件中的表单 ID：

**src/pages/BaziForm.jsx**
```javascript
const response = await fetch('https://formspree.io/f/[您的八字表单ID]', {
```

**src/pages/LoveForm.jsx**
```javascript
const response = await fetch('https://formspree.io/f/[您的爱情表单ID]', {
```

**src/pages/TalismanForm.jsx**
```javascript
const response = await fetch('https://formspree.io/f/[您的护符表单ID]', {
```

## 🔧 **测试表单**

### 测试步骤
1. 启动开发服务器：`npm run dev`
2. 访问表单页面：
   - `/form-bazi` - 八字详批表单
   - `/form-love` - 爱情合盘表单
   - `/form-talisman` - 定制护符表单
3. 填写测试信息并提交
4. 检查您的邮箱是否收到表单提交

### 测试数据示例
```
姓名：Test User
邮箱：test@example.com
性别：Male
出生日期：1990-01-01
出生地点：New York, USA
```

## 📧 **邮件通知设置**

### 邮件模板建议
在 Formspree 设置中，您可以自定义邮件模板：

**主题行：**
```
新的命理服务请求 - [服务类型]
```

**邮件内容：**
```
收到新的服务请求：

服务类型：{service}
客户姓名：{fullName}
客户邮箱：{email}
提交时间：{timestamp}

请查看完整信息并处理。
```

## 🛡️ **安全设置**

### 推荐设置
1. **启用 reCAPTCHA** - 防止机器人提交
2. **设置提交频率限制** - 防止垃圾提交
3. **启用 IP 白名单**（可选）- 限制特定地区访问
4. **设置邮件通知** - 及时收到新请求

## 📱 **移动端优化**

### 表单字段验证
确保所有必填字段都有适当的验证：
- 邮箱格式验证
- 必填字段标记
- 错误信息显示

## 🚀 **上线后检查清单**

- [ ] Formspree 账户已激活
- [ ] 表单 ID 已正确更新
- [ ] 邮件通知正常工作
- [ ] 垃圾邮件保护已启用
- [ ] 表单提交测试通过
- [ ] 移动端表单正常显示
- [ ] 错误处理正常工作

## 💡 **常见问题**

### Q: 表单提交后没有收到邮件？
A: 检查：
1. Formspree 账户是否已激活
2. 表单 ID 是否正确
3. 垃圾邮件文件夹
4. 邮箱设置是否正确

### Q: 如何更改收件邮箱？
A: 在 Formspree 表单设置中更改通知邮箱地址。

### Q: 如何查看表单提交历史？
A: 登录 Formspree 账户，在表单管理页面查看提交记录。

---

**注意：** 请确保在网站正式上线前完成所有 Formspree 设置和测试。 