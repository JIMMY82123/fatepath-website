import { motion } from 'framer-motion'
import { MessageCircle, Mail, Phone, MapPin, Clock, Star, Sparkles, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import { getFormUrl } from '../config/formIds'

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    serviceInterest: '',
    message: ''
  })

  const handleWhatsAppClick = () => {
    const phoneNumber = '8615914228258' // WhatsApp号码（去掉+号）
    const message = 'Hello! I would like to book a reading with you.'
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }



  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // 使用Formbold处理表单提交
      const response = await fetch(getFormUrl('CONTACT'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: 'Contact Form',
          ...formData
        })
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          serviceInterest: '',
          message: ''
        })
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error submitting your message. Please try again or contact me directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "WhatsApp",
      value: "+86 15914228258",
      description: "Fastest way to reach me",
      action: handleWhatsAppClick,
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      value: "chenxiao0801@hotmail.com",
      description: "For detailed inquiries",
      action: () => window.open('mailto:chenxiao0801@hotmail.com'),
      color: "from-blue-500 to-blue-600"
    }
  ]

  const businessHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 8:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 6:00 PM" },
    { day: "Sunday", hours: "12:00 PM - 5:00 PM" }
  ]

  return (
    <div className="min-h-screen pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* 漂浮的八卦图背景 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-24 h-24 sm:w-32 sm:h-32 border border-gold-500/20 rounded-full animate-spin-slow"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-gold-400/30 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 border border-gold-300/40 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 border border-gold-500/25 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
        
        {/* 漂浮的星星 */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gold-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-gold-300 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-gold-500 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-gold-400 rounded-full animate-pulse delay-1500"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-playfair font-bold mb-4 sm:mb-6">
            <span className="gradient-text">Get In Touch</span>
          </h1>
          <p className="text-lg sm:text-xl text-mystic-300 max-w-3xl mx-auto leading-relaxed">
            Ready to discover your destiny? I'm here to guide you on your spiritual journey. 
            Choose your preferred way to connect and let's begin your transformation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Methods */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-playfair font-semibold mb-6 text-white">
              Contact Methods
            </h2>
            
            {contactInfo.map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="mystic-card p-6 hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={contact.action}
              >
                <div className="flex items-start space-x-4">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${contact.color}`}>
                    <div className="text-white">
                      {contact.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">
                      {contact.title}
                    </h3>
                    <p className="text-gold-400 font-medium mb-1">
                      {contact.value}
                    </p>
                    <p className="text-mystic-400 text-sm">
                      {contact.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mystic-card p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="h-6 w-6 text-gold-400" />
                <h3 className="font-semibold text-white">Business Hours</h3>
              </div>
              <div className="space-y-2">
                {businessHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-mystic-300">{schedule.day}</span>
                    <span className="text-gold-400 font-medium">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mystic-card p-8"
          >
            <h2 className="text-xl sm:text-2xl font-playfair font-semibold mb-4 sm:mb-6 text-white">
              Send Me a Message
            </h2>
            
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center py-8"
              >
                <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-cinzel font-bold mb-2 text-white">
                  Message Sent!
                </h3>
                <p className="text-mystic-300 mb-6">
                  Thank you for your message. I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold py-2 px-6 rounded-lg hover:from-gold-400 hover:to-gold-500 transition-all duration-300"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-mystic-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 text-base bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white placeholder-mystic-400 focus:outline-none focus:border-gold-500/50 transition-colors"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-mystic-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 text-base bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white placeholder-mystic-400 focus:outline-none focus:border-gold-500/50 transition-colors"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-mystic-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white placeholder-mystic-400 focus:outline-none focus:border-gold-500/50 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-mystic-300 mb-2">
                    Service Interest
                  </label>
                  <select 
                    name="serviceInterest"
                    value={formData.serviceInterest}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white focus:outline-none focus:border-gold-500/50 transition-colors"
                  >
                    <option value="">Select a service</option>
                    <option value="bazi-reading">Detailed Bazi Reading</option>
                    <option value="love-compatibility">Love Compatibility Reading</option>
                    <option value="custom-talisman">Custom Talisman</option>
                    <option value="general-inquiry">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-mystic-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-base bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white placeholder-mystic-400 focus:outline-none focus:border-gold-500/50 transition-colors resize-none"
                    placeholder="Tell me about what you're seeking guidance on..."
                  ></textarea>
                </div>

                                                   <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold py-4 px-8 rounded-lg hover:from-gold-400 hover:to-gold-500 transition-all duration-300 mystic-glow disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </motion.button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Trust Indicators */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 sm:mt-20 text-center"
        >
          <div className="mystic-card p-6 sm:p-8 max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-playfair font-semibold mb-4 sm:mb-6 text-white">
              Why Clients Trust Me
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 mb-4">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-gold-400 mb-2">15+ Years Experience</h4>
                <p className="text-mystic-300 text-sm">Deep expertise in ancient wisdom and modern astrology</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 mb-4">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-gold-400 mb-2">500+ Happy Clients</h4>
                <p className="text-mystic-300 text-sm">Proven track record of life-changing results</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 mb-4">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-gold-400 mb-2">24/7 Support</h4>
                <p className="text-mystic-300 text-sm">Always available for guidance and support</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 sm:mt-20 text-center"
        >
          <div className="mystic-card p-6 sm:p-8 max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-playfair font-semibold mb-3 sm:mb-4 text-white">
              Ready to Begin Your Journey?
            </h3>
            <p className="text-sm sm:text-base text-mystic-300 mb-4 sm:mb-6">
              Don't wait to discover your true potential. Reach out today and take the first step 
              towards a more enlightened and fulfilling life.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={handleWhatsAppClick}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:from-green-400 hover:to-green-500 transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Chat on WhatsApp</span>
              </button>
              <button className="border border-gold-500/50 text-gold-400 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-gold-500/10 transition-all duration-300 text-sm sm:text-base">
                Book a Reading
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Contact 