import { motion } from 'framer-motion'
import { Shield, Lock, Eye, Trash2, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const Privacy = () => {
  return (
    <div className="min-h-screen pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
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
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-bold mb-3 sm:mb-4 text-white tracking-wide">
            Privacy Policy
          </h1>
          <p className="text-lg sm:text-xl text-mystic-300">
            Your data security and privacy are our top priority
          </p>
        </motion.div>

        {/* Privacy Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mystic-card p-6 sm:p-8 space-y-6 sm:space-y-8"
        >
          {/* Data Collection */}
          <section>
            <h2 className="text-2xl font-cinzel font-bold mb-4 text-gold-400 flex items-center">
              <Lock className="h-6 w-6 mr-2" />
              Data Collection & Usage
            </h2>
            <div className="space-y-4 text-mystic-300">
              <p>
                We collect only the information necessary to provide our Bazi reading services:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Birth Information:</strong> Date, time, and location for accurate Bazi calculation</li>
                <li><strong>Contact Information:</strong> Name and email for service delivery</li>
                <li><strong>Service Preferences:</strong> Your specific questions and areas of interest</li>
              </ul>
              <p className="bg-mystic-800/30 p-4 rounded-lg border border-mystic-700/50">
                <strong>Important:</strong> Your birth data is used exclusively for Bazi calculation and report generation. 
                We do not sell, rent, or share your personal information with third parties.
              </p>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-cinzel font-bold mb-4 text-gold-400 flex items-center">
              <Shield className="h-6 w-6 mr-2" />
              Data Security & Encryption
            </h2>
            <div className="space-y-4 text-mystic-300">
              <p>
                We implement industry-standard security measures to protect your sensitive information:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>End-to-End Encryption:</strong> All data transmission is encrypted using AES-256</li>
                <li><strong>Secure Storage:</strong> Personal data is stored in encrypted databases</li>
                <li><strong>Access Control:</strong> Limited access to personal information on a need-to-know basis</li>
                <li><strong>Regular Audits:</strong> Security practices are regularly reviewed and updated</li>
              </ul>
            </div>
          </section>

          {/* Data Usage Options */}
          <section>
            <h2 className="text-2xl font-cinzel font-bold mb-4 text-gold-400 flex items-center">
              <Eye className="h-6 w-6 mr-2" />
              Data Usage Options
            </h2>
            <div className="space-y-4 text-mystic-300">
              <p>
                You have control over how your data is used:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-mystic-800/30 p-4 rounded-lg border border-mystic-700/50">
                  <h3 className="font-semibold text-white mb-2">One-Time Use Only</h3>
                  <p className="text-sm">Your data will be used only for the current Bazi reading and deleted immediately after service completion.</p>
                </div>
                <div className="bg-mystic-800/30 p-4 rounded-lg border border-mystic-700/50">
                  <h3 className="font-semibold text-white mb-2">Enhanced Service</h3>
                  <p className="text-sm">Allow us to store your data for personalized future services and improved accuracy.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-cinzel font-bold mb-4 text-gold-400 flex items-center">
              <Trash2 className="h-6 w-6 mr-2" />
              Your Rights (GDPR & CCPA)
            </h2>
            <div className="space-y-4 text-mystic-300">
              <p>
                Under GDPR and CCPA, you have the following rights:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
                <li><strong>Right to Rectification:</strong> Correct inaccurate personal data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your personal data ("Right to be Forgotten")</li>
                <li><strong>Right to Portability:</strong> Receive your data in a structured format</li>
                <li><strong>Right to Object:</strong> Object to processing of your personal data</li>
                <li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
              </ul>
              <div className="bg-mystic-800/30 p-4 rounded-lg border border-mystic-700/50">
                <p className="text-sm">
                  <strong>California Residents:</strong> You have the right to know what personal information is collected, 
                  used, shared, or sold. You also have the right to delete your personal information and opt-out of the sale of personal information.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-cinzel font-bold mb-4 text-gold-400">
              Contact Us
            </h2>
            <div className="space-y-4 text-mystic-300">
              <p>
                To exercise your rights or for any privacy-related questions:
              </p>
              <div className="bg-mystic-800/30 p-4 rounded-lg border border-mystic-700/50">
                <p><strong>Email:</strong> privacy@fatepath.com</p>
                <p><strong>Data Deletion Request:</strong> Please include "Data Deletion Request" in the subject line</p>
                <p><strong>Response Time:</strong> We will respond to your request within 30 days</p>
              </div>
            </div>
          </section>

          {/* Do Not Sell */}
          <section className="bg-gradient-to-r from-red-500/20 to-orange-500/20 p-6 rounded-lg border border-red-500/30">
            <h2 className="text-xl font-cinzel font-bold mb-4 text-red-400">
              Do Not Sell My Personal Information
            </h2>
            <p className="text-mystic-300 mb-4">
              We do not sell your personal information. However, if you wish to opt-out of any potential future data sharing, 
              you can do so by contacting us.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500 to-orange-500 text-white font-poppins font-semibold px-6 py-3 rounded-full hover:from-red-400 hover:to-orange-400 transition-all duration-300"
            >
              <Shield className="h-4 w-4" />
              <span>Opt-Out Request</span>
            </Link>
          </section>
        </motion.div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-mystic-300 hover:text-gold-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Privacy 