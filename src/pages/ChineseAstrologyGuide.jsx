import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Star, Calculator, Clock, BarChart3, ArrowRight, FileText, BookOpen, Sparkles, ChevronDown, ChevronUp, Calendar, Zap } from 'lucide-react'
import SEO from '../components/SEO'

const ChineseAstrologyGuide = () => {
  const [openFAQ, setOpenFAQ] = useState(new Set([0])) // First FAQ open by default

  const toggleFAQ = (index) => {
    const newOpen = new Set(openFAQ)
    if (newOpen.has(index)) {
      newOpen.delete(index)
    } else {
      newOpen.add(index)
    }
    setOpenFAQ(newOpen)
  }

  // 确保组件正确渲染
  if (typeof window !== 'undefined') {
    console.log('ChineseAstrologyGuide component is rendering')
  }

  const tools = [
    {
      name: "Free Bazi Chart Calculator",
      description: "Generate your complete Bazi chart with detailed analysis of your Four Pillars of Destiny",
      detailedDescription: "Generate your complete Four Pillars chart instantly – accurate with true solar time. This Chinese astrology calculator provides comprehensive Bazi analysis based on your birth date, time, and location.",
      icon: <Calculator className="h-8 w-8" />,
      link: "/free-bazi-report",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Day Master Strength Analyzer",
      description: "Determine if your Day Master is strong, balanced, or weak for accurate Bazi analysis",
      detailedDescription: "Find out if your Day Master is strong or weak, plus joy gods & favorable elements. This Chinese astrology tool helps you understand your core energy and optimal timing in Chinese astrology 2026.",
      icon: <BarChart3 className="h-8 w-8" />,
      link: "/tools/day-master-calculator",
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "True Solar Time Bazi Adjustment",
      description: "Convert standard time to true solar time for precise Bazi chart calculations",
      detailedDescription: "Convert standard time to true solar time for accurate Chinese astrology readings. Essential for precise Bazi calculations in Chinese astrology, especially for locations far from standard time zones.",
      icon: <Clock className="h-8 w-8" />,
      link: "/tools/true-solar-time-calculator",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Ten Gods Analyzer",
      description: "Analyze the Ten Gods in your Bazi chart to understand personality and destiny patterns",
      detailedDescription: "Analyze the Ten Gods in your Bazi chart to understand personality traits and destiny patterns. This advanced Chinese astrology calculator reveals your relationship dynamics and career potential through Chinese zodiac and Bazi analysis.",
      icon: <Star className="h-8 w-8" />,
      link: "/tools/ten-gods-analyzer",
      color: "from-amber-500 to-orange-500"
    }
  ]

  const servicePackages = [
    {
      name: "Perfect for Beginners – Get Your 2026 Bazi Annual Report",
      subtitle: "2026 Annual Bazi Report",
      price: "$15",
      description: "Perfect for first-time clients exploring Chinese astrology. Get a focused 2026 annual fortune report covering wealth, health, and relationship trends through professional Chinese astrology reading.",
      features: [
        "2026 single-year fortune report",
        "Focus on wealth, health, and relationship trends",
        "2-4 page PDF report",
        "Delivery within 3-5 days"
      ],
      link: "https://ko-fi.com/c/aef3d0e0ae",
      color: "from-green-500 to-emerald-500",
      icon: <FileText className="h-6 w-6" />,
      badge: "Best Value"
    },
    {
      name: "Deep Insights – 5-Year Detailed Bazi Outlook + WA Q&A",
      subtitle: "5-Year Detailed Outlook + WA Q&A",
      price: "$30",
      description: "Comprehensive 5-year fortune analysis (2026-2030) with WhatsApp support. Perfect for serious students of Chinese astrology seeking deep insights through detailed Bazi reading.",
      features: [
        "Detailed 5-year fortune report (2026-2030)",
        "Annual wealth, health, and relationship trends",
        "6-8 page PDF report",
        "WhatsApp Q&A support (3-5 questions)"
      ],
      link: "https://ko-fi.com/c/36342951ca",
      color: "from-purple-500 to-pink-500",
      icon: <BookOpen className="h-6 w-6" />,
      badge: "Most Popular"
    }
  ]

  const faqData = [
    {
      question: "What is Chinese astrology?",
      answer: "Chinese astrology is an ancient divination system that has guided millions for over 2,000 years. This comprehensive system encompasses various traditions including the Chinese zodiac (based on 12 animal signs), Feng Shui (the art of placement), Zi Wei Dou Shu (Purple Star astrology), and most importantly, Bazi (Four Pillars of Destiny). Chinese astrology 2026 continues to provide valuable insights for personal destiny analysis and life guidance."
    },
    {
      question: "How does Bazi differ from Chinese zodiac?",
      answer: "While the Chinese zodiac focuses on your birth year animal sign (one of 12 animals), Bazi (Four Pillars of Destiny) is a much more detailed system in Chinese astrology. Bazi analyzes your complete birth chart using year, month, day, and hour pillars, revealing personality traits, career potential, relationship patterns, and optimal timing. Chinese zodiac and Bazi work together, but Bazi provides far more comprehensive insights for Chinese astrology readings."
    },
    {
      question: "Is Bazi accurate?",
      answer: "Bazi, as a core component of Chinese astrology, has been validated over thousands of years. The accuracy of Chinese astrology readings depends on precise birth information, especially the exact time of birth. Our Chinese astrology calculator uses true solar time adjustments for maximum accuracy. However, all Chinese astrology readings, including Bazi analysis, are for entertainment and reflection purposes only, not professional advice."
    }
  ]

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  }

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
    "dateModified": new Date().toISOString().split('T')[0],
    "mainEntity": faqStructuredData
  }

  return (
    <>
      <SEO 
        title="Chinese Astrology Guide 2026 | Bazi, Zodiac & More"
        description="Explore Chinese astrology in 2026: Bazi (Four Pillars), Chinese zodiac, horoscopes, and more. Free Bazi calculator + in-depth readings available. For entertainment only."
        keywords="chinese astrology, chinese astrology 2026, chinese astrology calculator, chinese astrology reading, chinese zodiac and bazi, bazi, four pillars, chinese zodiac, chinese horoscope, bazi calculator, bazi reading, chinese numerology"
        canonical="https://fatepath.me/chinese-astrology-guide"
        structuredData={structuredData}
      />

      {/* Sticky CTA Button */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-50 hidden md:block"
      >
        <Link
          to="/free-bazi-report"
          className="flex items-center gap-3 bg-gradient-to-r from-gold-400 to-yellow-500 text-mystic-900 px-6 py-4 rounded-full font-bold text-lg shadow-2xl shadow-gold-400/50 hover:from-gold-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105"
        >
          <Zap className="h-5 w-5" />
          <span>Start Your Free Bazi Chart Now</span>
        </Link>
      </motion.div>

      <main className="min-h-screen bg-mystic-900 pt-20 pb-20">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          {/* Background Gradient with Chinese-style pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-mystic-800 via-mystic-900 to-mystic-800"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border-2 border-gold-400/30 rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-gold-400/20 rounded-full"></div>
          </div>
          
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
              <div className="max-w-4xl mx-auto text-left">
                <p className="text-lg md:text-xl text-mystic-200 leading-relaxed mb-4">
                  Chinese astrology has guided millions for over 2,000 years. This ancient system includes the Chinese zodiac, Feng Shui, Zi Wei Dou Shu, and most importantly, Bazi (Four Pillars of Destiny) – the most detailed method in Chinese astrology for personal destiny analysis. Chinese astrology 2026 continues to evolve while maintaining its core wisdom.
                </p>
                <p className="text-lg md:text-xl text-mystic-200 leading-relaxed mb-4">
                  Among all Chinese astrology systems, Bazi stands out as the most detailed and accurate method for personal destiny analysis. Bazi, also known as Four Pillars in Chinese astrology, analyzes your birth date and time to reveal your personality traits, career potential, relationship patterns, health indicators, and optimal timing for major life decisions. Our Chinese astrology calculator makes this ancient wisdom accessible to everyone.
                </p>
                <p className="text-lg md:text-xl text-mystic-200 leading-relaxed mb-6">
                  While Chinese astrology includes many traditions, Bazi is the core system for accurate personal readings in Chinese astrology. Start exploring with our free Chinese astrology tools below, or get a professional Chinese astrology reading for deeper insights!
                </p>
                {/* Hero CTA */}
                <div className="text-center mt-8">
                  <Link
                    to="/free-bazi-report"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-400 to-yellow-500 text-mystic-900 px-8 py-4 rounded-lg font-bold text-lg hover:from-gold-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-gold-400/30"
                  >
                    <Zap className="h-5 w-5" />
                    <span>Start Your Free Bazi Chart Now</span>
                  </Link>
                </div>
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
                Explore your destiny with our professional Bazi analysis tools. All tools are free and provide instant insights into your Chinese astrology chart. These Chinese astrology calculators are designed to make Chinese astrology reading accessible to everyone.
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
                        <p className="text-mystic-300 mb-2">
                          {tool.description}
                        </p>
                        <p className="text-mystic-400 text-sm mb-4">
                          {tool.detailedDescription}
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

        {/* Mid-Page CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-mystic-800 to-mystic-900">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-mystic-800 rounded-lg p-8 border-2 border-gold-400/30"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Discover Your Chinese Astrology Destiny?
              </h2>
              <p className="text-lg text-mystic-300 mb-6">
                Get your free Bazi chart analysis now using our Chinese astrology calculator. No payment required – start your Chinese astrology reading journey today!
              </p>
              <Link
                to="/free-bazi-report"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-400 to-yellow-500 text-mystic-900 px-8 py-4 rounded-lg font-bold text-lg hover:from-gold-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-gold-400/30"
              >
                <Zap className="h-5 w-5" />
                <span>Start Your Free Bazi Chart Now</span>
              </Link>
            </motion.div>
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
                Take your Chinese astrology journey deeper with personalized Bazi readings from our expert practitioners. Professional Chinese astrology reading services for Chinese astrology 2026 and beyond.
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
                  {pkg.badge && (
                    <div className="absolute -top-3 right-4 bg-gold-400 text-mystic-900 px-3 py-1 rounded-full text-xs font-bold z-10">
                      {pkg.badge}
                    </div>
                  )}
                  <div className="bg-mystic-800 rounded-lg p-8 border-2 border-mystic-700 hover:border-gold-400/50 transition-all duration-300 h-full flex flex-col">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-r ${pkg.color} text-white mb-4`}>
                      {pkg.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {pkg.name}
                    </h3>
                    <p className="text-sm text-mystic-400 mb-3">{pkg.subtitle}</p>
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

        {/* FAQ Section */}
        <section className="py-20 px-4 bg-mystic-900">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Frequently Asked Questions About Chinese Astrology
              </h2>
              <p className="text-lg text-mystic-300">
                Common questions about Chinese astrology, Bazi, and our Chinese astrology reading services
              </p>
            </motion.div>

            <div className="space-y-4">
              {faqData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-mystic-800 rounded-lg border border-mystic-700 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-mystic-700/50 transition-colors"
                    aria-expanded={openFAQ.has(index)}
                  >
                    <h3 className="text-lg font-bold text-white pr-4">
                      {item.question}
                    </h3>
                    {openFAQ.has(index) ? (
                      <ChevronUp className="h-5 w-5 text-gold-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gold-400 flex-shrink-0" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openFAQ.has(index) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-4 text-mystic-300 leading-relaxed">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Disclaimer Section */}
        <section className="py-12 px-4 bg-mystic-900 border-t border-mystic-700">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-mystic-400 text-sm leading-relaxed">
              <strong className="text-mystic-300">Disclaimer:</strong> All readings and tools are for entertainment and reflection only. Not professional advice or prediction. Chinese astrology and Bazi analysis are traditional cultural practices meant for personal insight and self-reflection. Chinese astrology reading results should not be used as the sole basis for major life decisions.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}

export default ChineseAstrologyGuide
