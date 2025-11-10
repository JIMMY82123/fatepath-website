import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, Share2, Download, Star, Sparkles, Coins } from 'lucide-react'
import { getRandomSign, culturalInfo } from '../data/wealthSigns'
import SEO from '../components/SEO'

const WealthSign = () => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [currentSign, setCurrentSign] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [showMeditation, setShowMeditation] = useState(false)
  const [meditationStep, setMeditationStep] = useState(0)

  const handleFlip = () => {
    if (isAnimating) return
    
    // 开始冥想仪式
    setShowMeditation(true)
    setMeditationStep(0)
    
    // 3秒后开始默念名字
    setTimeout(() => {
      setMeditationStep(1)
      
      // 每2秒一次默念，总共3次
      setTimeout(() => {
        setMeditationStep(2)
        setTimeout(() => {
          setMeditationStep(3)
          setTimeout(() => {
            // 冥想完成，开始抽签
            setShowMeditation(false)
            startDivination()
          }, 2000)
        }, 2000)
      }, 2000)
    }, 3000)
  }

  const startDivination = () => {
    setIsAnimating(true)
    setIsFlipped(true)
    
    // 随机选择签文
    const randomSign = getRandomSign()
    setCurrentSign(randomSign)
    
    // 动画完成后显示结果，确保卡片完全翻转
    setTimeout(() => {
      setIsAnimating(false)
      setShowResult(true)
      // 确保卡片保持翻转状态，显示签文
      if (!isFlipped) {
        setIsFlipped(true)
      }
    }, 1500) // 与动画时间同步
  }

  const handleReset = () => {
    // 先隐藏当前内容，防止重叠
    setShowResult(false)
    setIsAnimating(false)
    
    // 延迟重置其他状态，确保动画完成
    setTimeout(() => {
      setIsFlipped(false)
      setCurrentSign(null)
      setShowMeditation(false)
      setMeditationStep(0)
    }, 300)
  }

  const getLevelColor = (level) => {
    switch (level) {
      case 'Excellent': return 'text-yellow-400'
      case 'Good': return 'text-gray-300'
      case 'Neutral': return 'text-blue-400'
      case 'Challenging': return 'text-orange-400'
      case 'Very Challenging': return 'text-red-400'
      default: return 'text-white'
    }
  }

  const getLevelBgColor = (level) => {
    switch (level) {
      case 'Excellent': return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20'
      case 'Good': return 'bg-gradient-to-r from-gray-500/20 to-slate-500/20'
      case 'Neutral': return 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20'
      case 'Challenging': return 'bg-gradient-to-r from-orange-500/20 to-red-500/20'
      case 'Very Challenging': return 'bg-gradient-to-r from-red-500/20 to-pink-500/20'
      default: return 'bg-mystic-800/50'
    }
  }

  return (
    <>
      <SEO 
        title="Ancient Chinese Wisdom Oracle | Interactive Divination & Fortune Reading | FatePath"
        description="Experience the ancient Chinese Wisdom Oracle for personalized divination and fortune reading. Get guidance through traditional Chinese numerology and interactive oracle system."
        keywords="chinese wisdom oracle, divination, fortune reading, chinese numerology, interactive oracle, ancient wisdom, fortune telling"
        canonical="https://fatepath.me/wealth-sign"
        ogImage="https://fatepath.me/og-image.svg"
        ogType="website"
      />
      
      <div className="min-h-screen pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-mystic-900 via-mystic-800 to-mystic-900">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12"
          >
                     <h1 className="text-3xl sm:text-4xl md:text-6xl font-playfair font-bold mb-4 sm:mb-6">
             <span className="gradient-text">Ancient Chinese Wisdom Oracle</span>
          </h1>
           <p className="text-lg sm:text-xl text-mystic-300 max-w-3xl mx-auto leading-relaxed">
             Discover ancient Chinese decision-making wisdom through our interactive oracle system. 
             Get personalized guidance based on traditional philosophy and modern psychology.
          </p>
        </motion.div>

        {/* Cultural Information */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mystic-card p-4 sm:p-6 mb-6 sm:mb-8 border border-gold-500/20"
        >
          <div className="flex items-center mb-4">
            <Sparkles className="h-6 w-6 text-gold-400 mr-3" />
             <h3 className="text-xl font-cinzel font-semibold text-white">Ancient Decision-Making Framework</h3>
          </div>
          <p className="text-mystic-300 leading-relaxed">
             Based on centuries-old Chinese philosophical principles, this oracle system combines traditional 
             wisdom with modern psychology to provide actionable guidance for life decisions and personal growth.
          </p>
        </motion.div>

        {/* Fortune Stick Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center mb-8"
        >
            {/* Meditation Overlay */}
            <AnimatePresence>
              {showMeditation && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
                  style={{ zIndex: 50 }}
                >
                  <div className="mystic-card p-8 max-w-md mx-4 text-center border-2 border-gold-500/40 shadow-2xl">
                    <div className="text-6xl mb-6">🧘‍♀️</div>
                    
                    {meditationStep === 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <h3 className="text-2xl font-cinzel font-bold text-white mb-4">
                          Sacred Meditation Ritual
                        </h3>
                        <p className="text-mystic-200 leading-relaxed">
                          Before drawing your wisdom card, let us prepare your mind and spirit through an ancient meditation ritual.
                        </p>
                        <div className="flex items-center justify-center space-x-2 text-gold-300">
                          <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium">Preparing sacred space...</span>
                        </div>
                      </motion.div>
                    )}
                    
                    {meditationStep === 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <h3 className="text-xl font-cinzel font-bold text-white mb-4">
                          First Recitation
                        </h3>
                        <div className="text-4xl text-gold-400 mb-4 animate-pulse">1</div>
                        <p className="text-mystic-200">
                          Silently recite your name three times in your heart...
                        </p>
                        <div className="flex items-center justify-center space-x-2 text-gold-300">
                          <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium">Focusing your intention...</span>
                        </div>
                      </motion.div>
                    )}
                    
                    {meditationStep === 2 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <h3 className="text-xl font-cinzel font-bold text-white mb-4">
                          Second Recitation
                        </h3>
                        <div className="text-4xl text-gold-400 mb-4 animate-pulse">2</div>
                        <p className="text-mystic-200">
                          Continue your silent recitation...
                        </p>
                        <div className="flex items-center justify-center space-x-2 text-gold-300">
                          <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium">Deepening your connection...</span>
                        </div>
                      </motion.div>
                    )}
                    
                    {meditationStep === 3 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <h3 className="text-xl font-cinzel font-bold text-white mb-4">
                          Final Recitation
                        </h3>
                        <div className="text-4xl text-gold-400 mb-4 animate-pulse">3</div>
                        <p className="text-mystic-200">
                          Complete your sacred recitation...
                        </p>
                        <div className="flex items-center justify-center space-x-2 text-gold-300">
                          <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium">Preparing to reveal wisdom...</span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          
                    <div className="relative w-full max-w-sm sm:max-w-md md:w-[50rem] lg:w-[60rem] xl:w-[70rem] h-[40rem] sm:h-[44rem] md:h-[52rem] lg:h-[56rem] xl:h-[60rem]">
            {/* 使用条件渲染替代3D翻转，更可靠 */}
            <AnimatePresence mode="wait">
              {!isFlipped ? (
                // 正面 - 财神封面
                <motion.div
                  key="front"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, rotateY: -90 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="w-full h-full"
                >
                  <button 
                    className="mystic-card h-full cursor-pointer hover:scale-105 transition-transform duration-300 border-2 border-gold-500/40 shadow-2xl shadow-gold-500/30 relative overflow-hidden w-full"
                    onClick={handleFlip}
                    aria-label="开始抽签仪式，点击开始神圣的占卜仪式"
                    style={{ touchAction: 'auto', pointerEvents: 'auto' }}
                  >
                    {/* Wealth God Background Image */}
                    <div className="absolute inset-0">
                      <img 
                        src="/images/wealth-god.jpg" 
                        alt="Traditional Chinese Wealth God deity in golden robes, symbolizing prosperity and good fortune" 
                        width={960}
                        height={960}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.log('财神图片加载失败，使用默认背景');
                          e.target.style.display = 'none';
                          const defaultBg = e.target.parentElement.querySelector('.default-bg');
                          if (defaultBg) defaultBg.style.display = 'block';
                        }}
                        onLoad={(e) => {
                          console.log('财神图片加载成功');
                          const defaultBg = e.target.parentElement.querySelector('.default-bg');
                          if (defaultBg) defaultBg.style.display = 'none';
                        }}
                      />
                      {/* Default Background */}
                      <div className="default-bg absolute inset-0 bg-gradient-to-br from-gold-400 via-yellow-600 to-orange-500" style={{ display: 'none' }}>
                        <div className="w-full h-full flex items-center justify-center">
                          <Coins className="h-32 w-32 text-white drop-shadow-lg opacity-50" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Content Overlay */}
                    <div className="relative z-20 h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-center">
                      <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-white mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                        Wisdom Oracle
                      </h3>
                      
                      <p className="text-white text-center mb-6 sm:mb-8 text-sm sm:text-lg leading-relaxed font-medium max-w-sm" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                        Click to begin your sacred divination ritual and receive ancient wisdom guidance.
                      </p>
                      
                      <div className="flex items-center space-x-3 text-gold-300 bg-black/50 px-6 py-3 rounded-full border border-gold-500/40 shadow-lg">
                        <Star className="h-6 w-6" />
                        <span className="text-base font-semibold">Begin Sacred Ritual</span>
                      </div>
                    </div>
                  </button>
                </motion.div>
              ) : (
                // 背面 - 签文结果
                <motion.div
                  key="back"
                  initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="w-full h-full"
                >
                  <div className="mystic-card h-full p-4 sm:p-6 md:p-8 border-2 border-gold-500/30 shadow-2xl shadow-gold-500/20 overflow-y-auto">
                    {currentSign && (
                      <div className="h-full flex flex-col space-y-3 sm:space-y-4">
                        {/* Sign Header */}
                        <div className={`text-center p-3 sm:p-4 rounded-xl ${getLevelBgColor(currentSign.signLevel)} border-2 border-gold-400/40 shadow-lg`}>
                          <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 drop-shadow-lg">{currentSign.icon}</div>
                          <h3 className="text-base sm:text-lg lg:text-xl font-cinzel font-bold text-white mb-2 drop-shadow-md">
                            {currentSign.signNumber}
                          </h3>
                          <p className={`text-sm sm:text-base lg:text-lg font-semibold ${getLevelColor(currentSign.signLevel)} drop-shadow-md`}>
                            {currentSign.signTitle}
                          </p>
                          <p className="text-xs sm:text-sm text-mystic-200 mt-1 font-medium">
                            {currentSign.signLevel} Fortune
                          </p>
                        </div>

                        {/* Traditional Text */}
                        <div className="p-3 sm:p-4 bg-mystic-800/50 rounded-lg border border-gold-500/20">
                          <h4 className="text-xs sm:text-sm font-bold text-gold-400 mb-2 flex items-center">
                            <span className="mr-2 text-sm">📜</span>
                            Ancient Wisdom
                          </h4>
                          <p className="text-mystic-200 text-xs sm:text-sm italic leading-relaxed font-medium drop-shadow-sm">
                            {currentSign.traditionalText}
                          </p>
                        </div>

                        {/* Modern Interpretation */}
                        <div className="p-3 sm:p-4 bg-mystic-800/50 rounded-lg border border-gold-500/20">
                          <h4 className="text-xs sm:text-sm font-bold text-gold-400 mb-2 flex items-center">
                            <span className="mr-2 text-sm">💡</span>
                            Modern Interpretation
                          </h4>
                          <p className="text-white text-xs sm:text-sm leading-relaxed font-medium drop-shadow-sm">
                            {currentSign.signText}
                          </p>
                        </div>

                        {/* Short Interpretation */}
                        <div className="p-3 sm:p-4 bg-mystic-800/50 rounded-lg border border-gold-500/20">
                          <h4 className="text-xs sm:text-sm font-bold text-gold-400 mb-2 flex items-center">
                            <span className="mr-2 text-sm">🎯</span>
                            Action Steps
                          </h4>
                          <p className="text-mystic-200 text-xs sm:text-sm leading-relaxed font-medium drop-shadow-sm">
                            {currentSign.shortInterpretation}
                          </p>
                        </div>

                        {/* Cultural Note */}
                        <div className="p-3 sm:p-4 bg-mystic-800/30 rounded-lg border border-gold-500/10">
                          <h4 className="text-xs font-bold text-gold-400 mb-1 flex items-center">
                            <span className="mr-2 text-xs">🏮</span>
                            Philosophical Background
                          </h4>
                          <p className="text-mystic-300 text-xs leading-relaxed">
                            {currentSign.culturalNote}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
           className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 mt-8"
        >
          <button
            onClick={handleReset}
             className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-mystic-700 to-mystic-800 text-white font-semibold rounded-lg hover:from-mystic-600 hover:to-mystic-700 transition-all duration-300 border border-mystic-600 shadow-lg"
          >
            <RotateCcw className="h-5 w-5" />
             <span>Begin New Ritual</span>
          </button>

          {showResult && (
            <>
               <button 
                 onClick={() => window.open('https://fatepath.me/free-bazi-report', '_blank', 'noopener,noreferrer')}
                 className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold rounded-lg hover:from-gold-400 hover:to-gold-500 transition-all duration-300 shadow-lg"
               >
                <Download className="h-5 w-5" />
                 <span>Get Detailed Analysis</span>
              </button>

               <button 
                 onClick={() => {
                   const shareText = `🔮 Sacred Oracle Reading: "${currentSign.title}" - ${currentSign.shortInterpretation}\n\nDiscover your path at FatePath.me`;
                   const shareUrl = window.location.href;
                   
                   if (navigator.share) {
                     navigator.share({
                       title: 'Sacred Oracle Reading',
                       text: shareText,
                       url: shareUrl
                     });
                   } else {
                     // Fallback: copy to clipboard
                     navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`).then(() => {
                       alert('Reading copied to clipboard!');
                     });
                   }
                 }}
                 className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-400 hover:to-blue-500 transition-all duration-300 shadow-lg"
               >
                <Share2 className="h-5 w-5" />
                <span>Share Result</span>
              </button>
            </>
          )}
        </motion.div>

        {/* Fortune Levels Explanation */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mystic-card p-4 sm:p-6"
        >
                     <h3 className="text-lg sm:text-xl font-cinzel font-semibold text-white mb-3 sm:mb-4 text-center">
             Understanding Wisdom Levels
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {Object.entries(culturalInfo.levels).map(([level, description]) => (
              <div key={level} className={`p-4 rounded-lg ${getLevelBgColor(level)}`}>
                <h4 className={`font-semibold mb-2 ${getLevelColor(level)}`}>
                  {level}
                </h4>
                <p className="text-mystic-300 text-sm">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
    </>
  )
}

export default WealthSign 