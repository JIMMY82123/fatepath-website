import { motion } from 'framer-motion'
import { CheckCircle, ArrowLeft, Gift, Clock, Mail, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const BaziDiscountThankYou = () => {
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
        <div className="max-w-4xl mx-auto">
          {/* Main Thank You Section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mb-6">
              <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold mb-4 text-white tracking-wide">
              Thank You for Your Special Offer Purchase!
            </h1>
            <p className="text-lg sm:text-xl text-mystic-300 max-w-2xl mx-auto">
              Your discounted Bazi reading request has been submitted successfully. 
              I'm excited to analyze your birth chart and provide you with comprehensive insights.
            </p>
          </motion.div>

          {/* What Happens Next */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mystic-card p-8 mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-cinzel font-bold mb-6 text-center text-white">
              What Happens Next?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-mystic-800/30 rounded-lg border border-mystic-700/50">
                <Clock className="h-12 w-12 text-gold-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Analysis Period</h3>
                <p className="text-sm text-mystic-300">
                  I will carefully analyze your birth chart over the next 3-5 business days
                </p>
              </div>
              <div className="text-center p-6 bg-mystic-800/30 rounded-lg border border-mystic-700/50">
                <Mail className="h-12 w-12 text-gold-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Report Delivery</h3>
                <p className="text-sm text-mystic-300">
                  Your detailed 10,000+ word report will be sent to your email address
                </p>
              </div>
              <div className="text-center p-6 bg-mystic-800/30 rounded-lg border border-mystic-700/50">
                <Star className="h-12 w-12 text-gold-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Expert Consultation</h3>
                <p className="text-sm text-mystic-300">
                  Includes one-on-one consultation and 3-year fortune prediction
                </p>
              </div>
            </div>
          </motion.div>

          {/* Service Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mystic-card p-8 mb-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30"
          >
            <h2 className="text-2xl font-cinzel font-bold mb-6 text-center text-green-400">
              Your Special Offer Package
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Comprehensive Birth Chart Analysis</h3>
                    <p className="text-sm text-mystic-300">Detailed examination of your personality, strengths, and life path</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">10,000+ Word Detailed Report</h3>
                    <p className="text-sm text-mystic-300">Covering wealth, relationships, health, and career guidance</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Expert Master Consultation</h3>
                    <p className="text-sm text-mystic-300">One-on-one session with 15+ years experience</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">3-Year Fortune Prediction</h3>
                    <p className="text-sm text-mystic-300">Strategic guidance for upcoming opportunities and challenges</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mystic-card p-8 mb-8"
          >
            <h2 className="text-2xl font-cinzel font-bold mb-6 text-center text-white">
              Need to Contact Us?
            </h2>
            <div className="text-center space-y-4">
              <p className="text-mystic-300">
                If you have any questions about your reading or need to provide additional information, 
                please don't hesitate to reach out.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-8">
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-gold-400" />
                  <span className="text-mystic-200">chenxiao0801@hotmail.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Gift className="h-5 w-5 text-gold-400" />
                  <span className="text-mystic-200">Reference: Special Offer Bazi Reading</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center space-y-4"
          >
            <Link
              to="/"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-poppins font-semibold px-8 py-4 rounded-full hover:from-gold-400 hover:to-gold-500 transition-all duration-300 text-lg"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Return to Home</span>
            </Link>
            <div className="text-sm text-mystic-400">
              <p>You will receive your detailed report within 3-5 business days</p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default BaziDiscountThankYou
