// 头像生成工具
export const generateAvatar = (name, size = 100) => {
  // 生成基于姓名的颜色
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
    '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2'
  ]
  
  const nameHash = name.split('').reduce((hash, char) => {
    return char.charCodeAt(0) + ((hash << 5) - hash)
  }, 0)
  
  const colorIndex = Math.abs(nameHash) % colors.length
  const backgroundColor = colors[colorIndex]
  
  // 获取首字母
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase()
  
  // 创建SVG头像
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="${backgroundColor}" rx="${size/2}"/>
      <text x="${size/2}" y="${size/2 + size/8}" 
            font-family="Arial, sans-serif" 
            font-size="${size/3}" 
            font-weight="bold" 
            text-anchor="middle" 
            fill="white">
        ${initials}
      </text>
    </svg>
  `
  
  return `data:image/svg+xml;base64,${btoa(svg)}`
}

// 获取客户头像
export const getClientAvatar = (testimonial) => {
  if (testimonial.avatar) {
    return testimonial.avatar
  }
  return generateAvatar(testimonial.name)
} 