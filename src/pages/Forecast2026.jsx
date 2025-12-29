import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { Calendar, TrendingUp, Shield, Heart, DollarSign, ArrowRight, Star, CheckCircle, Sparkles, ChevronDown, ChevronUp, X } from 'lucide-react'
import SEO from '../components/SEO'
import { getContactLink } from '../config/externalLinks'

const Forecast2026 = () => {
  const currentYear = new Date().getFullYear()
  const is2026 = currentYear >= 2026
  
  // 会员卡片展开状态
  const [expandedCards, setExpandedCards] = useState({})
  
  // Modal状态
  const [selectedZodiac, setSelectedZodiac] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const toggleCard = (cardId) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }))
  }

  // 12生肖预测数据 - 新版通俗口语化
  const zodiacForecasts = {
    Rat: "2026 might feel intense with some unexpected twists and emotional ups and downs. Career needs extra caution, money could fluctuate. But don't worry — your personal BaZi chart shows exactly how to turn challenges into wins. Ready for your custom strategy?",
    Ox: "A year of hidden opportunities! Watch out for office gossip, but powerful helpers will have your back. Love life looks sweet and steady. Finances solid if you plan smart. Curious what's coming for YOU specifically?",
    Tiger: "Your year to ROAR! Energy is high, leadership moments pop up, big career moves possible. Just pace yourself to avoid burning out. Your BaZi reveals the perfect timing — want to see it?",
    Rabbit: "Things speed up fast — your talents get noticed quickly! Great for recognition and new starts. Stay grounded amid the excitement. Your personal chart has even better details...",
    Dragon: "Lucky stars align! Mentors show up, career and money take off. Time to dream big and make it happen. Your BaZi forecast maps the exact roadmap — join to unlock it!",
    Snake: "Fire energy shakes things up a bit — trust your intuition. Wear red for extra protection. Slow and wise wins the race this year. Want your full personalized guidance?",
    Horse: "Your own zodiac year — big transformation ahead! Turbulence at first, but massive growth later. Emotions and career need care. Your BaZi smooths the ride — let's reveal it.",
    Goat: "One of the luckiest! Wealth and relationships flow easily, helpful people everywhere. Enjoy the harmony. Your personal forecast makes it even sweeter.",
    Monkey: "Creative sparks fly! Innovation pays off big. Just manage stress and grab the best chances. Your BaZi shows which ideas will hit jackpot.",
    Rooster: "Steady progress through hard work. Fire brings tests, but you rise stronger. Balance is key. Your detailed chart lights the path.",
    Dog: "Sudden good fortune! Money surprises and leadership roles appear. Go bold — the universe has your back. See your full lucky timeline on Patreon.",
    Pig: "Kindness pays off — support comes when needed. Avoid overthinking money moves. Smooth sailing with smart planning. Your custom BaZi makes it crystal clear."
  }

  const handleZodiacClick = (zodiacName) => {
    setSelectedZodiac(zodiacName)
    setIsModalOpen(true)
    // 防止背景滚动
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedZodiac(null)
    document.body.style.overflow = 'unset'
  }

  // 清理body overflow和ESC键关闭
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal()
      }
    }
    
    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape)
    }
    
    return () => {
      document.body.style.overflow = 'unset'
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isModalOpen])

  const getOrigin = () => {
    if (typeof window !== 'undefined') {
      return window.location.origin
    }
    return 'https://fatepath.me'
  }

  // 八字字符数据
  const heavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
  const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
  
  // 生成飘动的八字字符
  const floatingCharacters = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    char: i < 10 ? heavenlyStems[i] : earthlyBranches[i - 10],
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 4 + Math.random() * 3,
    size: 20 + Math.random() * 15
  }))

  // 五行元素粒子
  const fiveElements = [
    { name: 'Wood', char: '木', color: 'text-green-400', bg: 'bg-green-500/20' },
    { name: 'Fire', char: '火', color: 'text-red-400', bg: 'bg-red-500/20' },
    { name: 'Earth', char: '土', color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
    { name: 'Metal', char: '金', color: 'text-gray-300', bg: 'bg-gray-500/20' },
    { name: 'Water', char: '水', color: 'text-blue-400', bg: 'bg-blue-500/20' }
  ]

  const elementParticles = Array.from({ length: 30 }, (_, i) => {
    const element = fiveElements[Math.floor(Math.random() * fiveElements.length)]
    return {
      id: i,
      ...element,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2
    }
  })

  // 符咒字符
  const talismanChars = ['敕', '令', '符', '印', '靈', '神', '護', '佑', '吉', '祥', '福', '祿', '壽', '財']
  const talismanParticles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    char: talismanChars[i % talismanChars.length],
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 4,
    duration: 5 + Math.random() * 3,
    rotation: Math.random() * 360
  }))

  // 能量流动路径点
  const energyPath = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: (i / 30) * 100,
    y: 30 + Math.sin(i / 3) * 15,
    delay: i * 0.15
  }))

  // 鼠标位置跟踪
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "2026 Bing Wu Year Fortune Forecast & Prediction | FatePath",
    "description": "Discover your 2026 fortune prediction based on Chinese astrology. Get personalized BaZi analysis for career, wealth, relationships, and health in the Bing Wu Fire Horse Year.",
    "url": `${getOrigin()}/2026-forecast`,
    "inLanguage": "en-US",
    "about": {
      "@type": "Thing",
      "name": "2026 Chinese Astrology Forecast"
    }
  }

  const zodiacSigns = [
    { name: 'Rat', clash: true, clashLabel: 'Clash Year', years: [1960, 1972, 1984, 1996], key: 'transformation' },
    { name: 'Ox', years: [1961, 1973, 1985, 1997], key: 'stability' },
    { name: 'Tiger', years: [1962, 1974, 1986, 1998], key: 'opportunity' },
    { name: 'Rabbit', years: [1963, 1975, 1987, 1999], key: 'harmony' },
    { name: 'Dragon', years: [1964, 1976, 1988, 2000], key: 'growth' },
    { name: 'Snake', years: [1965, 1977, 1989, 2001], key: 'wisdom' },
    { name: 'Horse', clash: true, clashLabel: 'Clash Year', years: [1966, 1978, 1990, 2002], key: 'energy' },
    { name: 'Goat', years: [1967, 1979, 1991, 2003], key: 'creativity' },
    { name: 'Monkey', years: [1968, 1980, 1992, 2004], key: 'adaptability' },
    { name: 'Rooster', years: [1969, 1981, 1993, 2005], key: 'precision' },
    { name: 'Dog', years: [1970, 1982, 1994, 2006], key: 'loyalty' },
    { name: 'Pig', years: [1971, 1983, 1995, 2007], key: 'abundance' }
  ]

  const fortuneAreas = [
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Career Fortune",
      description: "Discover optimal timing for career moves, job changes, and business opportunities in 2026.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: "Wealth Fortune",
      description: "Understand your financial cycles, investment timing, and wealth accumulation strategies.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Relationship Fortune",
      description: "Navigate love, marriage, and interpersonal relationships with cosmic timing guidance.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Health Fortune",
      description: "Identify health risks, optimal wellness periods, and preventive care timing.",
      color: "from-purple-500 to-indigo-500"
    }
  ]

  const benefits = [
    "Personalized BaZi chart analysis for 2026",
    "Detailed monthly fortune guidance",
    "Career and wealth timing recommendations",
    "Relationship and health predictions",
    "Feng Shui enhancement strategies",
    "Action plans for each life area"
  ]

  return (
    <>
      <SEO
        title="2026 BaZi Fortune Forecast - Join Patreon for Personalized Guidance | FatePath"
        description="Join Master XuanYin's Patreon community for personalized 2026 BaZi fortune forecasts. Get ongoing monthly guidance for career, wealth, love, and health in the Bing Wu Fire Horse Year. Starting at $15/month - cancel anytime."
        keywords="2026 fortune prediction, 2026 chinese astrology, bing wu year forecast, 2026 bazi prediction, chinese zodiac 2026, 2026 fortune reading, fire horse year 2026, personalized 2026 forecast, chinese astrology 2026, patreon membership, bazi reading membership"
        canonical={`${getOrigin()}/2026-forecast`}
        ogImage={`${getOrigin()}/images/2026-forecast-og.jpg`}
        ogType="website"
        structuredData={structuredData}
      />

      <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-mystic-900 via-mystic-800 to-mystic-900 relative overflow-hidden pb-20 md:pb-0">
        {/* 中国玄学特色背景动画 */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {/* 能量场背景 - 柔和版 */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(250, 204, 21, 0.08) 0%, transparent 50%)`
            }}
            animate={{
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* 能量流动路径 */}
          <svg className="absolute inset-0 w-full h-full opacity-20" style={{ zIndex: 0 }} viewBox="0 0 1000 600" preserveAspectRatio="none">
            <defs>
              <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 0,180 Q 250,120 500,240 T 1000,180"
              stroke="url(#energyGradient)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="10,10"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 0],
                opacity: [0, 0.6, 0]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          </svg>

          {/* 能量流动粒子 - 柔和版 */}
          {energyPath.map((point, index) => (
            <motion.div
              key={point.id}
              className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full"
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`,
                boxShadow: '0 0 8px rgba(250, 204, 21, 0.5)'
              }}
              animate={{
                scale: [0, 1.2, 0],
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: point.delay,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* 飘动的八字字符 - 柔和版 */}
          {floatingCharacters.map((char) => (
            <motion.div
              key={char.id}
              className="absolute text-yellow-400/15 font-bold"
              style={{
                left: `${char.x}%`,
                top: `${char.y}%`,
                fontSize: `${char.size}px`,
                fontFamily: 'serif',
                textShadow: '0 0 8px rgba(250, 204, 21, 0.2)'
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 15, 0],
                opacity: [0.08, 0.18, 0.08],
                rotate: [0, 180],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: char.duration * 1.5,
                repeat: Infinity,
                delay: char.delay,
                ease: "easeInOut"
              }}
            >
              {char.char}
            </motion.div>
          ))}

          {/* 五行元素粒子 - 柔和版 */}
          {elementParticles.map((particle) => (
            <motion.div
              key={particle.id}
              className={`absolute ${particle.color} font-bold`}
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                fontSize: '16px',
                textShadow: `0 0 6px currentColor`,
                opacity: 0.15
              }}
              animate={{
                y: [0, -25, 0],
                x: [0, Math.sin(particle.id) * 12, 0],
                opacity: [0.12, 0.25, 0.12],
                scale: [0.9, 1.15, 0.9],
                rotate: [0, 90, 180]
              }}
              transition={{
                duration: particle.duration * 1.8,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut"
              }}
            >
              {particle.char}
            </motion.div>
          ))}

          {/* 符咒飘动 - 柔和版 */}
          {talismanParticles.map((talisman) => (
            <motion.div
              key={talisman.id}
              className="absolute text-red-400/20 font-bold"
              style={{
                left: `${talisman.x}%`,
                top: `${talisman.y}%`,
                fontSize: '20px',
                fontFamily: 'serif',
                textShadow: '0 0 10px rgba(239, 68, 68, 0.3)',
                transform: `rotate(${talisman.rotation}deg)`
              }}
              animate={{
                y: [0, -35, 0],
                x: [0, Math.cos(talisman.id) * 18, 0],
                opacity: [0.08, 0.2, 0.08],
                rotate: [talisman.rotation, talisman.rotation + 180],
                scale: [0.95, 1.05, 0.95]
              }}
              transition={{
                duration: talisman.duration * 1.6,
                repeat: Infinity,
                delay: talisman.delay,
                ease: "easeInOut"
              }}
            >
              {talisman.char}
            </motion.div>
          ))}

          {/* 高级太极图动画 - 柔和版 */}
          <motion.div
            className="absolute top-20 right-10"
            style={{ fontSize: '120px' }}
            animate={{ 
              rotate: 360,
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              rotate: { duration: 30, repeat: Infinity, ease: "linear" },
              scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <div className="relative">
              <div className="text-yellow-400/15">☯</div>
              {/* 太极能量环 */}
              <motion.div
                className="absolute inset-0 border-2 border-yellow-400/20 rounded-full"
                style={{ width: '140px', height: '140px', top: '-10px', left: '-10px' }}
                animate={{
                  rotate: -360,
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                  scale: { duration: 5, repeat: Infinity },
                  opacity: { duration: 4, repeat: Infinity }
                }}
              />
              <motion.div
                className="absolute inset-0 border border-red-400/15 rounded-full"
                style={{ width: '160px', height: '160px', top: '-20px', left: '-20px' }}
                animate={{
                  rotate: 360,
                  scale: [1, 1.15, 1]
                }}
                transition={{
                  rotate: { duration: 40, repeat: Infinity, ease: "linear" },
                  scale: { duration: 8, repeat: Infinity }
                }}
              />
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-20 left-10"
            style={{ fontSize: '100px' }}
            animate={{ 
              rotate: -360,
              scale: [1, 1.08, 1]
            }}
            transition={{ 
              rotate: { duration: 35, repeat: Infinity, ease: "linear" },
              scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <div className="relative">
              <div className="text-red-400/15">☯</div>
              {/* 反向旋转的能量环 */}
              <motion.div
                className="absolute inset-0 border-2 border-red-400/20 rounded-full"
                style={{ width: '120px', height: '120px', top: '-10px', left: '-10px' }}
                animate={{
                  rotate: 360,
                  scale: [1, 1.15, 1],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{
                  rotate: { duration: 28, repeat: Infinity, ease: "linear" },
                  scale: { duration: 5, repeat: Infinity },
                  opacity: { duration: 4, repeat: Infinity }
                }}
              />
            </div>
          </motion.div>

          {/* 能量波纹效果 - 柔和版 */}
          {Array.from({ length: 3 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 border-2 border-yellow-400/15 rounded-full"
              style={{
                width: 200 + i * 100,
                height: 200 + i * 100,
                transform: 'translate(-50%, -50%)'
              }}
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.3, 0, 0.3]
              }}
              transition={{
                duration: 6 + i * 1.5,
                repeat: Infinity,
                delay: i * 2,
                ease: "easeOut"
              }}
            />
          ))}
        </div>

        {/* Hero Section - 控制高度在600-700px */}
        <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden z-10 min-h-[600px] md:min-h-[700px] flex items-center">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 animate-pulse"></div>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
            
            {/* 高级风水罗盘效果 - 柔和版 */}
            <motion.div
              className="absolute top-1/2 left-1/4"
              style={{ transform: 'translate(-50%, -50%)' }}
            >
              {/* 外圈 */}
              <motion.div
                className="w-64 h-64 border-2 border-yellow-400/20 rounded-full relative"
                animate={{ rotate: 360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              >
                {/* 方向指示 */}
                <div className="absolute top-0 left-1/2 w-1 h-12 bg-yellow-400/25" style={{ transform: 'translateX(-50%)' }}></div>
                <div className="absolute bottom-0 left-1/2 w-1 h-12 bg-yellow-400/25" style={{ transform: 'translateX(-50%)' }}></div>
                <div className="absolute left-0 top-1/2 w-12 h-1 bg-yellow-400/25" style={{ transform: 'translateY(-50%)' }}></div>
                <div className="absolute right-0 top-1/2 w-12 h-1 bg-yellow-400/25" style={{ transform: 'translateY(-50%)' }}></div>
                
                {/* 方向文字 */}
                <div className="absolute top-2 left-1/2 text-yellow-400/35 text-xs font-bold" style={{ transform: 'translateX(-50%)' }}>北</div>
                <div className="absolute bottom-2 left-1/2 text-yellow-400/35 text-xs font-bold" style={{ transform: 'translateX(-50%)' }}>南</div>
                <div className="absolute left-2 top-1/2 text-yellow-400/35 text-xs font-bold" style={{ transform: 'translateY(-50%)' }}>西</div>
                <div className="absolute right-2 top-1/2 text-yellow-400/35 text-xs font-bold" style={{ transform: 'translateY(-50%)' }}>东</div>
              </motion.div>
              
              {/* 内圈 - 反向旋转 */}
              <motion.div
                className="absolute top-1/2 left-1/2 w-32 h-32 border border-orange-400/15 rounded-full"
                style={{ transform: 'translate(-50%, -50%)' }}
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-400/40 rounded-full" style={{ transform: 'translate(-50%, -50%)' }}></div>
              </motion.div>
            </motion.div>
          </div>

          <div className="container mx-auto max-w-6xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Year Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-full px-6 py-3 mb-6 relative"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-5 w-5 text-yellow-400" />
                </motion.div>
                <span className="text-yellow-400 font-semibold">2026 Bing Wu Year</span>
                <span className="text-mystic-300">Fire Horse Year</span>
              </motion.div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
                Unlock Your Personalized 2026 BaZi Fortune Forecast
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 mt-2">
                  + Ongoing Monthly Guidance
                </span>
              </h1>

              <p className="text-base md:text-lg text-mystic-300 mb-6 md:mb-8 max-w-4xl mx-auto leading-relaxed">
                Join Master XuanYin's exclusive <strong className="text-yellow-400">Patreon community</strong> for in-depth 2026 predictions (career, wealth, love, health), regular fortune tips, and direct Q&A access – <strong className="text-orange-400">starting at just $15/month</strong>. Cancel anytime.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-6 md:mb-8">
                <motion.a
                  href="https://patreon.com/XuanYin178?utm_medium=unknown&utm_source=google&utm_campaign=2026forecast&utm_content=herobutton"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-gradient-to-r from-orange-500 to-red-500 text-white px-10 py-5 rounded-lg font-bold text-xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 flex items-center gap-3"
                >
                  <span>Join Patreon Now</span>
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </motion.a>

                <motion.a
                  href="#membership"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-yellow-400 text-yellow-400 px-8 py-5 rounded-lg font-bold text-lg hover:bg-yellow-400/10 transition-all duration-300"
                >
                  View Membership Details
                </motion.a>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-6 text-sm text-mystic-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Cancel Anytime</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Secure Payments via Patreon</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Direct Access to Master XuanYin</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Membership Tiers Section - 可折叠式 */}
        <section id="membership" className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 md:mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">
                Choose Your <span className="text-yellow-400">Membership Tier</span>
              </h2>
              <p className="text-lg md:text-xl text-mystic-300 max-w-3xl mx-auto">
                All tiers include ongoing 2026 fortune guidance and direct access to Master XuanYin
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {/* Foundation Guidance - 可折叠 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-2 border-blue-500/30 rounded-xl md:rounded-2xl p-5 md:p-6 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <div className="text-xs md:text-sm font-semibold text-blue-400 mb-1 md:mb-2">Essential Guidance</div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">FOUNDATION GUIDANCE</h3>
                  <div className="mb-4 md:mb-5">
                    <span className="text-3xl md:text-4xl font-bold text-white">$15</span>
                    <span className="text-mystic-400 ml-2">/month</span>
                  </div>
                  <p className="text-sm md:text-base text-mystic-300 mb-4 leading-relaxed">
                    Your ongoing access to personalized BaZi insights and fortune guidance through direct chat.
                  </p>
                  
                  {/* 简版卖点 */}
                  <div className="mb-4 space-y-2">
                    <div className="flex items-start gap-2 text-mystic-300 text-sm">
                      <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span>Unlimited questions with personalized responses</span>
                    </div>
                    <div className="flex items-start gap-2 text-mystic-300 text-sm">
                      <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span>Regular fortune tips and community access</span>
                    </div>
                  </div>

                  {/* 展开/收起按钮 */}
                  <button
                    onClick={() => toggleCard(0)}
                    className="w-full flex items-center justify-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-semibold mb-4 transition-colors"
                  >
                    {expandedCards[0] ? (
                      <>
                        <span>Hide Full Details</span>
                        <ChevronUp className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        <span>View Full Details</span>
                        <ChevronDown className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  {/* 完整权益列表 - 可折叠 */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedCards[0] ? 'auto' : 0,
                      opacity: expandedCards[0] ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-3 mb-4">
                      <div className="flex items-start gap-2 text-mystic-300 text-sm">
                        <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span>Thoughtful, tailored responses (usually within 48 hours)</span>
                      </div>
                      <div className="flex items-start gap-2 text-mystic-300 text-sm">
                        <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span>Access to exclusive community posts and Q&A threads</span>
                      </div>
                    </div>
                    <p className="text-xs text-mystic-400 mb-4 italic">
                      To begin: Send me your birth details (date, time, location, gender) via private message after joining – we can start anytime!
                    </p>
                  </motion.div>

                  <motion.a
                    href="https://patreon.com/XuanYin178?utm_medium=unknown&utm_source=google&utm_campaign=2026forecast&utm_content=foundation"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="block w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-center py-3 md:py-4 rounded-lg font-bold text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Join on Patreon →
                  </motion.a>
                </div>
              </motion.div>

              {/* Advanced Personalized Reading - 可折叠，POPULAR */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/30 rounded-xl md:rounded-2xl p-5 md:p-6 relative overflow-hidden md:scale-105"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-yellow-400 text-mystic-900 text-xs font-bold px-2 py-1 rounded-full">
                  POPULAR
                </div>
                <div className="relative z-10">
                  <div className="text-xs md:text-sm font-semibold text-purple-400 mb-1 md:mb-2">Take your guidance to the next level</div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">ADVANCED PERSONALIZED READING</h3>
                  <div className="mb-4 md:mb-5">
                    <span className="text-3xl md:text-4xl font-bold text-white">$38</span>
                    <span className="text-mystic-400 ml-2">/month</span>
                  </div>
                  <p className="text-sm md:text-base text-mystic-300 mb-4 leading-relaxed">
                    Everything in Foundation Guidance, plus in-depth personalized BaZi reading and feng shui insights.
                  </p>
                  
                  <div className="mb-4 space-y-2">
                    <div className="flex items-start gap-2 text-mystic-300 text-sm">
                      <CheckCircle className="h-4 w-4 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span>In-depth BaZi reading + feng shui recommendations</span>
                    </div>
                    <div className="flex items-start gap-2 text-mystic-300 text-sm">
                      <CheckCircle className="h-4 w-4 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span>Priority responses & deeper life exploration</span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleCard(1)}
                    className="w-full flex items-center justify-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-semibold mb-4 transition-colors"
                  >
                    {expandedCards[1] ? (
                      <>
                        <span>Hide Full Details</span>
                        <ChevronUp className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        <span>View Full Details</span>
                        <ChevronDown className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedCards[1] ? 'auto' : 0,
                      opacity: expandedCards[1] ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-3 mb-4">
                      <div className="flex items-start gap-2 text-mystic-300 text-sm">
                        <CheckCircle className="h-4 w-4 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span>Tailored feng shui recommendations for your home, office, or personal space</span>
                      </div>
                      <div className="flex items-start gap-2 text-mystic-300 text-sm">
                        <CheckCircle className="h-4 w-4 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span>Deeper exploration of career, wealth, relationships, and life decisions</span>
                      </div>
                    </div>
                    <p className="text-xs text-mystic-400 mb-4 italic">
                      Perfect for those seeking detailed, individual support year-round.
                    </p>
                  </motion.div>

                  <motion.a
                    href="https://patreon.com/XuanYin178?utm_medium=unknown&utm_source=google&utm_campaign=2026forecast&utm_content=advanced"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-3 md:py-4 rounded-lg font-bold text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Join on Patreon →
                  </motion.a>
                </div>
              </motion.div>

              {/* Premium Mastery Experience - 可折叠 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/30 rounded-xl md:rounded-2xl p-5 md:p-6 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <div className="text-xs md:text-sm font-semibold text-yellow-400 mb-1 md:mb-2">The ultimate personalized fortune package</div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">PREMIUM MASTERY EXPERIENCE</h3>
                  <div className="mb-4 md:mb-5">
                    <span className="text-3xl md:text-4xl font-bold text-white">$138</span>
                    <span className="text-mystic-400 ml-2">/month</span>
                  </div>
                  <p className="text-sm md:text-base text-mystic-300 mb-4 leading-relaxed">
                    Everything in Advanced Personalized Reading, plus exclusive physical and digital perks.
                  </p>
                  
                  <div className="mb-4 space-y-2">
                    <div className="flex items-start gap-2 text-mystic-300 text-sm">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span>Custom crystal fortune bracelet + blessing ritual video</span>
                    </div>
                    <div className="flex items-start gap-2 text-mystic-300 text-sm">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span>Fastest responses + VIP bonus insights</span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleCard(2)}
                    className="w-full flex items-center justify-center gap-2 text-yellow-400 hover:text-yellow-300 text-sm font-semibold mb-4 transition-colors"
                  >
                    {expandedCards[2] ? (
                      <>
                        <span>Hide Full Details</span>
                        <ChevronUp className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        <span>View Full Details</span>
                        <ChevronDown className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedCards[2] ? 'auto' : 0,
                      opacity: expandedCards[2] ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-3 mb-4">
                      <div className="flex items-start gap-2 text-mystic-300 text-sm">
                        <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <span>In-depth feng shui guidance (feel free to share layout photos)</span>
                      </div>
                      <div className="flex items-start gap-2 text-mystic-300 text-sm">
                        <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <span>Unlimited questions with fastest responses and priority access</span>
                      </div>
                      <div className="flex items-start gap-2 text-mystic-300 text-sm">
                        <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <span>VIP bonus insights and seasonal recommendations</span>
                      </div>
                    </div>
                    <p className="text-xs text-mystic-400 mb-4 italic">
                      For those ready to fully embrace and master their destiny.
                    </p>
                  </motion.div>

                  <motion.a
                    href="https://patreon.com/XuanYin178?utm_medium=unknown&utm_source=google&utm_campaign=2026forecast&utm_content=premium"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="block w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-mystic-900 text-center py-3 md:py-4 rounded-lg font-bold text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Join on Patreon →
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Join Section - 精简版 */}
        <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-mystic-800/50 relative z-10">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Why Join My <span className="text-yellow-400">Patreon Membership</span>?
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-base font-semibold text-white mb-1">Personalized BaZi guidance throughout 2026</h3>
                  <p className="text-sm text-mystic-300">Continuous support as the year unfolds, not just a one-time reading.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-base font-semibold text-white mb-1">Direct chat with Master XuanYin</h3>
                  <p className="text-sm text-mystic-300">Unlimited questions, no waiting for appointments.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-base font-semibold text-white mb-1">Exclusive fortune tips & community</h3>
                  <p className="text-sm text-mystic-300">Member-only insights and energy updates.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-base font-semibold text-white mb-1">Cancel or change tier anytime</h3>
                  <p className="text-sm text-mystic-300">You're in complete control, zero risk.</p>
                </div>
              </div>
            </div>

            {/* Trust Elements */}
            <div className="bg-mystic-700/50 border border-mystic-600 rounded-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-bold text-orange-400">Patreon</div>
                  <span className="text-mystic-300">Secure payments via Patreon</span>
                </div>
                <div className="h-6 w-px bg-mystic-600 hidden md:block"></div>
                <p className="text-mystic-300 text-center md:text-left">
                  You can cancel or downgrade anytime directly on Patreon
                </p>
              </div>
            </div>

            {/* Testimonials */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-mystic-700/30 border border-mystic-600 rounded-lg p-6">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-mystic-300 mb-3 italic">
                  "Incredibly accurate and helpful guidance!"
                </p>
                <p className="text-sm text-mystic-400">– Member from USA</p>
              </div>
              <div className="bg-mystic-700/30 border border-mystic-600 rounded-lg p-6">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-mystic-300 mb-3 italic">
                  "The responses are thoughtful and timely."
                </p>
                <p className="text-sm text-mystic-400">– Member from UK</p>
              </div>
              <div className="bg-mystic-700/30 border border-mystic-600 rounded-lg p-6">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-mystic-300 mb-3 italic">
                  "The monthly guidance has been invaluable for my career decisions."
                </p>
                <p className="text-sm text-mystic-400">– Member from Canada</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-12">
              <motion.a
                href="https://patreon.com/XuanYin178?utm_medium=unknown&utm_source=google&utm_campaign=2026forecast&utm_content=whyjoin"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-10 py-5 rounded-lg font-bold text-xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300"
              >
                Join Patreon Now →
              </motion.a>
            </div>
          </div>
        </section>

        {/* What is 2026 Bing Wu Year Section - 可折叠 */}
        <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <button
                onClick={() => toggleCard('bingwu')}
                className="w-full flex items-center justify-between p-4 bg-mystic-800/50 border border-mystic-700 rounded-lg hover:bg-mystic-800/70 transition-colors"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  What is the <span className="text-yellow-400">2026 Bing Wu Year</span>?
                </h2>
                {expandedCards['bingwu'] ? (
                  <ChevronUp className="h-5 w-5 text-yellow-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-yellow-400" />
                )}
              </button>
              
              <motion.div
                initial={false}
                animate={{
                  height: expandedCards['bingwu'] ? 'auto' : 0,
                  opacity: expandedCards['bingwu'] ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 p-4 bg-mystic-800/30 rounded-lg">
                  <p className="text-base md:text-lg text-mystic-300 leading-relaxed mb-4">
                    The Bing Wu Year combines <strong className="text-red-400">Bing Fire</strong> (Heavenly Stem) with <strong className="text-orange-400">Wu Fire</strong> (Earthly Branch), creating a year of <strong className="text-yellow-400">abundant fire energy</strong>. This powerful combination brings transformation, rapid changes, and dynamic opportunities.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
                      <div className="text-2xl mb-2">🔥</div>
                      <h3 className="font-semibold text-white mb-1">Fire Energy</h3>
                      <p className="text-mystic-300 text-xs">Passion, action, rapid transformation</p>
                    </div>
                    <div className="bg-orange-500/10 border border-orange-500/20 rounded p-3">
                      <div className="text-2xl mb-2">⚡</div>
                      <h3 className="font-semibold text-white mb-1">Dynamic Opportunities</h3>
                      <p className="text-mystic-300 text-xs">Career advancement, breakthroughs</p>
                    </div>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3">
                      <div className="text-2xl mb-2">🎯</div>
                      <h3 className="font-semibold text-white mb-1">Strategic Timing</h3>
                      <p className="text-mystic-300 text-xs">Best months for major decisions</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Fortune Areas Section - 改成横向滑动carousel */}
        <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Your 2026 Fortune in <span className="text-yellow-400">Every Life Area</span>
              </h2>
            </motion.div>

            {/* 横向滑动carousel - 移动端滑动，桌面端网格 */}
            <div className="overflow-x-auto pb-4 scrollbar-hide md:overflow-x-visible">
              <div className="flex md:grid md:grid-cols-4 gap-4 md:gap-6">
                {fortuneAreas.map((area, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-gradient-to-br ${area.color} border border-white/20 rounded-lg p-5 md:p-6 shadow-lg flex-shrink-0 w-[280px] md:w-auto`}
                  >
                    <div className="text-white mb-3 md:mb-4">
                      {area.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">{area.title}</h3>
                    <p className="text-white/90 text-sm md:text-base leading-relaxed">{area.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>



        {/* Zodiac Signs Overview - 优化版：完整12生肖网格 */}
        <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 bg-mystic-800/50 relative z-10">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-6"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                2026 Forecast for <span className="text-yellow-400">All 12 Zodiac Signs</span>
              </h2>
              {/* 引导文字 */}
              <p className="text-base md:text-lg text-orange-400 font-semibold mb-4">
                Tap your Zodiac sign for a fun 2026 sneak peek!
              </p>
            </motion.div>

            {/* 完整12生肖网格 - 3列布局 */}
            <div className="mb-6">
              <div className="grid grid-cols-3 gap-3 md:gap-4">
                {zodiacSigns.map((sign, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.03 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleZodiacClick(sign.name)}
                    className={`bg-mystic-700/50 border-2 rounded-lg p-3 md:p-4 text-center cursor-pointer transition-all hover:bg-mystic-700/70 relative min-h-[80px] md:min-h-[90px] flex flex-col justify-center ${
                      sign.clash 
                        ? 'border-red-500/50 bg-red-500/10 hover:border-red-500/70' 
                        : 'border-mystic-600 hover:border-orange-400/50'
                    }`}
                  >
                    {/* Clash Year标签 */}
                    {sign.clash && (
                      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap z-10">
                        {sign.clashLabel || 'Clash Year'}
                      </div>
                    )}
                    {/* 生肖名称 - 大字 */}
                    <h3 className="text-base md:text-lg font-bold text-white mb-1.5 md:mb-2">{sign.name}</h3>
                    {/* 年份 - 小灰字，点号分隔 */}
                    {sign.years && (
                      <div className="text-[9px] md:text-[10px] text-mystic-400/80 font-normal leading-tight px-1">
                        {sign.years.join(' · ')}
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* 底部CTA文字 */}
            <div className="text-center">
              <motion.a
                href="https://patreon.com/XuanYin178?utm_source=zodiac_section&utm_campaign=2026forecast&utm_content=bottom_cta"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-semibold text-base md:text-lg transition-colors"
              >
                <span>Want the truly accurate forecast for YOU? Join Patreon for your personalized BaZi reading</span>
                <ArrowRight className="h-5 w-5" />
              </motion.a>
            </div>
          </div>
        </section>

        {/* What You Get Section - 合并精简版 */}
        <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                What You'll Get in Your <span className="text-yellow-400">2026 Forecast</span>
              </h2>
            </motion.div>

            <div className="bg-mystic-800/50 border border-mystic-700 rounded-lg p-6 md:p-8 mb-8">
              <ul className="grid md:grid-cols-2 gap-4">
                <li className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span className="text-mystic-300">Personalized BaZi chart analysis for 2026</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span className="text-mystic-300">Detailed monthly fortune guidance</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span className="text-mystic-300">Career and wealth timing recommendations</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span className="text-mystic-300">Relationship and health predictions</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span className="text-mystic-300">Feng Shui enhancement strategies</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span className="text-mystic-300">Action plans for each life area</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 relative z-10">
          {/* 星象闪烁效果 */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 15 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.5, 0.5]
                }}
                transition={{
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>

          <div className="container mx-auto max-w-4xl relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center bg-mystic-800/80 border border-yellow-500/30 rounded-2xl p-12 shadow-2xl"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Unlock Your <span className="text-yellow-400">2026 Fortune</span>?
              </h2>
              <p className="text-lg md:text-xl text-mystic-300 mb-4 max-w-2xl mx-auto">
                Join Master XuanYin's Patreon community today and get personalized BaZi guidance throughout the entire 2026 Fire Horse Year. Starting at just $15/month – cancel anytime.
              </p>

              {/* 限时感文案 */}
              <div className="mb-6">
                <p className="text-base md:text-lg text-orange-400 font-semibold">
                  ⚡ Limited spots for personalized guidance in 2026 – join today!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
                <motion.a
                  href="https://patreon.com/XuanYin178?utm_medium=unknown&utm_source=google&utm_campaign=2026forecast&utm_content=finalcta"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-gradient-to-r from-orange-500 to-red-500 text-white px-10 py-5 rounded-lg font-bold text-xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 flex items-center gap-3"
                >
                  <span>Join Patreon Now</span>
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </motion.a>

                <motion.a
                  href="#membership"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-yellow-400 text-yellow-400 px-10 py-5 rounded-lg font-bold text-xl hover:bg-yellow-400/10 transition-all duration-300"
                >
                  View Membership Tiers
                </motion.a>
              </div>

              <p className="text-sm text-mystic-400">
                Professional BaZi analysis by Master XuanYin • Secure payments via Patreon • Cancel anytime
              </p>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Zodiac Forecast Modal */}
      <AnimatePresence>
        {isModalOpen && selectedZodiac && (
          <>
            {/* 背景遮罩 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
            {/* Modal内容 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-mystic-900 to-mystic-800 border-2 border-orange-500/30 rounded-xl md:rounded-2xl p-5 md:p-8 max-w-lg w-full max-h-[85vh] md:max-h-[80vh] overflow-y-auto shadow-2xl relative custom-scrollbar"
            >
                {/* 关闭按钮 */}
                <button
                  onClick={closeModal}
                  className="absolute top-3 right-3 md:top-4 md:right-4 text-mystic-400 hover:text-white transition-colors z-10 p-1 rounded-full hover:bg-mystic-700/50"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5 md:h-6 md:w-6" />
                </button>

                {/* Modal内容 */}
                <div className="pr-8 md:pr-10">
                  <h2 className="text-xl md:text-3xl font-bold text-white mb-3 md:mb-4">
                    {selectedZodiac} in <span className="text-orange-400">2026 Fire Horse Year</span>
                  </h2>
                  
                  <div className="mt-4 md:mt-6">
                    <div className="text-mystic-200 leading-relaxed text-sm md:text-base space-y-3">
                      {zodiacForecasts[selectedZodiac]?.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 10).map((sentence, index) => (
                        <p key={index} className="mb-2">
                          {sentence.trim()}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* CTA按钮 */}
                  <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-mystic-700">
                    <motion.a
                      href={`https://patreon.com/XuanYin178?utm_source=zodiac_modal&utm_campaign=2026forecast&utm_content=${selectedZodiac.toLowerCase()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="block w-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-3 md:py-4 rounded-lg font-bold text-base md:text-lg shadow-xl hover:shadow-orange-500/50 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <span>Get My Personalized 2026 Forecast on Patreon</span>
                      <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                    </motion.a>
                    <p className="text-xs text-mystic-400 text-center mt-2 md:mt-3">
                      Your unique birth chart reveals precise timing and strategies
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Sticky CTA Button - 固定在底部 */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-mystic-900/95 backdrop-blur-md border-t border-yellow-400/20 shadow-2xl md:hidden"
      >
        <motion.a
          href="https://patreon.com/XuanYin178?utm_medium=unknown&utm_source=google&utm_campaign=2026forecast&utm_content=sticky"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="block w-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-4 rounded-lg font-bold text-lg shadow-xl"
        >
          Join Patreon Now →
        </motion.a>
      </motion.div>

      {/* Desktop Sticky CTA */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5 }}
        className="hidden md:block fixed bottom-6 right-6 z-50"
      >
        <motion.a
          href="https://patreon.com/XuanYin178?utm_medium=unknown&utm_source=google&utm_campaign=2026forecast&utm_content=sticky"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-4 rounded-lg font-bold text-lg shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 flex items-center gap-2"
        >
          <span>Join Patreon</span>
          <ArrowRight className="h-5 w-5" />
        </motion.a>
      </motion.div>
    </>
  )
}

export default Forecast2026

