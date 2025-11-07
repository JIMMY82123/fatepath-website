import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, Filter, Download, Eye, Tag } from 'lucide-react'
import SEO from '../components/SEO'
import LazyImage from '../components/LazyImage'
import DayMasterAnalysis from '../components/DayMasterAnalysis'

const Resources = () => {
  // 搜索和筛选状态
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [selectedTag, setSelectedTag] = useState('all')

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
         },
         {
           title: "Ten Gods System Dataset",
           excerpt: "Complete Ten Gods (十神) system data including relationships, meanings, career implications, and wealth indicators.",
           format: "JSON",
           records: 10,
           difficulty: "Intermediate",
           tags: ["Ten Gods", "Core", "Relationships"],
           featured: true,
           filename: "ten-gods.json",
           lastUpdated: "2024-01-15"
         },
         {
           title: "Luck Cycles Dataset",
           excerpt: "Complete data for BaZi luck cycles including Major Luck (大运), Annual Luck (流年), and timing analysis.",
           format: "JSON",
           records: 5,
           difficulty: "Intermediate",
           tags: ["Luck Cycles", "Timing", "Analysis"],
           featured: true,
           filename: "luck-cycles.json",
           lastUpdated: "2024-01-15"
        },
        {
          title: "Annual Forecasts 2024-2034",
          excerpt: "Year-by-year BaZi forecasts tailored for U.S. audiences with key themes, elemental balance, and industry highlights.",
          format: "JSON",
          records: 11,
          difficulty: "Intermediate",
          tags: ["Annual Forecast", "Timing", "US Market"],
          featured: true,
          filename: "annual-forecasts-2024-2034.json",
          lastUpdated: "2025-11-07"
        },
        {
          title: "Solar Terms Energy Guide",
          excerpt: "24 solar terms (节气) with five-element energy, lifestyle adjustments, and wellness tips adapted to American routines.",
          format: "JSON",
          records: 24,
          difficulty: "Beginner",
          tags: ["Seasonal", "Wellness", "Timing"],
          featured: true,
          filename: "solar-terms-energy.json",
          lastUpdated: "2025-11-07"
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
          title: "Wealth Stars Dataset",
          excerpt: "Complete data for BaZi wealth analysis including Wealth Stars (财星), Wealth Gods (财神), and financial indicators.",
          format: "JSON",
          records: 10,
          difficulty: "Intermediate",
          tags: ["Wealth", "Financial", "Analysis"],
          filename: "wealth-stars.json",
          lastUpdated: "2024-01-15"
        },
        {
          title: "Love Compatibility Dataset",
          excerpt: "Complete data for BaZi love and relationship analysis including compatibility factors and love stars.",
          format: "JSON",
          records: 10,
          difficulty: "Intermediate",
          tags: ["Love", "Relationships", "Compatibility"],
          filename: "love-compatibility.json",
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
          title: "Element Combinations",
          excerpt: "Advanced element combination analysis for complex BaZi chart interpretation and relationship dynamics.",
          format: "JSON",
          records: 25,
          difficulty: "Advanced",
          tags: ["Elements", "Combinations", "Advanced"],
          filename: "element-combinations.json",
          lastUpdated: "2024-01-15"
        },
        {
          title: "Seasonal Patterns",
          excerpt: "Seasonal energy patterns and their influence on BaZi analysis for timing and decision-making.",
          format: "JSON",
          records: 12,
          difficulty: "Intermediate",
          tags: ["Seasons", "Energy", "Timing"],
          filename: "seasonal-patterns.json",
          lastUpdated: "2024-01-15"
        },
        {
          title: "Sixty Jiazi Cycle",
          excerpt: "Complete 60-year Jiazi cycle data with detailed analysis of each combination's characteristics and implications.",
          format: "JSON",
          records: 60,
          difficulty: "Advanced",
          tags: ["Jiazi", "Cycle", "Advanced"],
          filename: "sixty-jiazi.json",
          lastUpdated: "2024-01-15"
        },
        {
          title: "Hidden Stems Dataset",
          excerpt: "Hidden stems (藏干) data for advanced BaZi analysis including their influence on personality and destiny.",
          format: "JSON",
          records: 36,
          difficulty: "Advanced",
          tags: ["Hidden Stems", "Advanced", "Destiny"],
          filename: "hidden-stems.json",
          lastUpdated: "2024-01-15"
        },
        {
          title: "Pillars Analysis Dataset",
          excerpt: "Comprehensive analysis of the four pillars (年柱, 月柱, 日柱, 时柱) and their individual significance.",
          format: "JSON",
          records: 4,
          difficulty: "Intermediate",
          tags: ["Pillars", "Analysis", "Structure"],
          filename: "pillars-analysis.json",
          lastUpdated: "2024-01-15"
        },
        {
          title: "Element Strengths Dataset",
          excerpt: "Element strength analysis including season strength, root strength, and support strength calculations.",
          format: "JSON",
          records: 20,
          difficulty: "Advanced",
          tags: ["Element Strength", "Advanced", "Calculations"],
          filename: "element-strengths.json",
          lastUpdated: "2024-01-15"
        },
        {
          title: "Health Indicators Dataset",
          excerpt: "BaZi health analysis indicators including organ correspondences, health patterns, and wellness timing.",
          format: "JSON",
          records: 15,
          difficulty: "Intermediate",
          tags: ["Health", "Wellness", "Medical"],
          filename: "health-indicators.json",
          lastUpdated: "2024-01-15"
        },
        {
          title: "Marriage Timing Dataset",
          excerpt: "Marriage timing analysis data including favorable periods, compatibility factors, and relationship patterns.",
          format: "JSON",
          records: 24,
          difficulty: "Intermediate",
          tags: ["Marriage", "Timing", "Relationships"],
          filename: "marriage-timing.json",
          lastUpdated: "2024-01-15"
        },
        {
          title: "Business Success Patterns",
          excerpt: "Business and entrepreneurship success patterns derived from BaZi analysis for career and business planning.",
          format: "JSON",
          records: 30,
          difficulty: "Intermediate",
          tags: ["Business", "Success", "Entrepreneurship"],
          filename: "business-success.json",
          lastUpdated: "2024-01-15"
        },
        {
          title: "Travel and Migration Data",
          excerpt: "Travel and migration patterns analysis including favorable directions, timing, and location influences.",
          format: "JSON",
          records: 8,
          difficulty: "Intermediate",
          tags: ["Travel", "Migration", "Directions"],
          filename: "travel-migration.json",
          lastUpdated: "2024-01-15"
        },
        {
          title: "Education and Learning Patterns",
          excerpt: "Educational success patterns and learning abilities analysis for academic and skill development planning.",
          format: "JSON",
          records: 18,
          difficulty: "Intermediate",
          tags: ["Education", "Learning", "Academic"],
          filename: "education-patterns.json",
          lastUpdated: "2024-01-15"
        }
      ]
    },
    {
      title: "Advanced Research",
      description: "Specialized datasets for advanced BaZi research and analysis",
      icon: "🔬",
      datasets: [
        {
          title: "Clash and Harm Patterns",
          excerpt: "Detailed analysis of clash (冲) and harm (害) patterns in BaZi charts and their impact on life events.",
          format: "JSON",
          records: 16,
          difficulty: "Advanced",
          tags: ["Clash", "Harm", "Patterns", "Advanced"],
          filename: "clash-harm-patterns.json",
          lastUpdated: "2024-01-15"
        },
        {
          title: "Combination and Punishment Data",
          excerpt: "Complete data on combination (合) and punishment (刑) relationships in BaZi analysis.",
          format: "JSON",
          records: 12,
          difficulty: "Advanced",
          tags: ["Combination", "Punishment", "Relationships", "Advanced"],
          filename: "combination-punishment.json",
          lastUpdated: "2024-01-15"
        },
        {
          title: "Empty Branches Analysis",
          excerpt: "Analysis of empty branches (空亡) and their significance in BaZi chart interpretation.",
          format: "JSON",
          records: 12,
          difficulty: "Advanced",
          tags: ["Empty Branches", "Advanced", "Interpretation"],
          filename: "empty-branches.json",
          lastUpdated: "2024-01-15"
        },
        {
          title: "Noble People Patterns",
          excerpt: "Noble people (贵人) patterns and their influence on career success and life opportunities.",
          format: "JSON",
          records: 8,
          difficulty: "Intermediate",
          tags: ["Noble People", "Success", "Opportunities"],
          filename: "noble-people.json",
          lastUpdated: "2024-01-15"
        },
        {
          title: "Disaster Stars Dataset",
          excerpt: "Disaster stars (灾星) analysis for identifying potential challenges and crisis periods.",
          format: "JSON",
          records: 10,
          difficulty: "Advanced",
          tags: ["Disaster Stars", "Crisis", "Challenges", "Advanced"],
          filename: "disaster-stars.json",
          lastUpdated: "2024-01-15"
        },
        {
          title: "Flying Stars System",
          excerpt: "Flying stars (飞星) system data for advanced timing analysis and event prediction.",
          format: "JSON",
          records: 9,
          difficulty: "Advanced",
          tags: ["Flying Stars", "Timing", "Prediction", "Advanced"],
          filename: "flying-stars.json",
          lastUpdated: "2024-01-15"
        }
      ]
    }
  ]

          // 热门标签
      const popularTags = [
     "Core", "Stems", "Branches", "Elements", "Ten Gods", "Luck Cycles",
     "Annual Forecast", "Seasonal", "US Market", "Wealth Stars", "Love Compatibility",
     "Career", "Wealth", "Compatibility", "Jiazi", "Hidden Stems", "Pillars",
     "Element Strength", "Health", "Marriage", "Business", "Travel", "Education",
     "Clash", "Harm", "Combination", "Punishment", "Empty Branches", "Noble People",
     "Disaster Stars", "Flying Stars", "Advanced", "Intermediate", "Research", "JSON", "Download"
   ]

  // 筛选后的数据集
  const filteredDatasets = useMemo(() => {
    let allDatasets = []
    
    // 收集所有数据集
    datasetCategories.forEach(category => {
      category.datasets.forEach(dataset => {
        allDatasets.push({
          ...dataset,
          category: category.title,
          categoryIcon: category.icon
        })
      })
    })

    // 应用筛选条件
    return allDatasets.filter(dataset => {
      // 搜索词筛选
      const matchesSearch = searchTerm === '' || 
        dataset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dataset.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dataset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      // 分类筛选
      const matchesCategory = selectedCategory === 'all' || dataset.category === selectedCategory

      // 难度筛选
      const matchesDifficulty = selectedDifficulty === 'all' || dataset.difficulty === selectedDifficulty

      // 标签筛选
      const matchesTag = selectedTag === 'all' || dataset.tags.includes(selectedTag)

      return matchesSearch && matchesCategory && matchesDifficulty && matchesTag
    })
  }, [searchTerm, selectedCategory, selectedDifficulty, selectedTag])

  // 获取所有分类选项
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...datasetCategories.map(cat => ({ value: cat.title, label: cat.title }))
  ]

  // 获取所有难度选项
  const difficultyOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' }
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
                <span className="text-gold-400 font-semibold">25+ professional datasets</span> covering all aspects of BaZi study.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-mystic-400 mb-8">
                <span>JSON Datasets</span>
                <span>•</span>
                <span>Field Dictionaries</span>
                <span>•</span>
                <span>API Ready</span>
                <span>•</span>
                <span>Free Downloads</span>
              </div>
              
              {/* 数据集统计 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-400 mb-2">25+</div>
                  <div className="text-sm text-mystic-300">Datasets</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-400 mb-2">500+</div>
                  <div className="text-sm text-mystic-300">Data Records</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-400 mb-2">4</div>
                  <div className="text-sm text-mystic-300">Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-400 mb-2">100%</div>
                  <div className="text-sm text-mystic-300">Free Access</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-16 bg-mystic-800">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* 搜索栏 */}
              <div className="mb-8">
                <div className="relative max-w-2xl mx-auto">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-mystic-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search datasets by name, description, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-mystic-700 border border-mystic-600 rounded-lg text-white placeholder-mystic-400 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                  />
                </div>
              </div>

              {/* 筛选器 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {/* 分类筛选 */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mystic-400 h-4 w-4" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-mystic-700 border border-mystic-600 rounded-lg text-white focus:outline-none focus:border-gold-400"
                  >
                    {categoryOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 难度筛选 */}
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mystic-400 h-4 w-4" />
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-mystic-700 border border-mystic-600 rounded-lg text-white focus:outline-none focus:border-gold-400"
                  >
                    {difficultyOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 标签筛选 */}
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mystic-400 h-4 w-4" />
                  <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-mystic-700 border border-mystic-600 rounded-lg text-white focus:outline-none focus:border-gold-400"
                  >
                    <option value="all">All Tags</option>
                    {popularTags.map(tag => (
                      <option key={tag} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 结果统计 */}
              <div className="text-center mb-8">
                <p className="text-mystic-300">
                  Showing <span className="text-gold-400 font-semibold">{filteredDatasets.length}</span> of <span className="text-gold-400 font-semibold">25+</span> datasets
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Day Master Analysis Section */}
        <DayMasterAnalysis />

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
                {searchTerm || selectedCategory !== 'all' || selectedDifficulty !== 'all' || selectedTag !== 'all' ? 'Filtered Datasets' : 'All Datasets'}
              </h2>
              <p className="text-lg text-mystic-300 max-w-2xl mx-auto">
                {searchTerm || selectedCategory !== 'all' || selectedDifficulty !== 'all' || selectedTag !== 'all' 
                  ? 'Browse through our comprehensive collection of BaZi datasets based on your search criteria.'
                  : 'Explore our comprehensive collection of BaZi datasets, carefully curated to provide complete analysis capabilities.'
                }
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {filteredDatasets.length > 0 ? (
                filteredDatasets.map((dataset, index) => (
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
                ))
              ) : (
                <div className="col-span-2 text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-white mb-4">No datasets found</h3>
                  <p className="text-mystic-300 mb-6">
                    Try adjusting your search criteria or filters to find what you're looking for.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedCategory('all')
                      setSelectedDifficulty('all')
                      setSelectedTag('all')
                    }}
                    className="bg-gold-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-gold-300 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
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
                 <Link to="/love-compatibility-test" className="inline-block bg-yellow-400 text-mystic-900 px-6 py-3 rounded font-semibold hover:bg-yellow-500 transition-colors">
                   Free Test
                 </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* API Documentation Section */}
        <section className="py-20 bg-mystic-900">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  API Documentation & Usage Examples
                </h2>
                <p className="text-lg text-mystic-300 max-w-3xl mx-auto">
                  Learn how to integrate our BaZi datasets into your applications with comprehensive API documentation and code examples.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* JavaScript Example */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="bg-mystic-800 rounded-lg p-8 border border-mystic-700/50"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-black font-bold">JS</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">JavaScript Integration</h3>
                  </div>
                  
                  <div className="bg-mystic-900 rounded-lg p-4 mb-4 overflow-x-auto">
                    <pre className="text-sm text-mystic-300">
{`// Fetch BaZi dataset
const fetchBaZiData = async (datasetName) => {
  try {
    const response = await fetch(\`/datasets/\${datasetName}.json\`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching dataset:', error);
  }
};

// Example usage
const heavenlyStems = await fetchBaZiData('heavenly-stems');
console.log(heavenlyStems.data[0]); // First stem data`}
                    </pre>
                  </div>
                  
                  <p className="text-mystic-300 text-sm">
                    Perfect for web applications, React components, and Node.js projects.
                  </p>
                </motion.div>

                {/* Python Example */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="bg-mystic-800 rounded-lg p-8 border border-mystic-700/50"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold">PY</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">Python Integration</h3>
                  </div>
                  
                  <div className="bg-mystic-900 rounded-lg p-4 mb-4 overflow-x-auto">
                    <pre className="text-sm text-mystic-300">
{`import requests
import json

def fetch_bazi_dataset(dataset_name):
    """Fetch BaZi dataset from API"""
    url = f"https://fatepath.me/datasets/{dataset_name}.json"
    response = requests.get(url)
    return response.json()

# Example usage
heavenly_stems = fetch_bazi_dataset('heavenly-stems')
print(heavenly_stems['data'][0])  # First stem data`}
                    </pre>
                  </div>
                  
                  <p className="text-mystic-300 text-sm">
                    Ideal for data analysis, machine learning, and research applications.
                  </p>
                </motion.div>
              </div>

              {/* API Endpoints */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="mt-16 bg-mystic-800 rounded-lg p-8 border border-mystic-700/50"
              >
                <h3 className="text-2xl font-bold text-white mb-6">API Endpoints</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gold-400 mb-3">Dataset Endpoints</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between bg-mystic-900 rounded p-3">
                        <span className="text-mystic-300">GET /datasets/{'{dataset}'}.json</span>
                        <span className="text-green-400 text-sm">200 OK</span>
                      </div>
                      <div className="flex items-center justify-between bg-mystic-900 rounded p-3">
                        <span className="text-mystic-300">GET /datasets/</span>
                        <span className="text-green-400 text-sm">200 OK</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gold-400 mb-3">Response Format</h4>
                    <div className="bg-mystic-900 rounded p-3">
                      <pre className="text-sm text-mystic-300">
{`{
  "metadata": {
    "name": "Dataset Name",
    "version": "1.0.0",
    "description": "..."
  },
  "schema": { ... },
  "data": [ ... ]
}`}
                      </pre>
                    </div>
                  </div>
                </div>
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
