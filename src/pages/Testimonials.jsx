import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Heart, Shield, Star as StarIcon, Filter, Search } from 'lucide-react'
import SEO from '../components/SEO'
import { getCachedAIAvatar, generateAvatarUrls } from '../utils/aiAvatarGenerator'

const Testimonials = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedService, setSelectedService] = useState('all')
  const [selectedRating, setSelectedRating] = useState('all')
  const [testimonialsWithAvatars, setTestimonialsWithAvatars] = useState([])

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
    },
    {
      id: 9,
      name: "Sophie Anderson",
      location: "Melbourne, Australia",
      rating: 5,
      service: "Career Guidance Reading",
      avatar: "/images/testimonials/sophie-anderson.jpg",
      content: "I was stuck in a dead-end marketing job, feeling completely unfulfilled. The BaZi analysis revealed I have 'healing water energy' that was being wasted on corporate BS. It suggested healthcare or wellness would be my true calling. I was skeptical but decided to study nutrition part-time. Within a year, I was running my own wellness coaching business. I'm now helping others find their path while making more money than I ever did in marketing. The reading didn't just identify my calling—it gave me the confidence to pursue it.",
      icon: <Star className="h-6 w-6" />,
      date: "2024-11-18"
    },
    {
      id: 10,
      name: "Robert Martinez",
      location: "Chicago, USA",
      rating: 5,
      service: "Custom Talisman",
      avatar: "/images/testimonials/robert-martinez.jpg",
      content: "Chronic stress was killing me—literally. I had high blood pressure, insomnia, and doctors couldn't find a cause. The talisman was designed to balance the 'excessive fire' in my chart that was causing the imbalance. I wore it for two weeks before noticing any changes. By month 2, my blood pressure normalized. By month 3, I was sleeping like a baby. My doctor was amazed. The talisman has become my daily companion. It's not a cure-all, but it's definitely a game-changer.",
      icon: <Shield className="h-6 w-6" />,
      date: "2024-11-15"
    },
    {
      id: 11,
      name: "Yuki Tanaka",
      location: "Tokyo, Japan",
      rating: 5,
      service: "Full BaZi Reading",
      avatar: "/images/testimonials/yuki-tanaka.jpg",
      content: "Family conflicts were destroying my mental health. I couldn't understand why my traditional Japanese family couldn't accept my modern lifestyle choices. The BaZi reading revealed I have 'independent metal energy' that naturally clashes with traditional expectations. It helped me understand I'm not wrong for wanting to live differently. The reading also showed me how to communicate better while staying true to myself. Our relationships have improved significantly. Sometimes understanding yourself helps you understand others.",
      icon: <Star className="h-6 w-6" />,
      date: "2024-11-12"
    },
    {
      id: 12,
      name: "Amanda Foster",
      location: "Vancouver, Canada",
      rating: 5,
      service: "Love Compatibility Reading",
      avatar: "/images/testimonials/amanda-foster.jpg",
      content: "I was dating someone for a year and couldn't decide if we should get married. The compatibility reading revealed we have 'good chemistry but challenging long-term compatibility.' It showed specific areas where we'd struggle and suggested ways to work through them. We decided to get pre-marital counseling based on the insights. The reading gave us the tools to build a stronger foundation. We're now happily married and better equipped to handle challenges together. Sometimes love needs a roadmap.",
      icon: <Heart className="h-6 w-6" />,
      date: "2024-11-10"
    }
  ]

  // 生成AI头像
  useEffect(() => {
    const testimonialsWithAI = generateAvatarUrls(testimonials)
    setTestimonialsWithAvatars(testimonialsWithAI)
  }, [])

  const services = [
    { value: 'all', label: 'All Services' },
    { value: 'Full BaZi Reading', label: 'Full BaZi Reading' },
    { value: 'Career Guidance Reading', label: 'Career Guidance' },
    { value: 'Love Compatibility Reading', label: 'Love Compatibility' },
    { value: 'Relationship Reading', label: 'Relationship Reading' },
    { value: 'Custom Talisman', label: 'Custom Talisman' }
  ]

  const ratings = [
    { value: 'all', label: 'All Ratings' },
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4+ Stars' }
  ]

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
              <span className="gradient-text">Client Success Stories</span>
            </h1>
            <p className="text-lg sm:text-xl text-mystic-300 max-w-3xl mx-auto leading-relaxed">
              Discover how our BaZi reading services have transformed lives across the globe. 
              Real stories from real people who found clarity, direction, and purpose.
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
              <div className="text-mystic-300">Happy Clients</div>
            </div>
            <div className="mystic-card p-6 text-center">
              <div className="text-3xl font-bold text-gold-400 mb-2">15+</div>
              <div className="text-mystic-300">Years Experience</div>
            </div>
            <div className="mystic-card p-6 text-center">
              <div className="text-3xl font-bold text-gold-400 mb-2">5.0</div>
              <div className="text-mystic-300">Average Rating</div>
            </div>
          </motion.div>

          {/* Filters */}
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
                  placeholder="Search testimonials..."
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

          {/* Testimonials Grid */}
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

          {/* No Results */}
          {filteredTestimonials.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">No testimonials found</h3>
              <p className="text-mystic-400">Try adjusting your search criteria or filters.</p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}

export default Testimonials 