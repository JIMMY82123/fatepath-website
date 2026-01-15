@echo off
chcp 65001 >nul
echo ========================================
echo 正在启动开发服务器...
echo ========================================
cd /d %~dp0
echo.
echo 当前目录: %CD%
echo.
echo 正在运行: npm run dev
echo.
echo 请等待服务器启动...
echo 启动成功后，浏览器会自动打开
echo 如果没有自动打开，请手动访问: http://localhost:3000
echo.
echo 按 Ctrl+C 可以停止服务器
echo ========================================
echo.
npm run dev
pause
















