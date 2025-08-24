import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [currentCelebrity, setCurrentCelebrity] = useState(0)

  // Testimonials data
  const testimonials = [
    {
      name: "Emma Rodriguez",
      role: "Entrepreneur",
      content: "The BaZi reading completely changed my perspective on career timing. I made a major business decision based on the insights, and it's been incredibly successful.",
      avatar: "/images/testimonials/emma-rodriguez.jpg"
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      content: "Through BaZi analysis, I found the career path that suits me best. Now I feel more purposeful and fulfilled in my work.",
      avatar: "/images/testimonials/michael-chen.jpg"
    },
    {
      name: "Sarah Johnson",
      role: "Marketing Manager",
      content: "The BaZi reading helped me understand my relationship patterns. I can now handle both work and personal relationships much better.",
      avatar: "/images/testimonials/sarah-johnson.jpg"
    }
  ]

  // Celebrities data
  const celebrities = [
    {
      name: "Madonna",
      description: "Pop music queen, understand her success timing through BaZi analysis",
      image: "/images/celebrities/madonna.jpg"
    },
    {
      name: "Oprah Winfrey",
      description: "Media mogul, BaZi reveals her wealth code",
      image: "/images/celebrities/oprah-winfrey.jpg"
    },
    {
      name: "Tom Cruise",
      description: "Hollywood superstar, BaZi analysis of his career trajectory",
      image: "/images/celebrities/tom-cruise.jpg"
    }
  ]

  // Latest articles data - Updated to show the 3 most recent articles
  const latestArticles = [
    {
      title: "Lighting a Ding Fire in an Autumn Metal Month",
      excerpt: "A BaZi case study: How to cultivate Wood and choose STEM roles for a Ding Fire person born in autumn Metal season. Practical guidance for personal development and career success.",
      image: "/images/blog/ding-fire-autumn-metal-cover.jpg",
      slug: "lighting-ding-fire-autumn-metal"
    },
    {
      title: "The Right Person Is Not the One You Have to Chase",
      excerpt: "A poetic exploration of what true love looks like—not the dramatic chase, but the quiet moments of being seen, understood, and properly placed in someone's life.",
      image: "/images/blog/right-person-not-chase-cover.jpg",
      slug: "right-person-not-chase"
    },
    {
      title: "The Hidden Energy Behind ICE's Immigration Sweeps in 2025 — A BaZi Perspective",
      excerpt: "Discover how the 2025 Yi-Si year's Fire-Metal clash is manifesting in global immigration enforcement and what this cosmic energy means for your personal transformations.",
      image: "/images/blog/ice-immigration-sweeps-2025-bazi-perspective-cover.jpg",
      slug: "ice-immigration-sweeps-2025-bazi-perspective"
    }
  ]

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    const celebrityInterval = setInterval(() => {
      setCurrentCelebrity((prev) => (prev + 1) % celebrities.length)
    }, 4000)

    return () => {
      clearInterval(testimonialInterval)
      clearInterval(celebrityInterval)
    }
  }, [testimonials.length, celebrities.length])

  return (
    <main className="min-h-screen bg-mystic-900">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Feeling Lost?
              <span className="block text-gold-400">Find Your Life Direction</span>
            </h1>
            <p className="text-xl md:text-2xl text-mystic-300 mb-8 max-w-3xl mx-auto">
              Stuck in life? Unlock the ancient wisdom of Chinese astrology with professional BaZi readings. 
              Discover your true life purpose, career direction, and relationship path through traditional Chinese numerology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/free-bazi-report" className="bg-gradient-to-r from-gold-400 to-gold-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-gold-500 hover:to-gold-700 transition-all duration-300 transform hover:scale-105">
                Get Free BaZi Report
              </Link>
              <Link to="/services" className="border-2 border-gold-400 text-gold-400 px-8 py-4 rounded-lg font-semibold hover:bg-gold-400 hover:text-white transition-all duration-300">
                View Services
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* 推荐部分 */}
      <section className="py-20 bg-mystic-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Client Testimonials
            </h2>
            <p className="text-xl text-mystic-300 max-w-2xl mx-auto">
              Hear how others have transformed their lives through BaZi readings
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-mystic-700 rounded-lg p-8 text-center">
              <div className="mb-6">
                <img 
                  src={testimonials[currentTestimonial].avatar} 
                  alt={testimonials[currentTestimonial].name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  onError={(e) => {
                    e.target.src = "/images/testimonials/default-avatar.svg"
                  }}
                />
              </div>
              <blockquote className="text-xl text-mystic-200 mb-4 italic">
                "{testimonials[currentTestimonial].content}"
              </blockquote>
              <div className="text-gold-400 font-semibold">
                {testimonials[currentTestimonial].name}
              </div>
              <div className="text-mystic-400">
                {testimonials[currentTestimonial].role}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 名人分析部分 */}
      <section className="py-20 bg-mystic-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Celebrity BaZi Analysis
            </h2>
            <p className="text-xl text-mystic-300 max-w-2xl mx-auto">
              Explore the BaZi codes of successful people and understand their timing for success
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-mystic-800 rounded-lg p-8 text-center">
              <div className="mb-6">
                <img 
                  src={celebrities[currentCelebrity].image} 
                  alt={celebrities[currentCelebrity].name}
                  className="w-32 h-32 rounded-lg mx-auto mb-4 object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {celebrities[currentCelebrity].name}
              </h3>
              <p className="text-mystic-300">
                {celebrities[currentCelebrity].description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 最新文章部分 */}
      <section className="py-20 bg-mystic-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Latest Articles
            </h2>
            <p className="text-xl text-mystic-300 max-w-2xl mx-auto">
              Deep dive into BaZi numerology and life wisdom
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {latestArticles.map((article, index) => (
              <div key={index} className="bg-mystic-700 rounded-lg overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">
                    {article.title}
                  </h3>
                  <p className="text-mystic-300 mb-4">
                    {article.excerpt}
                  </p>
                  <Link 
                    to={`/blog/${article.slug}`}
                    className="text-gold-400 hover:text-gold-300 font-semibold"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 抽签入口板块 */}
      <section className="py-20 bg-mystic-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ancient Chinese Wisdom Oracle
            </h2>
            <p className="text-xl text-mystic-300 max-w-2xl mx-auto">
              Experience the mystical power of traditional Chinese divination
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            {/* 主要介绍卡片 */}
            <div className="bg-gradient-to-r from-gold-500/20 to-orange-500/20 border border-gold-500/30 rounded-2xl p-8 text-center mb-8">
              <div className="mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-gold-400 to-orange-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Divine Your Fortune
              </h3>
              <p className="text-lg text-mystic-200 mb-6 max-w-2xl mx-auto">
                Connect with ancient Chinese wisdom through our interactive oracle system. 
                Ask your questions and receive guidance from the traditional divination methods.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/wealth-sign" 
                  className="bg-gradient-to-r from-gold-400 to-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-gold-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105"
                >
                  Start Oracle Reading
                </Link>
                <Link 
                  to="/services" 
                  className="border-2 border-gold-400 text-gold-400 px-8 py-4 rounded-lg font-semibold hover:bg-gold-400 hover:text-white transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* 玄音系统详细介绍 */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* 文化背景 */}
              <div className="bg-mystic-800/50 border border-mystic-700 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">🏛️</span>
                  </div>
                  <h4 className="text-xl font-semibold text-white">Cultural Heritage</h4>
                </div>
                <p className="text-mystic-300 leading-relaxed">
                  The Ancient Chinese Wisdom Oracle draws from centuries of Chinese philosophical tradition, 
                  combining traditional wisdom with modern psychology to provide meaningful guidance for life 
                  decisions and personal development.
                </p>
              </div>

              {/* 功能特点 */}
              <div className="bg-mystic-800/50 border border-mystic-700 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">🔮</span>
                  </div>
                  <h4 className="text-xl font-semibold text-white">Wisdom Levels</h4>
                </div>
                <p className="text-mystic-300 leading-relaxed">
                  Our oracle system features five wisdom levels: Excellent (上上签), Good (上签), 
                  Neutral (中签), Challenging (下签), and Very Challenging (下下签), each providing 
                  unique insights for your life journey.
                </p>
              </div>

              {/* 使用方法 */}
              <div className="bg-mystic-800/50 border border-mystic-700 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">🧘‍♀️</span>
                  </div>
                  <h4 className="text-xl font-semibold text-white">Sacred Ritual</h4>
                </div>
                <p className="text-mystic-300 leading-relaxed">
                  Experience our sacred meditation ritual before drawing your wisdom card. 
                  This ancient practice helps focus your intention and connect with the 
                  spiritual energy of the oracle system.
                </p>
              </div>

              {/* 现代应用 */}
              <div className="bg-mystic-800/50 border border-mystic-700 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">💡</span>
                  </div>
                  <h4 className="text-xl font-semibold text-white">Modern Application</h4>
                </div>
                <p className="text-mystic-300 leading-relaxed">
                  Each wisdom card represents different levels of insight and offers practical 
                  advice for modern life challenges, helping you make informed decisions 
                  in career, relationships, and personal growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 行动召唤部分 */}
      <section className="py-20 bg-mystic-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Start Your Destiny Journey
          </h2>
          <p className="text-xl text-mystic-300 mb-8 max-w-2xl mx-auto">
            Discover your life code through professional BaZi readings and find your true direction
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/bazi-form" className="bg-gradient-to-r from-gold-400 to-gold-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-gold-500 hover:to-gold-700 transition-all duration-300">
              Start BaZi Reading
            </Link>
            <Link to="/contact" className="border-2 border-gold-400 text-gold-400 px-8 py-4 rounded-lg font-semibold hover:bg-gold-400 hover:text-white transition-all duration-300">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
