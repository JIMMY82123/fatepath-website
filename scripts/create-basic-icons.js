import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 创建基本的图标文件
const createBasicIcons = () => {
  console.log('🚀 开始创建基本图标文件...');
  
  // 创建图标目录
  const iconDir = path.join(__dirname, '../public');
  if (!fs.existsSync(iconDir)) {
    fs.mkdirSync(iconDir, { recursive: true });
  }
  
  // 创建基本的SVG图标内容
  const createSVGIcon = (size, filename) => {
    const svgContent = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
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
    
    const filePath = path.join(iconDir, filename);
    fs.writeFileSync(filePath, svgContent);
    console.log(`✅ 创建图标: ${filename}`);
  };
  
  // 创建各种尺寸的图标
  createSVGIcon(16, 'favicon-16x16.svg');
  createSVGIcon(32, 'favicon-32x32.svg');
  createSVGIcon(180, 'apple-touch-icon.svg');
  createSVGIcon(192, 'android-chrome-192x192.svg');
  createSVGIcon(512, 'android-chrome-512x512.svg');
  
  console.log('✅ 基本图标文件创建完成！');
  console.log('📝 注意：这些是SVG格式，建议转换为PNG格式以获得更好的兼容性');
  console.log('💡 可以使用在线工具或图像编辑软件将SVG转换为PNG');
};

// 运行脚本
createBasicIcons();
