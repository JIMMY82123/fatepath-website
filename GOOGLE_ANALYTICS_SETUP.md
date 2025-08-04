# Google Analytics 设置指南

## 📊 问题诊断

### 常见问题
- "网站未启用数据收集功能"
- "没有数据流"
- "跟踪代码未正确安装"

### 解决方案
需要正确配置GA4跟踪代码到网站中。

## 🔧 设置步骤

### 步骤 1: 获取GA4跟踪代码
1. 登录 [Google Analytics](https://analytics.google.com/)
2. 选择你的属性（Property）
3. 进入 **管理** → **数据流** → **网站**
4. 点击你的网站数据流
5. 复制 **测量ID**（格式：G-XXXXXXXXXX）

### 步骤 2: 配置跟踪代码
将以下代码添加到 `index.html` 的 `<head>` 部分：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**注意**: 将 `G-XXXXXXXXXX` 替换为你的实际测量ID。

### 步骤 3: 验证安装
1. 使用 [Google Tag Assistant](https://tagassistant.google.com/) 验证
2. 检查GA4实时报告
3. 等待24-48小时查看数据

## 🎯 高级配置

### 自定义事件跟踪
```javascript
// 跟踪页面浏览
gtag('event', 'page_view', {
  page_title: document.title,
  page_location: window.location.href
});

// 跟踪按钮点击
gtag('event', 'click', {
  event_category: 'engagement',
  event_label: 'button_click'
});
```

### 增强型电子商务跟踪
```javascript
// 跟踪服务购买
gtag('event', 'purchase', {
  transaction_id: 'T_12345',
  value: 38.00,
  currency: 'USD',
  items: [{
    item_id: 'bazi_reading',
    item_name: 'Detailed Bazi Reading',
    price: 38.00,
    quantity: 1
  }]
});
```

## 📱 移动端优化

### 响应式设计跟踪
```javascript
// 跟踪设备类型
gtag('event', 'screen_view', {
  screen_name: window.innerWidth > 768 ? 'desktop' : 'mobile'
});
```

## 🔍 常见问题解决

### 问题1: 数据不显示
- **检查**: 跟踪代码是否正确安装
- **解决**: 确认测量ID正确，代码在页面加载前执行

### 问题2: 实时数据延迟
- **检查**: 网络连接和代码执行
- **解决**: 清除浏览器缓存，检查控制台错误

### 问题3: 跨域跟踪
- **检查**: 域名配置
- **解决**: 在GA4中正确配置数据流域名

## 📈 性能优化

### 异步加载
```html
<!-- 使用async属性避免阻塞页面加载 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

### 隐私保护
```javascript
// 禁用个性化广告（GDPR合规）
gtag('config', 'G-XXXXXXXXXX', {
  'allow_google_signals': false,
  'allow_ad_personalization_signals': false
});
```

## ✅ 检查清单

- [ ] 获取正确的GA4测量ID
- [ ] 在HTML中添加跟踪代码
- [ ] 验证代码安装
- [ ] 测试实时数据
- [ ] 配置自定义事件（可选）
- [ ] 设置转化目标
- [ ] 配置受众群体

## 🚀 快速开始

1. **获取测量ID**: 从GA4控制台复制
2. **添加代码**: 更新 `index.html` 文件
3. **部署网站**: 推送到生产环境
4. **验证**: 使用Tag Assistant检查
5. **监控**: 查看实时报告

完成这些步骤后，你的网站就能正确收集Google Analytics数据了！ 