const fs = require('fs');
const path = require('path');

// PWA图标尺寸配置
const ICON_SIZES = [
  { size: 72, name: 'icon-72x72.png' },
  { size: 96, name: 'icon-96x96.png' },
  { size: 128, name: 'icon-128x128.png' },
  { size: 144, name: 'icon-144x144.png' },
  { size: 152, name: 'icon-152x152.png' },
  { size: 192, name: 'icon-192x192.png' },
  { size: 384, name: 'icon-384x384.png' },
  { size: 512, name: 'icon-512x512.png' }
];

// 创建图标目录
const createIconDirectories = () => {
  const iconDir = path.join(__dirname, '../public/images/icons');
  if (!fs.existsSync(iconDir)) {
    fs.mkdirSync(iconDir, { recursive: true });
  }
  return iconDir;
};

// 生成SVG图标内容
const generateSVGIcon = (size) => {
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#facc15;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#eab308;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e293b;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- 背景 -->
  <rect width="${size}" height="${size}" fill="url(#bgGradient)" rx="${size * 0.2}"/>
  
  <!-- 主要图标 -->
  <g transform="translate(${size * 0.2}, ${size * 0.2}) scale(${size * 0.6 / 100})">
    <!-- 八卦图案 -->
    <circle cx="50" cy="50" r="40" fill="none" stroke="url(#goldGradient)" stroke-width="3"/>
    <circle cx="50" cy="30" r="8" fill="url(#goldGradient)"/>
    <circle cx="50" cy="70" r="8" fill="url(#goldGradient)"/>
    
    <!-- 命运之线 -->
    <path d="M 20 50 Q 35 30 50 50 Q 65 70 80 50" stroke="url(#goldGradient)" stroke-width="2" fill="none"/>
    
    <!-- 星星装饰 -->
    <polygon points="15,15 17,20 22,20 18,24 20,29 15,26 10,29 12,24 8,20 13,20" fill="url(#goldGradient)"/>
    <polygon points="85,15 87,20 92,20 88,24 90,29 85,26 80,29 82,24 78,20 83,20" fill="url(#goldGradient)"/>
  </g>
  
  <!-- 文字 -->
  <text x="${size * 0.5}" y="${size * 0.9}" text-anchor="middle" fill="url(#goldGradient)" font-family="Arial, sans-serif" font-size="${size * 0.12}" font-weight="bold">FP</text>
</svg>`;
};

// 生成PNG图标的占位符（实际项目中需要使用图像处理库）
const generatePNGPlaceholder = (size, name) => {
  const svgContent = generateSVGIcon(size);
  const iconDir = createIconDirectories();
  const svgPath = path.join(iconDir, name.replace('.png', '.svg'));
  
  fs.writeFileSync(svgPath, svgContent);
  console.log(`✅ 生成图标: ${name.replace('.png', '.svg')}`);
  
  // 注意：这里只生成SVG，实际PNG转换需要图像处理库
  // 建议使用 sharp 或 jimp 库来转换SVG到PNG
  console.log(`⚠️  需要手动转换 ${svgPath} 为 PNG 格式`);
};

// 生成所有图标
const generateAllIcons = () => {
  console.log('🚀 开始生成PWA图标...');
  
  ICON_SIZES.forEach(({ size, name }) => {
    generatePNGPlaceholder(size, name);
  });
  
  console.log('✅ PWA图标生成完成！');
  console.log('📝 注意：需要手动将SVG转换为PNG格式，或安装图像处理库');
};

// 生成快捷方式图标
const generateShortcutIcons = () => {
  const shortcuts = [
    { name: 'bazi-shortcut', icon: '🔮' },
    { name: 'love-shortcut', icon: '💕' },
    { name: 'oracle-shortcut', icon: '🔮' }
  ];
  
  const iconDir = createIconDirectories();
  
  shortcuts.forEach(({ name, icon }) => {
    const svgContent = `<svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#facc15;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#eab308;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="96" height="96" fill="url(#goldGradient)" rx="20"/>
      <text x="48" y="60" text-anchor="middle" fill="#000" font-size="40">${icon}</text>
    </svg>`;
    
    const svgPath = path.join(iconDir, `${name}.svg`);
    fs.writeFileSync(svgPath, svgContent);
    console.log(`✅ 生成快捷方式图标: ${name}.svg`);
  });
};

// 主函数
const main = () => {
  try {
    generateAllIcons();
    generateShortcutIcons();
    console.log('\n🎉 PWA图标生成完成！');
    console.log('📁 图标保存在: public/images/icons/');
    console.log('🔧 下一步：将SVG转换为PNG格式');
  } catch (error) {
    console.error('❌ 生成图标时出错:', error);
  }
};

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = { generateAllIcons, generateShortcutIcons }; 