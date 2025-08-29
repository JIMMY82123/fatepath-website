import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Tag } from 'lucide-react'
import SEO from '../components/SEO'

const Blog = () => {
  // SEO structured data for better search indexing
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "FatePath BaZi & Chinese Astrology Blog",
    "description": "Expert insights on BaZi analysis, Chinese astrology, and life destiny through ancient wisdom and modern interpretation.",
    "url": "https://fatepath.me/blog",
    "publisher": {
      "@type": "Organization",
      "name": "FatePath",
      "url": "https://fatepath.me"
    },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": 13,
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
            "name": "FatePath"
          }
        }
      }))
    }
  }
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
    { id: 'all', name: 'All Articles', count: 13 },
    { id: 'bazi', name: 'BaZi Analysis', count: 8 },
    { id: 'love', name: 'Love & Relationships', count: 2 },
    { id: 'wealth', name: 'Wealth & Career', count: 3 }
  ]

  const blogPosts = [
    {
      id: 19,
      title: "US Increases Naval Presence Near South America, Citing Drug War; Tension Rises in Venezuela. An Analysis Pointing Towards Global Turmoil in the Coming 'Red Horse & Red Sheep' Years",
      excerpt: "Deep analysis of US military deployment in Latin America and its connection to the upcoming Bingwu (丙午) and Dingwei (丁未) years (2026-2027) - the 'Red Horse and Red Sheep' omen. Explore how geopolitical tensions, economic crises, and social contradictions converge to create a perfect storm of global instability.",
      category: 'bazi',
      tags: ['Global Analysis', 'Red Horse Red Sheep', 'Bingwu Dingwei', '2026-2027', 'Geopolitics', 'US Military', 'Latin America', 'Venezuela', 'Global Turmoil', 'Chinese Astrology', 'Historical Cycles', 'Economic Crisis', 'Social Unrest'],
      image: "/images/blog/red-horse-red-sheep-global-turmoil-2026-2027-cover.jpg",
      date: "2025-01-26",
      readTime: "15 min read",
      slug: "red-horse-red-sheep-global-turmoil-2026-2027"
    },
    {
      id: 18,
      title: "Lighting a Ding Fire in an Autumn Metal Month: Advanced BaZi Career Analysis",
      excerpt: "Master the art of reading challenging BaZi combinations with this in-depth case study. Learn how a Ding Fire person born in autumn Metal season can overcome elemental conflicts, cultivate supportive Wood energy, and strategically choose STEM careers that align with their destiny. Includes practical strategies for personal development and professional success.",
      category: 'bazi',
      tags: ['BaZi Analysis', 'Career Guidance', 'Ding Fire', 'Wood Element', 'Metal Season', 'STEM Roles', 'Personal Development', 'Elemental Conflicts', 'Destiny Reading'],
      image: "/images/blog/ding-fire-autumn-metal-cover.jpg",
      date: "2025-08-22",
      readTime: "12 min read",
      slug: "lighting-ding-fire-autumn-metal"
    },
    {
      id: 17,
      title: "The Right Person Is Not the One You Have to Chase",
      excerpt: "A poetic exploration of what true love looks like—not the dramatic chase, but the quiet moments of being seen, understood, and properly placed in someone's life.",
      category: 'love',
      tags: ['Love', 'Relationships', 'True Love', 'Emotional Wisdom', 'Life Lessons', 'Personal Growth', 'Romance', 'Self-Discovery'],
      image: "/images/blog/right-person-not-chase-cover.jpg",
      date: "2025-08-18",
      readTime: "4 min read",
      slug: "right-person-not-chase"
    },
    {
      id: 16,
      title: "The Hidden Energy Behind ICE's Immigration Sweeps in 2025 — A BaZi Perspective",
      excerpt: "Unlock the cosmic secrets of 2025's Yi-Si year through advanced BaZi analysis. Discover how the Fire-Metal clash manifests in global immigration enforcement, economic shifts, and personal transformation cycles. Learn to navigate these powerful energies for career advancement, relationship harmony, and spiritual growth.",
      category: 'bazi',
      tags: ['BaZi', '2025', 'Chinese Astrology', 'Immigration', 'Fire-Metal Clash', 'Destiny', 'Global Events', 'Yi-Si Year', 'Economic Cycles', 'Personal Transformation', 'Career Advancement'],
      image: "/images/blog/ice-immigration-sweeps-2025-bazi-perspective-cover.jpg",
      date: "2025-01-25",
      readTime: "8 min read",
      slug: "ice-immigration-sweeps-2025-bazi-perspective"
    },
    {
      id: 15,
      title: "Complete Life Destiny Guide: Health, Love & Wealth Through BaZi Analysis",
      excerpt: "Master the art of reading your life's blueprint through comprehensive BaZi analysis. Discover your health cycles, relationship patterns, and wealth potential with actionable strategies for each life area.",
      category: 'bazi',
      tags: ['BaZi Analysis', 'Life Destiny', 'Health Cycles', 'Relationship Patterns', 'Wealth Potential', 'Chinese Astrology', 'Personal Development', 'Life Planning'],
      image: "/images/blog/complete-life-destiny-guide-cover.jpg",
      date: "2025-01-24",
      readTime: "15 min read",
      slug: "complete-life-destiny-guide-bazi-analysis"
    },
    {
      id: 14,
      title: "The Four Seasons of Fate: How Your Birth Season Influences Your Life Path",
      excerpt: "Discover how your birth season shapes your personality, strengths, and life journey through ancient Chinese wisdom and seasonal energy patterns.",
      category: 'bazi',
      tags: ['Seasons', 'BaZi', 'Chinese Astrology', 'Personality', 'Life Path', 'Seasonal Energy'],
      image: "/images/blog/seasons-fate-cover.jpg",
      date: "2025-01-18",
      readTime: "7 min read",
      slug: "seasons-fate-cycles"
    },
    {
      id: 13,
      title: "BaZi vs MBTI: Understanding Personality Through Different Lenses",
      excerpt: "Compare Eastern and Western personality systems to gain deeper insights into your character, strengths, and potential for personal growth.",
      category: 'bazi',
      tags: ['BaZi', 'MBTI', 'Personality', 'Chinese Astrology', 'Psychology', 'Self-Discovery'],
      image: "/images/blog/bazi-mbti-comparison-cover.jpg",
      date: "2025-01-17",
      readTime: "8 min read",
      slug: "bazi-vs-mbti-personality-destiny"
    },
    {
      id: 12,
      title: "The Dragon Year 2024: Fortune Forecast",
      excerpt: "Navigate the powerful Dragon year energy with strategic insights for career, relationships, and personal development based on ancient Chinese wisdom.",
      category: 'bazi',
      tags: ['Dragon Year', '2024', 'Chinese Astrology', 'Fortune', 'Career', 'Relationships'],
      image: "/images/blog/dragon-year-2024-cover.jpg",
      date: "2025-01-16",
      readTime: "6 min read",
      slug: "dragon-year-2024-fortune-forecast"
    },
    {
      id: 11,
      title: "Protection Talismans: Ancient Wisdom for Modern Life",
      excerpt: "Discover how traditional Chinese talismans can protect and enhance your life energy, relationships, and career success in today's world.",
      category: 'bazi',
      tags: ['Talismans', 'Protection', 'Chinese Astrology', 'Energy', 'Spirituality', 'Modern Life'],
      image: "/images/blog/protection-talismans-cover.jpg",
      date: "2025-01-15",
      readTime: "7 min read",
      slug: "protection-talismans-ancient-wisdom"
    },
    {
      id: 10,
      title: "Advanced BaZi Analysis: Reading Your Wealth Level and Financial Destiny",
      excerpt: "Master the complex art of wealth analysis in BaZi. Learn to identify Wealth Stars, assess Day Master strength, and understand how luck cycles determine your financial potential and money-making strategies.",
      category: 'wealth',
      tags: ['Wealth Analysis', 'Financial Destiny', 'BaZi Mastery', 'Wealth Stars', 'Day Master Strength', 'Luck Cycles', 'Money Strategies', 'Chinese Astrology'],
      image: "/images/blog/advanced-bazi-wealth-analysis-cover.jpg",
      date: "2025-01-14",
      readTime: "12 min read",
      slug: "advanced-bazi-wealth-analysis-mastery"
    },
    {
      id: 9,
      title: "The Five Elements in Love: Finding Your Perfect Match",
      excerpt: "Unlock the secrets of romantic compatibility through the Five Elements (五行) system. Learn how Wood, Fire, Earth, Metal, and Water energies create harmony or conflict in relationships.",
      category: 'love',
      tags: ['Love', 'Five Elements', 'Relationships', 'Compatibility'],
      image: "/images/blog/five-elements-love-cover.jpg",
      date: "2025-01-10",
      readTime: "7 min read",
      slug: "five-elements-love-perfect-match"
    },
    {
      id: 8,
      title: "Wealth Archetypes in Chinese Astrology: Your Financial Personality Revealed",
      excerpt: "Discover your unique wealth personality type through advanced BaZi analysis. Learn how your birth chart reveals your financial potential, investment style, and the best strategies for wealth accumulation in your specific element combination.",
      category: 'wealth',
      tags: ['Wealth Archetypes', 'Financial Personality', 'BaZi Analysis', 'Investment Style', 'Wealth Strategies', 'Chinese Astrology', 'Financial Planning'],
      image: "/images/blog/wealth-archetypes-cover.jpg",
      date: "2025-01-05",
      readTime: "10 min read",
      slug: "wealth-archetypes-chinese-astrology"
    },
    {
      id: 7,
      title: "Understanding Your BaZi Chart: A Comprehensive Beginner's Guide",
      excerpt: "Master the fundamentals of BaZi (八字) analysis with this comprehensive guide. Discover how your birth chart reveals your life's blueprint, personality traits, and destiny path through ancient Chinese wisdom and modern interpretation techniques.",
      category: 'bazi',
      tags: ['BaZi Fundamentals', 'Chinese Astrology', 'Birth Chart Analysis', 'Destiny Reading', 'Five Elements', 'Beginner Guide', 'Life Blueprint'],
      image: "/images/blog/bazi-beginners-guide-cover.jpg",
      date: "2025-01-03",
      readTime: "8 min read",
      slug: "understanding-bazi-chart-beginners-guide"
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
