import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import LazyImage from '../components/LazyImage'

const Resources = () => {
  // 数据集分类
  const datasetCategories = [
    {
      title: "Core BaZi Data",
      description: "Essential datasets for BaZi analysis",
      icon: "📊",
      datasets: [
        {
          title: "Heavenly Stems Dataset",
          excerpt: "Complete data for the 10 Heavenly Stems (天干) including Chinese characters, pinyin, elements, personality traits, and characteristics.",
          format: "JSON",
          records: 10,
          difficulty: "Beginner",
          tags: ["Stems", "Core", "Characters"],
          featured: true,
          filename: "heavenly-stems.json",
          lastUpdated: "2024-01-15"
        },
        {
          title: "Earthly Branches Dataset",
          excerpt: "Comprehensive data for the 12 Earthly Branches (地支) with zodiac animals, time periods, elements, and personality traits.",
          format: "JSON",
          records: 12,
          difficulty: "Beginner",
          tags: ["Branches", "Core", "Zodiac"],
          featured: true,
          filename: "earthly-branches.json",
          lastUpdated: "2024-01-15"
        },
        {
          title: "Five Elements Dataset",
          excerpt: "Complete Five Elements (五行) system data including generation and control cycles, characteristics, and relationships.",
          format: "JSON",
          records: 5,
          difficulty: "Beginner",
          tags: ["Elements", "Core", "Cycles"],
          featured: true,
          filename: "five-elements.json",
          lastUpdated: "2024-01-15"
        }
      ]
    },
    {
      title: "Application Data",
      description: "Datasets for practical BaZi applications",
      icon: "🎯",
      datasets: [
        {
          title: "Compatibility Matrix",
          excerpt: "Relationship compatibility data based on BaZi principles for analyzing romantic, business, and friendship compatibility.",
          format: "JSON",
          records: 144,
          difficulty: "Intermediate",
          tags: ["Compatibility", "Relationships", "Matrix"],
          filename: "compatibility-matrix.json",
          lastUpdated: "2024-01-15"
        },
        {
          title: "Career Patterns",
          excerpt: "Career success patterns and timing data derived from BaZi analysis for professional development and career planning.",
          format: "JSON",
          records: 60,
          difficulty: "Intermediate",
          tags: ["Career", "Success", "Timing"],
          filename: "career-patterns.json",
          lastUpdated: "2024-01-15"
        },
        {
          title: "Wealth Indicators",
          excerpt: "Financial success indicators and wealth timing patterns based on BaZi chart analysis for investment and financial planning.",
          format: "JSON",
          records: 48,
          difficulty: "Intermediate",
          tags: ["Wealth", "Finance", "Indicators"],
          filename: "wealth-indicators.json",
          lastUpdated: "2024-01-15"
        }
      ]
    },
    {
      title: "Reference Data",
      description: "Supporting datasets and reference materials",
      icon: "📚",
      datasets: [
        {
          title: "Chinese Calendar",
          excerpt: "Traditional Chinese calendar conversion data including solar terms, lunar months, and seasonal influences.",
          format: "JSON",
          records: 24,
          difficulty: "Intermediate",
          tags: ["Calendar", "Conversion", "Seasons"],
          filename: "chinese-calendar.json",
          lastUpdated: "2024-01-15"
        },
        {
          title: "Seasonal Influences",
          excerpt: "Seasonal energy patterns and their influence on BaZi analysis for timing and decision-making.",
          format: "JSON",
          records: 12,
          difficulty: "Intermediate",
          tags: ["Seasons", "Energy", "Timing"],
          filename: "seasonal-influences.json",
          lastUpdated: "2024-01-15"
        },
        {
          title: "Historical Events",
          excerpt: "Historical event correlations with BaZi patterns for understanding cyclical influences on major events.",
          format: "JSON",
          records: 100,
          difficulty: "Advanced",
          tags: ["History", "Events", "Patterns"],
          filename: "historical-events.json",
          lastUpdated: "2024-01-15"
        }
      ]
    }
  ]

  // 热门标签
  const popularTags = [
    "Core", "Stems", "Branches", "Elements", "Compatibility", 
    "Career", "Wealth", "Calendar", "History", "JSON", "Download"
  ]

  // 下载数据集函数
  const downloadDataset = (filename) => {
    const link = document.createElement('a')
    link.href = `/datasets/${filename}`
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      <SEO 
        title="BaZi Data Library - Free JSON Datasets for Chinese Numerology"
        description="Download comprehensive BaZi datasets including Heavenly Stems, Earthly Branches, Five Elements, and compatibility matrices. Structured JSON data for analysis and development."
        keywords="bazi datasets, chinese numerology data, heavenly stems json, earthly branches data, five elements dataset, bazi api, free bazi data, structured data"
      />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-mystic-800 to-mystic-900">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                BaZi Data Library
              </h1>
              <p className="text-xl text-mystic-300 mb-8 max-w-3xl mx-auto">
                Your comprehensive source for BaZi datasets. Download structured data for analysis, 
                development, and research in Chinese numerology and destiny analysis.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-mystic-400">
                <span>JSON Datasets</span>
                <span>•</span>
                <span>Field Dictionaries</span>
                <span>•</span>
                <span>API Ready</span>
                <span>•</span>
                <span>Free Downloads</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Datasets Section */}
        <section className="py-20 bg-mystic-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Featured Datasets
              </h2>
              <p className="text-lg text-mystic-300 max-w-2xl mx-auto">
                Start your BaZi data journey with these essential datasets, carefully curated to provide comprehensive BaZi analysis capabilities.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {datasetCategories
                .flatMap(category => category.datasets.filter(dataset => dataset.featured))
                .slice(0, 4)
                .map((dataset, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-mystic-800 rounded-lg p-8 border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-xs font-medium">
                        {dataset.format}
                      </span>
                      <span className="text-mystic-400 text-sm">{dataset.records} records</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{dataset.title}</h3>
                    <p className="text-mystic-300 mb-4 line-clamp-3">{dataset.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {dataset.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-1 bg-mystic-700/50 text-mystic-300 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-mystic-400 text-xs">Updated: {dataset.lastUpdated}</span>
                      <div className="flex gap-3">
                        <Link 
                          to={`/resources/${dataset.filename.replace('.json', '')}`}
                          className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors"
                        >
                          View Details →
                        </Link>
                        <button 
                          onClick={() => downloadDataset(dataset.filename)}
                          className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors"
                        >
                          Download →
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </section>

        {/* Dataset Categories */}
        <section className="py-20 bg-mystic-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                BaZi Data Library
              </h2>
              <p className="text-lg text-mystic-300 max-w-3xl mx-auto">
                Explore our comprehensive collection of BaZi datasets, organized by category and complexity. From core data to advanced applications, find everything you need for BaZi analysis and development.
              </p>
            </motion.div>

            <div className="space-y-16">
              {datasetCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-8">
                    <span className="text-4xl mr-4">{category.icon}</span>
                    <div>
                      <h3 className="text-2xl font-bold text-yellow-400">{category.title}</h3>
                      <p className="text-mystic-300">{category.description}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.datasets.map((dataset, datasetIndex) => (
                      <motion.div
                        key={datasetIndex}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: datasetIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-mystic-900 rounded-lg p-6 border border-mystic-700/50 hover:border-yellow-400/30 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            dataset.difficulty === 'Beginner' ? 'bg-green-400/20 text-green-400' :
                            dataset.difficulty === 'Intermediate' ? 'bg-yellow-400/20 text-yellow-400' :
                            'bg-red-400/20 text-red-400'
                          }`}>
                            {dataset.difficulty}
                          </span>
                          <span className="text-mystic-400 text-xs">{dataset.format}</span>
                        </div>
                        <h4 className="text-lg font-bold text-white mb-3 line-clamp-2">{dataset.title}</h4>
                        <p className="text-mystic-300 text-sm mb-4 line-clamp-3">{dataset.excerpt}</p>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {dataset.tags.slice(0, 2).map((tag, tagIndex) => (
                            <span key={tagIndex} className="px-2 py-1 bg-mystic-700/30 text-mystic-400 text-xs rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-mystic-400 text-xs">{dataset.records} records</span>
                          <div className="flex gap-2">
                            <Link 
                              to={`/resources/${dataset.filename.replace('.json', '')}`}
                              className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold transition-colors"
                            >
                              Details →
                            </Link>
                            <button 
                              onClick={() => downloadDataset(dataset.filename)}
                              className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold transition-colors"
                            >
                              Download →
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Tags Section */}
        <section className="py-20 bg-mystic-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Explore by Topic</h2>
              <p className="text-mystic-300">Find articles and resources by your areas of interest</p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-3">
              {popularTags.map((tag, index) => (
                <motion.button
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="px-4 py-2 bg-mystic-800 text-mystic-300 rounded-full border border-mystic-700/50 hover:border-yellow-400/50 hover:text-yellow-400 transition-all duration-300"
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Access Tools */}
        <section className="py-20 bg-mystic-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Quick Access Tools
              </h2>
              <p className="text-lg text-mystic-300 max-w-2xl mx-auto">
                Jump straight into practical BaZi analysis with our interactive tools and calculators.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-mystic-900 rounded-lg p-8 text-center border border-yellow-400/20"
              >
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-yellow-400 font-bold text-xl mb-3">BaZi Chart Generator</h3>
                <p className="text-mystic-300 text-sm mb-6">Create your complete BaZi chart with detailed personality analysis</p>
                <Link to="/free-bazi-report" className="inline-block bg-yellow-400 text-mystic-900 px-6 py-3 rounded font-semibold hover:bg-yellow-500 transition-colors">
                  Generate Chart
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-mystic-900 rounded-lg p-8 text-center border border-yellow-400/20"
              >
                <div className="text-4xl mb-4">💎</div>
                <h3 className="text-yellow-400 font-bold text-xl mb-3">Wealth Oracle</h3>
                <p className="text-mystic-300 text-sm mb-6">Discover your wealth potential and financial timing patterns</p>
                <Link to="/wealth-sign" className="inline-block bg-yellow-400 text-mystic-900 px-6 py-3 rounded font-semibold hover:bg-yellow-500 transition-colors">
                  Check Wealth
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-mystic-900 rounded-lg p-8 text-center border border-yellow-400/20"
              >
                <div className="text-4xl mb-4">💕</div>
                <h3 className="text-yellow-400 font-bold text-xl mb-3">Love Compatibility</h3>
                <p className="text-mystic-300 text-sm mb-6">Analyze romantic compatibility using BaZi principles</p>
                <Link to="/love-form" className="inline-block bg-yellow-400 text-mystic-900 px-6 py-3 rounded font-semibold hover:bg-yellow-500 transition-colors">
                  Test Match
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-mystic-800 to-mystic-900">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Explore Your Destiny?
              </h2>
              <p className="text-xl text-mystic-300 mb-8 max-w-2xl mx-auto">
                Start with our free BaZi report and discover the ancient wisdom 
                that can guide your life's journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/free-bazi-report"
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-mystic-900 px-8 py-4 rounded-lg text-lg font-bold hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105"
                >
                  Get Free Report
                </Link>
                <Link
                  to="/services"
                  className="bg-mystic-700 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-mystic-600 transition-all duration-300"
                >
                  View All Services
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Resources
