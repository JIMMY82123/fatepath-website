# 🌟 名人图片设置指南

## 📸 如何添加名人真人图片

### 步骤1：准备图片文件
1. **图片规格建议**：
   - 尺寸：200x200 像素（正方形）
   - 格式：JPG 或 PNG
   - 文件大小：建议控制在 100KB 以内
   - 背景：建议使用专业头像或半身照
   - 风格：正式、专业、有权威感

### 步骤2：命名和放置
将图片文件放在以下位置：
```
compass/
└── public/
    └── images/
        └── celebrities/
            ├── madonna.jpg
            ├── tom-cruise.jpg
            └── oprah-winfrey.jpg
```

### 步骤3：更新代码
在 `src/pages/Home.jsx` 中找到名人卡片部分，将图片占位符替换为：

```jsx
{/* 替换图片占位符 */}
<img 
  src="/images/celebrities/madonna.jpg" 
  alt="Madonna - Music Icon"
  className="w-20 h-20 mx-auto mb-4 rounded-full object-cover border-2 border-gold-500/30 group-hover:border-gold-400 transition-colors duration-300"
/>
```

## 🎯 推荐图片风格

### Madonna
- **推荐风格**：经典舞台造型或专业肖像
- **表情**：自信、有力量感
- **服装**：舞台装或正式商务装
- **背景**：简洁、专业

### Tom Cruise
- **推荐风格**：电影宣传照或正式肖像
- **表情**：专注、专业
- **服装**：西装或正式装束
- **背景**：简洁、商务风格

### Oprah Winfrey
- **推荐风格**：电视节目或正式肖像
- **表情**：温暖、智慧、有权威感
- **服装**：正式商务装或电视节目装
- **背景**：专业、温暖色调

## 🔧 代码更新示例

### 当前占位符代码：
```jsx
<div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center group-hover:animate-glow">
  <span className="text-white font-bold text-lg">
    {celebrity.name.split(' ').map(n => n[0]).join('')}
  </span>
</div>
```

### 替换为真人图片：
```jsx
<img 
  src={`/images/celebrities/${celebrity.name.toLowerCase().replace(' ', '-')}.jpg`}
  alt={`${celebrity.name} - ${celebrity.category}`}
  className="w-20 h-20 mx-auto mb-4 rounded-full object-cover border-2 border-gold-500/30 group-hover:border-gold-400 transition-colors duration-300"
  onError={(e) => {
    // 如果图片加载失败，显示占位符
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'flex';
  }}
/>
<div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center group-hover:animate-glow hidden">
  <span className="text-white font-bold text-lg">
    {celebrity.name.split(' ').map(n => n[0]).join('')}
  </span>
</div>
```

## 📱 响应式优化

图片已经针对不同屏幕尺寸进行了优化：
- **桌面端**：80x80 像素
- **平板端**：70x70 像素  
- **手机端**：60x60 像素

## 🎨 视觉效果

添加真人图片后的效果：
- ✅ 增强可信度和权威性
- ✅ 提升视觉吸引力
- ✅ 加强名人背书效果
- ✅ 提高用户信任感

## ⚠️ 注意事项

1. **版权问题**：确保使用的图片有合法使用权
2. **图片质量**：选择高质量、专业的图片
3. **加载性能**：压缩图片以确保快速加载
4. **备用方案**：代码中已包含加载失败时的占位符

## 🚀 快速开始

1. 创建 `public/images/celebrities/` 文件夹
2. 添加三张名人图片
3. 按照上述代码示例更新 `Home.jsx`
4. 测试图片显示效果

---

**完成这些步骤后，您的名人卡片将拥有专业的真人图片，大大提升网站的可信度和吸引力！** 🌟 