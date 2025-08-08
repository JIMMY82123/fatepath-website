import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import LazyImage from '../components/LazyImage'

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [currentCelebrity, setCurrentCelebrity] = useState(0)

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
      content: "I was skeptical at first, but the love compatibility analysis was spot on. It helped me understand my relationship dynamics better than any therapy session.",
      avatar: "/images/testimonials/michael-chen.jpg"
    },
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      content: "The wealth analysis revealed patterns I never noticed. I've been making better financial decisions since my reading, and the results speak for themselves.",
      avatar: "/images/testimonials/sarah-johnson.jpg"
    },
    {
      name: "David Kim",
      role: "Financial Advisor",
      content: "As a financial professional, I was impressed by the accuracy of the wealth timing predictions. This ancient wisdom has modern applications that really work.",
      avatar: "/images/testimonials/emma-rodriguez.jpg"
    },
    {
      name: "Lisa Wang",
      role: "HR Manager",
      content: "The career guidance from my BaZi reading helped me make the right move at the perfect time. I got a 40% salary increase and better work-life balance.",
      avatar: "/images/testimonials/michael-chen.jpg"
    },
    {
      name: "Robert Martinez",
      role: "Small Business Owner",
      content: "I used the wealth analysis to time my business expansion. The results were incredible - my revenue doubled within 6 months of following the guidance.",
      avatar: "/images/testimonials/sarah-johnson.jpg"
    },
    {
      name: "Jennifer Lee",
      role: "Teacher",
      content: "The love compatibility reading helped me understand why my previous relationships failed and what to look for in a partner. I'm now happily married!",
      avatar: "/images/testimonials/emma-rodriguez.jpg"
    },
    {
      name: "Alex Thompson",
      role: "Real Estate Agent",
      content: "The timing predictions for property investments were spot on. I bought and sold at the perfect moments, maximizing my profits significantly.",
      avatar: "/images/testimonials/michael-chen.jpg"
    },
    {
      name: "Maria Garcia",
      role: "Nurse",
      content: "I was going through a difficult time and the BaZi reading gave me clarity about my life purpose. It's amazing how accurate the personality analysis was.",
      avatar: "/images/testimonials/sarah-johnson.jpg"
    },
    {
      name: "James Wilson",
      role: "Consultant",
      content: "The wealth analysis identified my money patterns and helped me break negative cycles. My financial situation has improved dramatically since then.",
      avatar: "/images/testimonials/emma-rodriguez.jpg"
    }
  ]

  const celebrities = [
    {
      name: "Madonna",
      image: "/images/celebrities/madonna.jpg",
      quote: "I've always been fascinated by numerology and its connection to destiny."
    },
    {
      name: "Tom Cruise",
      image: "/images/celebrities/tom-cruise.jpg", 
      quote: "Understanding your life path through ancient wisdom can be transformative."
    },
    {
      name: "Oprah Winfrey",
      image: "/images/celebrities/oprah-winfrey.jpg",
      quote: "The universe speaks to us through numbers and patterns."
    }
  ]

  const blogPosts = [
    {
      title: "BaZi vs MBTI: Understanding Personality Through Different Lenses",
      excerpt: "Explore how traditional Chinese BaZi analysis compares to modern MBTI personality typing...",
      image: "/images/blog/bazi-mbti-comparison.jpg",
      date: "2024-01-15",
      readTime: "5 min read"
    },
    {
      title: "The Four Seasons of Fate: How Your Birth Season Influences Your Life Path",
      excerpt: "Discover how the season of your birth shapes your personality, strengths, and life journey...",
      image: "/images/blog/seasons-fate-cover.jpg",
      date: "2024-01-10",
      readTime: "7 min read"
    },
    {
      title: "Bitcoin and BaZi: Cryptocurrency Timing Through Ancient Wisdom",
      excerpt: "Learn how traditional Chinese numerology can guide your cryptocurrency investment timing...",
      image: "/images/blog/bitcoin-bazi-cover.jpg",
      date: "2024-01-05",
      readTime: "6 min read"
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
    <>
      <SEO 
        title="Feeling Lost? Find Your Life Direction with Chinese Astrology | Professional BaZi Reading Service"
        description="Feeling stuck in life? Discover your true life direction with professional Chinese astrology and BaZi reading. Get clarity on your purpose, career path, and relationships. Free BaZi chart analysis for those seeking life guidance."
        keywords="feeling lost, life direction, stuck in life, chinese astrology, bazi reading, free bazi chart analysis, chinese numerology expert, bazi career guidance, bazi love compatibility, bazi wealth analysis, online chinese astrology consultation, bazi master consultation, traditional chinese astrology, bazi chart calculator, bazi relationship reading, bazi life path analysis, chinese astrology reading, four pillars of destiny, life purpose, career guidance, relationship advice"
        author="FatePath"
        ogTitle="Feeling Lost? Find Your Life Direction with Chinese Astrology | Professional BaZi Reading Service"
        ogDescription="Feeling stuck in life? Discover your true life direction with professional Chinese astrology and BaZi reading. Get clarity on your purpose, career path, and relationships."
        ogImage="https://fatepath.me/og-image.svg"
        ogUrl="https://fatepath.me/"
        twitterTitle="Feeling Lost? Find Your Life Direction with Chinese Astrology | Professional BaZi Reading Service"
        twitterDescription="Feeling stuck in life? Discover your true life direction with professional Chinese astrology and BaZi reading. Get clarity on your purpose, career path, and relationships."
        twitterImage="https://fatepath.me/og-image.svg"
      />

      <main className="min-h-screen bg-mystic-900">
        {/* Hero Section */}
        <header className="relative overflow-hidden">
        <video
          autoPlay
          loop
          muted
            className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src="/video-background.mp4" type="video/mp4" />
        </video>
          
          <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.div 
              initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Feeling Lost?
                <span className="block text-gold-400">Find Your Life Direction</span>
              </h1>
              <p className="text-xl md:text-2xl text-mystic-300 mb-8 max-w-3xl mx-auto">
                Stuck in life? Unlock the ancient wisdom of Chinese astrology with professional BaZi readings. 
                Discover your true life purpose, career direction, and relationship path through traditional Chinese numerology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/services"
                  className="bg-gradient-to-r from-gold-400 to-gold-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-gold-500 hover:to-gold-700 transition-all duration-300 transform hover:scale-105"
                >
                  Get Free BaZi Report
                </Link>
                <Link
                  to="/services"
                  className="border-2 border-gold-400 text-gold-400 px-8 py-4 rounded-lg font-semibold hover:bg-gold-400 hover:text-white transition-all duration-300"
                >
                  View Services
                </Link>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Services Preview */}
        <section className="py-20 bg-mystic-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Professional Services
              </h2>
              <p className="text-xl text-mystic-300 max-w-2xl mx-auto">
                Expert BaZi analysis for every aspect of your life journey
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-mystic-700 rounded-lg p-8 text-center hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gold-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">BaZi Reading</h3>
                <p className="text-mystic-300 mb-6">
                  Comprehensive analysis of your birth chart revealing personality traits, 
                  life purpose, and optimal timing for important decisions.
                </p>
                <Link
                  to="/services"
                  className="bg-gold-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gold-500 transition-colors"
                >
                  Get Reading
                </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-mystic-700 rounded-lg p-8 text-center hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gold-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                    </div>
                <h3 className="text-2xl font-bold text-white mb-4">Love Compatibility</h3>
                <p className="text-mystic-300 mb-6">
                  Deep analysis of relationship compatibility using traditional 
                  Chinese numerology principles and modern psychology.
                </p>
              <Link
                to="/services"
                  className="bg-gold-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gold-500 transition-colors"
              >
                  Check Compatibility
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-mystic-700 rounded-lg p-8 text-center hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gold-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  </div>
                <h3 className="text-2xl font-bold text-white mb-4">Wealth Analysis</h3>
                <p className="text-mystic-300 mb-6">
                  Discover your wealth potential and optimal timing for financial 
                  decisions through ancient Chinese prosperity principles.
                </p>
                    <Link
                  to="/services"
                  className="bg-gold-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gold-500 transition-colors"
                    >
                  Analyze Wealth
                    </Link>
              </motion.div>
                    </div>
                  </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-mystic-900">
          <div className="container mx-auto px-4">
          <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                What Our Clients Say
                </h2>
              <p className="text-xl text-mystic-300">
                Real experiences from people who discovered their destiny path
              </p>
              </motion.div>
              
            <div className="max-w-4xl mx-auto">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-mystic-800 rounded-lg p-8 text-center"
              >
                <div className="flex items-center justify-center mb-6">
                  <LazyImage
                    src={testimonials[currentTestimonial].avatar}
                    alt={`${testimonials[currentTestimonial].name} - ${testimonials[currentTestimonial].role}`}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                    </div>
                <p className="text-lg text-mystic-300 mb-4 italic">
                  "{testimonials[currentTestimonial].content}"
                </p>
                <h4 className="text-xl font-bold text-white">
                  {testimonials[currentTestimonial].name}
                </h4>
                <p className="text-gold-400">{testimonials[currentTestimonial].role}</p>
          </motion.div>

              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                   <button
                     key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-gold-400' : 'bg-mystic-600'
                    }`}
                    aria-label={`View testimonial ${index + 1}`}
                   />
                 ))}
               </div>
            </div>
            </div>
        </section>

        {/* Celebrity Section */}
        <section className="py-20 bg-mystic-800">
          <div className="container mx-auto px-4">
                                                   <motion.div
                    initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Even Celebrities Believe
              </h2>
              <p className="text-xl text-mystic-300">
                Famous personalities who embrace ancient wisdom
                     </p>
                 </motion.div>

            <div className="max-w-4xl mx-auto">
              <motion.div
                key={currentCelebrity}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <LazyImage
                  src={celebrities[currentCelebrity].image}
                  alt={`${celebrities[currentCelebrity].name} - Celebrity endorsement`}
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-6"
                />
                <blockquote className="text-xl text-mystic-300 mb-4 italic">
                  "{celebrities[currentCelebrity].quote}"
                </blockquote>
                <cite className="text-lg font-bold text-gold-400">
                  — {celebrities[currentCelebrity].name}
                </cite>
          </motion.div>

              <div className="flex justify-center mt-8 space-x-2">
                {celebrities.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCelebrity(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentCelebrity ? 'bg-gold-400' : 'bg-mystic-600'
                    }`}
                    aria-label={`View celebrity ${index + 1}`}
                  />
                ))}
                  </div>
                 </div>
                  </div>
        </section>

        {/* Blog Preview */}
        <section className="py-20 bg-mystic-900">
          <div className="container mx-auto px-4">
               <motion.div
                 initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Latest Insights
              </h2>
              <p className="text-xl text-mystic-300">
                Discover the wisdom of ancient Chinese numerology
              </p>
          </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-mystic-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
                >
                  <LazyImage
                      src={post.image}
                    alt={`${post.title} - Blog post thumbnail`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center text-sm text-mystic-400 mb-3">
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
                    <Link
                      to="/blog"
                      className="text-gold-400 hover:text-gold-300 font-semibold transition-colors"
                    >
                      Read More →
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link
                to="/blog"
                className="bg-gold-400 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gold-500 transition-colors"
              >
                View All Articles
              </Link>
            </motion.div>
            </div>
        </section>

          {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-mystic-800 to-mystic-900">
          <div className="container mx-auto px-4 text-center">
          <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Discover Your Destiny?
              </h2>
              <p className="text-xl text-mystic-300 mb-8 max-w-2xl mx-auto">
                Get your free BaZi report today and unlock the ancient wisdom 
                that will guide your life's journey.
              </p>
                <Link
                  to="/services"
                className="bg-gradient-to-r from-gold-400 to-gold-600 text-white px-10 py-5 rounded-lg text-xl font-bold hover:from-gold-500 hover:to-gold-700 transition-all duration-300 transform hover:scale-105"
              >
                Start Your Free Reading
                </Link>
          </motion.div>
        </div>
        </section>
      </main>
    </>
  )
}

export default Home 