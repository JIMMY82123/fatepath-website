import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { getGPTLink } from '../config/externalLinks'

const GPTButton = ({ variant = 'default', className = '' }) => {
  const handleGPTClick = () => {
    window.open(getGPTLink('fatePathGPT'), '_blank')
  }

  const buttonVariants = {
    default: "flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl",
    mobile: "w-full flex items-center space-x-3 px-3 py-3 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-white text-base font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl",
    footer: "text-sm sm:text-base text-mystic-300 hover:text-gold-400 transition-colors duration-300 flex items-center space-x-2",
    icon: "text-mystic-400 hover:text-gold-400 transition-colors"
  }

  const buttonClass = buttonVariants[variant] || buttonVariants.default

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleGPTClick}
        className={buttonClass}
      >
        <Sparkles className="h-4 w-4" />
        <span>AI Chat</span>
      </button>
    </div>
  )
}

export default GPTButton 