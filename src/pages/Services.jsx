import { motion } from 'framer-motion'
import { Star, ArrowRight, MessageCircle, BookOpen, Crown, Check } from 'lucide-react'
import SEO from '../components/SEO'
import { getContactLink } from '../config/externalLinks'

const Services = () => {
  const patreonUrl = "https://patreon.com/XuanYin178?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink"

  const membershipTiers = [
    {
      id: 0,
      name: "Foundation Guidance",
      subtitle: "Essential Guidance",
      price: "$15",
      period: "/month",
      icon: <MessageCircle className="h-8 w-8" />,
      description: "Your ongoing access to personalized BaZi insights and fortune guidance through direct chat. Perfect for daily questions, life decisions, or exploring your birth chart at your own pace.",
      features: [
        "Unlimited questions – ask anything about career, relationships, wealth, health, or personal growth",
        "Thoughtful, tailored responses (usually within 48 hours)",
        "Regular fortune tips and energy updates",
        "Access to exclusive community posts and Q&A threads"
      ],
      note: "To begin: Send me your birth details (date, time, location, gender) via private message after joining – we can start anytime!",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/50",
      popular: false
    },
    {
      id: 1,
      name: "Advanced Personalized Reading",
      subtitle: "Take your guidance to the next level",
      price: "$38",
      period: "/month",
      icon: <BookOpen className="h-8 w-8" />,
      description: "Take your guidance to the next level with fully customized BaZi analysis and feng shui insights.",
      features: [
        "Everything in Essential Guidance, plus:",
        "In-depth personalized BaZi reading based on your unique birth chart",
        "Tailored feng shui recommendations for your home, office, or personal space",
        "Unlimited questions with priority responses",
        "Deeper exploration of career, wealth, relationships, and life decisions"
      ],
      note: "Perfect for those seeking detailed, individual support year-round.",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/50",
      popular: true
    },
    {
      id: 2,
      name: "Premium Mastery Experience",
      subtitle: "The ultimate personalized fortune package",
      price: "$138",
      period: "/month",
      icon: <Crown className="h-8 w-8" />,
      description: "The ultimate personalized fortune package with exclusive physical and digital perks.",
      features: [
        "Everything in Advanced Personalized Reading, plus:",
        "Custom crystal fortune bracelet (one-time physical shipment worldwide)",
        "Personal blessing ritual video tailored to your energy",
        "In-depth feng shui guidance (feel free to share layout photos)",
        "Unlimited questions with fastest responses and priority access",
        "VIP bonus insights and seasonal recommendations"
      ],
      note: "For those ready to fully embrace and master their destiny.",
      color: "from-gold-500 to-orange-500",
      bgColor: "bg-gold-500/10",
      borderColor: "border-gold-500/50",
      popular: false
    }
  ]

  return (
    <>
      <SEO 
        title="Patreon Membership - Personalized BaZi & Feng Shui Guidance | FatePath"
        description="Join XuanYin's Patreon community for ongoing personalized BaZi insights, fortune guidance, and feng shui recommendations. Choose from three membership tiers starting at $15/month."
        keywords="patreon membership, bazi reading membership, chinese astrology subscription, feng shui guidance, personalized fortune reading, monthly astrology consultation, bazi analysis subscription, chinese numerology membership"
        canonical={`${window.location.origin}/services`}
        ogImage={`${window.location.origin}/images/bazi-reading.jpg`}
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Patreon Membership - Personalized BaZi & Feng Shui Guidance",
          "description": "Monthly membership for ongoing personalized Chinese astrology consultation and BaZi reading services",
          "provider": {
            "@type": "Organization",
            "name": "FatePath"
          },
          "serviceType": "Chinese Astrology Membership",
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
              Patreon Membership
            </h1>
            <p className="text-lg sm:text-xl text-mystic-300 max-w-3xl mx-auto">
              Join my Patreon community for ongoing personalized BaZi insights, fortune guidance, and exclusive access to ancient Chinese wisdom
            </p>
          </motion.div>

          {/* Membership Tiers - Card Layout */}
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {membershipTiers.map((tier, index) => (
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
                    <span className="text-mystic-400 ml-2">{tier.period}</span>
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
                  href={patreonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full bg-gradient-to-r ${tier.color} text-white font-poppins font-semibold py-3 sm:py-4 px-6 rounded-full flex items-center justify-center space-x-2 hover:opacity-90 transition-all duration-300 tracking-wide text-sm sm:text-base mt-auto`}
                >
                  <span>Join on Patreon</span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* How to Contact After Joining */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 sm:mt-16"
        >
          <div className="mystic-card p-6 sm:p-8 max-w-4xl mx-auto border-2 border-gold-500/30 bg-gradient-to-r from-gold-500/5 to-yellow-500/5">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-gold-500 to-yellow-500 mb-4">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-cinzel font-semibold mb-3 text-white">
                How to Contact After Joining
              </h3>
              <p className="text-sm sm:text-base text-mystic-300 mb-6">
                Once you've joined our Patreon community, you can reach out for personalized guidance through either of these convenient methods:
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              {/* Patreon Message Option */}
              <div className="p-4 sm:p-6 bg-mystic-800/50 rounded-lg border border-mystic-700/50">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white">Patreon Direct Message</h4>
                </div>
                <p className="text-sm sm:text-base text-mystic-300 leading-relaxed mb-3">
                  Send me a private message directly on Patreon. This is the easiest way to share your birth details and ask questions.
                </p>
                <p className="text-xs sm:text-sm text-mystic-400 italic">
                  Simply go to your Patreon membership page and click "Message Creator"
                </p>
              </div>

              {/* WhatsApp Option */}
              <div className="p-4 sm:p-6 bg-mystic-800/50 rounded-lg border border-mystic-700/50">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white">WhatsApp Consultation</h4>
                </div>
                <p className="text-sm sm:text-base text-mystic-300 leading-relaxed mb-3">
                  Add me on WhatsApp for direct messaging. Perfect for quick questions and ongoing conversations.
                </p>
                <a
                  href={getContactLink('whatsapp')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors text-sm sm:text-base font-medium"
                >
                  <span>Add on WhatsApp</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="mt-6 p-4 bg-mystic-800/30 rounded-lg border border-mystic-700/30">
              <p className="text-xs sm:text-sm text-mystic-300 text-center">
                <span className="text-gold-400 font-semibold">💡 Tip:</span> After joining, send your birth details (date, time, location, gender) via your preferred method to get started with personalized guidance.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 text-center"
        >
          <div className="mystic-card p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-cinzel font-semibold mb-4 text-white">
              Why Join My Patreon Community?
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <h4 className="font-semibold text-gold-400 mb-2">Ongoing Support</h4>
                <p className="text-mystic-300 text-sm">Get continuous guidance and insights, not just a one-time reading. Ask questions anytime and receive personalized responses.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gold-400 mb-2">Exclusive Access</h4>
                <p className="text-mystic-300 text-sm">Access exclusive community posts, Q&A sessions, and private guidance notes available only to members.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gold-400 mb-2">Flexible Membership</h4>
                <p className="text-mystic-300 text-sm">Choose the tier that fits your needs. Cancel anytime - no long-term commitment required.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default Services 