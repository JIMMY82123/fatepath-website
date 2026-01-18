import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ArrowRight, FileText, BookOpen, Check, ChevronLeft, ChevronRight, MessageSquare, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEO from '../components/SEO'
import PurchaseNotification from '../components/PurchaseNotification'

const Services = () => {
  const { t } = useTranslation()
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)
  const [sales, setSales] = useState({ taster: 760, detailed: 2054 })
  
  // WhatsApp reviews data
  const whatsappReviews = [
    { id: 1, image: "/images/whatsapp-reviews/whatsapp-review-1.jpg" },
    { id: 2, image: "/images/whatsapp-reviews/whatsapp-review-2.jpg" },
    { id: 3, image: "/images/whatsapp-reviews/whatsapp-review-3.jpg" },
    { id: 4, image: "/images/whatsapp-reviews/whatsapp-review-4.jpg" },
    { id: 5, image: "/images/whatsapp-reviews/whatsapp-review-5.jpg" }
  ]

  // Auto-play carousel
  useEffect(() => {
    if (whatsappReviews.length <= 1) return
    
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % whatsappReviews.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [whatsappReviews.length])

  const goToPrevious = () => {
    setCurrentReviewIndex((prev) => (prev - 1 + whatsappReviews.length) % whatsappReviews.length)
  }

  const goToNext = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % whatsappReviews.length)
  }

  const goToSlide = (index) => {
    setCurrentReviewIndex(index)
  }

  // 计算销量 - 每天增加8个
  useEffect(() => {
    const calculateSales = () => {
      const STORAGE_KEY = 'bazi_services_initial_date'
      const SALES_PER_DAY = 8
      const INITIAL_SALES = {
        taster: 760,
        detailed: 2054
      }

      // 获取或设置初始日期
      let initialDateStr = localStorage.getItem(STORAGE_KEY)
      if (!initialDateStr) {
        // 如果没有初始日期，设置为今天
        const today = new Date().toISOString().split('T')[0]
        localStorage.setItem(STORAGE_KEY, today)
        initialDateStr = today
      }

      // 计算天数差
      const initialDate = new Date(initialDateStr)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      initialDate.setHours(0, 0, 0, 0)
      
      const daysDiff = Math.floor((today - initialDate) / (1000 * 60 * 60 * 24))
      
      // 计算当前销量
      const currentSales = {
        taster: INITIAL_SALES.taster + (daysDiff * SALES_PER_DAY),
        detailed: INITIAL_SALES.detailed + (daysDiff * SALES_PER_DAY)
      }

      setSales(currentSales)
    }

    calculateSales()
    // 每天更新一次（每24小时）
    const interval = setInterval(calculateSales, 24 * 60 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  const servicePackages = [
    {
      id: 0,
      name: t('services.taster.name'),
      subtitle: t('services.taster.subtitle'),
      price: t('services.taster.price'),
      period: "",
      icon: <FileText className="h-8 w-8" />,
      description: t('services.taster.description'),
      features: t('services.taster.features', { returnObjects: true }),
      note: t('services.taster.note'),
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/50",
      popular: false,
      kofiLink: "https://ko-fi.com/c/aef3d0e0ae"
    },
    {
      id: 1,
      name: t('services.detailed.name'),
      subtitle: t('services.detailed.subtitle'),
      price: t('services.detailed.price'),
      period: "",
      icon: <BookOpen className="h-8 w-8" />,
      description: t('services.detailed.description'),
      features: t('services.detailed.features', { returnObjects: true }),
      note: t('services.detailed.note'),
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/50",
      popular: true,
      kofiLink: "https://ko-fi.com/c/36342951ca"
    }
  ]

  return (
    <>
      <SEO 
        title="BaZi Fortune Reading Services - 2026 Annual & 5-Year Outlook | FatePath"
        description="Choose from two BaZi fortune reading packages: 2026 Annual Outlook Taster ($15) or Detailed 5-Year Outlook with WhatsApp Q&A ($30). Professional Chinese astrology analysis delivered via PDF report."
        keywords="bazi reading, chinese astrology, fortune reading, 2026 bazi outlook, 5-year bazi reading, bazi analysis, chinese numerology, annual fortune report, bazi consultation"
        canonical={`${window.location.origin}/services`}
        ogImage={`${window.location.origin}/images/bazi-reading.jpg`}
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "BaZi Fortune Reading Services",
          "description": "Professional Chinese astrology BaZi reading services with annual and 5-year fortune analysis",
          "provider": {
            "@type": "Organization",
            "name": "FatePath"
          },
          "serviceType": "Chinese Astrology Reading",
          "areaServed": "Worldwide"
        }}
      />
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-gold-500 to-yellow-500 mb-4 sm:mb-6">
              <Star className="h-8 w-8 sm:h-10 sm:w-10 text-white" aria-hidden="true" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-bold mb-3 sm:mb-4 text-white">
              {t('services.title')}
            </h1>
            <p className="text-lg sm:text-xl text-mystic-300 max-w-3xl mx-auto">
              {t('services.subtitle')}
            </p>
          </motion.div>

          {/* Service Packages - Card Layout */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 max-w-5xl mx-auto">
            {servicePackages.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className={`relative mystic-card p-6 sm:p-8 rounded-2xl border-2 ${tier.borderColor} ${tier.popular ? 'border-gold-500 scale-105 shadow-2xl shadow-gold-500/20' : ''} flex flex-col h-full`}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-gold-500 to-yellow-500 text-black px-4 py-1 rounded-full text-xs font-bold">
                      {t('services.detailed.popular')}
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${tier.color} mb-4`}>
                  <div className="text-white">
                    {tier.icon}
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h2 className="text-xl sm:text-2xl font-cinzel font-bold mb-2 text-white">
                  {tier.name}
                </h2>
                <p className="text-sm sm:text-base text-gold-400 mb-4 font-poppins">
                  {tier.subtitle}
                </p>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-baseline">
                    <span className="text-3xl sm:text-4xl font-bold text-white">{tier.price}</span>
                    {tier.period && <span className="text-mystic-400 ml-2">{tier.period}</span>}
                  </div>
                </div>

                {/* Sales Count */}
                <div className="mb-6 flex items-center space-x-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-mystic-300">
                    <span className="text-green-400 font-semibold">
                      {tier.id === 0 ? sales.taster.toLocaleString() : sales.detailed.toLocaleString()}
                    </span>
                    {' '}{t('services.salesCount')}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-mystic-300 mb-6 leading-relaxed flex-grow">
                  {tier.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className={`h-5 w-5 flex-shrink-0 mt-0.5 text-transparent bg-clip-text bg-gradient-to-r ${tier.color}`} />
                        <span className="text-sm sm:text-base text-mystic-300 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Note */}
                {tier.note && (
                  <p className="text-xs sm:text-sm text-mystic-400 mb-6 italic">
                    {tier.note}
                  </p>
                )}

                {/* CTA Button */}
                <motion.a
                  href={tier.kofiLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full bg-gradient-to-r ${tier.color} text-white font-poppins font-semibold py-3 sm:py-4 px-6 rounded-full flex items-center justify-center space-x-2 hover:opacity-90 transition-all duration-300 tracking-wide text-sm sm:text-base mt-auto`}
                >
                  <span>{t('services.taster.purchaseNow')}</span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* WhatsApp Reviews Carousel */}
        {whatsappReviews.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 sm:mt-16 mb-12 sm:mb-16"
          >
            <div className="max-w-5xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mb-4">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-cinzel font-bold mb-3 text-white">
                  {t('services.reviews.title')}
                </h2>
                <p className="text-sm sm:text-base text-mystic-300 max-w-2xl mx-auto">
                  {t('services.reviews.description')}
                </p>
              </div>

              {/* Carousel Container */}
              <div className="relative mystic-card p-4 sm:p-6 rounded-2xl border-2 border-green-500/30 bg-gradient-to-r from-green-500/5 to-emerald-500/5">
                <div className="relative overflow-hidden rounded-lg">
                  {/* Carousel Images */}
                  <div className="relative aspect-[9/16] sm:aspect-[3/4] max-h-[600px] mx-auto">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentReviewIndex}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        <img
                          src={whatsappReviews[currentReviewIndex].image}
                          alt={`WhatsApp client review ${whatsappReviews[currentReviewIndex].id} - BaZi reading testimonial`}
                          className="w-full h-full object-contain rounded-lg"
                          loading="lazy"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Navigation Arrows */}
                  {whatsappReviews.length > 1 && (
                    <>
                      <button
                        onClick={goToPrevious}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 z-10"
                        aria-label="Previous review"
                      >
                        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                      </button>
                      <button
                        onClick={goToNext}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 z-10"
                        aria-label="Next review"
                      >
                        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                      </button>
                    </>
                  )}

                  {/* Dots Indicator */}
                  {whatsappReviews.length > 1 && (
                    <div className="flex justify-center mt-4 space-x-2">
                      {whatsappReviews.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
                            index === currentReviewIndex
                              ? 'w-8 sm:w-10 bg-green-500'
                              : 'w-2 sm:w-3 bg-mystic-600 hover:bg-mystic-500'
                          }`}
                          aria-label={`Go to review ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Review Counter */}
                  {whatsappReviews.length > 1 && (
                    <div className="text-center mt-3">
                      <span className="text-xs sm:text-sm text-mystic-400">
                        {currentReviewIndex + 1} / {whatsappReviews.length}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Service Process */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 sm:mt-16"
        >
          <div className="mystic-card p-6 sm:p-8 max-w-4xl mx-auto border-2 border-gold-500/30 bg-gradient-to-r from-gold-500/5 to-yellow-500/5">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-gold-500 to-yellow-500 mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-cinzel font-semibold mb-3 text-white">
                {t('services.howItWorks.title')}
              </h3>
              <p className="text-sm sm:text-base text-mystic-300 mb-6">
                {t('services.howItWorks.description')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
              <div className="p-4 sm:p-6 bg-mystic-800/50 rounded-lg border border-mystic-700/50 text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{t('services.howItWorks.step1.title')}</h4>
                <p className="text-sm text-mystic-300">
                  {t('services.howItWorks.step1.description')}
                </p>
              </div>

              <div className="p-4 sm:p-6 bg-mystic-800/50 rounded-lg border border-mystic-700/50 text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{t('services.howItWorks.step2.title')}</h4>
                <p className="text-sm text-mystic-300">
                  {t('services.howItWorks.step2.description')}
                </p>
              </div>

              <div className="p-4 sm:p-6 bg-mystic-800/50 rounded-lg border border-mystic-700/50 text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{t('services.howItWorks.step3.title')}</h4>
                <p className="text-sm text-mystic-300">
                  {t('services.howItWorks.step3.description')}
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-mystic-800/30 rounded-lg border border-mystic-700/30">
              <p className="text-xs sm:text-sm text-mystic-300 text-center">
                {t('services.howItWorks.note')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default Services 