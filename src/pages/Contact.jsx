import { motion } from 'framer-motion'
import { MessageCircle, Mail, Phone, MapPin, Clock, Star, Sparkles, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import { getFormUrl } from '../config/formIds'
import SEO from '../components/SEO'

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
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

  // 表单验证函数
  const validateForm = () => {
    const newErrors = {}
    
    // 验证姓名
    if (!formData.firstName.trim()) {
      newErrors.firstName = '请输入您的名字'
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = '名字至少需要2个字符'
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = '请输入您的姓氏'
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = '姓氏至少需要2个字符'
    }
    
    // 验证邮箱
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = '请输入您的邮箱地址'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址'
    }
    
    // 验证服务兴趣
    if (!formData.serviceInterest.trim()) {
      newErrors.serviceInterest = '请选择您感兴趣的服务'
    }
    
    // 验证消息
    if (!formData.message.trim()) {
      newErrors.message = '请输入您的消息'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = '消息至少需要10个字符'
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = '消息不能超过1000个字符'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // 验证表单
    if (!validateForm()) {
      return
    }
    
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
        setErrors({})
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      // 显示友好的错误提示
      const errorMessage = document.createElement('div')
      errorMessage.className = 'fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300'
      errorMessage.textContent = '提交失败，请稍后重试或直接联系我'
      document.body.appendChild(errorMessage)
      
      setTimeout(() => {
        errorMessage.style.transform = 'translateX(100%)'
        setTimeout(() => {
          document.body.removeChild(errorMessage)
        }, 300)
      }, 3000)
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
    { day: "Monday - Friday", hours: "9:00 AM - 8:00 PM (CST)" },
    { day: "Saturday", hours: "10:00 AM - 6:00 PM (CST)" },
    { day: "Sunday", hours: "12:00 PM - 5:00 PM (CST)" }
  ]

  const usTimeZones = [
    { zone: "Eastern Time (EST/EDT)", offset: "UTC-5/UTC-4" },
    { zone: "Central Time (CST/CDT)", offset: "UTC-6/UTC-5" },
    { zone: "Mountain Time (MST/MDT)", offset: "UTC-7/UTC-6" },
    { zone: "Pacific Time (PST/PDT)", offset: "UTC-8/UTC-7" }
  ]

  return (
    <>
      <SEO 
        title="Get Life Direction Help | Contact Chinese Astrology Expert | FatePath"
        description="Feeling lost or stuck in life? Contact our professional Chinese astrology expert for personalized life direction and career guidance. Get expert advice on finding your purpose and path."
        keywords="life direction help, feeling lost, stuck in life, contact chinese astrology expert, bazi reading consultation, professional chinese numerology expert, bazi master contact, chinese astrology consultation, online bazi reading, career guidance, life purpose"
        canonical={`${window.location.origin}/contact`}
        ogImage={`${window.location.origin}/images/bazi-reading.jpg`}
        ogType="website"
      />
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

        {/* Introduction Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 sm:mb-16"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-playfair font-semibold mb-6 text-white text-center">
              Your Journey Begins Here
            </h2>
            <div className="space-y-6 text-center">
              <p className="text-lg text-mystic-300 leading-relaxed">
                Embarking on a spiritual journey requires trust, guidance, and a connection with someone who understands the ancient wisdom you seek. As 玄印 (Xuan Yin), I've dedicated over 15 years to mastering traditional Chinese BaZi analysis, helping hundreds of individuals discover their true path and unlock their hidden potential.
              </p>
              <p className="text-lg text-mystic-300 leading-relaxed">
                Whether you're seeking clarity about your career direction, understanding your relationship patterns, or looking for spiritual protection through custom talismans, I'm here to provide personalized guidance based on your unique birth chart. Every consultation is conducted with the utmost respect for your privacy and the sacred nature of this ancient practice.
              </p>
              <p className="text-lg text-mystic-300 leading-relaxed">
                Choose your preferred method of contact below, and let's begin your transformation. Whether through WhatsApp for immediate responses, email for detailed inquiries, or our contact form for comprehensive consultations, I'm committed to being your guide on this profound journey of self-discovery and spiritual growth.
              </p>
            </div>
          </div>
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
                      className={`w-full px-4 py-3 text-base bg-mystic-800/50 border rounded-lg text-white placeholder-mystic-400 focus:outline-none transition-colors ${
                        errors.firstName ? 'border-red-500 focus:border-red-500' : 'border-mystic-700/50 focus:border-gold-500/50'
                      }`}
                      placeholder="Your first name"
                    />
                    {errors.firstName && (
                      <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>
                    )}
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
                      className={`w-full px-4 py-3 text-base bg-mystic-800/50 border rounded-lg text-white placeholder-mystic-400 focus:outline-none transition-colors ${
                        errors.lastName ? 'border-red-500 focus:border-red-500' : 'border-mystic-700/50 focus:border-gold-500/50'
                      }`}
                      placeholder="Your last name"
                    />
                    {errors.lastName && (
                      <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>
                    )}
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
                    className={`w-full px-4 py-3 bg-mystic-800/50 border rounded-lg text-white placeholder-mystic-400 focus:outline-none transition-colors ${
                      errors.email ? 'border-red-500 focus:border-red-500' : 'border-mystic-700/50 focus:border-gold-500/50'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-mystic-300 mb-2">
                    Service Interest
                  </label>
                  <select 
                    name="serviceInterest"
                    value={formData.serviceInterest}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-mystic-800/50 border rounded-lg text-white focus:outline-none transition-colors ${
                      errors.serviceInterest ? 'border-red-500 focus:border-red-500' : 'border-mystic-700/50 focus:border-gold-500/50'
                    }`}
                  >
                    <option value="">Select a service</option>
                    <option value="bazi-reading">Detailed Bazi Reading</option>
                    <option value="love-compatibility">Love Compatibility Reading</option>
                    <option value="custom-talisman">Custom Talisman</option>
                    <option value="general-inquiry">General Inquiry</option>
                  </select>
                  {errors.serviceInterest && (
                    <p className="text-red-400 text-sm mt-1">{errors.serviceInterest}</p>
                  )}
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
                    className={`w-full px-4 py-3 text-base bg-mystic-800/50 border rounded-lg text-white placeholder-mystic-400 focus:outline-none transition-colors resize-none ${
                      errors.message ? 'border-red-500 focus:border-red-500' : 'border-mystic-700/50 focus:border-gold-500/50'
                    }`}
                    placeholder="Tell me about what you're seeking guidance on..."
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                  )}
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

        {/* US Time Zones Information */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 sm:mt-20 text-center"
        >
          <div className="mystic-card p-6 sm:p-8 max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-playfair font-semibold mb-4 sm:mb-6 text-white">
              Service Hours for US Clients
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gold-400 mb-4 text-lg">Business Hours (CST)</h4>
                <div className="space-y-2 text-left">
                  {businessHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-mystic-300">{schedule.day}</span>
                      <span className="text-gold-400 font-medium">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gold-400 mb-4 text-lg">US Time Zones</h4>
                <div className="space-y-2 text-left">
                  {usTimeZones.map((timezone, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-mystic-300 text-sm">{timezone.zone}</span>
                      <span className="text-gold-400 font-medium text-sm">{timezone.offset}</span>
                    </div>
                  ))}
                </div>
                <p className="text-mystic-300 text-sm mt-4 text-center">
                  Available 24/7 for online consultations and support
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 sm:mt-20 text-center"
        >
          <div className="mystic-card p-6 sm:p-8 max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-playfair font-semibold mb-4 sm:mb-6 text-white">
              Why Clients Trust Me
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 mb-4">
                  <Star className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <h4 className="font-semibold text-gold-400 mb-2">15+ Years Experience</h4>
                <p className="text-mystic-300 text-sm">Deep expertise in ancient wisdom and modern astrology</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 mb-4">
                  <Sparkles className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <h4 className="font-semibold text-gold-400 mb-2">500+ Happy Clients</h4>
                <p className="text-mystic-300 text-sm">Proven track record of life-changing results</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 mb-4">
                  <MessageCircle className="h-8 w-8 text-white" aria-hidden="true" />
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
          transition={{ duration: 0.8, delay: 0.9 }}
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
    </>
  )
}

export default Contact 