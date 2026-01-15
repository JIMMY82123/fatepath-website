import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Heart, Shield, Star as StarIcon, Filter, Search, MessageCircle, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import SEO from '../components/SEO'
import { getCachedAIAvatar, generateAvatarUrls } from '../utils/aiAvatarGenerator'

const Testimonials = () => {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedService, setSelectedService] = useState('all')
  const [selectedRating, setSelectedRating] = useState('all')
  const [testimonialsWithAvatars, setTestimonialsWithAvatars] = useState([])
  const [activeTab, setActiveTab] = useState('personal') // 'personal' or 'reddit'
  const [selectedRedditReview, setSelectedRedditReview] = useState(null) // For modal

  // Reduced personal testimonials (from 12 to 8)
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, USA",
      rating: 5,
      service: "Full BaZi Reading",
      avatar: "/images/testimonials/sarah-johnson.jpg",
      content: "I was skeptical at first—how could ancient Chinese wisdom possibly understand my modern struggles? But when the report described my 'internal fire constantly battling water elements,' I felt seen for the first time. It explained why I'm passionate about my work but always feel emotionally drained. The career timing section was spot-on: it predicted I'd find my calling in Q2 2024, and here I am, running my own consulting firm. This isn't fortune-telling—it's self-discovery.",
      icon: <Star className="h-6 w-6" />,
      date: "2024-12-15"
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Los Angeles, USA",
      rating: 5,
      service: "Custom Talisman",
      avatar: "/images/testimonials/michael-chen.jpg",
      content: "Three words: life-changing experience. I was drowning in anxiety, couldn't sleep, and felt like my mind was a broken radio playing static 24/7. The talisman was crafted specifically for my 'excessive fire element'—whatever that means, but it works. Within 48 hours, I slept through the night. Within a week, my anxiety dropped from a 9/10 to a 3/10. My therapist was shocked. I'm not saying it's magic, but... it's definitely something powerful.",
      icon: <Shield className="h-6 w-6" />,
      date: "2024-12-10"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      location: "Miami, USA",
      rating: 5,
      service: "Relationship Reading",
      avatar: "/images/testimonials/emma-rodriguez.jpg",
      content: "After my third failed relationship in two years, I was ready to give up on love. The reading revealed I was a 'strong metal personality' attracting 'weak water partners'—basically, I was dating people who couldn't handle my intensity. The timing prediction was eerie: 'You'll meet your match when the seasons change.' I met Alex at a coffee shop during the first week of fall. We've been inseparable for six months. Sometimes the universe speaks through ancient wisdom.",
      icon: <Heart className="h-6 w-6" />,
      date: "2024-12-08"
    },
    {
      id: 4,
      name: "David Thompson",
      location: "London, UK",
      rating: 5,
      service: "Career Guidance Reading",
      content: "I was a miserable investment banker making six figures but hating every minute. The BaZi analysis called me a 'creative earth personality trapped in a metal cage.' It suggested I'd thrive in tech innovation, not traditional finance. The timing was perfect: 'Your breakthrough period starts in March 2024.' I quit my job in February, started coding bootcamp in March, and by June I had a job at a startup. I'm making less money but I'm actually happy. Priceless.",
      icon: <Star className="h-6 w-6" />,
      date: "2024-12-05"
    },
    {
      id: 5,
      name: "Lisa Wang",
      location: "Toronto, Canada",
      rating: 5,
      service: "Love Compatibility Reading",
      avatar: "/images/testimonials/lisa-wang.jpg",
      content: "My husband and I were on the brink of divorce. We couldn't communicate, fought constantly, and slept in separate rooms. The compatibility reading showed we're actually 'perfectly balanced elements'—he's water, I'm fire, and we complete each other. The problem? We were in a 'conflict period' that would last until October. We decided to wait it out, worked on ourselves, and by November we were back in love. We're now planning our second honeymoon. Sometimes timing is everything.",
      icon: <Heart className="h-6 w-6" />,
      date: "2024-12-03"
    },
    {
      id: 6,
      name: "James Wilson",
      location: "Sydney, Australia",
      rating: 5,
      service: "Custom Talisman",
      avatar: "/images/testimonials/james-wilson.jpg",
      content: "I'm a rational person—engineer by trade, skeptic by nature. But when traditional medicine failed to help my insomnia and anxiety, I was desperate enough to try anything. The talisman was designed for my 'unbalanced wood element.' I wore it for a week with zero expectations. By day 8, I was sleeping 7 hours straight. By week 3, my anxiety attacks stopped completely. My doctor couldn't explain it. I can't explain it either, but I'm not taking it off.",
      icon: <Shield className="h-6 w-6" />,
      date: "2024-11-28"
    },
    {
      id: 7,
      name: "Maria Garcia",
      location: "Madrid, Spain",
      rating: 5,
      service: "Full BaZi Reading",
      avatar: "/images/testimonials/maria-garcia.jpg",
      content: "I've always felt like I was meant for something bigger than my 9-to-5 job. The BaZi reading confirmed it: I have 'leadership fire' that's been suppressed by 'restrictive earth energy.' It predicted a 'transformation period' from 2024-2027. Armed with this knowledge, I started my own business in January. Six months later, I'm making more money than I ever did working for someone else. The reading didn't just predict my future—it gave me the courage to create it.",
      icon: <Star className="h-6 w-6" />,
      date: "2024-11-25"
    },
    {
      id: 8,
      name: "Alex Kim",
      location: "Seoul, South Korea",
      rating: 5,
      service: "Relationship Reading",
      avatar: "/images/testimonials/alex-kim.jpg",
      content: "I was in a toxic relationship for three years but couldn't see the red flags. The reading opened my eyes: I was repeating childhood patterns, attracting 'destructive fire' partners because I was used to chaos. It predicted I'd have the strength to leave in 'the month of water' (November). I ended it on November 15th. Six months later, I met someone with 'nurturing earth energy.' The difference is night and day. I finally understand what healthy love feels like.",
      icon: <Heart className="h-6 w-6" />,
      date: "2024-11-20"
    }
  ]

  // Reddit reviews data
  const redditReviews = [
    { id: 1, image: "/images/reddit-reviews/reddit-review-1.jpg" },
    { id: 2, image: "/images/reddit-reviews/reddit-review-2.jpg" },
    { id: 3, image: "/images/reddit-reviews/reddit-review-3.jpg" },
    { id: 4, image: "/images/reddit-reviews/reddit-review-4.jpg" },
    { id: 5, image: "/images/reddit-reviews/reddit-review-5.jpg" },
    { id: 6, image: "/images/reddit-reviews/reddit-review-6.jpg" },
    { id: 7, image: "/images/reddit-reviews/reddit-review-7.jpg" },
    { id: 8, image: "/images/reddit-reviews/reddit-review-8.jpg" },
    { id: 9, image: "/images/reddit-reviews/reddit-review-9.jpg" },
    { id: 10, image: "/images/reddit-reviews/reddit-review-10.jpg" }
  ]

  // 生成AI头像
  useEffect(() => {
    const testimonialsWithAI = generateAvatarUrls(testimonials)
    setTestimonialsWithAvatars(testimonialsWithAI)
  }, [])

  const services = useMemo(() => [
    { value: 'all', label: t('testimonials.services.all') },
    { value: 'Full BaZi Reading', label: t('testimonials.services.fullBazi') },
    { value: 'Career Guidance Reading', label: t('testimonials.services.career') },
    { value: 'Love Compatibility Reading', label: t('testimonials.services.love') },
    { value: 'Relationship Reading', label: t('testimonials.services.relationship') },
    { value: 'Custom Talisman', label: t('testimonials.services.talisman') }
  ], [t])

  const ratings = useMemo(() => [
    { value: 'all', label: t('testimonials.ratings.all') },
    { value: '5', label: t('testimonials.ratings.five') },
    { value: '4', label: t('testimonials.ratings.four') }
  ], [t])

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-gold-400 fill-current' : 'text-mystic-600'}`}
      />
    ))
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const filteredTestimonials = testimonialsWithAvatars.filter(testimonial => {
    const matchesSearch = testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesService = selectedService === 'all' || testimonial.service === selectedService
    const matchesRating = selectedRating === 'all' || testimonial.rating >= parseInt(selectedRating)
    
    return matchesSearch && matchesService && matchesRating
  })

  const handleRedditReviewClick = (review) => {
    setSelectedRedditReview(review)
  }

  const closeModal = () => {
    setSelectedRedditReview(null)
  }

  return (
    <>
      <SEO 
        title="Client Testimonials & Reviews | BaZi Reading Success Stories | FatePath"
        description="Read authentic client testimonials and success stories from our BaZi reading services. Real experiences from satisfied clients worldwide who found clarity and direction through Chinese numerology."
        keywords="bazi reading testimonials, client reviews, success stories, chinese numerology reviews, bazi reading feedback, satisfied clients, bazi reading results"
        canonical={`${window.location.origin}/testimonials`}
        ogImage={`${window.location.origin}/images/testimonials.jpg`}
        ogType="website"
      />
      
      <div className="min-h-screen pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-playfair font-bold mb-4 sm:mb-6">
              <span className="gradient-text">{t('testimonials.heroTitle')}</span>
            </h1>
            <p className="text-lg sm:text-xl text-mystic-300 max-w-3xl mx-auto leading-relaxed">
              {t('testimonials.heroDescription')}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
          >
            <div className="mystic-card p-6 text-center">
              <div className="text-3xl font-bold text-gold-400 mb-2">500+</div>
              <div className="text-mystic-300">{t('testimonials.stats.clients')}</div>
            </div>
            <div className="mystic-card p-6 text-center">
              <div className="text-3xl font-bold text-gold-400 mb-2">15+</div>
              <div className="text-mystic-300">{t('testimonials.stats.experience')}</div>
            </div>
            <div className="mystic-card p-6 text-center">
              <div className="text-3xl font-bold text-gold-400 mb-2">5.0</div>
              <div className="text-mystic-300">{t('testimonials.stats.rating')}</div>
            </div>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8"
          >
            <div className="flex justify-center">
              <div className="bg-mystic-800/50 rounded-lg p-1 border border-mystic-700/50">
                <button
                  onClick={() => setActiveTab('personal')}
                  className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === 'personal'
                      ? 'bg-gold-400 text-white shadow-lg'
                      : 'text-mystic-300 hover:text-white hover:bg-mystic-700/50'
                  }`}
                >
                  <Star className="inline-block h-4 w-4 mr-2" />
                  {t('testimonials.tabs.personal')}
                </button>
                <button
                  onClick={() => setActiveTab('reddit')}
                  className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === 'reddit'
                      ? 'bg-gold-400 text-white shadow-lg'
                      : 'text-mystic-300 hover:text-white hover:bg-mystic-700/50'
                  }`}
                >
                  <MessageCircle className="inline-block h-4 w-4 mr-2" />
                  {t('testimonials.tabs.reddit')}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Content based on active tab */}
          {activeTab === 'personal' ? (
            <>
              {/* Filters - Only show for personal testimonials */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-8 sm:mb-12"
              >
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  {/* Search */}
                  <div className="relative flex-1 max-w-md w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-mystic-400" aria-hidden="true" />
                    <input
                      type="text"
                      placeholder={t('testimonials.searchPlaceholder')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 text-base bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white placeholder-mystic-400 focus:border-gold-500/50 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Service Filter */}
                  <div className="flex items-center space-x-2">
                    <Filter className="h-5 w-5 text-mystic-400" aria-hidden="true" />
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="px-4 py-3 text-base bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white focus:border-gold-500/50 focus:outline-none transition-colors"
                    >
                      {services.map(service => (
                        <option key={service.value} value={service.value}>
                          {service.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Rating Filter */}
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-mystic-400" aria-hidden="true" />
                    <select
                      value={selectedRating}
                      onChange={(e) => setSelectedRating(e.target.value)}
                      className="px-4 py-3 text-base bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white focus:border-gold-500/50 focus:outline-none transition-colors"
                    >
                      {ratings.map(rating => (
                        <option key={rating.value} value={rating.value}>
                          {rating.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Personal Testimonials Grid */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
              >
                {filteredTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="mystic-card p-6 hover:transform hover:scale-105 transition-all duration-300"
                  >
                    {/* Header */}
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gold-500 to-orange-500 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          loading="lazy"
                          className="w-full h-full rounded-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="text-white font-semibold text-lg hidden">
                          {testimonial.name.charAt(0)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-white">{testimonial.name}</h3>
                          <div className="flex items-center space-x-1">
                            {renderStars(testimonial.rating)}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-mystic-400">{testimonial.location}</span>
                          <span className="text-gold-400 font-medium">{testimonial.service}</span>
                        </div>
                        <div className="text-xs text-mystic-500 mt-1">
                          {formatDate(testimonial.date)}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-mystic-300 leading-relaxed">
                      "{testimonial.content}"
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* No Results for Personal */}
              {filteredTestimonials.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{t('testimonials.noResults')}</h3>
                  <p className="text-mystic-400">{t('testimonials.tryAdjusting')}</p>
                </motion.div>
              )}
            </>
          ) : (
            <>
              {/* Reddit Reviews Mosaic */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mb-12"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">{t('testimonials.redditTitle')}</h2>
                  <p className="text-mystic-300">{t('testimonials.redditDescription')}</p>
                </div>
                
                {/* Mosaic Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {redditReviews.map((review, index) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="group cursor-pointer"
                      onClick={() => handleRedditReviewClick(review)}
                    >
                      <div className="relative overflow-hidden rounded-lg border-2 border-mystic-700/50 hover:border-gold-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold-400/20">
                        <img
                          src={review.image}
                          alt={`Authentic BaZi reading client review ${review.id} from Reddit - Chinese astrology testimonial with satisfied customer feedback`}
                          width={400}
                          height={400}
                          loading="lazy"
                          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-full h-full bg-mystic-700 flex items-center justify-center hidden" aria-hidden="true">
                          <span className="text-mystic-400 text-sm">BaZi Review Image</span>
                        </div>
                        
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="text-center text-white">
                            <MessageCircle className="h-8 w-8 mx-auto mb-2 text-gold-400" />
                            <p className="text-sm font-medium">{t('testimonials.clickToEnlarge')}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>

      {/* Reddit Review Modal */}
      <AnimatePresence>
        {selectedRedditReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-lg bg-mystic-900 border border-mystic-700"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              
              {/* Image */}
              <img
                src={selectedRedditReview.image}
                alt={`Genuine BaZi consultation review ${selectedRedditReview.id} from Reddit - Chinese numerology expert testimonial showing professional service quality`}
                width={1200}
                height={1200}
                className="w-full h-auto max-h-[90vh] object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-full h-full bg-mystic-700 flex items-center justify-center hidden" aria-hidden="true">
                <span className="text-mystic-400">BaZi Review Image</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Testimonials 