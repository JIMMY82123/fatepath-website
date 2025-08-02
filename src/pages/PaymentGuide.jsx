import { motion } from 'framer-motion'
import { ArrowLeft, CreditCard, FileText, CheckCircle, Mail, MessageCircle } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

const PaymentGuide = () => {
  const { service } = useParams()

  const serviceConfig = {
    bazi: {
      name: "Detailed Bazi Reading",
      price: "$38",
      paypalLink: "https://www.paypal.com/ncp/payment/NVV4LATSZUD6N",
      formLink: "/form-bazi",
      description: "Comprehensive analysis of your birth chart revealing your personality, career strengths, relationship patterns, and life path guidance.",
      color: "from-purple-500 to-pink-500",
      icon: "⭐"
    },
    love: {
      name: "Love Compatibility Reading",
      price: "$44",
      paypalLink: "https://www.paypal.com/ncp/payment/R9KYJ4LJNBMLY",
      formLink: "/form-love",
      description: "Deep analysis of relationship compatibility, timing for love, and guidance for finding your soulmate through Bazi analysis.",
      color: "from-pink-500 to-red-500",
      icon: "💖"
    },
    talisman: {
      name: "Custom Talisman",
      price: "$129",
      paypalLink: "https://www.paypal.com/ncp/payment/YFMMVQNT7AAMC",
      formLink: "/form-talisman",
      description: "Personalized protection talisman crafted specifically for your unique birth chart to enhance luck, protection, and positive energy flow.",
      color: "from-gold-500 to-orange-500",
      icon: "🛡️"
    }
  }

  const config = serviceConfig[service] || serviceConfig.bazi

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${config.color} mb-6`}>
            <span className="text-2xl">{config.icon}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-cinzel font-bold mb-4 text-white tracking-wide">
            {config.name}
          </h1>
          <p className="text-xl text-mystic-300 mb-4">
            {config.description}
          </p>
          <div className="text-3xl font-poppins font-extrabold gradient-text">
            {config.price}
          </div>
        </motion.div>

        {/* Payment Process */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          {/* Step 1: Payment */}
          <div className="mystic-card p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-gold-400" />
              </div>
              <h3 className="text-xl font-cinzel font-semibold text-white">Step 1: Complete Payment</h3>
            </div>
            <p className="text-mystic-300 mb-6">
              Click the button below to complete your payment securely through PayPal. 
              You'll be redirected to PayPal's secure payment page.
            </p>
            <a
              href={config.paypalLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block w-full bg-gradient-to-r ${config.color} text-white font-poppins font-semibold py-4 px-8 rounded-full hover:opacity-90 transition-all duration-300 text-center tracking-wide`}
            >
              Pay with PayPal
            </a>
          </div>

          {/* Step 2: Form */}
          <div className="mystic-card p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center">
                <FileText className="h-5 w-5 text-gold-400" />
              </div>
              <h3 className="text-xl font-cinzel font-semibold text-white">Step 2: Fill Information Form</h3>
            </div>
            <p className="text-mystic-300 mb-6">
              After payment, please fill out the information form to provide your birth details 
              and any specific questions you have.
            </p>
            <Link
              to={config.formLink}
              className="inline-block w-full border border-gold-500/50 text-gold-400 font-poppins font-semibold py-4 px-8 rounded-full hover:bg-gold-500/10 transition-all duration-300 text-center tracking-wide"
            >
              Fill Information Form
            </Link>
          </div>
        </motion.div>

        {/* What Happens Next? */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mystic-card p-8 mb-12"
        >
          <h3 className="text-2xl font-cinzel font-semibold text-white mb-6 text-center">
            What Happens Next?
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-3" />
              <h4 className="font-semibold text-gold-400 mb-2">Payment Confirmation</h4>
              <p className="text-mystic-300 text-sm">
                You'll receive a payment confirmation email from PayPal
              </p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-3" />
              <h4 className="font-semibold text-gold-400 mb-2">Form Submission</h4>
              <p className="text-mystic-300 text-sm">
                Submit your information form and receive confirmation
              </p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-3" />
              <h4 className="font-semibold text-gold-400 mb-2">Service Delivery</h4>
              <p className="text-mystic-300 text-sm">
                Receive your detailed report within 3-5 days (or 7-10 for talismans)
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="mystic-card p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-cinzel font-semibold text-white mb-4">
              Contact Information
            </h3>
            <div className="space-y-3 text-mystic-200">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gold-400" />
                <span>Email: chenxiao0801@hotmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-5 w-5 text-gold-400" />
                <span>WhatsApp: Available after payment</span>
              </div>
              <p className="text-sm text-mystic-300 mt-3">
                Please include your payment confirmation number when contacting me.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Back Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 text-center space-x-6"
        >
          <Link
            to="/services"
            className="inline-flex items-center space-x-2 text-mystic-300 hover:text-gold-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Services</span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-mystic-300 hover:text-gold-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default PaymentGuide 