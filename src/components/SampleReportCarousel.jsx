import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Download, Eye, X } from 'lucide-react'

const SampleReportCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const reportImages = [
    { id: 1, src: '/images/report/sample-report-1.jpg', title: 'Report Cover' },
    { id: 2, src: '/images/report/sample-report-2.jpg', title: 'BaZi Chart' },
    { id: 3, src: '/images/report/sample-report-3.jpg', title: 'Personality Analysis' },
    { id: 4, src: '/images/report/sample-report-4.jpg', title: 'Wealth Analysis' },
    { id: 5, src: '/images/report/sample-report-5.jpg', title: 'Love Analysis' },
    { id: 6, src: '/images/report/sample-report-6.jpg', title: 'Health Guidance' },
    { id: 7, src: '/images/report/sample-report-7.jpg', title: 'Life Guidance' }
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reportImages.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reportImages.length) % reportImages.length)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      {/* 样板报告展示区域 */}
      <section className="py-12 bg-mystic-900">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-playfair font-semibold text-white mb-3">
              Professional Report Sample Preview
            </h2>
            <p className="text-mystic-300 max-w-2xl mx-auto">
              Click to view our professional BaZi analysis report samples and discover the detailed content and professional analysis quality you'll receive
            </p>
          </div>

          {/* 紧凑型轮播容器 */}
          <div className="relative bg-mystic-800 rounded-lg shadow-lg overflow-hidden border border-mystic-700/50">
            {/* 主图展示 - 缩小尺寸 */}
            <div className="relative h-48 md:h-64 overflow-hidden cursor-pointer" onClick={openModal}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-full h-full"
                >
                  <img
                    src={reportImages[currentIndex].src}
                    alt={reportImages[currentIndex].title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </motion.div>
              </AnimatePresence>

              {/* 导航按钮 - 更小更精致 */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-mystic-900/80 hover:bg-mystic-900 text-white p-1.5 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-mystic-900/80 hover:bg-mystic-900 text-white p-1.5 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              {/* 放大查看按钮 - 更小 */}
              <button
                onClick={openModal}
                className="absolute top-2 right-2 bg-gold-500 hover:bg-gold-600 text-white p-1.5 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
              >
                <Eye className="h-4 w-4" />
              </button>
            </div>

            {/* 缩略图导航 - 更紧凑 */}
            <div className="p-3 bg-mystic-700">
              <div className="flex justify-center space-x-1.5 overflow-x-auto pb-2">
                {reportImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => goToSlide(index)}
                    className={`flex-shrink-0 w-12 h-12 rounded overflow-hidden border-2 transition-all duration-200 ${
                      index === currentIndex
                        ? 'border-gold-400 shadow-lg scale-110'
                        : 'border-mystic-500 hover:border-gold-400'
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
              
              {/* 页面指示器 - 更简洁 */}
              <div className="flex justify-center items-center mt-2 space-x-2">
                <span className="text-xs text-mystic-300">
                  {reportImages[currentIndex].title}
                </span>
                <span className="text-xs text-mystic-400">
                  ({currentIndex + 1}/{reportImages.length})
                </span>
              </div>
            </div>
          </div>

          {/* 行动按钮 - 更简洁 */}
          <div className="text-center mt-6">
            <button
              onClick={openModal}
              className="bg-gold-500 hover:bg-gold-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              View Full Report
            </button>
            <p className="text-xs text-mystic-400 mt-2">
              Click to view high-resolution images and experience the quality of our professional BaZi analysis reports
            </p>
          </div>
        </div>
      </section>

      {/* 模态框 */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 关闭按钮 */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-slate-700 p-2 rounded-full shadow-lg transition-all duration-200"
              >
                <X className="h-6 w-6" />
              </button>

              {/* 图片 */}
              <img
                src={reportImages[currentIndex].src}
                alt={reportImages[currentIndex].title}
                className="w-full h-full object-contain max-h-[80vh]"
              />

              {/* 底部信息 */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/95 p-4">
                <h3 className="text-lg font-semibold text-slate-900 text-center">
                  {reportImages[currentIndex].title}
                </h3>
                <p className="text-sm text-slate-600 text-center mt-1">
                  Professional BaZi Analysis Report - Page {currentIndex + 1}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default SampleReportCarousel
