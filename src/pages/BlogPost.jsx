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
    },
    {
      id: 5,
      title: "2024 Year of the Dragon: Your Fortune Forecast",
      excerpt: "Discover what the Year of the Dragon 2024 holds for you based on your Bazi chart. Learn about opportunities, challenges, and how to maximize your luck this year.",
      content: `
        <p class="mb-6 text-mystic-300 leading-relaxed">
          The Year of the Dragon 2024 brings powerful energy of transformation, ambition, and success. 
          As we enter this auspicious year, understanding how the Dragon's energy interacts with your 
          personal Bazi chart can help you navigate opportunities and challenges with greater wisdom.
        </p>

        <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">The Dragon's Energy in 2024</h2>
        <p class="mb-6 text-mystic-300 leading-relaxed">
          2024 is the Year of the Wood Dragon, combining the dynamic energy of the Dragon with the 
          growth-oriented nature of Wood element. This combination creates a year of expansion, 
          innovation, and breakthrough opportunities. The Dragon's natural leadership qualities 
          combined with Wood's nurturing energy make this an excellent time for personal and 
          professional development.
        </p>

        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <div class="mystic-card p-6">
            <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-3">Dragon Characteristics</h3>
            <p class="text-mystic-300 text-sm">Powerful, ambitious, charismatic, and lucky. Dragons are natural leaders who attract success and abundance.</p>
          </div>
          <div class="mystic-card p-6">
            <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-3">Wood Element Influence</h3>
            <p class="text-mystic-300 text-sm">Growth, expansion, creativity, and flexibility. Wood energy supports new beginnings and sustainable development.</p>
          </div>
        </div>

        <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">How Dragon Year Affects Your Bazi</h2>
        <p class="mb-6 text-mystic-300 leading-relaxed">
          The Dragon year interacts with your personal Bazi chart in unique ways. Depending on your 
          birth year and the elements in your chart, 2024 may bring different opportunities and challenges. 
          Understanding these interactions can help you make the most of this powerful year.
        </p>

        <div class="bg-gradient-to-r from-mystic-800 to-mystic-900 p-6 rounded-xl border border-gold-500/30 mb-8">
          <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-4">2024 Dragon Year Opportunities:</h3>
          <ul class="space-y-2 text-mystic-300">
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Career advancement and leadership opportunities</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Financial growth and investment success</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Romantic relationships and social connections</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Personal transformation and spiritual growth</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Creative projects and innovative ideas</span>
            </li>
          </ul>
        </div>

        <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">Element Compatibility Guide</h2>
        <p class="mb-6 text-mystic-300 leading-relaxed">
          Your personal element combination determines how harmoniously you'll work with the Dragon's energy. 
          Here's what to expect based on your dominant elements:
        </p>

        <div class="space-y-4 mb-8">
          <div class="mystic-card p-6 border-l-4 border-green-500/50">
            <h3 class="text-lg font-cinzel font-semibold text-green-400 mb-3">Wood Element (Most Favorable)</h3>
            <p class="text-mystic-300 text-sm">
              Excellent year for growth and expansion. Your natural creativity and flexibility will be amplified. 
              Focus on new projects and personal development.
            </p>
          </div>
          <div class="mystic-card p-6 border-l-4 border-red-500/50">
            <h3 class="text-lg font-cinzel font-semibold text-red-400 mb-3">Metal Element (Challenging)</h3>
            <p class="text-mystic-300 text-sm">
              May face some resistance and conflicts. Use this energy to strengthen your resolve and overcome obstacles. 
              Patience and persistence will be key.
            </p>
          </div>
          <div class="mystic-card p-6 border-l-4 border-blue-500/50">
            <h3 class="text-lg font-cinzel font-semibold text-blue-400 mb-3">Water Element (Supportive)</h3>
            <p class="text-mystic-300 text-sm">
              Good year for wisdom and knowledge. Your adaptability will help you navigate changes successfully. 
              Focus on learning and communication.
            </p>
          </div>
        </div>

        <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">Maximizing Your Dragon Year Luck</h2>
        <p class="mb-6 text-mystic-300 leading-relaxed">
          To make the most of the Dragon's powerful energy, consider these strategic approaches:
        </p>

        <div class="mystic-card p-6 border-l-4 border-gold-500/50 mb-8">
          <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-3">Strategic Actions for 2024:</h3>
          <ul class="space-y-2 text-mystic-300 text-sm">
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Take calculated risks in career and business</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Invest in personal development and education</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Strengthen relationships and build networks</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Practice gratitude and positive thinking</span>
            </li>
          </ul>
        </div>

        <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">Personalized Dragon Year Reading</h2>
        <p class="mb-6 text-mystic-300 leading-relaxed">
          While this general forecast provides valuable insights, a personalized Bazi reading can reveal 
          exactly how the Dragon year will affect your specific chart. This detailed analysis can help you:
        </p>

        <div class="bg-gradient-to-r from-mystic-800 to-mystic-900 p-6 rounded-xl border border-gold-500/30 mb-8">
          <ul class="space-y-2 text-mystic-300">
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Identify the best months for important decisions</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Understand potential challenges and how to overcome them</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Discover hidden opportunities in your chart</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Learn specific strategies for your unique energy pattern</span>
            </li>
          </ul>
        </div>

        <p class="mb-6 text-mystic-300 leading-relaxed">
          The Year of the Dragon 2024 is a powerful time for transformation and success. By understanding 
          how this energy interacts with your personal Bazi chart, you can navigate the year with greater 
          confidence and purpose. Contact me for a personalized Dragon Year reading that will illuminate 
          your path to success in 2024.
        </p>
      `,
      category: "bazi-basics",
      categoryLabel: "Bazi Basics",
      date: "2024-01-20",
      readTime: "14 min read",
      image: "/images/blog/dragon-year-2024.jpg",
      slug: "2024-year-dragon-fortune-forecast",
      author: "玄印 (Xuan Yin)",
      tags: ["Dragon Year", "2024", "Bazi", "Chinese Astrology", "Fortune Forecast"]
    },
    {
      id: 6,
      title: "When Bitcoin Falls, What Does Destiny Say?",
      excerpt: "Explore how BaZi destiny charts and metaphysical timing reveal deeper insights into financial volatility like the August 2025 Bitcoin crash.",
      content: `
        <div class="mb-8">
          <p class="text-lg text-mystic-300 leading-relaxed mb-4">
            August 2nd, 2025: Bitcoin dropped sharply, shaking crypto investors worldwide. But from the lens of BaZi (Four Pillars of Destiny), was this purely market-driven—or was it part of a cosmic rhythm?
          </p>
        </div>

        <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">🪐 The Hidden Cycles Behind Financial Shocks</h2>
        <p class="mb-6 text-mystic-300 leading-relaxed">
          In Chinese metaphysics, financial movements aren't just numbers or trends. They're <strong>manifestations of collective Qi</strong>, responding to temporal shifts in energy, cosmic alignments, and mass psychological states.
        </p>

        <p class="mb-6 text-mystic-300 leading-relaxed">
          2025 is the <strong>Yi Si year (乙巳)</strong> in BaZi. This is a year dominated by <strong>Yin Wood over Yin Fire</strong>, a combination associated with:
        </p>

        <div class="bg-gradient-to-r from-mystic-800 to-mystic-900 p-6 rounded-xl border border-gold-500/30 mb-8">
          <ul class="space-y-2 text-mystic-300">
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span><strong>Unstable heat</strong> (fire flaring, then collapsing)</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span><strong>Surface optimism with hidden volatility</strong></span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span><strong>Financial illusion and speculative risk</strong></span>
            </li>
          </ul>
        </div>

        <p class="mb-6 text-mystic-300 leading-relaxed">
          When this energy clashes with a person's own BaZi chart—especially those with strong Fire or Wood dominance—it can trigger impulsive decisions, overconfidence in investments, or sudden wealth loss.
        </p>

        <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">📊 Bitcoin's Decline: More Than Just Numbers?</h2>
        <p class="mb-6 text-mystic-300 leading-relaxed">
          From a metaphysical perspective, August 2nd's dip may correlate with a specific energy day. For instance, in the <strong>lunar calendar</strong>, this day was a clash day (e.g., a clash between the day's stem and the year branch), which tends to trigger <strong>loss, correction, or exposure</strong> in unseen areas.
        </p>

        <p class="mb-6 text-mystic-300 leading-relaxed">
          If your personal chart is in a <strong>Wealth Clash</strong> year or running a <strong>Losing Wealth Luck cycle</strong>, you're more likely to be emotionally impacted or make poor trades.
        </p>

        <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">🔮 What Your BaZi Might Reveal</h2>
        <p class="mb-6 text-mystic-300 leading-relaxed">
          Here are a few tips:
        </p>

        <div class="space-y-4 mb-8">
          <div class="mystic-card p-6 border-l-4 border-red-500/50">
            <h3 class="text-lg font-cinzel font-semibold text-red-400 mb-3">Clash with your Wealth Star</h3>
            <p class="text-mystic-300 text-sm">
              (e.g., Day Master clashing with Output or Wealth pillars) → prone to sudden losses
            </p>
          </div>
          <div class="mystic-card p-6 border-l-4 border-orange-500/50">
            <h3 class="text-lg font-cinzel font-semibold text-orange-400 mb-3">Weak Day Master with strong Wealth</h3>
            <p class="text-mystic-300 text-sm">
              → often tempted by "get-rich-quick" schemes
            </p>
          </div>
          <div class="mystic-card p-6 border-l-4 border-yellow-500/50">
            <h3 class="text-lg font-cinzel font-semibold text-yellow-400 mb-3">Too many Fire elements in 2025</h3>
            <p class="text-mystic-300 text-sm">
              → high volatility, overreactions
            </p>
          </div>
          <div class="mystic-card p-6 border-l-4 border-green-500/50">
            <h3 class="text-lg font-cinzel font-semibold text-green-400 mb-3">Earth Day Masters (Wu, Ji)</h3>
            <p class="text-mystic-300 text-sm">
              might actually gain stability this year if they stay grounded
            </p>
          </div>
        </div>

        <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">🧘‍♂️ Energy Management Over Market Timing</h2>
        <p class="mb-6 text-mystic-300 leading-relaxed">
          Markets are ruled by data; destinies are ruled by timing.<br>
          But both can benefit from <strong>awareness and alignment</strong>.
        </p>

        <p class="mb-6 text-mystic-300 leading-relaxed">
          BaZi teaches us that it's not about <strong>beating the system</strong>, but <strong>riding the wave that matches your own fate</strong>. Knowing when to act, pause, or change strategies can make the difference between success and chaos.
        </p>

        <div class="mystic-card p-6 border-l-4 border-gold-500/50 mb-8">
          <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-3">Key Insight:</h3>
          <p class="text-mystic-300 text-sm">
            Understanding your personal wealth cycles through BaZi can help you make more informed financial decisions, 
            especially during volatile market periods like the August 2025 Bitcoin crash.
          </p>
        </div>

        <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">✍️ Final Thought</h2>
        <p class="mb-6 text-mystic-300 leading-relaxed">
          If this Bitcoin crash hit you harder than expected, maybe it's not just the market—it's your cycle calling for reflection.
        </p>

        <div class="bg-gradient-to-r from-mystic-800 to-mystic-900 p-6 rounded-xl border border-gold-500/30 mb-8">
          <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-4">Ready to Understand Your Wealth Destiny?</h3>
          <p class="text-mystic-300 mb-4">
            Would you like a personalized reading to understand your wealth luck for 2025 and beyond?
          </p>
          <p class="text-mystic-300 text-sm">
            A detailed BaZi analysis can reveal your wealth patterns, optimal investment timing, and how to navigate financial volatility based on your unique destiny chart.
          </p>
        </div>
      `,
      category: "career-timing",
      categoryLabel: "Career & Timing",
      date: "2025-08-02",
      readTime: "12 min read",
                image: "/images/blog/bitcoin-bazi-cover.jpg",
      slug: "bitcoin-crash-bazi-destiny",
      author: "玄印 (Xuan Yin)",
      tags: ["Bitcoin", "Cryptocurrency", "BaZi", "Wealth Cycles", "Financial Timing", "2025"]
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