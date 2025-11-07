import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, ArrowLeft, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const LoveForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    yourName: '',
    yourDOB: '',
    yourTOB: '',
    partnerName: '',
    partnerDOB: '',
    partnerTOB: '',
    relationshipStatus: '',
    email: '',
    additionalNotes: ''
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
      const response = await fetch('https://formbold.com/s/3dpPE', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: 'Love Compatibility Reading',
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
    "name": "Love Compatibility Reading Form",
    "url": "https://fatepath.me/love-form",
    "description": "Submit details for an English-language BaZi love compatibility reading with FatePath, serving clients across the United States and worldwide.",
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "WebSite",
      "name": "FatePath",
      "url": "https://fatepath.me"
    },
    "audience": {
      "@type": "Audience",
      "name": "Couples in the United States, Canada, United Kingdom, and Australia seeking BaZi guidance"
    },
    "mainEntity": {
      "@type": "Service",
      "name": "Love Compatibility Reading",
      "provider": {
        "@type": "Person",
        "name": "Master XuanYin",
        "areaServed": [
          "United States",
          "Canada",
          "United Kingdom",
          "Australia"
        ],
        "availableLanguage": "English"
      }
    }
  }

  const seoProps = {
    title: 'Love Compatibility Reading Form | FatePath BaZi for Americans',
    description: 'Request a personalized BaZi love compatibility reading in English. Ideal for couples across the United States and worldwide seeking practical Chinese astrology guidance.',
    keywords: 'love compatibility reading, bazi relationship analysis, chinese astrology for americans, marriage destiny reading, fatepath love form',
    canonical: 'https://fatepath.me/love-form',
    ogImage: 'https://fatepath.me/images/services/love-compatibility-cover.jpg',
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
                Your love compatibility reading request has been submitted successfully. I will analyze your relationship compatibility and send your report within 24 hours.
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
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-pink-500 to-red-500 mb-4 sm:mb-6">
            <Heart className="h-8 w-8 sm:h-10 sm:w-10 text-white" aria-hidden="true" />
          </div>
          <h1 className="text-3xl md:text-4xl font-cinzel font-bold mb-4 text-white tracking-wide">
            Love Compatibility Reading
          </h1>
          <p className="text-xl text-mystic-300">
            Please provide both your and your partner's information for relationship analysis
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
            {/* Your Information Section */}
            <div className="border-b border-mystic-700/50 pb-6">
              <h3 className="text-lg font-cinzel font-semibold text-white mb-4">Your Information</h3>
              
              {/* Your Name */}
              <div className="mb-4">
                <label htmlFor="yourName" className="block text-sm font-medium text-mystic-200 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="yourName"
                  name="yourName"
                  required
                  value={formData.yourName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white placeholder-mystic-400 focus:border-gold-500/50 focus:outline-none transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Your Date of Birth */}
              <div className="mb-4">
                <label htmlFor="yourDOB" className="block text-sm font-medium text-mystic-200 mb-2">
                  Your Date of Birth *
                </label>
                <input
                  type="date"
                  id="yourDOB"
                  name="yourDOB"
                  required
                  value={formData.yourDOB}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white focus:border-gold-500/50 focus:outline-none transition-colors"
                />
              </div>

              {/* Your Time of Birth */}
              <div>
                <label htmlFor="yourTOB" className="block text-sm font-medium text-mystic-200 mb-2">
                  Your Time of Birth (Optional)
                </label>
                <input
                  type="time"
                  id="yourTOB"
                  name="yourTOB"
                  value={formData.yourTOB}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white focus:border-gold-500/50 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Partner Information Section */}
            <div className="border-b border-mystic-700/50 pb-6">
              <h3 className="text-lg font-cinzel font-semibold text-white mb-4">Partner's Information</h3>
              
              {/* Partner Name */}
              <div className="mb-4">
                <label htmlFor="partnerName" className="block text-sm font-medium text-mystic-200 mb-2">
                  Partner's Name *
                </label>
                <input
                  type="text"
                  id="partnerName"
                  name="partnerName"
                  required
                  value={formData.partnerName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white placeholder-mystic-400 focus:border-gold-500/50 focus:outline-none transition-colors"
                  placeholder="Enter your partner's full name"
                />
              </div>

              {/* Partner Date of Birth */}
              <div className="mb-4">
                <label htmlFor="partnerDOB" className="block text-sm font-medium text-mystic-200 mb-2">
                  Partner's Date of Birth *
                </label>
                <input
                  type="date"
                  id="partnerDOB"
                  name="partnerDOB"
                  required
                  value={formData.partnerDOB}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white focus:border-gold-500/50 focus:outline-none transition-colors"
                />
              </div>

              {/* Partner Time of Birth */}
              <div>
                <label htmlFor="partnerTOB" className="block text-sm font-medium text-mystic-200 mb-2">
                  Partner's Time of Birth (Optional)
                </label>
                <input
                  type="time"
                  id="partnerTOB"
                  name="partnerTOB"
                  value={formData.partnerTOB}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white focus:border-gold-500/50 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Relationship Status */}
            <div>
              <label htmlFor="relationshipStatus" className="block text-sm font-medium text-mystic-200 mb-2">
                Relationship Status *
              </label>
              <select
                id="relationshipStatus"
                name="relationshipStatus"
                required
                value={formData.relationshipStatus}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white focus:border-gold-500/50 focus:outline-none transition-colors"
              >
                <option value="">Select relationship status</option>
                <option value="Dating">Dating</option>
                <option value="Engaged">Engaged</option>
                <option value="Married">Married</option>
                <option value="Long-term Relationship">Long-term Relationship</option>
                <option value="Considering Relationship">Considering Relationship</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Email */}
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

            {/* Additional Notes */}
            <div>
              <label htmlFor="additionalNotes" className="block text-sm font-medium text-mystic-200 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                rows="4"
                value={formData.additionalNotes}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white placeholder-mystic-400 focus:border-gold-500/50 focus:outline-none transition-colors resize-none"
                placeholder="Any specific questions about your relationship or areas you'd like me to focus on..."
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-poppins font-semibold py-4 px-8 rounded-full hover:from-pink-400 hover:to-red-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Love Reading Request'}
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

export default LoveForm 