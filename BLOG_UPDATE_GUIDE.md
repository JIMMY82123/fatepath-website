# 博客更新完整指南 - FatePath网站

## 🎯 目标
帮助您轻松更新FatePath网站的博客内容，添加新文章或修改现有文章。

## 📋 更新方法

### 方法1：添加新博客文章（推荐）

#### 步骤1：在Blog.jsx中添加文章预览
在 `src/pages/Blog.jsx` 文件的 `blogPosts` 数组中添加新文章：

```javascript
{
  id: 5, // 使用下一个可用ID
  title: "您的文章标题",
  excerpt: "文章摘要，简短描述文章内容...",
  category: "bazi-basics", // 选择分类
  categoryLabel: "Bazi Basics", // 显示的分类名称
  date: "2024-01-20", // 发布日期
  readTime: "10 min read", // 预计阅读时间
  image: "/images/blog/your-article-image.jpg", // 文章图片
  slug: "your-article-slug" // URL友好的标题
}
```

#### 步骤2：在BlogPost.jsx中添加完整文章
在 `src/pages/BlogPost.jsx` 文件的 `blogPosts` 数组中添加完整内容：

```javascript
{
  id: 5,
  title: "您的文章标题",
  excerpt: "文章摘要...",
  content: `
    <p class="mb-6 text-mystic-300 leading-relaxed">
      您的文章内容从这里开始...
    </p>

    <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">第一个小标题</h2>
    <p class="mb-6 text-mystic-300 leading-relaxed">
      段落内容...
    </p>

    <div class="mystic-card p-6 border-l-4 border-gold-500/50 mb-8">
      <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-3">重要提示：</h3>
      <p class="text-mystic-300 text-sm">
        重要信息或提示内容...
      </p>
    </div>
  `,
  category: "bazi-basics",
  categoryLabel: "Bazi Basics",
  date: "2024-01-20",
  readTime: "10 min read",
  image: "/images/blog/your-article-image.jpg",
  slug: "your-article-slug",
  author: "玄印 (Xuan Yin)",
  tags: ["标签1", "标签2", "标签3"]
}
```

### 方法2：编辑现有文章

#### 编辑文章预览（Blog.jsx）
找到要编辑的文章，修改以下字段：
- `title` - 文章标题
- `excerpt` - 文章摘要
- `date` - 发布日期
- `readTime` - 阅读时间
- `image` - 文章图片

#### 编辑完整文章（BlogPost.jsx）
找到对应的文章，修改：
- `content` - 完整的文章内容
- `tags` - 文章标签
- 其他元数据

## 🎨 文章内容格式指南

### HTML标签使用
```html
<!-- 段落 -->
<p class="mb-6 text-mystic-300 leading-relaxed">
  段落内容...
</p>

<!-- 标题 -->
<h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">标题</h2>
<h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-3">小标题</h3>

<!-- 卡片样式 -->
<div class="mystic-card p-6">
  <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-3">卡片标题</h3>
  <p class="text-mystic-300 text-sm">卡片内容...</p>
</div>

<!-- 重要提示框 -->
<div class="mystic-card p-6 border-l-4 border-gold-500/50 mb-8">
  <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-3">提示：</h3>
  <p class="text-mystic-300 text-sm">提示内容...</p>
</div>

<!-- 列表 -->
<div class="bg-gradient-to-r from-mystic-800 to-mystic-900 p-6 rounded-xl border border-gold-500/30 mb-8">
  <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-4">列表标题：</h3>
  <ul class="space-y-2 text-mystic-300">
    <li class="flex items-start space-x-3">
      <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
      <span>列表项1</span>
    </li>
    <li class="flex items-start space-x-3">
      <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
      <span>列表项2</span>
    </li>
  </ul>
</div>
```

### 可用分类
- `bazi-basics` - Bazi基础
- `love-compatibility` - 爱情配对
- `talismans` - 护身符
- `career-timing` - 职业时机

## 📸 图片设置

### 图片位置
将文章图片放在 `public/images/blog/` 目录下

### 图片命名
使用描述性的文件名，例如：
- `bazi-basics.jpg`
- `love-compatibility.jpg`
- `talisman-guide.jpg`

### 图片尺寸建议
- 文章预览图：800x600px
- 文章主图：1200x800px
- 格式：JPG或PNG

## 🏷️ 标签使用

### 推荐标签
- Bazi相关：`Bazi`, `Chinese Astrology`, `Four Pillars`, `Five Elements`
- 爱情相关：`Love`, `Relationships`, `Compatibility`, `Romance`
- 护身符相关：`Talismans`, `Protection`, `Luck`, `Energy`
- 职业相关：`Career`, `Timing`, `Success`, `Business`

## 📅 发布最佳实践

### 1. 内容质量
- 确保内容准确且有价值
- 使用清晰的结构和标题
- 包含实用的建议和指导

### 2. SEO优化
- 使用相关的关键词
- 写有吸引力的标题
- 包含内部链接到服务页面

### 3. 更新频率
- 建议每周发布1-2篇文章
- 保持内容的新鲜度和相关性

## 🚀 快速更新步骤

### 添加新文章：
1. 在 `Blog.jsx` 中添加文章预览
2. 在 `BlogPost.jsx` 中添加完整内容
3. 准备文章图片
4. 测试文章显示

### 编辑现有文章：
1. 找到要编辑的文章
2. 修改相应的字段
3. 保存并测试

## 📞 技术支持

如果在更新过程中遇到问题：
1. 检查HTML语法是否正确
2. 确保图片路径正确
3. 验证slug的唯一性
4. 测试文章链接是否正常工作

## ⏱️ 预期时间

- **添加新文章**：30-60分钟
- **编辑现有文章**：15-30分钟
- **图片准备**：10-20分钟

记住：优质的内容是吸引客户的关键！ 