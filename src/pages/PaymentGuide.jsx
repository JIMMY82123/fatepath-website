import { motion } from 'framer-motion'
import { ArrowLeft, CreditCard, FileText, CheckCircle, Mail, MessageCircle } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEO from '../components/SEO'

const PaymentGuide = () => {
  const { t } = useTranslation()
  const { service } = useParams()

  const serviceConfig = {
    taster: {
      name: "2026 Bazi Annual Outlook (Taster)",
      price: "$15",
      paypalLink: "https://ko-fi.com/c/aef3d0e0ae",
      description: "Perfect for first-time clients curious about BaZi. Get a focused 2026 annual fortune report covering wealth, health, and relationship trends. 2-4 page PDF report delivered within 3-5 days. After payment, I will contact you via Ko-fi private message to collect your birth details.",
      color: "from-green-500 to-emerald-500",
      icon: "📄"
    },
    detailed: {
      name: "5-Year Bazi Outlook (2026-2030) + WA Q&A",
      price: "$30",
      paypalLink: "https://ko-fi.com/c/36342951ca",
      description: "Comprehensive 5-year fortune analysis with WhatsApp support. Detailed annual insights for 2026-2030 covering wealth, health, relationships, opportunities, and risks. 6-8 page PDF report + WhatsApp Q&A (3-5 questions) delivered within 5-7 days. After payment, I will contact you via Ko-fi private message to collect your birth details.",
      color: "from-purple-500 to-pink-500",
      icon: "📚"
    },
    // Legacy services (kept for backward compatibility)
    bazi: {
      name: "Detailed Bazi Reading",
      price: "$38",
      paypalLink: "https://ko-fi.com/s/5900110c2e",
      formLink: "/form-bazi",
      description: "Comprehensive analysis of your birth chart revealing your personality, career strengths, relationship patterns, and life path guidance.",
      color: "from-purple-500 to-pink-500",
      icon: "⭐"
    },
    baziDiscount: {
      name: "Quick Bazi Reading",
      price: "$10",
      paypalLink: "https://ko-fi.com/s/b41e787977",
      formLink: "/form-bazi-discount",
      description: "Affordable entry-level Bazi analysis! Get essential insights about your personality, career direction, and life path guidance at an accessible price.",
      color: "from-green-500 to-emerald-500",
      icon: "⚡"
    },
    love: {
      name: "Love Compatibility Reading",
      price: "$44",
      paypalLink: "https://ko-fi.com/s/86bb2869e4",
      formLink: "/form-love",
      description: "Deep analysis of relationship compatibility, timing for love, and guidance for finding your soulmate through Bazi analysis.",
      color: "from-pink-500 to-red-500",
      icon: "💖"
    },
    talisman: {
      name: "Custom Talisman",
      price: "$129",
      paypalLink: "https://ko-fi.com/s/e60857a93f",
      formLink: "/form-talisman",
      description: "Personalized protection talisman crafted specifically for your unique birth chart to enhance luck, protection, and positive energy flow.",
      color: "from-gold-500 to-orange-500",
      icon: "🛡️"
    }
  }

  const config = serviceConfig[service] || serviceConfig.taster
  const canonicalUrl = service ? `https://fatepath.me/payment-guide?service=${service}` : 'https://fatepath.me/payment-guide'
  const priceValue = Number(config.price.replace(/[^0-9.]/g, ''))
  const pageTitle = `${config.name} Payment Guide | FatePath`
  const pageDescription = `Complete your secure payment for the ${config.name} through Ko-fi and submit your details to receive your English-language BaZi service, available to clients across the United States and worldwide.`

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `${config.name} Payment Guide`,
    "description": pageDescription,
    "inLanguage": "en-US",
    "image": "https://fatepath.me/og-image.svg",
    "totalTime": "PT10M",
    "estimatedCost": priceValue ? {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": priceValue
    } : undefined,
    "step": [
      {
        "@type": "HowToStep",
        "name": "Complete Payment",
        "url": `${canonicalUrl}#payment`,
        "itemListElement": [
          {
            "@type": "HowToDirection",
            "text": "Use the Ko-fi payment button to complete your purchase securely in USD."
          }
        ],
        "tool": {
          "@type": "HowToTool",
          "name": "Ko-fi payment portal"
        }
      },
      {
        "@type": "HowToStep",
        "name": "Provide Your Information",
        "url": `${canonicalUrl}#form`,
        "itemListElement": [
          {
            "@type": "HowToDirection",
            "text": "After payment, I will contact you via Ko-fi private message to collect your birth details (date, time, location, gender) and any specific questions."
          }
        ]
      },
      {
        "@type": "HowToStep",
        "name": "Receive Your Service",
        "url": `${canonicalUrl}#delivery`,
        "itemListElement": [
          {
            "@type": "HowToDirection",
            "text": "Watch your inbox for the personalized report or shipping confirmation from Master XuanYin."
          }
        ],
        "supply": {
          "@type": "HowToSupply",
          "name": "Email inbox for delivery"
        }
      }
    ].filter(Boolean)
  }

  const seoProps = {
    title: pageTitle,
    description: pageDescription,
    keywords: `payment guide, ${config.name.toLowerCase()}, fatepath checkout, bazi services usa, ko-fi payment instructions`,
    canonical: canonicalUrl,
    ogImage: 'https://fatepath.me/og-image.svg',
    author: 'FatePath',
    structuredData
  }

  return (
    <>
      <SEO {...seoProps} />
      <div className="min-h-screen pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r ${config.color} mb-4 sm:mb-6`}>
            <span className="text-xl sm:text-2xl">{config.icon}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-bold mb-3 sm:mb-4 text-white tracking-wide">
            {config.name}
          </h1>
          <p className="text-lg sm:text-xl text-mystic-300 mb-3 sm:mb-4">
            {config.description}
          </p>
          <div className="text-2xl sm:text-3xl font-poppins font-extrabold gradient-text">
            {config.price}
          </div>
        </motion.div>

        {/* Payment Process */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12"
        >
          {/* Step 1: Payment */}
          <div id="payment" className="mystic-card p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-gold-400" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-cinzel font-semibold text-white">{t('paymentGuide.step1Title')}</h3>
            </div>
            <p className="text-mystic-300 mb-6">
              {t('paymentGuide.step1Desc')}
            </p>
            <a
              href={config.paypalLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block w-full bg-gradient-to-r ${config.color} text-white font-poppins font-semibold py-4 px-8 rounded-full hover:opacity-90 transition-all duration-300 text-center tracking-wide flex items-center justify-center space-x-2`}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.067 8.478c.492.315.844.825.844 1.406 0 .58-.352 1.09-.844 1.406-.492.315-1.156.51-1.875.51h-1.406c-.492 0-.844-.195-.844-.51 0-.315.352-.51.844-.51h1.406c.352 0 .703-.195.703-.406 0-.21-.351-.406-.703-.406h-1.406c-.492 0-.844-.195-.844-.51 0-.315.352-.51.844-.51h1.406c.719 0 1.383.195 1.875.51zM12.5 8.478c.492.315.844.825.844 1.406 0 .58-.352 1.09-.844 1.406-.492.315-1.156.51-1.875.51h-1.406c-.492 0-.844-.195-.844-.51 0-.315.352-.51.844-.51h1.406c.352 0 .703-.195.703-.406 0-.21-.351-.406-.703-.406h-1.406c-.492 0-.844-.195-.844-.51 0-.315.352-.51.844-.51h1.406c.719 0 1.383.195 1.875.51zM7.5 8.478c.492.315.844.825.844 1.406 0 .58-.352 1.09-.844 1.406-.492.315-1.156.51-1.875.51H4.219c-.492 0-.844-.195-.844-.51 0-.315.352-.51.844-.51h1.406c.352 0 .703-.195.703-.406 0-.21-.351-.406-.703-.406H4.219c-.492 0-.844-.195-.844-.51 0-.315.352-.51.844-.51h1.406c.719 0 1.383.195 1.875.51z"/>
              </svg>
              <span>{t('paymentGuide.payWithKofi')}</span>
            </a>
          </div>

          {/* Step 2: Information Collection */}
          <div id="form" className="mystic-card p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-gold-400" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-cinzel font-semibold text-white">{t('paymentGuide.step2Title')}</h3>
            </div>
            <p className="text-mystic-300 mb-6">
              {t('paymentGuide.step2Desc')}
            </p>
            <ul className="text-mystic-300 space-y-2 mb-6 text-sm">
              <li>• {t('paymentGuide.dob')}</li>
              <li>• {t('paymentGuide.tob')}</li>
              <li>• {t('paymentGuide.gender')}</li>
              <li>• {t('paymentGuide.birthLocation')}</li>
              <li>• {t('paymentGuide.focusAreas')}</li>
              {service === 'detailed' && <li>• {t('paymentGuide.whatsappNumber')}</li>}
            </ul>
            <div className="bg-mystic-800/50 rounded-lg p-4 border border-mystic-700/50">
              <p className="text-xs text-mystic-400">
                <strong className="text-gold-400">{t('paymentGuide.note')}:</strong> {t('paymentGuide.noteDesc')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* What Happens Next? */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mystic-card p-6 sm:p-8 mb-8 sm:mb-12"
          id="delivery"
        >
          <h3 className="text-xl sm:text-2xl font-cinzel font-semibold text-white mb-4 sm:mb-6 text-center">
            {t('paymentGuide.whatHappensNext')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-3" aria-hidden="true" />
              <h4 className="font-semibold text-gold-400 mb-2">{t('paymentGuide.paymentConfirmation')}</h4>
              <p className="text-mystic-300 text-sm">
                {t('paymentGuide.paymentConfirmationDesc')}
              </p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-3" aria-hidden="true" />
              <h4 className="font-semibold text-gold-400 mb-2">{t('paymentGuide.formSubmission')}</h4>
              <p className="text-mystic-300 text-sm">
                {t('paymentGuide.formSubmissionDesc')}
              </p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-3" aria-hidden="true" />
              <h4 className="font-semibold text-gold-400 mb-2">{t('paymentGuide.serviceDelivery')}</h4>
              <p className="text-mystic-300 text-sm">
                {t('paymentGuide.serviceDeliveryDesc')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="mystic-card p-6 sm:p-8 max-w-2xl mx-auto">
            <h3 className="text-lg sm:text-xl font-cinzel font-semibold text-white mb-3 sm:mb-4">
              {t('paymentGuide.contactInfo')}
            </h3>
            <div className="space-y-3 text-mystic-200">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gold-400" aria-hidden="true" />
                <span>{t('paymentGuide.email')}: chenxiao0801@hotmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-5 w-5 text-gold-400" aria-hidden="true" />
                <span>{t('paymentGuide.whatsapp')}: {t('paymentGuide.whatsappAvailable')}</span>
              </div>
              <p className="text-sm text-mystic-300 mt-3">
                {t('paymentGuide.contactNote')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Back Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 text-center space-x-6"
        >
          <Link
            to="/services"
            className="inline-flex items-center space-x-2 text-mystic-300 hover:text-gold-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{t('paymentGuide.backToServices')}</span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-mystic-300 hover:text-gold-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{t('paymentGuide.backToHome')}</span>
          </Link>
        </motion.div>
      </div>
    </div>
    </>
  )
}

export default PaymentGuide 