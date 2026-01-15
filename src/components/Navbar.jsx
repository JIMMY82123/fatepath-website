import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles } from 'lucide-react'
import GPTButton from './GPTButton'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isToolsOpen, setIsToolsOpen] = useState(false)
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(false)
  const toolsMenuRef = useRef(null)
  const location = useLocation()

  // 关闭下拉菜单当点击外部
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(event.target)) {
        setIsToolsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/blog', label: 'Blog' },
    { 
      label: 'Bazi Tools',
      hasDropdown: true,
      items: [
        { path: '/free-bazi-report', label: 'Free Bazi Report' },
        { path: '/tools/day-master-calculator', label: 'Day Master Strength Calculator' },
        { path: '/tools/true-solar-time-calculator', label: 'True Solar Time Calculator' },
        { path: '/tools/ten-gods-analyzer', label: 'Ten Gods Analyzer' },
        { path: '/celebrities-born-today', label: 'Famous People Born Today' },
        { path: '/resources', label: 'Resources' }
      ]
    },
    { path: '/testimonials', label: 'Testimonials' },
    { path: '/faq', label: 'FAQ' },
    { path: '/contact', label: 'Contact' }
  ]

  // 检查当前路径是否在工具菜单中
  const isToolsActive = navItems.find(item => item.hasDropdown && item.items?.some(subItem => location.pathname === subItem.path))

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
            {navItems.map((item) => {
              if (item.hasDropdown) {
                return (
                  <div 
                    key={item.label}
                    ref={toolsMenuRef}
                    className="relative"
                    onMouseEnter={() => setIsToolsOpen(true)}
                    onMouseLeave={() => setIsToolsOpen(false)}
                  >
                    <button
                      className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                        isToolsActive
                          ? 'text-gold-400' 
                          : 'text-mystic-300 hover:text-gold-400'
                      }`}
                    >
                      <span>{item.label}</span>
                    </button>
                    {isToolsActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-400"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    
                    <AnimatePresence>
                      {isToolsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-mystic-900/95 backdrop-blur-md border border-mystic-700/50 rounded-lg shadow-xl z-50 overflow-hidden"
                        >
                          <div className="py-2">
                            {item.items.map((subItem) => (
                              <Link
                                key={subItem.path}
                                to={subItem.path}
                                className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                                  isActive(subItem.path)
                                    ? 'text-gold-400 bg-mystic-800/50'
                                    : 'text-mystic-300 hover:text-gold-400 hover:bg-mystic-800/30'
                                }`}
                                onClick={() => setIsToolsOpen(false)}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              }
              
              return (
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
              )
            })}
            
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
              {navItems.map((item) => {
                if (item.hasDropdown) {
                  return (
                    <div key={item.label}>
                      <button
                        onClick={() => setIsMobileToolsOpen(!isMobileToolsOpen)}
                        className={`mobile-nav-item w-full text-left block text-base font-medium transition-colors duration-200 rounded-lg px-3 py-2 flex items-center justify-between ${
                          isToolsActive
                            ? 'text-gold-400 bg-mystic-800/50' 
                            : 'text-mystic-300 hover:text-gold-400 hover:bg-mystic-800/30'
                        }`}
                      >
                        <span>{item.label}</span>
                      </button>
                      <AnimatePresence>
                        {isMobileToolsOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 space-y-1"
                          >
                            {item.items.map((subItem) => (
                              <Link
                                key={subItem.path}
                                to={subItem.path}
                                onClick={() => {
                                  setIsOpen(false)
                                  setIsMobileToolsOpen(false)
                                }}
                                className={`mobile-nav-item block text-sm font-medium transition-colors duration-200 rounded-lg px-3 py-2 ${
                                  isActive(subItem.path)
                                    ? 'text-gold-400 bg-mystic-800/50' 
                                    : 'text-mystic-300 hover:text-gold-400 hover:bg-mystic-800/30'
                                }`}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`mobile-nav-item block text-base font-medium transition-colors duration-200 rounded-lg px-3 py-2 ${
                      isActive(item.path) 
                        ? 'text-gold-400 bg-mystic-800/50' 
                        : 'text-mystic-300 hover:text-gold-400 hover:bg-mystic-800/30'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
              
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