# LazyImage 组件使用指南

## 概述

`LazyImage` 是一个高性能的 React 懒加载图片组件，使用 Intersection Observer API 实现真正的懒加载，提升页面性能和用户体验。

## 主要特性

✅ **真正的懒加载** - 使用 Intersection Observer API  
✅ **智能错误处理** - 支持备用图片和错误占位符  
✅ **可自定义占位符** - 支持自定义骨架屏和占位符  
✅ **性能优化** - 使用 useMemo 优化渲染  
✅ **平滑动画** - 集成 Framer Motion 动画  
✅ **响应式设计** - 完全支持 Tailwind CSS  

## 基本用法

```jsx
import LazyImage from '../components/LazyImage'

// 最简单的用法
<LazyImage
  src="/images/example.jpg"
  alt="示例图片"
  className="w-full h-64 rounded-lg"
/>
```

## 高级用法

### 1. 自定义占位符

```jsx
// 使用自定义占位符
<LazyImage
  src="/images/example.jpg"
  alt="示例图片"
  placeholder={
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      <span className="text-white text-2xl">🖼️</span>
    </div>
  }
/>
```

### 2. 自定义备用图片

```jsx
// 设置备用图片
<LazyImage
  src="/images/example.jpg"
  alt="示例图片"
  fallbackSrc="/images/fallback.jpg"
/>
```

### 3. 控制显示选项

```jsx
// 隐藏骨架屏和加载指示器
<LazyImage
  src="/images/example.jpg"
  alt="示例图片"
  showSkeleton={false}
  showLoadingSpinner={false}
/>
```

### 4. 调整懒加载阈值

```jsx
// 提前 200px 开始加载
<LazyImage
  src="/images/example.jpg"
  alt="示例图片"
  threshold={0.1}
  className="w-full h-64"
/>
```

## 完整属性列表

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `src` | string | - | 图片源地址（必需） |
| `alt` | string | - | 图片描述（必需） |
| `className` | string | '' | 自定义 CSS 类名 |
| `threshold` | number | 0.1 | 懒加载触发阈值 |
| `placeholder` | ReactNode | null | 自定义占位符 |
| `fallbackSrc` | string | '/images/testimonials/emma-rodriguez.jpg' | 备用图片地址 |
| `showSkeleton` | boolean | true | 是否显示默认骨架屏 |
| `showLoadingSpinner` | boolean | true | 是否显示加载指示器 |
| `...props` | - | - | 传递给 img 标签的其他属性 |

## 使用场景示例

### 1. 博客文章列表

```jsx
{blogPosts.map(post => (
  <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
    <LazyImage
      src={post.featuredImage}
      alt={post.title}
      className="w-full h-48 object-cover"
      fallbackSrc="/images/blog-placeholder.jpg"
    />
    <div className="p-6">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="text-gray-600">{post.excerpt}</p>
    </div>
  </article>
))}
```

### 2. 用户头像

```jsx
<LazyImage
  src={user.avatar}
  alt={`${user.name} 的头像`}
  className="w-16 h-16 rounded-full"
  fallbackSrc="/images/default-avatar.jpg"
  showSkeleton={false}
/>
```

### 3. 产品图片

```jsx
<LazyImage
  src={product.image}
  alt={product.name}
  className="w-full h-64 object-cover rounded-lg"
  placeholder={
    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
      <div className="text-gray-400 text-4xl">📦</div>
    </div>
  }
/>
```

## 性能优化建议

1. **合理设置阈值**：对于重要图片，可以设置较低的阈值（如 0.1）
2. **使用适当的占位符**：避免复杂的占位符影响渲染性能
3. **合理使用备用图片**：确保备用图片文件大小适中
4. **避免过度使用**：只在需要懒加载的图片上使用此组件

## 错误处理

组件会自动处理以下情况：

- 图片加载失败时显示错误占位符
- 如果有备用图片，会自动尝试加载备用图片
- 错误状态会被正确记录和显示

## 浏览器兼容性

- ✅ Chrome 51+
- ✅ Firefox 55+
- ✅ Safari 12.1+
- ✅ Edge 15+

对于不支持 Intersection Observer 的浏览器，组件会降级为立即加载模式。

## 注意事项

1. 确保 `src` 属性是有效的图片 URL
2. 备用图片路径应该是相对路径或绝对路径
3. 自定义占位符应该使用绝对定位
4. 组件会自动处理清理工作，无需手动清理观察器
