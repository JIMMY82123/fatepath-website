import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MessageCircle, Mail, Phone, MapPin, Star, Sparkles } from 'lucide-react'

const Footer = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/8615914228258', '_blank')
  }

  const handleEmailClick = () => {
    window.open('mailto:chenxiao0801@hotmail.com', '_blank')
  }

  return (
    <footer className="bg-mystic-800/50 border-t border-mystic-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 品牌信息 */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-8 w-8 text-gold-400" />
                <h3 className="text-2xl font-playfair font-bold gradient-text">
                  玄印 (Xuan Yin)
                </h3>
              </div>
              <p className="text-mystic-300 leading-relaxed max-w-md">
                Professional numerologist with 15+ years of experience in traditional 
                Chinese Bazi analysis. Helping you find your true path through ancient wisdom.
              </p>
            </motion.div>

            {/* 联系按钮 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={handleWhatsAppClick}
                className="group bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105"
              >
                <MessageCircle className="h-5 w-5" />
                <span>WhatsApp: +86 15914228258</span>
              </button>
              
              <button
                onClick={handleEmailClick}
                className="group bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105"
              >
                <Mail className="h-5 w-5" />
                <span>Email: chenxiao0801@hotmail.com</span>
              </button>
            </motion.div>
          </div>



          {/* 快速链接 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-lg font-playfair font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-mystic-300 hover:text-gold-400 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-mystic-300 hover:text-gold-400 transition-colors duration-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-mystic-300 hover:text-gold-400 transition-colors duration-300">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-mystic-300 hover:text-gold-400 transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* 底部版权信息 */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-mystic-700/50 mt-8 pt-8 text-center"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-mystic-400 text-sm">
              © 2024 玄印 (Xuan Yin). All rights reserved. Traditional Chinese Numerology & Bazi Analysis.
            </p>
            <div className="flex items-center space-x-2 text-sm text-mystic-400">
              <Star className="h-4 w-4 text-gold-400" />
              <span>Professional & Trusted</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer 