import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, ArrowLeft, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const TalismanForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    timeOfBirth: '',
    gender: '',
    areaOfLife: '',
    email: '',
    blessingIntention: ''
  })

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
      const response = await fetch('https://formbold.com/s/3OGNZ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: 'Custom Talisman',
          ...formData
        })
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error submitting your form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Custom BaZi Talisman Request Form",
    "url": "https://fatepath.me/talisman-form",
    "description": "Submit your information to request a custom BaZi talisman handcrafted by Master XuanYin for clients across the United States and worldwide.",
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "WebSite",
      "name": "FatePath",
      "url": "https://fatepath.me"
    },
    "audience": {
      "@type": "Audience",
      "name": "Clients in the United States, Canada, United Kingdom, and Australia seeking personalized BaZi talismans"
    },
    "mainEntity": {
      "@type": "Service",
      "name": "Custom BaZi Talisman",
      "provider": {
        "@type": "Person",
        "name": "Master XuanYin",
        "availableLanguage": "English",
        "areaServed": [
          "United States",
          "Canada",
          "United Kingdom",
          "Australia"
        ]
      }
    }
  }

  const seoProps = {
    title: 'Custom BaZi Talisman Request Form | FatePath',
    description: 'Commission a personalized BaZi talisman handcrafted by Master XuanYin. Provide your birth details to receive protection created for clients across the United States and worldwide.',
    keywords: 'custom talisman, bazi talisman usa, chinese astrology protection, fatepath talisman order, personalized spiritual protection',
    canonical: 'https://fatepath.me/talisman-form',
    ogImage: 'https://fatepath.me/images/services/talisman-service-cover.jpg',
    author: 'FatePath',
    structuredData
  }

  if (isSubmitted) {
    return (
      <>
        <SEO {...seoProps} />
        <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mystic-card p-12"
            >
              <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-6" />
              <h1 className="text-3xl font-cinzel font-bold mb-4 text-white">
                Thank You!
              </h1>
              <p className="text-mystic-300 mb-8 text-lg">
                Your custom talisman request has been submitted successfully. I will craft your personalized talisman and ship it within 7-10 days.
              </p>
              <Link
                to="/"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-poppins font-semibold px-8 py-3 rounded-full hover:from-gold-400 hover:to-gold-500 transition-all duration-300"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Return to Home</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <SEO {...seoProps} />
      <div className="min-h-screen pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-4 sm:mb-6">
            <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-white" aria-hidden="true" />
          </div>
          <h1 className="text-3xl md:text-4xl font-cinzel font-bold mb-4 text-white tracking-wide">
            Custom Talisman
          </h1>
          <p className="text-xl text-mystic-300">
            Please provide your information for your personalized protection talisman
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mystic-card p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div className="border-b border-mystic-700/50 pb-6">
              <h3 className="text-lg font-cinzel font-semibold text-white mb-4">Personal Information</h3>
              
              {/* Name */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-mystic-200 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white placeholder-mystic-400 focus:border-gold-500/50 focus:outline-none transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Date of Birth */}
              <div className="mb-4">
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-mystic-200 mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  required
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white focus:border-gold-500/50 focus:outline-none transition-colors"
                />
              </div>

              {/* Time of Birth */}
              <div className="mb-4">
                <label htmlFor="timeOfBirth" className="block text-sm font-medium text-mystic-200 mb-2">
                  Time of Birth (Optional)
                </label>
                <input
                  type="time"
                  id="timeOfBirth"
                  name="timeOfBirth"
                  value={formData.timeOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white focus:border-gold-500/50 focus:outline-none transition-colors"
                />
                <p className="text-xs text-mystic-400 mt-1">
                  If you don't know the exact time, leave this blank
                </p>
              </div>

              {/* Gender */}
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-mystic-200 mb-2">
                  Gender *
                </label>
                <select
                  id="gender"
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white focus:border-gold-500/50 focus:outline-none transition-colors"
                >
                  <option value="">Select your gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Talisman Purpose Section */}
            <div className="border-b border-mystic-700/50 pb-6">
              <h3 className="text-lg font-cinzel font-semibold text-white mb-4">Talisman Purpose</h3>
              
              {/* Area of Life */}
              <div>
                <label htmlFor="areaOfLife" className="block text-sm font-medium text-mystic-200 mb-2">
                  Area of Life for Assistance *
                </label>
                <select
                  id="areaOfLife"
                  name="areaOfLife"
                  required
                  value={formData.areaOfLife}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white focus:border-gold-500/50 focus:outline-none transition-colors"
                >
                  <option value="">Select area of life</option>
                  <option value="Career">Career & Professional Success</option>
                  <option value="Love">Love & Relationships</option>
                  <option value="Protection">Protection & Safety</option>
                  <option value="Wealth">Wealth & Prosperity</option>
                  <option value="Health">Health & Well-being</option>
                  <option value="Spiritual">Spiritual Growth</option>
                  <option value="Multiple">Multiple Areas</option>
                </select>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-mystic-200 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white placeholder-mystic-400 focus:border-gold-500/50 focus:outline-none transition-colors"
                placeholder="Enter your email address"
              />
            </div>

            {/* Blessing Intention */}
            <div>
              <label htmlFor="blessingIntention" className="block text-sm font-medium text-mystic-200 mb-2">
                What kind of blessing or intention do you seek? *
              </label>
              <textarea
                id="blessingIntention"
                name="blessingIntention"
                rows="4"
                required
                value={formData.blessingIntention}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white placeholder-mystic-400 focus:border-gold-500/50 focus:outline-none transition-colors resize-none"
                placeholder="Please describe the specific blessing, protection, or intention you seek from your talisman..."
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-gold-500 to-orange-500 text-black font-poppins font-semibold py-4 px-8 rounded-full hover:from-gold-400 hover:to-orange-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Talisman Request'}
            </motion.button>
          </form>

          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link
              to="/services"
              className="inline-flex items-center space-x-2 text-mystic-300 hover:text-gold-400 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Services</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  )
}

export default TalismanForm 