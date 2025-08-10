# AI图像生成工具使用指南

## 概述

本项目包含了一套完整的AI图像生成工具，专门用于生成道教仪式、传统文化场景等图像。主要功能包括：

- 🎨 **"打小人"仪式图像生成** - 可爱的chibi风格道教仪式场景
- 🏮 **道教仪式图像生成** - 财富、爱情、保护、治愈等仪式场景
- 🖼️ **批量图像生成** - 同时生成多张图像
- 🔄 **队列管理** - 智能管理图像生成任务
- ✨ **自定义图像生成** - 支持自定义提示词和参数

## 文件结构

```
src/utils/
├── advancedImageGenerator.js    # 核心AI图像生成工具
├── imageGenerationExamples.js   # 使用示例和演示
└── aiAvatarGenerator.js         # 原有的头像生成工具
```

## 快速开始

### 1. 生成"打小人"仪式图像

```javascript
import { generateDaXiaoRenImage } from './utils/advancedImageGenerator.js'

// 基本使用
const result = await generateDaXiaoRenImage()

// 自定义参数
const result = await generateDaXiaoRenImage({
  size: "1024x1024",
  style: "chibi",
  mood: "cheerful",
  resolution: "4K"
})
```

### 2. 生成道教仪式图像

```javascript
import { generateTaoistRitualImage } from './utils/advancedImageGenerator.js'

// 生成财富仪式图像
const wealthImage = await generateTaoistRitualImage('wealth', {
  size: "1024x1024",
  style: "traditional",
  mood: "prosperous"
})

// 可用的仪式类型
const ritualTypes = ['wealth', 'love', 'protection', 'healing']
```

### 3. 批量生成图像

```javascript
import { generateBatchImages } from './utils/advancedImageGenerator.js'

const prompts = [
  "A beautiful Chinese garden with cherry blossoms",
  "A mystical Taoist temple in the mountains",
  "Traditional Chinese calligraphy with ink and brush"
]

const results = await generateBatchImages(prompts, {
  size: "1024x1024",
  batchSize: 3
})
```

### 4. 使用队列管理器

```javascript
import { imageGenerationManager } from './utils/advancedImageGenerator.js'

// 添加任务到队列
imageGenerationManager.addToQueue(() => 
  generateDaXiaoRenImage({ style: "chibi" })
)

// 检查队列状态
const status = imageGenerationManager.getQueueStatus()
console.log(status) // { queueLength: 1, isProcessing: false, maxConcurrent: 2 }
```

## 详细参数说明

### generateDaXiaoRenImage 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `size` | string | "1024x1024" | 图像尺寸 |
| `style` | string | "chibi" | 图像风格 (chibi, realistic, cartoon) |
| `mood` | string | "cheerful" | 情绪/表情 (cheerful, serious, playful) |
| `resolution` | string | "4K" | 图像分辨率 |

### generateTaoistRitualImage 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `ritualType` | string | - | 仪式类型 (wealth, love, protection, healing) |
| `size` | string | "1024x1024" | 图像尺寸 |
| `style` | string | "traditional" | 图像风格 |
| `mood` | string | "serene" | 情绪氛围 |

### generateCustomImage 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `prompt` | string | - | 自定义提示词 |
| `size` | string | "1024x1024" | 图像尺寸 |
| `style` | string | "realistic" | 图像风格 |
| `quality` | string | "high" | 图像质量 |

## 使用示例

### 完整工作流程示例

```javascript
import { completeImageGenerationWorkflow } from './utils/imageGenerationExamples.js'

// 执行完整的图像生成流程
const allResults = await completeImageGenerationWorkflow()
console.log('所有图像生成完成:', allResults)
```

### 错误处理

```javascript
try {
  const result = await generateDaXiaoRenImage()
  console.log('图像生成成功:', result.imageUrl)
} catch (error) {
  console.error('图像生成失败:', error.message)
  // 处理错误，例如显示用户友好的错误信息
}
```

## 配置说明

### 支持的图像尺寸

- `512x512` - 小尺寸，适合头像
- `1024x1024` - 标准尺寸，适合社交媒体
- `1024x1792` - 竖版尺寸，适合手机壁纸
- `1792x1024` - 横版尺寸，适合桌面壁纸

### 图像风格选项

- `chibi` - 可爱的Q版风格
- `realistic` - 写实风格
- `cartoon` - 卡通风格
- `traditional` - 传统水墨画风格
- `modern` - 现代风格
- `minimalist` - 极简风格

## 注意事项

1. **API集成**: 当前版本使用模拟响应，实际使用时需要集成真实的AI图像生成API
2. **错误处理**: 所有函数都包含完整的错误处理机制
3. **性能优化**: 队列管理器可以控制并发数量，避免API限制
4. **缓存策略**: 建议实现图像缓存机制，避免重复生成

## 扩展功能

### 添加新的AI服务

```javascript
// 在 IMAGE_GENERATION_SERVICES 中添加新服务
const IMAGE_GENERATION_SERVICES = {
  openai: {
    name: 'OpenAI DALL-E',
    apiEndpoint: 'https://api.openai.com/v1/images/generations',
    supportedSizes: ['256x256', '512x512', '1024x1024']
  },
  stability: {
    name: 'Stability AI',
    apiEndpoint: 'https://api.stability.ai/v1/generation',
    supportedSizes: ['512x512', '768x768', '1024x1024']
  }
}
```

### 自定义提示词模板

```javascript
// 添加新的提示词模板
const customPrompts = {
  'zen_garden': 'A peaceful Zen garden with raked sand, stones, and minimal vegetation',
  'tea_ceremony': 'An elegant traditional Chinese tea ceremony with beautiful teaware',
  'calligraphy': 'Traditional Chinese calligraphy with flowing brush strokes and ink'
}
```

## 技术支持

如果您在使用过程中遇到问题，请：

1. 检查控制台错误信息
2. 确认所有依赖已正确安装
3. 验证API配置是否正确
4. 查看示例代码作为参考

## 更新日志

- **v1.0.0** - 初始版本，包含基本的图像生成功能
- **v1.1.0** - 添加队列管理和批量生成功能
- **v1.2.0** - 优化错误处理和参数配置

---

*本工具专为道教文化网站设计，支持生成各种传统文化场景图像。*
