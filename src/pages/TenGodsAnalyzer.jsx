import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowLeft, BarChart3, Info } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Lunar } from 'lunar-javascript'
import SEO from '../components/SEO'

const TenGodsAnalyzer = () => {
  const [formData, setFormData] = useState({
    dateOfBirth: '',
    timeOfBirth: ''
  })
  
  const [result, setResult] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)

  // 五行元素映射表（与FreeBaziReport.jsx保持一致）
  const elementMapping = {
    // 天干五行
    '甲': 'Wood', '乙': 'Wood',
    '丙': 'Fire', '丁': 'Fire', 
    '戊': 'Earth', '己': 'Earth',
    '庚': 'Metal', '辛': 'Metal',
    '壬': 'Water', '癸': 'Water',
    // 地支五行（虽然十神只看天干，但保留完整映射）
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

  const generatingElementMap = {
    Wood: 'Fire',
    Fire: 'Earth',
    Earth: 'Metal',
    Metal: 'Water',
    Water: 'Wood'
  }

  const elementProducingMap = {
    Wood: 'Water',
    Fire: 'Wood',
    Earth: 'Fire',
    Metal: 'Earth',
    Water: 'Metal'
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

  // 十神标签映射
  const tenGodLabelMap = {
    Friend: '比肩 (Bi Jian / Friend)',
    RobWealth: '劫财 (Jie Cai / Rob Wealth)',
    EatingGod: '食神 (Shi Shen / Eating God)',
    HurtingOfficer: '伤官 (Shang Guan / Hurting Officer)',
    DirectWealth: '正财 (Zheng Cai / Direct Wealth)',
    IndirectWealth: '偏财 (Pian Cai / Indirect Wealth)',
    DirectOfficer: '正官 (Zheng Guan / Direct Officer)',
    SevenKillings: '七杀 (Qi Sha / Seven Killings)',
    DirectResource: '正印 (Zheng Yin / Direct Resource)',
    IndirectResource: '偏印 (Pian Yin / Indirect Resource)'
  }

  // 十神类别映射
  const tenGodCategoryMap = {
    Friend: 'Same Element',
    RobWealth: 'Same Element',
    EatingGod: 'Output',
    HurtingOfficer: 'Output',
    DirectWealth: 'Wealth',
    IndirectWealth: 'Wealth',
    DirectOfficer: 'Authority',
    SevenKillings: 'Authority',
    DirectResource: 'Resource',
    IndirectResource: 'Resource'
  }

  // 十神指导说明
  const tenGodGuidance = {
    Friend: 'Represents peers, siblings, and self-reliance. You value independence and may have strong relationships with friends and siblings.',
    RobWealth: 'Represents competition and resource sharing. You may experience competition in wealth matters and need to be mindful of financial partnerships.',
    EatingGod: 'Represents talent, creativity, and gentle output. You have natural artistic or creative abilities and enjoy expressing yourself.',
    HurtingOfficer: 'Represents sharp talent and bold expression. You have strong opinions and may challenge authority or traditional ways.',
    DirectWealth: 'Represents stable wealth and practical money management. You value financial security and have good organizational skills.',
    IndirectWealth: 'Represents flexible wealth and investment opportunities. You are good at spotting financial opportunities and adapting to market changes.',
    DirectOfficer: 'Represents authority, responsibility, and career success. You value structure, rules, and may have leadership abilities.',
    SevenKillings: 'Represents pressure, ambition, and competitive drive. You thrive under pressure and have strong determination to achieve goals.',
    DirectResource: 'Represents learning, knowledge, and formal education. You value knowledge, may have academic achievements, and benefit from mentors.',
    IndirectResource: 'Represents intuition, unconventional learning, and spiritual insight. You have unique perspectives and may excel in creative or spiritual fields.'
  }

  // 十神详细描述
  const tenGodDescriptions = {
    Friend: {
      meaning: 'Same element, same polarity',
      personality: 'Independent, self-reliant, values peer relationships',
      career: 'Works well in teams, partnerships, or collaborative environments',
      wealth: 'May share resources with others, needs clear financial boundaries',
      relationships: 'Values friendship and peer support, may be competitive with siblings'
    },
    RobWealth: {
      meaning: 'Same element, opposite polarity',
      personality: 'Competitive, resourceful, may experience financial competition',
      career: 'Thrives in competitive environments, may need to protect resources',
      wealth: 'May experience financial ups and downs, needs careful money management',
      relationships: 'May have competitive relationships, needs clear boundaries'
    },
    EatingGod: {
      meaning: 'Element generated by Day Master, same polarity',
      personality: 'Creative, gentle, artistic, enjoys expressing talent',
      career: 'Suitable for creative, educational, or service-oriented careers',
      wealth: 'Wealth comes through talent and creativity, may have multiple income sources',
      relationships: 'Warm, caring, shows love through acts of service'
    },
    HurtingOfficer: {
      meaning: 'Element generated by Day Master, opposite polarity',
      personality: 'Sharp, expressive, challenges authority, has strong opinions',
      career: 'Suitable for creative, innovative, or leadership roles that allow expression',
      wealth: 'Wealth comes through innovation and bold moves, may have variable income',
      relationships: 'Passionate, direct, values honesty, may need to balance intensity'
    },
    DirectWealth: {
      meaning: 'Element controlled by Day Master, opposite polarity',
      personality: 'Practical, organized, values financial security',
      career: 'Suitable for business, finance, or management roles',
      wealth: 'Stable wealth through steady work and good planning',
      relationships: 'Values stability and practical cooperation in relationships'
    },
    IndirectWealth: {
      meaning: 'Element controlled by Day Master, same polarity',
      personality: 'Flexible, adaptable, good at spotting opportunities',
      career: 'Suitable for investment, trading, or entrepreneurial ventures',
      wealth: 'Wealth through opportunities and investments, may have variable income',
      relationships: 'Spontaneous, enjoys variety, may need to balance flexibility with commitment'
    },
    DirectOfficer: {
      meaning: 'Element controlling Day Master, opposite polarity',
      personality: 'Responsible, disciplined, values rules and structure',
      career: 'Suitable for management, government, or structured organizations',
      wealth: 'Wealth through career advancement and stable income',
      relationships: 'Serious about commitment, values loyalty and responsibility'
    },
    SevenKillings: {
      meaning: 'Element controlling Day Master, same polarity',
      personality: 'Ambitious, competitive, thrives under pressure',
      career: 'Suitable for high-pressure roles, competition, or leadership positions',
      wealth: 'Wealth through ambition and taking calculated risks',
      relationships: 'Intense relationships, may need to manage stress and conflict'
    },
    DirectResource: {
      meaning: 'Element producing Day Master, opposite polarity',
      personality: 'Learner, values knowledge, benefits from mentors',
      career: 'Suitable for education, research, or knowledge-based fields',
      wealth: 'Wealth through knowledge and expertise, may have stable income',
      relationships: 'Values intellectual connection, may need emotional expression'
    },
    IndirectResource: {
      meaning: 'Element producing Day Master, same polarity',
      personality: 'Intuitive, unconventional, has unique perspectives',
      career: 'Suitable for creative, spiritual, or innovative fields',
      wealth: 'Wealth through unique insights and unconventional approaches',
      relationships: 'Values depth and spiritual connection, may need practical grounding'
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // 计算十神（完全复制FreeBaziReport.jsx中的逻辑）
  const getTenGod = (dayStem, targetStem) => {
    if (!dayStem || !targetStem) return null

    const dayElement = elementMapping[dayStem]
    const targetElement = elementMapping[targetStem]
    if (!dayElement || !targetElement) return null

    const dayPolarity = yinYangMap[dayStem]
    const targetPolarity = yinYangMap[targetStem]
    const polaritySame = dayPolarity === targetPolarity

    if (targetElement === dayElement) {
      return polaritySame ? 'Friend' : 'RobWealth'
    }

    const producingElement = elementProducingMap[dayElement]
    if (targetElement === producingElement) {
      return polaritySame ? 'IndirectResource' : 'DirectResource'
    }

    const generatedElement = generatingElementMap[dayElement]
    if (targetElement === generatedElement) {
      return polaritySame ? 'EatingGod' : 'HurtingOfficer'
    }

    const wealthElement = controllingElementMap[dayElement]
    if (targetElement === wealthElement) {
      return polaritySame ? 'IndirectWealth' : 'DirectWealth'
    }

    const officerElement = elementControllingMap[dayElement]
    if (targetElement === officerElement) {
      return polaritySame ? 'SevenKillings' : 'DirectOfficer'
    }

    return null
  }

  // 分析十神
  const analyzeTenGods = (bazi) => {
    if (!bazi) return null
    
    const stems = {
      year: bazi.year?.charAt(0),
      month: bazi.month?.charAt(0),
      day: bazi.day?.charAt(0),
      hour: bazi.hour?.charAt(0)
    }

    const counts = {
      Friend: 0,
      RobWealth: 0,
      EatingGod: 0,
      HurtingOfficer: 0,
      DirectWealth: 0,
      IndirectWealth: 0,
      DirectOfficer: 0,
      SevenKillings: 0,
      DirectResource: 0,
      IndirectResource: 0
    }

    const detailEntries = []
    const positions = {
      year: 'Year Stem',
      month: 'Month Stem',
      hour: 'Hour Stem'
    }

    Object.entries(positions).forEach(([key, label]) => {
      const targetStem = stems[key]
      if (!targetStem) return

      const tenGod = getTenGod(stems.day, targetStem)
      if (tenGod) {
        counts[tenGod] += 1
      }

      detailEntries.push({
        position: label,
        stem: targetStem,
        element: elementMapping[targetStem] || 'Unknown',
        polarity: yinYangMap[targetStem] || 'Yang',
        tenGod,
        tenGodLabel: tenGod ? tenGodLabelMap[tenGod] : '—'
      })
    })

    const dominantGods = Object.entries(counts)
      .filter(([, value]) => value > 0)
      .sort((a, b) => b[1] - a[1])
      .map(([key, value]) => ({
        key,
        label: tenGodLabelMap[key],
        category: tenGodCategoryMap[key],
        count: value,
        guidance: tenGodGuidance[key],
        description: tenGodDescriptions[key]
      }))

    return {
      dayStem: stems.day,
      dayElement: elementMapping[stems.day],
      details: detailEntries,
      counts,
      dominantGods,
      summary: dominantGods.length > 0
        ? `Primary influence: ${dominantGods[0].label} (${dominantGods[0].count} occurrence${dominantGods[0].count > 1 ? 's' : ''}). ${dominantGods[0].guidance}${dominantGods[1] ? ` Secondary influence: ${dominantGods[1].label} (${dominantGods[1].count} occurrence${dominantGods[1].count > 1 ? 's' : ''}).` : ''}`
        : 'No dominant Ten Gods pattern detected beyond the Day Master itself.'
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
      const tenGodsAnalysis = analyzeTenGods(bazi)

      setResult({
        bazi,
        tenGods: tenGodsAnalysis
      })
    } catch (error) {
      console.error('Calculation error:', error)
      alert('There was an error analyzing Ten Gods. Please check your input and try again.')
    } finally {
      setIsCalculating(false)
    }
  }

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Wealth':
        return 'from-green-500 to-emerald-500'
      case 'Authority':
        return 'from-purple-500 to-pink-500'
      case 'Resource':
        return 'from-blue-500 to-cyan-500'
      case 'Output':
        return 'from-yellow-500 to-orange-500'
      case 'Same Element':
        return 'from-gray-500 to-slate-500'
      default:
        return 'from-mystic-600 to-mystic-700'
    }
  }

  return (
    <>
      <SEO 
        title="Ten Gods Analyzer - Free Bazi Ten Gods Calculator | FatePath"
        description="Free online Ten Gods (十神) analyzer for Bazi readings. Calculate and analyze all Ten Gods in your BaZi chart including Direct Wealth, Indirect Wealth, Direct Officer, Seven Killings, and more."
        keywords="ten gods analyzer, bazi ten gods calculator, 十神分析, direct wealth indirect wealth, direct officer seven killings, bazi ten gods analysis, chinese astrology ten gods"
        canonical="https://fatepath.me/tools/ten-gods-analyzer"
      />
      
      <div className="min-h-screen pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-4 sm:mb-6">
              <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-white" aria-hidden="true" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-bold mb-3 sm:mb-4 text-white tracking-wide">
              Ten Gods Analyzer - Free Bazi Ten Gods Calculator
            </h1>
            <p className="text-lg sm:text-xl text-mystic-300 max-w-3xl mx-auto">
              Analyze the Ten Gods (十神) in your BaZi chart. Understand your personality traits, career potential, wealth patterns, and relationship dynamics through Ten Gods analysis.
            </p>
          </motion.div>

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mystic-card p-6 sm:p-8 mb-6 sm:mb-8"
          >
            <h2 className="text-xl sm:text-2xl font-cinzel font-bold mb-4 text-white">
              What Are Ten Gods (十神)?
            </h2>
            <p className="text-mystic-200 leading-relaxed mb-4">
              Ten Gods (十神) are the ten relationships between your Day Master and the other heavenly stems in your BaZi chart. They reveal your personality traits, career inclinations, wealth patterns, and relationship dynamics. Each Ten God represents a different aspect of your life and character.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-mystic-800/50 rounded-lg p-4">
                <h3 className="text-gold-400 font-semibold mb-2">Wealth Stars (财星)</h3>
                <ul className="text-sm text-mystic-300 space-y-1">
                  <li>• Direct Wealth (正财) - Stable wealth</li>
                  <li>• Indirect Wealth (偏财) - Flexible wealth</li>
                </ul>
              </div>
              <div className="bg-mystic-800/50 rounded-lg p-4">
                <h3 className="text-gold-400 font-semibold mb-2">Authority Stars (官星)</h3>
                <ul className="text-sm text-mystic-300 space-y-1">
                  <li>• Direct Officer (正官) - Structure & rules</li>
                  <li>• Seven Killings (七杀) - Pressure & ambition</li>
                </ul>
              </div>
              <div className="bg-mystic-800/50 rounded-lg p-4">
                <h3 className="text-gold-400 font-semibold mb-2">Resource Stars (印星)</h3>
                <ul className="text-sm text-mystic-300 space-y-1">
                  <li>• Direct Resource (正印) - Learning & knowledge</li>
                  <li>• Indirect Resource (偏印) - Intuition & insight</li>
                </ul>
              </div>
              <div className="bg-mystic-800/50 rounded-lg p-4">
                <h3 className="text-gold-400 font-semibold mb-2">Output Stars (食伤)</h3>
                <ul className="text-sm text-mystic-300 space-y-1">
                  <li>• Eating God (食神) - Talent & creativity</li>
                  <li>• Hurting Officer (伤官) - Expression & innovation</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Calculator Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mystic-card p-6 sm:p-8 mb-6 sm:mb-8"
          >
            <h2 className="text-xl sm:text-2xl font-cinzel font-bold mb-6 text-white">
              Ten Gods Calculator
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

              {/* Calculate Button */}
              <motion.button
                type="submit"
                disabled={isCalculating}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-poppins font-semibold py-4 px-6 sm:px-8 rounded-full hover:from-purple-400 hover:to-pink-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide text-base"
              >
                {isCalculating ? 'Analyzing...' : 'Analyze Ten Gods'}
              </motion.button>
            </form>
          </motion.div>

          {/* Results */}
          {result && result.tenGods && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 sm:space-y-8"
            >
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
                <div className="bg-mystic-800/50 rounded-lg p-4">
                  <p className="text-sm text-mystic-300">
                    <strong className="text-gold-400">Day Master:</strong> {result.tenGods.dayStem} ({result.tenGods.dayElement})
                  </p>
                </div>
              </div>

              {/* Ten Gods Summary */}
              <div className="mystic-card p-6 sm:p-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500/50">
                <div className="flex items-center space-x-4 mb-4">
                  <BarChart3 className="h-6 w-6 text-purple-400" />
                  <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-white">
                    Ten Gods Analysis Summary
                  </h3>
                </div>
                <p className="text-mystic-200 leading-relaxed text-sm sm:text-base">
                  {result.tenGods.summary}
                </p>
              </div>

              {/* Ten Gods by Position */}
              <div className="mystic-card p-6 sm:p-8">
                <h3 className="text-xl font-cinzel font-bold mb-4 text-white">Ten Gods by Position</h3>
                <div className="space-y-4">
                  {result.tenGods.details.map((item, index) => (
                    <div key={index} className="bg-mystic-800/50 rounded-lg p-4 border border-mystic-700/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gold-400 font-semibold">{item.position}</span>
                        <span className="text-mystic-300 text-sm">{item.stem} ({item.element}, {item.polarity})</span>
                      </div>
                      <div className="mt-2">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          item.tenGod ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50' : 'bg-mystic-700/50 text-mystic-400'
                        }`}>
                          {item.tenGodLabel}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dominant Ten Gods */}
              {result.tenGods.dominantGods.length > 0 && (
                <div className="mystic-card p-6 sm:p-8">
                  <h3 className="text-xl font-cinzel font-bold mb-4 text-white">Dominant Ten Gods</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {result.tenGods.dominantGods.map((god, index) => {
                      const getBorderColor = (category) => {
                        switch(category) {
                          case 'Wealth': return 'border-green-500/50'
                          case 'Authority': return 'border-purple-500/50'
                          case 'Resource': return 'border-blue-500/50'
                          case 'Output': return 'border-yellow-500/50'
                          default: return 'border-gray-500/50'
                        }
                      }
                      return (
                      <div 
                        key={index}
                        className={`bg-gradient-to-r ${getCategoryColor(god.category)}/20 border-2 ${getBorderColor(god.category)} rounded-lg p-4`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-semibold text-white">{god.label}</h4>
                          <span className="text-xs text-mystic-300 bg-mystic-800/50 px-2 py-1 rounded">
                            {god.count}x
                          </span>
                        </div>
                        <p className="text-xs text-mystic-400 mb-2">{god.category}</p>
                        <p className="text-sm text-mystic-200 leading-relaxed mb-3">
                          {god.guidance}
                        </p>
                        <div className="mt-3 pt-3 border-t border-mystic-700/50">
                          <div className="space-y-2 text-xs">
                            <div>
                              <span className="text-gold-400 font-semibold">Personality:</span>
                              <span className="text-mystic-300 ml-2">{god.description.personality}</span>
                            </div>
                            <div>
                              <span className="text-gold-400 font-semibold">Career:</span>
                              <span className="text-mystic-300 ml-2">{god.description.career}</span>
                            </div>
                            <div>
                              <span className="text-gold-400 font-semibold">Wealth:</span>
                              <span className="text-mystic-300 ml-2">{god.description.wealth}</span>
                            </div>
                            <div>
                              <span className="text-gold-400 font-semibold">Relationships:</span>
                              <span className="text-mystic-300 ml-2">{god.description.relationships}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Ten Gods Statistics */}
              <div className="mystic-card p-6 sm:p-8">
                <h3 className="text-xl font-cinzel font-bold mb-4 text-white">Ten Gods Statistics</h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  {Object.entries(result.tenGods.counts).map(([key, count]) => (
                    <div 
                      key={key} 
                      className={`bg-mystic-800/50 rounded-lg p-3 text-center border ${
                        count > 0 ? 'border-gold-500/50' : 'border-mystic-700/30'
                      }`}
                    >
                      <p className="text-xs text-mystic-400 mb-1">{tenGodLabelMap[key]}</p>
                      <p className={`text-2xl font-bold ${count > 0 ? 'text-gold-400' : 'text-mystic-500'}`}>
                        {count}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-mystic-400 mt-4 text-center">
                  All Ten Gods are displayed. Count shows how many times each appears in your chart (Year, Month, Hour stems).
                </p>
              </div>

              {/* CTA for Professional Reading */}
              <div className="mystic-card p-6 sm:p-8 bg-gradient-to-r from-gold-500/10 to-yellow-500/10 border border-gold-500/30">
                <h3 className="text-xl font-cinzel font-bold mb-3 text-white">Want a Comprehensive Analysis?</h3>
                <p className="text-mystic-300 mb-4 text-sm sm:text-base">
                  This calculator provides basic Ten Gods analysis. For a comprehensive BaZi reading with detailed insights on wealth, relationships, health, and life path, book a professional reading with Master XuanYin.
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

export default TenGodsAnalyzer
