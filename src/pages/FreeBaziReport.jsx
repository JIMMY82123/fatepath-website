import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ArrowLeft, Download, Share2, Crown, X, Clock, Gift, Sparkles, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Lunar } from 'lunar-javascript'
import SEO from '../components/SEO'

const FreeBaziReport = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    dateOfBirth: '',
    timeOfBirth: '',
    birthLocation: ''
  })
  
  const [report, setReport] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showOfferModal, setShowOfferModal] = useState(false)
  const [timeSpent, setTimeSpent] = useState(0)

  // 监听用户观看时间
  useEffect(() => {
    if (report) {
      const timer = setInterval(() => {
        setTimeSpent(prev => {
          const newTime = prev + 1
          // 30秒后显示优惠弹窗
          if (newTime === 30 && !showOfferModal) {
            setShowOfferModal(true)
          }
          return newTime
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [report, showOfferModal])

  // 关闭弹窗
  const closeOfferModal = () => {
    setShowOfferModal(false)
  }

  // PayPal支付链接 - 添加返回URL参数
  const paypalLink = "https://www.paypal.com/ncp/payment/9C2AYQDRSB9XY?return_url=" + encodeURIComponent(window.location.origin + '/form-bazi-discount')

  const handlePaypalPayment = () => {
    // 在当前窗口打开PayPal支付页面
    window.location.href = paypalLink
    
    // 显示支付状态提示
    const showPaymentStatus = (message, isSuccess = false) => {
      const notification = document.createElement('div')
      notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 ${
        isSuccess ? 'bg-green-600 text-white' : 'bg-orange-600 text-white'
      }`
      notification.textContent = message
      document.body.appendChild(notification)
      
      setTimeout(() => {
        notification.style.transform = 'translateX(100%)'
        setTimeout(() => {
          document.body.removeChild(notification)
        }, 300)
      }, 3000)
    }
    
    // 监听支付完成（这里应该集成PayPal IPN或使用PayPal SDK）
    // 目前使用模拟验证，实际应该根据PayPal回调
    const checkPaymentStatus = () => {
      // 模拟支付验证逻辑
      const paymentVerified = Math.random() > 0.3 // 70%成功率模拟
      
      if (paymentVerified) {
        showPaymentStatus('✅ 支付成功！正在跳转到详细分析页面...', true)
        setTimeout(() => {
          window.location.href = '/form-bazi-discount'
        }, 2000)
      } else {
        showPaymentStatus('⚠️ 支付未完成，请重新尝试或联系客服', false)
      }
    }
    
    // 5秒后检查支付状态（实际应该根据PayPal IPN）
    setTimeout(checkPaymentStatus, 5000)
    
    closeOfferModal()
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // 五行元素映射表
  const elementMapping = {
    // 天干五行
    '甲': 'Wood', '乙': 'Wood',
    '丙': 'Fire', '丁': 'Fire', 
    '戊': 'Earth', '己': 'Earth',
    '庚': 'Metal', '辛': 'Metal',
    '壬': 'Water', '癸': 'Water',
    // 地支五行
    '寅': 'Wood', '卯': 'Wood',
    '巳': 'Fire', '午': 'Fire',
    '辰': 'Earth', '戌': 'Earth', '丑': 'Earth', '未': 'Earth',
    '申': 'Metal', '酉': 'Metal',
    '子': 'Water', '亥': 'Water'
  }

  // 分析八字中的五行能量
  const analyzeFiveElements = (bazi) => {
    const elements = {
      Wood: 0,
      Fire: 0,
      Earth: 0,
      Metal: 0,
      Water: 0
    }
    
    // 统计每个柱中的五行
    Object.values(bazi).forEach(pillar => {
      const stem = pillar.charAt(0)
      const branch = pillar.charAt(1)
      
      if (elementMapping[stem]) {
        elements[elementMapping[stem]]++
      }
      if (elementMapping[branch]) {
        elements[elementMapping[branch]]++
      }
    })
    
    // 找出主导元素
    const maxCount = Math.max(...Object.values(elements))
    const dominantElements = Object.entries(elements)
      .filter(([_, count]) => count === maxCount)
      .map(([element, _]) => element)
    
    // 计算五行平衡度
    const totalElements = Object.values(elements).reduce((sum, count) => sum + count, 0)
    const balanceScore = 1 - (maxCount / totalElements) * 0.5
    
    return {
      elements,
      dominantElements,
      balanceScore,
      maxCount,
      totalElements
    }
  }

  // 根据五行能量生成报告模板
  const generateElementBasedReport = (data, fiveElements) => {
    const { dominantElements, balanceScore, elements } = fiveElements
    
    // 根据主导元素选择报告模板
    if (dominantElements.includes('Metal')) {
      return {
        wealth: generateMetalWealthAnalysis(data, elements),
        love: generateMetalLoveAnalysis(data, elements),
        health: generateMetalHealthAnalysis(data, elements),
        summary: generateMetalSummary(data, elements)
      }
    } else if (dominantElements.includes('Wood')) {
      return {
        wealth: generateWoodWealthAnalysis(data, elements),
        love: generateWoodLoveAnalysis(data, elements),
        health: generateWoodHealthAnalysis(data, elements),
        summary: generateWoodSummary(data, elements)
      }
    } else if (dominantElements.includes('Fire')) {
      return {
        wealth: generateFireWealthAnalysis(data, elements),
        love: generateFireLoveAnalysis(data, elements),
        health: generateFireHealthAnalysis(data, elements),
        summary: generateFireSummary(data, elements)
      }
    } else if (dominantElements.includes('Water')) {
      return {
        wealth: generateWaterWealthAnalysis(data, elements),
        love: generateWaterLoveAnalysis(data, elements),
        health: generateWaterHealthAnalysis(data, elements),
        summary: generateWaterSummary(data, elements)
      }
    } else if (dominantElements.includes('Earth')) {
      return {
        wealth: generateEarthWealthAnalysis(data, elements),
        love: generateEarthLoveAnalysis(data, elements),
        health: generateEarthHealthAnalysis(data, elements),
        summary: generateEarthSummary(data, elements)
      }
    }
    
    // 如果五行平衡，使用平衡模板
    return {
      wealth: generateBalancedWealthAnalysis(data, elements),
      love: generateBalancedLoveAnalysis(data, elements),
      health: generateBalancedHealthAnalysis(data, elements),
      summary: generateBalancedSummary(data, elements)
    }
  }

  // 金属性报告模板
  const generateMetalWealthAnalysis = (data, elements) => {
    const metalCount = elements.Metal
    const waterCount = elements.Water
    
    if (metalCount >= 4) {
      return "Your Bazi chart shows exceptionally strong Metal energy, indicating great potential for wealth accumulation through structured investments and financial planning. Your analytical mind and disciplined approach make you excellent at managing money and identifying profitable opportunities. Focus on careers in finance, banking, or technology. Your wealth peak will be between ages 35-50."
    } else if (waterCount > 0) {
      return "Your Metal-Water combination creates excellent wealth potential. Metal provides structure while Water brings flow and adaptability. You excel in dynamic financial environments and can adapt to market changes. Consider careers in investment banking, real estate development, or international trade. Your wealth-building strategy should balance conservative planning with calculated risks."
    } else {
      return "Your Metal energy indicates a methodical approach to wealth building. You prefer stable, long-term investments over high-risk ventures. Your analytical skills help you make sound financial decisions. Focus on building a solid foundation through steady savings and conservative investments. Your wealth will grow steadily over time."
    }
  }

  const generateMetalLoveAnalysis = (data, elements) => {
    const metalCount = elements.Metal
    const fireCount = elements.Fire
    
    if (metalCount >= 4) {
      return "Your strong Metal energy makes you highly principled in relationships. You value loyalty, commitment, and intellectual connection. You may appear reserved initially but are deeply devoted once committed. Your ideal partner should be intelligent, honest, and share your values. Communication is key - express your feelings openly to avoid misunderstandings."
    } else if (fireCount > 0) {
      return "Your Metal-Fire combination creates an interesting dynamic in love. Metal provides structure while Fire brings passion and warmth. You need both emotional connection and intellectual stimulation. Your relationships will be intense and meaningful. Find a partner who can balance your logical nature with emotional understanding."
    } else {
      return "Your Metal energy brings stability and loyalty to relationships. You are reliable and committed, but may need to work on emotional expression. Your love life benefits from clear communication and mutual respect. You thrive in long-term, committed relationships built on trust and shared values."
    }
  }

  const generateMetalHealthAnalysis = (data, elements) => {
    const metalCount = elements.Metal
    
    if (metalCount >= 4) {
      return "Your strong Metal energy affects your respiratory and skin systems. Pay attention to lung health and maintain good air quality. Regular breathing exercises and outdoor activities in clean environments are beneficial. Your skin may be sensitive, so use gentle skincare products. Stress management is crucial as Metal energy can lead to tension."
    } else {
      return "Your Metal energy influences your respiratory system and skin. Maintain good posture and breathing habits. Regular exercise, especially activities that improve lung capacity, will benefit your health. Pay attention to skin care and avoid harsh chemicals. Balance work and rest to prevent stress-related issues."
    }
  }

  const generateMetalSummary = (data, elements) => {
    const metalCount = elements.Metal
    
    if (metalCount >= 4) {
      return "Your Bazi chart reveals a strong Metal personality - analytical, principled, and determined. Your greatest strength lies in your ability to create structure and maintain discipline. Success comes through careful planning and systematic approach. Focus on developing emotional intelligence to balance your logical nature. Your life path emphasizes building lasting foundations through hard work and integrity."
    } else {
      return "Your Metal energy provides a solid foundation for life success. You approach challenges methodically and value quality over quantity. Your analytical mind helps you make wise decisions. Focus on building strong relationships and maintaining work-life balance. Your steady approach will lead to long-term success and fulfillment."
    }
  }

  // 木属性报告模板
  const generateWoodWealthAnalysis = (data, elements) => {
    const woodCount = elements.Wood
    const fireCount = elements.Fire
    
    if (woodCount >= 4) {
      return "Your abundant Wood energy indicates excellent growth potential in wealth creation. You have natural leadership abilities and entrepreneurial spirit. Your wealth comes through expansion, innovation, and helping others grow. Consider careers in education, consulting, or starting your own business. Your wealth peak will be between ages 30-45 through continuous growth and development."
    } else if (fireCount > 0) {
      return "Your Wood-Fire combination creates dynamic wealth potential. Wood provides growth while Fire brings energy and visibility. You excel in creative industries, marketing, or any field that combines innovation with communication. Your wealth-building strategy should focus on leveraging your creativity and networking skills. Success comes through collaboration and sharing your vision."
    } else {
      return "Your Wood energy indicates growth-oriented wealth building. You prefer investments that have potential for expansion and development. Your natural leadership qualities help you identify opportunities and inspire others. Focus on careers that allow for growth and learning. Your wealth will increase steadily as you develop your skills and expand your influence."
    }
  }

  const generateWoodLoveAnalysis = (data, elements) => {
    const woodCount = elements.Wood
    
    if (woodCount >= 4) {
      return "Your strong Wood energy makes you naturally caring and nurturing in relationships. You have a strong sense of justice and fairness. You may be idealistic about love and need to balance your giving nature with self-care. Your relationships thrive on mutual growth and support. Find a partner who appreciates your caring nature and supports your personal development."
    } else {
      return "Your Wood energy brings growth and nurturing qualities to relationships. You are supportive and encouraging, helping partners reach their potential. You value honesty and fairness in love. Your relationships benefit from open communication and shared goals. You thrive in partnerships that allow both individuals to grow together."
    }
  }

  const generateWoodHealthAnalysis = (data, elements) => {
    const woodCount = elements.Wood
    
    if (woodCount >= 4) {
      return "Your strong Wood energy affects your liver and nervous system. Pay attention to stress management and emotional balance. Regular exercise, especially stretching and yoga, will benefit your health. Your liver may be sensitive, so maintain a healthy diet and avoid excessive alcohol. Green vegetables and fresh foods are particularly beneficial for your constitution."
    } else {
      return "Your Wood energy influences your liver and nervous system. Regular exercise and outdoor activities will help maintain your vitality. Pay attention to stress levels and practice relaxation techniques. A diet rich in green vegetables and fresh foods will support your health. Maintain regular sleep patterns for optimal well-being."
    }
  }

  const generateWoodSummary = (data, elements) => {
    const woodCount = elements.Wood
    
    if (woodCount >= 4) {
      return "Your Bazi chart reveals a strong Wood personality - growth-oriented, caring, and idealistic. Your greatest strength lies in your ability to nurture growth in yourself and others. Success comes through continuous learning and helping others develop. Focus on balancing your giving nature with self-care. Your life path emphasizes personal and collective growth through education, leadership, and service."
    } else {
      return "Your Wood energy provides a foundation for growth and development. You have natural leadership qualities and a caring nature. Your success comes through helping others and continuous self-improvement. Focus on maintaining balance between giving and receiving. Your growth-oriented approach will lead to meaningful achievements and fulfilling relationships."
    }
  }

  // 火属性报告模板
  const generateFireWealthAnalysis = (data, elements) => {
    const fireCount = elements.Fire
    const earthCount = elements.Earth
    
    if (fireCount >= 4) {
      return "Your intense Fire energy indicates dynamic wealth creation through passion and charisma. You have natural marketing abilities and can inspire others to invest in your vision. Your wealth comes through leadership, public speaking, or creative industries. Be careful with impulsive financial decisions. Your wealth peak will be between ages 25-40 through bold initiatives and personal charisma."
    } else if (earthCount > 0) {
      return "Your Fire-Earth combination creates stable yet dynamic wealth potential. Fire provides energy and visibility while Earth brings practicality and stability. You excel in fields that combine creativity with structure, such as event planning, real estate, or consulting. Your wealth-building strategy should balance bold initiatives with careful planning."
    } else {
      return "Your Fire energy indicates wealth creation through passion and creativity. You have natural leadership abilities and can inspire others. Your wealth comes through careers that allow you to express your creativity and charisma. Focus on developing patience and planning skills to complement your natural enthusiasm. Your wealth will grow through your ability to motivate and lead others."
    }
  }

  const generateFireLoveAnalysis = (data, elements) => {
    const fireCount = elements.Fire
    
    if (fireCount >= 4) {
      return "Your strong Fire energy makes you passionate and charismatic in relationships. You have intense emotions and need partners who can handle your passionate nature. You may be impulsive in love and need to develop patience. Your relationships are exciting and dynamic. Find a partner who appreciates your enthusiasm and can provide emotional stability."
    } else {
      return "Your Fire energy brings passion and warmth to relationships. You are enthusiastic and loving, creating exciting connections. You need emotional expression and appreciation in love. Your relationships benefit from open communication and shared activities. You thrive in partnerships that allow for emotional expression and mutual support."
    }
  }

  const generateFireHealthAnalysis = (data, elements) => {
    const fireCount = elements.Fire
    
    if (fireCount >= 4) {
      return "Your strong Fire energy affects your heart and circulatory system. Pay attention to heart health and stress management. Regular cardiovascular exercise is beneficial, but avoid overexertion. Your metabolism may be fast, so maintain regular eating patterns. Cooling foods and plenty of water will help balance your constitution. Practice stress-reduction techniques."
    } else {
      return "Your Fire energy influences your heart and circulatory system. Regular exercise and stress management are important for your health. Pay attention to your heart health and maintain a balanced diet. Cooling foods and adequate hydration will support your vitality. Practice relaxation techniques to maintain emotional balance."
    }
  }

  const generateFireSummary = (data, elements) => {
    const fireCount = elements.Fire
    
    if (fireCount >= 4) {
      return "Your Bazi chart reveals a strong Fire personality - passionate, charismatic, and dynamic. Your greatest strength lies in your ability to inspire and motivate others. Success comes through leadership, creativity, and personal charisma. Focus on developing patience and emotional balance. Your life path emphasizes using your passion and energy to create positive change and inspire others."
    } else {
      return "Your Fire energy provides enthusiasm and creativity to your life. You have natural leadership abilities and can inspire others. Your success comes through expressing your passion and creativity. Focus on developing patience and emotional balance. Your enthusiastic approach will lead to exciting opportunities and meaningful achievements."
    }
  }

  // 水属性报告模板
  const generateWaterWealthAnalysis = (data, elements) => {
    const waterCount = elements.Water
    const woodCount = elements.Wood
    
    if (waterCount >= 4) {
      return "Your abundant Water energy indicates wealth through wisdom, knowledge, and adaptability. You have excellent intuition for business opportunities and can navigate complex situations. Your wealth comes through intellectual pursuits, research, or international business. You excel in fields requiring deep knowledge and strategic thinking. Your wealth peak will be between ages 40-55 through accumulated wisdom and experience."
    } else if (woodCount > 0) {
      return "Your Water-Wood combination creates excellent wealth potential through knowledge and growth. Water provides wisdom while Wood brings expansion and leadership. You excel in education, consulting, or any field that combines knowledge with helping others grow. Your wealth-building strategy should focus on leveraging your wisdom and teaching abilities."
    } else {
      return "Your Water energy indicates wealth creation through wisdom and adaptability. You have excellent intuition and can identify opportunities others miss. Your wealth comes through careers that require deep thinking and strategic planning. Focus on developing your knowledge and expertise. Your wealth will grow through your ability to navigate complex situations and provide valuable insights."
    }
  }

  const generateWaterLoveAnalysis = (data, elements) => {
    const waterCount = elements.Water
    
    if (waterCount >= 4) {
      return "Your strong Water energy makes you deeply emotional and intuitive in relationships. You have profound emotional depth and need partners who can understand your complex nature. You may be mysterious and need time to open up. Your relationships are deep and meaningful. Find a partner who appreciates your emotional depth and provides emotional security."
    } else {
      return "Your Water energy brings emotional depth and intuition to relationships. You are sensitive and caring, creating deep emotional connections. You need emotional security and understanding in love. Your relationships benefit from deep communication and emotional support. You thrive in partnerships that allow for emotional expression and mutual understanding."
    }
  }

  const generateWaterHealthAnalysis = (data, elements) => {
    const waterCount = elements.Water
    
    if (waterCount >= 4) {
      return "Your strong Water energy affects your kidneys and reproductive system. Pay attention to kidney health and maintain good hydration. Your emotional health significantly impacts your physical well-being. Regular meditation and stress management are crucial. Avoid excessive salt and maintain a balanced diet. Your constitution benefits from warm foods and regular rest."
    } else {
      return "Your Water energy influences your kidneys and emotional health. Maintain good hydration and pay attention to your emotional well-being. Regular meditation and stress management will benefit your health. A balanced diet with adequate hydration is important. Practice emotional self-care and maintain regular sleep patterns."
    }
  }

  const generateWaterSummary = (data, elements) => {
    const waterCount = elements.Water
    
    if (waterCount >= 4) {
      return "Your Bazi chart reveals a strong Water personality - wise, intuitive, and emotionally deep. Your greatest strength lies in your wisdom and ability to navigate complex situations. Success comes through accumulated knowledge and emotional intelligence. Focus on developing emotional balance and self-expression. Your life path emphasizes using your wisdom and intuition to help others and create meaningful change."
    } else {
      return "Your Water energy provides wisdom and emotional depth to your life. You have excellent intuition and can understand complex situations. Your success comes through developing your knowledge and emotional intelligence. Focus on maintaining emotional balance and expressing your feelings. Your wise approach will lead to deep understanding and meaningful relationships."
    }
  }

  // 土属性报告模板
  const generateEarthWealthAnalysis = (data, elements) => {
    const earthCount = elements.Earth
    const fireCount = elements.Fire
    
    if (earthCount >= 4) {
      return "Your strong Earth energy indicates wealth through stability, reliability, and practical skills. You excel in building solid foundations and maintaining long-term success. Your wealth comes through real estate, agriculture, or any field requiring patience and practical knowledge. You prefer steady, reliable investments over risky ventures. Your wealth peak will be between ages 45-60 through accumulated assets and stable growth."
    } else if (fireCount > 0) {
      return "Your Earth-Fire combination creates excellent wealth potential through practical creativity. Earth provides stability while Fire brings energy and visibility. You excel in fields that combine practical skills with creativity, such as architecture, interior design, or culinary arts. Your wealth-building strategy should focus on building solid foundations while expressing your creative talents."
    } else {
      return "Your Earth energy indicates wealth creation through stability and practical skills. You have excellent organizational abilities and can build lasting foundations. Your wealth comes through careers that require reliability and practical knowledge. Focus on developing your skills and building long-term relationships. Your wealth will grow steadily through your practical approach and reliability."
    }
  }

  const generateEarthLoveAnalysis = (data, elements) => {
    const earthCount = elements.Earth
    
    if (earthCount >= 4) {
      return "Your strong Earth energy makes you reliable and nurturing in relationships. You are practical and down-to-earth, providing stability and security to partners. You may be reserved in expressing emotions but show love through actions. Your relationships are built on trust and mutual support. Find a partner who appreciates your practical nature and provides emotional warmth."
    } else {
      return "Your Earth energy brings stability and reliability to relationships. You are practical and caring, creating secure and supportive partnerships. You value trust and mutual support in love. Your relationships benefit from practical cooperation and shared responsibilities. You thrive in partnerships that provide both emotional and practical support."
    }
  }

  const generateEarthHealthAnalysis = (data, elements) => {
    const earthCount = elements.Earth
    
    if (earthCount >= 4) {
      return "Your strong Earth energy affects your digestive system and overall stability. Pay attention to digestive health and maintain regular eating patterns. Your constitution benefits from warm, cooked foods and regular routines. Avoid excessive cold or raw foods. Regular exercise and outdoor activities will help maintain your vitality. Focus on building strong physical foundations."
    } else {
      return "Your Earth energy influences your digestive system and overall stability. Maintain regular eating patterns and pay attention to digestive health. A diet rich in warm, cooked foods will support your constitution. Regular exercise and outdoor activities are beneficial. Focus on building strong physical and emotional foundations."
    }
  }

  const generateEarthSummary = (data, elements) => {
    const earthCount = elements.Earth
    
    if (earthCount >= 4) {
      return "Your Bazi chart reveals a strong Earth personality - practical, reliable, and nurturing. Your greatest strength lies in your ability to build solid foundations and provide stability. Success comes through patience, practical skills, and reliable service. Focus on developing emotional expression and flexibility. Your life path emphasizes creating stability and security for yourself and others through practical wisdom and reliable service."
    } else {
      return "Your Earth energy provides stability and practicality to your life. You have excellent organizational abilities and can build lasting foundations. Your success comes through practical skills and reliable service. Focus on developing emotional expression and flexibility. Your practical approach will lead to stable achievements and meaningful contributions to others."
    }
  }

  // 平衡五行报告模板
  const generateBalancedWealthAnalysis = (data, elements) => {
    return "Your balanced Bazi chart indicates versatile wealth potential across multiple areas. You have the flexibility to adapt to different financial opportunities and market conditions. Your wealth comes through a combination of skills and adaptability. Focus on developing diverse income streams and maintaining financial flexibility. Your wealth will grow steadily through balanced decision-making and adaptability."
  }

  const generateBalancedLoveAnalysis = (data, elements) => {
    return "Your balanced Bazi chart indicates harmonious relationships with good emotional intelligence. You can adapt to different relationship dynamics and maintain healthy boundaries. Your love life benefits from your ability to understand and balance different perspectives. Focus on maintaining emotional balance and clear communication. You thrive in relationships that allow for mutual growth and understanding."
  }

  const generateBalancedHealthAnalysis = (data, elements) => {
    return "Your balanced Bazi chart indicates good overall health potential with few major vulnerabilities. Your constitution benefits from a balanced lifestyle and varied activities. Maintain regular exercise, balanced nutrition, and stress management. Your health will be stable with proper care and attention to all aspects of well-being."
  }

  const generateBalancedSummary = (data, elements) => {
    return "Your balanced Bazi chart reveals a harmonious personality with good adaptability and emotional intelligence. Your greatest strength lies in your ability to maintain balance and adapt to different situations. Success comes through flexibility, balanced decision-making, and harmonious relationships. Focus on maintaining this balance while developing your unique strengths. Your life path emphasizes creating harmony and balance in all areas of life."
  }

  const generateBaziReport = async (e) => {
    e.preventDefault()
    setIsGenerating(true)

    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 2000))

    // 计算八字
    const bazi = calculateBazi(formData.dateOfBirth, formData.timeOfBirth)
    
    // 分析五行能量
    const fiveElements = analyzeFiveElements(bazi)
    
    // 根据五行能量生成报告
    const elementBasedReport = generateElementBasedReport(formData, fiveElements)

    // 生成完整报告
    const generatedReport = {
      name: formData.fullName,
      bazi: bazi,
      fiveElements: fiveElements,
      wealth: elementBasedReport.wealth,
      love: elementBasedReport.love,
      health: elementBasedReport.health,
      summary: elementBasedReport.summary
    }

    setReport(generatedReport)
    setIsGenerating(false)
  }

  const calculateBazi = (date, time) => {
    // 使用lunar-javascript库进行准确的八字计算
    const birthDate = new Date(date + (time ? 'T' + time : 'T12:00'))
    
    // 获取农历日期
    const lunar = Lunar.fromDate(birthDate)
    
    // 获取八字
    const bazi = lunar.getBaZi()
    
    return {
      year: bazi[0].toString(),
      month: bazi[1].toString(),
      day: bazi[2].toString(),
      hour: bazi[3].toString()
    }
  }

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      alert('Report copied to clipboard!')
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  if (report) {
    return (
      <>
        <SEO 
          title={`${report.name}'s Free Bazi Reading Report | Professional Chinese Numerology Analysis`}
          description={`Get ${report.name}'s personalized Bazi reading report with detailed analysis of wealth, love, health, and life path based on traditional Chinese numerology. Free comprehensive Bazi chart analysis.`}
          keywords={`bazi reading report, ${report.name} bazi analysis, free bazi chart, chinese numerology report, bazi wealth analysis, bazi love compatibility, bazi health reading, personalized bazi reading`}
          canonical={`${window.location.origin}/free-bazi-report`}
          ogImage={`${window.location.origin}/images/bazi-reading.jpg`}
          ogType="article"
          structuredData={{
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": `${report.name}'s Bazi Reading Report`,
            "description": `Personalized Bazi analysis for ${report.name} covering wealth, love, health, and life path`,
            "author": {
              "@type": "Organization",
              "name": "FatePath"
            },
            "publisher": {
              "@type": "Organization",
              "name": "FatePath"
            },
            "datePublished": new Date().toISOString(),
            "image": `${window.location.origin}/images/bazi-reading.jpg`
          }}
        />
        <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Report Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-6 sm:mb-8"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-gold-500 to-yellow-500 mb-3 sm:mb-4">
              <Star className="h-6 w-6 sm:h-8 sm:w-8 text-white" aria-hidden="true" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-bold mb-3 sm:mb-4 text-white">
              {report.name}'s Bazi Reading Report
            </h1>
            <p className="text-base sm:text-lg text-mystic-300">
              Personalized Bazi analysis based on your birth information
            </p>
          </motion.div>

          {/* Bazi Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mystic-card p-4 sm:p-8 mb-6 sm:mb-8"
          >
            <h2 className="text-xl sm:text-2xl font-cinzel font-bold mb-4 sm:mb-6 text-gold-400">Your Bazi Chart</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <div className="text-center p-3 sm:p-4 bg-mystic-800/50 rounded-lg border border-mystic-700/50">
                <div className="text-xs sm:text-sm text-mystic-400 mb-1 sm:mb-2">Year Pillar</div>
                <div className="text-lg sm:text-2xl font-bold text-white">{report.bazi.year}</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-mystic-800/50 rounded-lg border border-mystic-700/50">
                <div className="text-xs sm:text-sm text-mystic-400 mb-1 sm:mb-2">Month Pillar</div>
                <div className="text-lg sm:text-2xl font-bold text-white">{report.bazi.month}</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-mystic-800/50 rounded-lg border border-mystic-700/50">
                <div className="text-xs sm:text-sm text-mystic-400 mb-1 sm:mb-2">Day Pillar</div>
                <div className="text-lg sm:text-2xl font-bold text-white">{report.bazi.day}</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-mystic-800/50 rounded-lg border border-mystic-700/50">
                <div className="text-xs sm:text-sm text-mystic-400 mb-1 sm:mb-2">Hour Pillar</div>
                <div className="text-lg sm:text-2xl font-bold text-white">{report.bazi.hour}</div>
              </div>
            </div>
          </motion.div>

          {/* Five Elements Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mystic-card p-4 sm:p-8 mb-6 sm:mb-8"
          >
            <h2 className="text-xl sm:text-2xl font-cinzel font-bold mb-4 sm:mb-6 text-gold-400">Five Elements Energy Analysis</h2>
            
            {/* Dominant Elements */}
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">Dominant Elements</h3>
              <div className="flex flex-wrap gap-2">
                {report.fiveElements.dominantElements.map((element, index) => (
                  <span
                    key={index}
                    className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold ${
                      element === 'Metal' ? 'bg-gray-600 text-white' :
                      element === 'Wood' ? 'bg-green-600 text-white' :
                      element === 'Fire' ? 'bg-red-600 text-white' :
                      element === 'Water' ? 'bg-blue-600 text-white' :
                      'bg-yellow-600 text-black'
                    }`}
                  >
                    {element} Energy
                  </span>
                ))}
              </div>
            </div>

            {/* Element Distribution */}
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">Element Distribution</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
                {Object.entries(report.fiveElements.elements).map(([element, count]) => (
                  <div key={element} className="text-center">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-1 sm:mb-2 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg ${
                      element === 'Metal' ? 'bg-gray-600' :
                      element === 'Wood' ? 'bg-green-600' :
                      element === 'Fire' ? 'bg-red-600' :
                      element === 'Water' ? 'bg-blue-600' :
                      'bg-yellow-600'
                    }`}>
                      {count}
                    </div>
                    <div className="text-xs sm:text-sm text-mystic-300">{element}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Balance Score */}
            <div className="text-center p-4 bg-mystic-800/30 rounded-lg border border-mystic-700/50">
              <h3 className="text-lg font-semibold text-white mb-2">Energy Balance Score</h3>
              <div className="text-2xl font-bold text-gold-400 mb-2">
                {Math.round(report.fiveElements.balanceScore * 100)}%
              </div>
              <p className="text-sm text-mystic-300">
                {report.fiveElements.balanceScore > 0.7 ? 'Excellent Balance' :
                 report.fiveElements.balanceScore > 0.5 ? 'Good Balance' :
                 report.fiveElements.balanceScore > 0.3 ? 'Moderate Balance' :
                 'Strong Element Dominance'}
              </p>
            </div>
          </motion.div>

          {/* Report Sections */}
          <div className="space-y-8">
            {/* Wealth Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mystic-card p-8"
            >
              <h3 className="text-xl font-cinzel font-bold mb-4 text-gold-400 flex items-center">
                <span className="mr-2">💰</span>
                Wealth Analysis
              </h3>
              <p className="text-mystic-200 leading-relaxed">{report.wealth}</p>
            </motion.div>

            {/* Love Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mystic-card p-8"
            >
              <h3 className="text-xl font-cinzel font-bold mb-4 text-gold-400 flex items-center">
                <span className="mr-2">💕</span>
                Love & Relationships
              </h3>
              <p className="text-mystic-200 leading-relaxed">{report.love}</p>
            </motion.div>

            {/* Health Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mystic-card p-8"
            >
              <h3 className="text-xl font-cinzel font-bold mb-4 text-gold-400 flex items-center">
                <span className="mr-2">🏥</span>
                Health & Wellness
              </h3>
              <p className="text-mystic-200 leading-relaxed">{report.health}</p>
            </motion.div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mystic-card p-8"
            >
              <h3 className="text-xl font-cinzel font-bold mb-4 text-gold-400 flex items-center">
                <span className="mr-2">📋</span>
                Summary & Guidance
              </h3>
              <p className="text-mystic-200 leading-relaxed">{report.summary}</p>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <button
              onClick={() => copyToClipboard(document.querySelector('.mystic-card').innerText)}
              className="flex-1 flex items-center justify-center space-x-2 bg-mystic-800/50 border border-mystic-700/50 text-mystic-300 hover:text-gold-400 hover:border-gold-500/50 transition-colors py-3 px-6 rounded-lg"
            >
              <Share2 className="h-5 w-5" />
              <span>Copy Report</span>
            </button>
            
            <Link
              to="/services"
              className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold py-3 px-6 rounded-lg hover:from-gold-400 hover:to-gold-500 transition-all duration-300"
            >
              <Crown className="h-5 w-5" />
              <span>View Detailed Service</span>
            </Link>
          </motion.div>

          

                     {/* Back Link */}
           <div className="mt-8 text-center">
             <Link
               to="/"
               className="inline-flex items-center space-x-2 text-mystic-300 hover:text-gold-400 transition-colors"
             >
               <ArrowLeft className="h-4 w-4" />
               <span>Back to Home</span>
             </Link>
           </div>
         </div>

         {/* Special Offer Modal */}
         <AnimatePresence>
           {showOfferModal && (
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
               onClick={closeOfferModal}
             >
               <motion.div
                 initial={{ scale: 0.8, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 exit={{ scale: 0.8, opacity: 0 }}
                 className="bg-gradient-to-br from-mystic-900 to-mystic-800 border-2 border-gold-500/50 rounded-2xl p-8 max-w-md w-full relative"
                 onClick={(e) => e.stopPropagation()}
               >
                 {/* Close Button */}
                 <button
                   onClick={closeOfferModal}
                   className="absolute top-4 right-4 text-mystic-400 hover:text-white transition-colors"
                 >
                   <X className="h-6 w-6" />
                 </button>

                 {/* Header */}
                 <div className="text-center mb-6">
                   <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-gold-500 to-yellow-500 mb-4">
                     <Gift className="h-8 w-8 text-white" aria-hidden="true" />
                   </div>
                   <h3 className="text-2xl font-cinzel font-bold text-white mb-2">
                     Special Limited Offer!
                   </h3>
                   <p className="text-mystic-300">
                     You've been reading for {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
                   </p>
                 </div>

                 {/* Offer Content */}
                 <div className="space-y-4 mb-6">
                   <div className="bg-mystic-800/50 rounded-lg p-4 border border-mystic-700/50">
                     <h4 className="text-lg font-semibold text-gold-400 mb-2">
                       🎯 Complete Bazi Analysis Package
                     </h4>
                     <ul className="text-mystic-200 space-y-2 text-sm">
                       <li>✓ 10,000+ word detailed report</li>
                       <li>✓ Expert one-on-one consultation</li>
                       <li>✓ Annual fortune analysis</li>
                       <li>✓ Personalized recommendations</li>
                       <li>✓ Priority support</li>
                     </ul>
                   </div>

                   <div className="text-center">
                     <div className="text-3xl font-bold text-gold-400 mb-2">
                       <span className="line-through text-mystic-400 text-xl">$38</span>
                       <span className="ml-2">$30</span>
                     </div>
                     <p className="text-mystic-300 text-sm">
                       Limited time offer - Save 21%
                     </p>
                   </div>
                 </div>

                 {/* Action Buttons */}
                 <div className="space-y-3">
                                       <button
                      onClick={handlePaypalPayment}
                      className="touch-target w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-400 hover:to-blue-500 transition-all duration-300 flex items-center justify-center space-x-2 animate-optimized"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.067 8.478c.492.315.844.825.844 1.406 0 .58-.352 1.09-.844 1.406-.492.315-1.156.51-1.875.51h-1.406c-.492 0-.844-.195-.844-.51 0-.315.352-.51.844-.51h1.406c.352 0 .703-.195.703-.406 0-.21-.351-.406-.703-.406h-1.406c-.492 0-.844-.195-.844-.51 0-.315.352-.51.844-.51h1.406c.719 0 1.383.195 1.875.51zM12.5 8.478c.492.315.844.825.844 1.406 0 .58-.352 1.09-.844 1.406-.492.315-1.156.51-1.875.51h-1.406c-.492 0-.844-.195-.844-.51 0-.315.352-.51.844-.51h1.406c.352 0 .703-.195.703-.406 0-.21-.351-.406-.703-.406h-1.406c-.492 0-.844-.195-.844-.51 0-.315.352-.51.844-.51h1.406c.719 0 1.383.195 1.875.51zM7.5 8.478c.492.315.844.825.844 1.406 0 .58-.352 1.09-.844 1.406-.492.315-1.156.51-1.875.51H4.219c-.492 0-.844-.195-.844-.51 0-.315.352-.51.844-.51h1.406c.352 0 .703-.195.703-.406 0-.21-.351-.406-.703-.406H4.219c-.492 0-.844-.195-.844-.51 0-.315.352-.51.844-.51h1.406c.719 0 1.383.195 1.875.51z"/>
                      </svg>
                      <span>PAYPAL</span>
                    </button>
                   
                   <button
                     onClick={closeOfferModal}
                     className="touch-target w-full bg-mystic-800/50 border border-mystic-700/50 text-mystic-300 rounded-lg hover:bg-mystic-700/50 transition-colors animate-optimized"
                   >
                     Maybe Later
                   </button>
                 </div>

                 {/* Urgency Message */}
                 <div className="mt-4 text-center">
                   <p className="text-xs text-mystic-400">
                     ⏰ This offer expires when you leave this page
                   </p>
                 </div>
               </motion.div>
             </motion.div>
           )}
         </AnimatePresence>
       </div>
     </>
     )
   }

  return (
    <>
      <SEO 
        title="Free Bazi Reading Report | Professional Chinese Numerology Analysis"
        description="Get your free personalized Bazi reading report with detailed analysis of wealth, love, health, and life path. Professional Chinese numerology expert analysis."
        keywords="free bazi reading report, bazi chart analysis, chinese numerology report, bazi wealth analysis, bazi love compatibility, bazi health reading, personalized bazi reading"
        canonical={`${window.location.origin}/free-bazi-report`}
        ogImage={`${window.location.origin}/images/bazi-reading.jpg`}
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "headline": "Free Bazi Reading Report",
          "description": "Get your free personalized Bazi reading report with detailed analysis",
          "url": `${window.location.origin}/free-bazi-report`
        }}
      />
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-gold-500 to-yellow-500 mb-4 sm:mb-6">
            <Star className="h-8 w-8 sm:h-10 sm:w-10 text-white" aria-hidden="true" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-bold mb-3 sm:mb-4 text-white tracking-wide">
            Free Bazi Reading Report
          </h1>
          <p className="text-lg sm:text-xl text-mystic-300">
            Enter your birth information to get your personalized Bazi analysis instantly
          </p>
          
          {/* SEO Content Section */}
          <div className="mt-6 text-center">
            <p className="text-sm text-mystic-400 mb-2">
              Discover your destiny through ancient Chinese numerology with our free Bazi reading report
            </p>
            <p className="text-sm text-mystic-400">
              Professional BaZi chart analysis for wealth, love, health, and life path guidance
            </p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mystic-card p-6 sm:p-8"
        >
          <form onSubmit={generateBaziReport} className="space-y-4 sm:space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-mystic-200 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                className="form-input w-full bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white placeholder-mystic-400 focus:border-gold-500/50 focus:outline-none transition-colors"
                placeholder="Enter your full name"
                autoComplete="name"
              />
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-mystic-200 mb-2">
                Gender *
              </label>
              <select
                id="gender"
                name="gender"
                required
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white focus:border-gold-500/50 focus:outline-none transition-colors text-base"
              >
                <option value="">Select your gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

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
                className="w-full px-3 sm:px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white focus:border-gold-500/50 focus:outline-none transition-colors text-base"
              />
            </div>

            {/* Time of Birth */}
            <div>
              <label htmlFor="timeOfBirth" className="block text-sm font-medium text-mystic-200 mb-2">
                Time of Birth *
              </label>
              <input
                type="time"
                id="timeOfBirth"
                name="timeOfBirth"
                required
                value={formData.timeOfBirth}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white focus:border-gold-500/50 focus:outline-none transition-colors text-base"
              />
            </div>

            {/* Birth Location */}
            <div>
              <label htmlFor="birthLocation" className="block text-sm font-medium text-mystic-200 mb-2">
                Birth Location *
              </label>
              <input
                type="text"
                id="birthLocation"
                name="birthLocation"
                required
                value={formData.birthLocation}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white placeholder-mystic-400 focus:border-gold-500/50 focus:outline-none transition-colors text-base"
                placeholder="City, Country (e.g., New York, USA)"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full group inline-flex items-center justify-center space-x-2 sm:space-x-3 bg-gradient-to-r from-gold-500 to-yellow-500 text-black font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-gold-500/25 disabled:opacity-50 disabled:cursor-not-allowed text-base"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-black"></div>
                    <span>Generating Your Report...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 group-hover:animate-pulse" />
                    <span>Generate Free Report</span>
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* FAQ Section for SEO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mystic-card p-6 sm:p-8 mt-8"
        >
          <h2 className="text-xl sm:text-2xl font-cinzel font-bold mb-6 text-gold-400">
            Frequently Asked Questions About BaZi Reading Reports
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                What is a BaZi reading report?
              </h3>
              <p className="text-mystic-300 text-sm leading-relaxed">
                A BaZi reading report is a comprehensive analysis of your birth chart based on ancient Chinese numerology. It reveals your elemental balance, personality traits, and life patterns to help you understand your destiny and make better life decisions.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                How accurate is this free BaZi chart analysis?
              </h3>
              <p className="text-mystic-300 text-sm leading-relaxed">
                Our free BaZi reading report provides accurate analysis based on traditional Chinese numerology principles. The accuracy depends on the precision of your birth information, especially the exact time of birth. For the most accurate results, provide the most precise birth time available.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                What information do I need for a BaZi reading report?
              </h3>
              <p className="text-mystic-300 text-sm leading-relaxed">
                You need your full name, gender, exact date of birth, time of birth (as precise as possible), and birth location. The more accurate your birth time, the more precise your BaZi chart analysis will be.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                How long does it take to generate my BaZi reading report?
              </h3>
              <p className="text-mystic-300 text-sm leading-relaxed">
                Your personalized BaZi reading report is generated instantly after you submit your birth information. The analysis includes wealth patterns, love compatibility, health insights, and life path guidance based on your unique birth chart.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Is this Chinese numerology report really free?
              </h3>
              <p className="text-mystic-300 text-sm leading-relaxed">
                Yes, our basic BaZi reading report is completely free. We provide comprehensive analysis including your BaZi chart, five elements analysis, and personalized insights for wealth, love, and health. We also offer premium detailed readings for those seeking deeper analysis.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Related Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mystic-card p-6 sm:p-8 mt-6"
        >
          <h2 className="text-xl sm:text-2xl font-cinzel font-bold mb-6 text-gold-400">
            Explore More Chinese Numerology Services
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/services"
              className="p-4 bg-mystic-800/50 border border-mystic-700/50 rounded-lg hover:border-gold-500/50 transition-colors group"
            >
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gold-400">
                Professional BaZi Consultation
              </h3>
              <p className="text-mystic-300 text-sm">
                Get detailed one-on-one consultation with our expert Chinese numerology master
              </p>
            </Link>
            
            <Link
              to="/wealth-sign"
              className="p-4 bg-mystic-800/50 border border-mystic-700/50 rounded-lg hover:border-gold-500/50 transition-colors group"
            >
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gold-400">
                Ancient Chinese Wisdom Oracle
              </h3>
              <p className="text-mystic-300 text-sm">
                Experience our sacred oracle tool for daily guidance and wisdom
              </p>
            </Link>
          </div>
        </motion.div>

          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 text-mystic-300 hover:text-gold-400 transition-colors"
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

export default FreeBaziReport 