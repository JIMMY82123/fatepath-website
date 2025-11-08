import { blogPostsData } from '../src/data/blogPostsData.js'

const siteOrigin = 'https://fatepath.me'
const host = 'fatepath.me'
const indexNowKey = '8f4b6c9a2d7e4f10b23c5a8671d9e0ff'
const keyLocation = `${siteOrigin}/indexnow.txt`

const staticUrls = [
  `${siteOrigin}/`,
  `${siteOrigin}/blog`,
  `${siteOrigin}/form-bazi-discount`,
  `${siteOrigin}/privacy`,
  `${siteOrigin}/wealth-sign`,
  `${siteOrigin}/services`,
  `${siteOrigin}/testimonials`,
  `${siteOrigin}/contact`,
  `${siteOrigin}/free-bazi-report`,
  `${siteOrigin}/resources`,
  `${siteOrigin}/faq`
]

const blogUrls = Object.keys(blogPostsData).map(slug => `${siteOrigin}/blog/${slug}`)

const urlList = Array.from(new Set([...staticUrls, ...blogUrls]))

if (urlList.length === 0) {
  console.warn('⚠️  No URLs found to submit to IndexNow.')
  process.exit(0)
}

console.log(`📬 Submitting ${urlList.length} URLs to IndexNow...`)

const ensureFetch = async () => {
  if (typeof fetch === 'function') return fetch
  try {
    const { default: fetchFn } = await import('node-fetch')
    return fetchFn
  } catch (error) {
    throw new Error('Fetch API unavailable. Please run with Node 18+ or install node-fetch. Original error: ' + error.message)
  }
}

const fetchInstance = await ensureFetch()

try {
  const response = await fetchInstance('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      host,
      key: indexNowKey,
      keyLocation,
      urlList
    })
  })

  if (!response.ok) {
    const text = await response.text()
    console.error(`❌ IndexNow submission failed: ${response.status} ${response.statusText}\n${text}`)
    process.exit(1)
  }

  const resultText = await response.text()
  console.log('✅ IndexNow submission succeeded.', resultText || '')
} catch (error) {
  console.error('❌ IndexNow submission error:', error)
  process.exit(1)
}
