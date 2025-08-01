# FAQ 管理指南

## 📋 概述
FAQ页面已经添加到您的网站中，包含10个常见问题，全部使用英文。您可以根据需要添加、编辑或重新组织这些问题。

## 🔧 如何编辑FAQ

### 1. 找到FAQ文件
FAQ内容位于：`src/pages/FAQ.jsx`

### 2. 编辑FAQ数据
在文件中找到 `faqData` 数组，每个FAQ项目包含：

```javascript
{
  question: "问题标题",
  answer: "问题答案（支持HTML格式）"
}
```

### 3. 添加新FAQ
在 `faqData` 数组中添加新的对象：

```javascript
{
  question: "Your new question?",
  answer: "Detailed answer content, you can use HTML tags like: <br/><br/>• <strong>Key points</strong><br/>• List items<br/>• More information"
}
```

## 📝 FAQ内容建议

### 常见问题类型
1. **服务相关**：解释各种服务的流程、时间、价格
2. **技术问题**：八字分析需要什么信息、如何准备
3. **隐私安全**：数据保护、隐私政策
4. **支付问题**：付款方式、退款政策
5. **后续支持**：咨询时间、联系方式

### 内容格式建议
- 使用 `<strong>` 标签突出重要信息
- 使用 `<br/>` 进行换行
- 使用 `•` 创建列表项
- 保持语言简洁明了
- 提供具体的行动指导

## 🎨 样式定制

### 修改FAQ样式
FAQ页面使用以下CSS类：
- `mystic-card`：卡片样式
- `font-cinzel`：标题字体
- `text-gold-400`：金色强调色
- `text-mystic-300`：正文颜色

### 动画效果
- 使用Framer Motion实现展开/收起动画
- 默认第一个问题自动展开
- 点击问题可展开/收起答案

## 📱 移动端优化
FAQ页面已针对移动端进行优化：
- 响应式布局
- 触摸友好的按钮
- 合适的字体大小
- 良好的间距

## 🔗 联系信息更新
在FAQ页面底部有联系CTA部分，请更新：
- WhatsApp链接：`https://wa.me/your-whatsapp-number`
- 邮箱地址：`chenxiao0801@hotmail.com`

## 📝 服务交付方式说明
根据您的实际服务方式，FAQ页面已更新为：
- **不包含视频咨询**：移除了视频通话相关内容
- **不包含语音咨询**：专注于文字和邮件交流
- **主要交付方式**：详细的书面分析报告
- **后续支持**：通过邮件和WhatsApp文字交流

## 📊 当前FAQ列表

### 已包含的问题：
1. What is BaZi (八字) Analysis?
2. What information do I need for BaZi analysis?
3. What can Love Compatibility Reading tell me?
4. How do talismans work?
5. Do BaZi analysis results change?
6. How long does it take to receive results?
7. Can consultations be done remotely?
8. How do you protect my privacy?
9. What if I have questions about the analysis results?
10. Is BaZi analysis accurate?

## 🚀 部署更新
编辑FAQ后：
1. 保存文件
2. 测试本地运行效果
3. 部署到服务器

## 💡 建议
- 定期更新FAQ内容
- 根据客户反馈添加新问题
- 保持答案的准确性和时效性
- 使用客户友好的语言
- 提供具体的联系方式

## 📞 技术支持
如需修改FAQ页面样式或功能，请参考：
- Framer Motion文档
- Tailwind CSS文档
- React Hooks文档 