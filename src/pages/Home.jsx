import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import LazyImage from '../components/LazyImage'
import { generateAvatarUrls } from '../utils/aiAvatarGenerator'
import { ArrowRight } from 'lucide-react'

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [currentCelebrity, setCurrentCelebrity] = useState(0)

  const [testimonialsWithAvatars, setTestimonialsWithAvatars] = useState([])

  // 生成AI头像
  useEffect(() => {
    const testimonialsWithAI = generateAvatarUrls(testimonials)
    setTestimonialsWithAvatars(testimonialsWithAI)
  }, [])

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
      content: "As a financial professional, I was impressed by the accuracy of the wealth timing predictions. This ancient wisdom has modern applications that really work."
    },
    {
      name: "Lisa Wang",
      role: "HR Manager",
      content: "The career guidance from my BaZi reading helped me make the right move at the perfect time. I got a 40% salary increase and better work-life balance."
    },
    {
      name: "Robert Martinez",
      role: "Small Business Owner",
      content: "I used the wealth analysis to time my business expansion. The results were incredible - my revenue doubled within 6 months of following the guidance."
    },
    {
      name: "Jennifer Lee",
      role: "Teacher",
      content: "The love compatibility reading helped me understand why my previous relationships failed and what to look for in a partner. I'm now happily married!"
    },
    {
      name: "Alex Thompson",
      role: "Real Estate Agent",
      content: "The timing predictions for property investments were spot on. I bought and sold at the perfect moments, maximizing my profits significantly."
    },
    {
      name: "Maria Garcia",
      role: "Nurse",
      content: "I was going through a difficult time and the BaZi reading gave me clarity about my life purpose. It's amazing how accurate the personality analysis was."
    },
    {
      name: "James Wilson",
      role: "Consultant",
      content: "The wealth analysis identified my money patterns and helped me break negative cycles. My financial situation has improved dramatically since then."
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

    // Latest articles data - sorted by date (newest first) - showing only 3 most recent
  const latestArticles = [
    {
      id: 1,
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
      id: 2,
      title: "The Hidden Energy Behind ICE's Immigration Sweeps in 2025 — A BaZi Perspective",
      excerpt: "Discover how the 2025 Yi-Si year's Fire-Metal clash is manifesting in global immigration enforcement and what this cosmic energy means for your personal transformations.",
      category: 'bazi',
      tags: ['BaZi', '2025', 'Chinese Astrology', 'Immigration', 'Fire-Metal Clash', 'Destiny', 'Global Events', 'Yi-Si Year'],
      image: "/images/blog/ice-immigration-sweeps-2025-bazi-perspective-cover.jpg",
      date: "2025-01-25",
      readTime: "5 min read",
      slug: "ice-immigration-sweeps-2025-bazi-perspective"
    },
    {
      id: 3,
      title: "How to Read Your Wealth Level in BaZi: A Simple Guide to Financial Destiny",
      excerpt: "Discover how to analyze your wealth potential through BaZi reading. Learn about Wealth Stars, Day Master strength, and luck cycles that determine your financial destiny and money-making ability.",
      category: 'wealth',
      tags: ['Wealth', 'BaZi', 'Financial Destiny', 'Money', 'Chinese Astrology', 'Wealth Analysis', 'Financial Planning'],
      image: "/images/blog/bazi-wealth-level-guide-cover.jpg",
      date: "2025-01-24",
      readTime: "6 min read",
      slug: "how-to-read-wealth-level-bazi-simple-guide"
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
          playsInline
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
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

        {/* About Me Section */}
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
                Meet Your BaZi Master
              </h2>
              <p className="text-xl text-mystic-300 max-w-2xl mx-auto">
                Dedicated to helping you unlock the ancient wisdom of Chinese astrology
              </p>
            </motion.div>

            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Profile Image */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center lg:text-left"
                >
                  <div className="relative inline-block">
                    <div className="w-80 h-80 mx-auto lg:mx-0 rounded-full overflow-hidden border-4 border-gold-400 shadow-2xl">
                      <LazyImage
                        src="/images/master-profile.jpg"
                        alt="Professional BaZi Master and Chinese Astrology Expert"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-4 -right-4 bg-gold-400 rounded-full p-4 shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                  </div>
                </motion.div>

                {/* About Content */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="bg-mystic-800 rounded-lg p-8 border-l-4 border-gold-400">
                                         <h3 className="text-2xl font-bold text-white mb-4">
                       Your Trusted Guide to Ancient Wisdom
                     </h3>
                    <p className="text-mystic-300 leading-relaxed">
                      With over 15 years of dedicated study and practice in traditional Chinese astrology, 
                      I've helped thousands of individuals discover their true life path through the ancient 
                      art of BaZi (Four Pillars of Destiny) analysis.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-mystic-700 rounded-lg p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-gold-400 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white font-bold">15+</span>
                        </div>
                        <h4 className="text-lg font-semibold text-white">Years Experience</h4>
                      </div>
                      <p className="text-mystic-300 text-sm">
                        Deep expertise in traditional Chinese numerology and modern applications
                      </p>
                    </div>

                    <div className="bg-mystic-700 rounded-lg p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-gold-400 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white font-bold">5K+</span>
                        </div>
                        <h4 className="text-lg font-semibold text-white">Happy Clients</h4>
                      </div>
                      <p className="text-mystic-300 text-sm">
                        Successfully guided individuals worldwide to discover their destiny
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-mystic-700 to-mystic-800 rounded-lg p-6">
                                         <h4 className="text-xl font-bold text-white mb-4">
                       My Philosophy
                     </h4>
                    <p className="text-mystic-300 leading-relaxed">
                      "Chinese astrology isn't about predicting the future—it's about understanding 
                      your unique energy blueprint and making empowered decisions that align with 
                      your natural flow. Every person has a destiny waiting to be discovered."
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/contact"
                      className="bg-gradient-to-r from-gold-400 to-gold-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-gold-500 hover:to-gold-700 transition-all duration-300 transform hover:scale-105 text-center"
                    >
                      Schedule Consultation
                    </Link>
                    <Link
                      to="/testimonials"
                      className="border-2 border-gold-400 text-gold-400 px-8 py-4 rounded-lg font-semibold hover:bg-gold-400 hover:text-white transition-all duration-300 text-center"
                    >
                      Read My Story
                    </Link>
                  </div>
                </motion.div>
              </div>
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
                    src={testimonialsWithAvatars[currentTestimonial]?.avatar || testimonials[currentTestimonial].avatar}
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

              <div className="flex justify-center mt-8 space-x-1.5">
                {testimonials.map((_, index) => (
                   <button
                     key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
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

              <div className="flex justify-center mt-8 space-x-1.5">
                {celebrities.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCelebrity(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentCelebrity ? 'bg-gold-400' : 'bg-mystic-600'
                    }`}
                    aria-label={`View celebrity ${index + 1}`}
                  />
                ))}
                  </div>
                 </div>
                  </div>
        </section>

        {/* Latest Articles Section */}
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
                Discover ancient wisdom through our latest articles
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {latestArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-mystic-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-mystic-700/50"
                >
                  <Link to={`/blog/${article.slug}`}>
                    <div className="w-full h-48 bg-mystic-700 overflow-hidden">
                      <LazyImage
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-mystic-300 mb-3">
                        <span>{article.date}</span>
                        <span className="mx-2">•</span>
                        <span>{article.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-mystic-300 mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.slice(0, 2).map((tag, tagIndex) => (
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
                </motion.article>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link
                to="/blog"
                className="inline-flex items-center px-8 py-4 bg-mystic-700 text-white rounded-lg hover:bg-mystic-600 transition-all duration-300 font-semibold"
              >
                View All Articles
                <span className="ml-2">→</span>
              </Link>
            </motion.div>
          </div>
        </section>

                 {/* Chinese Oracle Tradition Section */}
         <section className="py-20 bg-mystic-900">
           <div className="container mx-auto px-4">
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               viewport={{ once: true }}
               className="text-center mb-16"
             >
               <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-6">
                 Ancient Chinese Oracle Tradition
               </h2>
               <p className="text-xl text-mystic-300 max-w-3xl mx-auto leading-relaxed">
                 For over 3,000 years, Chinese oracle reading has guided emperors, scholars, and common people 
                 through life's most important decisions. This sacred practice connects you with ancient wisdom 
                 to illuminate your path forward.
               </p>
             </motion.div>

             <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
               {/* Left Content */}
               <motion.div
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.8 }}
                 viewport={{ once: true }}
               >
                 <h3 className="text-2xl font-bold text-white mb-6">What Is Chinese Oracle Reading?</h3>
                 <div className="space-y-4 text-mystic-300 leading-relaxed">
                   <p>
                     Chinese oracle reading, known as "Qiú Qiān" (求签), is an ancient divination practice 
                     where wooden sticks or bamboo slips are drawn to receive guidance from the universe. 
                     Each oracle contains profound wisdom from Taoist and Buddhist teachings.
                   </p>
                   <p>
                     Unlike fortune telling, oracle reading provides spiritual guidance to help you understand 
                     your current situation, recognize opportunities, and make decisions aligned with cosmic energy.
                   </p>
                 </div>
               </motion.div>

               {/* Right Content */}
               <motion.div
                 initial={{ opacity: 0, x: 30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.8 }}
                 viewport={{ once: true }}
                 className="space-y-6"
               >
                 <div className="bg-mystic-800 rounded-lg p-6 border-l-4 border-yellow-400">
                   <h4 className="text-yellow-400 font-semibold mb-3">Historical Origins</h4>
                   <p className="text-mystic-300 text-sm">
                     Dating back to the Han Dynasty, oracle reading was practiced in temples and royal courts. 
                     The wisdom comes from ancient texts like the I Ching and teachings of Confucius.
                   </p>
                 </div>
                 
                 <div className="bg-mystic-800 rounded-lg p-6 border-l-4 border-yellow-400">
                   <h4 className="text-yellow-400 font-semibold mb-3">Sacred Process</h4>
                   <p className="text-mystic-300 text-sm">
                     Traditional oracle reading involves purifying the mind, asking a sincere question, 
                     and drawing a bamboo stick that reveals a poetic verse with deep symbolic meaning.
                   </p>
                 </div>
               </motion.div>
             </div>

             {/* How It Helps Section */}
             <div className="bg-mystic-800/40 rounded-2xl p-8 mb-16">
               <h3 className="text-2xl font-bold text-yellow-400 text-center mb-8">How Oracle Reading Can Help You</h3>
               
               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <div className="text-center p-4">
                   <div className="text-yellow-400 font-bold text-lg mb-3">Clarity in Confusion</div>
                   <p className="text-mystic-300 text-sm">
                     When facing difficult decisions, oracle guidance helps you see beyond immediate emotions 
                     and understand the deeper patterns at play.
                   </p>
                 </div>
                 
                 <div className="text-center p-4">
                   <div className="text-yellow-400 font-bold text-lg mb-3">Timing Awareness</div>
                   <p className="text-mystic-300 text-sm">
                     Learn when to act and when to wait. Ancient wisdom teaches that timing is crucial 
                     for success in any endeavor.
                   </p>
                 </div>
                 
                 <div className="text-center p-4">
                   <div className="text-yellow-400 font-bold text-lg mb-3">Inner Peace</div>
                   <p className="text-mystic-300 text-sm">
                     Oracle messages provide comfort and reassurance, helping you trust in life's natural 
                     flow and find peace in uncertainty.
                   </p>
                 </div>
                 
                 <div className="text-center p-4">
                   <div className="text-yellow-400 font-bold text-lg mb-3">Spiritual Growth</div>
                   <p className="text-mystic-300 text-sm">
                     Regular oracle practice deepens your connection to ancient wisdom and helps you 
                     develop intuition and spiritual insight.
                   </p>
                 </div>
               </div>
             </div>

             {/* Modern Application */}
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               viewport={{ once: true }}
               className="text-center mb-12"
             >
               <h3 className="text-2xl font-bold text-white mb-6">Ancient Wisdom for Modern Life</h3>
               <p className="text-mystic-300 text-lg max-w-4xl mx-auto leading-relaxed mb-8">
                 Today's digital oracle preserves the essence of traditional Chinese divination while making 
                 it accessible to people worldwide. Each reading connects you with the same timeless wisdom 
                 that has guided countless generations through life's challenges and opportunities.
               </p>
               
               <Link 
                 to="/wealth-sign" 
                 className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105"
               >
                 <span className="mr-3">Experience Traditional Oracle Reading</span>
                 <ArrowRight className="w-5 h-5" />
               </Link>
               
               <p className="text-sm text-gray-400 mt-4">
                 Free • Authentic • Respectful of Ancient Traditions
               </p>
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

 