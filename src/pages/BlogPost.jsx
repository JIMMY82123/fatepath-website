import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowLeft, Share2, BookOpen } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

const BlogPost = () => {
  const { slug } = useParams()

  // 复制到剪贴板的辅助函数
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // 创建一个临时的成功提示
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 transform transition-all duration-300';
      notification.textContent = '链接已复制到剪贴板！';
      document.body.appendChild(notification);
      
      // 3秒后移除提示
      setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 2000);
    } catch (err) {
      console.error('复制失败:', err);
      // 后备方案：使用传统的复制方法
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      // 显示成功提示
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 transform transition-all duration-300';
      notification.textContent = '链接已复制到剪贴板！';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 2000);
    }
  };

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
     },
     {
       id: 10,
       title: "What is the Best Bazi for Wealth? Decoding Your Chinese Astrology Blueprint",
       excerpt: "Discover the 3 wealthiest Bazi patterns in Chinese metaphysics, how to activate your financial potential, and why 'wealth' is more than money. Based on 10,000+ client cases.",
       content: `
         <div class="mb-8">
           <p class="text-lg text-mystic-300 leading-relaxed mb-4 italic">
             "Wealth is not about having money, but about having options."
           </p>
           <p class="text-sm text-mystic-400">—Ancient Chinese wisdom</p>
         </div>

         <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">🔑 Beyond "Rich" Bazi</h2>
         <p class="mb-6 text-mystic-300 leading-relaxed">
           Many believe a "wealthy Bazi" means piles of cash, but true abundance in Chinese astrology combines resources, opportunities, and wisdom to grow them. Here, we decode real-world wealth patterns from billionaires' charts—and how to apply them to your life.
         </p>

         <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">🔑 Part 1: The 3 Wealth Archetypes in Bazi</h2>
         <p class="mb-6 text-mystic-300 leading-relaxed">
           <em>(Based on 10,000+ client cases)</em>
         </p>

         <div class="overflow-x-auto mb-8">
           <table class="w-full border-collapse">
             <thead>
               <tr class="border-b border-mystic-700">
                 <th class="text-left p-4 text-gold-400 font-semibold">Pattern</th>
                 <th class="text-left p-4 text-gold-400 font-semibold">Bazi Structure</th>
                 <th class="text-left p-4 text-gold-400 font-semibold">Real-World Example</th>
               </tr>
             </thead>
             <tbody>
               <tr class="border-b border-mystic-700/50">
                 <td class="p-4 text-mystic-300 font-medium">The Innovator</td>
                 <td class="p-4 text-mystic-300">Strong 食神 (Creativity Star) + 正财 (Steady Wealth)</td>
                 <td class="p-4 text-mystic-300">Elon Musk (Tech disruption)</td>
               </tr>
               <tr class="border-b border-mystic-700/50">
                 <td class="p-4 text-mystic-300 font-medium">The Strategist</td>
                 <td class="p-4 text-mystic-300">七杀 (Ambition Star) controlled by 印星 (Wisdom)</td>
                 <td class="p-4 text-mystic-300">Warren Buffett (Value investing)</td>
               </tr>
               <tr class="border-b border-mystic-700/50">
                 <td class="p-4 text-mystic-300 font-medium">The Networker</td>
                 <td class="p-4 text-mystic-300">偏财 (Opportunity Wealth) + 桃花 (Social Charm)</td>
                 <td class="p-4 text-mystic-300">Oprah Winfrey (Media empire)</td>
               </tr>
             </tbody>
           </table>
         </div>

         <!-- Wealth Archetypes Visualization -->
         <div class="my-8 text-center">
           <img src="/images/blog/wealth-archetypes.svg" alt="The 3 Wealth Archetypes in BaZi" class="w-full max-w-4xl mx-auto rounded-lg shadow-lg" />
           <p class="text-sm text-mystic-400 mt-2">Visual guide to the three main wealth patterns in BaZi analysis</p>
         </div>

         <div class="bg-gradient-to-r from-mystic-800 to-mystic-900 p-6 rounded-xl border border-gold-500/30 mb-8">
           <p class="text-mystic-300">
             <strong>💡 Key Insight:</strong> Your "wealth type" determines how you attract abundance—forcing a mismatched path (e.g., an Innovator doing routine jobs) blocks flow.
           </p>
         </div>

         <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">🌟 Part 2: Your Hidden Wealth Codes</h2>
         
         <h3 class="text-xl font-cinzel font-semibold text-gold-400 mb-4 mt-6">A. The Wealth Star (财星) – More Than Money</h3>
         <ul class="space-y-3 mb-6 text-mystic-300">
           <li class="flex items-start space-x-3">
             <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
             <span><strong>正财 (Zhèng Cái):</strong> Earned income (salary, business profits) – needs Strong Day Master to hold.</span>
           </li>
           <li class="flex items-start space-x-3">
             <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
             <span><strong>偏财 (Piān Cái):</strong> Unexpected gains (investments, gifts) – thrives with Social Fire (巳午).</span>
           </li>
         </ul>

         <h3 class="text-xl font-cinzel font-semibold text-gold-400 mb-4 mt-6">B. Support Stars You Can't Ignore</h3>
         <ul class="space-y-3 mb-6 text-mystic-300">
           <li class="flex items-start space-x-3">
             <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
             <span><strong>食神 (Shí Shén):</strong> Creativity → Turns ideas into value (e.g., Steve Jobs' Wood-Fire creativity)</span>
           </li>
           <li class="flex items-start space-x-3">
             <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
             <span><strong>印星 (Yìn Xīng):</strong> Knowledge → Protects wealth from risks (e.g., Buffett's Earth wisdom)</span>
           </li>
         </ul>

         <!-- Wealth Stars Visualization -->
         <div class="my-8 text-center">
           <img src="/images/blog/wealth-stars.svg" alt="Your Hidden Wealth Codes" class="w-full max-w-4xl mx-auto rounded-lg shadow-lg" />
           <p class="text-sm text-mystic-400 mt-2">Understanding the wealth stars and support stars in your BaZi chart</p>
         </div>

         <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">🚫 Part 3: Why "Rich" Bazi Fails – 3 Tragic Cases</h2>

         <div class="space-y-6 mb-8">
           <div class="mystic-card p-6 border-l-4 border-red-500/50">
             <h3 class="text-lg font-cinzel font-semibold text-red-400 mb-3">1. Weak Day Master + Heavy Wealth</h3>
             <p class="text-mystic-300 mb-2"><strong>Example:</strong> 癸水日主 (Weak Water) with 未土+戌土 (Strong Earth wealth stars)</p>
             <p class="text-mystic-300 text-sm"><strong>Result:</strong> Overwhelmed by opportunities → Debt or stress-induced loss.</p>
           </div>

           <div class="mystic-card p-6 border-l-4 border-red-500/50">
             <h3 class="text-lg font-cinzel font-semibold text-red-400 mb-3">2. Wealth Clash with Conflict Stars</h3>
             <p class="text-mystic-300 mb-2"><strong>Example:</strong> 偏财 (Piān Cái) next to 劫财 (Jié Cái – Wealth Robber)</p>
             <p class="text-mystic-300 text-sm"><strong>Result:</strong> Sudden windfalls lost to scams or "friends."</p>
           </div>

           <div class="mystic-card p-6 border-l-4 border-red-500/50">
             <h3 class="text-lg font-cinzel font-semibold text-red-400 mb-3">3. Fire Absence in Water Wealth</h3>
             <p class="text-mystic-300 mb-2"><strong>Example:</strong> 壬水+子水 (Strong Water wealth) but no 午火 (Fire drive)</p>
             <p class="text-mystic-300 text-sm"><strong>Result:</strong> Resources frozen by indecision (e.g., inherited funds never invested).</p>
           </div>
         </div>

         <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">💡 Part 4: Activate Your Wealth Potential – 3 Steps</h2>

         <div class="space-y-6 mb-8">
           <div class="mystic-card p-6 border-l-4 border-gold-500/50">
             <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-3">Step 1: Find Your Wealth Star</h3>
             <p class="text-mystic-300 mb-3">Use our <a href="/tools/bazi" class="text-gold-400 hover:text-gold-300 underline">Bazi Calculator</a> → Check your chart for:</p>
             <ul class="space-y-2 text-mystic-300 text-sm">
               <li>• Wood (甲,乙) + Earth (戊,己) = 偏财 (Opportunity Wealth)</li>
               <li>• Metal (庚,辛) + Wood (甲,乙) = 正财 (Steady Wealth)</li>
             </ul>
           </div>

           <div class="mystic-card p-6 border-l-4 border-gold-500/50">
             <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-3">Step 2: Balance Your Chart</h3>
             <ul class="space-y-2 text-mystic-300 text-sm">
               <li>• <strong>Weak Day Master?</strong> Add 印星 (Yìn) energy: Wear white/gray (Metal), study wealth mentors.</li>
               <li>• <strong>Wealth Clash?</strong> 合 (Hé) the robber: Partner with 正官 (Zhèng Guān) people (reliable leaders).</li>
             </ul>
           </div>

           <div class="mystic-card p-6 border-l-4 border-gold-500/50">
             <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-3">Step 3: Feng Shui Wealth Triggers</h3>
             <div class="overflow-x-auto">
               <table class="w-full border-collapse">
                 <thead>
                   <tr class="border-b border-mystic-700">
                     <th class="text-left p-2 text-gold-400 font-semibold text-sm">Wealth Type</th>
                     <th class="text-left p-2 text-gold-400 font-semibold text-sm">Direction</th>
                     <th class="text-left p-2 text-gold-400 font-semibold text-sm">Element Boost</th>
                   </tr>
                 </thead>
                 <tbody>
                   <tr class="border-b border-mystic-700/50">
                     <td class="p-2 text-mystic-300 text-sm">正财 (Steady)</td>
                     <td class="p-2 text-mystic-300 text-sm">Southeast</td>
                     <td class="p-2 text-mystic-300 text-sm">Green plants + Wood desk</td>
                   </tr>
                   <tr class="border-b border-mystic-700/50">
                     <td class="p-2 text-mystic-300 text-sm">偏财 (Opportunity)</td>
                     <td class="p-2 text-mystic-300 text-sm">Northwest</td>
                     <td class="p-2 text-mystic-300 text-sm">Metal bowl + Gold coins</td>
                   </tr>
                 </tbody>
               </table>
             </div>
           </div>

           <!-- Feng Shui Wealth Triggers Visualization -->
           <div class="my-8 text-center">
             <img src="/images/blog/feng-shui-wealth.svg" alt="Feng Shui Wealth Triggers" class="w-full max-w-4xl mx-auto rounded-lg shadow-lg" />
             <p class="text-sm text-mystic-400 mt-2">Strategic Feng Shui placement to activate your wealth potential</p>
           </div>
         </div>

         <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">❓ FAQs: Busting Wealth Bazi Myths</h2>

         <div class="space-y-6 mb-8">
           <div class="mystic-card p-6">
             <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-3">Q: Is a "Gold" Bazi the richest?</h3>
             <p class="text-mystic-300 text-sm">A: No! 庚金 (Yang Metal) needs Fire to forge wealth (e.g., tools), while 辛金 (Yin Metal) thrives as "jewelry" – valuable but fragile without Earth support.</p>
           </div>

           <div class="mystic-card p-6">
             <h3 class="text-lg font-cinzel font-semibold text-gold-400 mb-3">Q: Can poor Bazi become rich?</h3>
             <p class="text-mystic-300 text-sm">A: Yes! Liu Chuanzhong (Alibaba co-founder) has a "Weak Water" chart but used 印星 (knowledge) to build empire – proof that understanding your chart beats "lucky" elements.</p>
           </div>
         </div>

         <h2 class="text-2xl font-cinzel font-bold text-white mb-4 mt-8">💎 Conclusion: Wealth is a Verb</h2>
         <p class="mb-6 text-mystic-300 leading-relaxed">
           The "best" Bazi for wealth isn't about fixed elements—it's about aligning your chart's potential with action:
         </p>
         <ul class="space-y-3 mb-8 text-mystic-300">
           <li class="flex items-start space-x-3">
             <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
             <span><strong>Innovators</strong> → Create products solving real pains</span>
           </li>
           <li class="flex items-start space-x-3">
             <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
             <span><strong>Strategists</strong> → Master asset allocation</span>
           </li>
           <li class="flex items-start space-x-3">
             <div class="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
             <span><strong>Networkers</strong> → Build communities that scale</span>
           </li>
         </ul>

         <!-- Wealth BaZi Journey Summary -->
         <div class="my-8 text-center">
           <img src="/images/blog/wealth-bazi-summary.svg" alt="Wealth BaZi Journey: From Analysis to Activation" class="w-full max-w-4xl mx-auto rounded-lg shadow-lg" />
           <p class="text-sm text-mystic-400 mt-2">Your complete journey from understanding to activating wealth potential</p>
         </div>


       `,
       category: "wealth-bazi",
       categoryLabel: "Wealth & Fortune",
       date: "2025-08-04",
       readTime: "18 min read",
       image: "/images/blog/bazi-wealth-blueprint.jpg",
       slug: "best-bazi-wealth-chinese-astrology-blueprint",
       author: "玄印 (Xuan Yin)",
       tags: ["Wealth Bazi", "Chinese Astrology", "Financial Luck", "Wealth Patterns", "Bazi Analysis", "Feng Shui", "Money Luck", "Destiny"]
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
    <div className="min-h-screen pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-8"
        >
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 text-mystic-300 hover:text-gold-400 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Back to Blog</span>
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 sm:mb-12"
        >
          {/* Category Badge */}
          <div className="mb-4">
            <span className="px-4 py-2 bg-gold-500/90 text-black text-sm font-semibold rounded-full">
              {post.categoryLabel}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-cinzel font-bold text-white mb-4 sm:mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-mystic-400 mb-6 sm:mb-8 text-sm sm:text-base">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>By {post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-48 sm:h-64 md:h-96 rounded-xl sm:rounded-2xl overflow-hidden mb-6 sm:mb-8">
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
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-gold-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-white text-2xl sm:text-3xl">📖</span>
                </div>
                <p className="text-mystic-300 text-sm sm:text-base">Article Image</p>
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
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col space-y-4">
              <span className="text-mystic-400 font-medium">Share this article:</span>
              <div className="flex items-center space-x-3">
                {/* Native Share Button */}
                <button 
                  onClick={() => {
                    const shareText = `📖 ${post.title}\n\n${post.excerpt}\n\nRead more at FatePath.me`;
                    const shareUrl = window.location.href;
                    
                    if (navigator.share) {
                      navigator.share({
                        title: post.title,
                        text: shareText,
                        url: shareUrl
                      }).catch(err => {
                        console.log('Share failed:', err);
                        // Fallback to copy
                        copyToClipboard(`${shareText}\n\n${shareUrl}`);
                      });
                    } else {
                      // Fallback: copy to clipboard
                      copyToClipboard(`${shareText}\n\n${shareUrl}`);
                    }
                  }}
                  className="p-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-mystic-300 hover:text-gold-400 hover:border-gold-500/50 transition-colors flex items-center space-x-2"
                >
                  <Share2 className="h-5 w-5" />
                  <span className="text-sm">Share</span>
                </button>

                {/* Copy Link Button */}
                <button 
                  onClick={() => {
                    copyToClipboard(window.location.href);
                  }}
                  className="p-2 sm:p-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-mystic-300 hover:text-gold-400 hover:border-gold-500/50 transition-colors flex items-center space-x-2"
                >
                  <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs sm:text-sm">Copy Link</span>
                </button>
              </div>
            </div>

            {/* Social Media Share Buttons */}
            <div className="flex flex-col space-y-3 sm:space-y-4">
              <span className="text-sm sm:text-base text-mystic-400 font-medium">Share on social media:</span>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {/* Facebook */}
                <button 
                  onClick={() => {
                    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
                    window.open(url, '_blank', 'width=600,height=400');
                  }}
                  className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="text-sm">Facebook</span>
                </button>

                {/* Twitter/X */}
                <button 
                  onClick={() => {
                    const text = `📖 ${post.title}\n\n${post.excerpt}\n\nRead more at FatePath.me`;
                    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
                    window.open(url, '_blank', 'width=600,height=400');
                  }}
                  className="p-3 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors flex items-center space-x-2"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span className="text-sm">Twitter</span>
                </button>

                {/* LinkedIn */}
                <button 
                  onClick={() => {
                    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
                    window.open(url, '_blank', 'width=600,height=400');
                  }}
                  className="p-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors flex items-center space-x-2"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="text-sm">LinkedIn</span>
                </button>

                {/* WhatsApp */}
                <button 
                  onClick={() => {
                    const text = `📖 ${post.title}\n\n${post.excerpt}\n\nRead more at FatePath.me`;
                    const url = `https://wa.me/?text=${encodeURIComponent(text + '\n\n' + window.location.href)}`;
                    window.open(url, '_blank');
                  }}
                  className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <span className="text-sm">WhatsApp</span>
                </button>
              </div>
            </div>

            <Link
              to="/services"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold px-4 sm:px-6 py-3 rounded-lg hover:from-gold-400 hover:to-gold-500 transition-all duration-300 text-sm sm:text-base"
            >
              <span>Get Your Reading</span>
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 rotate-180" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default BlogPost 