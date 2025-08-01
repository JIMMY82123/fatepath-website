import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ArrowLeft, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const BaziForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    gender: '',
    dateOfBirth: '',
    timeOfBirth: '',
    birthLocation: '',
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
      const response = await fetch('https://formbold.com/s/35AWZ', {
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
              I will analyze your birth chart and send your detailed report within 3-5 days.
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
    )
  }

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-6">
            <Star className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-cinzel font-bold mb-4 text-white tracking-wide">
            Detailed Bazi Reading
          </h1>
          <p className="text-xl text-mystic-300">
            Please provide your birth information for your personalized Bazi analysis
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
                className="w-full px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white placeholder-mystic-400 focus:border-gold-500/50 focus:outline-none transition-colors"
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
                className="w-full px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white placeholder-mystic-400 focus:border-gold-500/50 focus:outline-none transition-colors"
                placeholder="Enter your email address"
              />
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
                className="w-full px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white focus:border-gold-500/50 focus:outline-none transition-colors"
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
                className="w-full px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white focus:border-gold-500/50 focus:outline-none transition-colors"
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
                className="w-full px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white placeholder-mystic-400 focus:border-gold-500/50 focus:outline-none transition-colors"
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
                className="w-full px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white placeholder-mystic-400 focus:border-gold-500/50 focus:outline-none transition-colors resize-none"
                placeholder="Any specific questions or areas you'd like me to focus on..."
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-poppins font-semibold py-4 px-8 rounded-full hover:from-purple-400 hover:to-pink-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Bazi Reading Request'}
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
  )
}

export default BaziForm 