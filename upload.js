const { execSync } = require('child_process');

console.log('🚀 开始上传到GitHub...');

try {
  console.log('📦 添加文件到暂存区...');
  execSync('git add .', { stdio: 'inherit' });
  
  console.log('💾 提交更改...');
  execSync('git commit -m "实现智能头像分配系统 - 前3个真实头像+AI生成头像"', { stdio: 'inherit' });
  
  console.log('📤 推送到GitHub...');
  execSync('git push', { stdio: 'inherit' });
  
  console.log('✅ 上传完成！Vercel将自动部署...');
} catch (error) {
  console.error('❌ 上传失败:', error.message);
}

