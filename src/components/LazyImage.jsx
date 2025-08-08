import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  threshold = 0.1,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [imageSrc, setImageSrc] = useState('')
  const imgRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          setImageSrc(src)
          observer.disconnect()
        }
      },
      {
        threshold,
        rootMargin: '50px'
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [src, threshold])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    // 如果主图片加载失败，根据原始src选择不同的默认头像
    let defaultAvatar = '/images/testimonials/emma-rodriguez.jpg'
    
    // 根据原始路径选择不同的默认头像，避免重复
    if (src.includes('david-kim') || src.includes('david-thompson')) {
      defaultAvatar = '/images/testimonials/michael-chen.jpg'
    } else if (src.includes('lisa-wang') || src.includes('jennifer-lee')) {
      defaultAvatar = '/images/testimonials/sarah-johnson.jpg'
    } else if (src.includes('robert-martinez') || src.includes('alex-thompson') || src.includes('alex-kim')) {
      defaultAvatar = '/images/testimonials/emma-rodriguez.jpg'
    } else if (src.includes('maria-garcia') || src.includes('james-wilson')) {
      defaultAvatar = '/images/testimonials/michael-chen.jpg'
    } else if (src.includes('sophie-anderson') || src.includes('yuki-tanaka') || src.includes('amanda-foster')) {
      defaultAvatar = '/images/testimonials/sarah-johnson.jpg'
    }
    
    setImageSrc(defaultAvatar)
    setIsLoaded(true)
  }

  return (
    <motion.div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0.7 }}
      transition={{ duration: 0.3 }}
    >
      {/* 骨架屏 */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-mystic-700 to-mystic-800 animate-pulse" />
      )}
      
      {/* 实际图片 */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          {...props}
        />
      )}
      
      {/* 加载指示器 */}
      {!isLoaded && isInView && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </motion.div>
  )
}

export default LazyImage
