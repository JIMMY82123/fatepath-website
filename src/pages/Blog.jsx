import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Tag, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import SEO from '../components/SEO'
import { blogPostsData } from '../data/blogPostsData'

const Blog = () => {
  const { t, i18n } = useTranslation()
  const currentLanguage = i18n.language || 'en'
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTag, setSelectedTag] = useState('all')
  const [tagSearchTerm, setTagSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6 // 每页显示6篇文章

  // Handle URL parameters for tags
  useEffect(() => {
    const tagFromUrl = searchParams.get('tag')
    if (tagFromUrl) {
      setSelectedTag(tagFromUrl)
      setSelectedCategory('all')
    }
  }, [searchParams])

  const categoryLabelMap = {
    bazi: t('blog.category.bazi'),
    love: t('blog.category.love'),
    wealth: t('blog.category.wealth')
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
      // Support multilingual title and excerpt
      const title = typeof post.title === 'object' 
        ? (post.title[currentLanguage] || post.title.en || post.title)
        : post.title
      const excerpt = typeof post.excerpt === 'object'
        ? (post.excerpt[currentLanguage] || post.excerpt.en || post.excerpt)
        : post.excerpt
      return {
        slug,
        title,
        excerpt,
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
    { id: 'all', name: t('blog.allArticles'), count: blogPosts.length },
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
  const isCategoryFiltered = selectedCategory !== 'all'
  
  // Build canonical URL based on filters
  let canonicalUrl = 'https://fatepath.me/blog'
  if (isTagFiltered) {
    canonicalUrl = `https://fatepath.me/blog?tag=${encodeURIComponent(selectedTag)}`
  } else if (isCategoryFiltered) {
    canonicalUrl = `https://fatepath.me/blog?category=${selectedCategory}`
  }

  // Filter blog posts based on category and tag
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag)
    
    return matchesCategory && matchesTag
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, selectedTag])

  // Pagination handlers
  const goToPage = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  // Dynamic SEO content based on filters
  const getSEOTitle = () => {
    if (isTagFiltered) {
      return `${selectedTag} Articles - Chinese Astrology Blog | FatePath`
    }
    if (isCategoryFiltered) {
      const categoryName = categoryLabelMap[selectedCategory] || selectedCategory
      return `${categoryName} - Chinese Astrology Blog | FatePath`
    }
    return "Chinese Astrology Blog - Ancient Wisdom for Modern Life | FatePath"
  }

  const getSEODescription = () => {
    if (isTagFiltered) {
      const postCount = filteredPosts.length
      return `Explore ${postCount} ${selectedTag} articles on Chinese astrology, BaZi analysis, and fortune prediction. Discover ancient wisdom and practical guidance for modern life.`
    }
    if (isCategoryFiltered) {
      const categoryName = categoryLabelMap[selectedCategory] || selectedCategory
      const postCount = filteredPosts.length
      return `Browse ${postCount} ${categoryName} articles covering Chinese astrology, BaZi readings, and destiny analysis. Expert insights and practical guidance.`
    }
    return "Discover ancient Chinese numerology insights, practical guidance, and spiritual wisdom through our comprehensive BaZi analysis blog."
  }

  const getSEOKeywords = () => {
    if (isTagFiltered) {
      return `${selectedTag}, chinese astrology, bazi analysis, chinese numerology, fortune prediction, ${selectedTag.toLowerCase()} guide`
    }
    if (isCategoryFiltered) {
      const categoryName = categoryLabelMap[selectedCategory] || selectedCategory
      return `${categoryName.toLowerCase()}, chinese astrology, bazi analysis, chinese numerology, ${categoryName.toLowerCase()} reading`
    }
    return "chinese astrology blog, bazi analysis, chinese numerology, fortune telling, destiny reading"
  }

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
        title={getSEOTitle()}
        description={getSEODescription()}
        keywords={getSEOKeywords()}
        author="FatePath"
        canonical={canonicalUrl}
        ogTitle={getSEOTitle()}
        ogDescription={getSEODescription()}
        ogImage="https://fatepath.me/og-image.svg"
        ogUrl={canonicalUrl}
        noIndex={false}
        noFollow={false}
      />
      
      {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />

      <main className="min-h-screen bg-mystic-900 pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-mystic-800 to-mystic-900">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {t('blog.heroTitle')}
              <span className="block text-gold-400">{t('blog.heroSubtitle')}</span>
            </h1>
            <p className="text-xl text-mystic-300 max-w-3xl mx-auto mb-8">
              {t('blog.heroDescription')}
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
                <h3 className="text-lg font-semibold text-white">{t('blog.filterByTags')}</h3>
              </div>
              <p className="text-sm text-mystic-400">
                {t('blog.tagSearchHint')}
              </p>
              
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-mystic-400 h-4 w-4" />
                <input
                  type="text"
                  value={tagSearchTerm}
                  onChange={(e) => setTagSearchTerm(e.target.value)}
                  placeholder={t('blog.searchTagsPlaceholder')}
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
                        {t('blog.noTagsFound', { term: tagSearchTerm.trim() })}
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
                  {t('blog.allTags')}
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

        {/* Blog Posts List */}
        <section className="py-12 bg-mystic-900">
          <div className="container mx-auto px-4 max-w-5xl">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="text-2xl font-bold text-white mb-4">{t('blog.noArticlesFound')}</h3>
                <p className="text-mystic-300">{t('blog.tryAdjustingFilters')}</p>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                  {currentPosts.map((post) => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.slug}`}
                      className="block border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
                    >
                      <article className="flex flex-col sm:flex-row gap-4 p-6">
                        {/* Thumbnail */}
                        <div className="flex-shrink-0 w-full sm:w-48 h-32 sm:h-32 rounded-lg overflow-hidden bg-mystic-700">
                          <img 
                            src={post.image} 
                            alt={`${post.title} - BaZi reading blog article cover image about Chinese astrology and numerology`}
                            width={192}
                            height={128}
                            loading="lazy"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="w-full h-full bg-mystic-700 flex items-center justify-center hidden" aria-hidden="true">
                            <span className="text-mystic-400 text-sm">BaZi Blog Image</span>
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center text-xs text-gray-500 mb-2">
                            <span>{post.date}</span>
                            <span className="mx-2">•</span>
                            <span>{post.readTime}</span>
                            {post.categoryLabel && (
                              <>
                                <span className="mx-2">•</span>
                                <span className="text-gold-600">{post.categoryLabel}</span>
                              </>
                            )}
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-gold-600 transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {post.excerpt}
                          </p>
                          
                          {/* Tags */}
                          {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {post.tags.slice(0, 3).map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                      onClick={goToPrevPage}
                      disabled={currentPage === 1}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        currentPage === 1
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                      }`}
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    {getPageNumbers().map((page, index) => {
                      if (page === '...') {
                        return (
                          <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
                            ...
                          </span>
                        )
                      }
                      return (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            currentPage === page
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    })}

                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        currentPage === totalPages
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                      }`}
                      aria-label="Next page"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-mystic-800 to-mystic-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('blog.ctaTitle')}
            </h2>
            <p className="text-xl text-mystic-300 mb-8 max-w-2xl mx-auto">
              {t('blog.ctaDescription')}
            </p>
            <Link
              to="/free-bazi-report"
              className="bg-gradient-to-r from-gold-400 to-gold-600 text-white px-10 py-5 rounded-lg text-xl font-bold hover:from-gold-500 hover:to-gold-700 transition-all duration-300 transform hover:scale-105"
            >
              {t('blog.ctaButton')}
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}

export default Blog
