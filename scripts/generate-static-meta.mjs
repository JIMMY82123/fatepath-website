import { readFile, writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { blogPostsData } from '../src/data/blogPostsData.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const distDir = path.resolve(__dirname, '../dist')
const templatePath = path.join(distDir, 'index.html')
const siteOrigin = 'https://fatepath.me'
const defaultImage = `${siteOrigin}/og-image.svg`
const defaultKeywords = 'us bazi reading, chinese astrology consultation, american ba zi master, destiny analysis, fatepath'

const cleanText = (value = '') => value.replace(/\s+/g, ' ').trim()
const truncate = (value = '', limit = 155) => {
  const text = cleanText(value)
  if (text.length <= limit) return text
  return `${text.slice(0, Math.max(0, limit - 3)).trimEnd()}...`
}
const escapeAttr = (value = '') => cleanText(value)
  .replace(/&/g, '&amp;')
  .replace(/"/g, '&quot;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
const escapeHtml = (value = '') => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;')
const htmlToPlainText = (html = '') => cleanText(
  html
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&')
)
const createHiddenSummary = (text = '') => {
  const normalized = cleanText(text)
  if (!normalized) return ''
  const truncated = normalized.length > 1500 ? `${normalized.slice(0, 1497).trimEnd()}...` : normalized
  return `<div id="seo-summary" style="position:absolute;left:-9999px;top:auto;width:1px;max-width:1px;height:auto;overflow:hidden;"><p>${escapeHtml(truncated)}</p></div>`
}

const replaceTag = (html, regex, replacement) => (
  regex.test(html) ? html.replace(regex, replacement) : html
)

const applyMeta = (html, meta) => {
  const title = escapeAttr(meta.title)
  const description = escapeAttr(truncate(meta.description))
  const keywords = escapeAttr(meta.keywords || defaultKeywords)
  const url = escapeAttr(meta.url)
  const ogImage = escapeAttr(meta.ogImage || defaultImage)
  const author = escapeAttr(meta.author || 'FatePath')
  const ogType = escapeAttr(meta.ogType || 'website')
  const heading = escapeAttr(meta.heading || meta.title)

  let output = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`)
  output = replaceTag(output, /<meta\s+name="description"[^>]*?>/i, `<meta name="description" content="${description}" />`)
  output = replaceTag(output, /<meta\s+name="keywords"[^>]*?>/i, `<meta name="keywords" content="${keywords}" />`)
  output = replaceTag(output, /<meta\s+name="author"[^>]*?>/i, `<meta name="author" content="${author}" />`)
  output = replaceTag(output, /<meta\s+property="og:title"[^>]*?>/i, `<meta property="og:title" content="${title}" />`)
  output = replaceTag(output, /<meta\s+property="og:description"[^>]*?>/i, `<meta property="og:description" content="${description}" />`)
  output = replaceTag(output, /<meta\s+property="og:url"[^>]*?>/i, `<meta property="og:url" content="${url}" />`)
  output = replaceTag(output, /<meta\s+property="og:type"[^>]*?>/i, `<meta property="og:type" content="${ogType}" />`)
  output = replaceTag(output, /<meta\s+property="og:image"[^>]*?>/i, `<meta property="og:image" content="${ogImage}" />`)
  output = replaceTag(output, /<meta\s+property="twitter:title"[^>]*?>/i, `<meta property="twitter:title" content="${title}" />`)
  output = replaceTag(output, /<meta\s+property="twitter:description"[^>]*?>/i, `<meta property="twitter:description" content="${description}" />`)
  output = replaceTag(output, /<meta\s+property="twitter:url"[^>]*?>/i, `<meta property="twitter:url" content="${url}" />`)
  output = replaceTag(output, /<meta\s+property="twitter:image"[^>]*?>/i, `<meta property="twitter:image" content="${ogImage}" />`)

  const canonicalTag = `<link rel="canonical" href="${url}" />`
  if (/<link\s+rel="canonical"/i.test(output)) {
    output = output.replace(/<link\s+rel="canonical"[^>]*?>/i, canonicalTag)
  } else {
    output = output.replace('    <!-- PWA Meta Tags -->', `${canonicalTag}\n\n    <!-- PWA Meta Tags -->`)
  }

  const hiddenH1 = `<div id="seo-h1-wrapper" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;"><h1>${heading}</h1></div>`
  if (/<div id="seo-h1-wrapper"[\s\S]*?<\/div>/.test(output)) {
    output = output.replace(/<div id="seo-h1-wrapper"[\s\S]*?<\/div>/, hiddenH1)
  } else if (output.includes('<div id="root"></div>')) {
    output = output.replace('<div id="root"></div>', `${hiddenH1}\n    <div id="root"></div>`)
  } else if (output.includes('<body>')) {
    output = output.replace('<body>', `<body>\n    ${hiddenH1}`)
  }

  const summaryBlock = createHiddenSummary(meta.seoText || meta.description || '')
  if (summaryBlock) {
    if (/<div id="seo-summary"[\s\S]*?<\/div>/.test(output)) {
      output = output.replace(/<div id="seo-summary"[\s\S]*?<\/div>/, summaryBlock)
    } else if (/<div id="seo-h1-wrapper"[\s\S]*?<\/div>/.test(output)) {
      output = output.replace(/<div id="seo-h1-wrapper"[\s\S]*?<\/div>/, match => `${match}\n    ${summaryBlock}`)
    } else if (output.includes('<div id="root"></div>')) {
      output = output.replace('<div id="root"></div>', `${summaryBlock}\n    <div id="root"></div>`)
    } else if (output.includes('<body>')) {
      output = output.replace('<body>', `<body>\n    ${summaryBlock}`)
    }
  }

  return output
}

const writePage = async (meta) => {
  const html = applyMeta(templateHtml, meta)
  const targetPath = path.join(distDir, meta.output)
  await mkdir(path.dirname(targetPath), { recursive: true })
  await writeFile(targetPath, html, 'utf8')
  console.log(`✅ Generated static meta for /${meta.output.replace(/index\.html$/, '')}`)
}

let templateHtml

try {
  templateHtml = await readFile(templatePath, 'utf8')
} catch (error) {
  console.error('⚠️  Could not read dist/index.html. Run `npm run build` before this script.')
  process.exit(0)
}

const staticPages = [
  {
    output: 'blog/index.html',
    url: `${siteOrigin}/blog`,
    title: 'Chinese Astrology Blog for American Readers | FatePath',
    description: 'Explore BaZi case studies, timing forecasts, and Chinese astrology lessons tailored for American readers seeking practical spiritual guidance.',
    keywords: 'chinese astrology blog, bazi case studies, destiny timing forecast, fatepath blog insights',
    ogImage: defaultImage,
    ogType: 'website',
    author: 'FatePath Editorial Team',
    heading: 'Chinese Astrology Blog for American Readers',
    seoText: 'The FatePath blog publishes in-depth BaZi case studies, seasonal forecasts, and practical Chinese astrology lessons tailored for Americans. Each article connects classical theory with modern career, relationship, and wellness decisions.'
  },
  {
    output: 'form-bazi-discount/index.html',
    url: `${siteOrigin}/form-bazi-discount`,
    title: 'Quick BaZi Reading Form | Affordable Chinese Astrology Analysis | FatePath',
    description: 'Complete your FatePath discount BaZi request—submit birth details for a fast English-language Chinese astrology analysis delivered by Master XuanYin.',
    keywords: 'quick bazi reading, affordable chinese astrology, birth chart form, fatepath discount service',
    ogImage: defaultImage,
    ogType: 'website',
    author: 'FatePath',
    heading: 'Quick BaZi Reading Form',
    seoText: 'Submit your birth data, goals, and biggest questions to receive a concise BaZi reading. The discount report highlights elemental balance, pressing life priorities, and immediate adjustments clients can implement right away.'
  },
  {
    output: 'privacy/index.html',
    url: `${siteOrigin}/privacy`,
    title: 'Privacy Policy | FatePath BaZi Services',
    description: 'Review how FatePath secures BaZi client data, complies with GDPR and CCPA, and supports international clients with transparent privacy practices.',
    keywords: 'fatepath privacy policy, bazi data security, gdpr compliance, ccpa rights, chinese astrology privacy',
    ogImage: defaultImage,
    ogType: 'article',
    author: 'FatePath',
    heading: 'Privacy Policy | FatePath BaZi Services',
    seoText: 'FatePath encrypts consultation notes, limits access to personal data, and honours GDPR as well as CCPA rights. Learn how to request, correct, or delete your BaZi records and how long supporting files are retained.'
  },
  {
    output: 'wealth-sign/index.html',
    url: `${siteOrigin}/wealth-sign`,
    title: 'Ancient Chinese Wisdom Oracle | Interactive Divination & Fortune Reading | FatePath',
    description: 'Experience the ancient Chinese Wisdom Oracle for personalized divination and fortune reading. Receive guidance through traditional Chinese numerology and an interactive oracle system.',
    keywords: 'chinese wisdom oracle, divination, fortune reading, chinese numerology, interactive oracle, ancient wisdom',
    ogImage: defaultImage,
    ogType: 'website',
    author: 'FatePath',
    heading: 'Ancient Chinese Wisdom Oracle',
    seoText: 'The Wealth Sign oracle recreates a temple divination ritual. Follow the breathing prompts, flip the sacred card, and receive a prosperity message with practical mindset adjustments for modern careers and businesses.'
  },
  {
    output: 'services/index.html',
    url: `${siteOrigin}/services`,
    title: 'BaZi Consultation Services | Career, Love, Wealth Guidance | FatePath',
    description: 'Browse FatePath services including full BaZi destiny readings, love compatibility reports, wealth coaching, and custom talisman design tailored for Western clients.',
    keywords: 'bazi consultation services, career destiny reading, love compatibility report, wealth coaching, custom talisman',
    ogImage: defaultImage,
    ogType: 'website',
    author: 'FatePath',
    heading: 'FatePath BaZi Consultation Services',
    seoText: 'Review the signature consultations: comprehensive destiny readings, relationship compatibility, wealth and business strategy, and handcrafted talismans. Each offering blends classical theory with actionable coaching for English-speaking clients.'
  },
  {
    output: 'testimonials/index.html',
    url: `${siteOrigin}/testimonials`,
    title: 'Client Testimonials | FatePath BaZi Success Stories',
    description: 'Read authentic testimonials from professionals, couples, and spiritual seekers who experienced breakthroughs through FatePath BaZi consultations.',
    keywords: 'fatepath testimonials, bazi success stories, client reviews, chinese astrology feedback',
    ogImage: defaultImage,
    ogType: 'website',
    author: 'FatePath',
    heading: 'FatePath Client Testimonials',
    seoText: 'Clients describe landing promotions, healing relationships, improving health routines, and regaining financial confidence after Master XuanYin interpreted their BaZi charts. Each story shows a tangible result and ongoing support.'
  },
  {
    output: 'contact/index.html',
    url: `${siteOrigin}/contact`,
    title: 'Contact FatePath | Book a BaZi Consultation',
    description: 'Reach out to FatePath for BaZi readings, collaborations, and media enquiries. Submit the form or email Master XuanYin for personalized Chinese astrology support.',
    keywords: 'contact fatepath, book bazi consultation, chinese astrology inquiry, master xuanyin email',
    ogImage: defaultImage,
    ogType: 'website',
    author: 'FatePath',
    heading: 'Contact FatePath BaZi Services',
    seoText: 'Send a message to confirm availability, pricing, or collaboration ideas. The contact page explains response times, preferred communication channels, and how clients across different time zones can schedule sessions.'
  },
  {
    output: 'free-bazi-report/index.html',
    url: `${siteOrigin}/free-bazi-report`,
    title: 'Free BaZi Report | Discover Your Chinese Astrology Blueprint',
    description: 'Generate a free BaZi snapshot to explore your elemental balance, day master strength, and top life priorities before booking a full consultation.',
    keywords: 'free bazi report, chinese astrology chart preview, elemental balance, day master strength',
    ogImage: defaultImage,
    ogType: 'website',
    author: 'FatePath',
    heading: 'Free BaZi Report Preview',
    seoText: 'Receive an instant overview of your Day Master, supportive and weak elements, and the life arenas demanding attention. The free report helps you evaluate whether a full consultation is the right next step.'
  },
  {
    output: 'resources/index.html',
    url: `${siteOrigin}/resources`,
    title: 'Chinese Astrology Resources | Guides, Downloads, Study Tools',
    description: 'Access curated BaZi resources including elemental guides, compatibility charts, study downloads, and recommended readings compiled by FatePath.',
    keywords: 'bazi study resources, chinese astrology downloads, compatibility guides, fatepath resources',
    ogImage: defaultImage,
    ogType: 'website',
    author: 'FatePath',
    heading: 'BaZi Study Resources',
    seoText: 'Explore downloadable charts, compatibility matrices, and curated reading lists. FatePath’s resource hub supports students who want to practice interpreting Day Masters, elemental balance, and luck cycles with confidence.'
  },
  {
    output: 'faq/index.html',
    url: `${siteOrigin}/faq`,
    title: 'FatePath BaZi FAQ | Common Questions Answered',
    description: 'Browse frequently asked questions about FatePath BaZi readings, consultation logistics, session preparation, and follow-up support.',
    keywords: 'bazi faq, chinese astrology questions, fatepath consultation info, session preparation',
    ogImage: defaultImage,
    ogType: 'website',
    author: 'FatePath',
    heading: 'BaZi Consultation FAQ',
    seoText: 'Find answers about booking, payment, delivering reports, and working with clients globally. The FAQ clarifies how to prepare birth data, what happens during a reading, and the kind of follow-up guidance FatePath provides.'
  }
]

const blogPages = Object.entries(blogPostsData).map(([slug, post]) => ({
  output: `blog/${slug}/index.html`,
  url: `${siteOrigin}/blog/${slug}`,
  title: `${post.title} | FatePath Chinese Astrology Blog`,
  description: post.excerpt || post.title,
  keywords: `${(post.tags || []).join(', ')}, chinese astrology, bazi analysis`,
  ogImage: post.image ? `${siteOrigin}${post.image}` : defaultImage,
  ogType: 'article',
  author: post.author || 'FatePath',
  heading: post.title,
  seoText: `${post.excerpt || ''} ${htmlToPlainText(post.content || '')}`.trim()
}))

const legacyBlogPages = [
  {
    output: 'blog/bitcoin-crash-bazi-destiny/index.html',
    url: `${siteOrigin}/blog/bitcoin-crash-bazi-destiny`,
    title: 'Bitcoin Crash Timing Through BaZi Destiny | FatePath',
    description: 'Decode how BaZi Fire and Metal cycles align with historic Bitcoin crashes so crypto investors can anticipate turbulence and protect capital.',
    keywords: 'bitcoin crash astrology, bazi crypto timing, fire metal cycle investing, fatepath blog',
    ogImage: defaultImage,
    ogType: 'article',
    author: 'Master XuanYin',
    heading: 'Bitcoin Crash Timing Through BaZi Destiny',
    seoText: 'Decode how BaZi Fire and Metal cycles align with historic Bitcoin crashes so crypto investors can anticipate turbulence, rebalance portfolios, and protect capital before volatility spikes.'
  },
  {
    output: 'blog/chinese-astrology-ancient-wisdom-guiding-destiny/index.html',
    url: `${siteOrigin}/blog/chinese-astrology-ancient-wisdom-guiding-destiny`,
    title: 'Chinese Astrology: Ancient Wisdom Guiding Modern Destiny | FatePath',
    description: 'Explore how classical BaZi principles translate into practical guidance for today\'s professionals seeking clarity on relationships, career moves, and life timing.',
    keywords: 'ancient chinese astrology wisdom, modern destiny guidance, bazi insights, fatepath blog',
    ogImage: defaultImage,
    ogType: 'article',
    author: 'Master XuanYin',
    heading: 'Chinese Astrology: Ancient Wisdom Guiding Modern Destiny',
    seoText: 'Explore how classical Chinese astrology methods translate into modern strategy for career pivots, relationship decisions, and long-term planning. The article bridges temple wisdom with practical coaching.'
  },
  {
    output: 'blog/heatwave-bazi-fire-imbalance/index.html',
    url: `${siteOrigin}/blog/heatwave-bazi-fire-imbalance`,
    title: 'Heatwave Survival Through BaZi Fire Imbalance | FatePath',
    description: 'Learn how excessive Fire energy in BaZi charts mirrors real-world heatwaves and discover lifestyle adjustments that cool, hydrate, and stabilize your destiny.',
    keywords: 'heatwave bazi analysis, fire imbalance astrology, cooling lifestyle tips, fatepath blog',
    ogImage: defaultImage,
    ogType: 'article',
    author: 'Master XuanYin',
    heading: 'Heatwave Survival Through BaZi Fire Imbalance',
    seoText: 'Learn how excessive Fire in a BaZi chart mirrors modern heatwaves and how hydration, yin foods, rest, and Water-supporting routines keep your health and finances balanced during extreme weather.'
  }
]

const pagesToWrite = [...staticPages, ...blogPages, ...legacyBlogPages]

for (const meta of pagesToWrite) {
  try {
    await writePage(meta)
  } catch (error) {
    console.error(`❌ Failed to generate meta for ${meta.url}:`, error)
  }
}
