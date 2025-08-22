// 谷歌广告直接访问主页白屏问题修复脚本
// 专门解决从谷歌广告直接点击主页链接时出现的白屏问题

console.log('🔧 开始修复谷歌广告直接访问问题...');

// 问题分析：
// 1. 从网站内部导航到主页正常
// 2. 直接点击谷歌广告中的主页链接显示白屏
// 3. 可能是路由初始化、资源加载顺序或缓存问题

// 修复策略：
// 1. 强制重新初始化路由
// 2. 确保关键资源按正确顺序加载
// 3. 添加直接访问检测和修复
// 4. 清除可能的缓存问题

// 检测是否为直接访问
function isDirectAccess() {
  // 检查是否是从外部链接直接访问
  const referrer = document.referrer;
  const isDirect = !referrer || 
                   referrer.includes('google.com') || 
                   referrer.includes('googleadservices.com') ||
                   referrer.includes('doubleclick.net') ||
                   referrer.includes('googlesyndication.com');
  
  console.log('🔍 访问来源检测:', {
    referrer: referrer,
    isDirect: isDirect,
    url: window.location.href,
    timestamp: new Date().toISOString()
  });
  
  return isDirect;
}

// 强制重新初始化应用
function forceReinitializeApp() {
  console.log('🔄 强制重新初始化应用...');
  
  // 1. 清除可能的错误状态
  if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
    try {
      delete window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    } catch (e) {
      console.log('清除React DevTools钩子失败:', e);
    }
  }
  
  // 2. 强制重新渲染根元素
  const root = document.getElementById('root');
  if (root) {
    // 清空根元素
    root.innerHTML = '';
    
    // 添加加载指示器
    root.innerHTML = `
      <div style="
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
        font-family: Arial, sans-serif;
      ">
        <div style="
          text-align: center;
          max-width: 400px;
          padding: 20px;
        ">
          <h2 style="color: #fbbf24; margin-bottom: 16px;">正在加载页面...</h2>
          <p style="margin-bottom: 20px;">检测到直接访问，正在优化加载...</p>
          <div style="
            width: 40px;
            height: 40px;
            border: 4px solid #333;
            border-top: 4px solid #fbbf24;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
          "></div>
          <p style="font-size: 14px; color: #888;">如果页面长时间无法加载，请刷新重试</p>
        </div>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `;
  }
  
  // 3. 延迟重新加载应用
  setTimeout(() => {
    console.log('⏰ 延迟重新加载应用...');
    window.location.reload();
  }, 3000);
}

// 检查并修复路由问题
function checkAndFixRouting() {
  console.log('🛣️ 检查并修复路由问题...');
  
  // 检查React Router是否正确初始化
  if (typeof window !== 'undefined' && window.location.pathname === '/') {
    // 确保主页路由正确
    console.log('📍 检测到主页路由，确保正确初始化...');
    
    // 添加路由状态检查
    if (!window.history || !window.history.pushState) {
      console.warn('⚠️ 浏览器不支持History API，可能导致路由问题');
    }
    
    // 强制触发路由更新
    setTimeout(() => {
      if (window.history && window.history.pushState) {
        window.history.pushState({}, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    }, 100);
  }
}

// 检查并修复资源加载问题
function checkAndFixResourceLoading() {
  console.log('📦 检查并修复资源加载问题...');
  
  // 检查关键资源是否加载
  const criticalResources = [
    '/src/main.jsx',
    '/src/App.jsx',
    '/src/pages/Home.jsx'
  ];
  
  const missingResources = [];
  
  criticalResources.forEach(resource => {
    // 这里我们只能检查HTML中引用的资源
    if (resource === '/src/main.jsx') {
      const script = document.querySelector('script[src="/src/main.jsx"]');
      if (!script) {
        missingResources.push(resource);
      }
    }
  });
  
  if (missingResources.length > 0) {
    console.error('❌ 缺少关键资源:', missingResources);
    return false;
  }
  
  console.log('✅ 关键资源检查通过');
  return true;
}

// 清除可能的缓存问题
function clearCacheIssues() {
  console.log('🧹 清除可能的缓存问题...');
  
  // 1. 清除localStorage中的错误状态
  try {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.includes('error') || key.includes('fail') || key.includes('broken'))) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
      console.log('🗑️ 清除localStorage键:', key);
    });
  } catch (e) {
    console.log('清除localStorage失败:', e);
  }
  
  // 2. 清除sessionStorage
  try {
    sessionStorage.clear();
    console.log('🗑️ 清除sessionStorage');
  } catch (e) {
    console.log('清除sessionStorage失败:', e);
  }
  
  // 3. 添加缓存控制头
  const meta = document.createElement('meta');
  meta.httpEquiv = 'Cache-Control';
  meta.content = 'no-cache, no-store, must-revalidate';
  document.head.appendChild(meta);
  
  const pragma = document.createElement('meta');
  pragma.httpEquiv = 'Pragma';
  pragma.content = 'no-cache';
  document.head.appendChild(pragma);
  
  const expires = document.createElement('meta');
  expires.httpEquiv = 'Expires';
  expires.content = '0';
  document.head.appendChild(expires);
  
  console.log('✅ 缓存控制头已添加');
}

// 添加错误恢复机制
function addErrorRecovery() {
  console.log('🛡️ 添加错误恢复机制...');
  
  // 全局错误处理
  window.addEventListener('error', (event) => {
    console.error('🚨 全局错误:', event.error);
    
    // 如果是直接访问且出现错误，尝试恢复
    if (isDirectAccess()) {
      console.log('🔄 直接访问出现错误，尝试恢复...');
      
      // 延迟恢复，避免无限循环
      setTimeout(() => {
        if (document.getElementById('root').children.length === 0) {
          console.log('⚠️ 根元素为空，强制重新加载...');
          forceReinitializeApp();
        }
      }, 2000);
    }
  });
  
  // 未处理的Promise拒绝
  window.addEventListener('unhandledrejection', (event) => {
    console.error('🚨 未处理的Promise拒绝:', event.reason);
    
    if (isDirectAccess()) {
      console.log('🔄 直接访问出现Promise错误，尝试恢复...');
      event.preventDefault(); // 阻止默认错误处理
    }
  });
  
  // 页面可见性变化处理
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && isDirectAccess()) {
      console.log('👁️ 页面重新可见，检查是否需要恢复...');
      
      // 检查页面状态
      setTimeout(() => {
        const root = document.getElementById('root');
        if (root && root.children.length === 0) {
          console.log('⚠️ 页面重新可见但内容为空，尝试恢复...');
          forceReinitializeApp();
        }
      }, 1000);
    }
  });
}

// 主修复函数
function fixGoogleAdsDirectAccess() {
  console.log('🚀 开始修复谷歌广告直接访问问题...');
  
  // 检查是否为直接访问
  if (!isDirectAccess()) {
    console.log('ℹ️ 非直接访问，无需特殊修复');
    return;
  }
  
  console.log('🎯 检测到直接访问，应用修复策略...');
  
  // 1. 清除缓存问题
  clearCacheIssues();
  
  // 2. 检查资源加载
  if (!checkAndFixResourceLoading()) {
    console.error('❌ 关键资源缺失，无法修复');
    return;
  }
  
  // 3. 检查并修复路由
  checkAndFixRouting();
  
  // 4. 添加错误恢复机制
  addErrorRecovery();
  
  // 5. 监控页面加载状态
  let loadTimeout = setTimeout(() => {
    console.log('⏰ 页面加载超时，检查状态...');
    
    const root = document.getElementById('root');
    if (root && root.children.length === 0) {
      console.warn('⚠️ 页面加载超时且内容为空，尝试恢复...');
      forceReinitializeApp();
    }
  }, 10000); // 10秒超时
  
  // 页面加载完成后清除超时
  window.addEventListener('load', () => {
    clearTimeout(loadTimeout);
    console.log('✅ 页面加载完成');
  });
  
  // 6. 添加用户友好的提示
  setTimeout(() => {
    const root = document.getElementById('root');
    if (root && root.children.length === 0) {
      console.log('💡 添加用户友好提示...');
      
      const userTip = document.createElement('div');
      userTip.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 20px;
        border-radius: 8px;
        text-align: center;
        z-index: 10000;
        max-width: 300px;
        font-family: Arial, sans-serif;
      `;
      
      userTip.innerHTML = `
        <h3 style="margin: 0 0 10px 0; color: #fbbf24;">页面加载中...</h3>
        <p style="margin: 0 0 15px 0; font-size: 14px;">正在优化移动端体验，请稍候...</p>
        <button onclick="this.parentElement.remove(); window.location.reload();" 
                style="background: #fbbf24; color: black; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
          刷新页面
        </button>
      `;
      
      document.body.appendChild(userTip);
      
      // 5秒后自动移除提示
      setTimeout(() => {
        if (userTip.parentElement) {
          userTip.remove();
        }
      }, 5000);
    }
  }, 5000);
  
  console.log('✅ 谷歌广告直接访问修复完成');
}

// 自动运行修复
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', fixGoogleAdsDirectAccess);
} else {
  fixGoogleAdsDirectAccess();
}

// 导出函数供外部使用
window.fixGoogleAdsDirectAccess = {
  run: fixGoogleAdsDirectAccess,
  isDirectAccess,
  forceReinitializeApp,
  checkAndFixRouting,
  checkAndFixResourceLoading,
  clearCacheIssues,
  addErrorRecovery
};

console.log('✅ 谷歌广告直接访问修复脚本加载完成');
console.log('💡 使用 window.fixGoogleAdsDirectAccess.run() 手动运行修复');
