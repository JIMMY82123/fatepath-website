import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ArrowLeft, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const BaziForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    waNumber: '',
    gender: '',
    dateOfBirth: '',
    timeOfBirth: '',
    birthLocation: '',
    additionalNotes: '',
    dataUsage: 'one-time'
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
      const response = await fetch('https://formbold.com/s/9BavY', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: 'Detailed Bazi Reading',
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

  if (isSubmitted) {
    return (
      <>
        <SEO 
          title="BaZi Reading Request Submitted | Thank You | FatePath"
          description="Your BaZi reading request has been submitted successfully. Your detailed report will be delivered within 3 to 5 days with comprehensive analysis of your personality, career, relationships, and life path."
          keywords="bazi reading submitted, thank you, bazi report confirmation, chinese astrology request received"
          canonical="https://fatepath.me/bazi-form"
        />
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
                Your Bazi reading request has been submitted successfully. 
                                I will analyze your birth chart and send your detailed report within 3 to 5 days.
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
      <SEO 
        title="Professional BaZi Reading Form | Detailed Chinese Astrology Analysis | FatePath"
        description="Submit your birth details for a comprehensive BaZi reading. Get detailed analysis of your personality, career path, relationships, and life purpose through traditional Chinese numerology."
        keywords="bazi reading form, chinese astrology consultation, birth chart analysis, professional bazi reading, chinese numerology expert, life direction analysis"
        canonical="https://fatepath.me/bazi-form"
        ogImage="https://fatepath.me/og-image.svg"
        ogType="website"
      />
      
      <div className="min-h-screen pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12"
          >
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-4 sm:mb-6">
            <Star className="h-8 w-8 sm:h-10 sm:w-10 text-white" aria-hidden="true" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-bold mb-3 sm:mb-4 text-white tracking-wide">
            Detailed Bazi Reading Service
          </h1>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mystic-card p-6 sm:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-mystic-200 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-base bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white placeholder-mystic-400 focus:border-gold-500/50 focus:outline-none transition-colors"
                placeholder="Enter your full name"
              />
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
                className="w-full px-4 py-3 text-base bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white placeholder-mystic-400 focus:border-gold-500/50 focus:outline-none transition-colors"
                placeholder="Enter your email address"
              />
            </div>

            {/* WhatsApp Number */}
            <div>
              <label htmlFor="waNumber" className="block text-sm font-medium text-mystic-200 mb-2">
                WA Number (Optional)
              </label>
              <input
                type="text"
                id="waNumber"
                name="waNumber"
                value={formData.waNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-base bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white placeholder-mystic-400 focus:border-gold-500/50 focus:outline-none transition-colors"
                placeholder="Enter your WhatsApp number (e.g., +1234567890)"
              />
              <p className="text-xs text-mystic-400 mt-2 leading-relaxed">
                I will send you monthly fortune tips, monthly reminders, or BaZi knowledge (free benefits). Only used for this service, not for other purposes. Completely confidential.
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
                className="w-full px-4 py-3 text-base bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white focus:border-gold-500/50 focus:outline-none transition-colors"
              >
                <option value="">Select your gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div>
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
                className="w-full px-4 py-3 text-base bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white focus:border-gold-500/50 focus:outline-none transition-colors"
              />
            </div>

            {/* Time of Birth */}
            <div>
              <label htmlFor="timeOfBirth" className="block text-sm font-medium text-mystic-200 mb-2">
                Time of Birth (Optional)
              </label>
              <input
                type="time"
                id="timeOfBirth"
                name="timeOfBirth"
                value={formData.timeOfBirth}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-base bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white focus:border-gold-500/50 focus:outline-none transition-colors"
              />
              <p className="text-xs text-mystic-400 mt-1">
                If you don't know the exact time, leave this blank
              </p>
            </div>

            {/* Birth Location */}
            <div>
              <label htmlFor="birthLocation" className="block text-sm font-medium text-mystic-200 mb-2">
                Birth Location *
              </label>
              <input
                type="text"
                id="birthLocation"
                name="birthLocation"
                required
                value={formData.birthLocation}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-base bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white placeholder-mystic-400 focus:border-gold-500/50 focus:outline-none transition-colors"
                placeholder="City, Country (e.g., New York, USA)"
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
                       className="w-full px-4 py-3 text-base bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white placeholder-mystic-400 focus:border-gold-500/50 focus:outline-none transition-colors resize-none"
                       placeholder="Any specific questions or areas you'd like me to focus on..."
                     />
                   </div>

                   {/* Data Usage Authorization */}
                   <div>
                     <label className="block text-sm font-medium text-mystic-200 mb-3">
                       Data Usage Authorization *
                     </label>
                     <div className="space-y-3">
                       <div className="flex items-start space-x-3">
                         <input
                           type="radio"
                           id="dataUsage-one-time"
                           name="dataUsage"
                           value="one-time"
                           checked={formData.dataUsage === 'one-time'}
                           onChange={handleInputChange}
                           className="mt-1 h-4 w-4 text-gold-500 border-mystic-700 focus:ring-gold-500 focus:ring-2"
                         />
                         <div>
                           <label htmlFor="dataUsage-one-time" className="text-sm font-medium text-white">
                             One-Time Use Only
                           </label>
                           <p className="text-xs text-mystic-400 mt-1">
                             Your data will be used only for this Bazi reading and deleted immediately after service completion.
                           </p>
                         </div>
                       </div>
                       <div className="flex items-start space-x-3">
                         <input
                           type="radio"
                           id="dataUsage-enhanced"
                           name="dataUsage"
                           value="enhanced"
                           checked={formData.dataUsage === 'enhanced'}
                           onChange={handleInputChange}
                           className="mt-1 h-4 w-4 text-gold-500 border-mystic-700 focus:ring-gold-500 focus:ring-2"
                         />
                         <div>
                           <label htmlFor="dataUsage-enhanced" className="text-sm font-medium text-white">
                             Enhanced Service
                           </label>
                           <p className="text-xs text-mystic-400 mt-1">
                             Allow us to store your data for personalized future services and improved accuracy.
                           </p>
                         </div>
                       </div>
                     </div>
                   </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-poppins font-semibold py-4 px-6 sm:px-8 rounded-full hover:from-purple-400 hover:to-pink-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide text-base"
            >
              {isSubmitting ? 'Submitting...' : 'Book Detailed Bazi Reading'}
            </motion.button>
          </form>

          {/* Back Link */}
          <div className="mt-6 sm:mt-8 text-center">
            <Link
              to="/services"
              className="inline-flex items-center space-x-2 text-mystic-300 hover:text-gold-400 transition-colors text-sm sm:text-base"
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

export default BaziForm 