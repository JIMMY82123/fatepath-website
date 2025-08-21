// AI头像生成工具
// 集成多个免费的AI头像生成服务

// 生成基于姓名的随机种子
const generateSeed = (name) => {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    const char = name.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // 转换为32位整数
  }
  return Math.abs(hash)
}

// 生成随机性别
const getRandomGender = (name) => {
  const seed = generateSeed(name)
  return seed % 2 === 0 ? 'male' : 'female'
}

// 生成随机年龄范围
const getRandomAge = (name) => {
  const seed = generateSeed(name)
  const ageRanges = ['20-30', '30-40', '40-50', '50-60']
  return ageRanges[seed % ageRanges.length]
}

// 生成随机情绪/表情
const getRandomMood = (name) => {
  const seed = generateSeed(name)
  const moods = ['happy', 'neutral', 'confident', 'friendly']
  return moods[seed % ageRanges.length]
}

// 默认头像 - 防止外部API失败
const getDefaultAvatar = (name) => {
  const seed = generateSeed(name)
  const colors = ['#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#f87171', '#fb923c']
  const color = colors[seed % colors.length]
  
  // 生成简单的SVG头像
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
  
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg width="150" height="150" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="150" height="150" fill="${color}" rx="75"/>
      <text x="75" y="85" font-family="Arial, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" fill="white">${initials}</text>
    </svg>
  `)}`
}

// 1. UI Faces API - 免费的头像占位符
export const getUIFacesAvatar = (name) => {
  try {
    const gender = getRandomGender(name)
    const age = getRandomAge(name)
    const mood = getRandomMood(name)
    
    // UI Faces API 参数
    const params = new URLSearchParams({
      gender: gender,
      age: age,
      emotion: mood,
      limit: 1
    })
    
    return `https://i.pravatar.cc/150?u=${encodeURIComponent(name)}`
  } catch (error) {
    console.warn('UI Faces API 失败，使用默认头像:', error)
    return getDefaultAvatar(name)
  }
}

// 2. DiceBear API - 生成风格化的头像
export const getDiceBearAvatar = (name) => {
  try {
    const seed = generateSeed(name)
    const styles = ['adventurer', 'avataaars', 'big-ears', 'bottts', 'croodles', 'fun-emoji', 'micah', 'miniavs', 'personas']
    const style = styles[seed % styles.length]
    
    return `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(name)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`
  } catch (error) {
    console.warn('DiceBear API 失败，使用默认头像:', error)
    return getDefaultAvatar(name)
  }
}

// 3. RoboHash API - 生成机器人风格头像
export const getRoboHashAvatar = (name) => {
  try {
    return `https://robohash.org/${encodeURIComponent(name)}?set=set4&size=150x150`
  } catch (error) {
    console.warn('RoboHash API 失败，使用默认头像:', error)
    return getDefaultAvatar(name)
  }
}

// 4. Gravatar 风格 - 基于邮箱生成
export const getGravatarStyleAvatar = (name) => {
  try {
    const email = `${name.toLowerCase().replace(/\s+/g, '')}@example.com`
    const hash = btoa(email).replace(/[^a-zA-Z0-9]/g, '').substring(0, 16)
    return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=150`
  } catch (error) {
    console.warn('Gravatar API 失败，使用默认头像:', error)
    return getDefaultAvatar(name)
  }
}

// 5. 多风格头像生成器
export const getMultiStyleAvatar = (name, style = 'random') => {
  try {
    const seed = generateSeed(name)
    const styles = ['dicebear', 'robohash', 'gravatar', 'uifaces']
    
    if (style === 'random') {
      style = styles[seed % styles.length]
    }
    
    switch (style) {
      case 'dicebear':
        return getDiceBearAvatar(name)
      case 'robohash':
        return getRoboHashAvatar(name)
      case 'gravatar':
        return getGravatarStyleAvatar(name)
      case 'uifaces':
        return getUIFacesAvatar(name)
      default:
        return getDiceBearAvatar(name)
    }
  } catch (error) {
    console.warn('多风格头像生成失败，使用默认头像:', error)
    return getDefaultAvatar(name)
  }
}

// 6. 获取AI生成的头像（主要函数）
export const getAIGeneratedAvatar = (testimonial) => {
  try {
    // 如果已经有自定义头像，优先使用
    if (testimonial.avatar && testimonial.avatar.startsWith('/images/')) {
      return testimonial.avatar
    }
    
    // 根据服务类型选择不同的头像风格
    let style = 'random'
    
    if (testimonial.service) {
      const service = testimonial.service.toLowerCase()
      if (service.includes('love') || service.includes('relationship')) {
        style = 'dicebear' // 更温暖的头像风格
      } else if (service.includes('talisman')) {
        style = 'robohash' // 神秘风格
      } else if (service.includes('career')) {
        style = 'uifaces' // 专业风格
      } else {
        style = 'dicebear' // 默认温暖风格
      }
    }
    
    return getMultiStyleAvatar(testimonial.name, style)
  } catch (error) {
    console.warn('AI头像生成失败，使用默认头像:', error)
    return getDefaultAvatar(testimonial.name)
  }
}

// 7. 头像缓存管理
const avatarCache = new Map()

export const getCachedAIAvatar = (testimonial) => {
  try {
    const cacheKey = `${testimonial.name}-${testimonial.service}`
    
    if (avatarCache.has(cacheKey)) {
      return avatarCache.get(cacheKey)
    }
    
    const avatar = getAIGeneratedAvatar(testimonial)
    avatarCache.set(cacheKey, avatar)
    
    return avatar
  } catch (error) {
    console.warn('缓存头像获取失败，使用默认头像:', error)
    return getDefaultAvatar(testimonial.name)
  }
}

// 8. 批量生成头像URL - 添加错误处理防止白屏
export const generateAvatarUrls = (testimonials) => {
  try {
    if (!Array.isArray(testimonials)) {
      console.warn('testimonials 不是数组，返回空数组')
      return []
    }
    
    return testimonials.map(testimonial => {
      try {
        return {
          ...testimonial,
          avatar: getCachedAIAvatar(testimonial)
        }
      } catch (error) {
        console.warn(`处理推荐 ${testimonial.name} 时出错:`, error)
        return {
          ...testimonial,
          avatar: getDefaultAvatar(testimonial.name)
        }
      }
    })
  } catch (error) {
    console.error('批量生成头像失败，返回原始数据:', error)
    // 返回原始数据，确保页面不会白屏
    return testimonials.map(testimonial => ({
      ...testimonial,
      avatar: getDefaultAvatar(testimonial.name)
    }))
  }
} 