# 🌟 星空视频背景设置指南

## 📹 如何添加您的星空视频

### 步骤1：准备视频文件
1. **重命名视频**：将您的星空视频重命名为 `video-background.mp4`
2. **视频规格建议**：
   - 分辨率：1920x1080 (推荐) 或 1280x720
   - 格式：MP4
   - 时长：10-30秒（会循环播放）
   - 文件大小：建议控制在10MB以内
   - 帧率：24-30fps

### 步骤2：放置视频文件
将 `video-background.mp4` 文件放在以下位置：
```
compass/
└── public/
    └── video-background.mp4  ← 您的星空视频放这里
```

### 步骤3：视频内容建议
为了完美配合网站的神秘主题，建议视频包含：
- ✨ 缓慢移动的星空
- 🌌 银河或星云
- 🌙 深色背景
- 💫 柔和的星光效果
- 🚫 避免过于明亮或闪烁的元素

### 步骤4：测试效果
1. 启动开发服务器：
   ```bash
   npm run dev
   ```
2. 访问：http://localhost:3000
3. 视频将自动在主页背景播放

## 🎨 当前视频设置

### 视频属性
- ✅ **自动播放**：页面加载时自动开始
- ✅ **循环播放**：视频结束后自动重新开始
- ✅ **静音模式**：符合浏览器自动播放政策
- ✅ **移动端支持**：支持移动设备播放
- ✅ **透明度**：20%透明度，确保文字清晰
- ✅ **覆盖模式**：`object-cover` 确保视频填满整个屏幕
- ✅ **预加载**：`preload="auto"` 优化加载性能
- ✅ **滤镜效果**：亮度0.8，对比度1.1，增强视觉效果
- ✅ **居中定位**：视频内容居中显示

### 备用方案
如果视频文件不存在，网站会自动显示：
- 渐变背景：从深紫色到神秘黑色的渐变
- 保持网站的神秘氛围

## 🔧 自定义设置

### 修改视频透明度
在 `src/pages/Home.jsx` 中找到：
```jsx
className="w-full h-full object-cover opacity-20"
```
将 `opacity-20` 改为：
- `opacity-10` - 更透明
- `opacity-30` - 更不透明

### 修改视频路径
如果您想使用不同的视频文件名，修改：
```jsx
<source src="/video-background.mp4" type="video/mp4" />
```

### 添加多个视频源
可以添加多个视频格式支持：
```jsx
<video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-20">
  <source src="/video-background.mp4" type="video/mp4" />
  <source src="/video-background.webm" type="video/webm" />
  <div className="absolute inset-0 bg-gradient-to-br from-mystic-900 via-purple-900 to-mystic-800"></div>
</video>
```

## 📱 移动端优化

视频背景已经针对移动端进行了优化：
- 使用 `playsInline` 属性
- 响应式设计适配不同屏幕
- 性能优化确保流畅播放

## 🚨 注意事项

1. **文件大小**：大文件会影响加载速度
2. **浏览器兼容性**：现代浏览器都支持MP4格式
3. **性能考虑**：视频会自动优化以适应不同设备
4. **备用方案**：如果视频无法播放，会显示渐变背景

## 🎯 推荐视频资源

如果您需要星空视频素材，可以考虑：
- Pexels Videos
- Pixabay
- Unsplash Videos
- 或使用视频编辑软件制作

---

## 🎉 720P视频优化完成！

您的720P星空视频已经成功添加并优化：
- ✅ 视频文件：`public/video-background.mp4` (28MB)
- ✅ 分辨率：720P (1280x720)
- ✅ 性能优化：预加载 + 滤镜效果
- ✅ 视觉效果：亮度对比度优化
- ✅ 响应式：完美适配所有屏幕

**视频背景现在应该完美显示在您的网站上了！** 🌟 