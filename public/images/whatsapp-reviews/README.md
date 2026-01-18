# WhatsApp Reviews Images

## 如何添加WhatsApp对话截图

1. 将您的WhatsApp对话截图放入此目录
2. 命名格式：`whatsapp-review-1.jpg`, `whatsapp-review-2.jpg`, `whatsapp-review-3.jpg` 等
3. 支持的格式：JPG, PNG
4. 建议图片尺寸：宽度800-1200px，保持原始比例

## 更新代码

添加图片后，需要在 `src/pages/Testimonials.jsx` 文件中更新 `whatsappReviews` 数组：

```javascript
const whatsappReviews = [
  { id: 1, image: "/images/whatsapp-reviews/whatsapp-review-1.jpg" },
  { id: 2, image: "/images/whatsapp-reviews/whatsapp-review-2.jpg" },
  { id: 3, image: "/images/whatsapp-reviews/whatsapp-review-3.jpg" },
  // ... 添加更多
]
```

## 注意事项

- 确保图片文件名与代码中的路径匹配
- 建议压缩图片以优化加载速度
- 保护客户隐私，确保截图已获得使用许可
