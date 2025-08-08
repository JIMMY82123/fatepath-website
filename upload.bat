@echo off
echo 正在上传到GitHub...
git add .
git commit -m "实现智能头像分配系统 - 前3个真实头像+AI生成头像"
git push
echo 上传完成！
pause
