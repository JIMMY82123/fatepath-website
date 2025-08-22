// 移动端白屏问题诊断和修复脚本
// 运行此脚本来诊断和修复移动端显示问题

console.log('🔍 开始移动端白屏问题诊断...');

// 1. 检查基本环境
function checkBasicEnvironment() {
  console.log('📱 检查基本环境...');
  
  const checks = {
    'React 可用': typeof React !== 'undefined',
    'React Router 可用': typeof ReactRouter !== 'undefined',
    'Tailwind CSS 可用': document.querySelector('[class*="bg-mystic"]),
    'DOM 加载完成': document.readyState === 'complete',
    'JavaScript 启用': true
  };
  
  Object.entries(checks).forEach(([check, result]) => {
    console.log(`${result ? '✅' : '❌'} ${check}: ${result}`);
  });
  
  return checks;
}

// 2. 检查移动端特定问题
function checkMobileSpecificIssues() {
  console.log('📱 检查移动端特定问题...');
  
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                   window.innerWidth <= 768;
  
  const mobileChecks = {
    '移动端检测': isMobile,
    '触摸支持': 'ontouchstart' in window,
    '视口设置': !!document.querySelector('meta[name="viewport"]'),
    '屏幕尺寸': `${window.screen.width}x${window.screen.height}`,
    '视口尺寸': `${window.innerWidth}x${window.innerHeight}`,
    '设备像素比': window.devicePixelRatio || 1
  };
  
  Object.entries(mobileChecks).forEach(([check, result]) => {
    console.log(`${typeof result === 'boolean' ? (result ? '✅' : '❌') : '📊'} ${check}: ${result}`);
  });
  
  return mobileChecks;
}

// 3. 检查CSS和样式问题
function checkCSSIssues() {
  console.log('🎨 检查CSS和样式问题...');
  
  const cssChecks = {
    'Tailwind 类存在': document.querySelector('.bg-mystic-900) !== null,
    '主要容器存在': document.querySelector('main') !== null,
    'Hero 部分存在': document.querySelector('header') !== null,
    '背景色应用': document.body.style.backgroundColor || getComputedStyle(document.body).backgroundColor,
    '字体加载': document.fonts && document.fonts.ready ? 'ready' : 'not ready'
  };
  
  Object.entries(cssChecks).forEach(([check, result]) => {
    console.log(`${result ? '✅' : '❌'} ${check}: ${result}`);
  });
  
  return cssChecks;
}

// 4. 检查JavaScript错误
function checkJavaScriptErrors() {
  console.log('🐛 检查JavaScript错误...');
  
  // 监听新的错误
  const errors = [];
  const originalError = console.error;
  
  console.error = (...args) => {
    errors.push(args);
    originalError.apply(console, args);
  };
  
  // 检查现有错误
  const existingErrors = window.errors || [];
  
  return {
    '控制台错误数量': errors.length,
    '现有错误数量': existingErrors.length,
    '错误详情': [...errors, ...existingErrors]
  };
}

// 5. 尝试修复常见问题
function attemptFixes() {
  console.log('🔧 尝试修复常见问题...');
  
  const fixes = [];
  
  // 修复1: 确保视口设置正确
  if (!document.querySelector('meta[name="viewport"]')) {
    const viewport = document.createElement('meta');
    viewport.name = 'viewport';
    viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(viewport);
    fixes.push('✅ 添加了移动端视口设置');
  }
  
  // 修复2: 强制应用背景色
  if (!document.body.style.backgroundColor) {
    document.body.style.backgroundColor = '#1a1a1a';
    fixes.push('✅ 强制应用了背景色');
  }
  
  // 修复3: 检查并修复主要容器
  const mainContainer = document.querySelector('main');
  if (!mainContainer) {
    console.warn('⚠️ 主要容器不存在，尝试创建...');
    const newMain = document.createElement('main');
    newMain.className = 'min-h-screen bg-mystic-900';
    newMain.innerHTML = `
      <div class="container mx-auto px-4 py-20 text-center text-white">
        <h1 class="text-4xl font-bold mb-4">页面加载中...</h1>
        <p class="text-mystic-300">如果问题持续存在，请刷新页面</p>
        <button onclick="window.location.reload()" class="mt-4 bg-gold-400 text-black px-6 py-2 rounded-lg">
          刷新页面
        </button>
      </div>
    `;
    document.body.appendChild(newMain);
    fixes.push('✅ 创建了临时主要容器');
  }
  
  // 修复4: 添加错误边界样式
  const style = document.createElement('style');
  style.textContent = `
    .mobile-error-boundary {
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
    }
    .mobile-error-boundary h2 {
      color: #fbbf24;
      margin-bottom: 16px;
    }
    .mobile-error-boundary button {
      background: #fbbf24;
      color: #1a1a1a;
      padding: 12px 24px;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 20px;
    }
  `;
  document.head.appendChild(style);
  fixes.push('✅ 添加了错误边界样式');
  
  return fixes;
}

// 6. 运行完整诊断
function runFullDiagnosis() {
  console.log('🚀 开始完整诊断...');
  
  const results = {
    basic: checkBasicEnvironment(),
    mobile: checkMobileSpecificIssues(),
    css: checkCSSIssues(),
    errors: checkJavaScriptErrors()
  };
  
  // 尝试修复
  const fixes = attemptFixes();
  
  // 生成报告
  const report = {
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
    results,
    fixes,
    summary: generateSummary(results, fixes)
  };
  
  console.log('📊 诊断报告:', report);
  
  // 显示结果给用户
  showDiagnosisResults(report);
  
  return report;
}

// 7. 生成摘要
function generateSummary(results, fixes) {
  const totalChecks = Object.values(results).reduce((sum, category) => {
    return sum + Object.keys(category).length;
  }, 0);
  
  const passedChecks = Object.values(results).reduce((sum, category) => {
    return sum + Object.values(category).filter(v => v === true || (typeof v === 'string' && v !== 'unknown')).length;
  }, 0);
  
  const successRate = Math.round((passedChecks / totalChecks) * 100);
  
  return {
    totalChecks,
    passedChecks,
    successRate: `${successRate}%`,
    status: successRate >= 80 ? '良好' : successRate >= 60 ? '一般' : '需要修复',
    recommendations: generateRecommendations(results, fixes)
  };
}

// 8. 生成建议
function generateRecommendations(results, fixes) {
  const recommendations = [];
  
  if (results.basic['React 可用'] === false) {
    recommendations.push('检查React是否正确加载');
  }
  
  if (results.mobile['视口设置'] === false) {
    recommendations.push('添加移动端视口meta标签');
  }
  
  if (results.css['Tailwind 类存在'] === false) {
    recommendations.push('检查Tailwind CSS是否正确加载');
  }
  
  if (results.errors['控制台错误数量'] > 0) {
    recommendations.push('检查控制台错误并修复JavaScript问题');
  }
  
  if (fixes.length === 0) {
    recommendations.push('页面配置看起来正常，问题可能在其他地方');
  }
  
  return recommendations;
}

// 9. 显示诊断结果
function showDiagnosisResults(report) {
  const resultsDiv = document.createElement('div');
  resultsDiv.className = 'mobile-error-boundary';
  resultsDiv.innerHTML = `
    <h2>移动端诊断结果</h2>
    <div style="text-align: left; max-width: 400px;">
      <p><strong>状态:</strong> ${report.summary.status}</p>
      <p><strong>成功率:</strong> ${report.summary.successRate}</p>
      <p><strong>修复项目:</strong> ${report.fixes.length}</p>
      <div style="margin: 16px 0;">
        <strong>建议:</strong>
        <ul style="margin: 8px 0; padding-left: 20px;">
          ${report.summary.recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
      </div>
    </div>
    <button onclick="this.parentElement.remove()">关闭</button>
  `;
  
  document.body.appendChild(resultsDiv);
}

// 10. 自动运行诊断
if (document.readyState === 'complete') {
  runFullDiagnosis();
} else {
  window.addEventListener('load', runFullDiagnosis);
}

// 导出函数供外部使用
window.mobileDiagnosis = {
  runFullDiagnosis,
  checkBasicEnvironment,
  checkMobileSpecificIssues,
  checkCSSIssues,
  checkJavaScriptErrors,
  attemptFixes
};

console.log('✅ 移动端诊断脚本加载完成');
console.log('💡 使用 window.mobileDiagnosis.runFullDiagnosis() 运行诊断');
