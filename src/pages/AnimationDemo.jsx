import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { Sparkles, Zap, Star, Heart, Flame, Waves, Orbit } from 'lucide-react'
import SEO from '../components/SEO'

const AnimationDemo = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // 鼠标跟踪
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // 滚动驱动的动画值
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0])
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360])
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])

  // 弹性动画配置（备用）
  const springConfig = { stiffness: 100, damping: 15 }

  // 粒子效果
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 3
  }))

  return (
    <>
      <SEO 
        title="Animation Demo - 动态效果展示"
        description="展示现代网页设计中的各种动态效果和动画"
      />
      
      <main className="pt-20 min-h-screen bg-gradient-to-br from-mystic-900 via-mystic-800 to-mystic-900 overflow-hidden">
        <div ref={containerRef} className="relative">
          {/* Hero Section - 视差和3D效果 */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* 背景粒子效果 */}
            <div className="absolute inset-0">
              {particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute w-1 h-1 bg-gold-400 rounded-full"
                  style={{
                    left: `${particle.x}%`,
                    top: `${particle.y}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.3, 1, 0.3],
                    scale: [0.5, 1.5, 0.5],
                  }}
                  transition={{
                    duration: particle.duration,
                    repeat: Infinity,
                    delay: particle.delay,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            {/* 主标题 - 3D变换 */}
            <motion.div
              style={{
                scale,
                opacity,
                rotateY,
                y,
                x: mousePosition.x,
                rotateX: mousePosition.y,
              }}
              className="text-center z-10 perspective-1000"
            >
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-7xl md:text-9xl font-bold mb-6 bg-gradient-to-r from-gold-400 via-yellow-300 to-gold-400 bg-clip-text text-transparent"
                style={{
                  textShadow: "0 0 40px rgba(250, 204, 21, 0.5)",
                }}
              >
                Dynamic
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="text-5xl md:text-7xl font-bold mb-8 text-white"
              >
                Animations
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-xl text-mystic-300 max-w-2xl mx-auto"
              >
                探索现代网页设计的动态效果
              </motion.p>
            </motion.div>

            {/* 浮动装饰元素 */}
            <motion.div
              className="absolute top-20 left-10"
              animate={{
                y: [0, 20, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="w-12 h-12 text-gold-400" />
            </motion.div>
            <motion.div
              className="absolute bottom-20 right-10"
              animate={{
                y: [0, -20, 0],
                rotate: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Star className="w-16 h-16 text-yellow-300" />
            </motion.div>
          </section>

          {/* 动画卡片展示区 */}
          <section className="py-32 px-4">
            <div className="container mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-5xl font-bold text-center text-white mb-16"
              >
                动画效果展示
              </motion.h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* 卡片1: 悬停3D翻转 */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 15,
                    rotateX: 5,
                  }}
                  className="relative h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30 backdrop-blur-md"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Zap className="w-12 h-12 text-purple-400 mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">3D 翻转</h3>
                  <p className="text-mystic-300">鼠标悬停体验3D变换效果</p>
                </motion.div>

                {/* 卡片2: 渐变动画 */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="relative h-64 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 border border-blue-500/30 backdrop-blur-md overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0"
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <Heart className="w-12 h-12 text-blue-400 mb-4 relative z-10" />
                  <h3 className="text-2xl font-bold text-white mb-2 relative z-10">渐变流动</h3>
                  <p className="text-mystic-300 relative z-10">流畅的渐变动画效果</p>
                </motion.div>

                {/* 卡片3: 弹性动画 */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative h-64 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-500/30 backdrop-blur-md"
                >
                  <Flame className="w-12 h-12 text-green-400 mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">弹性交互</h3>
                  <p className="text-mystic-300">点击体验弹性反馈</p>
                </motion.div>

                {/* 卡片4: 旋转轨道 */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="relative h-64 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl p-6 border border-orange-500/30 backdrop-blur-md flex items-center justify-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute"
                  >
                    <Orbit className="w-16 h-16 text-orange-400" />
                  </motion.div>
                  <div className="relative z-10 text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">轨道旋转</h3>
                    <p className="text-mystic-300">持续旋转动画</p>
                  </div>
                </motion.div>

                {/* 卡片5: 波浪效果 */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="relative h-64 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl p-6 border border-indigo-500/30 backdrop-blur-md overflow-hidden"
                >
                  <Waves className="w-12 h-12 text-indigo-400 mb-4 relative z-10" />
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-indigo-500/30 to-transparent"
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <h3 className="text-2xl font-bold text-white mb-2 relative z-10">波浪动画</h3>
                  <p className="text-mystic-300 relative z-10">流畅的波浪效果</p>
                </motion.div>

                {/* 卡片6: 粒子爆炸 */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover="hover"
                  className="relative h-64 bg-gradient-to-br from-yellow-500/20 to-gold-400/20 rounded-2xl p-6 border border-yellow-500/30 backdrop-blur-md overflow-hidden"
                >
                  <motion.div
                    variants={{
                      hover: {
                        scale: 1.2,
                        transition: { duration: 0.3 }
                      }
                    }}
                  >
                    <Star className="w-12 h-12 text-yellow-400 mb-4" />
                  </motion.div>
                  {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                      initial={{ scale: 0, x: 0, y: 0 }}
                      whileHover={{
                        scale: [0, 1, 0],
                        x: (Math.random() - 0.5) * 200,
                        y: (Math.random() - 0.5) * 200,
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.02,
                      }}
                    />
                  ))}
                  <h3 className="text-2xl font-bold text-white mb-2">粒子爆炸</h3>
                  <p className="text-mystic-300">悬停触发粒子效果</p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* 滚动视差区域 */}
          <section className="py-32 px-4 relative">
            <div className="container mx-auto">
              <motion.div
                style={{
                  scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]),
                  opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]),
                }}
                className="text-center"
              >
                <h2 className="text-6xl font-bold text-white mb-8">滚动视差</h2>
                <p className="text-xl text-mystic-300 max-w-2xl mx-auto">
                  滚动页面查看元素随滚动变化的动态效果
                </p>
              </motion.div>

              {/* 多层视差元素 */}
              {[1, 2, 3].map((layer) => (
                <motion.div
                  key={layer}
                  style={{
                    y: useTransform(scrollYProgress, [0, 1], [0, layer * 50]),
                    opacity: useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]),
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div 
                    className="border-2 border-gold-400/30 rounded-full"
                    style={{
                      width: `${32 + layer * 8}px`,
                      height: `${32 + layer * 8}px`
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </section>

          {/* 交互式按钮展示 */}
          <section className="py-32 px-4">
            <div className="container mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl font-bold text-white mb-16"
              >
                交互式按钮
              </motion.h2>

              <div className="flex flex-wrap justify-center gap-8">
                {/* 按钮1: 磁性按钮 */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-bold text-lg overflow-hidden group"
                >
                  <motion.span
                    className="absolute inset-0 bg-white"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative z-10">磁性按钮</span>
                </motion.button>

                {/* 按钮2: 波纹效果 */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white font-bold text-lg overflow-hidden"
                  onClick={(e) => {
                    const button = e.currentTarget
                    const ripple = document.createElement('span')
                    const rect = button.getBoundingClientRect()
                    const size = Math.max(rect.width, rect.height)
                    const x = e.clientX - rect.left - size / 2
                    const y = e.clientY - rect.top - size / 2
                    
                    ripple.style.width = ripple.style.height = `${size}px`
                    ripple.style.left = `${x}px`
                    ripple.style.top = `${y}px`
                    ripple.classList.add('ripple')
                    
                    button.appendChild(ripple)
                    setTimeout(() => ripple.remove(), 600)
                  }}
                >
                  波纹按钮
                </motion.button>

                {/* 按钮3: 发光效果 */}
                <motion.button
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 0 30px rgba(250, 204, 21, 0.8)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gold-400 text-mystic-900 rounded-full font-bold text-lg"
                >
                  发光按钮
                </motion.button>
              </div>
            </div>
          </section>

          {/* 加载动画展示 */}
          <section className="py-32 px-4">
            <div className="container mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl font-bold text-center text-white mb-16"
              >
                加载动画
              </motion.h2>

              <div className="flex justify-center gap-12">
                {/* 旋转加载 */}
                <div className="flex flex-col items-center">
                  <motion.div
                    className="w-16 h-16 border-4 border-gold-400 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <p className="text-mystic-300 mt-4">旋转加载</p>
                </div>

                {/* 脉冲加载 */}
                <div className="flex flex-col items-center">
                  <motion.div
                    className="w-16 h-16 bg-gold-400 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <p className="text-mystic-300 mt-4">脉冲加载</p>
                </div>

                {/* 弹跳加载 */}
                <div className="flex flex-col items-center">
                  <div className="flex gap-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-4 h-4 bg-gold-400 rounded-full"
                        animate={{
                          y: [0, -20, 0],
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-mystic-300 mt-4">弹跳加载</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <style>{`
        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          transform: scale(0);
          animation: ripple-animation 0.6s ease-out;
          pointer-events: none;
        }
        
        @keyframes ripple-animation {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}

export default AnimationDemo

