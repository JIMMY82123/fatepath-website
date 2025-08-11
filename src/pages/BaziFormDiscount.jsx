import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ArrowLeft, CheckCircle, Gift } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const BaziFormDiscount = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
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
             const response = await fetch('https://formbold.com/s/60Ny1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: 'Detailed Bazi Reading (Special Offer)',
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
              Thank You for Your Special Offer Purchase!
            </h1>
            <p className="text-mystic-300 mb-8 text-lg">
              Your discounted Bazi reading request has been submitted successfully. 
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
    <>
      <Helmet>
        {/* Google Tag Manager */}
        <script>
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5623V8HV');`}
        </script>
        {/* End Google Tag Manager */}
      </Helmet>
      
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe 
          src="https://www.googletagmanager.com/ns.html?id=GTM-5623V8HV"
          height="0" 
          width="0" 
          style={{display:'none',visibility:'hidden'}}
        />
      </noscript>
      {/* End Google Tag Manager (noscript) */}
      
      <div className="min-h-screen pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mb-4 sm:mb-6">
            <Gift className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-bold mb-3 sm:mb-4 text-white tracking-wide">
            Special Offer: Detailed Bazi Reading
          </h1>
          <p className="text-lg sm:text-xl text-mystic-300">
            Limited Time Discount - Complete Your Purchase
          </p>
        </motion.div>

        {/* Special Offer Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mystic-card p-8 mb-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30"
        >
          <div className="text-center">
            <h2 className="text-2xl font-cinzel font-bold mb-4 text-green-400">Special Offer Details</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="p-4 bg-mystic-800/30 rounded-lg border border-mystic-700/50">
                <div className="text-3xl mb-2">📄</div>
                <h3 className="font-semibold text-white mb-2">10,000+ Word Report</h3>
                <p className="text-sm text-mystic-300">Comprehensive analysis covering wealth, relationships, health, and career</p>
              </div>
              <div className="p-4 bg-mystic-800/30 rounded-lg border border-mystic-700/50">
                <div className="text-3xl mb-2">👨‍🏫</div>
                <h3 className="font-semibold text-white mb-2">Expert Consultation</h3>
                <p className="text-sm text-mystic-300">One-on-one consultation with experienced Bazi master</p>
              </div>
              <div className="p-4 bg-mystic-800/30 rounded-lg border border-mystic-700/50">
                <div className="text-3xl mb-2">📅</div>
                <h3 className="font-semibold text-white mb-2">Annual Fortune Analysis</h3>
                <p className="text-sm text-mystic-300">3-year fortune prediction with guidance for success</p>
              </div>
            </div>
            
                                                               <div className="text-center p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
                      <h3 className="text-xl font-cinzel font-bold mb-2 text-green-400">Special Offer Price</h3>
                      <div className="text-3xl font-bold text-white mb-2">$30</div>
                      <p className="text-mystic-300">Limited time offer - Completed within 3-5 business days</p>
                    </div>
          </div>
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
                className="w-full px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white placeholder-mystic-400 focus:border-green-500/50 focus:outline-none transition-colors"
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
                className="w-full px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white placeholder-mystic-400 focus:border-green-500/50 focus:outline-none transition-colors"
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
                className="w-full px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white focus:border-green-500/50 focus:outline-none transition-colors"
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
                className="w-full px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white focus:border-green-500/50 focus:outline-none transition-colors"
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
                className="w-full px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white focus:border-green-500/50 focus:outline-none transition-colors"
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
                className="w-full px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white placeholder-mystic-400 focus:border-green-500/50 focus:outline-none transition-colors"
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
                       className="w-full px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white placeholder-mystic-400 focus:border-green-500/50 focus:outline-none transition-colors resize-none"
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
                           className="mt-1 h-4 w-4 text-green-500 border-mystic-700 focus:ring-green-500 focus:ring-2"
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
                           className="mt-1 h-4 w-4 text-green-500 border-mystic-700 focus:ring-green-500 focus:ring-2"
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

            {/* PayPal Payment Button */}
            <div className="space-y-4">
              <a
                href={"https://www.paypal.com/ncp/payment/9C2AYQDRSB9XY?return_url=" + encodeURIComponent(window.location.origin + '/form-bazi-discount')}
                className="inline-block w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-poppins font-semibold py-4 px-8 rounded-full hover:from-blue-400 hover:to-blue-500 transition-all duration-300 text-center tracking-wide flex items-center justify-center space-x-2"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.067 8.478c.492.315.844.825.844 1.406 0 .58-.352 1.09-.844 1.406-.492.315-1.156.51-1.875.51h-1.406c-.492 0-.844-.195-.844-.51 0-.315.352-.51.844-.51h1.406c.352 0 .703-.195.703-.406 0-.21-.351-.406-.703-.406h-1.406c-.492 0-.844-.195-.844-.51 0-.315.352-.51.844-.51h1.406c.719 0 1.383.195 1.875.51zM12.5 8.478c.492.315.844.825.844 1.406 0 .58-.352 1.09-.844 1.406-.492.315-1.156.51-1.875.51h-1.406c-.492 0-.844-.195-.844-.51 0-.315.352-.51.844-.51h1.406c.352 0 .703-.195.703-.406 0-.21-.351-.406-.703-.406h-1.406c-.492 0-.844-.195-.844-.51 0-.315.352-.51.844-.51h1.406c.719 0 1.383.195 1.875.51zM7.5 8.478c.492.315.844.825.844 1.406 0 .58-.352 1.09-.844 1.406-.492.315-1.156.51-1.875.51H4.219c-.492 0-.844-.195-.844-.51 0-.315.352-.51.844-.51h1.406c.352 0 .703-.195.703-.406 0-.21-.351-.406-.703-.406H4.219c-.492 0-.844-.195-.844-.51 0-.315.352-.51.844-.51h1.406c.719 0 1.383.195 1.875.51z"/>
                </svg>
                <span>Pay $30 with PayPal</span>
              </a>
              
              <div className="text-center">
                <p className="text-sm text-mystic-300 mb-2">After payment, please submit the form below</p>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-mystic-600 to-transparent"></div>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-poppins font-semibold py-4 px-8 rounded-full hover:from-green-400 hover:to-emerald-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Information Form'}
            </motion.button>
          </form>

          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link
              to="/free-bazi-report"
              className="inline-flex items-center space-x-2 text-mystic-300 hover:text-green-400 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Free Report</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  )
}

export default BaziFormDiscount 