import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Heart, Briefcase, Shield, Zap, Users, Target, Lightbulb } from 'lucide-react'
import { dayMasterAnalysis, getDayMasterById } from '../data/dayMasterAnalysis'

const DayMasterAnalysis = () => {
  const [selectedDayMaster, setSelectedDayMaster] = useState(0)
  const [activeTab, setActiveTab] = useState('personality')

  const nextDayMaster = () => {
    setSelectedDayMaster((prev) => (prev + 1) % dayMasterAnalysis.length)
  }

  const prevDayMaster = () => {
    setSelectedDayMaster((prev) => (prev - 1 + dayMasterAnalysis.length) % dayMasterAnalysis.length)
  }

  const goToDayMaster = (index) => {
    setSelectedDayMaster(index)
  }

  const currentDayMaster = dayMasterAnalysis[selectedDayMaster]

  const tabs = [
    { id: 'personality', label: 'Personality', icon: <Users className="h-4 w-4" /> },
    { id: 'career', label: 'Career', icon: <Briefcase className="h-4 w-4" /> },
    { id: 'relationships', label: 'Relationships', icon: <Heart className="h-4 w-4" /> },
    { id: 'health', label: 'Health', icon: <Shield className="h-4 w-4" /> },
    { id: 'fortune', label: 'Fortune', icon: <Zap className="h-4 w-4" /> },
    { id: 'deep', label: 'Deep Analysis', icon: <Target className="h-4 w-4" /> }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personality':
        return (
          <div className="space-y-6">
            <div className="bg-mystic-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gold-400 mb-4">Core Traits</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Strengths</h4>
                  <ul className="space-y-1">
                    {currentDayMaster.personality.strengths.map((strength, index) => (
                      <li key={index} className="text-mystic-300 flex items-center">
                        <Star className="h-4 w-4 text-gold-400 mr-2" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Areas for Growth</h4>
                  <ul className="space-y-1">
                    {currentDayMaster.personality.weaknesses.map((weakness, index) => (
                      <li key={index} className="text-mystic-300 flex items-center">
                        <Lightbulb className="h-4 w-4 text-amber-400 mr-2" />
                        {weakness}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-mystic-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gold-400 mb-4">Core Values</h3>
              <div className="flex flex-wrap gap-2">
                {currentDayMaster.personality.coreValues.map((value, index) => (
                  <span key={index} className="bg-gold-500/20 text-gold-300 px-3 py-1 rounded-full text-sm">
                    {value}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )

      case 'career':
        return (
          <div className="space-y-6">
            <div className="bg-mystic-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gold-400 mb-4">Ideal Professions</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {currentDayMaster.career.idealProfessions.map((profession, index) => (
                  <div key={index} className="bg-mystic-700 p-3 rounded-lg flex items-center">
                    <Briefcase className="h-5 w-5 text-gold-400 mr-3" />
                    <span className="text-mystic-300">{profession}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-mystic-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gold-400 mb-4">Career Guidance</h3>
              <p className="text-mystic-300 mb-4">{currentDayMaster.career.workStyle}</p>
              <p className="text-gold-300 font-semibold">{currentDayMaster.career.careerAdvice}</p>
            </div>
          </div>
        )

      case 'relationships':
        return (
          <div className="space-y-6">
            <div className="bg-mystic-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gold-400 mb-4">Compatibility</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold text-green-400 mb-2">Best Matches</h4>
                  <ul className="space-y-1">
                    {currentDayMaster.relationships.compatibility.best.map((match, index) => (
                      <li key={index} className="text-mystic-300 text-sm">{match}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-400 mb-2">Good Matches</h4>
                  <ul className="space-y-1">
                    {currentDayMaster.relationships.compatibility.good.map((match, index) => (
                      <li key={index} className="text-mystic-300 text-sm">{match}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-400 mb-2">Challenging</h4>
                  <ul className="space-y-1">
                    {currentDayMaster.relationships.compatibility.challenging.map((match, index) => (
                      <li key={index} className="text-mystic-300 text-sm">{match}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-mystic-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gold-400 mb-4">Relationship Style</h3>
              <p className="text-mystic-300 mb-4">{currentDayMaster.relationships.relationshipStyle}</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Friendship</h4>
                  <p className="text-mystic-300 text-sm">{currentDayMaster.relationships.friendship}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Family</h4>
                  <p className="text-mystic-300 text-sm">{currentDayMaster.relationships.family}</p>
                </div>
              </div>
            </div>
          </div>
        )

      case 'health':
        return (
          <div className="space-y-6">
            <div className="bg-mystic-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gold-400 mb-4">Health Profile</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-400 mb-2">Strengths</h4>
                  <p className="text-mystic-300 text-sm">{currentDayMaster.health.strengths}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-red-400 mb-2">Areas to Watch</h4>
                  <p className="text-mystic-300 text-sm">{currentDayMaster.health.weaknesses}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-mystic-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gold-400 mb-4">Health Recommendations</h3>
              <ul className="space-y-2">
                {currentDayMaster.health.recommendations.map((rec, index) => (
                  <li key={index} className="text-mystic-300 flex items-center">
                    <Shield className="h-4 w-4 text-gold-400 mr-2" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-mystic-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gold-400 mb-4">Lucky Elements</h3>
              <div className="flex flex-wrap gap-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Colors</h4>
                  <div className="flex gap-2">
                    {currentDayMaster.health.luckyColors.map((color, index) => (
                      <span key={index} className="bg-mystic-700 text-mystic-300 px-3 py-1 rounded-full text-sm">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Numbers</h4>
                  <div className="flex gap-2">
                    {currentDayMaster.health.luckyNumbers.map((number, index) => (
                      <span key={index} className="bg-gold-500/20 text-gold-300 px-3 py-1 rounded-full text-sm">
                        {number}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'fortune':
        return (
          <div className="space-y-6">
            <div className="bg-mystic-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gold-400 mb-4">Elemental Guidance</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-400 mb-2">Lucky Elements</h4>
                  <ul className="space-y-1">
                    {currentDayMaster.fortune.luckyElements.map((element, index) => (
                      <li key={index} className="text-mystic-300 text-sm">{element}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-400 mb-2">Challenging Elements</h4>
                  <ul className="space-y-1">
                    {currentDayMaster.fortune.challengingElements.map((element, index) => (
                      <li key={index} className="text-mystic-300 text-sm">{element}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-mystic-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gold-400 mb-4">Seasonal Guidance</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-400 mb-2">Lucky Seasons</h4>
                  <div className="flex gap-2">
                    {currentDayMaster.fortune.luckySeasons.map((season, index) => (
                      <span key={index} className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
                        {season}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-red-400 mb-2">Challenging Seasons</h4>
                  <div className="flex gap-2">
                    {currentDayMaster.fortune.challengingSeasons.map((season, index) => (
                      <span key={index} className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm">
                        {season}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-mystic-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gold-400 mb-4">Fortune Advice</h3>
              <p className="text-gold-300 font-semibold">{currentDayMaster.fortune.advice}</p>
            </div>
          </div>
        )

      case 'deep':
        return (
          <div className="space-y-6">
            <div className="bg-mystic-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gold-400 mb-4">Life Purpose</h3>
              <p className="text-mystic-300 text-lg">{currentDayMaster.deepAnalysis.lifePurpose}</p>
            </div>
            
            <div className="bg-mystic-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gold-400 mb-4">Spiritual Path</h3>
              <p className="text-mystic-300 text-lg">{currentDayMaster.deepAnalysis.spiritualPath}</p>
            </div>
            
            <div className="bg-mystic-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gold-400 mb-4">Karmic Lessons</h3>
              <p className="text-mystic-300 text-lg">{currentDayMaster.deepAnalysis.karmicLessons}</p>
            </div>
            
            <div className="bg-mystic-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gold-400 mb-4">Ultimate Goal</h3>
              <p className="text-gold-300 text-lg font-semibold">{currentDayMaster.deepAnalysis.ultimateGoal}</p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="py-16 bg-mystic-900">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-white mb-4">
            Day Master Analysis
          </h2>
          <p className="text-mystic-300 max-w-3xl mx-auto">
            Discover your core personality traits, career guidance, and life path through detailed analysis of your Day Master (日主) - the Heavenly Stem of your birth day.
          </p>
        </div>

        {/* Day Master Selector */}
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="bg-mystic-800 rounded-lg p-2 flex gap-2">
              <button
                onClick={prevDayMaster}
                className="p-2 hover:bg-mystic-700 rounded transition-colors"
              >
                <ChevronLeft className="h-5 w-5 text-mystic-300" />
              </button>
              
              <div className="flex items-center gap-4 px-4">
                <span className="text-4xl">{currentDayMaster.symbol}</span>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white">
                    {currentDayMaster.heavenlyStem} ({currentDayMaster.pinyin})
                  </h3>
                  <p className="text-gold-400">{currentDayMaster.element}</p>
                </div>
              </div>
              
              <button
                onClick={nextDayMaster}
                className="p-2 hover:bg-mystic-700 rounded transition-colors"
              >
                <ChevronRight className="h-5 w-5 text-mystic-300" />
              </button>
            </div>
          </div>

          {/* Day Master Grid */}
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {dayMasterAnalysis.map((dayMaster, index) => (
              <button
                key={dayMaster.id}
                onClick={() => goToDayMaster(index)}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  selectedDayMaster === index
                    ? 'bg-gold-500 text-white scale-110'
                    : 'bg-mystic-800 text-mystic-300 hover:bg-mystic-700'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">{dayMaster.symbol}</div>
                  <div className="text-xs font-semibold">{dayMaster.heavenlyStem}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gold-500 text-white'
                    : 'bg-mystic-800 text-mystic-300 hover:bg-mystic-700'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>

        {/* Famous People */}
        <div className="mt-12 bg-mystic-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gold-400 mb-4">Famous People with {currentDayMaster.element}</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {currentDayMaster.famousPeople.map((person, index) => (
              <div key={index} className="bg-mystic-700 p-4 rounded-lg">
                <p className="text-mystic-300 text-sm">{person}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DayMasterAnalysis
