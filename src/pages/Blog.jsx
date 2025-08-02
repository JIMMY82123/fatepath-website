import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, Search, Filter } from 'lucide-react'
import { Link } from 'react-router-dom'

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // 博客文章数据 - 您可以在这里添加您的文章
  const blogPosts = [
    {
      id: 1,
      title: "Understanding Your Bazi Chart: A Beginner's Guide",
      excerpt: "Learn the fundamentals of Bazi (八字) analysis and how your birth chart reveals your life's blueprint. Discover the four pillars and their significance in Chinese astrology.",
      category: "bazi-basics",
      categoryLabel: "Bazi Basics",
      date: "2024-01-15",
      readTime: "8 min read",
      image: "/images/blog/bazi-basics.jpg",
      slug: "understanding-bazi-chart-beginners-guide"
    },
    {
      id: 2,
      title: "The Five Elements in Love: Finding Your Perfect Match",
      excerpt: "Explore how the Five Elements (五行) influence romantic compatibility. Discover which elements create harmony and which may lead to challenges in relationships.",
      category: "love-compatibility",
      categoryLabel: "Love & Relationships",
      date: "2024-01-10",
      readTime: "12 min read",
      image: "/images/blog/five-elements-love.jpg",
      slug: "five-elements-love-perfect-match"
    },
    {
      id: 3,
      title: "Protection Talismans: Ancient Wisdom for Modern Life",
      excerpt: "Discover the power of personalized talismans and how they can enhance your luck, protection, and positive energy flow based on your unique birth chart.",
      category: "talismans",
      categoryLabel: "Talismans & Protection",
      date: "2024-01-05",
      readTime: "10 min read",
      image: "/images/blog/talismans-protection.jpg",
      slug: "protection-talismans-ancient-wisdom"
    },
    {
      id: 4,
      title: "Career Timing: When to Make Your Next Big Move",
      excerpt: "Learn how to identify the optimal timing for career changes, business ventures, and professional decisions using traditional Chinese numerology.",
      category: "career-timing",
      categoryLabel: "Career & Timing",
      date: "2024-01-01",
      readTime: "15 min read",
      image: "/images/blog/career-timing.jpg",
      slug: "career-timing-next-big-move"
    },
    {
      id: 5,
      title: "2024 Year of the Dragon: Your Fortune Forecast",
      excerpt: "Discover what the Year of the Dragon 2024 holds for you based on your Bazi chart. Learn about opportunities, challenges, and how to maximize your luck this year.",
      category: "bazi-basics",
      categoryLabel: "Bazi Basics",
      date: "2024-01-20",
      readTime: "14 min read",
      image: "/images/blog/dragon-year-2024.jpg",
      slug: "2024-year-dragon-fortune-forecast"
    },
            {
          id: 6,
          title: "When Bitcoin Falls, What Does Destiny Say?",
          excerpt: "Explore how BaZi destiny charts and metaphysical timing reveal deeper insights into financial volatility like the August 2025 Bitcoin crash.",
          category: "career-timing",
          categoryLabel: "Career & Timing",
          date: "2025-08-02",
          readTime: "12 min read",
          image: "/images/blog/bitcoin-bazi-cover.jpg",
          slug: "bitcoin-crash-bazi-destiny"
        },
        {
          id: 7,
          title: "Burned by the Heat: What 2025's Extreme Temperatures Reveal in BaZi",
          excerpt: "Explore how global heatwaves reflect deeper Fire element imbalances in Chinese metaphysics, and what your BaZi chart reveals about stress, health, and destiny in 2025.",
          category: "bazi-basics",
          categoryLabel: "Bazi Basics",
          date: "2025-08-02",
          readTime: "10 min read",
          image: "/images/blog/heatwave-bazi-cover.jpg",
          slug: "heatwave-bazi-fire-imbalance"
        }
  ]

  const categories = [
    { value: 'all', label: 'All Articles' },
    { value: 'bazi-basics', label: 'Bazi Basics' },
    { value: 'love-compatibility', label: 'Love & Relationships' },
    { value: 'talismans', label: 'Talismans & Protection' },
    { value: 'career-timing', label: 'Career & Timing' }
  ]

  // 过滤文章
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6">
            <span className="gradient-text">Mystic Wisdom</span>
          </h1>
          <p className="text-xl text-mystic-300 max-w-3xl mx-auto leading-relaxed">
            Explore ancient Chinese numerology insights, practical guidance, and spiritual wisdom 
            to illuminate your path and enhance your life journey.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-mystic-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white placeholder-mystic-400 focus:border-gold-500/50 focus:outline-none transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-mystic-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white focus:border-gold-500/50 focus:outline-none transition-colors"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="mystic-card group hover:transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              {/* Article Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback Placeholder */}
                <div className="hidden w-full h-full bg-gradient-to-br from-mystic-800 to-mystic-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-gold-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white text-2xl">📖</span>
                    </div>
                    <p className="text-mystic-300 text-sm">Article Image</p>
                  </div>
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-gold-500/90 text-black text-xs font-semibold rounded-full">
                    {post.categoryLabel}
                  </span>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6">
                {/* Meta Information */}
                <div className="flex items-center space-x-4 text-sm text-mystic-400 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-xl font-cinzel font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-mystic-300 text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                {/* Read More Link */}
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center space-x-2 text-gold-400 hover:text-gold-300 transition-colors font-medium text-sm group"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* No Results Message */}
        {filteredPosts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="mystic-card p-12 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gradient-to-r from-mystic-700 to-mystic-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-mystic-400" />
              </div>
              <h3 className="text-xl font-cinzel font-semibold text-white mb-2">
                No Articles Found
              </h3>
              <p className="text-mystic-300">
                Try adjusting your search terms or category filter.
              </p>
            </div>
          </motion.div>
        )}

        {/* Newsletter Signup */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="mystic-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-playfair font-semibold mb-4 text-white">
              Stay Connected with Ancient Wisdom
            </h3>
            <p className="text-mystic-300 mb-6">
              Subscribe to receive the latest insights on Bazi analysis, relationship guidance, 
              and spiritual wisdom directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white placeholder-mystic-400 focus:border-gold-500/50 focus:outline-none transition-colors"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold rounded-lg hover:from-gold-400 hover:to-gold-500 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Blog 