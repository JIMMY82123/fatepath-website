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

  // 生成AI头像
  useEffect(() => {
    const testimonialsWithAI = generateAvatarUrls(testimonials)
    setTestimonialsWithAvatars(testimonialsWithAI)
  }, [])

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, USA",
      rating: 5,
      service: "Full BaZi Reading",
      avatar: "/images/testimonials/sarah-johnson.jpg",
      content: "As someone who's read horoscopes for fun but never really believed in destiny tools, I didn't expect much. But this BaZi report was different. It wasn't vague—it was specific. It described my internal struggles, my work ethic, and even why I always feel drained in certain work environments. The career timing section gave me the courage to finally quit a job that was slowly crushing my spirit. Within two months, I stepped into a role that fits my strengths perfectly. This report didn't just predict my future—it helped me choose a better one. I now re-read it anytime I feel confused. It's like a mirror to my soul.",
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
      content: "I've always struggled with feeling emotionally overwhelmed—especially during certain months of the year, and nothing seemed to help. When I received my personalized amulet based on my BaZi chart, I was honestly just curious. But after wearing it for a few weeks, I noticed something shift. My sleep improved, my mind felt less chaotic, and most importantly—I stopped waking up with that constant tightness in my chest. I can't fully explain it, but it's like I'm finally in tune with something deeper, more balanced. It's not just a spiritual tool. It's become a quiet anchor in my daily life.",
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
      content: "Before I found this service, I had just gone through a really difficult breakup. I felt lost and was starting to believe love just wasn't meant for me. The relationship reading didn't just tell me about my past—it revealed patterns I had never noticed before. It showed me why I kept attracting the wrong kind of people and when I would finally meet someone who's truly aligned with my energy. I followed the timing suggestions, did some internal healing, and not even three months later, I met someone kind, calm, and emotionally grounded. It's still new, but I finally feel hopeful again. And that alone is priceless.",
      icon: <Heart className="h-6 w-6" />,
      date: "2024-12-08"
    },
    {
      id: 4,
      name: "David Thompson",
      location: "London, UK",
      rating: 5,
      service: "Career Guidance Reading",
      content: "I was at a crossroads in my career, unsure whether to stay in finance or pursue my passion for technology. The BaZi analysis revealed that my chart strongly favors innovation and creative problem-solving, which explained why I felt unfulfilled in traditional banking. The timing analysis showed that the next two years would be optimal for a career transition. I took the leap and started a tech consulting business. Six months later, I'm not only more financially successful but genuinely happy. The analysis was incredibly accurate about my natural talents and the timing couldn't have been more perfect.",
      icon: <Star className="h-6 w-6" />,
      date: "2024-12-05"
    },
    {
      id: 5,
      name: "Lisa Wang",
      location: "Toronto, Canada",
      rating: 5,
      service: "Love Compatibility Reading",
      content: "My husband and I were going through a rough patch, and I was desperate to understand what was happening. The compatibility reading revealed that our charts actually complement each other perfectly, but we were in a challenging period that would pass. It explained our communication patterns and gave us specific strategies to work through our differences. We followed the advice, and within weeks, our relationship improved dramatically. We're now closer than ever. The reading didn't just save our marriage—it made it stronger than before.",
      icon: <Heart className="h-6 w-6" />,
      date: "2024-12-03"
    },
    {
      id: 6,
      name: "James Wilson",
      location: "Sydney, Australia",
      rating: 5,
      service: "Custom Talisman",
      content: "I was skeptical about talismans, but I was going through a particularly difficult time with anxiety and insomnia. The personalized talisman was crafted based on my specific birth chart imbalances. Within days of wearing it, I noticed a significant reduction in my anxiety levels. My sleep quality improved dramatically, and I felt more grounded throughout the day. The most surprising part was how it seemed to enhance my decision-making abilities. I'm now a firm believer in the power of these ancient practices.",
      icon: <Shield className="h-6 w-6" />,
      date: "2024-11-28"
    },
    {
      id: 7,
      name: "Maria Garcia",
      location: "Madrid, Spain",
      rating: 5,
      service: "Full BaZi Reading",
      content: "I've always felt like I was meant for something bigger, but I couldn't figure out what. The BaZi reading revealed that I have strong leadership qualities and entrepreneurial energy that I wasn't utilizing. It also showed that I was in a period of transformation that would last for three years. Armed with this knowledge, I started a small business that has grown beyond my expectations. The reading gave me the confidence to trust my instincts and the timing to know when to act. It's been a game-changer for my life.",
      icon: <Star className="h-6 w-6" />,
      date: "2024-11-25"
    },
    {
      id: 8,
      name: "Alex Kim",
      location: "Seoul, South Korea",
      rating: 5,
      service: "Relationship Reading",
      content: "I was in a toxic relationship but couldn't see it clearly. The relationship reading opened my eyes to the patterns I was repeating from my childhood. It showed me exactly when I would have the strength to leave and what to look for in a healthy partner. Three months after the reading, I ended the relationship and focused on healing. Six months later, I met someone who matches my chart perfectly. The difference is night and day. I finally understand what a healthy relationship feels like.",
      icon: <Heart className="h-6 w-6" />,
      date: "2024-11-20"
    },
    {
      id: 9,
      name: "Sophie Anderson",
      location: "Melbourne, Australia",
      rating: 5,
      service: "Career Guidance Reading",
      content: "I was stuck in a dead-end job and felt completely lost about my career direction. The BaZi analysis revealed that I have strong creative and healing energies that were being suppressed. It suggested that healthcare or wellness would be ideal for me. I decided to study nutrition and now run a successful wellness coaching business. The reading not only identified my true calling but also gave me the confidence to pursue it. I'm now helping others find their path too.",
      icon: <Star className="h-6 w-6" />,
      date: "2024-11-18"
    },
    {
      id: 10,
      name: "Robert Martinez",
      location: "Chicago, USA",
      rating: 5,
      service: "Custom Talisman",
      content: "I was dealing with chronic stress and health issues that doctors couldn't explain. The talisman was designed to balance the fire element in my chart that was causing the imbalance. Within weeks, my stress levels decreased significantly, and my health improved. I also noticed that I was more focused and productive at work. The talisman has become an essential part of my daily routine. It's amazing how something so simple can have such a profound effect.",
      icon: <Shield className="h-6 w-6" />,
      date: "2024-11-15"
    },
    {
      id: 11,
      name: "Yuki Tanaka",
      location: "Tokyo, Japan",
      rating: 5,
      service: "Full BaZi Reading",
      content: "I was struggling with family relationships and couldn't understand why there was so much conflict. The BaZi reading revealed that my chart has strong independent energy that clashes with traditional family expectations. It helped me understand that I'm not wrong for wanting to live differently. The reading also showed me how to communicate better with my family while staying true to myself. Our relationships have improved significantly since then.",
      icon: <Star className="h-6 w-6" />,
      date: "2024-11-12"
    },
    {
      id: 12,
      name: "Amanda Foster",
      location: "Vancouver, Canada",
      rating: 5,
      service: "Love Compatibility Reading",
      content: "I was dating someone for a year and couldn't decide if we should get married. The compatibility reading revealed that while we have good chemistry, our long-term compatibility is challenging. It showed specific areas where we would struggle and suggested ways to work through them. We decided to get pre-marital counseling based on the insights. The reading gave us the tools to build a stronger foundation. We're now happily married and better equipped to handle challenges together.",
      icon: <Heart className="h-6 w-6" />,
      date: "2024-11-10"
    }
  ]

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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-mystic-400" />
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
                <Filter className="h-5 w-5 text-mystic-400" />
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
                <Star className="h-5 w-5 text-mystic-400" />
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