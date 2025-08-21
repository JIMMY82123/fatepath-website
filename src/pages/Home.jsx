import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [currentCelebrity, setCurrentCelebrity] = useState(0)

  // 推荐数据
  const testimonials = [
    {
      name: "Emma Rodriguez",
      role: "企业家",
      content: "八字阅读完全改变了我对职业时机的看法。我根据这些洞察做出了重大商业决策，结果非常成功。",
      avatar: "/images/testimonials/emma-rodriguez.jpg"
    },
    {
      name: "Michael Chen",
      role: "软件工程师",
      content: "通过八字分析，我找到了最适合我的职业道路。现在我在工作中感到更有目标和满足感。",
      avatar: "/images/testimonials/michael-chen.jpg"
    },
    {
      name: "Sarah Johnson",
      role: "营销经理",
      content: "八字阅读帮助我理解了人际关系模式。我现在能够更好地处理工作和个人关系。",
      avatar: "/images/testimonials/sarah-johnson.jpg"
    }
  ]

  // 名人数据
  const celebrities = [
    {
      name: "Madonna",
      description: "流行音乐天后，通过八字分析了解她的成功时机",
      image: "/images/celebrities/madonna.jpg"
    },
    {
      name: "Oprah Winfrey",
      description: "媒体大亨，八字揭示她的财富密码",
      image: "/images/celebrities/oprah-winfrey.jpg"
    },
    {
      name: "Tom Cruise",
      description: "好莱坞巨星，八字分析他的事业轨迹",
      image: "/images/celebrities/tom-cruise.jpg"
    }
  ]

  // 最新文章数据
  const latestArticles = [
    {
      title: "八字初学者指南：了解你的命运密码",
      excerpt: "探索中国传统八字命理的基础知识，了解如何解读你的出生时间信息。",
      image: "/images/blog/bazi-beginners-guide-cover.jpg",
      slug: "bazi-beginners-guide"
    },
    {
      title: "八字与MBTI人格比较：东西方智慧的融合",
      excerpt: "比较中国传统八字命理与现代MBTI人格类型，发现东西方智慧的共通之处。",
      image: "/images/blog/bazi-mbti-personality-comparison-cover.jpg",
      slug: "bazi-mbti-personality-comparison"
    },
    {
      title: "财富等级指南：通过八字了解你的财运",
      excerpt: "深入分析八字中的财富信息，了解你的财运等级和提升方法。",
      image: "/images/blog/bazi-wealth-level-guide-cover.jpg",
      slug: "bazi-wealth-level-guide"
    }
  ]

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    const celebrityInterval = setInterval(() => {
      setCurrentCelebrity((prev) => (prev + 1) % celebrities.length)
    }, 4000)

    return () => {
      clearInterval(testimonialInterval)
      clearInterval(celebrityInterval)
    }
  }, [testimonials.length, celebrities.length])

  return (
    <main className="min-h-screen bg-mystic-900">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              感到迷茫？
              <span className="block text-gold-400">找到你的人生方向</span>
            </h1>
            <p className="text-xl md:text-2xl text-mystic-300 mb-8 max-w-3xl mx-auto">
              人生陷入困境？通过专业的八字阅读解锁中国古代智慧。
              通过传统中国命理学发现你真正的人生目标、职业方向和感情道路。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/free-bazi-report" className="bg-gradient-to-r from-gold-400 to-gold-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-gold-500 hover:to-gold-700 transition-all duration-300 transform hover:scale-105">
                获取免费八字报告
              </Link>
              <Link to="/services" className="border-2 border-gold-400 text-gold-400 px-8 py-4 rounded-lg font-semibold hover:bg-gold-400 hover:text-white transition-all duration-300">
                查看服务
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* 推荐部分 */}
      <section className="py-20 bg-mystic-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              客户推荐
            </h2>
            <p className="text-xl text-mystic-300 max-w-2xl mx-auto">
              听听其他人如何通过八字阅读改变人生
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-mystic-700 rounded-lg p-8 text-center">
              <div className="mb-6">
                <img 
                  src={testimonials[currentTestimonial].avatar} 
                  alt={testimonials[currentTestimonial].name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  onError={(e) => {
                    e.target.src = "/images/testimonials/default-avatar.svg"
                  }}
                />
              </div>
              <blockquote className="text-xl text-mystic-200 mb-4 italic">
                "{testimonials[currentTestimonial].content}"
              </blockquote>
              <div className="text-gold-400 font-semibold">
                {testimonials[currentTestimonial].name}
              </div>
              <div className="text-mystic-400">
                {testimonials[currentTestimonial].role}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 名人分析部分 */}
      <section className="py-20 bg-mystic-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              名人八字分析
            </h2>
            <p className="text-xl text-mystic-300 max-w-2xl mx-auto">
              探索成功人士的八字密码，了解他们成功的时机
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-mystic-800 rounded-lg p-8 text-center">
              <div className="mb-6">
                <img 
                  src={celebrities[currentCelebrity].image} 
                  alt={celebrities[currentCelebrity].name}
                  className="w-32 h-32 rounded-lg mx-auto mb-4 object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {celebrities[currentCelebrity].name}
              </h3>
              <p className="text-mystic-300">
                {celebrities[currentCelebrity].description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 最新文章部分 */}
      <section className="py-20 bg-mystic-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              最新文章
            </h2>
            <p className="text-xl text-mystic-300 max-w-2xl mx-auto">
              深入了解八字命理和人生智慧
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {latestArticles.map((article, index) => (
              <div key={index} className="bg-mystic-700 rounded-lg overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">
                    {article.title}
                  </h3>
                  <p className="text-mystic-300 mb-4">
                    {article.excerpt}
                  </p>
                  <Link 
                    to={`/blog/${article.slug}`}
                    className="text-gold-400 hover:text-gold-300 font-semibold"
                  >
                    阅读更多 →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 行动召唤部分 */}
      <section className="py-20 bg-mystic-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            开始你的命运之旅
          </h2>
          <p className="text-xl text-mystic-300 mb-8 max-w-2xl mx-auto">
            通过专业的八字阅读，发现你的人生密码，找到真正的方向
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/bazi-form" className="bg-gradient-to-r from-gold-400 to-gold-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-gold-500 hover:to-gold-700 transition-all duration-300">
              开始八字阅读
            </Link>
            <Link to="/contact" className="border-2 border-gold-400 text-gold-400 px-8 py-4 rounded-lg font-semibold hover:bg-gold-400 hover:text-white transition-all duration-300">
              联系我们
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
