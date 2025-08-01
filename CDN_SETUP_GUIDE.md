# CDN 设置指南

## 🎯 什么是 CDN

CDN (Content Delivery Network) 内容分发网络，通过在全球各地部署服务器节点，将网站内容缓存到离用户最近的服务器，从而：
- 提升网站加载速度
- 减少服务器压力
- 提高用户体验
- 增强网站安全性

## 🚀 CDN 服务选择

### 1. Cloudflare (推荐免费方案)
- **免费计划**: 包含 CDN、SSL、DDoS 防护
- **设置简单**: 只需修改 DNS 记录
- **功能丰富**: 缓存、压缩、安全防护

### 2. Vercel (部署平台自带)
- **自动 CDN**: 部署时自动配置
- **全球边缘网络**: 自动优化
- **零配置**: 开箱即用

### 3. Netlify (部署平台自带)
- **自动 CDN**: 部署时自动配置
- **智能缓存**: 自动优化静态资源
- **全球分发**: 覆盖全球

### 4. AWS CloudFront
- **企业级**: 高性能、高可用
- **按使用付费**: 适合大流量网站
- **深度集成**: 与 AWS 服务集成

## 🔧 Cloudflare CDN 设置

### 1. 注册 Cloudflare
1. 访问 [cloudflare.com](https://cloudflare.com)
2. 注册免费账户
3. 添加您的域名

### 2. 修改 DNS 记录
1. 在 Cloudflare 控制面板中
2. 将您的域名服务器改为 Cloudflare 提供的 NS
3. 等待 DNS 传播 (24-48 小时)

### 3. 配置缓存规则
```javascript
// 在 Cloudflare 控制面板中设置
// 静态资源缓存规则
*.css, *.js, *.png, *.jpg, *.svg -> Cache Level: Cache Everything
// HTML 文件缓存规则  
*.html -> Cache Level: Standard
```

### 4. 启用优化功能
- **Auto Minify**: 自动压缩 CSS、JS、HTML
- **Brotli**: 启用 Brotli 压缩
- **Rocket Loader**: 优化 JavaScript 加载
- **Image Optimization**: 图片优化

## 🌐 Vercel CDN 配置

### 1. 自动配置
Vercel 部署时自动配置 CDN，无需额外设置。

### 2. 自定义域名
1. 在 Vercel 项目设置中添加自定义域名
2. 配置 DNS 记录指向 Vercel
3. 启用 HTTPS

### 3. 缓存优化
```json
// vercel.json 配置
{
  "headers": [
    {
      "source": "/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ]
}
```

## 📦 静态资源优化

### 1. 图片 CDN
```html
<!-- 使用 CDN 加载图片 -->
<img src="https://your-cdn.com/images/logo.png" alt="Logo">
```

### 2. 字体 CDN
```html
<!-- Google Fonts 已经使用 CDN -->
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### 3. 图标 CDN
```html
<!-- 使用 CDN 加载图标库 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lucide-static@latest/font/lucide.css">
```

## ⚡ 性能优化配置

### 1. 资源预加载
```html
<!-- 预加载关键资源 -->
<link rel="preload" href="/fonts/playfair-display.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/images/hero-bg.jpg" as="image">
```

### 2. 资源预连接
```html
<!-- 预连接到外部域名 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://your-cdn.com">
```

### 3. 缓存策略
```javascript
// 不同资源的缓存策略
const cacheStrategies = {
  // 静态资源：长期缓存
  static: {
    'Cache-Control': 'public, max-age=31536000, immutable'
  },
  // HTML 页面：短期缓存
  html: {
    'Cache-Control': 'public, max-age=0, must-revalidate'
  },
  // API 响应：不缓存
  api: {
    'Cache-Control': 'no-cache, no-store, must-revalidate'
  }
}
```

## 🔒 安全配置

### 1. HTTPS 强制
```javascript
// 强制 HTTPS 重定向
if (location.protocol !== 'https:') {
  location.replace(`https:${location.href.substring(location.protocol.length)}`);
}
```

### 2. 安全头设置
```javascript
// 安全响应头
const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
}
```

### 3. CSP 策略
```html
<!-- 内容安全策略 -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;">
```

## 📊 监控和分析

### 1. 性能监控
- **Web Vitals**: 监控 Core Web Vitals
- **Real User Monitoring**: 真实用户性能数据
- **Synthetic Monitoring**: 模拟用户测试

### 2. 缓存命中率
- 监控 CDN 缓存命中率
- 优化缓存策略
- 分析缓存效果

### 3. 错误监控
- 监控 CDN 错误
- 设置告警机制
- 快速响应问题

## 🎯 最佳实践

### 1. 资源优化
- 压缩静态资源
- 使用现代图片格式 (WebP)
- 实施懒加载
- 优化字体加载

### 2. 缓存策略
- 静态资源长期缓存
- HTML 页面短期缓存
- API 响应不缓存
- 使用版本号或哈希

### 3. 监控维护
- 定期检查性能
- 监控错误率
- 优化缓存策略
- 更新 CDN 配置

## ✅ CDN 设置检查清单

### Cloudflare
- [ ] 域名已添加到 Cloudflare
- [ ] DNS 记录已更新
- [ ] SSL 证书已启用
- [ ] 缓存规则已配置
- [ ] 优化功能已启用

### Vercel/Netlify
- [ ] 项目已部署
- [ ] 自定义域名已配置
- [ ] HTTPS 已启用
- [ ] 缓存头已设置

### 通用优化
- [ ] 静态资源已优化
- [ ] 图片已压缩
- [ ] 字体加载已优化
- [ ] 安全头已配置
- [ ] 性能监控已设置

---

**重要提醒**: CDN 配置完成后，建议使用工具如 GTmetrix、PageSpeed Insights 测试性能提升效果。 