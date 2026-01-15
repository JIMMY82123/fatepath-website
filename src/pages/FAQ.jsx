import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import SEO from '../components/SEO'

const FAQ = () => {
  const { t } = useTranslation()
  const [openItems, setOpenItems] = useState(new Set([0])) // First item open by default

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  const faqData = useMemo(() => t('faq.questions', { returnObjects: true }), [t])

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer.replace(/<br\/?>/g, ' ')
      }
    }))
  }

  return (
    <>
      <SEO 
        title="Life Direction FAQ - Chinese Astrology & Career Guidance Questions | FatePath"
        description="Frequently asked questions about finding life direction, career guidance, and Chinese astrology. Get answers about feeling lost, stuck in life, and how BaZi analysis can help."
        keywords="life direction faq, career guidance questions, feeling lost, stuck in life, chinese astrology faq, bazi reading questions, chinese numerology faq, bazi analysis questions, love compatibility faq, custom talisman questions, chinese astrology expert answers"
        canonical={`${window.location.origin}/faq`}
        ogImage={`${window.location.origin}/images/bazi-reading.jpg`}
        ogType="website"
        structuredData={[faqStructuredData]}
      />
      <div className="min-h-screen bg-mystic-900 text-white">
       {/* Hero Section */}
       <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.8 }}
         className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8"
       >
         {/* Background Gradient */}
         <div className="absolute inset-0 bg-gradient-to-b from-mystic-900 via-mystic-900 to-mystic-900"></div>
        
        {/* Content */}
        <div className="relative max-w-4xl mx-auto text-center">
                     <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="text-3xl sm:text-4xl md:text-6xl font-cinzel font-bold mb-4 sm:mb-6"
           >
             <span className="gradient-text">{t('faq.heroTitle')}</span>
             <br />
             <span className="text-white">{t('faq.heroSubtitle')}</span>
           </motion.h1>
           
           <motion.p 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="text-lg sm:text-xl text-mystic-300 max-w-2xl mx-auto mb-8 sm:mb-12"
           >
             {t('faq.heroDescription')}
           </motion.p>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
      >
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="mystic-card border border-mystic-700/50 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex items-center justify-between hover:bg-mystic-800/50 transition-colors duration-200"
                aria-expanded={openItems.has(index)}
                aria-controls={`faq-content-${index}`}
                aria-label={`${openItems.has(index) ? 'Hide' : 'Show'} answer for: ${item.question}`}
              >
                <h3 className="text-base sm:text-lg font-cinzel font-semibold text-white pr-4">
                  {item.question}
                </h3>
                <div className="flex-shrink-0" aria-hidden="true">
                  {openItems.has(index) ? (
                    <ChevronUp className="h-5 w-5 text-gold-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gold-400" />
                  )}
                </div>
              </button>
              
              {openItems.has(index) && (
                <motion.div
                  id={`faq-content-${index}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-4"
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                >
                  <div 
                    className="text-sm sm:text-base text-mystic-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-center mt-16"
        >
                     <div className="mystic-card border border-gold-500/30 p-6 sm:p-8">
             <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-white mb-3 sm:mb-4">
               {t('faq.stillHaveQuestions')}
             </h3>
             <p className="text-sm sm:text-base text-mystic-300 mb-4 sm:mb-6">
               {t('faq.stillHaveQuestionsDesc')}
             </p>
             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
               <a
                 href="https://wa.me/8615914228258"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center justify-center px-4 sm:px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition-colors duration-300 text-sm sm:text-base"
               >
                 {t('faq.whatsappConsultation')}
               </a>
               <a
                 href="mailto:chenxiao0801@hotmail.com"
                 className="inline-flex items-center justify-center px-4 sm:px-6 py-3 bg-gold-500 hover:bg-gold-600 text-black font-semibold rounded-full transition-colors duration-300 text-sm sm:text-base"
               >
                 {t('faq.emailConsultation')}
               </a>
             </div>
           </div>
        </motion.div>
      </motion.div>
    </div>
    </>
  )
}

export default FAQ 