@echo off
echo 修复Git配置...
git config --global core.pager ""
git config --global pager.branch false
git config --global pager.log false
git config --global pager.show false
git config --global pager.diff false

echo 上传到GitHub...
git add .
git commit -m "实现智能头像分配系统 - 前3个真实头像+AI生成头像"
git push

echo 完成！
pause

