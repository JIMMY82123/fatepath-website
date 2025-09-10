import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Download, Eye, X } from 'lucide-react'

const SampleReportCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const reportImages = [
    { id: 1, src: '/images/report/sample-report-1.jpg', title: '报告封面' },
    { id: 2, src: '/images/report/sample-report-2.jpg', title: '八字图表' },
    { id: 3, src: '/images/report/sample-report-3.jpg', title: '性格分析' },
    { id: 4, src: '/images/report/sample-report-4.jpg', title: '财富分析' },
    { id: 5, src: '/images/report/sample-report-5.jpg', title: '爱情分析' },
    { id: 6, src: '/images/report/sample-report-6.jpg', title: '健康建议' },
    { id: 7, src: '/images/report/sample-report-7.jpg', title: '人生指导' }
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
      <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-slate-900 mb-4">
              专业报告样板预览
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              查看我们的专业八字分析报告样板，了解您将获得的详细内容和专业分析质量
            </p>
          </div>

          {/* 轮播容器 */}
          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* 主图展示 */}
            <div className="relative h-96 md:h-[500px] overflow-hidden">
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
                    className="w-full h-full object-contain bg-slate-50 cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={openModal}
                  />
                </motion.div>
              </AnimatePresence>

              {/* 导航按钮 */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-700 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-700 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* 放大查看按钮 */}
              <button
                onClick={openModal}
                className="absolute top-4 right-4 bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
              >
                <Eye className="h-5 w-5" />
              </button>
            </div>

            {/* 缩略图导航 */}
            <div className="p-4 bg-slate-50">
              <div className="flex justify-center space-x-2 overflow-x-auto pb-2">
                {reportImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => goToSlide(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      index === currentIndex
                        ? 'border-amber-500 shadow-lg scale-110'
                        : 'border-slate-300 hover:border-amber-400'
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
              
              {/* 页面指示器 */}
              <div className="flex justify-center items-center mt-4 space-x-2">
                <span className="text-sm text-slate-600">
                  {reportImages[currentIndex].title}
                </span>
                <span className="text-sm text-slate-400">
                  ({currentIndex + 1} / {reportImages.length})
                </span>
              </div>
            </div>
          </div>

          {/* 行动按钮 */}
          <div className="text-center mt-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={openModal}
                className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                查看完整报告
              </button>
              <button className="border border-amber-500 text-amber-600 hover:bg-amber-50 px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2">
                <Download className="h-5 w-5" />
                下载报告样板
              </button>
            </div>
            <p className="text-sm text-slate-500">
              点击查看高清大图，体验专业八字分析报告的质量
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
                  专业八字分析报告 - 第 {currentIndex + 1} 页
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
