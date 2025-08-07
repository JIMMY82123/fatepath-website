import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

const FAQ = () => {
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

    const faqData = [
    {
      question: "What is BaZi (八字) Analysis?",
      answer: "BaZi analysis is a fundamental component of traditional Chinese metaphysics, analyzing the year, month, day, and hour of your birth to understand your personality traits, life path, career development, and relationships. Based on Yin-Yang and Five Elements theory, BaZi reveals your innate potential, suitable career directions, and opportunities and challenges at different life stages."
    },
    {
      question: "What information do I need for BaZi analysis?",
      answer: "For BaZi analysis, I need your accurate birth information:<br/><br/>• <strong>Birth Date</strong>: Year, month, day<br/>• <strong>Birth Time</strong>: As precise as possible to the hour<br/>• <strong>Birth Location</strong>: City or region<br/>• <strong>Gender</strong>: Male/Female<br/><br/>The more precise your birth time, the more accurate the analysis. If you're unsure about the exact time, we can infer it based on your life experiences."
    },
    {
      question: "What can Love Compatibility Reading tell me?",
      answer: "Love compatibility reading compares two people's BaZi charts to reveal:<br/><br/>• <strong>Personality Compatibility</strong>: Whether your personalities complement each other<br/>• <strong>Emotional Patterns</strong>: How you behave in relationships<br/>• <strong>Potential Challenges</strong>: Possible conflicts and tensions<br/>• <strong>Relationship Development</strong>: How your relationship will evolve<br/>• <strong>Improvement Suggestions</strong>: How to enhance harmony<br/><br/>This helps you better understand your partner and build healthier relationships."
    },
    {
      question: "How do talismans work?",
      answer: "Talismans are personalized protective items based on traditional metaphysical principles:<br/><br/>• <strong>Personalized Design</strong>: Customized based on your BaZi chart and needs<br/>• <strong>Five Elements Balance</strong>: Supplements missing or weak elements in your chart<br/>• <strong>Energy Protection</strong>: Shields against negative energy and unfavorable influences<br/>• <strong>Psychological Support</strong>: Enhances confidence and positive mindset<br/>• <strong>Traditional Craftsmanship</strong>: Made using traditional methods and materials<br/><br/>Talisman effects vary by individual, but maintaining a positive mindset and proper usage is most important."
    },
    {
      question: "Do BaZi analysis results change?",
      answer: "BaZi analysis reveals your basic metaphysical structure, which is relatively stable. However:<br/><br/>• <strong>Luck Changes</strong>: Annual luck varies each year<br/>• <strong>Environment Matters</strong>: Living location and career choices affect luck<br/>• <strong>Mindset is Key</strong>: Positive attitude can improve fortune<br/>• <strong>Action is Crucial</strong>: Right actions help seize opportunities<br/><br/>The purpose of BaZi analysis isn't to predict fate, but to help you better understand yourself and make wise choices."
    },
    {
      question: "How long does it take to receive results?",
      answer: "Delivery times for different services:<br/><br/>• <strong>Detailed BaZi Reading</strong>: 3-5 business days<br/>• <strong>Love Compatibility Reading</strong>: 2-3 business days<br/>• <strong>Custom Talisman</strong>: 7-10 business days (including production time)<br/><br/>I'll send detailed analysis reports via email and provide follow-up text consultation support when needed."
    },
    {
      question: "Can consultations be done remotely?",
      answer: "Yes, all services can be conducted remotely:<br/><br/>• <strong>Online Analysis</strong>: Collect information through email and forms<br/>• <strong>Text Consultation</strong>: Communicate via email or WhatsApp text<br/>• <strong>Detailed Reports</strong>: Provide comprehensive written analysis reports<br/>• <strong>Ongoing Support</strong>: Provide continuous consultation and guidance<br/><br/>Remote consultation is equally professional and effective, ensuring detailed analysis reports and personalized advice."
    },
    {
      question: "How do you protect my privacy?",
      answer: "I highly value client privacy protection:<br/><br/>• <strong>Information Confidentiality</strong>: All personal information is strictly confidential<br/>• <strong>Secure Transmission</strong>: Use encrypted form systems<br/>• <strong>Data Deletion</strong>: Sensitive information can be deleted after analysis<br/>• <strong>Professional Ethics</strong>: Follow metaphysical practitioner ethics<br/>• <strong>Client Consent</strong>: Never share any information without consent<br/><br/>Your trust is very important to me, and I'll do everything possible to protect your privacy."
    },
    {
      question: "What if I have questions about the analysis results?",
      answer: "I provide complete follow-up support:<br/><br/>• <strong>Free Consultation</strong>: Free question answering within 7 days after analysis<br/>• <strong>Detailed Explanations</strong>: Explain any unclear points in detail<br/>• <strong>Personalized Advice</strong>: Provide suggestions based on your specific situation<br/>• <strong>Ongoing Support</strong>: Long-term metaphysical consultation services<br/>• <strong>Satisfaction Guarantee</strong>: Ensure you're satisfied with the service<br/><br/>My goal is to help you get maximum value, and you can contact me anytime with questions."
    },
    {
      question: "Is BaZi analysis accurate?",
      answer: "The accuracy of BaZi analysis depends on several factors:<br/><br/>• <strong>Information Accuracy</strong>: More precise birth time leads to more accurate analysis<br/>• <strong>Professional Level</strong>: Experienced practitioners provide more accurate analysis<br/>• <strong>Comprehensive Analysis</strong>: Analysis combining multiple dimensions<br/>• <strong>Personal Effort</strong>: Analysis results need to be combined with personal action<br/>• <strong>Continuous Verification</strong>: Verify analysis results through practice<br/><br/>BaZi analysis is ancient wisdom validated over thousands of years, with high reference value."
    }
  ]

  return (
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
             <span className="gradient-text">Frequently Asked</span>
             <br />
             <span className="text-white">Questions</span>
           </motion.h1>
           
           <motion.p 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="text-lg sm:text-xl text-mystic-300 max-w-2xl mx-auto mb-8 sm:mb-12"
           >
             Answers to common questions about BaZi analysis, love compatibility readings, and custom talismans
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
               Still have questions?
             </h3>
             <p className="text-sm sm:text-base text-mystic-300 mb-4 sm:mb-6">
               If you couldn't find the answer to your question here, feel free to contact me anytime
             </p>
             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
               <a
                 href="https://wa.me/your-whatsapp-number"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center justify-center px-4 sm:px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition-colors duration-300 text-sm sm:text-base"
               >
                 WhatsApp Consultation
               </a>
               <a
                 href="mailto:chenxiao0801@hotmail.com"
                 className="inline-flex items-center justify-center px-4 sm:px-6 py-3 bg-gold-500 hover:bg-gold-600 text-black font-semibold rounded-full transition-colors duration-300 text-sm sm:text-base"
               >
                 Email Consultation
               </a>
             </div>
           </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default FAQ 