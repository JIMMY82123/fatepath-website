import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, ChevronDown, Sparkles, Zap, Brain } from 'lucide-react'
import { getGPTLink } from '../config/externalLinks'

const GPTButton = ({ variant = 'default', className = '' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const aiTools = [
    {
      name: 'FatePath GPT',
      icon: <Sparkles className="h-4 w-4" />,
      link: getGPTLink('fatePathGPT'),
      color: 'from-gold-500 to-gold-600',
      hoverColor: 'from-gold-400 to-gold-500',
      description: 'BaZi Destiny Decoder'
    },
    {
      name: 'ChatGPT',
      icon: <Bot className="h-4 w-4" />,
      link: getGPTLink('chatGPT'),
      color: 'from-green-500 to-green-600',
      hoverColor: 'from-green-400 to-green-500'
    },
    {
      name: 'Claude',
      icon: <Brain className="h-4 w-4" />,
      link: getGPTLink('claude'),
      color: 'from-orange-500 to-orange-600',
      hoverColor: 'from-orange-400 to-orange-500'
    },
    {
      name: 'Gemini',
      icon: <Zap className="h-4 w-4" />,
      link: getGPTLink('gemini'),
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'from-blue-400 to-blue-500'
    }
  ]

  const handleToolClick = (link) => {
    window.open(link, '_blank')
    setIsOpen(false)
  }

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const buttonVariants = {
    default: "flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl",
    mobile: "w-full flex items-center space-x-3 px-3 py-3 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-white text-base font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl",
    footer: "text-sm sm:text-base text-mystic-300 hover:text-gold-400 transition-colors duration-300 flex items-center space-x-2",
    icon: "text-mystic-400 hover:text-gold-400 transition-colors"
  }

  const buttonClass = buttonVariants[variant] || buttonVariants.default

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {variant === 'dropdown' ? (
        // 下拉菜单版本
        <>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Sparkles className="h-4 w-4" />
            <span>AI Tools</span>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 mt-2 w-56 bg-mystic-800 border border-mystic-700 rounded-lg shadow-xl z-50"
              >
                <div className="py-2">
                  {aiTools.map((tool, index) => (
                    <button
                      key={tool.name}
                      onClick={() => handleToolClick(tool.link)}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left text-mystic-300 hover:text-white hover:bg-mystic-700 transition-colors duration-200"
                    >
                      <div className={`p-1 rounded bg-gradient-to-r ${tool.color}`}>
                        {tool.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{tool.name}</span>
                        {tool.description && (
                          <span className="text-xs text-mystic-400">{tool.description}</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        // 简单按钮版本
        <button
          onClick={() => handleToolClick(getGPTLink('fatePathGPT'))}
          className={buttonClass}
        >
          <Sparkles className="h-4 w-4" />
          <span>AI Chat</span>
        </button>
      )}
    </div>
  )
}

export default GPTButton 