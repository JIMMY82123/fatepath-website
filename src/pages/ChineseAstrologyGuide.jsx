import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Star, Calculator, Clock, BarChart3, ArrowRight, FileText, BookOpen, Sparkles, ChevronDown, ChevronUp, Calendar, Zap } from 'lucide-react'
import SEO from '../components/SEO'

const ChineseAstrologyGuide = () => {
  const { t } = useTranslation()
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

  const tools = useMemo(() => [
    {
      name: t('chineseAstrologyGuide.tools.tool1.name'),
      description: t('chineseAstrologyGuide.tools.tool1.description'),
      detailedDescription: t('chineseAstrologyGuide.tools.tool1.detailedDescription'),
      icon: <Calculator className="h-8 w-8" />,
      link: "/free-bazi-report",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: t('chineseAstrologyGuide.tools.tool2.name'),
      description: t('chineseAstrologyGuide.tools.tool2.description'),
      detailedDescription: t('chineseAstrologyGuide.tools.tool2.detailedDescription'),
      icon: <BarChart3 className="h-8 w-8" />,
      link: "/tools/day-master-calculator",
      color: "from-purple-500 to-pink-500"
    },
    {
      name: t('chineseAstrologyGuide.tools.tool3.name'),
      description: t('chineseAstrologyGuide.tools.tool3.description'),
      detailedDescription: t('chineseAstrologyGuide.tools.tool3.detailedDescription'),
      icon: <Clock className="h-8 w-8" />,
      link: "/tools/true-solar-time-calculator",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: t('chineseAstrologyGuide.tools.tool4.name'),
      description: t('chineseAstrologyGuide.tools.tool4.description'),
      detailedDescription: t('chineseAstrologyGuide.tools.tool4.detailedDescription'),
      icon: <Star className="h-8 w-8" />,
      link: "/tools/ten-gods-analyzer",
      color: "from-amber-500 to-orange-500"
    }
  ], [t])

  const servicePackages = useMemo(() => [
    {
      name: t('chineseAstrologyGuide.packages.package1.name'),
      subtitle: t('chineseAstrologyGuide.packages.package1.subtitle'),
      price: t('chineseAstrologyGuide.packages.package1.price'),
      description: t('chineseAstrologyGuide.packages.package1.description'),
      features: t('chineseAstrologyGuide.packages.package1.features', { returnObjects: true }),
      link: "https://ko-fi.com/c/aef3d0e0ae",
      color: "from-green-500 to-emerald-500",
      icon: <FileText className="h-6 w-6" />,
      badge: t('chineseAstrologyGuide.packages.package1.badge')
    },
    {
      name: t('chineseAstrologyGuide.packages.package2.name'),
      subtitle: t('chineseAstrologyGuide.packages.package2.subtitle'),
      price: t('chineseAstrologyGuide.packages.package2.price'),
      description: t('chineseAstrologyGuide.packages.package2.description'),
      features: t('chineseAstrologyGuide.packages.package2.features', { returnObjects: true }),
      link: "https://ko-fi.com/c/36342951ca",
      color: "from-purple-500 to-pink-500",
      icon: <BookOpen className="h-6 w-6" />,
      badge: t('chineseAstrologyGuide.packages.package2.badge')
    }
  ], [t])

  const faqData = useMemo(() => t('chineseAstrologyGuide.faq', { returnObjects: true }), [t])

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
          <span>{t('chineseAstrologyGuide.stickyCTA')}</span>
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
                {t('chineseAstrologyGuide.heroTitle')}
              </h1>
              <div className="max-w-4xl mx-auto text-left">
                <p className="text-lg md:text-xl text-mystic-200 leading-relaxed mb-4">
                  {t('chineseAstrologyGuide.heroDesc1')}
                </p>
                <p className="text-lg md:text-xl text-mystic-200 leading-relaxed mb-4">
                  {t('chineseAstrologyGuide.heroDesc2')}
                </p>
                <p className="text-lg md:text-xl text-mystic-200 leading-relaxed mb-6">
                  {t('chineseAstrologyGuide.heroDesc3')}
                </p>
                {/* Hero CTA */}
                <div className="text-center mt-8">
                  <Link
                    to="/free-bazi-report"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-400 to-yellow-500 text-mystic-900 px-8 py-4 rounded-lg font-bold text-lg hover:from-gold-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-gold-400/30"
                  >
                    <Zap className="h-5 w-5" />
                    <span>{t('chineseAstrologyGuide.heroCTA')}</span>
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
                {t('chineseAstrologyGuide.toolsTitle')}
              </h2>
              <p className="text-lg text-mystic-300 max-w-2xl mx-auto">
                {t('chineseAstrologyGuide.toolsDescription')}
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
                          <span>{t('chineseAstrologyGuide.tryNow')}</span>
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
                {t('chineseAstrologyGuide.midCTATitle')}
              </h2>
              <p className="text-lg text-mystic-300 mb-6">
                {t('chineseAstrologyGuide.midCTADescription')}
              </p>
              <Link
                to="/free-bazi-report"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-400 to-yellow-500 text-mystic-900 px-8 py-4 rounded-lg font-bold text-lg hover:from-gold-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-gold-400/30"
              >
                <Zap className="h-5 w-5" />
                <span>{t('chineseAstrologyGuide.heroCTA')}</span>
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
                {t('chineseAstrologyGuide.packagesTitle')}
              </h2>
              <p className="text-lg text-mystic-300 max-w-2xl mx-auto">
                {t('chineseAstrologyGuide.packagesDescription')}
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
                      {t('chineseAstrologyGuide.getStarted')} →
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
                {t('chineseAstrologyGuide.faqTitle')}
              </h2>
              <p className="text-lg text-mystic-300">
                {t('chineseAstrologyGuide.faqDescription')}
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
              <strong className="text-mystic-300">{t('chineseAstrologyGuide.disclaimerLabel')}:</strong> {t('chineseAstrologyGuide.disclaimer')}
            </p>
          </div>
        </section>
      </main>
    </>
  )
}

export default ChineseAstrologyGuide
