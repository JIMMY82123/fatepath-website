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
  return moods[seed % moods.length]
}

// 1. UI Faces API - 免费的头像占位符
export const getUIFacesAvatar = (name) => {
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
}

// 2. DiceBear API - 生成风格化的头像
export const getDiceBearAvatar = (name) => {
  const seed = generateSeed(name)
  const styles = ['adventurer', 'avataaars', 'big-ears', 'bottts', 'croodles', 'fun-emoji', 'micah', 'miniavs', 'personas']
  const style = styles[seed % styles.length]
  
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(name)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`
}

// 3. RoboHash API - 生成机器人风格头像
export const getRoboHashAvatar = (name) => {
  return `https://robohash.org/${encodeURIComponent(name)}?set=set4&size=150x150`
}

// 4. Gravatar 风格 - 基于邮箱生成
export const getGravatarStyleAvatar = (name) => {
  const email = `${name.toLowerCase().replace(/\s+/g, '')}@example.com`
  const hash = btoa(email).replace(/[^a-zA-Z0-9]/g, '').substring(0, 16)
  return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=150`
}

// 5. 多风格头像生成器
export const getMultiStyleAvatar = (name, style = 'random') => {
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
}

// 6. 获取AI生成的头像（主要函数）
export const getAIGeneratedAvatar = (testimonial) => {
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
}

// 7. 头像缓存管理
const avatarCache = new Map()

export const getCachedAIAvatar = (testimonial) => {
  const cacheKey = `${testimonial.name}-${testimonial.service}`
  
  if (avatarCache.has(cacheKey)) {
    return avatarCache.get(cacheKey)
  }
  
  const avatar = getAIGeneratedAvatar(testimonial)
  avatarCache.set(cacheKey, avatar)
  
  return avatar
}

// 8. 批量生成头像URL
export const generateAvatarUrls = (testimonials) => {
  return testimonials.map(testimonial => ({
    ...testimonial,
    avatar: getCachedAIAvatar(testimonial)
  }))
} 