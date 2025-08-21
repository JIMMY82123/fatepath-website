import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

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

  // Latest articles data
  const latestArticles = [
    {
      title: "BaZi Beginners Guide: Understanding Your Destiny Code",
      excerpt: "Explore the basics of traditional Chinese BaZi numerology and learn how to interpret your birth time information.",
      image: "/images/blog/bazi-beginners-guide-cover.jpg",
      slug: "bazi-beginners-guide"
    },
    {
      title: "BaZi vs MBTI Personality Comparison: Fusion of Eastern and Western Wisdom",
      excerpt: "Compare traditional Chinese BaZi numerology with modern MBTI personality types to discover common ground between Eastern and Western wisdom.",
      image: "/images/blog/bazi-mbti-personality-comparison-cover.jpg",
      slug: "bazi-mbti-personality-comparison"
    },
    {
      title: "Wealth Level Guide: Understanding Your Fortune Through BaZi",
      excerpt: "Deep analysis of wealth information in BaZi, understand your wealth level and improvement methods.",
      image: "/images/blog/bazi-wealth-level-guide-cover.jpg",
      slug: "bazi-wealth-level-guide"
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
                    阅读更多 →
                  </Link>
                </div>
              </div>
            ))}
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
