import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, ArrowLeft, CheckCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Lunar } from 'lunar-javascript'
import SEO from '../components/SEO'

const DayMasterCalculator = () => {
  const [formData, setFormData] = useState({
    dateOfBirth: '',
    timeOfBirth: '',
    birthLocation: ''
  })
  
  const [result, setResult] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // 五行元素映射表
  const elementMapping = {
    '甲': 'Wood', '乙': 'Wood',
    '丙': 'Fire', '丁': 'Fire', 
    '戊': 'Earth', '己': 'Earth',
    '庚': 'Metal', '辛': 'Metal',
    '壬': 'Water', '癸': 'Water',
    '寅': 'Wood', '卯': 'Wood',
    '巳': 'Fire', '午': 'Fire',
    '辰': 'Earth', '戌': 'Earth', '丑': 'Earth', '未': 'Earth',
    '申': 'Metal', '酉': 'Metal',
    '子': 'Water', '亥': 'Water'
  }

  const yinYangMap = {
    '甲': 'Yang', '乙': 'Yin',
    '丙': 'Yang', '丁': 'Yin',
    '戊': 'Yang', '己': 'Yin',
    '庚': 'Yang', '辛': 'Yin',
    '壬': 'Yang', '癸': 'Yin'
  }

  const elementProducingMap = {
    Wood: 'Water',
    Fire: 'Wood',
    Earth: 'Fire',
    Metal: 'Earth',
    Water: 'Metal'
  }

  const generatingElementMap = {
    Wood: 'Fire',
    Fire: 'Earth',
    Earth: 'Metal',
    Metal: 'Water',
    Water: 'Wood'
  }

  const controllingElementMap = {
    Wood: 'Earth',
    Fire: 'Metal',
    Earth: 'Water',
    Metal: 'Wood',
    Water: 'Fire'
  }

  const elementControllingMap = {
    Wood: 'Metal',
    Fire: 'Water',
    Earth: 'Wood',
    Metal: 'Fire',
    Water: 'Earth'
  }

  // 分析五行能量
  const analyzeFiveElements = (bazi) => {
    const elements = { Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 }
    
    // 统计天干
    if (bazi.year) elements[elementMapping[bazi.year.charAt(0)]] = (elements[elementMapping[bazi.year.charAt(0)]] || 0) + 1
    if (bazi.month) elements[elementMapping[bazi.month.charAt(0)]] = (elements[elementMapping[bazi.month.charAt(0)]] || 0) + 1
    if (bazi.day) elements[elementMapping[bazi.day.charAt(0)]] = (elements[elementMapping[bazi.day.charAt(0)]] || 0) + 1
    if (bazi.hour) elements[elementMapping[bazi.hour.charAt(0)]] = (elements[elementMapping[bazi.hour.charAt(0)]] || 0) + 1
    
    // 统计地支
    if (bazi.year) elements[elementMapping[bazi.year.charAt(1)]] = (elements[elementMapping[bazi.year.charAt(1)]] || 0) + 1
    if (bazi.month) elements[elementMapping[bazi.month.charAt(1)]] = (elements[elementMapping[bazi.month.charAt(1)]] || 0) + 1
    if (bazi.day) elements[elementMapping[bazi.day.charAt(1)]] = (elements[elementMapping[bazi.day.charAt(1)]] || 0) + 1
    if (bazi.hour) elements[elementMapping[bazi.hour.charAt(1)]] = (elements[elementMapping[bazi.hour.charAt(1)]] || 0) + 1
    
    return elements
  }

  // 分析日主强弱
  const analyzeDayMasterStrength = (bazi, fiveElements) => {
    if (!bazi || !fiveElements) return null

    const dayStem = bazi.day?.charAt(0)
    const dayBranch = bazi.day?.charAt(1)
    const dayElement = elementMapping[dayStem]

    if (!dayStem || !dayElement) {
      return null
    }

    const polarity = yinYangMap[dayStem] || 'Yang'
    const producerElement = elementProducingMap[dayElement] || null
    const outputElement = generatingElementMap[dayElement] || null
    const wealthElement = controllingElementMap[dayElement] || null
    const officerElement = elementControllingMap[dayElement] || null

    let supportScore = (fiveElements[dayElement] || 0) + (producerElement ? (fiveElements[producerElement] || 0) : 0)
    let drainScore = (outputElement ? (fiveElements[outputElement] || 0) : 0) + (officerElement ? (fiveElements[officerElement] || 0) : 0)

    const monthBranch = bazi.month?.charAt(1)
    const monthElement = elementMapping[monthBranch]
    let seasonalSupport = 0

    if (monthElement === dayElement) {
      seasonalSupport = 1.5
    } else if (monthElement === producerElement) {
      seasonalSupport = 1
    } else if (monthElement === outputElement || monthElement === officerElement) {
      seasonalSupport = -1
    }

    if (seasonalSupport > 0) {
      supportScore += seasonalSupport
    } else if (seasonalSupport < 0) {
      drainScore += Math.abs(seasonalSupport)
    }

    const relativeScore = supportScore - drainScore

    let strength = 'balanced'
    if (relativeScore >= 2) {
      strength = 'strong'
    } else if (relativeScore <= -2) {
      strength = 'weak'
    }

    const strengthDescriptions = {
      strong: `Your ${dayElement} Day Master is strong, supported by abundant self and resource energy. You have good capacity to handle wealth and output. Focus on channeling output and wealth elements to release surplus power while safeguarding rest.`,
      balanced: `Your ${dayElement} Day Master remains relatively balanced. You have moderate capacity to handle both support and output. Maintain the current mix of support and output, and adjust only when major luck cycles shift your elemental landscape.`,
      weak: `Your ${dayElement} Day Master is weak, indicating limited support from self or resource elements. You need more nourishment and support. Prioritize mentors, education, and restorative routines before pushing bold expansion.`
    }

    const strengthLabels = {
      strong: 'Strong',
      balanced: 'Balanced',
      weak: 'Weak'
    }

    // 计算喜用神（Joy Gods）
    const joyGods = []
    if (strength === 'strong') {
      // 强日主喜用：输出、财富、官杀
      if (outputElement) joyGods.push(outputElement)
      if (wealthElement) joyGods.push(wealthElement)
      if (officerElement) joyGods.push(officerElement)
    } else if (strength === 'weak') {
      // 弱日主喜用：自身、生我者
      joyGods.push(dayElement)
      if (producerElement) joyGods.push(producerElement)
    } else {
      // 平衡日主：保持平衡
      joyGods.push(dayElement)
      if (producerElement) joyGods.push(producerElement)
    }

    return {
      dayStem,
      dayBranch,
      dayElement,
      polarity,
      producerElement,
      outputElement,
      wealthElement,
      officerElement,
      supportScore: Number(supportScore.toFixed(1)),
      drainScore: Number(drainScore.toFixed(1)),
      relativeScore: Number(relativeScore.toFixed(1)),
      seasonalSupport,
      strength,
      strengthLabel: strengthLabels[strength],
      summary: strengthDescriptions[strength],
      joyGods: [...new Set(joyGods)],
      focusElements: {
        supportive: [dayElement, producerElement].filter(Boolean),
        balancing: [outputElement, officerElement].filter(Boolean)
      }
    }
  }

  // 计算八字
  const calculateBazi = (date, time) => {
    const birthDate = new Date(date + (time ? 'T' + time : 'T12:00'))
    const lunar = Lunar.fromDate(birthDate)
    const bazi = lunar.getBaZi()
    
    return {
      year: bazi[0].toString(),
      month: bazi[1].toString(),
      day: bazi[2].toString(),
      hour: bazi[3].toString()
    }
  }

  const handleCalculate = async (e) => {
    e.preventDefault()
    setIsCalculating(true)

    // 模拟计算延迟
    await new Promise(resolve => setTimeout(resolve, 1000))

    try {
      const bazi = calculateBazi(formData.dateOfBirth, formData.timeOfBirth)
      const fiveElements = analyzeFiveElements(bazi)
      const dayMasterAnalysis = analyzeDayMasterStrength(bazi, fiveElements)

      setResult({
        bazi,
        fiveElements,
        dayMaster: dayMasterAnalysis
      })
    } catch (error) {
      console.error('Calculation error:', error)
      alert('There was an error calculating your Day Master strength. Please check your input and try again.')
    } finally {
      setIsCalculating(false)
    }
  }

  const getStrengthIcon = (strength) => {
    switch(strength) {
      case 'strong':
        return <TrendingUp className="h-6 w-6 text-green-400" />
      case 'weak':
        return <TrendingDown className="h-6 w-6 text-red-400" />
      default:
        return <Minus className="h-6 w-6 text-yellow-400" />
    }
  }

  const getStrengthColor = (strength) => {
    switch(strength) {
      case 'strong':
        return 'from-green-500 to-emerald-500'
      case 'weak':
        return 'from-red-500 to-orange-500'
      default:
        return 'from-yellow-500 to-amber-500'
    }
  }

  return (
    <>
      <SEO 
        title="Free Bazi Day Master Strength Calculator - Is Your Day Master Strong or Weak Online?"
        description="Free online Bazi Day Master calculator to check if your Day Master is strong or weak. Get accurate strength level, joy gods, favorable elements, and five elements balance. For entertainment only."
        keywords="free bazi day master calculator, day master strong or weak, bazi day master analysis, chinese astrology calculator, day master strength test, bazi calculator online, five elements balance, joy gods calculator"
        canonical="https://fatepath.me/tools/day-master-calculator"
      />
      
      <div className="min-h-screen pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-gold-500 to-yellow-500 mb-4 sm:mb-6">
              <Calculator className="h-8 w-8 sm:h-10 sm:w-10 text-white" aria-hidden="true" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-bold mb-3 sm:mb-4 text-white tracking-wide">
              Free Bazi Day Master Strength Calculator - Day Dry Strong or Weak Analysis
            </h1>
            <p className="text-lg sm:text-xl text-mystic-300 max-w-3xl mx-auto">
              Use this free bazi day master calculator to instantly check if your Day Master is strong or weak. Get accurate bazi day master analysis with strength level, joy gods, favorable elements, and complete five elements balance assessment.
            </p>
          </motion.div>

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mystic-card p-6 sm:p-8 mb-6 sm:mb-8"
          >
            <p className="text-mystic-200 leading-relaxed mb-4">
              Understanding whether your Day Master is strong or weak is fundamental to <strong className="text-gold-400">bazi day master analysis</strong>. This free bazi day master calculator helps you determine your Day Master strength instantly. A strong Day Master can handle wealth and output effectively, while a weak Day Master needs more support and nourishment. Use this tool to get accurate strength level, identify your joy gods (favorable elements), and understand your five elements balance.
            </p>
            <p className="text-mystic-200 leading-relaxed">
              <strong className="text-gold-400">Note:</strong> This calculator is for entertainment purposes only. For professional BaZi analysis and personalized guidance, consider booking a detailed reading with Master XuanYin.
            </p>
          </motion.div>

          {/* Calculator Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mystic-card p-6 sm:p-8 mb-6 sm:mb-8"
          >
            <h2 className="text-xl sm:text-2xl font-cinzel font-bold mb-6 text-white">
              How to Determine Day Master Strength in Bazi
            </h2>
            <form onSubmit={handleCalculate} className="space-y-5 sm:space-y-6">
              {/* Date of Birth */}
              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-mystic-200 mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  required
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 text-base bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white focus:border-gold-500/50 focus:outline-none transition-colors"
                />
              </div>

              {/* Time of Birth */}
              <div>
                <label htmlFor="timeOfBirth" className="block text-sm font-medium text-mystic-200 mb-2">
                  Time of Birth (Optional)
                </label>
                <input
                  type="time"
                  id="timeOfBirth"
                  name="timeOfBirth"
                  value={formData.timeOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 text-base bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white focus:border-gold-500/50 focus:outline-none transition-colors"
                />
                <p className="text-xs text-mystic-400 mt-1">
                  If you don't know the exact time, leave this blank (defaults to noon)
                </p>
              </div>

              {/* Birth Location */}
              <div>
                <label htmlFor="birthLocation" className="block text-sm font-medium text-mystic-200 mb-2">
                  Birth Location (Optional)
                </label>
                <input
                  type="text"
                  id="birthLocation"
                  name="birthLocation"
                  value={formData.birthLocation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 text-base bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white placeholder-mystic-400 focus:border-gold-500/50 focus:outline-none transition-colors"
                  placeholder="City, Country (e.g., New York, USA)"
                />
                <p className="text-xs text-mystic-400 mt-1">
                  Used for true solar time correction (optional)
                </p>
              </div>

              {/* Calculate Button */}
              <motion.button
                type="submit"
                disabled={isCalculating}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-gold-500 to-yellow-500 text-black font-poppins font-semibold py-4 px-6 sm:px-8 rounded-full hover:from-gold-400 hover:to-yellow-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide text-base"
              >
                {isCalculating ? 'Calculating...' : 'Calculate Day Master Strength'}
              </motion.button>
            </form>
          </motion.div>

          {/* Results */}
          {result && result.dayMaster && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Day Master Strength Result */}
              <div className={`mystic-card p-6 sm:p-8 bg-gradient-to-r ${getStrengthColor(result.dayMaster.strength)}/20 border-2 border-${result.dayMaster.strength === 'strong' ? 'green' : result.dayMaster.strength === 'weak' ? 'red' : 'yellow'}-500/50`}>
                <div className="flex items-center space-x-4 mb-4">
                  {getStrengthIcon(result.dayMaster.strength)}
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-white">
                      Your Day Master is {result.dayMaster.strengthLabel}
                    </h2>
                    <p className="text-mystic-300 text-sm sm:text-base">
                      {result.dayMaster.dayStem}{result.dayMaster.dayBranch} ({result.dayMaster.dayElement} Day Master)
                    </p>
                  </div>
                </div>
                
                <div className="bg-mystic-900/50 rounded-lg p-4 sm:p-6 mb-4">
                  <p className="text-mystic-200 leading-relaxed text-sm sm:text-base">
                    {result.dayMaster.summary}
                  </p>
                </div>

                {/* Strength Scores */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div className="bg-mystic-900/50 rounded-lg p-4">
                    <p className="text-xs text-mystic-400 mb-1">Support Score</p>
                    <p className="text-xl font-bold text-green-400">{result.dayMaster.supportScore}</p>
                  </div>
                  <div className="bg-mystic-900/50 rounded-lg p-4">
                    <p className="text-xs text-mystic-400 mb-1">Drain Score</p>
                    <p className="text-xl font-bold text-red-400">{result.dayMaster.drainScore}</p>
                  </div>
                  <div className="bg-mystic-900/50 rounded-lg p-4">
                    <p className="text-xs text-mystic-400 mb-1">Relative Score</p>
                    <p className={`text-xl font-bold ${result.dayMaster.relativeScore >= 2 ? 'text-green-400' : result.dayMaster.relativeScore <= -2 ? 'text-red-400' : 'text-yellow-400'}`}>
                      {result.dayMaster.relativeScore > 0 ? '+' : ''}{result.dayMaster.relativeScore}
                    </p>
                  </div>
                </div>
              </div>

              {/* BaZi Chart Display */}
              <div className="mystic-card p-6 sm:p-8">
                <h3 className="text-xl font-cinzel font-bold mb-4 text-white">Your BaZi Chart</h3>
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-xs text-mystic-400 mb-1">Year</p>
                    <p className="text-lg font-bold text-white">{result.bazi.year}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-mystic-400 mb-1">Month</p>
                    <p className="text-lg font-bold text-white">{result.bazi.month}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-mystic-400 mb-1">Day (Day Master)</p>
                    <p className="text-lg font-bold text-gold-400">{result.bazi.day}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-mystic-400 mb-1">Hour</p>
                    <p className="text-lg font-bold text-white">{result.bazi.hour}</p>
                  </div>
                </div>
              </div>

              {/* Five Elements Balance */}
              <div className="mystic-card p-6 sm:p-8">
                <h3 className="text-xl font-cinzel font-bold mb-4 text-white">Five Elements Balance</h3>
                <div className="space-y-3">
                  {Object.entries(result.fiveElements).map(([element, count]) => (
                    <div key={element} className="flex items-center justify-between">
                      <span className="text-mystic-300 font-medium">{element}</span>
                      <div className="flex items-center space-x-3 flex-1 mx-4">
                        <div className="flex-1 bg-mystic-800 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              element === result.dayMaster.dayElement ? 'bg-gold-400' :
                              result.dayMaster.focusElements.supportive.includes(element) ? 'bg-green-400' :
                              result.dayMaster.focusElements.balancing.includes(element) ? 'bg-blue-400' :
                              'bg-mystic-600'
                            }`}
                            style={{ width: `${Math.min(100, (count / 8) * 100)}%` }}
                          />
                        </div>
                        <span className="text-mystic-300 text-sm w-8 text-right">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Joy Gods (Favorable Elements) */}
              <div className="mystic-card p-6 sm:p-8">
                <h3 className="text-xl font-cinzel font-bold mb-4 text-white">Joy Gods (Favorable Elements)</h3>
                <p className="text-mystic-300 mb-4 text-sm sm:text-base leading-relaxed">
                  Based on your Day Master strength, these elements are most favorable for you:
                </p>
                <div className="flex flex-wrap gap-3">
                  {result.dayMaster.joyGods.length > 0 ? (
                    result.dayMaster.joyGods.map((element, index) => (
                      <span 
                        key={index}
                        className="px-4 py-2 bg-gold-500/20 border border-gold-500/50 rounded-full text-gold-400 font-medium"
                      >
                        {element}
                      </span>
                    ))
                  ) : (
                    <span className="text-mystic-400">Balanced - maintain current element mix</span>
                  )}
                </div>
              </div>

              {/* Detailed Analysis */}
              <div className="mystic-card p-6 sm:p-8">
                <h3 className="text-xl font-cinzel font-bold mb-4 text-white">Is Your Day Master Weak? Find Out Instantly</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gold-400 mb-2">Supportive Elements</h4>
                    <p className="text-mystic-300 text-sm sm:text-base leading-relaxed">
                      These elements support your Day Master: <strong>{result.dayMaster.focusElements.supportive.join(', ')}</strong>. 
                      {result.dayMaster.strength === 'weak' && ' You need more of these elements in your environment and luck cycles.'}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gold-400 mb-2">Balancing Elements</h4>
                    <p className="text-mystic-300 text-sm sm:text-base leading-relaxed">
                      These elements help balance your Day Master: <strong>{result.dayMaster.focusElements.balancing.join(', ') || 'None'}</strong>.
                      {result.dayMaster.strength === 'strong' && ' You can handle more of these elements effectively.'}
                    </p>
                  </div>
                  {result.dayMaster.seasonalSupport !== 0 && (
                    <div>
                      <h4 className="font-semibold text-gold-400 mb-2">Seasonal Influence</h4>
                      <p className="text-mystic-300 text-sm sm:text-base leading-relaxed">
                        Your birth month provides {result.dayMaster.seasonalSupport > 0 ? 'additional support' : 'some challenge'} to your Day Master strength.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA for Professional Reading */}
              <div className="mystic-card p-6 sm:p-8 bg-gradient-to-r from-gold-500/10 to-yellow-500/10 border border-gold-500/30">
                <h3 className="text-xl font-cinzel font-bold mb-3 text-white">Want a Professional Analysis?</h3>
                <p className="text-mystic-300 mb-4 text-sm sm:text-base">
                  This calculator provides basic Day Master strength analysis. For comprehensive BaZi reading with detailed insights on wealth, relationships, health, and life path, book a professional reading with Master XuanYin.
                </p>
                <Link
                  to="/services"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-gold-500 to-yellow-500 text-black font-poppins font-semibold px-6 py-3 rounded-full hover:from-gold-400 hover:to-yellow-400 transition-all duration-300"
                >
                  <span>View Services</span>
                  <ArrowLeft className="h-4 w-4 rotate-180" />
                </Link>
              </div>
            </motion.div>
          )}

          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 text-mystic-300 hover:text-gold-400 transition-colors text-sm sm:text-base"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default DayMasterCalculator
