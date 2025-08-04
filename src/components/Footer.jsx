import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MessageCircle, Mail, Phone, MapPin, Star, Sparkles, Clock, Globe } from 'lucide-react'

const Footer = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/8615914228258', '_blank')
  }

  const handleEmailClick = () => {
    window.open('mailto:chenxiao0801@hotmail.com', '_blank')
  }

  return (
    <footer className="bg-mystic-800/50 border-t border-mystic-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Company Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-gold-400" />
              <span className="font-playfair text-lg sm:text-xl font-semibold gradient-text">
                FatePath
              </span>
            </div>
            <p className="text-sm sm:text-base text-mystic-300 mb-4 leading-relaxed">
              Professional Chinese numerology and BaZi reading services. Discover your true path through ancient wisdom and personalized guidance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-mystic-400 hover:text-gold-400 transition-colors">
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-mystic-400 hover:text-gold-400 transition-colors">
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="text-mystic-400 hover:text-gold-400 transition-colors">
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg sm:text-xl font-cinzel font-semibold text-white mb-4 sm:mb-6">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link to="/" className="text-sm sm:text-base text-mystic-300 hover:text-gold-400 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm sm:text-base text-mystic-300 hover:text-gold-400 transition-colors duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/free-bazi-report" className="text-sm sm:text-base text-mystic-300 hover:text-gold-400 transition-colors duration-300">
                  Free Bazi Report
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm sm:text-base text-mystic-300 hover:text-gold-400 transition-colors duration-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm sm:text-base text-mystic-300 hover:text-gold-400 transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg sm:text-xl font-cinzel font-semibold text-white mb-4 sm:mb-6">Contact</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gold-400" />
                <span className="text-sm sm:text-base text-mystic-300">contact@fatepath.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-gold-400" />
                <span className="text-sm sm:text-base text-mystic-300">24/7 Online Service</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-gold-400" />
                <span className="text-sm sm:text-base text-mystic-300">Worldwide Consultation</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Disclaimer */}
        <div className="mt-6 sm:mt-8 pt-4 border-t border-mystic-700/30">
          <p className="text-xs sm:text-sm text-mystic-500 text-center">
            Results are based on traditional cultural research and are for entertainment purposes only. 
            Not intended as professional advice or decision-making guidance.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 