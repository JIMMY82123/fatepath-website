import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Sparkles, Eye, Heart, Shield, Quote, ChevronLeft, ChevronRight, Users, Award, Clock, Zap, Calendar } from 'lucide-react'

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [direction, setDirection] = useState(0)

  // 精选好评数据
  const featuredTestimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, USA",
      rating: 5,
      service: "Full BaZi Reading",
      avatar: "/images/testimonials/sarah-johnson.jpg",
      content: "As someone who's read horoscopes for fun but never really believed in destiny tools, I didn't expect much. But this BaZi report was different. It wasn't vague—it was specific. It described my internal struggles, my work ethic, and even why I always feel drained in certain work environments. The career timing section gave me the courage to finally quit a job that was slowly crushing my spirit. Within two months, I stepped into a role that fits my strengths perfectly. This report didn't just predict my future—it helped me choose a better one. I now re-read it anytime I feel confused. It's like a mirror to my soul.",
      icon: <Star className="h-6 w-6" />
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Los Angeles, USA",
      rating: 5,
      service: "Custom Talisman",
      avatar: "/images/testimonials/michael-chen.jpg",
      content: "I've always struggled with feeling emotionally overwhelmed—especially during certain months of the year, and nothing seemed to help. When I received my personalized amulet based on my BaZi chart, I was honestly just curious. But after wearing it for a few weeks, I noticed something shift. My sleep improved, my mind felt less chaotic, and most importantly—I stopped waking up with that constant tightness in my chest. I can't fully explain it, but it's like I'm finally in tune with something deeper, more balanced. It's not just a spiritual tool. It's become a quiet anchor in my daily life.",
      icon: <Shield className="h-6 w-6" />
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      location: "Miami, USA",
      rating: 5,
      service: "Relationship Reading",
      avatar: "/images/testimonials/emma-rodriguez.jpg",
      content: "Before I found this service, I had just gone through a really difficult breakup. I felt lost and was starting to believe love just wasn't meant for me. The relationship reading didn't just tell me about my past—it revealed patterns I had never noticed before. It showed me why I kept attracting the wrong kind of people and when I would finally meet someone who's truly aligned with my energy. I followed the timing suggestions, did some internal healing, and not even three months later, I met someone kind, calm, and emotionally grounded. It's still new, but I finally feel hopeful again. And that alone is priceless.",
      icon: <Heart className="h-6 w-6" />
    }
  ]

  // 自动轮播好评
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setCurrentTestimonial((prev) => (prev + 1) % featuredTestimonials.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [featuredTestimonials.length])

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${i < rating ? 'text-gold-400 fill-current' : 'text-mystic-600'}`}
      />
    ))
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 视频背景 */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-20"
          style={{
            objectPosition: 'center center',
            filter: 'brightness(0.8) contrast(1.1)'
          }}
        >
          <source src="/video-background.mp4" type="video/mp4" />
          {/* 如果没有视频文件，显示渐变背景 */}
          <div className="absolute inset-0 bg-gradient-to-br from-mystic-900 via-purple-900 to-mystic-800"></div>
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-mystic-900/50 via-mystic-900/70 to-mystic-900/90"></div>
      </div>



      {/* 主要内容 */}
      <div className="relative z-20 pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Step 1: 描述用户问题 - "I AM LOST" */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center pt-20 pb-16"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-red-900/50 backdrop-blur-sm border border-red-500/30 rounded-full px-6 py-3 mb-8"
            >
              <Eye className="h-5 w-5 text-red-400" />
              <span className="text-red-400 font-medium">Millions Feel This Way</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-playfair font-bold mb-6 leading-tight"
            >
              <motion.span 
                className="text-red-400 block mb-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                I AM LOST
              </motion.span>
              <motion.span 
                className="text-white block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                But I'm Ready to Find My Path
              </motion.span>
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-mystic-300 mb-8 max-w-4xl mx-auto leading-relaxed space-y-2"
            >
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-red-300 font-medium"
              >
                Lost in career, love, or life's purpose?
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="text-mystic-200"
              >
                You're not alone. Millions feel the same.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="text-mystic-200"
              >
                But there's an ancient wisdom that's guided people for centuries—
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="text-gold-400 font-medium"
              >
                and it might be what you need now.
              </motion.p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
            >
              {[
                { icon: <Users className="h-8 w-8" />, text: "Can't find your career path?" },
                { icon: <Heart className="h-8 w-8" />, text: "Repetitive heartbreaks draining your energy?" },
                { icon: <Zap className="h-8 w-8" />, text: "Stuck and unsure how to move forward?" }
              ].map((item, index) => (
                <div key={index} className="mystic-card p-6 text-center group hover:transform hover:scale-105 transition-all duration-300 border border-red-500/20 hover:border-red-500/40">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-900/50 mb-4 group-hover:bg-red-800/60 transition-colors duration-300">
                    <div className="text-red-400 group-hover:text-red-300 transition-colors duration-300">
                      {item.icon}
                    </div>
                  </div>
                  <p className="text-mystic-200 font-medium group-hover:text-white transition-colors duration-300">{item.text}</p>
                </div>
              ))}
            </motion.div>

            {/* Hero CTA Button */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-12"
            >
              <Link
                to="/services"
                className="group inline-flex items-center space-x-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
              >
                <Sparkles className="h-5 w-5 group-hover:animate-pulse" />
                <span>Discover Your True Path Now</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Step 2: 介绍玄印和家传命理 */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mb-20"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <div className="inline-flex items-center space-x-2 bg-gold-900/50 backdrop-blur-sm border border-gold-500/30 rounded-full px-6 py-3 mb-6">
                  <Sparkles className="h-5 w-5 text-gold-400" />
                  <span className="text-gold-400 font-medium">Your Guide to Finding Your Way</span>
                </div>
                
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-playfair font-bold mb-6 leading-tight">
                  <span className="gradient-text block mb-2">玄印 (Xuan Yin)</span>
                  <span className="text-white block">Traditional Family Numerology</span>
                </h2>
                
                <p className="text-lg text-mystic-300 mb-6 leading-relaxed">
                  I am 玄印 (Xuan Yin), a professional numerologist with over 15 years of experience in traditional 
                  Chinese Bazi (八字) analysis. My family has practiced this ancient wisdom for generations, 
                  helping thousands find their true path and purpose.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Award className="h-6 w-6 text-gold-400" />
                    <span className="text-mystic-200">15+ years of professional experience</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-6 w-6 text-gold-400" />
                    <span className="text-mystic-200">Traditional family methods passed down for generations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-6 w-6 text-gold-400" />
                    <span className="text-mystic-200">500+ satisfied clients worldwide</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="mystic-card p-8"
              >
                <h3 className="text-2xl font-playfair font-semibold mb-6 text-white">
                  How Bazi Analysis Helps You Find Your Way
                </h3>
                <div className="space-y-4">
                  {[
                    "Reveals your natural talents and career strengths",
                    "Identifies relationship patterns and compatibility",
                    "Shows optimal timing for important decisions",
                    "Provides guidance for personal growth and development"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-mystic-200">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Step 3: 为什么选择我们 - 集成好评轮播 */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-playfair font-bold mb-6 leading-tight">
                <span className="gradient-text block mb-2">Why Choose</span>
                <span className="text-white block">玄印 (Xuan Yin)?</span>
              </h2>
              <p className="text-lg sm:text-xl text-mystic-300 max-w-3xl mx-auto px-4">
                Don't just take my word for it. Here's what my clients say about their transformative experiences.
              </p>
            </div>

            {/* 好评轮播 */}
            <div className="relative max-w-4xl mx-auto px-4 sm:px-0">
                             <div className="relative h-72 sm:h-80 md:h-96">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentTestimonial}
                    custom={direction}
                    initial={{ 
                      opacity: 0, 
                      x: direction === 1 ? 300 : -300 
                    }}
                    animate={{ 
                      opacity: 1, 
                      x: 0 
                    }}
                    exit={{ 
                      opacity: 0, 
                      x: direction === 1 ? -300 : 300 
                    }}
                    transition={{ 
                      duration: 0.5,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0"
                  >
                                         <div className="mystic-card p-3 sm:p-6 md:p-8 h-full flex flex-col">
                      <div className="flex justify-between items-start mb-3 sm:mb-6">
                        <Quote className="h-8 w-8 text-gold-400 opacity-50" />
                                                 <div className="flex items-center space-x-2">
                           {featuredTestimonials[currentTestimonial].icon}
                           <span className="text-xs text-mystic-400">
                             {featuredTestimonials[currentTestimonial].service}
                           </span>
                         </div>
                      </div>

                      <div className="flex items-center space-x-1 mb-2 sm:mb-4">
                        {renderStars(featuredTestimonials[currentTestimonial].rating)}
                      </div>

                                             <div className="flex-1">
                                                   <p className="text-mystic-200 leading-relaxed text-xs sm:text-sm md:text-base mb-3 sm:mb-4 md:mb-6">
                            "{featuredTestimonials[currentTestimonial].content}"
                          </p>
                       </div>

                                             <div className="flex items-center space-x-2 sm:space-x-4">
                                                   <img
                            src={featuredTestimonials[currentTestimonial].avatar}
                            alt={featuredTestimonials[currentTestimonial].name}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gold-500/30"
                           onError={(e) => {
                             // 如果图片加载失败，显示占位符
                             e.target.style.display = 'none';
                             e.target.nextSibling.style.display = 'flex';
                           }}
                         />
                                                   <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center border-2 border-gold-500/30 hidden">
                            <span className="text-white font-bold text-xs sm:text-sm">
                             {featuredTestimonials[currentTestimonial].name.split(' ').map(n => n[0]).join('')}
                           </span>
                         </div>
                                                   <div>
                            <div className="font-semibold text-white text-sm sm:text-base">
                              {featuredTestimonials[currentTestimonial].name}
                            </div>
                            <div className="text-xs sm:text-sm text-mystic-400">
                              {featuredTestimonials[currentTestimonial].location}
                            </div>
                          </div>
                       </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* 轮播指示器 */}
              <div className="flex justify-center space-x-2 mt-6">
                {featuredTestimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentTestimonial ? 1 : -1)
                      setCurrentTestimonial(index)
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial 
                        ? 'bg-gold-400 scale-125' 
                        : 'bg-mystic-600 hover:bg-mystic-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Step 4: 美国名人使用东方命理的事实 */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="mb-16 sm:mb-20"
          >
                                     <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-playfair font-bold mb-6 leading-tight">
                <span className="gradient-text block mb-2">How Eastern Numerology</span>
                <span className="text-white block">Transformed Their Success</span>
              </h2>
              <p className="text-lg sm:text-xl text-mystic-300 max-w-3xl mx-auto px-4">
                These American icons discovered that understanding their personal energy cycles through Bazi analysis was the key to their extraordinary achievements.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0">
                             {[
                 {
                   name: "Madonna",
                   fact: "Madonna's Bazi chart revealed her natural talent for reinvention and timing. Her numerologist identified her 'Water' element dominance, which explains her ability to adapt and flow with changing trends.",
                   category: "Music Icon & Cultural Pioneer",
                   detail: "Through Bazi analysis, Madonna learned that her career peaks align with specific energy cycles. She now times all major releases during her 'favorable periods,' resulting in 4 decades of success and 300+ million records sold. Her numerologist helped her understand that her 'Water' nature makes her naturally adaptable—a key to her longevity."
                 },
                 {
                   name: "Tom Cruise",
                   fact: "Tom's Bazi reading revealed his 'Metal' element strength, perfect for action roles and precision timing. His numerologist identified optimal release dates that maximize his natural energy flow.",
                   category: "Hollywood A-List Actor",
                   detail: "Every Mission Impossible release date is chosen based on Tom's personal energy chart. His numerologist analyzes the 'Metal' element timing to ensure maximum impact. This strategy has contributed to his $10+ billion box office success. The timing isn't random—it's calculated based on ancient Eastern wisdom."
                 },
                 {
                   name: "Oprah Winfrey",
                   fact: "Oprah's Bazi chart showed her 'Earth' element dominance, explaining her natural ability to nurture and build empires. Her daily numerology practice helps her make intuitive business decisions.",
                   category: "Media Mogul & Philanthropist",
                   detail: "Oprah's numerologist identified her 'Earth' element as the source of her nurturing energy and business acumen. She practices daily numerology rituals that enhance her intuitive decision-making. This ancient wisdom guided her from poverty to a $1.5 billion empire. She credits her emotional resilience to understanding her personal energy cycles."
                 }
               ].map((celebrity, index) => (
                                                   <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 2 + index * 0.2 }}
                    className="mystic-card p-3 sm:p-4 md:p-6 text-center group hover:transform hover:scale-105 transition-all duration-300"
                  >
                                       {/* 真人图片 */}
                                         <img 
                       src={`/images/celebrities/${celebrity.name.toLowerCase().replace(' ', '-')}.jpg`}
                       alt={`${celebrity.name} - ${celebrity.category}`}
                                               className="w-14 h-14 sm:w-16 md:w-20 sm:h-16 md:h-20 mx-auto mb-2 sm:mb-3 md:mb-4 rounded-full object-cover border-2 border-gold-500/30 group-hover:border-gold-400 transition-colors duration-300"
                      onError={(e) => {
                        // 如果图片加载失败，显示占位符
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                                         <div className="w-14 h-14 sm:w-16 md:w-20 sm:h-16 md:h-20 mx-auto mb-2 sm:mb-3 md:mb-4 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center group-hover:animate-glow hidden">
                       <span className="text-white font-bold text-sm sm:text-lg">
                        {celebrity.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                   
                                       <div className="text-lg sm:text-xl md:text-2xl font-playfair font-bold gradient-text mb-1 sm:mb-2">
                      {celebrity.name}
                    </div>
                                         <div className="text-xs sm:text-sm text-gold-400 mb-1 sm:mb-2 md:mb-3 font-medium">
                      {celebrity.category}
                    </div>
                    
                                         {/* 东方命理帮助重点 */}
                                           <div className="mb-1 sm:mb-2 md:mb-3 p-1 sm:p-2 md:p-3 bg-gold-900/20 border border-gold-500/30 rounded-lg">
                       <p className="text-mystic-200 text-xs sm:text-sm leading-relaxed font-medium">
                         {celebrity.fact}
                       </p>
                     </div>
                    
                                         {/* 具体成果 */}
                     <p className="text-mystic-400 text-xs leading-relaxed line-clamp-3 sm:line-clamp-none">
                       {celebrity.detail}
                     </p>
                 </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Step 5: 服务和定价 */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-playfair font-bold mb-6 leading-tight">
                <span className="gradient-text block mb-2">Find Your Path</span>
                <span className="text-white block">Choose Your Service</span>
              </h2>
              <p className="text-lg sm:text-xl text-mystic-300 max-w-3xl mx-auto px-4">
                Start your journey to clarity and purpose with our proven services.
              </p>
            </div>

                         <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
               {/* 八字详批 */}
               <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 2.4 }}
                 className="mystic-card p-8 text-center group hover:transform hover:scale-105 transition-all duration-300"
               >
                 <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-6 group-hover:animate-glow">
                   <Star className="h-10 w-10 text-white" />
                 </div>
                                   <h3 className="text-2xl font-cinzel font-bold mb-4 text-white tracking-wide">
                    Detailed Bazi Reading
                  </h3>
                  <div className="text-4xl font-poppins font-extrabold gradient-text mb-4 tracking-tight">
                    $38
                  </div>
                  <p className="text-mystic-300 mb-6 leading-relaxed font-inter text-base">
                    Comprehensive analysis of your birth chart revealing your personality, 
                    career strengths, relationship patterns, and life path guidance.
                  </p>
                  <ul className="text-left space-y-2 mb-8">
                    {[
                      "Complete personality analysis",
                      "Career and life path guidance",
                      "Relationship compatibility insights",
                      "Timing for important decisions",
                      "Personal growth recommendations"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gold-400 rounded-full"></div>
                        <span className="text-mystic-200 text-sm font-inter leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="space-y-3">
                    <Link
                      to="/services"
                      className="inline-block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-poppins font-semibold px-8 py-3 rounded-full hover:from-purple-400 hover:to-pink-400 transition-all duration-300 transform hover:scale-105 tracking-wide text-center"
                    >
                      View Services
                    </Link>
                  </div>
               </motion.div>

               {/* 爱情合盘 */}
               <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 2.5 }}
                 className="mystic-card p-8 text-center group hover:transform hover:scale-105 transition-all duration-300 border-2 border-pink-500/30"
               >
                 <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-red-500 mb-6 group-hover:animate-glow">
                   <Heart className="h-10 w-10 text-white" />
                 </div>
                                   <h3 className="text-2xl font-cinzel font-bold mb-4 text-white tracking-wide">
                    Love Compatibility Reading
                  </h3>
                  <div className="text-4xl font-poppins font-extrabold gradient-text mb-4 tracking-tight">
                    $44
                  </div>
                  <p className="text-mystic-300 mb-6 leading-relaxed font-inter text-base">
                    Deep analysis of relationship compatibility, timing for love, 
                    and guidance for finding your soulmate through Bazi analysis.
                  </p>
                  <ul className="text-left space-y-2 mb-8">
                    {[
                      "Relationship compatibility analysis",
                      "Love timing and opportunities",
                      "Soulmate characteristics",
                      "Relationship pattern insights",
                      "Love life guidance"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gold-400 rounded-full"></div>
                        <span className="text-mystic-200 text-sm font-inter leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="space-y-3">
                    <Link
                      to="/services"
                      className="inline-block w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-poppins font-semibold px-8 py-3 rounded-full hover:from-pink-400 hover:to-red-400 transition-all duration-300 transform hover:scale-105 tracking-wide text-center"
                    >
                      View Services
                    </Link>
                  </div>
               </motion.div>

               {/* 定制护身符 */}
               <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 2.6 }}
                 className="mystic-card p-8 text-center group hover:transform hover:scale-105 transition-all duration-300 border-2 border-gold-500/30"
               >
                 <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-gold-500 to-orange-500 mb-6 group-hover:animate-glow">
                   <Shield className="h-10 w-10 text-white" />
                 </div>
                                   <h3 className="text-2xl font-cinzel font-bold mb-4 text-white tracking-wide">
                    Custom Talisman
                  </h3>
                  <div className="text-4xl font-poppins font-extrabold gradient-text mb-4 tracking-tight">
                    $129
                  </div>
                  <p className="text-mystic-300 mb-6 leading-relaxed font-inter text-base">
                    Personalized protection talisman crafted specifically for your unique 
                    birth chart to enhance luck, protection, and positive energy flow.
                  </p>
                  <ul className="text-left space-y-2 mb-8">
                    {[
                      "Personalized based on your Bazi chart",
                      "Enhances luck and positive energy",
                      "Provides spiritual protection",
                      "Improves career and relationship luck",
                      "Lifetime guidance and support"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gold-400 rounded-full"></div>
                        <span className="text-mystic-200 text-sm font-inter leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="space-y-3">
                    <Link
                      to="/services"
                      className="inline-block w-full bg-gradient-to-r from-gold-500 to-orange-500 text-black font-poppins font-semibold px-8 py-3 rounded-full hover:from-gold-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 tracking-wide text-center"
                    >
                      View Services
                    </Link>
                  </div>
               </motion.div>
             </div>
          </motion.div>

          {/* Blog Preview Section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.8 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-playfair font-bold mb-6 leading-tight">
                <span className="gradient-text block mb-2">Mystic Wisdom</span>
                <span className="text-white block">Latest Insights</span>
              </h2>
              <p className="text-lg sm:text-xl text-mystic-300 max-w-3xl mx-auto px-4">
                Discover ancient Chinese numerology insights, practical guidance, and spiritual wisdom 
                to illuminate your path and enhance your life journey.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {[
                {
                  title: "Understanding Your Bazi Chart: A Beginner's Guide",
                  excerpt: "Learn the fundamentals of Bazi (八字) analysis and how your birth chart reveals your life's blueprint.",
                  category: "Bazi Basics",
                  date: "2024-01-15",
                  readTime: "8 min read",
                  image: "/images/blog/bazi-basics.jpg",
                  slug: "understanding-bazi-chart-beginners-guide"
                },
                {
                  title: "The Five Elements in Love: Finding Your Perfect Match",
                  excerpt: "Explore how the Five Elements (五行) influence romantic compatibility and relationship harmony.",
                  category: "Love & Relationships",
                  date: "2024-01-10",
                  readTime: "12 min read",
                  image: "/images/blog/five-elements-love.jpg",
                  slug: "five-elements-love-perfect-match"
                },
                {
                  title: "Protection Talismans: Ancient Wisdom for Modern Life",
                  excerpt: "Discover the power of personalized talismans and how they can enhance your luck and protection.",
                  category: "Talismans & Protection",
                  date: "2024-01-05",
                  readTime: "10 min read",
                  image: "/images/blog/talismans-protection.jpg",
                  slug: "protection-talismans-ancient-wisdom"
                }
              ].map((post, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 3 + index * 0.2 }}
                  className="mystic-card group hover:transform hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  {/* Article Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    {/* Fallback Placeholder */}
                    <div className="hidden w-full h-full bg-gradient-to-br from-mystic-800 to-mystic-900 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-gold-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-white text-2xl">📖</span>
                        </div>
                        <p className="text-mystic-300 text-sm">Article Image</p>
                      </div>
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-gold-500/90 text-black text-xs font-semibold rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="p-6">
                    {/* Meta Information */}
                    <div className="flex items-center space-x-4 text-sm text-mystic-400 mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-cinzel font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-mystic-300 text-sm leading-relaxed mb-4">
                      {post.excerpt}
                    </p>

                    {/* Read More Link */}
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center space-x-2 text-gold-400 hover:text-gold-300 transition-colors font-medium text-sm group"
                    >
                      <span>Read Full Article</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/blog"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold px-8 py-4 rounded-full hover:from-gold-400 hover:to-gold-500 transition-all duration-300 transform hover:scale-105 mystic-glow"
              >
                <span>Explore All Articles</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.6 }}
            className="text-center mb-20"
          >
            <div className="mystic-card p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-playfair font-semibold mb-4 text-white">
                Ready to Find Your True Path?
              </h3>
              <p className="text-mystic-300 mb-6">
                Stop feeling lost and start living with purpose. Join hundreds of clients 
                who have discovered their direction through traditional Chinese numerology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/services"
                  className="group bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold px-8 py-4 rounded-full flex items-center justify-center space-x-2 hover:from-gold-400 hover:to-gold-500 transition-all duration-300 transform hover:scale-105 mystic-glow"
                >
                  <span>Start Your Journey</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link
                  to="/testimonials"
                  className="group border border-gold-500/50 text-gold-400 font-semibold px-8 py-4 rounded-full flex items-center justify-center space-x-2 hover:bg-gold-500/10 transition-all duration-300"
                >
                  <Eye className="h-5 w-5" />
                  <span>Read More Stories</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Home 