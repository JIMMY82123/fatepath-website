# GitHub 代码上传指南

## 🚀 方法一：使用 GitHub Desktop (推荐新手)

### 1. 下载 GitHub Desktop
- 访问 [desktop.github.com](https://desktop.github.com)
- 下载并安装 GitHub Desktop

### 2. 克隆仓库
1. 打开 GitHub Desktop
2. 点击 "Clone a repository from the Internet"
3. 选择您刚创建的仓库
4. 选择本地保存路径
5. 点击 "Clone"

### 3. 复制项目文件
1. 将您的项目文件复制到克隆的文件夹中
2. 确保包含所有文件：
   - `src/` 文件夹
   - `public/` 文件夹
   - `package.json`
   - `index.html`
   - 所有配置文件

### 4. 提交和推送
1. 在 GitHub Desktop 中，您会看到所有新文件
2. 在底部填写提交信息：
       - Summary: "Initial commit - FatePath Website"
    - Description: "Professional fortune telling website with React and Vite"
3. 点击 "Commit to main"
4. 点击 "Push origin"

## 🚀 方法二：使用命令行 (推荐有经验用户)

### 1. 初始化 Git 仓库
```bash
# 在您的项目文件夹中打开终端
cd E:\compass

# 初始化 Git 仓库
git init

# 添加所有文件到暂存区
git add .

# 创建第一次提交
git commit -m "Initial commit - FatePath Website"
```

### 2. 连接远程仓库
```bash
# 添加远程仓库 (替换 YOUR_USERNAME 和 REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# 推送代码到 GitHub
git branch -M main
git push -u origin main
```

## 🚀 方法三：使用 VS Code

### 1. 打开项目
1. 在 VS Code 中打开您的项目文件夹
2. 按 `Ctrl + Shift + P` 打开命令面板
3. 输入 "Git: Initialize Repository"

### 2. 提交代码
1. 在左侧源代码管理面板中
2. 点击 "+" 号暂存所有更改
3. 输入提交信息
4. 点击 "✓" 提交

### 3. 发布到 GitHub
1. 点击 "Publish to GitHub"
2. 选择仓库名称：`fatepath-website` 和可见性
3. 确认发布

## 📋 上传前检查清单

### 1. 文件检查
- [ ] 所有源代码文件完整
- [ ] 配置文件已更新
- [ ] 图片和资源文件包含
- [ ] 文档文件完整

### 2. 敏感信息检查
- [ ] 移除任何 API 密钥
- [ ] 检查是否有个人信息泄露
- [ ] 确认 Formbold 表单 ID 安全

### 3. 忽略文件设置
确保 `.gitignore` 文件包含：
```
node_modules/
dist/
.env
.env.local
.DS_Store
*.log
```

## 🔧 上传后设置

### 1. 仓库设置
1. 在 GitHub 仓库页面
2. 点击 "Settings"
3. 设置仓库描述和标签
4. 配置分支保护规则

### 2. 部署连接
1. 连接 Vercel 或 Netlify
2. 设置自动部署
3. 配置环境变量

### 3. 文档更新
1. 更新 README.md
2. 添加项目截图
3. 完善项目描述

## 🚨 常见问题

### 文件太大
如果遇到文件大小限制：
```bash
# 使用 Git LFS 处理大文件
git lfs install
git lfs track "*.mp4"
git lfs track "*.jpg"
git lfs track "*.png"
```

### 推送失败
```bash
# 强制推送 (谨慎使用)
git push -f origin main

# 或者先拉取最新代码
git pull origin main
git push origin main
```

### 分支问题
```bash
# 创建新分支
git checkout -b feature/new-feature

# 切换分支
git checkout main

# 合并分支
git merge feature/new-feature
```

## 📞 技术支持

如果遇到问题：
1. 查看 GitHub 官方文档
2. 检查错误信息
3. 搜索 Stack Overflow
4. 联系技术支持

## ✅ 上传确认

上传成功后，确认：
- [ ] 所有文件都在 GitHub 上
- [ ] 代码可以正常构建
- [ ] 部署平台连接成功
- [ ] 网站可以正常访问 