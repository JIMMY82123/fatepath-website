# 字体使用指南

## 字体定义

本网站使用以下字体，确保视觉一致性和品牌识别：

### 主要字体
- **Cinzel** (衬线字体) - 主标题和重要标题
- **Playfair Display** (衬线字体) - 装饰性标题和特殊强调
- **Poppins** (无衬线字体) - 副标题和按钮文字
- **Inter** (无衬线字体) - 正文和一般文本

## 使用规则

### 1. 主标题 (H1, H2)
```css
font-family: 'Cinzel', serif;
font-weight: 600-700;
```
**使用场景：**
- 页面主标题
- 服务标题
- 博客文章标题
- 重要章节标题

### 2. 装饰性标题
```css
font-family: 'Playfair Display', serif;
font-weight: 500-600;
```
**使用场景：**
- 特殊强调的标题
- 引言和引用
- 装饰性文字
- 品牌标语

### 3. 副标题 (H3, H4)
```css
font-family: 'Poppins', sans-serif;
font-weight: 500-600;
```
**使用场景：**
- 卡片标题
- 功能标题
- 按钮文字
- 导航菜单

### 4. 正文文本
```css
font-family: 'Inter', sans-serif;
font-weight: 300-400;
```
**使用场景：**
- 段落文字
- 表单标签
- 描述文字
- 一般内容

## 字体权重使用

### Cinzel
- **400** - 常规文本
- **500** - 中等强调
- **600** - 重要标题
- **700** - 主要标题

### Playfair Display
- **400** - 常规装饰文字
- **500** - 中等强调
- **600** - 重要装饰标题
- **700** - 主要装饰标题

### Poppins
- **300** - 轻量文字
- **400** - 常规文字
- **500** - 中等强调
- **600** - 重要文字
- **700** - 强调文字

### Inter
- **300** - 轻量正文
- **400** - 常规正文
- **500** - 中等强调
- **600** - 重要文字
- **700** - 强调文字

## 响应式字体大小

### 移动端 (≤640px)
- 主标题: `text-2xl` 到 `text-4xl`
- 副标题: `text-lg` 到 `text-xl`
- 正文: `text-sm` 到 `text-base`

### 平板端 (641px-1024px)
- 主标题: `text-3xl` 到 `text-5xl`
- 副标题: `text-xl` 到 `text-2xl`
- 正文: `text-base` 到 `text-lg`

### 桌面端 (≥1025px)
- 主标题: `text-4xl` 到 `text-6xl`
- 副标题: `text-2xl` 到 `text-3xl`
- 正文: `text-lg` 到 `text-xl`

## 颜色搭配

### 主标题颜色
```css
/* 渐变文字 */
.gradient-text {
  background: linear-gradient(135deg, #D97706, #F59E0B, #FCD34D);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 白色文字 */
text-white
```

### 副标题颜色
```css
text-gold-400  /* 金色强调 */
text-white     /* 白色 */
```

### 正文颜色
```css
text-mystic-300  /* 主要正文 */
text-mystic-400  /* 次要文字 */
text-mystic-200  /* 重要文字 */
```

## 注意事项

1. **避免字体混用** - 同一层级的内容使用相同字体
2. **保持权重一致** - 相同类型的内容使用相同的字体权重
3. **响应式适配** - 确保在不同屏幕尺寸下字体大小合适
4. **可读性优先** - 确保文字在背景色上有足够的对比度
5. **加载优化** - 使用 `font-display: swap` 避免字体闪烁

## 代码示例

### 主标题
```jsx
<h1 className="text-3xl sm:text-4xl md:text-6xl font-cinzel font-bold text-white">
  <span className="gradient-text">Your Destiny Awaits</span>
</h1>
```

### 副标题
```jsx
<h2 className="text-xl sm:text-2xl font-poppins font-semibold text-gold-400">
  Discover Your Path
</h2>
```

### 正文
```jsx
<p className="text-base sm:text-lg font-inter text-mystic-300 leading-relaxed">
  Your content here...
</p>
```

### 按钮文字
```jsx
<button className="font-poppins font-semibold text-black">
  Get Started
</button>
```

## 维护指南

1. 定期检查字体使用是否一致
2. 确保新添加的组件遵循字体规范
3. 测试不同设备和浏览器的字体显示效果
4. 监控字体加载性能
5. 保持字体文件的最小化加载
