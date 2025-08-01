import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Heart, Shield, Calendar, Clock, DollarSign, ArrowRight } from 'lucide-react'

const Services = () => {
  const [activeService, setActiveService] = useState(0)

  const services = [
    {
      id: 0,
      icon: <Star className="h-12 w-12" />,
      title: "Detailed Bazi Reading",
      subtitle: "Comprehensive Life Path Analysis",
      description: "Discover your life's blueprint through detailed Bazi (八字) analysis. Understand your personality, career strengths, relationship patterns, and life purpose based on your birth chart.",
      features: [
        "Complete personality analysis",
        "Career and life path guidance",
        "Relationship compatibility insights",
        "Timing for important decisions",
        "Personal growth recommendations",
        "10,000+ word detailed PDF report",
        "3 follow-up questions via WhatsApp"
      ],
      duration: "3-5 days",
      price: "$38",
      format: "PDF Report",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10"
    },
    {
      id: 1,
      icon: <Heart className="h-12 w-12" />,
      title: "Love Compatibility Reading",
      subtitle: "Relationship & Partnership Analysis",
      description: "Deep analysis of your love life through Bazi compatibility. Understand your relationship patterns, timing for love, and guidance for finding your soulmate.",
      features: [
        "Relationship compatibility analysis",
        "Love timing and opportunities",
        "Soulmate characteristics",
        "Relationship pattern insights",
        "Love life guidance",
        "10,000+ word detailed PDF report",
        "3 follow-up questions via WhatsApp"
      ],
      duration: "3-5 days",
      price: "$44",
      format: "PDF Report",
      color: "from-pink-500 to-red-500",
      bgColor: "bg-pink-500/10"
    },
    {
      id: 2,
      icon: <Shield className="h-12 w-12" />,
      title: "Custom Talisman",
      subtitle: "Personalized Protection & Luck Enhancement",
      description: "Receive a personalized protection talisman crafted specifically for your unique birth chart to enhance luck, protection, and positive energy flow.",
      features: [
        "Personalized based on your Bazi chart",
        "Enhances luck and positive energy",
        "Provides spiritual protection",
        "Improves career and relationship luck",
        "Lifetime guidance and support",
        "Physical talisman delivery",
        "Usage instructions included"
      ],
      duration: "7-10 days",
      price: "$129",
      format: "Physical Item",
      color: "from-gold-500 to-orange-500",
      bgColor: "bg-gold-500/10"
    }
  ]

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6">
            <span className="gradient-text">My Services</span>
          </h1>
          <p className="text-xl text-mystic-300 max-w-3xl mx-auto leading-relaxed">
            Choose from my carefully crafted services designed to illuminate your path 
            and guide you towards your highest potential.
          </p>
        </motion.div>

        {/* Service Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {services.map((service, index) => (
            <button
              key={service.id}
              onClick={() => setActiveService(index)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeService === index
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-black'
                  : 'bg-mystic-800/50 border border-mystic-700/50 text-mystic-300 hover:border-gold-500/50'
              }`}
            >
              {service.title}
            </button>
          ))}
        </motion.div>

        {/* Service Details */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Service Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${services[activeService].color} mb-6`}>
                <div className="text-white">
                  {services[activeService].icon}
                </div>
              </div>

                             <div>
                 <h2 className="text-3xl md:text-4xl font-cinzel font-bold mb-2 text-white tracking-wide">
                   {services[activeService].title}
                 </h2>
                 <p className="text-xl text-gold-400 mb-6 font-poppins font-medium">
                   {services[activeService].subtitle}
                 </p>
                 <p className="text-mystic-300 leading-relaxed text-lg mb-8 font-inter">
                   {services[activeService].description}
                 </p>
               </div>

                             {/* Features */}
               <div>
                 <h3 className="text-xl font-cinzel font-semibold mb-4 text-white tracking-wide">
                   What's Included:
                 </h3>
                 <ul className="space-y-3">
                   {services[activeService].features.map((feature, index) => (
                     <motion.li
                       key={index}
                       initial={{ opacity: 0, x: -20 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ duration: 0.3, delay: index * 0.1 }}
                       className="flex items-center space-x-3 text-mystic-300 font-inter leading-relaxed"
                     >
                       <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${services[activeService].color}`}></div>
                       <span>{feature}</span>
                     </motion.li>
                   ))}
                 </ul>
               </div>

              {/* Service Info */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 mystic-card">
                  <Clock className="h-6 w-6 text-gold-400 mx-auto mb-2" />
                  <div className="text-sm text-mystic-300">Duration</div>
                  <div className="font-semibold text-white">{services[activeService].duration}</div>
                </div>
                <div className="text-center p-4 mystic-card">
                  <DollarSign className="h-6 w-6 text-gold-400 mx-auto mb-2" />
                  <div className="text-sm text-mystic-300">Investment</div>
                  <div className="font-semibold text-white">{services[activeService].price}</div>
                </div>
                <div className="text-center p-4 mystic-card">
                  <Calendar className="h-6 w-6 text-gold-400 mx-auto mb-2" />
                  <div className="text-sm text-mystic-300">Format</div>
                  <div className="font-semibold text-white">{services[activeService].format}</div>
                </div>
              </div>

                             {/* CTA Buttons */}
               <div className="space-y-3">
                 <div className="text-center mb-4">
                   <p className="text-sm text-mystic-300 mb-2">
                     💳 Complete payment first, then contact me for your personalized form
                   </p>
                 </div>
                 <motion.a
                    href={services[activeService].id === 0 ? "https://www.paypal.com/ncp/payment/ZA46SQT522H46" : 
                          services[activeService].id === 1 ? "https://www.paypal.com/ncp/payment/H3KLXNS4P62HG" : 
                          "https://www.paypal.com/ncp/payment/35UAEZS9YUZJS"}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-black font-poppins font-semibold py-4 px-8 rounded-full flex items-center justify-center space-x-2 hover:from-gold-400 hover:to-gold-500 transition-all duration-300 mystic-glow tracking-wide"
                  >
                    <span>Purchase & Start</span>
                    <ArrowRight className="h-5 w-5" />
                  </motion.a>
                 <div className="text-center">
                   <p className="text-xs text-mystic-400 mb-2">Or fill form first (payment after)</p>
                 </div>
                 <motion.a
                   href={services[activeService].id === 0 ? "/form-bazi" : 
                         services[activeService].id === 1 ? "/form-love" : 
                         "/form-talisman"}
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   className="w-full border border-gold-500/50 text-gold-400 font-poppins font-semibold py-4 px-8 rounded-full flex items-center justify-center space-x-2 hover:bg-gold-500/10 transition-all duration-300 tracking-wide"
                 >
                   <span>Fill Form Directly</span>
                 </motion.a>
               </div>
            </motion.div>
          </AnimatePresence>

          {/* Photo Display Area */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-96 lg:h-[600px] rounded-2xl overflow-hidden border border-mystic-700/50"
          >
            {/* Background with subtle gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${services[activeService].bgColor} opacity-30`}></div>
            
            {/* Photo Container */}
            <div className="relative h-full flex items-center justify-center p-8">
              <div className="relative w-full h-full max-w-md">
                {/* Main Photo */}
                <img
                  src={`/images/services/${services[activeService].id === 0 ? 'bazi-reading' : 
                        services[activeService].id === 1 ? 'love-compatibility' : 
                        'custom-talisman'}.jpg`}
                  alt={`${services[activeService].title} - Professional Service`}
                  className="w-full h-full object-cover rounded-xl shadow-2xl border-2 border-gold-500/30"
                  onError={(e) => {
                    // Fallback to placeholder if image doesn't exist
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                
                {/* Fallback Placeholder */}
                <div className="hidden w-full h-full bg-gradient-to-br from-mystic-800 to-mystic-900 rounded-xl border-2 border-gold-500/30 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`w-24 h-24 rounded-full bg-gradient-to-r ${services[activeService].color} flex items-center justify-center mx-auto mb-4`}>
                      <div className="text-white text-3xl">
                        {services[activeService].icon}
                      </div>
                    </div>
                    <p className="text-mystic-300 text-lg font-medium">
                      {services[activeService].title}
                    </p>
                    <p className="text-mystic-400 text-sm mt-2">
                      Professional Service Image
                    </p>
                  </div>
                </div>
                
                {/* Overlay with service info */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-4 border border-gold-500/30">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${services[activeService].color} flex items-center justify-center`}>
                      <div className="text-white">
                        {services[activeService].icon}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm">
                        {services[activeService].title}
                      </h4>
                      <p className="text-gold-400 text-xs">
                        {services[activeService].price} • {services[activeService].duration}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-6 right-6 w-3 h-3 bg-gold-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-6 left-6 w-2 h-2 bg-gold-300 rounded-full animate-pulse delay-1000"></div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="mystic-card p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-playfair font-semibold mb-4 text-white">
              Why Choose My Services?
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <h4 className="font-semibold text-gold-400 mb-2">15+ Years Experience</h4>
                <p className="text-mystic-300 text-sm">Deep knowledge of ancient wisdom and modern astrology</p>
              </div>
              <div>
                <h4 className="font-semibold text-gold-400 mb-2">Personalized Approach</h4>
                <p className="text-mystic-300 text-sm">Every reading is tailored to your unique situation</p>
              </div>
              <div>
                <h4 className="font-semibold text-gold-400 mb-2">Proven Results</h4>
                <p className="text-mystic-300 text-sm">500+ satisfied clients with life-changing insights</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Services 