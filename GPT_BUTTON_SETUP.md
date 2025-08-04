# GPT按钮设置指南

## 功能概述

你的网站现在已经集成了GPT链接按钮，用户可以通过以下方式访问AI聊天工具：

1. **导航栏下拉菜单** - 桌面版本显示"AI Tools"下拉菜单
2. **移动端按钮** - 移动设备上显示简单的"AI Chat"按钮
3. **页脚链接** - 在Quick Links和社交媒体图标区域都有GPT链接

## 支持的AI工具

目前配置了以下AI聊天工具：

- **FatePath GPT** - 你的专属BaZi Destiny Decoder GPT (主要推荐)
- **ChatGPT** - OpenAI的聊天机器人
- **Claude** - Anthropic的AI助手
- **Gemini** - Google的AI模型

## 自定义配置

### 1. 修改AI工具链接

编辑 `src/config/externalLinks.js` 文件：

```javascript
export const externalLinks = {
  gpt: {
    fatePathGPT: 'https://chatgpt.com/g/g-6890abd2192c8191a10cfac74695c42c-fatepath-bazi-destiny-decoder', // 你的专属GPT
    chatGPT: 'https://chat.openai.com/',  // 修改为你的ChatGPT链接
    claude: 'https://claude.ai/',         // 修改为你的Claude链接
    gemini: 'https://gemini.google.com/', // 修改为你的Gemini链接
    // 添加更多AI工具
    yourCustomAI: 'https://your-ai-tool.com/',
  },
  // ... 其他配置
}
```

### 2. 添加新的AI工具

在 `src/components/GPTButton.jsx` 中的 `aiTools` 数组添加新工具：

```javascript
const aiTools = [
  // ... 现有工具
  {
    name: '你的AI工具',
    icon: <YourIcon className="h-4 w-4" />,
    link: getGPTLink('yourCustomAI'),
    color: 'from-purple-500 to-purple-600',
    hoverColor: 'from-purple-400 to-purple-500',
    description: '工具描述' // 可选
  }
]
```

### 3. 修改按钮样式

GPTButton组件支持多种样式变体：

- `default` - 默认金色按钮 (FatePath主题色)
- `mobile` - 移动端全宽按钮
- `footer` - 页脚链接样式
- `icon` - 图标样式
- `dropdown` - 下拉菜单样式

### 4. 更改默认AI工具

在 `src/components/GPTButton.jsx` 中修改默认工具：

```javascript
// 简单按钮版本默认使用FatePath GPT
<button onClick={() => handleToolClick(getGPTLink('fatePathGPT'))}>
```

## 使用示例

### 在其他组件中使用GPT按钮

```javascript
import GPTButton from './components/GPTButton'

// 简单按钮
<GPTButton variant="default" />

// 下拉菜单
<GPTButton variant="dropdown" />

// 自定义样式
<GPTButton variant="footer" className="my-custom-class" />
```

## 技术特性

- **响应式设计** - 在不同设备上都有合适的显示
- **动画效果** - 使用Framer Motion提供流畅的交互
- **可访问性** - 支持键盘导航和屏幕阅读器
- **点击外部关闭** - 下拉菜单支持点击外部区域关闭
- **配置化管理** - 所有链接都集中在配置文件中
- **品牌一致性** - 使用金色主题色与FatePath品牌保持一致

## 特殊功能

### FatePath GPT 特色

- **专属图标** - 使用Sparkles图标，与网站logo保持一致
- **金色主题** - 使用金色渐变，突出品牌特色
- **描述信息** - 显示"BaZi Destiny Decoder"说明
- **优先位置** - 在下拉菜单中排在第一位

## 注意事项

1. 确保所有AI工具链接都是有效的
2. 测试在不同浏览器和设备上的兼容性
3. 考虑添加用户偏好设置，记住用户最后选择的AI工具
4. 可以添加使用统计来了解用户偏好
5. FatePath GPT链接需要确保用户已登录ChatGPT账户

## 下一步优化建议

1. **用户偏好记忆** - 使用localStorage记住用户选择的AI工具
2. **使用统计** - 添加Google Analytics跟踪AI工具使用情况
3. **自定义提示** - 为FatePath GPT添加预设的八字相关问题
4. **快速访问** - 添加快捷键支持
5. **多语言支持** - 根据用户语言显示不同的AI工具名称
6. **GPT状态检查** - 检查用户是否已登录ChatGPT 