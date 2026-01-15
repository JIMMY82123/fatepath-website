import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Search, Filter, Calendar, MapPin, Briefcase, Star } from 'lucide-react'
import SEO from '../components/SEO'

const CelebritiesBornToday = () => {
  const { t } = useTranslation()
  const [celebrities, setCelebrities] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOccupation, setSelectedOccupation] = useState('Any')
  const [selectedNationality, setSelectedNationality] = useState('Any')
  const [selectedGender, setSelectedGender] = useState('Any')
  const [sortBy, setSortBy] = useState('Popularity')

  useEffect(() => {
    const loadCelebrities = async () => {
      try {
        const response = await fetch('/datasets/celebrities.json')
        const data = await response.json()
        setCelebrities(data.celebrities || [])
        setLoading(false)
      } catch (error) {
        console.error('Error loading celebrities:', error)
        setLoading(false)
      }
    }
    loadCelebrities()
  }, [])

  // Get today's date
  const today = new Date()
  const todayMonth = today.getMonth() + 1
  const todayDay = today.getDate()

  // Get tomorrow's date
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const tomorrowMonth = tomorrow.getMonth() + 1
  const tomorrowDay = tomorrow.getDate()

  // Get next few days
  const getNextDays = (count) => {
    const days = []
    for (let i = 2; i <= count + 1; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() + i)
      days.push({
        month: date.getMonth() + 1,
        day: date.getDate(),
        date: date
      })
    }
    return days
  }

  const nextDays = getNextDays(2)

  // Filter and categorize celebrities
  const categorizedCelebrities = useMemo(() => {
    const todayList = []
    const tomorrowList = []
    const upcomingList = []

    celebrities.forEach(celeb => {
      if (!celeb.birthDate) return
      
      const [year, month, day] = celeb.birthDate.split('-').map(Number)
      const birthMonth = month
      const birthDay = day

      // Check if matches today
      if (birthMonth === todayMonth && birthDay === todayDay) {
        todayList.push(celeb)
      }
      // Check if matches tomorrow
      else if (birthMonth === tomorrowMonth && birthDay === tomorrowDay) {
        tomorrowList.push(celeb)
      }
      // Check if matches upcoming days
      else {
        nextDays.forEach(dayInfo => {
          if (birthMonth === dayInfo.month && birthDay === dayInfo.day) {
            upcomingList.push({ ...celeb, upcomingDate: dayInfo })
          }
        })
      }
    })

    return { todayList, tomorrowList, upcomingList }
  }, [celebrities, todayMonth, todayDay, tomorrowMonth, tomorrowDay])

  // Get unique occupations and nationalities
  const occupations = useMemo(() => {
    const allOccupations = new Set()
    celebrities.forEach(celeb => {
      if (celeb.occupation) {
        celeb.occupation.forEach(occ => allOccupations.add(occ))
      }
    })
    return Array.from(allOccupations).sort()
  }, [celebrities])

  const nationalities = useMemo(() => {
    const allNationalities = new Set()
    celebrities.forEach(celeb => {
      if (celeb.nationality) {
        allNationalities.add(celeb.nationality)
      }
    })
    return Array.from(allNationalities).sort()
  }, [celebrities])

  // Filter function
  const filterCelebrities = (list) => {
    return list.filter(celeb => {
      // Search term
      if (searchTerm && !celeb.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false
      }

      // Occupation
      if (selectedOccupation !== 'Any') {
        if (!celeb.occupation || !celeb.occupation.includes(selectedOccupation)) {
          return false
        }
      }

      // Nationality
      if (selectedNationality !== 'Any') {
        if (celeb.nationality !== selectedNationality) {
          return false
        }
      }

      // Gender
      if (selectedGender !== 'Any') {
        if (celeb.gender !== selectedGender) {
          return false
        }
      }

      return true
    }).sort((a, b) => {
      if (sortBy === 'Popularity') {
        return (b.popularity || 0) - (a.popularity || 0)
      } else if (sortBy === 'Name') {
        return a.name.localeCompare(b.name)
      } else if (sortBy === 'Birth Year') {
        const yearA = parseInt(a.birthDate?.split('-')[0] || 0)
        const yearB = parseInt(b.birthDate?.split('-')[0] || 0)
        return yearB - yearA
      }
      return 0
    })
  }

  const filteredToday = filterCelebrities(categorizedCelebrities.todayList)
  const filteredTomorrow = filterCelebrities(categorizedCelebrities.tomorrowList)
  const filteredUpcoming = filterCelebrities(categorizedCelebrities.upcomingList)

  // Calculate age
  const calculateAge = (birthDate) => {
    if (!birthDate) return null
    const [year] = birthDate.split('-').map(Number)
    const currentYear = new Date().getFullYear()
    const age = currentYear - year
    return age > 0 ? `${age} ${t('celebrities.yearsAgo')}` : `${Math.abs(age)} ${t('celebrities.yearsFromNow', 'years from now')}`
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return ''
    const [year, month, day] = dateString.split('-')
    const date = new Date(year, month - 1, day)
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return `${monthNames[date.getMonth()]} ${day}, ${year}`
  }

  // Get country flag emoji (simplified)
  const getCountryFlag = (nationality) => {
    const flags = {
      'US': '🇺🇸',
      'GB': '🇬🇧',
      'CA': '🇨🇦',
      'FR': '🇫🇷',
      'DE': '🇩🇪',
      'IT': '🇮🇹',
      'ES': '🇪🇸',
      'AU': '🇦🇺',
      'JP': '🇯🇵',
      'CN': '🇨🇳',
      'RU': '🇷🇺',
      'IE': '🇮🇪',
      'NL': '🇳🇱',
      'CU': '🇨🇺',
      'CZ': '🇨🇿'
    }
    return flags[nationality] || '🌍'
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Famous People Born Today | BaZi Analysis",
    "description": "Discover famous people born today with their BaZi (Four Pillars) analysis. Explore celebrities' birth charts and Chinese astrology insights.",
    "url": "https://fatepath.me/celebrities-born-today"
  }

  if (loading) {
    return (
      <>
        <SEO 
          title="Famous People Born Today | BaZi Analysis | FatePath"
          description="Discover famous people born today with their BaZi (Four Pillars) analysis. Explore celebrities' birth charts and Chinese astrology insights."
          keywords="famous people born today, celebrities born today, bazi analysis, chinese astrology, four pillars, celebrity birth chart"
          canonical="https://fatepath.me/celebrities-born-today"
          structuredData={structuredData}
        />
        <div className="min-h-screen bg-mystic-900 pt-20 flex items-center justify-center">
          <div className="text-white">Loading celebrities...</div>
        </div>
      </>
    )
  }

  return (
    <>
      <SEO 
        title="Famous People Born Today | BaZi Analysis | FatePath"
        description="Discover famous people born today with their BaZi (Four Pillars) analysis. Explore celebrities' birth charts and Chinese astrology insights."
        keywords="famous people born today, celebrities born today, bazi analysis, chinese astrology, four pillars, celebrity birth chart"
        canonical="https://fatepath.me/celebrities-born-today"
        structuredData={structuredData}
      />

      <main className="min-h-screen bg-mystic-900 pt-20 pb-20">
        {/* Header */}
        <section className="py-12 px-4 bg-gradient-to-br from-mystic-800 to-mystic-900">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 text-mystic-400 text-sm mb-4">
                <Link to="/" className="hover:text-gold-400 transition-colors">Home</Link>
                <span>/</span>
                <Link to="/celebrities-born-today" className="hover:text-gold-400 transition-colors">Famous People</Link>
                <span>/</span>
                <span className="text-mystic-300">Famous People Born Today</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Famous People Born Today
              </h1>
              <p className="text-lg text-mystic-300">
                Discover celebrities and historical figures born on this date, with BaZi (Four Pillars) analysis insights
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 px-4 bg-mystic-900 border-b border-mystic-700">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-mystic-800 rounded-lg p-6 border border-mystic-700"
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {/* Search */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-mystic-300 mb-2">
                    <Search className="h-4 w-4 inline mr-2" />
                    Seek: Celebrity Name
                  </label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter celebrity name..."
                    className="w-full px-4 py-2 bg-mystic-900 border border-mystic-700 rounded-lg text-white placeholder-mystic-500 focus:outline-none focus:border-gold-400"
                  />
                </div>

                {/* Occupation */}
                <div>
                  <label className="block text-sm font-medium text-mystic-300 mb-2">
                    <Briefcase className="h-4 w-4 inline mr-2" />
                    {t('celebrities.occupation')}
                  </label>
                  <select
                    value={selectedOccupation}
                    onChange={(e) => setSelectedOccupation(e.target.value)}
                    className="w-full px-4 py-2 bg-mystic-900 border border-mystic-700 rounded-lg text-white focus:outline-none focus:border-gold-400"
                  >
                    <option value="Any">{t('common.any')}</option>
                    {occupations.map(occ => (
                      <option key={occ} value={occ}>{occ}</option>
                    ))}
                  </select>
                </div>

                {/* Nationality */}
                <div>
                  <label className="block text-sm font-medium text-mystic-300 mb-2">
                    <MapPin className="h-4 w-4 inline mr-2" />
                    {t('celebrities.nationality')}
                  </label>
                  <select
                    value={selectedNationality}
                    onChange={(e) => setSelectedNationality(e.target.value)}
                    className="w-full px-4 py-2 bg-mystic-900 border border-mystic-700 rounded-lg text-white focus:outline-none focus:border-gold-400"
                  >
                    <option value="Any">{t('common.any')}</option>
                    {nationalities.map(nat => (
                      <option key={nat} value={nat}>{nat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-mystic-300 mb-2">
                    Gender
                  </label>
                  <select
                    value={selectedGender}
                    onChange={(e) => setSelectedGender(e.target.value)}
                    className="w-full px-4 py-2 bg-mystic-900 border border-mystic-700 rounded-lg text-white focus:outline-none focus:border-gold-400"
                  >
                    <option value="Any">Any</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-mystic-300 mb-2">
                    Sort by
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-2 bg-mystic-900 border border-mystic-700 rounded-lg text-white focus:outline-none focus:border-gold-400"
                  >
                    <option value="Popularity">Popularity</option>
                    <option value="Name">Name</option>
                    <option value="Birth Year">Birth Year</option>
                  </select>
                </div>

                {/* CTA to Free Bazi Report */}
                <div className="flex items-end">
                  <Link
                    to="/free-bazi-report"
                    className="w-full bg-gradient-to-r from-gold-400 to-yellow-500 text-mystic-900 px-6 py-2 rounded-lg font-bold text-center hover:from-gold-500 hover:to-yellow-600 transition-all duration-300"
                  >
                    Get Your Free Bazi Chart
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Today's Celebrities */}
        <section className="py-12 px-4 bg-mystic-900">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                <Calendar className="h-6 w-6 text-gold-400" />
                Famous celebrities born on {formatDate(`${new Date().getFullYear()}-${String(todayMonth).padStart(2, '0')}-${String(todayDay).padStart(2, '0')}`).split(',')[0]} (Today)
              </h2>
              
              {filteredToday.length === 0 ? (
                <div className="bg-mystic-800 rounded-lg p-8 border border-mystic-700 text-center">
                  <p className="text-mystic-400">No celebrities found for today matching your filters.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredToday.map((celeb) => (
                    <motion.div
                      key={celeb.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ x: 5 }}
                      className="bg-mystic-800 rounded-lg p-4 border border-mystic-700 hover:border-gold-400/50 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="text-2xl">{getCountryFlag(celeb.nationality)}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-bold text-white">
                                {celeb.name}
                              </h3>
                              {celeb.birthDate && (
                                <span className="text-mystic-400 text-sm">
                                  (*{celeb.birthDate.split('-')[0]})
                                </span>
                              )}
                              {celeb.popularity && (
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 text-gold-400 fill-gold-400" />
                                  <span className="text-sm text-gold-400">{celeb.popularity}</span>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-mystic-400">
                              {celeb.birthDate && (
                                <span>{calculateAge(celeb.birthDate)}</span>
                              )}
                              {celeb.occupation && (
                                <span>{celeb.occupation.join(', ')}</span>
                              )}
                              {celeb.bazi && (
                                <span className="text-gold-400">
                                  Day Master: {celeb.bazi.dayMaster}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Tomorrow's Celebrities */}
        {filteredTomorrow.length > 0 && (
          <section className="py-12 px-4 bg-mystic-900 border-t border-mystic-700">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-gold-400" />
                  {t('celebrities.bornOn')} {formatDate(`${new Date().getFullYear()}-${String(tomorrowMonth).padStart(2, '0')}-${String(tomorrowDay).padStart(2, '0')}`).split(',')[0]} ({t('celebrities.tomorrow')})
                </h2>
                
                <div className="space-y-3">
                  {filteredTomorrow.map((celeb) => (
                    <motion.div
                      key={celeb.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ x: 5 }}
                      className="bg-mystic-800 rounded-lg p-4 border border-mystic-700 hover:border-gold-400/50 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="text-2xl">{getCountryFlag(celeb.nationality)}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-bold text-white">
                                {celeb.name}
                              </h3>
                              {celeb.birthDate && (
                                <span className="text-mystic-400 text-sm">
                                  (*{celeb.birthDate.split('-')[0]})
                                </span>
                              )}
                              {celeb.popularity && (
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 text-gold-400 fill-gold-400" />
                                  <span className="text-sm text-gold-400">{celeb.popularity}</span>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-mystic-400">
                              {celeb.birthDate && (
                                <span>{calculateAge(celeb.birthDate)}</span>
                              )}
                              {celeb.occupation && (
                                <span>{celeb.occupation.join(', ')}</span>
                              )}
                              {celeb.bazi && (
                                <span className="text-gold-400">
                                  Day Master: {celeb.bazi.dayMaster}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Upcoming Days */}
        {filteredUpcoming.length > 0 && (
          <section className="py-12 px-4 bg-mystic-900 border-t border-mystic-700">
            <div className="max-w-7xl mx-auto">
              {nextDays.map((dayInfo, dayIndex) => {
                const dayCelebs = filteredUpcoming.filter(c => 
                  c.upcomingDate?.month === dayInfo.month && 
                  c.upcomingDate?.day === dayInfo.day
                )
                
                if (dayCelebs.length === 0) return null

                return (
                  <motion.div
                    key={dayIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + dayIndex * 0.1 }}
                    className="mb-12"
                  >
                    <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                      <Calendar className="h-6 w-6 text-gold-400" />
                      Famous celebrities born on {formatDate(`${new Date().getFullYear()}-${String(dayInfo.month).padStart(2, '0')}-${String(dayInfo.day).padStart(2, '0')}`).split(',')[0]}
                    </h2>
                    
                    <div className="space-y-3">
                      {dayCelebs.map((celeb) => (
                        <motion.div
                          key={celeb.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          whileHover={{ x: 5 }}
                          className="bg-mystic-800 rounded-lg p-4 border border-mystic-700 hover:border-gold-400/50 transition-all duration-300"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 flex-1">
                              <div className="text-2xl">{getCountryFlag(celeb.nationality)}</div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="text-lg font-bold text-white">
                                    {celeb.name}
                                  </h3>
                                  {celeb.birthDate && (
                                    <span className="text-mystic-400 text-sm">
                                      (*{celeb.birthDate.split('-')[0]})
                                    </span>
                                  )}
                                  {celeb.popularity && (
                                    <div className="flex items-center gap-1">
                                      <Star className="h-4 w-4 text-gold-400 fill-gold-400" />
                                      <span className="text-sm text-gold-400">{celeb.popularity}</span>
                                    </div>
                                  )}
                                </div>
                                <div className="flex items-center gap-4 text-sm text-mystic-400">
                                  {celeb.birthDate && (
                                    <span>{calculateAge(celeb.birthDate)}</span>
                                  )}
                                  {celeb.occupation && (
                                    <span>{celeb.occupation.join(', ')}</span>
                                  )}
                                  {celeb.bazi && (
                                    <span className="text-gold-400">
                                      Day Master: {celeb.bazi.dayMaster}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-mystic-800 to-mystic-900">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Discover Your Own BaZi Chart
              </h2>
              <p className="text-lg text-mystic-300 mb-8">
                Just like these famous people, discover your destiny through BaZi (Four Pillars) analysis
              </p>
              <Link
                to="/free-bazi-report"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-400 to-yellow-500 text-mystic-900 px-8 py-4 rounded-lg font-bold text-lg hover:from-gold-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-gold-400/30"
              >
                Get Your Free Bazi Chart Now
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}

export default CelebritiesBornToday
