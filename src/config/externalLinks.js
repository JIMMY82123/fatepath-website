// 外部链接配置
export const externalLinks = {
  // GPT相关链接
  gpt: {
    fatePathGPT: 'https://chatgpt.com/g/g-6890abd2192c8191a10cfac74695c42c-fatepath-bazi-destiny-decoder', // FatePath专用GPT
  },
  
  // 社交媒体链接
  social: {
    twitter: '#',
    facebook: '#',
    linkedin: '#',
    instagram: '#',
  },
  
  // 联系方式
  contact: {
    whatsapp: 'https://wa.me/8615914228258',
    email: 'mailto:chenxiao0801@hotmail.com',
  }
}

// 获取GPT链接的函数
export const getGPTLink = (type = 'fatePathGPT') => {
  return externalLinks.gpt[type] || externalLinks.gpt.fatePathGPT
}

// 获取社交媒体链接的函数
export const getSocialLink = (platform) => {
  return externalLinks.social[platform] || '#'
}

// 获取联系方式链接的函数
export const getContactLink = (type) => {
  return externalLinks.contact[type] || '#'
} 