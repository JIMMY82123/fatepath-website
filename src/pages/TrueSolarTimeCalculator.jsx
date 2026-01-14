import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, ArrowLeft, MapPin, Sun, Calculator } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const TrueSolarTimeCalculator = () => {
  const [formData, setFormData] = useState({
    date: '',
    standardTime: '',
    longitude: '',
    timezone: '',
    city: '',
    country: ''
  })
  
  const [result, setResult] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)

  // 常见城市的经度数据
  const cityCoordinates = {
    'New York': { longitude: -74.006, timezone: 'America/New_York' },
    'Los Angeles': { longitude: -118.243, timezone: 'America/Los_Angeles' },
    'Chicago': { longitude: -87.629, timezone: 'America/Chicago' },
    'Houston': { longitude: -95.369, timezone: 'America/Chicago' },
    'Phoenix': { longitude: -112.074, timezone: 'America/Phoenix' },
    'Philadelphia': { longitude: -75.165, timezone: 'America/New_York' },
    'San Antonio': { longitude: -98.493, timezone: 'America/Chicago' },
    'San Diego': { longitude: -117.161, timezone: 'America/Los_Angeles' },
    'Dallas': { longitude: -96.797, timezone: 'America/Chicago' },
    'San Jose': { longitude: -121.886, timezone: 'America/Los_Angeles' },
    'Beijing': { longitude: 116.407, timezone: 'Asia/Shanghai' },
    'Shanghai': { longitude: 121.473, timezone: 'Asia/Shanghai' },
    'Guangzhou': { longitude: 113.264, timezone: 'Asia/Shanghai' },
    'Shenzhen': { longitude: 114.057, timezone: 'Asia/Shanghai' },
    'Hong Kong': { longitude: 114.169, timezone: 'Asia/Hong_Kong' },
    'Taipei': { longitude: 121.565, timezone: 'Asia/Taipei' },
    'Singapore': { longitude: 103.819, timezone: 'Asia/Singapore' },
    'Tokyo': { longitude: 139.691, timezone: 'Asia/Tokyo' },
    'London': { longitude: -0.127, timezone: 'Europe/London' },
    'Paris': { longitude: 2.352, timezone: 'Europe/Paris' },
    'Sydney': { longitude: 151.209, timezone: 'Australia/Sydney' },
    'Melbourne': { longitude: 144.963, timezone: 'Australia/Melbourne' },
    'Toronto': { longitude: -79.383, timezone: 'America/Toronto' },
    'Vancouver': { longitude: -123.121, timezone: 'America/Vancouver' }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // 如果选择了城市，自动填充经度
    if (name === 'city' && value && cityCoordinates[value]) {
      const coords = cityCoordinates[value]
      setFormData(prev => ({
        ...prev,
        longitude: coords.longitude.toString(),
        timezone: coords.timezone
      }))
    }
  }

  // 计算时差修正（Equation of Time）
  // 这是一个简化的计算，实际值会根据日期变化
  const calculateEquationOfTime = (date) => {
    if (!date) return 0
    
    const d = new Date(date)
    const dayOfYear = Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24)
    const B = (360 / 365) * (dayOfYear - 81) * (Math.PI / 180)
    
    // 简化的时差修正公式（分钟）
    const equation = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B)
    return equation
  }

  // 计算真太阳时
  const calculateTrueSolarTime = () => {
    if (!formData.date || !formData.standardTime || !formData.longitude) {
      return null
    }

    const longitude = parseFloat(formData.longitude)
    if (isNaN(longitude) || longitude < -180 || longitude > 180) {
      return null
    }

    // 解析标准时间
    const [hours, minutes] = formData.standardTime.split(':').map(Number)
    if (isNaN(hours) || isNaN(minutes)) {
      return null
    }

    // 确定时区标准经度（根据时区）
    let standardLongitude = 0
    if (formData.timezone) {
      // 根据时区确定标准经度
      if (formData.timezone.includes('New_York') || formData.timezone.includes('Toronto')) {
        standardLongitude = -75 // EST/EDT
      } else if (formData.timezone.includes('Chicago') || formData.timezone.includes('Houston') || formData.timezone.includes('Dallas')) {
        standardLongitude = -90 // CST/CDT
      } else if (formData.timezone.includes('Los_Angeles') || formData.timezone.includes('Vancouver')) {
        standardLongitude = -120 // PST/PDT
      } else if (formData.timezone.includes('Shanghai') || formData.timezone.includes('Beijing') || formData.timezone.includes('Hong_Kong') || formData.timezone.includes('Taipei')) {
        standardLongitude = 120 // China Standard Time
      } else if (formData.timezone.includes('Tokyo')) {
        standardLongitude = 135 // JST
      } else if (formData.timezone.includes('London')) {
        standardLongitude = 0 // GMT
      } else if (formData.timezone.includes('Paris')) {
        standardLongitude = 15 // CET
      } else if (formData.timezone.includes('Sydney') || formData.timezone.includes('Melbourne')) {
        standardLongitude = 150 // AEST
      } else if (formData.timezone.includes('Singapore')) {
        standardLongitude = 105 // SGT
      } else {
        // 默认根据经度估算时区
        standardLongitude = Math.round(longitude / 15) * 15
      }
    } else {
      // 如果没有指定时区，根据经度估算
      standardLongitude = Math.round(longitude / 15) * 15
    }

    // 计算经度时差（分钟）
    // 每度经度 = 4分钟
    const longitudeDifference = (longitude - standardLongitude) * 4

    // 计算时差修正（分钟）
    const equationOfTime = calculateEquationOfTime(formData.date)

    // 总时差（分钟）
    const totalDifference = longitudeDifference + equationOfTime

    // 计算真太阳时
    const standardMinutes = hours * 60 + minutes
    const trueSolarMinutes = standardMinutes + totalDifference

    // 处理跨日
    let trueSolarHours = Math.floor(trueSolarMinutes / 60) % 24
    if (trueSolarHours < 0) trueSolarHours += 24
    const trueSolarMins = Math.floor(trueSolarMinutes % 60)
    const trueSolarSecs = Math.round((trueSolarMinutes % 1) * 60)

    // 格式化时间
    const formatTime = (h, m, s) => {
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s || 0).padStart(2, '0')}`
    }

    return {
      standardTime: formatTime(hours, minutes, 0),
      trueSolarTime: formatTime(trueSolarHours, trueSolarMins, trueSolarSecs),
      longitudeDifference: Number(longitudeDifference.toFixed(2)),
      equationOfTime: Number(equationOfTime.toFixed(2)),
      totalDifference: Number(totalDifference.toFixed(2)),
      standardLongitude: standardLongitude,
      localLongitude: longitude
    }
  }

  const handleCalculate = async (e) => {
    e.preventDefault()
    setIsCalculating(true)

    // 模拟计算延迟
    await new Promise(resolve => setTimeout(resolve, 500))

    try {
      const result = calculateTrueSolarTime()
      if (result) {
        setResult(result)
      } else {
        alert('Please fill in all required fields correctly.')
      }
    } catch (error) {
      console.error('Calculation error:', error)
      alert('There was an error calculating true solar time. Please check your input.')
    } finally {
      setIsCalculating(false)
    }
  }

  return (
    <>
      <SEO 
        title="True Solar Time Calculator - Bazi Time Correction Tool | FatePath"
        description="Free online true solar time calculator for accurate Bazi readings. Convert standard time to true solar time based on longitude and location. Essential for precise Chinese astrology calculations."
        keywords="true solar time calculator, bazi time correction, solar time converter, longitude time correction, chinese astrology time calculator, local solar time, equation of time"
        canonical="https://fatepath.me/tools/true-solar-time-calculator"
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
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mb-4 sm:mb-6">
              <Sun className="h-8 w-8 sm:h-10 sm:w-10 text-white" aria-hidden="true" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-bold mb-3 sm:mb-4 text-white tracking-wide">
              True Solar Time Calculator
            </h1>
            <p className="text-lg sm:text-xl text-mystic-300 max-w-3xl mx-auto">
              Convert standard time to true solar time for accurate Bazi readings. Essential for precise Chinese astrology calculations based on your exact birth location.
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
              Why True Solar Time Matters for Bazi
            </h2>
            <p className="text-mystic-200 leading-relaxed mb-4">
              True solar time (also called local apparent time) is the actual time based on the sun's position in the sky at your specific location. Standard time zones use fixed time zones that don't account for your exact longitude, which can cause significant errors in Bazi calculations.
            </p>
            <p className="text-mystic-200 leading-relaxed mb-4">
              <strong className="text-gold-400">Key differences:</strong>
            </p>
            <ul className="text-mystic-200 space-y-2 mb-4 list-disc list-inside">
              <li><strong>Standard Time:</strong> Fixed time zone time (e.g., EST, PST, CST)</li>
              <li><strong>True Solar Time:</strong> Actual sun position time based on your longitude</li>
              <li><strong>Time Difference:</strong> Can vary from a few minutes to over an hour depending on location</li>
            </ul>
            <p className="text-mystic-200 leading-relaxed">
              For accurate Bazi readings, especially for determining the correct hour pillar, you need to use true solar time. This calculator helps you convert your standard birth time to true solar time.
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
              True Solar Time Calculator
            </h2>
            <form onSubmit={handleCalculate} className="space-y-5 sm:space-y-6">
              {/* Date */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-mystic-200 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 text-base bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white focus:border-gold-500/50 focus:outline-none transition-colors"
                />
              </div>

              {/* Standard Time */}
              <div>
                <label htmlFor="standardTime" className="block text-sm font-medium text-mystic-200 mb-2">
                  Standard Time (Local Time Zone) *
                </label>
                <input
                  type="time"
                  id="standardTime"
                  name="standardTime"
                  required
                  value={formData.standardTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 text-base bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white focus:border-gold-500/50 focus:outline-none transition-colors"
                />
                <p className="text-xs text-mystic-400 mt-1">
                  Enter the time as recorded on your birth certificate (standard time zone time)
                </p>
              </div>

              {/* City Selection */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-mystic-200 mb-2">
                  City (Optional - Auto-fills longitude)
                </label>
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 text-base bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white focus:border-gold-500/50 focus:outline-none transition-colors"
                >
                  <option value="">Select a city or enter manually</option>
                  <optgroup label="United States">
                    {Object.keys(cityCoordinates).filter(city => 
                      ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'].includes(city)
                    ).map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </optgroup>
                  <optgroup label="China & Asia">
                    {Object.keys(cityCoordinates).filter(city => 
                      ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Hong Kong', 'Taipei', 'Singapore', 'Tokyo'].includes(city)
                    ).map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Other">
                    {Object.keys(cityCoordinates).filter(city => 
                      !['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Hong Kong', 'Taipei', 'Singapore', 'Tokyo'].includes(city)
                    ).map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Longitude */}
              <div>
                <label htmlFor="longitude" className="block text-sm font-medium text-mystic-200 mb-2">
                  Longitude (Degrees) *
                </label>
                <input
                  type="number"
                  id="longitude"
                  name="longitude"
                  required
                  step="0.001"
                  min="-180"
                  max="180"
                  value={formData.longitude}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 text-base bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white placeholder-mystic-400 focus:border-gold-500/50 focus:outline-none transition-colors"
                  placeholder="e.g., -74.006 (New York) or 116.407 (Beijing)"
                />
                <p className="text-xs text-mystic-400 mt-1">
                  Enter your birth location's longitude. Negative for West, positive for East. You can search online for your city's coordinates.
                </p>
              </div>

              {/* Timezone (Optional) */}
              <div>
                <label htmlFor="timezone" className="block text-sm font-medium text-mystic-200 mb-2">
                  Timezone (Optional - Auto-filled if city selected)
                </label>
                <input
                  type="text"
                  id="timezone"
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 text-base bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white placeholder-mystic-400 focus:border-gold-500/50 focus:outline-none transition-colors"
                  placeholder="e.g., America/New_York"
                  readOnly
                />
                <p className="text-xs text-mystic-400 mt-1">
                  Automatically filled when you select a city
                </p>
              </div>

              {/* Calculate Button */}
              <motion.button
                type="submit"
                disabled={isCalculating}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-poppins font-semibold py-4 px-6 sm:px-8 rounded-full hover:from-blue-400 hover:to-cyan-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide text-base"
              >
                {isCalculating ? 'Calculating...' : 'Calculate True Solar Time'}
              </motion.button>
            </form>
          </motion.div>

          {/* Results */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Main Result */}
              <div className="mystic-card p-6 sm:p-8 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-2 border-blue-500/50">
                <div className="flex items-center space-x-4 mb-6">
                  <Clock className="h-8 w-8 text-blue-400" />
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-white">
                      True Solar Time Result
                    </h2>
                    <p className="text-mystic-300 text-sm sm:text-base">
                      Your corrected time for accurate Bazi calculation
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div className="bg-mystic-900/50 rounded-lg p-4">
                    <p className="text-xs text-mystic-400 mb-1">Standard Time</p>
                    <p className="text-2xl font-bold text-mystic-300">{result.standardTime}</p>
                  </div>
                  <div className="bg-mystic-900/50 rounded-lg p-4 border-2 border-blue-500/50">
                    <p className="text-xs text-mystic-400 mb-1">True Solar Time</p>
                    <p className="text-2xl font-bold text-blue-400">{result.trueSolarTime}</p>
                  </div>
                </div>

                <div className="bg-mystic-900/50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-mystic-300 mb-2">
                    <strong className="text-gold-400">Time Difference:</strong> {result.totalDifference > 0 ? '+' : ''}{result.totalDifference.toFixed(2)} minutes
                  </p>
                  <p className="text-xs text-mystic-400">
                    Use the True Solar Time ({result.trueSolarTime}) for accurate Bazi hour pillar calculation
                  </p>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="mystic-card p-6 sm:p-8">
                <h3 className="text-xl font-cinzel font-bold mb-4 text-white">Calculation Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-mystic-700/50">
                    <span className="text-mystic-300">Local Longitude:</span>
                    <span className="text-white font-medium">{result.localLongitude > 0 ? '+' : ''}{result.localLongitude.toFixed(3)}°</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-mystic-700/50">
                    <span className="text-mystic-300">Standard Timezone Longitude:</span>
                    <span className="text-white font-medium">{result.standardLongitude > 0 ? '+' : ''}{result.standardLongitude}°</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-mystic-700/50">
                    <span className="text-mystic-300">Longitude Correction:</span>
                    <span className="text-white font-medium">{result.longitudeDifference > 0 ? '+' : ''}{result.longitudeDifference.toFixed(2)} minutes</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-mystic-700/50">
                    <span className="text-mystic-300">Equation of Time:</span>
                    <span className="text-white font-medium">{result.equationOfTime > 0 ? '+' : ''}{result.equationOfTime.toFixed(2)} minutes</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gold-400 font-semibold">Total Correction:</span>
                    <span className="text-gold-400 font-bold text-lg">{result.totalDifference > 0 ? '+' : ''}{result.totalDifference.toFixed(2)} minutes</span>
                  </div>
                </div>
              </div>

              {/* Usage Instructions */}
              <div className="mystic-card p-6 sm:p-8 bg-gradient-to-r from-gold-500/10 to-yellow-500/10 border border-gold-500/30">
                <h3 className="text-xl font-cinzel font-bold mb-3 text-white">How to Use This Result</h3>
                <p className="text-mystic-300 mb-4 text-sm sm:text-base leading-relaxed">
                  When calculating your Bazi chart, use the <strong className="text-gold-400">True Solar Time ({result.trueSolarTime})</strong> instead of the standard time. This ensures accurate hour pillar determination, which is crucial for precise Bazi analysis.
                </p>
                <p className="text-mystic-300 text-sm sm:text-base leading-relaxed">
                  For example, if your birth certificate shows {result.standardTime} (standard time), use {result.trueSolarTime} (true solar time) when entering your birth time in Bazi calculators or when requesting a professional reading.
                </p>
              </div>

              {/* CTA for Professional Reading */}
              <div className="mystic-card p-6 sm:p-8 bg-gradient-to-r from-gold-500/10 to-yellow-500/10 border border-gold-500/30">
                <h3 className="text-xl font-cinzel font-bold mb-3 text-white">Need Professional Bazi Analysis?</h3>
                <p className="text-mystic-300 mb-4 text-sm sm:text-base">
                  Now that you have your true solar time, get a comprehensive Bazi reading with detailed insights on wealth, relationships, health, and life path.
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

export default TrueSolarTimeCalculator
