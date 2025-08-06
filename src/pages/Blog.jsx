import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, Search, Filter, Share2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // 分享文章的辅助函数
  const shareArticle = (post) => {
    const shareText = `📖 ${post.title}\n\n${post.excerpt}\n\nRead more at FatePath.me`;
    const shareUrl = `${window.location.origin}/blog/${post.slug}`;
    
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: shareText,
        url: shareUrl
      }).catch(err => {
        console.log('Share failed:', err);
        // Fallback to copy
        copyToClipboard(`${shareText}\n\n${shareUrl}`);
      });
    } else {
      // Fallback: copy to clipboard
      copyToClipboard(`${shareText}\n\n${shareUrl}`);
    }
  };

  // 复制到剪贴板的辅助函数
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // 创建一个临时的成功提示
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 transform transition-all duration-300';
      notification.textContent = '文章链接已复制到剪贴板！';
      document.body.appendChild(notification);
      
      // 3秒后移除提示
      setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 2000);
    } catch (err) {
      console.error('复制失败:', err);
      // 后备方案：使用传统的复制方法
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      // 显示成功提示
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 transform transition-all duration-300';
      notification.textContent = '文章链接已复制到剪贴板！';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 2000);
    }
  };

  // 博客文章数据 - 您可以在这里添加您的文章
  const blogPosts = [
    {
      id: 1,
      title: "📈 You Think This Market Rally Is a Turning Point? A Bigger Crisis Is Brewing Beneath the Surface",
      excerpt: "In early August 2025, the Dow Jones surged by 580 points—the largest one-day gain since May. But is this really a turning point, or just the calm before a more devastating storm?",
      category: "market-analysis",
      categoryLabel: "Market Analysis",
      date: "2025-08-05",
      readTime: "12 min read",
      image: "/images/blog/market-crisis-2025.jpg",
      slug: "market-rally-turning-point-crisis-2025"
    },
    {
      id: 2,
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
      id: 3,
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
      id: 4,
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
      id: 5,
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
      id: 6,
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
          id: 7,
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
          id: 8,
          title: "Burned by the Heat: What 2025's Extreme Temperatures Reveal in BaZi",
          excerpt: "Explore how global heatwaves reflect deeper Fire element imbalances in Chinese metaphysics, and what your BaZi chart reveals about stress, health, and destiny in 2025.",
          category: "bazi-basics",
          categoryLabel: "Bazi Basics",
          date: "2025-08-02",
          readTime: "10 min read",
          image: "/images/blog/heatwave-bazi-cover.jpg",
          slug: "heatwave-bazi-fire-imbalance"
        },
        {
          id: 9,
          title: "What is the Best Bazi for Wealth? Decoding Your Chinese Astrology Blueprint",
          excerpt: "Discover the 3 wealthiest Bazi patterns in Chinese metaphysics, how to activate your financial potential, and why 'wealth' is more than money. Based on 10,000+ client cases.",
          category: "wealth-bazi",
          categoryLabel: "Wealth & Fortune",
          date: "2025-08-04",
          readTime: "18 min read",
          image: "/images/blog/bazi-wealth-blueprint-cover.jpg",
          slug: "best-bazi-wealth-chinese-astrology-blueprint"
        },
        {
          id: 10,
          title: "🌿 The Seasons of Fate: Why You Don't Have to Panic About Every Downturn",
          excerpt: "Discover how BaZi reveals that life's challenges are natural cycles, not punishments. Learn to flow with your destiny's seasons instead of fighting against them.",
          category: "bazi-basics",
          categoryLabel: "Bazi Basics",
          date: "2025-08-04",
          readTime: "7 min read",
          image: "/images/blog/seasons-fate-cover.jpg",
          slug: "seasons-fate-cycles"
        },
        {
          id: 11,
          title: "BaZi vs. MBTI: East Meets West in Personality and Destiny",
          excerpt: "Explore how ancient Chinese BaZi and Western MBTI personality systems complement each other. Discover the differences between destiny mapping and personality typing.",
          category: "bazi-basics",
          categoryLabel: "Bazi Basics",
          date: "2025-08-04",
          readTime: "11 min read",
          image: "/images/blog/bazi-mbti-comparison.jpg",
          slug: "bazi-vs-mbti-personality-destiny"
        },
                          {
          id: 12,
          title: "Why the Energy of a Solar Eclipse May Align With Lu Gen Planting Rituals",
          excerpt: "Discover how celestial events like solar eclipses can amplify collective energy and how ancient Taoist Lu Gen planting rituals help personalize these cosmic shifts.",
          category: "bazi-basics",
          categoryLabel: "Bazi Basics",
          date: "2025-08-06",
          readTime: "8 min read",
          image: "/images/blog/solar-eclipse-lu-gen-cover.jpg",
          slug: "solar-eclipse-energy-lu-gen-planting-rituals"
        }
  ]

  const categories = [
    { value: 'all', label: 'All Articles' },
    { value: 'market-analysis', label: 'Market Analysis' },
    { value: 'bazi-basics', label: 'Bazi Basics' },
    { value: 'love-compatibility', label: 'Love & Relationships' },
    { value: 'talismans', label: 'Talismans & Protection' },
    { value: 'career-timing', label: 'Career & Timing' },
    { value: 'wealth-bazi', label: 'Wealth & Fortune' }
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
    <div className="min-h-screen pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-playfair font-bold mb-4 sm:mb-6">
            <span className="gradient-text">Mystic Wisdom</span>
          </h1>
          <p className="text-lg sm:text-xl text-mystic-300 max-w-3xl mx-auto leading-relaxed">
            Explore ancient Chinese numerology insights, practical guidance, and spiritual wisdom 
            to illuminate your path and enhance your life journey.
          </p>
        </motion.div>

        {/* Introduction Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 sm:mb-16"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-playfair font-semibold mb-6 text-white text-center">
              Ancient Wisdom for Modern Life
            </h2>
            <div className="space-y-6 text-center">
              <p className="text-lg text-mystic-300 leading-relaxed">
                Welcome to our collection of insights drawn from thousands of years of Chinese metaphysical wisdom. Here, you'll find practical guidance on how ancient BaZi principles can illuminate your modern life challenges, from career decisions and relationship dynamics to personal growth and spiritual development.
              </p>
              <p className="text-lg text-mystic-300 leading-relaxed">
                Each article is crafted to bridge the gap between traditional Chinese numerology and contemporary life, offering actionable insights that you can apply immediately. Whether you're new to BaZi analysis or a seasoned practitioner, these articles will deepen your understanding of how the Five Elements, Yin-Yang balance, and cosmic timing influence your daily experiences.
              </p>
              <p className="text-lg text-mystic-300 leading-relaxed">
                Explore our latest articles below, and discover how ancient wisdom can provide clarity, direction, and empowerment in your modern journey. From understanding your wealth potential to navigating relationship challenges, these insights are designed to help you make informed decisions and align with your true destiny.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8 sm:mb-12"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-mystic-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-base bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white placeholder-mystic-400 focus:border-gold-500/50 focus:outline-none transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Filter className="h-5 w-5 text-mystic-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="flex-1 sm:flex-none px-4 py-3 text-base bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white focus:border-gold-500/50 focus:outline-none transition-colors"
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16"
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
              <div className="p-4 sm:p-6">
                {/* Meta Information */}
                <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-mystic-400 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-lg sm:text-xl font-cinzel font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-mystic-300 leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center space-x-2 text-gold-400 hover:text-gold-300 transition-colors font-medium text-sm group"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  {/* Share Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      shareArticle(post);
                    }}
                    className="p-2 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-mystic-400 hover:text-gold-400 hover:border-gold-500/50 transition-colors"
                    title="Share this article"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
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
            <div className="mystic-card p-8 sm:p-12 max-w-md mx-auto">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-mystic-700 to-mystic-800 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Search className="h-6 w-6 sm:h-8 sm:w-8 text-mystic-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-cinzel font-semibold text-white mb-2">
                No Articles Found
              </h3>
              <p className="text-sm sm:text-base text-mystic-300">
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
          <div className="mystic-card p-6 sm:p-8 max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-playfair font-semibold mb-3 sm:mb-4 text-white">
              Stay Connected with Ancient Wisdom
            </h3>
            <p className="text-sm sm:text-base text-mystic-300 mb-4 sm:mb-6">
              Subscribe to receive the latest insights on Bazi analysis, relationship guidance, 
              and spiritual wisdom directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 text-base bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white placeholder-mystic-400 focus:border-gold-500/50 focus:outline-none transition-colors"
              />
              <button className="px-4 sm:px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold rounded-lg hover:from-gold-400 hover:to-gold-500 transition-all duration-300 text-sm sm:text-base">
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