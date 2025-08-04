import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const OptimizedImage = ({ 
  src, 
  alt, 
  className = "", 
  mobileSrc = null,
  tabletSrc = null,
  sizes = "100vw",
  priority = false,
  placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%231e293b'/%3E%3C/svg%3E",
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef(null)
  const observerRef = useRef(null)

  // 检测是否为移动设备
  const isMobile = () => window.innerWidth <= 768
  const isTablet = () => window.innerWidth <= 1024 && window.innerWidth > 768

  // 获取最佳图片源
  const getBestSrc = () => {
    if (isMobile() && mobileSrc) return mobileSrc
    if (isTablet() && tabletSrc) return tabletSrc
    return src
  }

  // 生成响应式图片源
  const generateSrcSet = () => {
    const baseSrc = src
    const mobileSrcSet = mobileSrc ? `${mobileSrc} 768w` : ''
    const tabletSrcSet = tabletSrc ? `${tabletSrc} 1024w` : ''
    const desktopSrcSet = `${baseSrc} 1200w`
    
    return [mobileSrcSet, tabletSrcSet, desktopSrcSet]
      .filter(Boolean)
      .join(', ')
  }

  // 懒加载观察器
  useEffect(() => {
    if (priority) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
      observerRef.current = observer
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [priority])

  // 图片加载处理
  const handleLoad = () => {
    setIsLoaded(true)
    setHasError(false)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoaded(false)
  }

  // 生成WebP源
  const generateWebPSrc = (originalSrc) => {
    if (!originalSrc) return null
    // 如果已经是WebP格式，直接返回
    if (originalSrc.includes('.webp')) return originalSrc
    // 否则尝试生成WebP路径
    return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp')
  }

  const currentSrc = getBestSrc()
  const webpSrc = generateWebPSrc(currentSrc)
  const srcSet = generateSrcSet()

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {/* 占位符 */}
      {!isLoaded && !hasError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-mystic-800 animate-pulse"
        />
      )}

      {/* 错误状态 */}
      {hasError && (
        <div className="absolute inset-0 bg-mystic-800 flex items-center justify-center">
          <div className="text-mystic-400 text-center">
            <div className="text-2xl mb-2">📷</div>
            <div className="text-sm">图片加载失败</div>
          </div>
        </div>
      )}

      {/* 实际图片 */}
      {isInView && !hasError && (
        <picture>
          {/* WebP格式支持 */}
          {webpSrc && (
            <source
              srcSet={webpSrc}
              type="image/webp"
              sizes={sizes}
            />
          )}
          
          {/* 响应式图片源 */}
          {srcSet && (
            <source
              srcSet={srcSet}
              sizes={sizes}
            />
          )}

          {/* 默认图片 */}
          <motion.img
            src={currentSrc}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            {...props}
          />
        </picture>
      )}

      {/* 加载动画 */}
      {!isLoaded && isInView && !hasError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}

export default OptimizedImage 