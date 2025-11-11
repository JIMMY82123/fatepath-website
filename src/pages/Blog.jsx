import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Tag, Search } from 'lucide-react'
import SEO from '../components/SEO'
import { blogPostsData } from '../data/blogPostsData'

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTag, setSelectedTag] = useState('all')
  const [tagSearchTerm, setTagSearchTerm] = useState('')

  // Handle URL parameters for tags
  useEffect(() => {
    const tagFromUrl = searchParams.get('tag')
    if (tagFromUrl) {
      setSelectedTag(tagFromUrl)
      setSelectedCategory('all')
    }
  }, [searchParams])

  const categoryLabelMap = {
    bazi: 'BaZi Analysis',
    love: 'Love & Relationships',
    wealth: 'Wealth & Career'
  }

  const getCategoryId = (category = '') => {
    const lower = category.toLowerCase()
    if (lower.includes('love')) return 'love'
    if (lower.includes('wealth') || lower.includes('career')) return 'wealth'
    return 'bazi'
  }

  const fallbackImage = '/images/blog/blog-placeholder.jpg'

  const blogPosts = Object.entries(blogPostsData)
    .map(([slug, post]) => {
      const categoryId = getCategoryId(post.category || '')
      return {
        slug,
        title: post.title,
        excerpt: post.excerpt,
        category: categoryId,
        categoryLabel: categoryLabelMap[categoryId],
        tags: post.tags || [],
        image: post.image || fallbackImage,
        date: post.date,
        readTime: post.readTime || '6 min read'
      }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map((post, index) => ({ ...post, id: index + 1 }))

  // SEO structured data for better search indexing
  const categoryCounts = blogPosts.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1
    return acc
  }, {})

  const categoryOrder = Object.keys(categoryLabelMap)

  const categories = [
    { id: 'all', name: 'All Articles', count: blogPosts.length },
    ...Object.entries(categoryCounts)
      .sort(([a], [b]) => {
        const indexA = categoryOrder.indexOf(a)
        const indexB = categoryOrder.indexOf(b)
        if (indexA === -1 && indexB === -1) return a.localeCompare(b)
        if (indexA === -1) return 1
        if (indexB === -1) return -1
        return indexA - indexB
      })
      .map(([id, count]) => ({
        id,
        name: categoryLabelMap[id] || id,
        count
      }))
  ]

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "FatePath BaZi & Chinese Astrology Blog",
    "description": "Expert insights on BaZi analysis, Chinese astrology, and life destiny through ancient wisdom and modern interpretation.",
    "url": "https://fatepath.me/blog",
    "inLanguage": "en-US",
    "audience": {
      "@type": "Audience",
      "name": "Readers in the United States, Canada, United Kingdom, and Australia seeking BaZi wisdom"
    },
    "areaServed": [
      "United States",
      "Canada",
      "United Kingdom",
      "Australia"
    ],
    "publisher": {
      "@type": "Organization",
      "name": "FatePath",
      "url": "https://fatepath.me",
      "logo": "https://fatepath.me/favicon.svg"
    },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": blogPosts.length,
      "itemListElement": blogPosts.map((post, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.excerpt,
          "url": `https://fatepath.me/blog/${post.slug}`,
          "datePublished": post.date,
          "author": {
            "@type": "Person",
            "name": "Master XuanYin"
          },
          "publisher": {
            "@type": "Organization",
            "name": "FatePath",
            "logo": "https://fatepath.me/favicon.svg"
          },
          "inLanguage": "en-US",
          "image": `https://fatepath.me${post.image}`
        }
      }))
    }
  }

  const uniqueTags = Array.from(new Set(blogPosts.flatMap(post => post.tags))).filter(Boolean)
  const allTags = ['all', ...uniqueTags]

  const tagFrequency = uniqueTags.reduce((acc, tag) => {
    acc[tag] = blogPosts.reduce((count, post) => count + (post.tags.includes(tag) ? 1 : 0), 0)
    return acc
  }, {})

  const popularTags = uniqueTags
    .map(tag => ({ tag, count: tagFrequency[tag] || 0 }))
    .sort((a, b) => {
      const countDiff = (b.count || 0) - (a.count || 0)
      if (countDiff !== 0) return countDiff
      return a.tag.localeCompare(b.tag)
    })
    .slice(0, 12)
    .map(item => item.tag)

  const searchResults = tagSearchTerm.trim().length > 0
    ? uniqueTags.filter(tag => tag.toLowerCase().includes(tagSearchTerm.trim().toLowerCase()))
    : []

  const isTagFiltered = selectedTag !== 'all'
  const canonicalUrl = 'https://fatepath.me/blog'

  // Filter blog posts based on category and tag
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag)
    
    return matchesCategory && matchesTag
  })

  const handleTagClick = (tag) => {
    setSelectedTag(tag)
    setSelectedCategory('all') // Reset category when selecting a tag
    setTagSearchTerm('')
    
    // Update URL with tag parameter
    if (tag === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ tag })
    }
  }

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId)
    setSelectedTag('all') // Reset tag when selecting a category
  }

  return (
    <>
      <SEO 
        title="Chinese Astrology Blog - Ancient Wisdom for Modern Life | FatePath"
        description="Discover ancient Chinese numerology insights, practical guidance, and spiritual wisdom."
        keywords="chinese astrology blog, bazi analysis, chinese numerology"
        author="FatePath"
        canonical={canonicalUrl}
        ogTitle="Chinese Astrology Blog - Ancient Wisdom for Modern Life"
        ogDescription="Discover ancient Chinese numerology insights, practical guidance, and spiritual wisdom."
        ogImage="https://fatepath.me/og-image.svg"
        ogUrl={canonicalUrl}
        noIndex={isTagFiltered}
        noFollow={false}
      />
      
      {/* Structured Data for SEO */}
      {!isTagFiltered && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}

      <main className="min-h-screen bg-mystic-900 pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-mystic-800 to-mystic-900">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Ancient Wisdom
              <span className="block text-gold-400">Modern Insights</span>
            </h1>
            <p className="text-xl text-mystic-300 max-w-3xl mx-auto mb-8">
              Discover the timeless wisdom of Chinese astrology through expert analysis, 
              practical guidance, and spiritual insights that illuminate your life's path.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-12 bg-mystic-900">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-gold-400 text-white'
                      : 'bg-mystic-800 text-mystic-300 hover:bg-mystic-700'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* Tag Filter */}
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="flex items-center gap-2 justify-center">
                <Tag className="h-5 w-5 text-gold-400" />
                <h3 className="text-lg font-semibold text-white">Filter by Tags</h3>
              </div>
              <p className="text-sm text-mystic-400">
                Search any topic or choose from the trending tags below.
              </p>
              
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-mystic-400 h-4 w-4" />
                <input
                  type="text"
                  value={tagSearchTerm}
                  onChange={(e) => setTagSearchTerm(e.target.value)}
                  placeholder="Search tags..."
                  className="w-full pl-12 pr-4 py-3 bg-mystic-800 border border-mystic-700 rounded-lg text-white placeholder-mystic-500 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                />
                {tagSearchTerm.trim().length > 0 && (
                  <div className="absolute left-0 right-0 mt-2 bg-mystic-800 border border-mystic-700/70 rounded-lg shadow-lg max-h-64 overflow-y-auto text-left z-10">
                    {searchResults.length > 0 ? (
                      searchResults.map(resultTag => (
                        <button
                          key={resultTag}
                          onClick={() => handleTagClick(resultTag)}
                          className="w-full text-left px-4 py-3 text-sm text-mystic-200 hover:bg-mystic-700/70 transition-colors"
                        >
                          {resultTag}
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-sm text-mystic-400">
                        No tags found for “{tagSearchTerm.trim()}”
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => handleTagClick('all')}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedTag === 'all'
                      ? 'bg-gold-400 text-white'
                      : 'bg-mystic-700 text-mystic-300 hover:bg-mystic-600'
                  }`}
                >
                  All Tags
                </button>
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedTag === tag
                        ? 'bg-gold-400 text-white'
                        : 'bg-mystic-700 text-mystic-300 hover:bg-mystic-600'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-20 bg-mystic-900">
          <div className="container mx-auto px-4">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="text-2xl font-bold text-white mb-4">No articles found</h3>
                <p className="text-mystic-300">Try adjusting your filter criteria.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-mystic-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-mystic-700/50"
                  >
                    <Link to={`/blog/${post.slug}`}>
                      <div className="w-full h-48 bg-mystic-700 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          width={768}
                          height={384}
                          loading="lazy"
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-full h-full bg-mystic-700 flex items-center justify-center hidden">
                          <span className="text-mystic-400">Blog Image</span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center text-sm text-mystic-300 mb-3">
                          <span>{post.date}</span>
                          <span className="mx-2">•</span>
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">
                          {post.title}
                        </h3>
                        <p className="text-mystic-300 mb-4">
                          {post.excerpt}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 bg-mystic-700 text-mystic-300 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center text-gold-400 hover:text-gold-300 font-semibold transition-colors">
                          Read More
                          <span className="ml-2">→</span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-mystic-800 to-mystic-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Discover Your Destiny?
            </h2>
            <p className="text-xl text-mystic-300 mb-8 max-w-2xl mx-auto">
              Get your personalized BaZi reading and unlock the ancient wisdom 
              that will guide your life's journey.
            </p>
            <Link
              to="/free-bazi-report"
              className="bg-gradient-to-r from-gold-400 to-gold-600 text-white px-10 py-5 rounded-lg text-xl font-bold hover:from-gold-500 hover:to-gold-700 transition-all duration-300 transform hover:scale-105"
            >
              Start Your Free Reading
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}

export default Blog
