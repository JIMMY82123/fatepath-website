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

  // 全球主要城市数据库（按国家/地区组织）
  const cityCoordinates = {
    // 美国
    'New York, USA': { longitude: -74.006, timezone: 'America/New_York' },
    'Los Angeles, USA': { longitude: -118.243, timezone: 'America/Los_Angeles' },
    'Chicago, USA': { longitude: -87.629, timezone: 'America/Chicago' },
    'Houston, USA': { longitude: -95.369, timezone: 'America/Chicago' },
    'Phoenix, USA': { longitude: -112.074, timezone: 'America/Phoenix' },
    'Philadelphia, USA': { longitude: -75.165, timezone: 'America/New_York' },
    'San Antonio, USA': { longitude: -98.493, timezone: 'America/Chicago' },
    'San Diego, USA': { longitude: -117.161, timezone: 'America/Los_Angeles' },
    'Dallas, USA': { longitude: -96.797, timezone: 'America/Chicago' },
    'San Jose, USA': { longitude: -121.886, timezone: 'America/Los_Angeles' },
    'Austin, USA': { longitude: -97.743, timezone: 'America/Chicago' },
    'Jacksonville, USA': { longitude: -81.655, timezone: 'America/New_York' },
    'Fort Worth, USA': { longitude: -97.330, timezone: 'America/Chicago' },
    'Columbus, USA': { longitude: -82.998, timezone: 'America/New_York' },
    'Charlotte, USA': { longitude: -80.843, timezone: 'America/New_York' },
    'San Francisco, USA': { longitude: -122.419, timezone: 'America/Los_Angeles' },
    'Indianapolis, USA': { longitude: -86.158, timezone: 'America/Indiana/Indianapolis' },
    'Seattle, USA': { longitude: -122.332, timezone: 'America/Los_Angeles' },
    'Denver, USA': { longitude: -104.990, timezone: 'America/Denver' },
    'Boston, USA': { longitude: -71.058, timezone: 'America/New_York' },
    'El Paso, USA': { longitude: -106.485, timezone: 'America/Denver' },
    'Detroit, USA': { longitude: -83.045, timezone: 'America/Detroit' },
    'Nashville, USA': { longitude: -86.781, timezone: 'America/Chicago' },
    'Portland, USA': { longitude: -122.679, timezone: 'America/Los_Angeles' },
    'Oklahoma City, USA': { longitude: -97.516, timezone: 'America/Chicago' },
    'Las Vegas, USA': { longitude: -115.173, timezone: 'America/Los_Angeles' },
    'Memphis, USA': { longitude: -90.049, timezone: 'America/Chicago' },
    'Louisville, USA': { longitude: -85.758, timezone: 'America/New_York' },
    'Baltimore, USA': { longitude: -76.612, timezone: 'America/New_York' },
    'Milwaukee, USA': { longitude: -87.907, timezone: 'America/Chicago' },
    'Albuquerque, USA': { longitude: -106.651, timezone: 'America/Denver' },
    'Tucson, USA': { longitude: -110.926, timezone: 'America/Phoenix' },
    'Fresno, USA': { longitude: -119.787, timezone: 'America/Los_Angeles' },
    'Sacramento, USA': { longitude: -121.494, timezone: 'America/Los_Angeles' },
    'Kansas City, USA': { longitude: -94.579, timezone: 'America/Chicago' },
    'Mesa, USA': { longitude: -111.832, timezone: 'America/Phoenix' },
    'Atlanta, USA': { longitude: -84.388, timezone: 'America/New_York' },
    'Omaha, USA': { longitude: -95.934, timezone: 'America/Chicago' },
    'Colorado Springs, USA': { longitude: -104.821, timezone: 'America/Denver' },
    'Raleigh, USA': { longitude: -78.639, timezone: 'America/New_York' },
    'Miami, USA': { longitude: -80.192, timezone: 'America/New_York' },
    'Virginia Beach, USA': { longitude: -76.005, timezone: 'America/New_York' },
    'Oakland, USA': { longitude: -122.271, timezone: 'America/Los_Angeles' },
    'Minneapolis, USA': { longitude: -93.265, timezone: 'America/Chicago' },
    'Tulsa, USA': { longitude: -95.993, timezone: 'America/Chicago' },
    'Cleveland, USA': { longitude: -81.695, timezone: 'America/New_York' },
    'Wichita, USA': { longitude: -97.336, timezone: 'America/Chicago' },
    'Arlington, USA': { longitude: -97.108, timezone: 'America/Chicago' },
    
    // 中国
    'Beijing, China': { longitude: 116.407, timezone: 'Asia/Shanghai' },
    'Shanghai, China': { longitude: 121.473, timezone: 'Asia/Shanghai' },
    'Guangzhou, China': { longitude: 113.264, timezone: 'Asia/Shanghai' },
    'Shenzhen, China': { longitude: 114.057, timezone: 'Asia/Shanghai' },
    'Chengdu, China': { longitude: 104.066, timezone: 'Asia/Shanghai' },
    'Hangzhou, China': { longitude: 120.155, timezone: 'Asia/Shanghai' },
    'Wuhan, China': { longitude: 114.316, timezone: 'Asia/Shanghai' },
    'Xi\'an, China': { longitude: 108.940, timezone: 'Asia/Shanghai' },
    'Nanjing, China': { longitude: 118.797, timezone: 'Asia/Shanghai' },
    'Tianjin, China': { longitude: 117.201, timezone: 'Asia/Shanghai' },
    'Suzhou, China': { longitude: 120.585, timezone: 'Asia/Shanghai' },
    'Chongqing, China': { longitude: 106.551, timezone: 'Asia/Shanghai' },
    'Dongguan, China': { longitude: 113.752, timezone: 'Asia/Shanghai' },
    'Foshan, China': { longitude: 113.122, timezone: 'Asia/Shanghai' },
    'Jinan, China': { longitude: 117.121, timezone: 'Asia/Shanghai' },
    'Dalian, China': { longitude: 121.615, timezone: 'Asia/Shanghai' },
    'Qingdao, China': { longitude: 120.382, timezone: 'Asia/Shanghai' },
    'Zhengzhou, China': { longitude: 113.665, timezone: 'Asia/Shanghai' },
    'Changsha, China': { longitude: 112.938, timezone: 'Asia/Shanghai' },
    'Kunming, China': { longitude: 102.833, timezone: 'Asia/Shanghai' },
    'Shenyang, China': { longitude: 123.432, timezone: 'Asia/Shanghai' },
    'Xiamen, China': { longitude: 118.110, timezone: 'Asia/Shanghai' },
    'Harbin, China': { longitude: 126.642, timezone: 'Asia/Shanghai' },
    'Fuzhou, China': { longitude: 119.306, timezone: 'Asia/Shanghai' },
    'Changchun, China': { longitude: 125.324, timezone: 'Asia/Shanghai' },
    'Shijiazhuang, China': { longitude: 114.514, timezone: 'Asia/Shanghai' },
    'Ningbo, China': { longitude: 121.544, timezone: 'Asia/Shanghai' },
    'Taiyuan, China': { longitude: 112.549, timezone: 'Asia/Shanghai' },
    'Hefei, China': { longitude: 117.227, timezone: 'Asia/Shanghai' },
    'Nanning, China': { longitude: 108.320, timezone: 'Asia/Shanghai' },
    'Urumqi, China': { longitude: 87.617, timezone: 'Asia/Urumqi' },
    'Lhasa, China': { longitude: 91.186, timezone: 'Asia/Shanghai' },
    
    // 中国特别行政区及台湾
    'Hong Kong, China': { longitude: 114.169, timezone: 'Asia/Hong_Kong' },
    'Macau, China': { longitude: 113.543, timezone: 'Asia/Macau' },
    'Taipei, Taiwan': { longitude: 121.565, timezone: 'Asia/Taipei' },
    'Kaohsiung, Taiwan': { longitude: 120.312, timezone: 'Asia/Taipei' },
    'Taichung, Taiwan': { longitude: 120.672, timezone: 'Asia/Taipei' },
    'Tainan, Taiwan': { longitude: 120.213, timezone: 'Asia/Taipei' },
    
    // 日本
    'Tokyo, Japan': { longitude: 139.691, timezone: 'Asia/Tokyo' },
    'Osaka, Japan': { longitude: 135.502, timezone: 'Asia/Tokyo' },
    'Yokohama, Japan': { longitude: 139.650, timezone: 'Asia/Tokyo' },
    'Nagoya, Japan': { longitude: 136.906, timezone: 'Asia/Tokyo' },
    'Sapporo, Japan': { longitude: 141.354, timezone: 'Asia/Tokyo' },
    'Fukuoka, Japan': { longitude: 130.401, timezone: 'Asia/Tokyo' },
    'Kobe, Japan': { longitude: 135.195, timezone: 'Asia/Tokyo' },
    'Kyoto, Japan': { longitude: 135.768, timezone: 'Asia/Tokyo' },
    'Sendai, Japan': { longitude: 140.872, timezone: 'Asia/Tokyo' },
    'Hiroshima, Japan': { longitude: 132.455, timezone: 'Asia/Tokyo' },
    
    // 韩国
    'Seoul, South Korea': { longitude: 126.978, timezone: 'Asia/Seoul' },
    'Busan, South Korea': { longitude: 129.075, timezone: 'Asia/Seoul' },
    'Incheon, South Korea': { longitude: 126.705, timezone: 'Asia/Seoul' },
    'Daegu, South Korea': { longitude: 128.591, timezone: 'Asia/Seoul' },
    'Daejeon, South Korea': { longitude: 127.385, timezone: 'Asia/Seoul' },
    'Gwangju, South Korea': { longitude: 126.853, timezone: 'Asia/Seoul' },
    'Ulsan, South Korea': { longitude: 129.312, timezone: 'Asia/Seoul' },
    
    // 东南亚
    'Singapore': { longitude: 103.819, timezone: 'Asia/Singapore' },
    'Bangkok, Thailand': { longitude: 100.501, timezone: 'Asia/Bangkok' },
    'Kuala Lumpur, Malaysia': { longitude: 101.686, timezone: 'Asia/Kuala_Lumpur' },
    'Jakarta, Indonesia': { longitude: 106.845, timezone: 'Asia/Jakarta' },
    'Manila, Philippines': { longitude: 120.984, timezone: 'Asia/Manila' },
    'Ho Chi Minh City, Vietnam': { longitude: 106.629, timezone: 'Asia/Ho_Chi_Minh' },
    'Hanoi, Vietnam': { longitude: 105.841, timezone: 'Asia/Ho_Chi_Minh' },
    'Yangon, Myanmar': { longitude: 96.156, timezone: 'Asia/Yangon' },
    'Phnom Penh, Cambodia': { longitude: 104.916, timezone: 'Asia/Phnom_Penh' },
    'Vientiane, Laos': { longitude: 102.633, timezone: 'Asia/Vientiane' },
    'Bandar Seri Begawan, Brunei': { longitude: 114.948, timezone: 'Asia/Brunei' },
    
    // 印度
    'Mumbai, India': { longitude: 72.877, timezone: 'Asia/Kolkata' },
    'Delhi, India': { longitude: 77.102, timezone: 'Asia/Kolkata' },
    'Bangalore, India': { longitude: 77.594, timezone: 'Asia/Kolkata' },
    'Hyderabad, India': { longitude: 78.486, timezone: 'Asia/Kolkata' },
    'Chennai, India': { longitude: 80.271, timezone: 'Asia/Kolkata' },
    'Kolkata, India': { longitude: 88.363, timezone: 'Asia/Kolkata' },
    'Pune, India': { longitude: 73.856, timezone: 'Asia/Kolkata' },
    'Ahmedabad, India': { longitude: 72.571, timezone: 'Asia/Kolkata' },
    'Jaipur, India': { longitude: 75.787, timezone: 'Asia/Kolkata' },
    'Surat, India': { longitude: 72.831, timezone: 'Asia/Kolkata' },
    
    // 欧洲
    'London, UK': { longitude: -0.127, timezone: 'Europe/London' },
    'Paris, France': { longitude: 2.352, timezone: 'Europe/Paris' },
    'Berlin, Germany': { longitude: 13.405, timezone: 'Europe/Berlin' },
    'Madrid, Spain': { longitude: -3.703, timezone: 'Europe/Madrid' },
    'Rome, Italy': { longitude: 12.496, timezone: 'Europe/Rome' },
    'Amsterdam, Netherlands': { longitude: 4.904, timezone: 'Europe/Amsterdam' },
    'Brussels, Belgium': { longitude: 4.352, timezone: 'Europe/Brussels' },
    'Vienna, Austria': { longitude: 16.373, timezone: 'Europe/Vienna' },
    'Zurich, Switzerland': { longitude: 8.541, timezone: 'Europe/Zurich' },
    'Stockholm, Sweden': { longitude: 18.068, timezone: 'Europe/Stockholm' },
    'Copenhagen, Denmark': { longitude: 12.568, timezone: 'Europe/Copenhagen' },
    'Oslo, Norway': { longitude: 10.752, timezone: 'Europe/Oslo' },
    'Helsinki, Finland': { longitude: 24.938, timezone: 'Europe/Helsinki' },
    'Dublin, Ireland': { longitude: -6.260, timezone: 'Europe/Dublin' },
    'Lisbon, Portugal': { longitude: -9.139, timezone: 'Europe/Lisbon' },
    'Athens, Greece': { longitude: 23.727, timezone: 'Europe/Athens' },
    'Warsaw, Poland': { longitude: 21.012, timezone: 'Europe/Warsaw' },
    'Prague, Czech Republic': { longitude: 14.437, timezone: 'Europe/Prague' },
    'Budapest, Hungary': { longitude: 19.040, timezone: 'Europe/Budapest' },
    'Bucharest, Romania': { longitude: 26.102, timezone: 'Europe/Bucharest' },
    'Moscow, Russia': { longitude: 37.617, timezone: 'Europe/Moscow' },
    'Saint Petersburg, Russia': { longitude: 30.315, timezone: 'Europe/Moscow' },
    'Istanbul, Turkey': { longitude: 28.978, timezone: 'Europe/Istanbul' },
    
    // 加拿大
    'Toronto, Canada': { longitude: -79.383, timezone: 'America/Toronto' },
    'Vancouver, Canada': { longitude: -123.121, timezone: 'America/Vancouver' },
    'Montreal, Canada': { longitude: -73.567, timezone: 'America/Toronto' },
    'Calgary, Canada': { longitude: -114.071, timezone: 'America/Edmonton' },
    'Ottawa, Canada': { longitude: -75.697, timezone: 'America/Toronto' },
    'Edmonton, Canada': { longitude: -113.491, timezone: 'America/Edmonton' },
    'Winnipeg, Canada': { longitude: -97.138, timezone: 'America/Winnipeg' },
    'Quebec City, Canada': { longitude: -71.208, timezone: 'America/Toronto' },
    'Hamilton, Canada': { longitude: -79.871, timezone: 'America/Toronto' },
    'Halifax, Canada': { longitude: -63.575, timezone: 'America/Halifax' },
    
    // 澳大利亚
    'Sydney, Australia': { longitude: 151.209, timezone: 'Australia/Sydney' },
    'Melbourne, Australia': { longitude: 144.963, timezone: 'Australia/Melbourne' },
    'Brisbane, Australia': { longitude: 153.025, timezone: 'Australia/Brisbane' },
    'Perth, Australia': { longitude: 115.860, timezone: 'Australia/Perth' },
    'Adelaide, Australia': { longitude: 138.600, timezone: 'Australia/Adelaide' },
    'Gold Coast, Australia': { longitude: 153.430, timezone: 'Australia/Brisbane' },
    'Newcastle, Australia': { longitude: 151.781, timezone: 'Australia/Sydney' },
    'Canberra, Australia': { longitude: 149.130, timezone: 'Australia/Sydney' },
    'Hobart, Australia': { longitude: 147.327, timezone: 'Australia/Hobart' },
    'Darwin, Australia': { longitude: 130.841, timezone: 'Australia/Darwin' },
    
    // 新西兰
    'Auckland, New Zealand': { longitude: 174.763, timezone: 'Pacific/Auckland' },
    'Wellington, New Zealand': { longitude: 174.777, timezone: 'Pacific/Auckland' },
    'Christchurch, New Zealand': { longitude: 172.636, timezone: 'Pacific/Auckland' },
    'Hamilton, New Zealand': { longitude: 175.283, timezone: 'Pacific/Auckland' },
    
    // 中东
    'Dubai, UAE': { longitude: 55.270, timezone: 'Asia/Dubai' },
    'Abu Dhabi, UAE': { longitude: 54.377, timezone: 'Asia/Dubai' },
    'Riyadh, Saudi Arabia': { longitude: 46.675, timezone: 'Asia/Riyadh' },
    'Jeddah, Saudi Arabia': { longitude: 39.184, timezone: 'Asia/Riyadh' },
    'Tel Aviv, Israel': { longitude: 34.782, timezone: 'Asia/Jerusalem' },
    'Jerusalem, Israel': { longitude: 35.213, timezone: 'Asia/Jerusalem' },
    'Tehran, Iran': { longitude: 51.389, timezone: 'Asia/Tehran' },
    'Baghdad, Iraq': { longitude: 44.366, timezone: 'Asia/Baghdad' },
    'Kuwait City, Kuwait': { longitude: 47.978, timezone: 'Asia/Kuwait' },
    'Doha, Qatar': { longitude: 51.531, timezone: 'Asia/Qatar' },
    'Manama, Bahrain': { longitude: 50.586, timezone: 'Asia/Bahrain' },
    'Muscat, Oman': { longitude: 58.405, timezone: 'Asia/Muscat' },
    
    // 南美洲
    'São Paulo, Brazil': { longitude: -46.633, timezone: 'America/Sao_Paulo' },
    'Rio de Janeiro, Brazil': { longitude: -43.172, timezone: 'America/Sao_Paulo' },
    'Buenos Aires, Argentina': { longitude: -58.381, timezone: 'America/Argentina/Buenos_Aires' },
    'Lima, Peru': { longitude: -77.042, timezone: 'America/Lima' },
    'Bogotá, Colombia': { longitude: -74.072, timezone: 'America/Bogota' },
    'Santiago, Chile': { longitude: -70.669, timezone: 'America/Santiago' },
    'Caracas, Venezuela': { longitude: -66.904, timezone: 'America/Caracas' },
    'Quito, Ecuador': { longitude: -78.467, timezone: 'America/Guayaquil' },
    'Montevideo, Uruguay': { longitude: -56.164, timezone: 'America/Montevideo' },
    'Asunción, Paraguay': { longitude: -57.575, timezone: 'America/Asuncion' },
    
    // 非洲
    'Cairo, Egypt': { longitude: 31.235, timezone: 'Africa/Cairo' },
    'Johannesburg, South Africa': { longitude: 28.047, timezone: 'Africa/Johannesburg' },
    'Cape Town, South Africa': { longitude: 18.424, timezone: 'Africa/Johannesburg' },
    'Lagos, Nigeria': { longitude: 3.379, timezone: 'Africa/Lagos' },
    'Nairobi, Kenya': { longitude: 36.821, timezone: 'Africa/Nairobi' },
    'Casablanca, Morocco': { longitude: -7.589, timezone: 'Africa/Casablanca' },
    'Tunis, Tunisia': { longitude: 10.181, timezone: 'Africa/Tunis' },
    'Algiers, Algeria': { longitude: 3.058, timezone: 'Africa/Algiers' },
    'Addis Ababa, Ethiopia': { longitude: 38.746, timezone: 'Africa/Addis_Ababa' },
    'Dar es Salaam, Tanzania': { longitude: 39.208, timezone: 'Africa/Dar_es_Salaam' },
    
    // 其他
    'Mexico City, Mexico': { longitude: -99.133, timezone: 'America/Mexico_City' },
    'Guadalajara, Mexico': { longitude: -103.349, timezone: 'America/Mexico_City' },
    'Monterrey, Mexico': { longitude: -100.316, timezone: 'America/Monterrey' }
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
                    {Object.keys(cityCoordinates).filter(city => city.includes(', USA')).map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </optgroup>
                  <optgroup label="China">
                    {Object.keys(cityCoordinates).filter(city => city.includes(', China')).map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Taiwan">
                    {Object.keys(cityCoordinates).filter(city => city.includes(', Taiwan')).map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Japan">
                    {Object.keys(cityCoordinates).filter(city => city.includes(', Japan')).map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </optgroup>
                  <optgroup label="South Korea">
                    {Object.keys(cityCoordinates).filter(city => city.includes(', South Korea')).map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Southeast Asia">
                    {Object.keys(cityCoordinates).filter(city => 
                      city.includes('Singapore') || city.includes(', Thailand') || city.includes(', Malaysia') || 
                      city.includes(', Indonesia') || city.includes(', Philippines') || city.includes(', Vietnam') ||
                      city.includes(', Myanmar') || city.includes(', Cambodia') || city.includes(', Laos') || city.includes(', Brunei')
                    ).map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </optgroup>
                  <optgroup label="India">
                    {Object.keys(cityCoordinates).filter(city => city.includes(', India')).map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Europe">
                    {Object.keys(cityCoordinates).filter(city => 
                      city.includes(', UK') || city.includes(', France') || city.includes(', Germany') ||
                      city.includes(', Spain') || city.includes(', Italy') || city.includes(', Netherlands') ||
                      city.includes(', Belgium') || city.includes(', Austria') || city.includes(', Switzerland') ||
                      city.includes(', Sweden') || city.includes(', Denmark') || city.includes(', Norway') ||
                      city.includes(', Finland') || city.includes(', Ireland') || city.includes(', Portugal') ||
                      city.includes(', Greece') || city.includes(', Poland') || city.includes(', Czech Republic') ||
                      city.includes(', Hungary') || city.includes(', Romania') || city.includes(', Russia') ||
                      city.includes(', Turkey')
                    ).map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Canada">
                    {Object.keys(cityCoordinates).filter(city => city.includes(', Canada')).map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Australia">
                    {Object.keys(cityCoordinates).filter(city => city.includes(', Australia')).map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </optgroup>
                  <optgroup label="New Zealand">
                    {Object.keys(cityCoordinates).filter(city => city.includes(', New Zealand')).map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Middle East">
                    {Object.keys(cityCoordinates).filter(city => 
                      city.includes(', UAE') || city.includes(', Saudi Arabia') || city.includes(', Israel') ||
                      city.includes(', Iran') || city.includes(', Iraq') || city.includes(', Kuwait') ||
                      city.includes(', Qatar') || city.includes(', Bahrain') || city.includes(', Oman')
                    ).map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </optgroup>
                  <optgroup label="South America">
                    {Object.keys(cityCoordinates).filter(city => 
                      city.includes(', Brazil') || city.includes(', Argentina') || city.includes(', Peru') ||
                      city.includes(', Colombia') || city.includes(', Chile') || city.includes(', Venezuela') ||
                      city.includes(', Ecuador') || city.includes(', Uruguay') || city.includes(', Paraguay')
                    ).map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Africa">
                    {Object.keys(cityCoordinates).filter(city => 
                      city.includes(', Egypt') || city.includes(', South Africa') || city.includes(', Nigeria') ||
                      city.includes(', Kenya') || city.includes(', Morocco') || city.includes(', Tunisia') ||
                      city.includes(', Algeria') || city.includes(', Ethiopia') || city.includes(', Tanzania')
                    ).map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Other">
                    {Object.keys(cityCoordinates).filter(city => 
                      city.includes(', Mexico')
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
