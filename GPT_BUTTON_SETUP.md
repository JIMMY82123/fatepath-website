# GPT按钮设置指南

## 功能概述

你的网站现在已经集成了GPT链接按钮，用户可以通过以下方式访问你的专属AI聊天工具：

1. **导航栏按钮** - 桌面版本显示"AI Chat"按钮
2. **移动端按钮** - 移动设备上显示简单的"AI Chat"按钮
3. **页脚链接** - 在Quick Links和社交媒体图标区域都有GPT链接

## 支持的AI工具

目前只配置了你的专属AI聊天工具：

- **FatePath GPT** - 你的专属BaZi Destiny Decoder GPT

## 自定义配置

### 1. 修改GPT链接

编辑 `src/config/externalLinks.js` 文件：

```javascript
export const externalLinks = {
  gpt: {
    fatePathGPT: 'https://chatgpt.com/g/g-6890abd2192c8191a10cfac74695c42c-fatepath-bazi-destiny-decoder', // 你的专属GPT
  },
  // ... 其他配置
}
```

### 2. 修改按钮样式

GPTButton组件支持多种样式变体：

- `default` - 默认金色按钮 (FatePath主题色)
- `mobile` - 移动端全宽按钮
- `footer` - 页脚链接样式
- `icon` - 图标样式

### 3. 更改默认GPT工具

在 `src/components/GPTButton.jsx` 中修改默认工具：

```javascript
// 按钮直接使用FatePath GPT
<button onClick={() => handleGPTClick()}>
```

## 使用示例

### 在其他组件中使用GPT按钮

```javascript
import GPTButton from './components/GPTButton'

// 简单按钮
<GPTButton variant="default" />

// 自定义样式
<GPTButton variant="footer" className="my-custom-class" />
```

## 技术特性

- **响应式设计** - 在不同设备上都有合适的显示
- **动画效果** - 使用Framer Motion提供流畅的交互
- **可访问性** - 支持键盘导航和屏幕阅读器
- **配置化管理** - 所有链接都集中在配置文件中
- **品牌一致性** - 使用金色主题色与FatePath品牌保持一致

## 特殊功能

### FatePath GPT 特色

- **专属图标** - 使用Sparkles图标，与网站logo保持一致
- **金色主题** - 使用金色渐变，突出品牌特色
- **直接访问** - 点击即可直接访问你的专属GPT

## 注意事项

1. 确保GPT链接是有效的
2. 测试在不同浏览器和设备上的兼容性
3. 可以添加使用统计来了解用户使用情况
4. FatePath GPT链接需要确保用户已登录ChatGPT账户

## 下一步优化建议

1. **使用统计** - 添加Google Analytics跟踪GPT使用情况
2. **自定义提示** - 为FatePath GPT添加预设的八字相关问题
3. **快速访问** - 添加快捷键支持
4. **多语言支持** - 根据用户语言显示不同的按钮文本
5. **GPT状态检查** - 检查用户是否已登录ChatGPT 