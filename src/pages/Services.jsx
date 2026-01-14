import { motion } from 'framer-motion'
import { Star, ArrowRight, FileText, BookOpen, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const Services = () => {
  const servicePackages = [
    {
      id: 0,
      name: "2026 Bazi Annual Outlook (Taster)",
      subtitle: "Taster / Basic",
      price: "$15",
      period: "",
      icon: <FileText className="h-8 w-8" />,
      description: "Perfect for first-time clients curious about BaZi. Get a focused 2026 annual fortune report covering wealth, health, and relationship trends.",
      features: [
        "2026 single-year fortune report",
        "Focus on wealth, health, and relationship trends",
        "Important notes and precautions for 2026",
        "2-4 page PDF report",
        "Delivery within 3-5 days after payment",
        "One-time report (no WA Q&A)"
      ],
      note: "Ideal for entry-level clients who want to experience BaZi analysis at an affordable price.",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/50",
      popular: false,
      kofiLink: "https://ko-fi.com/c/aef3d0e0ae"
    },
    {
      id: 1,
      name: "5-Year Bazi Outlook (2026-2030) + WA Q&A",
      subtitle: "Detailed / Premium",
      price: "$30",
      period: "",
      icon: <BookOpen className="h-8 w-8" />,
      description: "Comprehensive 5-year fortune analysis with WhatsApp support. Perfect for clients seeking deep insights and interactive guidance.",
      features: [
        "Detailed 5-year fortune report (2026-2030)",
        "Annual wealth, health, and relationship trends",
        "Yearly opportunities, risks, and precautions",
        "6-8 page PDF report",
        "Delivery within 5-7 days after payment",
        "WhatsApp Q&A support (3-5 questions, within 7 days after delivery)"
      ],
      note: "Perfect for clients who want long-term insights and interactive Q&A support.",
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
              BaZi Fortune Reading Services
            </h1>
            <p className="text-lg sm:text-xl text-mystic-300 max-w-3xl mx-auto">
              Choose from two professional BaZi reading packages. Get personalized fortune insights for 2026 or comprehensive 5-year analysis with interactive support.
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
                      MOST POPULAR
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
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl sm:text-4xl font-bold text-white">{tier.price}</span>
                    {tier.period && <span className="text-mystic-400 ml-2">{tier.period}</span>}
                  </div>
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
                  <span>Pay with Ko-fi</span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>

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
                How It Works
              </h3>
              <p className="text-sm sm:text-base text-mystic-300 mb-6">
                Simple three-step process to get your personalized BaZi fortune reading:
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
              <div className="p-4 sm:p-6 bg-mystic-800/50 rounded-lg border border-mystic-700/50 text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Complete Payment</h4>
                <p className="text-sm text-mystic-300">
                  Pay securely through Ko-fi using the payment link for your chosen package.
                </p>
              </div>

              <div className="p-4 sm:p-6 bg-mystic-800/50 rounded-lg border border-mystic-700/50 text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Provide Your Information</h4>
                <p className="text-sm text-mystic-300">
                  I will contact you via Ko-fi private message to collect your birth details (date, time, location, gender) and any specific questions.
                </p>
              </div>

              <div className="p-4 sm:p-6 bg-mystic-800/50 rounded-lg border border-mystic-700/50 text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Receive Your Report</h4>
                <p className="text-sm text-mystic-300">
                  Get your personalized PDF report delivered to your email within the specified timeframe.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-mystic-800/30 rounded-lg border border-mystic-700/30">
              <p className="text-xs sm:text-sm text-mystic-300 text-center">
                <span className="text-gold-400 font-semibold">💡 Note:</span> After payment, I will contact you via Ko-fi private message to collect your birth details. Please check your Ko-fi messages and provide accurate information for the most accurate analysis.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default Services 