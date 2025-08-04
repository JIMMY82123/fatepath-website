import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowLeft, Share2, BookOpen } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

const BlogPost = () => {
  const { slug } = useParams()

  // 博客文章数据 - 您可以在这里添加您的完整文章内容
  const blogPosts = [
    {
      id: 1,
      title: "Understanding Your Bazi Chart: A Beginner's Guide",
      excerpt: "Learn the fundamentals of Bazi (八字) analysis and how your birth chart reveals your life's blueprint. Discover the four pillars and their significance in Chinese astrology.",
      content: `
        <p class="mb-6 text-mystic-300 leading-relaxed">
          Bazi (八字), also known as the Four Pillars of Destiny, is one of the most profound systems of Chinese astrology. 
          It provides a comprehensive blueprint of your life based on the exact moment of your birth. In this guide, 
          we'll explore the fundamental concepts that make Bazi such a powerful tool for self-discovery and life planning.
        </p>

        <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">What is Bazi?</h2>
        <p class="mb-6 text-mystic-300 leading-relaxed">
          Bazi literally means "eight characters" in Chinese, referring to the four pairs of characters that represent 
          the year, month, day, and hour of your birth. Each pillar consists of a Heavenly Stem and an Earthly Branch, 
          creating a unique combination that reveals your personality, strengths, challenges, and life path.
        </p>

        <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">The Four Pillars</h2>
        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <div class="mystic-card p-6">
            <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-3">Year Pillar</h3>
            <p class="text-mystic-300 text-sm">Represents your family background, early life, and ancestral influences.</p>
          </div>
          <div class="mystic-card p-6">
            <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-3">Month Pillar</h3>
            <p class="text-mystic-300 text-sm">Shows your career path, social relationships, and life purpose.</p>
          </div>
          <div class="mystic-card p-6">
            <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-3">Day Pillar</h3>
            <p class="text-mystic-300 text-sm">Reveals your core personality, self-image, and inner nature.</p>
          </div>
          <div class="mystic-card p-6">
            <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-3">Hour Pillar</h3>
            <p class="text-mystic-300 text-sm">Indicates your later life, children, and ultimate destiny.</p>
          </div>
        </div>

        <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">The Five Elements</h2>
        <p class="mb-6 text-mystic-300 leading-relaxed">
          At the heart of Bazi analysis are the Five Elements: Wood, Fire, Earth, Metal, and Water. Each element 
          represents different aspects of life and personality traits. Understanding the balance and interaction 
          of these elements in your chart is crucial for accurate interpretation.
        </p>

        <div class="bg-gradient-to-r from-mystic-800 to-mystic-900 p-6 rounded-xl border border-gold-500/30 mb-8">
          <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-4">Key Insights from Your Bazi Chart:</h3>
          <ul class="space-y-2 text-mystic-300">
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Your natural talents and abilities</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Optimal career paths and timing</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Relationship compatibility patterns</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Health and wellness guidance</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Life challenges and growth opportunities</span>
            </li>
          </ul>
        </div>

        <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">How to Use This Knowledge</h2>
        <p class="mb-6 text-mystic-300 leading-relaxed">
          Understanding your Bazi chart is just the beginning. The real power comes from applying this knowledge 
          to make informed decisions about your career, relationships, and life choices. By aligning your actions 
          with your natural energy patterns, you can enhance your luck and create more favorable outcomes.
        </p>

        <div class="mystic-card p-6 border-l-4 border-gold-500/50 mb-8">
          <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-3">Pro Tip:</h3>
          <p class="text-mystic-300 text-sm">
            Your Bazi chart is not set in stone - it's a dynamic blueprint that evolves with time. 
            Understanding your chart helps you work with your natural energy rather than against it, 
            leading to greater harmony and success in all areas of life.
          </p>
        </div>

        <p class="mb-6 text-mystic-300 leading-relaxed">
          Ready to discover your unique Bazi blueprint? A professional reading can provide you with 
          detailed insights into your personality, career potential, relationship patterns, and life path. 
          Contact me for a personalized analysis that will illuminate your path forward.
        </p>
      `,
      category: "bazi-basics",
      categoryLabel: "Bazi Basics",
      date: "2024-01-15",
      readTime: "8 min read",
      image: "/images/blog/bazi-basics.jpg",
      slug: "understanding-bazi-chart-beginners-guide",
      author: "玄印 (Xuan Yin)",
      tags: ["Bazi", "Chinese Astrology", "Four Pillars", "Five Elements"]
    },
    {
      id: 5,
      title: "2024 Year of the Dragon: Your Fortune Forecast",
      excerpt: "Discover what the Year of the Dragon 2024 holds for you based on your Bazi chart. Learn about opportunities, challenges, and how to maximize your luck this year.",
      content: `
        <p class="mb-6 text-mystic-300 leading-relaxed">
          The Year of the Dragon 2024 brings powerful energy of transformation, ambition, and success. 
          As we enter this auspicious year, understanding how the Dragon's energy interacts with your 
          personal Bazi chart can help you navigate opportunities and challenges with greater wisdom.
        </p>

        <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">The Dragon's Energy in 2024</h2>
        <p class="mb-6 text-mystic-300 leading-relaxed">
          2024 is the Year of the Wood Dragon, combining the dynamic energy of the Dragon with the 
          growth-oriented nature of Wood element. This combination creates a year of expansion, 
          innovation, and breakthrough opportunities. The Dragon's natural leadership qualities 
          combined with Wood's nurturing energy make this an excellent time for personal and 
          professional development.
        </p>

        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <div class="mystic-card p-6">
            <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-3">Dragon Characteristics</h3>
            <p class="text-mystic-300 text-sm">Powerful, ambitious, charismatic, and lucky. Dragons are natural leaders who attract success and abundance.</p>
          </div>
          <div class="mystic-card p-6">
            <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-3">Wood Element Influence</h3>
            <p class="text-mystic-300 text-sm">Growth, expansion, creativity, and flexibility. Wood energy supports new beginnings and sustainable development.</p>
          </div>
        </div>

        <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">How Dragon Year Affects Your Bazi</h2>
        <p class="mb-6 text-mystic-300 leading-relaxed">
          The Dragon year interacts with your personal Bazi chart in unique ways. Depending on your 
          birth year and the elements in your chart, 2024 may bring different opportunities and challenges. 
          Understanding these interactions can help you make the most of this powerful year.
        </p>

        <div class="bg-gradient-to-r from-mystic-800 to-mystic-900 p-6 rounded-xl border border-gold-500/30 mb-8">
          <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-4">2024 Dragon Year Opportunities:</h3>
          <ul class="space-y-2 text-mystic-300">
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Career advancement and leadership opportunities</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Financial growth and investment success</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Romantic relationships and social connections</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Personal transformation and spiritual growth</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Creative projects and innovative ideas</span>
            </li>
          </ul>
        </div>

        <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">Element Compatibility Guide</h2>
        <p class="mb-6 text-mystic-300 leading-relaxed">
          Your personal element combination determines how harmoniously you'll work with the Dragon's energy. 
          Here's what to expect based on your dominant elements:
        </p>

        <div class="space-y-4 mb-8">
          <div class="mystic-card p-6 border-l-4 border-green-500/50">
            <h3 class="text-lg font-cinzel font-semibold text-green-400 mb-3">Wood Element (Most Favorable)</h3>
            <p class="text-mystic-300 text-sm">
              Excellent year for growth and expansion. Your natural creativity and flexibility will be amplified. 
              Focus on new projects and personal development.
            </p>
          </div>
          <div class="mystic-card p-6 border-l-4 border-red-500/50">
            <h3 class="text-lg font-cinzel font-semibold text-red-400 mb-3">Metal Element (Challenging)</h3>
            <p class="text-mystic-300 text-sm">
              May face some resistance and conflicts. Use this energy to strengthen your resolve and overcome obstacles. 
              Patience and persistence will be key.
            </p>
          </div>
          <div class="mystic-card p-6 border-l-4 border-blue-500/50">
            <h3 class="text-lg font-cinzel font-semibold text-blue-400 mb-3">Water Element (Supportive)</h3>
            <p class="text-mystic-300 text-sm">
              Good year for wisdom and knowledge. Your adaptability will help you navigate changes successfully. 
              Focus on learning and communication.
            </p>
          </div>
        </div>

        <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">Maximizing Your Dragon Year Luck</h2>
        <p class="mb-6 text-mystic-300 leading-relaxed">
          To make the most of the Dragon's powerful energy, consider these strategic approaches:
        </p>

        <div class="mystic-card p-6 border-l-4 border-gold-500/50 mb-8">
          <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-3">Strategic Actions for 2024:</h3>
          <ul class="space-y-2 text-mystic-300 text-sm">
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Take calculated risks in career and business</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Invest in personal development and education</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Strengthen relationships and build networks</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Practice gratitude and positive thinking</span>
            </li>
          </ul>
        </div>

        <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">Personalized Dragon Year Reading</h2>
        <p class="mb-6 text-mystic-300 leading-relaxed">
          While this general forecast provides valuable insights, a personalized Bazi reading can reveal 
          exactly how the Dragon year will affect your specific chart. This detailed analysis can help you:
        </p>

        <div class="bg-gradient-to-r from-mystic-800 to-mystic-900 p-6 rounded-xl border border-gold-500/30 mb-8">
          <ul class="space-y-2 text-mystic-300">
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Identify the best months for important decisions</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Understand potential challenges and how to overcome them</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Discover hidden opportunities in your chart</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Learn specific strategies for your unique energy pattern</span>
            </li>
          </ul>
        </div>

        <p class="mb-6 text-mystic-300 leading-relaxed">
          The Year of the Dragon 2024 is a powerful time for transformation and success. By understanding 
          how this energy interacts with your personal Bazi chart, you can navigate the year with greater 
          confidence and purpose. Contact me for a personalized Dragon Year reading that will illuminate 
          your path to success in 2024.
        </p>
      `,
      category: "bazi-basics",
      categoryLabel: "Bazi Basics",
      date: "2024-01-20",
      readTime: "14 min read",
      image: "/images/blog/dragon-year-2024.jpg",
      slug: "2024-year-dragon-fortune-forecast",
      author: "玄印 (Xuan Yin)",
      tags: ["Dragon Year", "2024", "Bazi", "Chinese Astrology", "Fortune Forecast"]
    },
    {
      id: 6,
      title: "When Bitcoin Falls, What Does Destiny Say?",
      excerpt: "Explore how BaZi destiny charts and metaphysical timing reveal deeper insights into financial volatility like the August 2025 Bitcoin crash.",
      content: `
        <div class="mb-8">
          <p class="text-lg text-mystic-300 leading-relaxed mb-4">
            August 2nd, 2025: Bitcoin dropped sharply, shaking crypto investors worldwide. But from the lens of BaZi (Four Pillars of Destiny), was this purely market-driven—or was it part of a cosmic rhythm?
          </p>
        </div>

        <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">🪐 The Hidden Cycles Behind Financial Shocks</h2>
        <p class="mb-6 text-mystic-300 leading-relaxed">
          In Chinese metaphysics, financial movements aren't just numbers or trends. They're <strong>manifestations of collective Qi</strong>, responding to temporal shifts in energy, cosmic alignments, and mass psychological states.
        </p>

        <p class="mb-6 text-mystic-300 leading-relaxed">
          2025 is the <strong>Yi Si year (乙巳)</strong> in BaZi. This is a year dominated by <strong>Yin Wood over Yin Fire</strong>, a combination associated with:
        </p>

        <div class="bg-gradient-to-r from-mystic-800 to-mystic-900 p-6 rounded-xl border border-gold-500/30 mb-8">
          <ul class="space-y-2 text-mystic-300">
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span><strong>Unstable heat</strong> (fire flaring, then collapsing)</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span><strong>Surface optimism with hidden volatility</strong></span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
              <span><strong>Financial illusion and speculative risk</strong></span>
            </li>
          </ul>
        </div>

        <p class="mb-6 text-mystic-300 leading-relaxed">
          When this energy clashes with a person's own BaZi chart—especially those with strong Fire or Wood dominance—it can trigger impulsive decisions, overconfidence in investments, or sudden wealth loss.
        </p>

        <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">📊 Bitcoin's Decline: More Than Just Numbers?</h2>
        <p class="mb-6 text-mystic-300 leading-relaxed">
          From a metaphysical perspective, August 2nd's dip may correlate with a specific energy day. For instance, in the <strong>lunar calendar</strong>, this day was a clash day (e.g., a clash between the day's stem and the year branch), which tends to trigger <strong>loss, correction, or exposure</strong> in unseen areas.
        </p>

        <p class="mb-6 text-mystic-300 leading-relaxed">
          If your personal chart is in a <strong>Wealth Clash</strong> year or running a <strong>Losing Wealth Luck cycle</strong>, you're more likely to be emotionally impacted or make poor trades.
        </p>

        <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">🔮 What Your BaZi Might Reveal</h2>
        <p class="mb-6 text-mystic-300 leading-relaxed">
          Here are a few tips:
        </p>

        <div class="space-y-4 mb-8">
          <div class="mystic-card p-6 border-l-4 border-red-500/50">
            <h3 class="text-lg font-cinzel font-semibold text-red-400 mb-3">Clash with your Wealth Star</h3>
            <p class="text-mystic-300 text-sm">
              (e.g., Day Master clashing with Output or Wealth pillars) → prone to sudden losses
            </p>
          </div>
          <div class="mystic-card p-6 border-l-4 border-orange-500/50">
            <h3 class="text-lg font-cinzel font-semibold text-orange-400 mb-3">Weak Day Master with strong Wealth</h3>
            <p class="text-mystic-300 text-sm">
              → often tempted by "get-rich-quick" schemes
            </p>
          </div>
          <div class="mystic-card p-6 border-l-4 border-yellow-500/50">
            <h3 class="text-lg font-cinzel font-semibold text-yellow-400 mb-3">Too many Fire elements in 2025</h3>
            <p class="text-mystic-300 text-sm">
              → high volatility, overreactions
            </p>
          </div>
          <div class="mystic-card p-6 border-l-4 border-green-500/50">
            <h3 class="text-lg font-cinzel font-semibold text-green-400 mb-3">Earth Day Masters (Wu, Ji)</h3>
            <p class="text-mystic-300 text-sm">
              might actually gain stability this year if they stay grounded
            </p>
          </div>
        </div>

        <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">🧘‍♂️ Energy Management Over Market Timing</h2>
        <p class="mb-6 text-mystic-300 leading-relaxed">
          Markets are ruled by data; destinies are ruled by timing.<br>
          But both can benefit from <strong>awareness and alignment</strong>.
        </p>

        <p class="mb-6 text-mystic-300 leading-relaxed">
          BaZi teaches us that it's not about <strong>beating the system</strong>, but <strong>riding the wave that matches your own fate</strong>. Knowing when to act, pause, or change strategies can make the difference between success and chaos.
        </p>

        <div class="mystic-card p-6 border-l-4 border-gold-500/50 mb-8">
          <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-3">Key Insight:</h3>
          <p class="text-mystic-300 text-sm">
            Understanding your personal wealth cycles through BaZi can help you make more informed financial decisions, 
            especially during volatile market periods like the August 2025 Bitcoin crash.
          </p>
        </div>

        <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">✍️ Final Thought</h2>
        <p class="mb-6 text-mystic-300 leading-relaxed">
          If this Bitcoin crash hit you harder than expected, maybe it's not just the market—it's your cycle calling for reflection.
        </p>

        <div class="bg-gradient-to-r from-mystic-800 to-mystic-900 p-6 rounded-xl border border-gold-500/30 mb-8">
          <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-4">Ready to Understand Your Wealth Destiny?</h3>
          <p class="text-mystic-300 mb-4">
            Would you like a personalized reading to understand your wealth luck for 2025 and beyond?
          </p>
          <p class="text-mystic-300 text-sm">
            A detailed BaZi analysis can reveal your wealth patterns, optimal investment timing, and how to navigate financial volatility based on your unique destiny chart.
          </p>
        </div>
      `,
      category: "career-timing",
      categoryLabel: "Career & Timing",
      date: "2025-08-02",
      readTime: "12 min read",
                image: "/images/blog/bitcoin-bazi-cover.jpg",
      slug: "bitcoin-crash-bazi-destiny",
      author: "玄印 (Xuan Yin)",
             tags: ["Bitcoin", "Cryptocurrency", "BaZi", "Wealth Cycles", "Financial Timing", "2025"]
     },
     {
       id: 7,
       title: "Burned by the Heat: What 2025's Extreme Temperatures Reveal in BaZi",
       excerpt: "Explore how global heatwaves reflect deeper Fire element imbalances in Chinese metaphysics, and what your BaZi chart reveals about stress, health, and destiny in 2025.",
       content: `
         <div class="mb-8">
           <p class="text-lg text-mystic-300 leading-relaxed mb-4">
             As the world burns, what does your chart say about your internal fire?
           </p>
         </div>

         <p class="mb-6 text-mystic-300 leading-relaxed">
           On August 2nd, 2025, cities across the U.S., Europe, and Asia hit record-breaking temperatures—many exceeding 48°C (118°F). Power grids struggled, tempers flared, and millions suffered under dangerous heat conditions. But what if this global heatwave isn't just meteorological?
         </p>

         <p class="mb-6 text-mystic-300 leading-relaxed">
           From a BaZi perspective, <strong>2025 is a Fire-dominant year</strong>, and the world's temperature spikes may be echoing a deeper <strong>Qi imbalance</strong>.
         </p>

         <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">🪐 2025: The Fire Element Ignites</h2>
         <p class="mb-6 text-mystic-300 leading-relaxed">
           This year is ruled by the stem-branch combination <strong>Yi Si (乙巳)</strong>—Yin Wood over Yin Fire. That's already a volatile mix. But globally, we are also experiencing:
         </p>

         <div class="bg-gradient-to-r from-mystic-800 to-mystic-900 p-6 rounded-xl border border-gold-500/30 mb-8">
           <ul class="space-y-2 text-mystic-300">
             <li class="flex items-start space-x-3">
               <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
               <span>Solar flares and high UV intensity</span>
             </li>
             <li class="flex items-start space-x-3">
               <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
               <span>Political aggression and social anger</span>
             </li>
             <li class="flex items-start space-x-3">
               <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
               <span>Collective burnout and anxiety</span>
             </li>
           </ul>
         </div>

         <p class="mb-6 text-mystic-300 leading-relaxed">
           In metaphysics, the <strong>Fire element</strong> governs:
         </p>

         <div class="grid md:grid-cols-2 gap-6 mb-8">
           <div class="mystic-card p-6">
             <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-3">Physical Aspects</h3>
             <p class="text-mystic-300 text-sm">The heart (physical and emotional), blood pressure, inflammation, strokes</p>
           </div>
           <div class="mystic-card p-6">
             <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-3">Emotional Aspects</h3>
             <p class="text-mystic-300 text-sm">Impulse, anger, ego, and inflamed decisions</p>
           </div>
         </div>

         <p class="mb-6 text-mystic-300 leading-relaxed">
           When the Fire element becomes <strong>excessive</strong>, both nature and people <strong>burn out</strong>.
         </p>

         <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">📊 How Fire Imbalance Affects You</h2>
         <p class="mb-6 text-mystic-300 leading-relaxed">
           Your BaZi chart determines how the annual Fire energy affects you:
         </p>

         <div class="space-y-4 mb-8">
           <div class="mystic-card p-6 border-l-4 border-blue-500/50">
             <h3 class="text-lg font-cinzel font-semibold text-blue-400 mb-3">Strong Metal or Water Day Masters (Geng, Xin, Ren, Gui)</h3>
             <p class="text-mystic-300 text-sm">
               Likely to feel drained, overheated, or emotionally unstable
             </p>
           </div>
           <div class="mystic-card p-6 border-l-4 border-green-500/50">
             <h3 class="text-lg font-cinzel font-semibold text-green-400 mb-3">Wood Day Masters (Jia, Yi)</h3>
             <p class="text-mystic-300 text-sm">
               May feel pushed toward over-action, restlessness, and rash decisions
             </p>
           </div>
           <div class="mystic-card p-6 border-l-4 border-red-500/50">
             <h3 class="text-lg font-cinzel font-semibold text-red-400 mb-3">Fire-heavy charts</h3>
             <p class="text-mystic-300 text-sm">
               Risk of burnout, anxiety, and digestive issues
             </p>
           </div>
           <div class="mystic-card p-6 border-l-4 border-yellow-500/50">
             <h3 class="text-lg font-cinzel font-semibold text-yellow-400 mb-3">Earth Day Masters (Wu, Ji)</h3>
             <p class="text-mystic-300 text-sm">
               Might thrive if Fire is your resource star—more energy, more clarity
             </p>
           </div>
         </div>

         <p class="mb-6 text-mystic-300 leading-relaxed">
           If your BaZi luck cycle already includes strong Fire, <strong>2025 may feel overwhelming</strong>.
         </p>

         <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">🧘 Tips for Harmonizing Fire in 2025</h2>
         <p class="mb-6 text-mystic-300 leading-relaxed">
           To protect your energy and align with cosmic flow:
         </p>

         <div class="bg-gradient-to-r from-mystic-800 to-mystic-900 p-6 rounded-xl border border-gold-500/30 mb-8">
           <ul class="space-y-2 text-mystic-300">
             <li class="flex items-start space-x-3">
               <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
               <span><strong>Avoid spicy, fried, or greasy food</strong> – nourish with cooling foods (melon, lotus root, mung bean soup)</span>
             </li>
             <li class="flex items-start space-x-3">
               <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
               <span><strong>Bring Water into your daily routine</strong> – physically (hydration, showers) and energetically (Blue colors, Moon imagery)</span>
             </li>
             <li class="flex items-start space-x-3">
               <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
               <span><strong>Use protective talismans</strong> based on Water or Metal – these control or balance Fire in classical Five Element theory</span>
             </li>
             <li class="flex items-start space-x-3">
               <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
               <span><strong>Sleep early, meditate often, rest the Heart spirit (神)</strong></span>
             </li>
             <li class="flex items-start space-x-3">
               <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
               <span>Consider adjusting <strong>feng shui</strong> (e.g., remove excessive red/fire colors from bedroom)</span>
             </li>
           </ul>
         </div>

         <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">🔮 Final Thought</h2>
         <p class="mb-6 text-mystic-300 leading-relaxed">
           The external heat reflects the internal Fire many are struggling with. BaZi isn't about fearing the elements—it's about understanding when they're <strong>out of sync</strong> with you.
         </p>

         <p class="mb-6 text-mystic-300 leading-relaxed">
           If you're feeling drained, angry, burned out, or restless this year… maybe it's not just the weather.
         </p>

         <div class="mystic-card p-6 border-l-4 border-gold-500/50 mb-8">
           <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-3">Ready to Understand Your Fire Balance?</h3>
           <p class="text-mystic-300 text-sm">
             Would you like a personalized reading to understand how the 2025 Fire energy affects your specific BaZi chart? 
             A detailed analysis can reveal your Fire element balance and provide specific strategies for harmonizing your energy this year.
           </p>
         </div>
       `,
       category: "bazi-basics",
       categoryLabel: "Bazi Basics",
       date: "2025-08-02",
       readTime: "10 min read",
       image: "/images/blog/heatwave-bazi-cover.jpg",
       slug: "heatwave-bazi-fire-imbalance",
       author: "玄印 (Xuan Yin)",
       tags: ["Heatwave", "Fire Element", "BaZi", "2025", "Health", "Energy Balance", "Climate"]
     },
     {
       id: 8,
       title: "🌿 The Seasons of Fate: Why You Don't Have to Panic About Every Downturn",
       excerpt: "Discover how BaZi reveals that life's challenges are natural cycles, not punishments. Learn to flow with your destiny's seasons instead of fighting against them.",
       content: `
         <div class="mb-8">
           <p class="text-lg text-mystic-300 leading-relaxed mb-4 italic">
             "A river flows because it bends. A tree survives because it yields."
           </p>
           <p class="text-sm text-mystic-400">—Ancient Chinese proverb</p>
         </div>
         
         <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">💭 When Life Feels Stuck or Heavy</h2>
         <p class="mb-6 text-mystic-300 leading-relaxed">
           There are days when things simply don't go our way.
         </p>
         <p class="mb-6 text-mystic-300 leading-relaxed">
           The job opportunity slips away. The person we love grows distant. The finances get tight. In those moments, it's easy to feel anxious, as if you've missed your only chance, or that something must be "wrong" with your life path.
         </p>
         <p class="mb-6 text-mystic-300 leading-relaxed">
           But in BaZi—the ancient Chinese art of destiny mapping—these fluctuations are natural, even necessary.
         </p>
         
         <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">🌗 Destiny Moves in Cycles, Not Straight Lines</h2>
         <p class="mb-6 text-mystic-300 leading-relaxed">
           In BaZi, every person is born with a chart made of Four Pillars—each shaped by the energy of the year, month, day, and hour of birth. These elements don't stay still—they interact with time, changing subtly every year, every decade.
         </p>
         <p class="mb-6 text-mystic-300 leading-relaxed">
           Sometimes, we enter a "high luck phase," where things seem to click.<br>
           Other times, we enter a "transitional phase," when challenges arise—not as punishment, but as part of the realignment.
         </p>
         <p class="mb-6 text-mystic-300 leading-relaxed">
           Just as nature has spring and winter, our lives go through growth seasons and rest seasons.
         </p>
         
         <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">🪨 The Power of Non-Resistance</h2>
         <p class="mb-6 text-mystic-300 leading-relaxed">
           When life slows down, the modern mind often panics.
         </p>
         <p class="mb-6 text-mystic-300 leading-relaxed">
           But ancient metaphysics teaches that resisting your current cycle only adds more imbalance. True power lies in understanding where you are in the flow—not forcing outcomes before their time.
         </p>
         <p class="mb-6 text-mystic-300 leading-relaxed">
           For example:
         </p>
         <div class="bg-gradient-to-r from-mystic-800 to-mystic-900 p-6 rounded-xl border border-gold-500/30 mb-8">
           <div class="mb-4">
             <p class="text-mystic-300 mb-2">
               <strong>A Water Day Master during a Fire-heavy year</strong> may feel anxious, unmotivated, or "burned out."
             </p>
             <p class="text-mystic-300 text-sm">→ The solution isn't to push harder, but to restore inner coolness and protect your energy.</p>
           </div>
           <div>
             <p class="text-mystic-300 mb-2">
               <strong>A Wood Day Master going through a Metal phase</strong> may feel "cut down" or misunderstood.
             </p>
             <p class="text-mystic-300 text-sm">→ But pruning often prepares the tree for deeper roots.</p>
           </div>
         </div>
         <p class="mb-6 text-mystic-300 leading-relaxed">
           Every BaZi chart contains both seeds of hardship and seeds of transformation.
         </p>
         
         <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">🍂 Why Hard Phases Don't Mean Bad Luck Forever</h2>
         <p class="mb-6 text-mystic-300 leading-relaxed">
           Many people worry that a difficult year or unlucky month defines their whole destiny. But nothing in BaZi is permanent.
         </p>
         <p class="mb-6 text-mystic-300 leading-relaxed">
           Even your most challenging cycle is just a part of your greater story.
         </p>
         <p class="mb-6 text-mystic-300 leading-relaxed">
           Some of the wisest, most successful people I've read for had extremely rough beginnings. But those "low tides" taught them to refine their path, to develop resilience, and to wait for the right wind.
         </p>
         <div class="mystic-card p-6 border-l-4 border-gold-500/50 mb-8">
           <p class="text-mystic-300 italic">
             🌬 In Chinese philosophy, "When the wind rises, even pigs can fly."<br>
             The key is to know when the wind is rising—and when to rest your wings.
           </p>
         </div>
         
         <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">🧭 How BaZi Helps (Without Fortune-Telling)</h2>
         <p class="mb-6 text-mystic-300 leading-relaxed">
           A proper BaZi reading isn't about "fortune telling."
         </p>
         <p class="mb-6 text-mystic-300 leading-relaxed">
           It's about giving you a map. A sense of timing. A recognition that you are not broken—you are just moving through your cycle.
         </p>
         <p class="mb-6 text-mystic-300 leading-relaxed">
           It's about showing you when to:
         </p>
         <div class="bg-gradient-to-r from-mystic-800 to-mystic-900 p-6 rounded-xl border border-gold-500/30 mb-8">
           <ul class="space-y-2 text-mystic-300">
             <li class="flex items-start space-x-3">
               <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
               <span><strong>Advance confidently</strong></span>
             </li>
             <li class="flex items-start space-x-3">
               <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
               <span><strong>Pause and regroup</strong></span>
             </li>
             <li class="flex items-start space-x-3">
               <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
               <span><strong>Adjust your environment</strong></span>
             </li>
             <li class="flex items-start space-x-3">
               <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
               <span><strong>Strengthen specific energies</strong> (Water, Wood, Metal, etc.)</span>
             </li>
             <li class="flex items-start space-x-3">
               <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
               <span>And most importantly, <strong>how to stop blaming yourself</strong> for natural seasons of difficulty.</span>
             </li>
           </ul>
         </div>
         
         <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">🌸 Final Words</h2>
         <p class="mb-6 text-mystic-300 leading-relaxed">
           If you're going through a hard time, know this:
         </p>
         <div class="grid md:grid-cols-3 gap-4 mb-8">
           <div class="mystic-card p-6 text-center">
             <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-2">You are not late.</h3>
           </div>
           <div class="mystic-card p-6 text-center">
             <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-2">You are not lost.</h3>
           </div>
           <div class="mystic-card p-6 text-center">
             <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-2">You are not being punished.</h3>
           </div>
         </div>
         <p class="mb-6 text-mystic-300 leading-relaxed">
           You're simply moving through your own rhythm—and in time, a new phase will begin.
         </p>
         <div class="mystic-card p-6 border-l-4 border-gold-500/50 mb-8">
           <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-3">Ready to Understand Your Cycles?</h3>
           <p class="text-mystic-300 text-sm">
             Would you like a personalized BaZi reading to understand your current life phase and how to navigate it with wisdom? 
             A detailed analysis can reveal your natural cycles and provide guidance for flowing with your destiny's seasons.
           </p>
         </div>
       `,
       category: "bazi-basics",
       categoryLabel: "Bazi Basics",
       date: "2025-08-04",
       readTime: "7 min read",
                image: "/images/blog/seasons-fate-cover.jpg",
       slug: "seasons-fate-cycles",
       author: "玄印 (Xuan Yin)",
       tags: ["Destiny Cycles", "BaZi", "Life Phases", "Resilience", "Chinese Philosophy", "Personal Growth", "Timing"]
     },
     {
       id: 9,
       title: "BaZi vs. MBTI: East Meets West in Personality and Destiny",
       excerpt: "Explore how ancient Chinese BaZi and Western MBTI personality systems complement each other. Discover the differences between destiny mapping and personality typing.",
       content: `
         <div class="mb-8">
           <p class="text-lg text-mystic-300 leading-relaxed mb-4">
             When it comes to answering the age-old question "Who am I?", both the East and West have developed rich frameworks for self-understanding. In the East, there's BaZi (Four Pillars of Destiny), and in the West, the MBTI (Myers-Briggs Type Indicator). Though these systems come from vastly different cultural and philosophical backgrounds, both aim to help us better understand ourselves and align with our path in life. Here's a lighthearted comparison of these two systems and how they can complement each other.
           </p>
         </div>

         <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">1. What is MBTI?</h2>
         <p class="mb-6 text-mystic-300 leading-relaxed">
           MBTI (Myers-Briggs Type Indicator) is a personality typology based on Carl Jung's theory of psychological types. It categorizes people along four dichotomies:
         </p>

         <div class="bg-gradient-to-r from-mystic-800 to-mystic-900 p-6 rounded-xl border border-gold-500/30 mb-8">
           <ul class="space-y-2 text-mystic-300">
             <li class="flex items-start space-x-3">
               <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
               <span><strong>Where you get your energy</strong> (Extraversion vs. Introversion)</span>
             </li>
             <li class="flex items-start space-x-3">
               <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
               <span><strong>How you take in information</strong> (Sensing vs. Intuition)</span>
             </li>
             <li class="flex items-start space-x-3">
               <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
               <span><strong>How you make decisions</strong> (Thinking vs. Feeling)</span>
             </li>
             <li class="flex items-start space-x-3">
               <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
               <span><strong>How you deal with the outside world</strong> (Judging vs. Perceiving)</span>
             </li>
           </ul>
         </div>

         <p class="mb-6 text-mystic-300 leading-relaxed">
           Your combination of preferences results in one of 16 personality types, such as INFP, ESTJ, ENTP, etc. MBTI reflects your cognitive style and behavioral tendencies—it's like a mirror showing who you are right now.
         </p>

         <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">2. What is BaZi?</h2>
         <p class="mb-6 text-mystic-300 leading-relaxed">
           BaZi, or the Four Pillars of Destiny, is a classical Chinese metaphysical system that interprets your destiny based on the date and time of your birth. Each person's birth data is converted into four pairs of characters (Heavenly Stems and Earthly Branches), reflecting the interplay of the Five Elements (Wood, Fire, Earth, Metal, Water).
         </p>

         <p class="mb-6 text-mystic-300 leading-relaxed">
           BaZi is based on objective birth information and reveals your life structure, elemental balance, strengths, weaknesses, and most importantly—the timing of your fortune cycles. It's often used for career planning, relationship insights, and forecasting periods of growth or challenge. Think of it as a life map: showing the terrain ahead.
         </p>

         <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">3. Key Differences</h2>
         <div class="overflow-x-auto mb-8">
           <table class="w-full border-collapse">
             <thead>
               <tr class="border-b border-mystic-700">
                 <th class="text-left p-4 text-gold-400 font-semibold">Aspect</th>
                 <th class="text-left p-4 text-gold-400 font-semibold">MBTI</th>
                 <th class="text-left p-4 text-gold-400 font-semibold">BaZi</th>
               </tr>
             </thead>
             <tbody>
               <tr class="border-b border-mystic-700/50">
                 <td class="p-4 text-mystic-300 font-medium">Origin</td>
                 <td class="p-4 text-mystic-300">Western psychology (Jung)</td>
                 <td class="p-4 text-mystic-300">Ancient Chinese metaphysics</td>
               </tr>
               <tr class="border-b border-mystic-700/50">
                 <td class="p-4 text-mystic-300 font-medium">Input</td>
                 <td class="p-4 text-mystic-300">Self-assessment questionnaire</td>
                 <td class="p-4 text-mystic-300">Exact birth date and time</td>
               </tr>
               <tr class="border-b border-mystic-700/50">
                 <td class="p-4 text-mystic-300 font-medium">Flexibility</td>
                 <td class="p-4 text-mystic-300">High – can change over time</td>
                 <td class="p-4 text-mystic-300">Fixed – based on birth moment</td>
               </tr>
               <tr class="border-b border-mystic-700/50">
                 <td class="p-4 text-mystic-300 font-medium">Focus</td>
                 <td class="p-4 text-mystic-300">Personality and preferences</td>
                 <td class="p-4 text-mystic-300">Life patterns and timing</td>
               </tr>
               <tr class="border-b border-mystic-700/50">
                 <td class="p-4 text-mystic-300 font-medium">Application</td>
                 <td class="p-4 text-mystic-300">Career fit, teamwork, self-awareness</td>
                 <td class="p-4 text-mystic-300">Timing of actions, fate alignment</td>
               </tr>
             </tbody>
           </table>
         </div>

         <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">4. Can They Work Together?</h2>
         <p class="mb-6 text-mystic-300 leading-relaxed">
           Absolutely. BaZi gives you the big picture—the life cycles and timing. MBTI tells you how you tend to operate in the present. For instance, if your BaZi indicates a wealth period is coming, and you're an ENTP, you might seize that opportunity through persuasive communication and risk-taking. If you're an ISFJ, you might accumulate wealth steadily through consistency and long-term dedication.
         </p>

         <div class="grid md:grid-cols-2 gap-6 mb-8">
           <div class="mystic-card p-6 border-l-4 border-blue-500/50">
             <h3 class="text-lg font-cinzel font-semibold text-blue-400 mb-3">MBTI: Your Operating System</h3>
             <p class="text-mystic-300 text-sm">
               How you naturally think, feel, and interact with the world. Your cognitive preferences and behavioral patterns.
             </p>
           </div>
           <div class="mystic-card p-6 border-l-4 border-gold-500/50">
             <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-3">BaZi: Your Life Map</h3>
             <p class="text-mystic-300 text-sm">
               The broader landscape of your destiny, timing of opportunities, and life cycles. Your elemental balance and fortune patterns.
             </p>
           </div>
         </div>

         <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">5. Practical Integration Examples</h2>
         <p class="mb-6 text-mystic-300 leading-relaxed">
           Here's how combining both systems can provide deeper insights:
         </p>

         <div class="space-y-4 mb-8">
           <div class="mystic-card p-6 border-l-4 border-green-500/50">
             <h3 class="text-lg font-cinzel font-semibold text-green-400 mb-3">Career Planning</h3>
             <p class="text-mystic-300 text-sm">
               <strong>BaZi:</strong> "Your wealth luck peaks in 2025-2027"<br>
               <strong>MBTI:</strong> "You're an INTJ who excels at strategic planning"<br>
               <strong>Combined insight:</strong> Use your strategic INTJ nature to prepare detailed plans during 2024, then execute when your BaZi wealth cycle begins.
             </p>
           </div>
           <div class="mystic-card p-6 border-l-4 border-purple-500/50">
             <h3 class="text-lg font-cinzel font-semibold text-purple-400 mb-3">Relationship Dynamics</h3>
             <p class="text-mystic-300 text-sm">
               <strong>BaZi:</strong> "You have strong Fire element, seek Water partners"<br>
               <strong>MBTI:</strong> "You're an ENFP who values emotional connection"<br>
               <strong>Combined insight:</strong> Your ENFP warmth can help you connect with Water element partners (who tend to be more reserved), creating balance.
             </p>
           </div>
           <div class="mystic-card p-6 border-l-4 border-orange-500/50">
             <h3 class="text-lg font-cinzel font-semibold text-orange-400 mb-3">Decision Making</h3>
             <p class="text-mystic-300 text-sm">
               <strong>BaZi:</strong> "You're in a Metal-heavy period, focus on precision"<br>
               <strong>MBTI:</strong> "You're an ISTP who trusts concrete data"<br>
               <strong>Combined insight:</strong> Your natural ISTP analytical skills align perfectly with the Metal period's need for precision and detail.
             </p>
           </div>
         </div>

         <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">6. Final Thoughts</h2>
         <p class="mb-6 text-mystic-300 leading-relaxed">
           BaZi is your map. MBTI is your compass. One shows the broader landscape of your life path, while the other helps you navigate day-to-day decisions with self-awareness. When used together, they can offer powerful insights—honoring both fate and free will.
         </p>

         <div class="mystic-card p-6 border-l-4 border-gold-500/50 mb-8">
           <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-3">Key Insight:</h3>
           <p class="text-mystic-300 text-sm">
             Understanding both systems allows you to work with your natural personality (MBTI) while aligning with your destiny's timing (BaZi). This creates a powerful synergy for personal growth and life success.
           </p>
         </div>

         <p class="mb-6 text-mystic-300 leading-relaxed">
           Why not explore both? Learn your destiny, know your nature, and walk your path with clarity and confidence.
         </p>

         <div class="bg-gradient-to-r from-mystic-800 to-mystic-900 p-6 rounded-xl border border-gold-500/30 mb-8">
           <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-4">Ready to Discover Your Complete Profile?</h3>
           <p class="text-mystic-300 mb-4">
             Would you like a comprehensive analysis that combines both BaZi destiny mapping and personality insights?
           </p>
           <p class="text-mystic-300 text-sm">
             A detailed reading can reveal how your personality type interacts with your destiny cycles, providing unique guidance for career, relationships, and personal development.
           </p>
         </div>
       `,
       category: "bazi-basics",
       categoryLabel: "Bazi Basics",
       date: "2025-08-04",
       readTime: "11 min read",
       image: "/images/blog/bazi-mbti-comparison.jpg",
       slug: "bazi-vs-mbti-personality-destiny",
       author: "玄印 (Xuan Yin)",
       tags: ["BaZi", "MBTI", "Personality", "Destiny", "Chinese Astrology", "Psychology", "Self-Discovery", "Career Guidance"]
     }
     // 您可以在这里添加更多文章
  ]

  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    return (
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mystic-card p-12"
          >
            <h1 className="text-3xl font-cinzel font-bold mb-4 text-white">
              Article Not Found
            </h1>
            <p className="text-mystic-300 mb-8">
              The article you're looking for doesn't exist or has been moved.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold px-6 py-3 rounded-lg hover:from-gold-400 hover:to-gold-500 transition-all duration-300"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Blog</span>
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 text-mystic-300 hover:text-gold-400 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Blog</span>
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          {/* Category Badge */}
          <div className="mb-4">
            <span className="px-4 py-2 bg-gold-500/90 text-black text-sm font-semibold rounded-full">
              {post.categoryLabel}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-cinzel font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-mystic-400 mb-8">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>By {post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback Placeholder */}
            <div className="hidden w-full h-full bg-gradient-to-br from-mystic-800 to-mystic-900 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-gold-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-3xl">📖</span>
                </div>
                <p className="text-mystic-300">Article Image</p>
              </div>
            </div>
          </div>

          {/* Tags */}
          {post.tags && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-mystic-800/50 border border-mystic-700/50 text-mystic-300 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Article Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-invert prose-gold max-w-none"
        >
          <div 
            className="text-mystic-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.div>

        {/* Share Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-mystic-700/50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-mystic-400">Share this article:</span>
              <button 
                onClick={() => {
                  const shareText = `📖 ${post.title}\n\n${post.excerpt}\n\nRead more at FatePath.me`;
                  const shareUrl = window.location.href;
                  
                  if (navigator.share) {
                    navigator.share({
                      title: post.title,
                      text: shareText,
                      url: shareUrl
                    });
                  } else {
                    // Fallback: copy to clipboard
                    navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`).then(() => {
                      alert('Article link copied to clipboard!');
                    });
                  }
                }}
                className="p-2 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-mystic-300 hover:text-gold-400 hover:border-gold-500/50 transition-colors"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold px-6 py-3 rounded-lg hover:from-gold-400 hover:to-gold-500 transition-all duration-300"
            >
              <span>Get Your Reading</span>
              <ArrowLeft className="h-5 w-5 rotate-180" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default BlogPost 