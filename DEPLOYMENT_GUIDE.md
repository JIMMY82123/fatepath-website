# 网站部署指南

## 🚀 部署选项

### 选项 1: Vercel (推荐)
1. **注册 Vercel 账户**
   - 访问 [vercel.com](https://vercel.com)
   - 使用 GitHub 账户注册

2. **连接 GitHub 仓库**
   - 点击 "New Project"
   - 选择您的 GitHub 仓库
   - Vercel 会自动检测 React 项目

3. **配置部署**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **环境变量设置**
   - 在 Vercel 仪表板中添加环境变量（如果需要）

5. **部署**
   - 点击 "Deploy"
   - 等待构建完成

### 选项 2: Netlify
1. **注册 Netlify 账户**
   - 访问 [netlify.com](https://netlify.com)

2. **部署步骤**
   - 拖拽 `dist` 文件夹到 Netlify
   - 或连接 GitHub 仓库

3. **配置**
   - Build command: `npm run build`
   - Publish directory: `dist`

### 选项 3: GitHub Pages
1. **安装 gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **更新 package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     },
           "homepage": "https://yourusername.github.io/fatepath-website"
   }
   ```

3. **部署**
   ```bash
   npm run deploy
   ```

## 🔧 部署前检查清单

### 1. 代码优化
- [ ] 删除所有测试代码和注释
- [ ] 检查控制台错误
- [ ] 验证所有链接正常工作
- [ ] 测试表单提交功能

### 2. 性能优化
- [ ] 压缩图片
- [ ] 优化字体加载
- [ ] 检查包大小
- [ ] 启用 Gzip 压缩

### 3. SEO 优化
- [ ] 更新 meta 标签
- [ ] 添加 Open Graph 标签
- [ ] 创建 sitemap.xml
- [ ] 设置 robots.txt

### 4. 安全检查
- [ ] 移除敏感信息
- [ ] 检查 API 密钥安全
- [ ] 启用 HTTPS
- [ ] 设置 CSP 头

## 📝 部署后任务

### 1. 域名设置
- 购买域名（推荐：Namecheap, GoDaddy）
- 配置 DNS 记录
- 设置 SSL 证书

### 2. 监控设置
- 设置 Google Analytics
- 配置错误监控
- 设置性能监控

### 3. 备份策略
- 设置自动备份
- 配置版本控制
- 保存数据库备份

## 🛠️ 常用命令

```bash
# 本地构建
npm run build

# 本地预览构建结果
npm run preview

# 检查构建文件
ls -la dist/

# 测试本地服务器
npx serve dist/
```

## 📊 性能检查工具

- **Lighthouse**: 检查性能、可访问性、SEO
- **PageSpeed Insights**: Google 性能分析
- **GTmetrix**: 详细性能报告
- **WebPageTest**: 多地点测试

## 🔍 部署后验证

1. **功能测试**
   - 所有页面正常加载
   - 表单提交成功
   - 链接跳转正确
   - 响应式设计正常

2. **性能测试**
   - 页面加载速度
   - 移动端性能
   - 图片加载优化

3. **SEO 检查**
   - Google Search Console
   - 元标签正确
   - 结构化数据

## 🚨 常见问题

### 构建失败
- 检查依赖版本
- 清理 node_modules
- 检查环境变量

### 页面 404
- 检查路由配置
- 设置重定向规则
- 验证文件路径

### 表单不工作
- 检查 API 端点
- 验证 CORS 设置
- 测试网络连接

## 📞 技术支持

如果遇到部署问题：
1. 查看平台文档
2. 检查错误日志
3. 联系平台支持
4. 查看社区论坛 