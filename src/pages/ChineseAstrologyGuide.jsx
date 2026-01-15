import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Star, Calculator, Clock, BarChart3, ArrowRight, FileText, BookOpen, Sparkles } from 'lucide-react'
import SEO from '../components/SEO'

const ChineseAstrologyGuide = () => {
  const tools = [
    {
      name: "Free Bazi Chart Calculator",
      description: "Generate your complete Bazi chart with detailed analysis of your Four Pillars of Destiny",
      icon: <Calculator className="h-8 w-8" />,
      link: "/free-bazi-report",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Day Master Strength Analyzer",
      description: "Determine if your Day Master is strong, balanced, or weak for accurate Bazi analysis",
      icon: <BarChart3 className="h-8 w-8" />,
      link: "/tools/day-master-calculator",
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "True Solar Time Bazi Adjustment",
      description: "Convert standard time to true solar time for precise Bazi chart calculations",
      icon: <Clock className="h-8 w-8" />,
      link: "/tools/true-solar-time-calculator",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Ten Gods Analyzer",
      description: "Analyze the Ten Gods in your Bazi chart to understand personality and destiny patterns",
      icon: <Star className="h-8 w-8" />,
      link: "/tools/ten-gods-analyzer",
      color: "from-amber-500 to-orange-500"
    }
  ]

  const servicePackages = [
    {
      name: "2026 Annual Bazi Report",
      price: "$15",
      description: "Perfect for first-time clients. Get a focused 2026 annual fortune report covering wealth, health, and relationship trends.",
      features: [
        "2026 single-year fortune report",
        "Focus on wealth, health, and relationship trends",
        "2-4 page PDF report",
        "Delivery within 3-5 days"
      ],
      link: "https://ko-fi.com/c/aef3d0e0ae",
      color: "from-green-500 to-emerald-500",
      icon: <FileText className="h-6 w-6" />
    },
    {
      name: "5-Year Detailed Outlook + WA Q&A",
      price: "$30",
      description: "Comprehensive 5-year fortune analysis (2026-2030) with WhatsApp support for interactive guidance.",
      features: [
        "Detailed 5-year fortune report (2026-2030)",
        "Annual wealth, health, and relationship trends",
        "6-8 page PDF report",
        "WhatsApp Q&A support (3-5 questions)"
      ],
      link: "https://ko-fi.com/c/36342951ca",
      color: "from-purple-500 to-pink-500",
      icon: <BookOpen className="h-6 w-6" />
    }
  ]

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Chinese Astrology Guide 2026 | Bazi, Zodiac & More",
    "description": "Explore Chinese astrology in 2026: Bazi (Four Pillars), Chinese zodiac, horoscopes, and more. Free Bazi calculator + in-depth readings available.",
    "author": {
      "@type": "Organization",
      "name": "FatePath"
    },
    "publisher": {
      "@type": "Organization",
      "name": "FatePath"
    },
    "datePublished": "2026-01-01",
    "dateModified": new Date().toISOString().split('T')[0]
  }

  return (
    <>
      <SEO 
        title="Chinese Astrology Guide 2026 | Bazi, Zodiac & More"
        description="Explore Chinese astrology in 2026: Bazi (Four Pillars), Chinese zodiac, horoscopes, and more. Free Bazi calculator + in-depth readings available. For entertainment only."
        keywords="chinese astrology, bazi, four pillars, chinese zodiac, chinese horoscope, bazi calculator, chinese astrology 2026, bazi reading, chinese numerology"
        canonical="https://fatepath.me/chinese-astrology-guide"
        structuredData={structuredData}
      />

      <main className="min-h-screen bg-mystic-900 pt-20">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-mystic-800 via-mystic-900 to-mystic-800"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.1),transparent_50%)]"></div>
          
          <div className="relative max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-gold-400 to-yellow-500 mb-6">
                <Sparkles className="h-10 w-10 text-mystic-900" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Chinese Astrology: Your Complete Guide to Bazi and Beyond
              </h1>
              <div className="prose prose-lg prose-invert max-w-none text-left mx-auto">
                <p className="text-xl text-mystic-200 leading-relaxed mb-4">
                  Chinese astrology is an ancient divination system that has guided millions for over 2,000 years. This comprehensive system encompasses various traditions including the Chinese zodiac (based on 12 animal signs), Feng Shui (the art of placement), Zi Wei Dou Shu (Purple Star astrology), and most importantly, Bazi (Four Pillars of Destiny).
                </p>
                <p className="text-xl text-mystic-200 leading-relaxed mb-4">
                  Among all Chinese astrology systems, Bazi stands out as the most detailed and accurate method for personal destiny analysis. Bazi, also known as Four Pillars in Chinese astrology, analyzes your birth date and time to reveal your personality traits, career potential, relationship patterns, health indicators, and optimal timing for major life decisions.
                </p>
                <p className="text-xl text-mystic-200 leading-relaxed">
                  While Chinese astrology includes many traditions, Bazi is the core system for accurate personal readings. Start exploring with our free tools below!
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Free Tools Section */}
        <section className="py-20 px-4 bg-mystic-900">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Free Chinese Astrology Tools
              </h2>
              <p className="text-lg text-mystic-300 max-w-2xl mx-auto">
                Explore your destiny with our professional Bazi analysis tools. All tools are free and provide instant insights into your Chinese astrology chart.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    to={tool.link}
                    className="block bg-mystic-800 rounded-lg p-6 border border-mystic-700 hover:border-gold-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold-400/20 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-r ${tool.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                        {tool.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">
                          {tool.name}
                        </h3>
                        <p className="text-mystic-300 mb-4">
                          {tool.description}
                        </p>
                        <div className="flex items-center text-gold-400 font-semibold group-hover:gap-2 transition-all">
                          <span>Try Now</span>
                          <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Paid Packages CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-mystic-800 to-mystic-900">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Get Professional Chinese Astrology Readings
              </h2>
              <p className="text-lg text-mystic-300 max-w-2xl mx-auto">
                Take your Chinese astrology journey deeper with personalized Bazi readings from our expert practitioners.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {servicePackages.map((pkg, index) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-mystic-800 rounded-lg p-8 border-2 border-mystic-700 hover:border-gold-400/50 transition-all duration-300 h-full flex flex-col">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-r ${pkg.color} text-white mb-4`}>
                      {pkg.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {pkg.name}
                    </h3>
                    <div className="text-3xl font-bold text-gold-400 mb-4">
                      {pkg.price}
                    </div>
                    <p className="text-mystic-300 mb-6 flex-grow">
                      {pkg.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-mystic-300">
                          <span className="text-gold-400 mt-1">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={pkg.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block w-full text-center py-4 rounded-lg font-bold text-white bg-gradient-to-r ${pkg.color} hover:shadow-lg hover:shadow-gold-400/30 transition-all duration-300 transform hover:scale-105`}
                    >
                      Get Started →
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Disclaimer Section */}
        <section className="py-12 px-4 bg-mystic-900 border-t border-mystic-700">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-mystic-400 text-sm leading-relaxed">
              <strong className="text-mystic-300">Disclaimer:</strong> All readings and tools are for entertainment and reflection only. Not professional advice or prediction. Chinese astrology and Bazi analysis are traditional cultural practices meant for personal insight and self-reflection.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}

export default ChineseAstrologyGuide
