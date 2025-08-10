import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Tag } from 'lucide-react'
import SEO from '../components/SEO'

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTag, setSelectedTag] = useState('all')

  // Handle URL parameters for tags
  useEffect(() => {
    const tagFromUrl = searchParams.get('tag')
    if (tagFromUrl) {
      setSelectedTag(tagFromUrl)
      setSelectedCategory('all')
    }
  }, [searchParams])

  const categories = [
    { id: 'all', name: 'All Articles', count: 9 },
    { id: 'bazi', name: 'BaZi Analysis', count: 5 },
    { id: 'love', name: 'Love & Relationships', count: 2 },
    { id: 'wealth', name: 'Wealth & Career', count: 2 }
  ]

  const blogPosts = [
    {
      id: 1,
      title: "BaZi Chat｜The 'Pressure and Turning Points' of a Gui Hai – Yi Chou – Geng Xu – Wu Yin Woman",
      excerpt: "Discover the unique challenges and opportunities in this BaZi chart analysis. Learn how pressure transforms into momentum and when the breakthrough years arrive for this winter-born Geng Metal woman.",
      category: 'bazi',
      tags: ['BaZi', 'Chinese Astrology', 'Destiny', 'Five Elements', 'Career', 'Relationships'],
      image: "/images/blog/bazi-chat-pressure-turning-points-cover.svg",
              date: "2025-08-11",
      readTime: "8 min read",
      slug: "bazi-chat-pressure-turning-points-gui-hai-woman"
    },
    {
      id: 2,
      title: "Understanding Your BaZi Chart: A Beginner's Guide",
      excerpt: "Master the fundamentals of BaZi (八字) analysis and discover how your birth chart reveals your life's blueprint, personality traits, and destiny path through ancient Chinese wisdom.",
      category: 'bazi',
      tags: ['BaZi', 'Chinese Astrology', 'Destiny', 'Five Elements'],
      image: "/images/blog/bazi-beginners-guide-cover.jpg",
      date: "2024-01-15",
      readTime: "5 min read",
      slug: "understanding-bazi-chart-beginners-guide"
    },
    {
      id: 3,
      title: "The Five Elements in Love: Finding Your Perfect Match",
      excerpt: "Unlock the secrets of romantic compatibility through the Five Elements (五行) system. Learn how Wood, Fire, Earth, Metal, and Water energies create harmony or conflict in relationships.",
      category: 'love',
      tags: ['Love', 'Five Elements', 'Relationships', 'Compatibility'],
      image: "/images/blog/five-elements-love-cover.jpg",
      date: "2024-01-10",
      readTime: "7 min read",
      slug: "five-elements-love-perfect-match"
    },
    {
      id: 4,
      title: "Wealth Archetypes in Chinese Astrology",
      excerpt: "Discover your unique wealth personality type through BaZi analysis. Learn how your birth chart reveals your financial potential and the best strategies for wealth accumulation.",
      category: 'wealth',
      tags: ['Wealth', 'Career', 'Financial', 'BaZi'],
      image: "/images/blog/wealth-archetypes-cover.jpg",
      date: "2024-01-05",
      readTime: "6 min read",
      slug: "wealth-archetypes-chinese-astrology"
    },
    {
      id: 5,
      title: "Career Timing: When to Make Your Next Big Move",
      excerpt: "Master the art of perfect timing for career changes using traditional Chinese numerology. Learn to read the cosmic signals that indicate when to advance, change, or start new ventures.",
      category: 'career',
      tags: ['Career', 'Timing', 'Career Change', 'Destiny'],
      image: "/images/blog/career-timing-cover.jpg",
      date: "2024-01-01",
      readTime: "8 min read",
      slug: "career-timing-next-big-move"
    }
  ]

  // Get all unique tags from blog posts
  const allTags = ['all', ...Array.from(new Set(blogPosts.flatMap(post => post.tags)))]

  // Filter blog posts based on category and tag
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag)
    
    return matchesCategory && matchesTag
  })

  const handleTagClick = (tag) => {
    setSelectedTag(tag)
    setSelectedCategory('all') // Reset category when selecting a tag
    
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
        ogTitle="Chinese Astrology Blog - Ancient Wisdom for Modern Life"
        ogDescription="Discover ancient Chinese numerology insights, practical guidance, and spiritual wisdom."
        ogImage="https://fatepath.me/og-image.svg"
        ogUrl="https://fatepath.me/blog"
      />

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
            <div className="text-center">
              <div className="flex items-center gap-2 mb-4 justify-center">
                <Tag className="h-5 w-5 text-gold-400" />
                <h3 className="text-lg font-semibold text-white">Filter by Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedTag === tag
                        ? 'bg-gold-400 text-white'
                        : 'bg-mystic-700 text-mystic-300 hover:bg-mystic-600'
                    }`}
                  >
                    {tag === 'all' ? 'All Tags' : tag}
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
