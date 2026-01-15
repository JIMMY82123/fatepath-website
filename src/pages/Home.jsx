import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEO from '../components/SEO'

const Home = () => {
  const { t } = useTranslation()
  const [selectedRedditReview, setSelectedRedditReview] = useState(null) // For modal

  const handleRedditReviewClick = (review) => {
    setSelectedRedditReview(review)
  }

  const closeModal = () => {
    setSelectedRedditReview(null)
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "FatePath BaZi Readings · English Guidance for Worldwide Clients",
    "url": "https://fatepath.me/",
    "description": "English-language BaZi readings and Chinese astrology guidance for professionals, couples, and families across the world.",
    "inLanguage": "en-US",
    "publisher": {
      "@type": "Organization",
      "name": "FatePath",
      "url": "https://fatepath.me",
      "logo": "https://fatepath.me/favicon.svg"
    },
    "areaServed": [
      "United States",
      "Canada",
      "United Kingdom",
      "Australia"
    ]
  }

  return (
    <>
      <SEO
        title="FatePath BaZi Readings · English Guidance for Worldwide Clients"
        description="Work with Master XuanYin for English-language BaZi readings tailored to professionals, couples, and families worldwide seeking practical Chinese astrology guidance."
        keywords="english bazi reading, global chinese astrology consultation, destiny analysis worldwide, fatepath ba zi guidance"
        canonical="https://fatepath.me/"
        ogImage="https://fatepath.me/og-image.svg"
        author="FatePath"
        structuredData={structuredData}
      />
      {/* H1 for search engines when JavaScript is disabled */}
      <noscript>
        <h1 style={{position:'static',opacity:1,padding:'2rem',textAlign:'center',color:'white',backgroundColor:'#0f172a'}}>
          FatePath BaZi Readings · English Guidance for Worldwide Clients
        </h1>
      </noscript>
      <main className="min-h-screen bg-slate-900 font-inter">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.5) contrast(1.1)' }}
          >
            <source src="/video-background.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-slate-900/60"></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-playfair font-semibold text-white mb-8 tracking-tight">
              {t('home.heroTitle', { defaultValue: 'Discover Your Destiny' })}
              <span className="block text-amber-400">{t('home.heroSubtitle', { defaultValue: 'Through BaZi Wisdom' })}</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              {t('home.heroDescription', { defaultValue: "Unlock the ancient secrets of Chinese astrology and discover your life's true path. Professional BaZi analysis reveals your personality, career potential, and life timing." })}
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/free-bazi-report"
                className="bg-amber-400 text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {t('home.cta')}
              </Link>
              <Link
                to="/services"
                className="border border-slate-300 text-slate-300 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all duration-300"
              >
                {t('home.viewServices', { defaultValue: 'View Services' })}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What is BaZi Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-semibold text-slate-900 mb-6 tracking-tight">
              {t('home.whatIsBazi')}
            </h2>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed">
              {t('home.whatIsBaziDesc')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-slate-50 p-8 rounded-lg border border-slate-200">
              <div className="w-16 h-16 bg-amber-100 rounded-full mx-auto mb-6 flex items-center justify-center border border-amber-200">
                <div className="text-2xl text-amber-600">☯</div>
              </div>
              <h3 className="text-xl font-playfair font-semibold text-slate-900 mb-4">{t('home.yinYangTheory')}</h3>
              <p className="text-slate-700 leading-relaxed">
                {t('home.yinYangTheoryDesc')}
              </p>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-lg border border-slate-200">
              <div className="w-16 h-16 bg-amber-100 rounded-full mx-auto mb-6 flex items-center justify-center border border-amber-200">
                <div className="text-2xl text-amber-600">五行</div>
              </div>
              <h3 className="text-xl font-playfair font-semibold text-slate-900 mb-4">{t('home.fiveElements')}</h3>
              <p className="text-slate-700 leading-relaxed">
                {t('home.fiveElementsDesc')}
              </p>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-lg border border-slate-200">
              <div className="w-16 h-16 bg-amber-100 rounded-full mx-auto mb-6 flex items-center justify-center border border-amber-200">
                <div className="text-2xl text-amber-600">⏰</div>
              </div>
              <h3 className="text-xl font-playfair font-semibold text-slate-900 mb-4">{t('home.timingCycles')}</h3>
              <p className="text-slate-700 leading-relaxed">
                {t('home.timingCyclesDesc')}
              </p>
            </div>
          </div>
          
          {/* BaZi vs Astrology Comparison */}
          <div className="bg-gradient-to-r from-amber-50 to-slate-50 p-8 rounded-lg border border-amber-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-playfair font-semibold text-slate-900 mb-4">
                {t('home.whyChooseBazi')}
              </h3>
              <p className="text-slate-700 max-w-3xl mx-auto">
                {t('home.whyChooseBaziDesc')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-lg font-playfair font-semibold text-slate-900 text-center mb-4">
                  🌟 Western Astrology
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-600 text-sm">{t('home.westernAstrologyPoint1')}</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-600 text-sm">{t('home.westernAstrologyPoint2')}</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-600 text-sm">{t('home.westernAstrologyPoint3')}</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-600 text-sm">{t('home.westernAstrologyPoint4')}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg font-playfair font-semibold text-slate-900 text-center mb-4">
                  {t('home.baziAstrology')}
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-600 text-sm">{t('home.baziAstrologyPoint1')}</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-600 text-sm">{t('home.baziAstrologyPoint2')}</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-600 text-sm">{t('home.baziAstrologyPoint3')}</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-600 text-sm">{t('home.baziAstrologyPoint4')}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-white rounded-lg border border-slate-200">
              <h4 className="text-lg font-playfair font-semibold text-slate-900 mb-3 text-center">
                {t('home.keyAdvantage')}
              </h4>
              <p className="text-slate-700 text-center leading-relaxed">
                {t('home.keyAdvantageDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Can BaZi Help You With Section */}
      <section className="py-24 bg-amber-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-semibold text-slate-900 mb-6 tracking-tight">
              {t('home.whatCanBaziHelp')}
            </h2>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed">
              {t('home.whatCanBaziHelpDesc')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Career & Life Direction */}
            <div className="bg-white p-8 border border-slate-200 hover:border-amber-400 transition-colors duration-300 rounded-lg shadow-sm group">
              <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center mb-6 border border-amber-200">
                <div className="text-2xl text-amber-600">🎯</div>
              </div>
              <h3 className="text-xl font-playfair font-semibold text-slate-900 mb-4">Career & Life Direction</h3>
              <p className="text-slate-700 leading-relaxed mb-4 text-base">
                Discover your natural talents and the career paths that align with your destiny. 
                Understand your timing for career changes and business opportunities.
              </p>
              <p className="text-slate-700 leading-relaxed text-sm">
                BaZi reveals when you're in a period of growth, stability, or transformation, 
                helping you make informed decisions about your professional life.
              </p>
            </div>

            {/* Relationships & Compatibility */}
            <div className="bg-white p-8 border border-slate-200 hover:border-amber-400 transition-colors duration-300 rounded-lg shadow-sm group">
              <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center mb-6 border border-amber-200">
                <div className="text-2xl text-amber-600">❤️</div>
              </div>
              <h3 className="text-xl font-playfair font-semibold text-slate-900 mb-4">Relationships & Compatibility</h3>
              <p className="text-slate-700 leading-relaxed mb-4 text-base">
                Understand your relationship patterns and find compatible partners. 
                Learn about timing for love and marriage, and how to improve existing relationships.
              </p>
              <p className="text-slate-700 leading-relaxed text-sm">
                BaZi compatibility analysis shows how your elements interact with others, 
                revealing the foundation for lasting and harmonious relationships.
              </p>
            </div>

            {/* Health & Wellness */}
            <div className="bg-white p-8 border border-slate-200 hover:border-amber-400 transition-colors duration-300 rounded-lg shadow-sm group">
              <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center mb-6 border border-amber-200">
                <div className="text-2xl text-amber-600">🏥</div>
              </div>
              <h3 className="text-xl font-playfair font-semibold text-slate-900 mb-4">Health & Wellness</h3>
              <p className="text-slate-700 leading-relaxed mb-4 text-base">
                Identify your health strengths and vulnerabilities based on your elemental composition. 
                Learn about preventive measures and lifestyle adjustments for optimal well-being.
              </p>
              <p className="text-slate-700 leading-relaxed text-sm">
                BaZi wellness emphasizes the concept of "treating before illness," preventing disease 
                through lifestyle and dietary adjustments before illness occurs, maintaining physical and mental health balance.
              </p>
            </div>

            {/* Learning and Growth */}
            <div className="bg-white p-8 border border-slate-200 hover:border-amber-400 transition-colors duration-300 rounded-lg shadow-sm group">
              <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center mb-6 border border-amber-200">
                <div className="text-2xl text-amber-600">📚</div>
              </div>
              <h3 className="text-xl font-playfair font-semibold text-slate-900 mb-4">Learning and Growth</h3>
              <p className="text-slate-700 leading-relaxed mb-4 text-base">
                Discover your learning style and the subjects that resonate with your natural abilities. 
                Understand the best timing for education and skill development.
              </p>
              <p className="text-slate-700 leading-relaxed text-sm">
                BaZi learning guidance helps you choose the right educational paths, 
                avoid blind actions, and achieve maximum learning effectiveness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reddit Community Reviews Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-playfair font-semibold text-slate-900 mb-6 tracking-tight">
                Community Love on Reddit
              </h2>
              <p className="text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed">
                Real feedback from the Reddit community - see what people are saying about their BaZi reading experiences
              </p>
            </div>
            
            {/* Reddit Reviews Mosaic Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {/* Reddit Review 1 */}
              <div 
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                onClick={() => handleRedditReviewClick({ id: 1, image: "/images/reddit-reviews/reddit-review-1.jpg" })}
              >
                <div className="relative overflow-hidden rounded-lg border-2 border-slate-200 hover:border-amber-400 transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/20">
                  <img
                    src="/images/reddit-reviews/reddit-review-1.jpg"
                    alt="Authentic BaZi reading client review from Reddit - Chinese astrology testimonial showing satisfied customer feedback"
                    width={400}
                    height={400}
                    loading="lazy"
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center hidden" aria-hidden="true">
                    <span className="text-slate-500 text-sm">BaZi Review Image</span>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-8 h-8 bg-orange-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">r</span>
                      </div>
                      <p className="text-sm font-medium">Click to enlarge</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reddit Review 2 */}
              <div 
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                onClick={() => handleRedditReviewClick({ id: 2, image: "/images/reddit-reviews/reddit-review-2.jpg" })}
              >
                <div className="relative overflow-hidden rounded-lg border-2 border-slate-200 hover:border-amber-400 transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/20">
                  <img
                    src="/images/reddit-reviews/reddit-review-2.jpg"
                    alt="Real BaZi consultation review from Reddit - Chinese numerology client testimonial with positive feedback"
                    width={400}
                    height={400}
                    loading="lazy"
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center hidden" aria-hidden="true">
                    <span className="text-slate-500 text-sm">BaZi Review Image</span>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-8 h-8 bg-orange-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">r</span>
                      </div>
                      <p className="text-sm font-medium">Click to enlarge</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reddit Review 3 */}
              <div 
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                onClick={() => handleRedditReviewClick({ id: 3, image: "/images/reddit-reviews/reddit-review-3.jpg" })}
              >
                <div className="relative overflow-hidden rounded-lg border-2 border-slate-200 hover:border-amber-400 transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/20">
                  <img
                    src="/images/reddit-reviews/reddit-review-3.jpg"
                    alt="Genuine BaZi reading review from Reddit - Chinese astrology service testimonial from satisfied client"
                    width={400}
                    height={400}
                    loading="lazy"
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center hidden" aria-hidden="true">
                    <span className="text-slate-500 text-sm">BaZi Review Image</span>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-8 h-8 bg-orange-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">r</span>
                      </div>
                      <p className="text-sm font-medium">Click to enlarge</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reddit Review 4 */}
              <div 
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                onClick={() => handleRedditReviewClick({ id: 4, image: "/images/reddit-reviews/reddit-review-4.jpg" })}
              >
                <div className="relative overflow-hidden rounded-lg border-2 border-slate-200 hover:border-amber-400 transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/20">
                  <img
                    src="/images/reddit-reviews/reddit-review-4.jpg"
                    alt="Authentic BaZi consultation review from Reddit - Chinese numerology expert testimonial with client success story"
                    width={400}
                    height={400}
                    loading="lazy"
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center hidden" aria-hidden="true">
                    <span className="text-slate-500 text-sm">BaZi Review Image</span>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-8 h-8 bg-orange-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">r</span>
                      </div>
                      <p className="text-sm font-medium">Click to enlarge</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reddit Review 5 */}
              <div 
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                onClick={() => handleRedditReviewClick({ id: 5, image: "/images/reddit-reviews/reddit-review-5.jpg" })}
              >
                <div className="relative overflow-hidden rounded-lg border-2 border-slate-200 hover:border-amber-400 transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/20">
                  <img
                    src="/images/reddit-reviews/reddit-review-5.jpg"
                    alt="Real BaZi reading client review from Reddit - Chinese astrology service feedback from happy customer"
                    width={400}
                    height={400}
                    loading="lazy"
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center hidden" aria-hidden="true">
                    <span className="text-slate-500 text-sm">BaZi Review Image</span>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-8 h-8 bg-orange-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">r</span>
                      </div>
                      <p className="text-sm font-medium">Click to enlarge</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reddit Review 6 */}
              <div 
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                onClick={() => handleRedditReviewClick({ id: 6, image: "/images/reddit-reviews/reddit-review-6.jpg" })}
              >
                <div className="relative overflow-hidden rounded-lg border-2 border-slate-200 hover:border-amber-400 transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/20">
                  <img
                    src="/images/reddit-reviews/reddit-review-6.jpg"
                    alt="Genuine BaZi consultation review from Reddit - Chinese numerology testimonial showing professional service quality"
                    width={400}
                    height={400}
                    loading="lazy"
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center hidden" aria-hidden="true">
                    <span className="text-slate-500 text-sm">BaZi Review Image</span>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-8 h-8 bg-orange-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">r</span>
                      </div>
                      <p className="text-sm font-medium">Click to enlarge</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reddit Review 7 */}
              <div 
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                onClick={() => handleRedditReviewClick({ id: 7, image: "/images/reddit-reviews/reddit-review-7.jpg" })}
              >
                <div className="relative overflow-hidden rounded-lg border-2 border-slate-200 hover:border-amber-400 transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/20">
                  <img
                    src="/images/reddit-reviews/reddit-review-7.jpg"
                    alt="Authentic BaZi reading review from Reddit - Chinese astrology client testimonial with detailed feedback"
                    width={400}
                    height={400}
                    loading="lazy"
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center hidden" aria-hidden="true">
                    <span className="text-slate-500 text-sm">BaZi Review Image</span>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-8 h-8 bg-orange-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">r</span>
                      </div>
                      <p className="text-sm font-medium">Click to enlarge</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reddit Review 8 */}
              <div 
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                onClick={() => handleRedditReviewClick({ id: 8, image: "/images/reddit-reviews/reddit-review-8.jpg" })}
              >
                <div className="relative overflow-hidden rounded-lg border-2 border-slate-200 hover:border-amber-400 transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/20">
                  <img
                    src="/images/reddit-reviews/reddit-review-8.jpg"
                    alt="Real BaZi consultation review from Reddit - Chinese numerology expert service testimonial from satisfied client"
                    width={400}
                    height={400}
                    loading="lazy"
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center hidden" aria-hidden="true">
                    <span className="text-slate-500 text-sm">BaZi Review Image</span>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-8 h-8 bg-orange-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">r</span>
                      </div>
                      <p className="text-sm font-medium">Click to enlarge</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reddit Review 9 */}
              <div 
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                onClick={() => handleRedditReviewClick({ id: 9, image: "/images/reddit-reviews/reddit-review-9.jpg" })}
              >
                <div className="relative overflow-hidden rounded-lg border-2 border-slate-200 hover:border-amber-400 transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/20">
                  <img
                    src="/images/reddit-reviews/reddit-review-9.jpg"
                    alt="Genuine BaZi reading client review from Reddit - Chinese astrology testimonial with positive customer experience"
                    width={400}
                    height={400}
                    loading="lazy"
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center hidden" aria-hidden="true">
                    <span className="text-slate-500 text-sm">BaZi Review Image</span>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-8 h-8 bg-orange-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">r</span>
                      </div>
                      <p className="text-sm font-medium">Click to enlarge</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reddit Review 10 */}
              <div 
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                onClick={() => handleRedditReviewClick({ id: 10, image: "/images/reddit-reviews/reddit-review-10.jpg" })}
              >
                <div className="relative overflow-hidden rounded-lg border-2 border-slate-200 hover:border-amber-400 transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/20">
                  <img
                    src="/images/reddit-reviews/reddit-review-10.jpg"
                    alt="Authentic BaZi consultation review from Reddit - Chinese numerology service testimonial from happy client"
                    width={400}
                    height={400}
                    loading="lazy"
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center hidden" aria-hidden="true">
                    <span className="text-slate-500 text-sm">BaZi Review Image</span>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-8 h-8 bg-orange-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">r</span>
                      </div>
                      <p className="text-sm font-medium">Click to enlarge</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12">
              <p className="text-slate-600 mb-4">
                Join thousands of satisfied clients who have discovered their destiny through BaZi analysis
              </p>
              <Link
                to="/testimonials"
                className="inline-flex items-center space-x-2 bg-amber-400 text-slate-900 py-3 px-6 rounded-lg font-semibold hover:bg-amber-300 transition-all duration-300"
              >
                <span>View All Reviews</span>
                <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* American Celebrity BaZi Analysis Examples */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-playfair font-semibold text-slate-900 mb-6 tracking-tight">
                BaZi Analysis Examples
              </h2>
              <p className="text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed">
                Through real cases, demonstrate the accuracy and practicality of BaZi destiny analysis
              </p>
            </div>
            
            {/* Tom Cruise Analysis */}
            <div className="bg-white p-12 rounded-lg border border-slate-200 shadow-lg">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-playfair font-semibold text-slate-900 mb-4">
                  Tom Cruise - Hollywood Superstar
                </h3>
                <p className="text-slate-700 text-lg">
                  July 3, 1962, 12:00 PM, Syracuse, New York, USA
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-center">
                  <img 
                    src="/images/celebrities/tom-cruise.jpg" 
                    alt="Tom Cruise BaZi Analysis" 
                    width={192}
                    height={192}
                    loading="lazy"
                    className="w-48 h-48 rounded-full mx-auto mb-6 object-cover border-4 border-amber-200"
                  />
                  <p className="text-slate-700 text-sm">
                    Tom Cruise's BaZi chart reveals his extraordinary career timing and success patterns
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-playfair font-semibold text-slate-900 mb-2">Career Success Pattern</h4>
                    <p className="text-slate-700 leading-relaxed">
                      Tom Cruise's BaZi chart shows a strong Fire element with Metal support, creating the perfect 
                      combination for entertainment industry success. His chart indicates peak performance periods 
                      that align with his biggest box office hits.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-playfair font-semibold text-slate-900 mb-2">Timing for Success</h4>
                    <p className="text-slate-700 leading-relaxed">
                      His chart reveals that 1986-1996 was a "Golden Period" for career breakthroughs, 
                      perfectly matching his rise to stardom with films like "Top Gun" and "Rain Man." 
                      The 2000s brought another peak with the "Mission: Impossible" series.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-playfair font-semibold text-slate-900 mb-2">Personality Traits</h4>
                    <p className="text-slate-700 leading-relaxed">
                      His strong Fire element explains his charismatic personality, intense work ethic, 
                      and ability to perform dangerous stunts. The Metal element gives him precision, 
                      discipline, and the drive for perfection that defines his acting career.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-8 p-6 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-slate-700 italic">
                  "Through correctly understanding one's innate talents and combining with unremitting effort, 
                  everyone can create miracles based on destiny."
                </p>
              </div>
            </div>

            {/* Steve Jobs Analysis */}
            <div className="bg-white p-12 rounded-lg border border-slate-200 shadow-lg mt-12">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-playfair font-semibold text-slate-900 mb-4">
                  Steve Jobs - Tech Visionary & Apple Co-founder
                </h3>
                <p className="text-slate-700 text-lg">
                  February 24, 1955, 7:15 PM, San Francisco, California, USA
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-center">
                  <img 
                    src="/images/celebrities/steve-jobs.jpg" 
                    alt="Steve Jobs BaZi Analysis" 
                    width={192}
                    height={192}
                    loading="lazy"
                    className="w-48 h-48 rounded-full mx-auto mb-6 object-cover border-4 border-amber-200"
                  />
                  <p className="text-slate-700 text-sm">
                    Steve Jobs' BaZi chart reveals his revolutionary innovation timing and leadership patterns
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-playfair font-semibold text-slate-900 mb-2">Innovation Leadership Pattern</h4>
                    <p className="text-slate-700 leading-relaxed">
                      Steve Jobs' BaZi chart shows a strong Wood element with Fire support, creating the perfect 
                      combination for technological innovation and visionary leadership. His chart indicates 
                      breakthrough periods that align with Apple's major product launches.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-playfair font-semibold text-slate-900 mb-2">Revolutionary Timing</h4>
                    <p className="text-slate-700 leading-relaxed">
                      His chart reveals that 1976-1985 was a "Wood-Fire Period" for founding and innovation, 
                      perfectly matching Apple's creation and the personal computer revolution. The 1997-2011 
                      period brought another peak with the iPod, iPhone, and iPad revolutions.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-playfair font-semibold text-slate-900 mb-2">Leadership Traits</h4>
                    <p className="text-slate-700 leading-relaxed">
                      His strong Wood element explains his visionary thinking, ability to see future trends, 
                      and relentless pursuit of perfection. The Fire element gives him the charisma, 
                      passion, and drive to inspire teams and revolutionize entire industries.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-8 p-6 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-slate-700 italic">
                  "Innovation distinguishes between a leader and a follower. Your BaZi chart reveals 
                  when you're destined to lead and when to follow your vision."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Master XuanYin Introduction */}
      <section className="py-24 bg-amber-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-playfair font-semibold text-slate-900 mb-8 tracking-tight">
                Master XuanYin
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-12 max-w-4xl mx-auto">
                Devoted to studying BaZi destiny analysis for decades, proficient in traditional Chinese destiny analysis, 
                committed to helping people understand their destiny codes, find their life direction, and achieve their goals.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center">
                <img 
                  src="/images/master-profile.jpg" 
                  alt="Master XuanYin - BaZi Destiny Expert" 
                  width={320}
                  height={320}
                  loading="lazy"
                  className="w-80 h-80 rounded-full mx-auto mb-8 object-cover border-4 border-amber-200 shadow-xl"
                />
                <h3 className="text-2xl font-playfair font-semibold text-slate-900 mb-4">
                  BaZi Destiny Expert & Traditional Chinese Numerology Master
                </h3>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-sm">
                  <h3 className="text-xl font-playfair font-semibold text-slate-900 mb-4">Professional Background</h3>
                  <p className="text-slate-700 leading-relaxed">
                    With over 15 years of experience in traditional Chinese numerology, Master XuanYin has 
                    studied under renowned masters and has helped hundreds of clients worldwide discover their 
                    true potential and life purpose through BaZi analysis.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-sm">
                  <h3 className="text-xl font-playfair font-semibold text-slate-900 mb-4">Theoretical Innovation</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Combining ancient wisdom with modern interpretation methods, Master XuanYin has developed 
                    unique insights into BaZi analysis, making this ancient knowledge accessible and practical 
                    for contemporary life challenges.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-sm">
                  <h3 className="text-xl font-playfair font-semibold text-slate-900 mb-4">Service Philosophy</h3>
                  <p className="text-slate-700 leading-relaxed">
                    "True destiny masters are not prophets, but life mentors. We must not only tell people how destiny is, 
                    but also guide people on how to face destiny, how to create better lives based on destiny."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Start Analysis Section */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-playfair font-semibold text-white mb-8 tracking-tight">
              Begin Your Destiny Journey
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Through professional BaZi analysis, understand your innate potential and find your life direction
            </p>
            
            <Link
              to="/free-bazi-report"
              className="inline-flex items-center space-x-2 bg-amber-400 text-slate-900 py-4 px-8 rounded-lg font-semibold text-xl hover:bg-amber-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span>Free BaZi Analysis</span>
              <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
            </Link>
            
            {/* Trust Indicators */}
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full mx-auto mb-4 flex items-center justify-center border border-amber-200">
                  <div className="text-2xl text-amber-600">⭐</div>
                </div>
                <h3 className="text-xl font-playfair font-semibold text-white mb-2">Professional Expertise</h3>
                <p className="text-slate-300">
                  15+ years of experience in traditional Chinese numerology
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full mx-auto mb-4 flex items-center justify-center border border-amber-200">
                  <div className="text-2xl text-amber-600">🌍</div>
                </div>
                <h3 className="text-xl font-playfair font-semibold text-white mb-2">Global Clients</h3>
                <p className="text-slate-300">
                  Helping people worldwide discover their life purpose
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full mx-auto mb-4 flex items-center justify-center border border-amber-200">
                  <div className="text-2xl text-amber-600">📊</div>
                </div>
                <h3 className="text-xl font-playfair font-semibold text-white mb-2">Proven Results</h3>
                <p className="text-slate-300">
                  Hundreds of satisfied clients with life-changing insights
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reddit Review Modal */}
      {selectedRedditReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={closeModal}>
          <div 
            className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-lg bg-white border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              ✕
            </button>
            
            {/* Image */}
            <img
              src={selectedRedditReview.image}
              alt={`Authentic BaZi reading client review ${selectedRedditReview.id} from Reddit - Chinese astrology testimonial showing satisfied customer feedback`}
              width={1200}
              height={1200}
              className="w-full h-auto max-h-[90vh] object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="w-full h-full bg-slate-200 flex items-center justify-center hidden" aria-hidden="true">
              <span className="text-slate-500">BaZi Review Image</span>
            </div>
          </div>
        </div>
      )}
    </main>
    </>
  )
}

export default Home
