import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowLeft, Share2, BookOpen } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

const BlogPost = () => {
  const { slug } = useParams()

  // 博客文章数据 - 您可以在这里添加您的完整文章内容
  const blogPosts = [
    {
      id: 1,
      title: "Understanding Your Bazi Chart: A Beginner's Guide",
      excerpt: "Learn the fundamentals of Bazi (八字) analysis and how your birth chart reveals your life's blueprint. Discover the four pillars and their significance in Chinese astrology.",
      content: `
        <p class="mb-6 text-mystic-300 leading-relaxed">
          Bazi (八字), also known as the Four Pillars of Destiny, is one of the most profound systems of Chinese astrology. 
          It provides a comprehensive blueprint of your life based on the exact moment of your birth. In this guide, 
          we'll explore the fundamental concepts that make Bazi such a powerful tool for self-discovery and life planning.
        </p>

        <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">What is Bazi?</h2>
        <p class="mb-6 text-mystic-300 leading-relaxed">
          Bazi literally means "eight characters" in Chinese, referring to the four pairs of characters that represent 
          the year, month, day, and hour of your birth. Each pillar consists of a Heavenly Stem and an Earthly Branch, 
          creating a unique combination that reveals your personality, strengths, challenges, and life path.
        </p>

        <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">The Four Pillars</h2>
        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <div class="mystic-card p-6">
            <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-3">Year Pillar</h3>
            <p class="text-mystic-300 text-sm">Represents your family background, early life, and ancestral influences.</p>
          </div>
          <div class="mystic-card p-6">
            <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-3">Month Pillar</h3>
            <p class="text-mystic-300 text-sm">Shows your career path, social relationships, and life purpose.</p>
          </div>
          <div class="mystic-card p-6">
            <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-3">Day Pillar</h3>
            <p class="text-mystic-300 text-sm">Reveals your core personality, self-image, and inner nature.</p>
          </div>
          <div class="mystic-card p-6">
            <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-3">Hour Pillar</h3>
            <p class="text-mystic-300 text-sm">Indicates your later life, children, and ultimate destiny.</p>
          </div>
        </div>

        <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">The Five Elements</h2>
        <p class="mb-6 text-mystic-300 leading-relaxed">
          At the heart of Bazi analysis are the Five Elements: Wood, Fire, Earth, Metal, and Water. Each element 
          represents different aspects of life and personality traits. Understanding the balance and interaction 
          of these elements in your chart is crucial for accurate interpretation.
        </p>

        <div class="bg-gradient-to-r from-mystic-800 to-mystic-900 p-6 rounded-xl border border-gold-500/30 mb-8">
          <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-4">Key Insights from Your Bazi Chart:</h3>
          <ul class="space-y-2 text-mystic-300">
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Your natural talents and abilities</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Optimal career paths and timing</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Relationship compatibility patterns</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Health and wellness guidance</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Life challenges and growth opportunities</span>
            </li>
          </ul>
        </div>

        <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">How to Use This Knowledge</h2>
        <p class="mb-6 text-mystic-300 leading-relaxed">
          Understanding your Bazi chart is just the beginning. The real power comes from applying this knowledge 
          to make informed decisions about your career, relationships, and life choices. By aligning your actions 
          with your natural energy patterns, you can enhance your luck and create more favorable outcomes.
        </p>

        <div class="mystic-card p-6 border-l-4 border-gold-500/50 mb-8">
          <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-3">Pro Tip:</h3>
          <p class="text-mystic-300 text-sm">
            Your Bazi chart is not set in stone - it's a dynamic blueprint that evolves with time. 
            Understanding your chart helps you work with your natural energy rather than against it, 
            leading to greater harmony and success in all areas of life.
          </p>
        </div>

        <p class="mb-6 text-mystic-300 leading-relaxed">
          Ready to discover your unique Bazi blueprint? A professional reading can provide you with 
          detailed insights into your personality, career potential, relationship patterns, and life path. 
          Contact me for a personalized analysis that will illuminate your path forward.
        </p>
      `,
      category: "bazi-basics",
      categoryLabel: "Bazi Basics",
      date: "2024-01-15",
      readTime: "8 min read",
      image: "/images/blog/bazi-basics.jpg",
      slug: "understanding-bazi-chart-beginners-guide",
      author: "玄印 (Xuan Yin)",
      tags: ["Bazi", "Chinese Astrology", "Four Pillars", "Five Elements"]
    }
    // 您可以在这里添加更多文章
  ]

  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    return (
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mystic-card p-12"
          >
            <h1 className="text-3xl font-cinzel font-bold mb-4 text-white">
              Article Not Found
            </h1>
            <p className="text-mystic-300 mb-8">
              The article you're looking for doesn't exist or has been moved.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold px-6 py-3 rounded-lg hover:from-gold-400 hover:to-gold-500 transition-all duration-300"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Blog</span>
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

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
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 text-mystic-300 hover:text-gold-400 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Blog</span>
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          {/* Category Badge */}
          <div className="mb-4">
            <span className="px-4 py-2 bg-gold-500/90 text-black text-sm font-semibold rounded-full">
              {post.categoryLabel}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-cinzel font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-mystic-400 mb-8">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>By {post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback Placeholder */}
            <div className="hidden w-full h-full bg-gradient-to-br from-mystic-800 to-mystic-900 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-gold-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-3xl">📖</span>
                </div>
                <p className="text-mystic-300">Article Image</p>
              </div>
            </div>
          </div>

          {/* Tags */}
          {post.tags && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-mystic-800/50 border border-mystic-700/50 text-mystic-300 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Article Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-invert prose-gold max-w-none"
        >
          <div 
            className="text-mystic-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.div>

        {/* Share Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-mystic-700/50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-mystic-400">Share this article:</span>
              <button className="p-2 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-mystic-300 hover:text-gold-400 hover:border-gold-500/50 transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold px-6 py-3 rounded-lg hover:from-gold-400 hover:to-gold-500 transition-all duration-300"
            >
              <span>Get Your Reading</span>
              <ArrowLeft className="h-5 w-5 rotate-180" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default BlogPost 