# PayPal链接更新指南

## 需要更新的文件
`src/pages/FreeBaziReport.jsx`

## 当前设置
```javascript
const paypalLink = "https://www.paypal.com/paypalme/YOUR_USERNAME/30"
```

## 更新步骤
1. 将 `YOUR_USERNAME` 替换为您的PayPal用户名
2. 例如：如果您的PayPal用户名是 `mysticmaster`，则链接应该是：
   ```javascript
   const paypalLink = "https://www.paypal.com/paypalme/mysticmaster/30"
   ```

## 如何找到您的PayPal用户名
1. 登录您的PayPal账户
2. 访问 https://www.paypal.com/paypalme/
3. 您的用户名会显示在页面上
4. 或者您可以在PayPal设置中查看您的PayPal.me链接

## 测试
更新后，请测试：
1. 点击"Get Special Offer Now"按钮
2. 确认PayPal链接正确打开
3. 确认价格显示为$30

## 注意事项
- 确保您的PayPal账户已激活
- 确保您已设置PayPal.me链接
- 价格在链接中设置为$30，与页面显示一致 