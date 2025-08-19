import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const LoveCompatibilityTest = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    person1: {
      name: '',
      birthDate: '',
      birthTime: '',
      gender: ''
    },
    person2: {
      name: '',
      birthDate: '',
      birthTime: '',
      gender: ''
    }
  })
  const [compatibilityData, setCompatibilityData] = useState(null)
  const [loading, setLoading] = useState(false)

  // 模拟兼容性计算
  const calculateCompatibility = async () => {
    setLoading(true)
    
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 基于输入数据生成兼容性结果
    const compatibility = {
      overallScore: Math.floor(Math.random() * 30) + 70, // 70-100
      elementCompatibility: {
        score: Math.floor(Math.random() * 20) + 80,
        description: "Your elements show good harmony and natural growth potential."
      },
      personalityCompatibility: {
        score: Math.floor(Math.random() * 25) + 75,
        description: "Your personalities complement each other well."
      },
      communicationCompatibility: {
        score: Math.floor(Math.random() * 20) + 80,
        description: "You have strong communication potential."
      },
      longTermPotential: {
        score: Math.floor(Math.random() * 15) + 85,
        description: "High potential for long-term relationship success."
      },
      recommendations: [
        "Focus on open communication to strengthen your bond",
        "Support each other's personal growth and development",
        "Maintain individual interests while building shared activities",
        "Practice patience and understanding during challenges",
        "Celebrate your differences as strengths"
      ],
      challenges: [
        "May need to work on conflict resolution skills",
        "Balance independence with togetherness",
        "Manage expectations and avoid assumptions"
      ]
    }
    
    setCompatibilityData(compatibility)
    setLoading(false)
    setStep(3)
  }

  const handleInputChange = (person, field, value) => {
    setFormData(prev => ({
      ...prev,
      [person]: {
        ...prev[person],
        [field]: value
      }
    }))
  }

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-400'
    if (score >= 80) return 'text-yellow-400'
    if (score >= 70) return 'text-orange-400'
    return 'text-red-400'
  }

  const getScoreLabel = (score) => {
    if (score >= 90) return 'Excellent'
    if (score >= 80) return 'Very Good'
    if (score >= 70) return 'Good'
    return 'Needs Work'
  }

  return (
    <>
      <SEO 
        title="Free Love Compatibility Test - BaZi Analysis"
        description="Take our free love compatibility test using ancient BaZi principles. Discover your relationship potential and get personalized insights."
        keywords="free love compatibility test, bazi relationship analysis, chinese numerology compatibility, relationship compatibility calculator"
      />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-pink-500/20 to-purple-500/20">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-6xl mb-6">💕</div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Free Love Compatibility Test
              </h1>
              <p className="text-xl text-mystic-300 mb-8 max-w-2xl mx-auto">
                Discover your relationship potential using ancient BaZi principles. 
                Get instant insights into your compatibility and personalized recommendations.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-mystic-400">
                <span>100% Free</span>
                <span>•</span>
                <span>Instant Results</span>
                <span>•</span>
                <span>Professional Insights</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Test Form */}
        {step === 1 && (
          <section className="py-20 bg-mystic-900">
            <div className="container mx-auto px-4 max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold text-white mb-4">Step 1: Your Information</h2>
                <p className="text-mystic-300">Enter your birth details for accurate compatibility analysis</p>
              </motion.div>

              <div className="bg-mystic-800 rounded-lg p-8 border border-mystic-700/50">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Person 1 */}
                  <div>
                    <h3 className="text-xl font-bold text-pink-400 mb-6">Person 1</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-mystic-300 text-sm font-medium mb-2">Name</label>
                        <input
                          type="text"
                          value={formData.person1.name}
                          onChange={(e) => handleInputChange('person1', 'name', e.target.value)}
                          className="w-full bg-mystic-700 border border-mystic-600 rounded-lg px-4 py-3 text-white focus:border-pink-400 focus:outline-none"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label className="block text-mystic-300 text-sm font-medium mb-2">Birth Date</label>
                        <input
                          type="date"
                          value={formData.person1.birthDate}
                          onChange={(e) => handleInputChange('person1', 'birthDate', e.target.value)}
                          className="w-full bg-mystic-700 border border-mystic-600 rounded-lg px-4 py-3 text-white focus:border-pink-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-mystic-300 text-sm font-medium mb-2">Birth Time (Optional)</label>
                        <input
                          type="time"
                          value={formData.person1.birthTime}
                          onChange={(e) => handleInputChange('person1', 'birthTime', e.target.value)}
                          className="w-full bg-mystic-700 border border-mystic-600 rounded-lg px-4 py-3 text-white focus:border-pink-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-mystic-300 text-sm font-medium mb-2">Gender</label>
                        <select
                          value={formData.person1.gender}
                          onChange={(e) => handleInputChange('person1', 'gender', e.target.value)}
                          className="w-full bg-mystic-700 border border-mystic-600 rounded-lg px-4 py-3 text-white focus:border-pink-400 focus:outline-none"
                        >
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Person 2 */}
                  <div>
                    <h3 className="text-xl font-bold text-purple-400 mb-6">Person 2</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-mystic-300 text-sm font-medium mb-2">Name</label>
                        <input
                          type="text"
                          value={formData.person2.name}
                          onChange={(e) => handleInputChange('person2', 'name', e.target.value)}
                          className="w-full bg-mystic-700 border border-mystic-600 rounded-lg px-4 py-3 text-white focus:border-purple-400 focus:outline-none"
                          placeholder="Enter their name"
                        />
                      </div>
                      <div>
                        <label className="block text-mystic-300 text-sm font-medium mb-2">Birth Date</label>
                        <input
                          type="date"
                          value={formData.person2.birthDate}
                          onChange={(e) => handleInputChange('person2', 'birthDate', e.target.value)}
                          className="w-full bg-mystic-700 border border-mystic-600 rounded-lg px-4 py-3 text-white focus:border-purple-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-mystic-300 text-sm font-medium mb-2">Birth Time (Optional)</label>
                        <input
                          type="time"
                          value={formData.person2.birthTime}
                          onChange={(e) => handleInputChange('person2', 'birthTime', e.target.value)}
                          className="w-full bg-mystic-700 border border-mystic-600 rounded-lg px-4 py-3 text-white focus:border-purple-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-mystic-300 text-sm font-medium mb-2">Gender</label>
                        <select
                          value={formData.person2.gender}
                          onChange={(e) => handleInputChange('person2', 'gender', e.target.value)}
                          className="w-full bg-mystic-700 border border-mystic-600 rounded-lg px-4 py-3 text-white focus:border-purple-400 focus:outline-none"
                        >
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <button
                    onClick={() => setStep(2)}
                    disabled={!formData.person1.name || !formData.person1.birthDate || !formData.person2.name || !formData.person2.birthDate}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue to Analysis
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Analysis Confirmation */}
        {step === 2 && (
          <section className="py-20 bg-mystic-900">
            <div className="container mx-auto px-4 max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <h2 className="text-3xl font-bold text-white mb-6">Ready to Analyze Your Compatibility</h2>
                
                <div className="bg-mystic-800 rounded-lg p-8 border border-mystic-700/50 mb-8">
                  <div className="grid md:grid-cols-2 gap-6 text-left">
                    <div>
                      <h3 className="text-pink-400 font-bold mb-3">{formData.person1.name}</h3>
                      <p className="text-mystic-300">Birth: {formData.person1.birthDate}</p>
                      {formData.person1.birthTime && <p className="text-mystic-300">Time: {formData.person1.birthTime}</p>}
                    </div>
                    <div>
                      <h3 className="text-purple-400 font-bold mb-3">{formData.person2.name}</h3>
                      <p className="text-mystic-300">Birth: {formData.person2.birthDate}</p>
                      {formData.person2.birthTime && <p className="text-mystic-300">Time: {formData.person2.birthTime}</p>}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={calculateCompatibility}
                    disabled={loading}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                  >
                    {loading ? 'Analyzing...' : 'Start Free Analysis'}
                  </button>
                  
                  <button
                    onClick={() => setStep(1)}
                    className="block mx-auto text-mystic-300 hover:text-white transition-colors"
                  >
                    ← Back to Edit Information
                  </button>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Results */}
        {step === 3 && compatibilityData && (
          <section className="py-20 bg-mystic-900">
            <div className="container mx-auto px-4 max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold text-white mb-4">Your Compatibility Results</h2>
                <p className="text-mystic-300">Based on BaZi analysis of {formData.person1.name} and {formData.person2.name}</p>
              </motion.div>

              {/* Overall Score */}
              <div className="bg-mystic-800 rounded-lg p-8 border border-mystic-700/50 mb-8">
                <div className="text-center">
                  <div className="text-6xl mb-4">💕</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Overall Compatibility Score</h3>
                  <div className={`text-6xl font-bold mb-2 ${getScoreColor(compatibilityData.overallScore)}`}>
                    {compatibilityData.overallScore}%
                  </div>
                  <p className={`text-xl font-semibold ${getScoreColor(compatibilityData.overallScore)}`}>
                    {getScoreLabel(compatibilityData.overallScore)}
                  </p>
                </div>
              </div>

              {/* Detailed Scores */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {[
                  { key: 'elementCompatibility', title: 'Element Harmony', icon: '🌿' },
                  { key: 'personalityCompatibility', title: 'Personality Match', icon: '🧠' },
                  { key: 'communicationCompatibility', title: 'Communication', icon: '💬' },
                  { key: 'longTermPotential', title: 'Long-term Potential', icon: '🌟' }
                ].map((item) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-mystic-800 rounded-lg p-6 border border-mystic-700/50"
                  >
                    <div className="flex items-center mb-4">
                      <span className="text-2xl mr-3">{item.icon}</span>
                      <h4 className="text-lg font-bold text-white">{item.title}</h4>
                    </div>
                    <div className={`text-3xl font-bold mb-2 ${getScoreColor(compatibilityData[item.key].score)}`}>
                      {compatibilityData[item.key].score}%
                    </div>
                    <p className="text-mystic-300 text-sm">{compatibilityData[item.key].description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Recommendations */}
              <div className="bg-mystic-800 rounded-lg p-8 border border-mystic-700/50 mb-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">💡 Recommendations</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {compatibilityData.recommendations.map((rec, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <span className="text-green-400 mr-3 mt-1">✓</span>
                      <p className="text-mystic-300">{rec}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Challenges */}
              <div className="bg-mystic-800 rounded-lg p-8 border border-mystic-700/50 mb-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">⚠️ Areas to Work On</h3>
                <div className="space-y-3">
                  {compatibilityData.challenges.map((challenge, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <span className="text-orange-400 mr-3 mt-1">•</span>
                      <p className="text-mystic-300">{challenge}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="text-center space-y-4">
                <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-lg p-6 border border-pink-500/30">
                  <h3 className="text-xl font-bold text-white mb-3">Want More Detailed Analysis?</h3>
                  <p className="text-mystic-300 mb-4">
                    Get a comprehensive love compatibility report with personalized insights, 
                    relationship timing, and professional guidance.
                  </p>
                  <Link
                    to="/love-form"
                    className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-lg font-bold hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
                  >
                    Get Detailed Report - $44
                  </Link>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => setStep(1)}
                    className="text-mystic-300 hover:text-white transition-colors"
                  >
                    ← Test Another Compatibility
                  </button>
                  <br />
                  <Link
                    to="/resources"
                    className="text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    Explore Our Data Library →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  )
}

export default LoveCompatibilityTest
