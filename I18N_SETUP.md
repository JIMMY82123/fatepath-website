# 多语言支持设置指南

## 📦 安装依赖

在项目根目录运行：

```bash
npm install i18next react-i18next i18next-browser-languagedetector
```

## 🌍 支持的语言

- **English (en)** - 英文
- **中文 (zh)** - 简体中文

## 📁 文件结构

```
src/
├── i18n/
│   ├── config.js          # i18n 配置文件
│   └── locales/
│       ├── en.json        # 英文翻译
│       └── zh.json        # 中文翻译
└── components/
    └── LanguageSwitcher.jsx  # 语言切换组件
```

## 🔧 使用方法

### 在组件中使用翻译

```jsx
import { useTranslation } from 'react-i18next'

function MyComponent() {
  const { t } = useTranslation()
  
  return (
    <div>
      <h1>{t('common.home')}</h1>
      <p>{t('bazi.dayMaster')}</p>
    </div>
  )
}
```

### 切换语言

语言切换器已添加到导航栏，用户可以通过点击地球图标切换语言。

## 📝 专业术语翻译

所有 Bazi/八字 相关术语都已正确翻译：

### 英文 → 中文
- BaZi → 八字
- Four Pillars → 四柱
- Day Master → 日主
- Heavenly Stem → 天干
- Earthly Branch → 地支
- Five Elements → 五行
- Ten Gods → 十神
- True Solar Time → 真太阳时
- Direct Wealth (正财) → 正财
- Indirect Wealth (偏财) → 偏财
- Direct Officer (正官) → 正官
- Indirect Officer (七杀) → 七杀
- Direct Resource (正印) → 正印
- Indirect Resource (偏印) → 偏印
- Friend (比肩) → 比肩
- Rob Wealth (劫财) → 劫财
- Food God (食神) → 食神
- Hurt Officer (伤官) → 伤官

## 🎯 下一步

1. 在所有页面组件中添加 `useTranslation` hook
2. 将所有硬编码的文本替换为 `t()` 函数调用
3. 在翻译文件中添加缺失的翻译键
4. 测试所有页面的多语言切换功能

## 📚 参考文档

- [i18next 文档](https://www.i18next.com/)
- [react-i18next 文档](https://react.i18next.com/)
