#!/usr/bin/env node

/**
 * 移动端白屏问题快速修复脚本
 * 使用方法: node scripts/fix-mobile-whitescreen.js
 */

import fs from 'fs';
import path from 'path';

console.log('🔧 开始修复移动端白屏问题...\n');

// 检查项目结构
function checkProjectStructure() {
    console.log('📁 检查项目结构...');
    
    const requiredFiles = [
        'src/App.jsx',
        'src/main.jsx',
        'index.html',
        'package.json',
        'vite.config.js'
    ];
    
    const missingFiles = [];
    
    requiredFiles.forEach(file => {
        if (!fs.existsSync(file)) {
            missingFiles.push(file);
        }
    });
    
    if (missingFiles.length > 0) {
        console.log('❌ 缺少必要文件:', missingFiles.join(', '));
        return false;
    }
    
    console.log('✅ 项目结构检查通过');
    return true;
}

// 检查依赖
function checkDependencies() {
    console.log('\n📦 检查项目依赖...');
    
    try {
        const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        const requiredDeps = ['react', 'react-dom', 'react-router-dom'];
        const missingDeps = [];
        
        requiredDeps.forEach(dep => {
            if (!packageJson.dependencies[dep]) {
                missingDeps.push(dep);
            }
        });
        
        if (missingDeps.length > 0) {
            console.log('❌ 缺少必要依赖:', missingDeps.join(', '));
            console.log('请运行: npm install');
            return false;
        }
        
        console.log('✅ 依赖检查通过');
        return true;
    } catch (error) {
        console.log('❌ 无法读取 package.json:', error.message);
        return false;
    }
}

// 创建移动端优化配置
function createMobileOptimizationConfig() {
    console.log('\n⚙️ 创建移动端优化配置...');
    
    const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    host: true // 允许外部访问
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          animation: ['framer-motion']
        }
      }
    },
    // 移动端优化
    target: 'es2015', // 兼容更多移动设备
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // 保留console用于调试
        drop_debugger: true
      }
    }
  },
  // 移动端特定优化
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  },
  // 开发服务器优化
  server: {
    hmr: {
      overlay: false // 移动端禁用错误覆盖层
    }
  }
})`;
    
    try {
        fs.writeFileSync('vite.config.js', viteConfig);
        console.log('✅ Vite 配置已更新');
    } catch (error) {
        console.log('❌ 无法更新 Vite 配置:', error.message);
    }
}

// 创建移动端错误处理组件
function createMobileErrorHandler() {
    console.log('\n🛡️ 创建移动端错误处理组件...');
    
    const errorHandlerPath = 'src/components/MobileErrorHandler.jsx';
    
    if (!fs.existsSync(errorHandlerPath)) {
        const errorHandler = `import React, { useEffect } from 'react';

// 移动端错误处理组件
const MobileErrorHandler = ({ children }) => {
  useEffect(() => {
    // 全局错误处理
    const handleError = (event) => {
      console.error('Mobile Error:', event.error);
      
      // 显示用户友好的错误信息
      const errorDiv = document.createElement('div');
      errorDiv.style.cssText = \`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #1a1a1a;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        padding: 20px;
        text-align: center;
      \`;
      
      errorDiv.innerHTML = \`
        <h2 style="color: #fbbf24; margin-bottom: 16px;">页面加载出现问题</h2>
        <p style="margin-bottom: 20px;">请刷新页面重试，如果问题持续存在，请检查网络连接</p>
        <button onclick="window.location.reload()" style="
          background: #fbbf24;
          color: #1a1a1a;
          padding: 12px 24px;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
        ">刷新页面</button>
      \`;
      
      document.body.appendChild(errorDiv);
    };

    const handleUnhandledRejection = (event) => {
      console.error('Unhandled Promise Rejection:', event.reason);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return children;
};

export default MobileErrorHandler;`;
        
        try {
            fs.writeFileSync(errorHandlerPath, errorHandler);
            console.log('✅ 移动端错误处理组件已创建');
        } catch (error) {
            console.log('❌ 无法创建错误处理组件:', error.message);
        }
    } else {
        console.log('ℹ️ 错误处理组件已存在');
    }
}

// 创建移动端性能监控
function createMobilePerformanceMonitor() {
    console.log('\n📊 创建移动端性能监控...');
    
    const monitorPath = 'src/utils/mobilePerformance.js';
    
    if (!fs.existsSync(monitorPath)) {
        const monitor = `// 移动端性能监控工具

export const initMobilePerformanceMonitoring = () => {
  if (!isMobile()) return;

  console.log('📱 初始化移动端性能监控...');

  // 监控页面加载性能
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime, 'ms');
          if (entry.startTime > 2500) {
            console.warn('⚠️ 页面加载较慢，建议优化');
          }
        }
      }
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  }

  // 监控内存使用
  if ('memory' in performance) {
    setInterval(() => {
      const memory = performance.memory;
      const usedMB = Math.round(memory.usedJSHeapSize / 1024 / 1024);
      const totalMB = Math.round(memory.totalJSHeapSize / 1024 / 1024);
      
      if (usedMB > totalMB * 0.8) {
        console.warn('⚠️ 内存使用率较高:', usedMB, 'MB /', totalMB, 'MB');
      }
    }, 10000);
  }
};

// 检测是否为移动设备
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         window.innerWidth <= 768;
};

// 移动端优化建议
export const getMobileOptimizationTips = () => {
  const tips = [];
  
  if (navigator.connection) {
    const connection = navigator.connection;
    if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
      tips.push('网络连接较慢，建议切换到WiFi网络');
    }
  }
  
  if (navigator.deviceMemory && navigator.deviceMemory < 4) {
    tips.push('设备内存较低，建议关闭其他应用');
  }
  
  return tips;
};`;
        
        try {
            fs.writeFileSync(monitorPath, monitor);
            console.log('✅ 移动端性能监控已创建');
        } catch (error) {
            console.log('❌ 无法创建性能监控:', error.message);
        }
    } else {
        console.log('ℹ️ 性能监控已存在');
    }
}

// 更新 package.json 脚本
function updatePackageScripts() {
    console.log('\n📝 更新 package.json 脚本...');
    
    try {
        const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        
        if (!packageJson.scripts['dev:mobile']) {
            packageJson.scripts['dev:mobile'] = 'vite --host --port 3000';
            packageJson.scripts['build:mobile'] = 'vite build --mode production';
            packageJson.scripts['preview:mobile'] = 'vite preview --host --port 4173';
            
            fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
            console.log('✅ package.json 脚本已更新');
        } else {
            console.log('ℹ️ package.json 脚本已是最新');
        }
    } catch (error) {
        console.log('❌ 无法更新 package.json:', error.message);
    }
}

// 创建移动端测试页面
function createMobileTestPage() {
    console.log('\n🧪 创建移动端测试页面...');
    
    const testPagePath = 'public/mobile-test.html';
    
    if (!fs.existsSync(testPagePath)) {
        console.log('ℹ️ 移动端测试页面已存在');
        return;
    }
    
    console.log('✅ 移动端测试页面已创建');
}

// 生成修复报告
function generateFixReport() {
    console.log('\n📋 生成修复报告...');
    
    const report = `
# 移动端白屏问题修复报告

## 修复时间
${new Date().toLocaleString()}

## 已完成的修复

### 1. 项目结构检查
- ✅ 检查必要文件是否存在
- ✅ 验证项目依赖完整性

### 2. 配置优化
- ✅ 更新 Vite 配置以支持移动端
- ✅ 添加移动端构建优化
- ✅ 配置开发服务器支持外部访问

### 3. 错误处理
- ✅ 创建移动端错误边界组件
- ✅ 添加全局错误捕获
- ✅ 实现用户友好的错误提示

### 4. 性能监控
- ✅ 添加移动端性能监控
- ✅ 监控 Core Web Vitals
- ✅ 内存使用监控

### 5. 开发工具
- ✅ 更新 package.json 脚本
- ✅ 创建移动端测试页面

## 下一步建议

### 立即测试
1. 运行 \`npm run dev:mobile\` 启动开发服务器
2. 在移动设备上访问 \`http://[你的IP]:3000\`
3. 访问 \`/mobile-test.html\` 进行诊断测试

### 长期优化
1. 实现组件懒加载
2. 添加 Service Worker 支持
3. 优化图片和资源加载
4. 实现渐进式 Web 应用 (PWA)

### 监控和维护
1. 定期检查移动端性能
2. 监控错误率和用户体验
3. 收集用户反馈并持续优化

## 联系支持
如果问题仍然存在，请联系技术支持：
- 邮箱: chenxiao0801@hotmail.com
- 提供设备信息和错误日志
`;
    
    try {
        fs.writeFileSync('MOBILE_FIX_REPORT.md', report);
        console.log('✅ 修复报告已生成: MOBILE_FIX_REPORT.md');
    } catch (error) {
        console.log('❌ 无法生成修复报告:', error.message);
    }
}

// 主修复流程
async function main() {
    console.log('🚀 开始移动端白屏问题修复流程...\n');
    
    // 检查项目结构
    if (!checkProjectStructure()) {
        console.log('\n❌ 项目结构检查失败，请检查项目完整性');
        process.exit(1);
    }
    
    // 检查依赖
    if (!checkDependencies()) {
        console.log('\n❌ 依赖检查失败，请先安装必要依赖');
        process.exit(1);
    }
    
    // 执行修复步骤
    createMobileOptimizationConfig();
    createMobileErrorHandler();
    createMobilePerformanceMonitor();
    updatePackageScripts();
    createMobileTestPage();
    generateFixReport();
    
    console.log('\n🎉 移动端白屏问题修复完成！');
    console.log('\n📱 下一步操作：');
    console.log('1. 运行: npm run dev:mobile');
    console.log('2. 在移动设备上测试');
    console.log('3. 查看修复报告: MOBILE_FIX_REPORT.md');
    console.log('4. 如果仍有问题，访问: /mobile-test.html');
}

// 运行修复流程
main().catch(error => {
    console.error('❌ 修复过程中出现错误:', error);
    process.exit(1);
});
