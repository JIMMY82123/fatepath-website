import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 确保blog目录存在
const blogDir = path.join(__dirname, '../public/images/blog');
if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
}

// 需要生成的图片列表
const images = [
    {
        filename: 'market-crisis-2025.jpg',
        title: '市场危机分析',
        subtitle: '股市图表与危机预警',
        color: '#e74c3c'
    },
    {
        filename: 'bazi-basics.jpg',
        title: '八字基础指南',
        subtitle: '传统中国占星术',
        color: '#3498db'
    },
    {
        filename: 'five-elements-love.jpg',
        title: '五行爱情匹配',
        subtitle: '五行元素与爱情',
        color: '#e91e63'
    },
    {
        filename: 'talismans-protection.jpg',
        title: '护身符与保护',
        subtitle: '古老智慧护身符',
        color: '#8e44ad'
    },
    {
        filename: 'career-timing.jpg',
        title: '职业时机选择',
        subtitle: '职业发展与时机',
        color: '#27ae60'
    },
    {
        filename: 'dragon-year-2024.jpg',
        title: '2024龙年运势',
        subtitle: '龙年吉祥图案',
        color: '#f39c12'
    },
    {
        filename: 'bazi-love-timing-cover.jpg',
        title: '八字爱情时机',
        subtitle: '真爱出现时机',
        color: '#e91e63'
    },
    {
        filename: 'solar-eclipse-lu-gen-cover.jpg',
        title: '日食与种植仪式',
        subtitle: '天体能量与仪式',
        color: '#2c3e50'
    }
];

// 生成SVG占位符图片
function generateSVGPlaceholder(image) {
    const svg = `
<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#16213e;stop-opacity:1" />
        </linearGradient>
        <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
    </defs>
    
    <!-- 背景 -->
    <rect width="800" height="600" fill="url(#grad1)"/>
    
    <!-- 装饰性圆圈 -->
    <circle cx="100" cy="100" r="50" fill="${image.color}" opacity="0.1"/>
    <circle cx="700" cy="500" r="80" fill="${image.color}" opacity="0.1"/>
    <circle cx="650" cy="150" r="30" fill="${image.color}" opacity="0.1"/>
    
    <!-- 主要内容区域 -->
    <rect x="100" y="200" width="600" height="200" fill="rgba(255,255,255,0.05)" rx="20"/>
    
    <!-- 标题 -->
    <text x="400" y="280" font-family="Arial, sans-serif" font-size="32" font-weight="bold" 
          text-anchor="middle" fill="#ffd700" filter="url(#glow)">
        ${image.title}
    </text>
    
    <!-- 副标题 -->
    <text x="400" y="320" font-family="Arial, sans-serif" font-size="18" 
          text-anchor="middle" fill="#ecf0f1" opacity="0.8">
        ${image.subtitle}
    </text>
    
    <!-- 装饰性图标 -->
    <text x="400" y="380" font-family="Arial, sans-serif" font-size="48" 
          text-anchor="middle" fill="${image.color}" opacity="0.6">
        ${getIcon(image.title)}
    </text>
    
    <!-- 底部装饰线 -->
    <line x1="200" y1="450" x2="600" y2="450" stroke="${image.color}" stroke-width="2" opacity="0.3"/>
    
    <!-- 角落装饰 -->
    <rect x="50" y="50" width="4" height="4" fill="${image.color}" opacity="0.5"/>
    <rect x="746" y="50" width="4" height="4" fill="${image.color}" opacity="0.5"/>
    <rect x="50" y="546" width="4" height="4" fill="${image.color}" opacity="0.5"/>
    <rect x="746" y="546" width="4" height="4" fill="${image.color}" opacity="0.5"/>
</svg>`;

    return svg;
}

// 根据标题获取图标
function getIcon(title) {
    const iconMap = {
        '市场危机分析': '📈',
        '八字基础指南': '🎯',
        '五行爱情匹配': '💕',
        '护身符与保护': '🛡️',
        '职业时机选择': '⏰',
        '2024龙年运势': '🐉',
        '八字爱情时机': '💘',
        '日食与种植仪式': '🌑'
    };
    
    return iconMap[title] || '✨';
}

// 生成所有图片
console.log('🎨 开始生成博客封面占位符图片...\n');

images.forEach((image, index) => {
    const svg = generateSVGPlaceholder(image);
    const filepath = path.join(blogDir, image.filename.replace('.jpg', '.svg'));
    
    fs.writeFileSync(filepath, svg);
    console.log(`✅ 已生成: ${image.filename.replace('.jpg', '.svg')} - ${image.title}`);
});

console.log(`\n🎉 完成！已生成 ${images.length} 个占位符图片`);
console.log(`📁 图片保存在: ${blogDir}`);
console.log('\n📋 下一步：');
console.log('1. 使用AI图片生成工具（如DALL-E、Midjourney）生成真实图片');
console.log('2. 将生成的图片重命名为对应的文件名');
console.log('3. 替换占位符图片');
console.log('4. 确保图片尺寸为800x600像素或更大');
