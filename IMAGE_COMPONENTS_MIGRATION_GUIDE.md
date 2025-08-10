# 图片组件迁移指南

## 概述

为了提供更好的图片加载体验和性能优化，我们创建了三个不同级别的图片组件，您可以根据具体需求选择合适的组件。

## 组件选择指南

### 1. LazyImage（基础版）
**适用场景：** 简单的懒加载需求
- 基本的懒加载功能
- 简单的错误处理
- 轻量级，性能开销小

```jsx
import LazyImage from '../components/LazyImage'

<LazyImage
  src="/images/example.jpg"
  alt="示例图片"
  className="w-full h-64 rounded-lg"
/>
```

### 2. OptimizedImage（标准版）
**适用场景：** 需要响应式图片和WebP支持
- 响应式图片支持（移动端、平板、桌面）
- WebP格式支持
- 优先级加载

```jsx
import OptimizedImage from '../components/OptimizedImage'

<OptimizedImage
  src="/images/desktop.jpg"
  mobileSrc="/images/mobile.jpg"
  tabletSrc="/images/tablet.jpg"
  alt="响应式图片"
  className="w-full h-64"
  priority={false}
/>
```

### 3. EnhancedImage（增强版）
**适用场景：** 需要所有高级功能
- 整合了所有功能
- 最灵活的配置选项
- 最佳的用户体验

```jsx
import EnhancedImage from '../components/EnhancedImage'

<EnhancedImage
  src="/images/desktop.jpg"
  mobileSrc="/images/mobile.jpg"
  tabletSrc="/images/tablet.jpg"
  alt="增强版图片"
  className="w-full h-64"
  priority={false}
  webpSupport={true}
  fallbackSrc="/images/fallback.jpg"
  showSkeleton={true}
  showLoadingSpinner={true}
/>
```

## 迁移步骤

### 步骤 1：评估当前使用情况

检查您的代码中图片组件的使用情况：

```bash
# 搜索所有图片组件的使用
grep -r "LazyImage\|OptimizedImage" src/
```

### 步骤 2：选择合适的组件

根据您的需求选择组件：

| 需求 | 推荐组件 | 原因 |
|------|----------|------|
| 简单懒加载 | LazyImage | 轻量级，易于使用 |
| 响应式图片 | OptimizedImage | 专门针对响应式优化 |
| 完整功能 | EnhancedImage | 功能最全面 |

### 步骤 3：逐步迁移

#### 从普通 img 标签迁移

```jsx
// 之前
<img src="/images/example.jpg" alt="示例" className="w-full h-64" />

// 之后
<LazyImage
  src="/images/example.jpg"
  alt="示例"
  className="w-full h-64"
/>
```

#### 从 LazyImage 升级到 EnhancedImage

```jsx
// 之前
<LazyImage
  src="/images/example.jpg"
  alt="示例"
  className="w-full h-64"
/>

// 之后（添加响应式支持）
<EnhancedImage
  src="/images/example.jpg"
  mobileSrc="/images/example-mobile.jpg"
  tabletSrc="/images/example-tablet.jpg"
  alt="示例"
  className="w-full h-64"
  webpSupport={true}
/>
```

## 性能优化建议

### 1. 图片尺寸优化

```jsx
// 为不同设备提供合适尺寸的图片
<EnhancedImage
  src="/images/hero-1200x800.jpg"      // 桌面版
  mobileSrc="/images/hero-768x512.jpg"  // 移动版
  tabletSrc="/images/hero-1024x683.jpg" // 平板版
  alt="英雄图片"
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 1200px"
/>
```

### 2. 优先级设置

```jsx
// 首屏重要图片使用优先级加载
<EnhancedImage
  src="/images/hero.jpg"
  alt="英雄图片"
  priority={true}
  className="w-full h-96"
/>

// 列表中的图片使用懒加载
<EnhancedImage
  src="/images/product.jpg"
  alt="产品图片"
  priority={false}
  threshold={0.1}
  className="w-full h-48"
/>
```

### 3. 错误处理优化

```jsx
// 为不同类型的图片设置合适的备用图片
<EnhancedImage
  src="/images/user-avatar.jpg"
  alt="用户头像"
  fallbackSrc="/images/default-avatar.jpg"
  showSkeleton={false}
  className="w-16 h-16 rounded-full"
/>
```

## 常见问题解答

### Q: 我应该使用哪个组件？
A: 根据您的需求：
- 简单懒加载：LazyImage
- 响应式需求：OptimizedImage  
- 完整功能：EnhancedImage

### Q: 如何优化图片加载性能？
A: 
1. 使用合适的图片尺寸
2. 启用WebP支持
3. 设置合理的懒加载阈值
4. 为重要图片设置优先级

### Q: 组件是否支持TypeScript？
A: 是的，所有组件都完全支持TypeScript，您可以直接在TS项目中使用。

### Q: 如何自定义占位符？
A: 使用 `placeholder` 属性：

```jsx
<EnhancedImage
  src="/images/example.jpg"
  alt="示例"
  placeholder={
    <div className="absolute inset-0 bg-blue-500 flex items-center justify-center">
      <span className="text-white text-2xl">🖼️</span>
    </div>
  }
/>
```

## 测试建议

### 1. 性能测试
- 使用 Chrome DevTools 的 Performance 面板
- 检查图片加载时间
- 验证懒加载是否正常工作

### 2. 响应式测试
- 在不同设备尺寸下测试
- 验证图片是否正确切换
- 检查WebP支持

### 3. 错误处理测试
- 测试无效图片URL
- 验证备用图片是否显示
- 检查错误占位符

## 总结

通过使用这些优化后的图片组件，您可以：

✅ 提升页面加载性能  
✅ 改善用户体验  
✅ 减少带宽使用  
✅ 支持现代图片格式  
✅ 实现响应式图片  

选择适合您需求的组件，按照迁移指南逐步实施，您将获得显著的性能提升和更好的用户体验。
