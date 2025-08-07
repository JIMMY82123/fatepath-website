import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MessageCircle, Mail, Phone, MapPin, Star, Sparkles, Clock, Globe } from 'lucide-react'
import { getContactLink } from '../config/externalLinks'
import GPTButton from './GPTButton'

const Footer = () => {
  const handleWhatsAppClick = () => {
    window.open(getContactLink('whatsapp'), '_blank')
  }

  const handleEmailClick = () => {
    window.open(getContactLink('email'), '_blank')
  }

  return (
    <footer className="bg-mystic-800/50 border-t border-mystic-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
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
              <a 
                href="https://twitter.com/fatepath_me" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-mystic-400 hover:text-gold-400 transition-colors" 
                title="Follow us on Twitter"
                aria-label="Follow us on Twitter"
              >
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/company/fatepath" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-mystic-400 hover:text-gold-400 transition-colors" 
                title="Connect with us on LinkedIn"
                aria-label="Connect with us on LinkedIn"
              >
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <GPTButton variant="icon" />
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
                <GPTButton variant="footer" />
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
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gold-400" aria-hidden="true" />
                <a 
                  href="mailto:contact@fatepath.com" 
                  className="text-sm sm:text-base text-mystic-300 hover:text-gold-400 transition-colors"
                  aria-label="Send us an email"
                >
                  contact@fatepath.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-gold-400" aria-hidden="true" />
                <span className="text-sm sm:text-base text-mystic-300">24/7 Online Service</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-gold-400" aria-hidden="true" />
                <span className="text-sm sm:text-base text-mystic-300">Worldwide Clients</span>
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