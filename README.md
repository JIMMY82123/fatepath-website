# FatePath - Professional Astrology & Divination Website

一个融合东方灵性与数字科技的命理师个人品牌网站，采用现代化的设计理念和先进的技术栈。

## ✨ 特色功能

- **3D视觉效果**: 使用Three.js实现的旋转太极图
- **响应式设计**: 完美适配桌面端和移动端
- **流畅动画**: 基于Framer Motion的页面过渡和交互动画
- **现代化UI**: 黑金配色方案，融合东方神秘元素
- **自动轮播**: 客户评价自动切换展示
- **WhatsApp集成**: 一键联系功能

## 🎨 设计理念

- **视觉风格**: 东方灵性 + 数字科技
- **色彩方案**: 黑金配色，营造神秘而专业的氛围
- **字体选择**: Playfair Display (标题) + Inter (正文)
- **动画效果**: 流畅的淡入淡出和悬浮动画

## 🛠 技术栈

- **前端框架**: React 18
- **构建工具**: Vite
- **样式框架**: Tailwind CSS
- **动画库**: Framer Motion
- **3D渲染**: Three.js + React Three Fiber
- **路由**: React Router DOM
- **图标**: Lucide React

## 📦 安装和运行

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

### 3. 构建生产版本

```bash
npm run build
```

### 4. 预览生产版本

```bash
npm run preview
```

## 📁 项目结构

```
src/
├── components/          # 可复用组件
│   ├── Navbar.jsx      # 导航栏组件
│   └── Footer.jsx      # 页脚组件
├── pages/              # 页面组件
│   ├── Home.jsx        # 首页
│   ├── Services.jsx    # 服务页面
│   ├── Testimonials.jsx # 评价页面
│   └── Contact.jsx     # 联系页面
├── App.jsx             # 主应用组件
├── main.jsx            # 应用入口
└── index.css           # 全局样式
```

## 🎯 页面功能

### 首页 (Home)
- 自动播放的视频背景
- 5步逻辑流程优化
- 集成好评轮播
- 服务和定价展示

### 服务页面 (Services)
- 卡片切换动画
- 详细服务介绍
- 价格和时长信息
- 特色功能列表

### 评价页面 (Testimonials)
- 自动轮播客户评价
- 星级评分系统
- 客户头像和位置信息
- 统计数据展示

### 联系页面 (Contact)
- WhatsApp一键联系
- 联系表单
- 营业时间显示
- 漂浮背景元素

## 🎨 自定义配置

### 修改颜色主题
在 `tailwind.config.js` 中修改 `colors` 配置：

```javascript
colors: {
  'gold': {
    // 金色系配置
  },
  'mystic': {
    // 神秘色系配置
  }
}
```

### 修改字体
在 `index.html` 中更新Google Fonts链接：

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### 修改联系信息
在 `src/components/Footer.jsx` 中更新联系信息：

```javascript
// WhatsApp 链接
window.open('https://wa.me/8615914228258', '_blank')

// Email 链接  
window.open('mailto:chenxiao0801@hotmail.com', '_blank')
```

## 🚀 部署建议

### Vercel部署
1. 将代码推送到GitHub
2. 在Vercel中导入项目
3. 自动部署完成

### Netlify部署
1. 构建项目: `npm run build`
2. 上传 `dist` 文件夹到Netlify
3. 配置域名和SSL

## 📱 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request

## 📄 许可证

MIT License

## 📞 联系信息

如有问题或建议，请通过以下方式联系：

- Email: chenxiao0801@hotmail.com
- WhatsApp: +86 15914228258

---

**注意**: 这是一个演示项目，请根据实际需求修改联系信息、服务内容和品牌元素。 