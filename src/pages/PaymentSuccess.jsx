import { motion } from 'framer-motion'
import { CheckCircle, ArrowLeft, Mail } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

const PaymentSuccess = () => {
  const { service } = useParams()

  const getServiceName = (serviceType) => {
    switch (serviceType) {
      case 'bazi':
        return 'Detailed Bazi Reading'
      case 'love':
        return 'Love Compatibility Reading'
      case 'talisman':
        return 'Custom Talisman'
      default:
        return 'Service'
    }
  }

  const getDeliveryTime = (serviceType) => {
    switch (serviceType) {
      case 'talisman':
        return '7-10 days'
      default:
        return '24 hours'
    }
  }

  return (
    <div className="min-h-screen pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mystic-card p-8 sm:p-12"
        >
          <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-6" />
          <h1 className="text-3xl font-cinzel font-bold mb-4 text-white">
            Payment Successful!
          </h1>
          <p className="text-mystic-300 mb-6 text-lg">
            Thank you for your payment. Your {getServiceName(service)} order has been confirmed.
          </p>
          
          <div className="bg-mystic-800 p-6 rounded-lg mb-8">
            <div className="inline-flex items-center justify-center w-8 w-8 text-gold-400 mx-auto mb-3">
              <Mail className="h-8 w-8 text-gold-400 mx-auto mb-3" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Check Your Email
            </h3>
            <p className="text-mystic-300 text-sm">
              You should receive a payment confirmation email from PayPal shortly. 
              Please check your inbox and spam folder.
            </p>
          </div>

          <div className="bg-mystic-800 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-semibold text-white mb-2">
              Next Steps
            </h3>
            <p className="text-mystic-300 text-sm">
              Your detailed report will be delivered within {getDeliveryTime(service)}. 
              I'll contact you via email with your personalized analysis.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-poppins font-semibold px-8 py-3 rounded-full hover:from-gold-400 hover:to-gold-500 transition-all duration-300"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Return to Home</span>
            </Link>
            
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 border border-gold-500 text-gold-400 font-poppins font-semibold px-8 py-3 rounded-full hover:bg-gold-500 hover:text-black transition-all duration-300"
            >
              <span>Contact Support</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PaymentSuccess 