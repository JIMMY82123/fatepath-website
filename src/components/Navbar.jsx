import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, Sparkles } from 'lucide-react'
import GPTButton from './GPTButton'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/blog', label: 'Blog' },
    { path: '/free-bazi-report', label: 'Free Bazi' },

    { path: '/testimonials', label: 'Testimonials' },
    { path: '/wealth-sign', label: 'Sacred Oracle' },
    { path: '/faq', label: 'FAQ' },
    { path: '/contact', label: 'Contact' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 bg-mystic-900/80 backdrop-blur-md border-b border-mystic-700/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-gold-400" />
            <span className="font-playfair text-lg sm:text-xl font-semibold gradient-text">
              FatePath
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path) 
                    ? 'text-gold-400' 
                    : 'text-mystic-300 hover:text-gold-400'
                }`}
              >
                {item.label}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-400"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            
            {/* GPT Button */}
            <GPTButton variant="default" />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="touch-target text-mystic-300 hover:text-gold-400 transition-colors p-3 -mr-2 rounded-lg hover:bg-mystic-800/30"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-2 border-t border-mystic-700/50">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`mobile-nav-item block text-base font-medium transition-colors duration-200 rounded-lg ${
                    isActive(item.path) 
                      ? 'text-gold-400 bg-mystic-800/50' 
                      : 'text-mystic-300 hover:text-gold-400 hover:bg-mystic-800/30'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile GPT Button */}
              <div className="px-3 py-2">
                <GPTButton variant="mobile" />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar 