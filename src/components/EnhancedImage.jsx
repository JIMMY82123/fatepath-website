import { useState, useEffect, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'

const EnhancedImage = ({ 
  src, 
  alt, 
  className = '', 
  threshold = 0.1,
  placeholder = null,
  fallbackSrc = '/images/testimonials/emma-rodriguez.jpg',
  showSkeleton = true,
  showLoadingSpinner = true,
  mobileSrc = null,
  tabletSrc = null,
  sizes = "100vw",
  priority = false,
  webpSupport = true,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const [imageSrc, setImageSrc] = useState('')
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef(null)
  const observerRef = useRef(null)

  // 检测设备类型
  const isMobile = () => window.innerWidth <= 768
  const isTablet = () => window.innerWidth <= 1024 && window.innerWidth > 768

  // 获取最佳图片源
  const getBestSrc = useMemo(() => {
    if (isMobile() && mobileSrc) return mobileSrc
    if (isTablet() && tabletSrc) return tabletSrc
    return src
  }, [src, mobileSrc, tabletSrc])

  // 生成响应式图片源
  const generateSrcSet = useMemo(() => {
    const baseSrc = src
    const mobileSrcSet = mobileSrc ? `${mobileSrc} 768w` : ''
    const tabletSrcSet = tabletSrc ? `${tabletSrc} 1024w` : ''
    const desktopSrcSet = `${baseSrc} 1200w`
    
    return [mobileSrcSet, tabletSrcSet, desktopSrcSet]
      .filter(Boolean)
      .join(', ')
  }, [src, mobileSrc, tabletSrc])

  // 生成WebP源
  const generateWebPSrc = useMemo(() => {
    if (!webpSupport) return null
    const currentSrc = getBestSrc
    if (!currentSrc) return null
    
    // 如果已经是WebP格式，直接返回
    if (currentSrc.includes('.webp')) return currentSrc
    // 否则尝试生成WebP路径
    return currentSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp')
  }, [getBestSrc, webpSupport])

  // 使用 useMemo 优化占位符计算
  const placeholderElement = useMemo(() => {
    if (placeholder) return placeholder
    
    if (showSkeleton) {
      return (
        <div className="absolute inset-0 bg-gradient-to-r from-mystic-700 to-mystic-800 animate-pulse" />
      )
    }
    
    return null
  }, [placeholder, showSkeleton])

  // 懒加载观察器
  useEffect(() => {
    if (priority) {
      setIsInView(true)
      setImageSrc(getBestSrc)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          setImageSrc(getBestSrc)
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
      observerRef.current = observer
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [getBestSrc, threshold, priority])

  const handleLoad = () => {
    setIsLoaded(true)
    setHasError(false)
  }

  const handleError = () => {
    setHasError(true)
    // 如果主图片加载失败，显示备用图片
    if (fallbackSrc && fallbackSrc !== getBestSrc) {
      setImageSrc(fallbackSrc)
      setIsLoaded(false) // 重置加载状态以显示加载指示器
    } else {
      setIsLoaded(true) // 如果没有备用图片，直接标记为加载完成
    }
  }

  // 如果图片加载失败且没有备用图片，显示错误占位符
  const errorPlaceholder = hasError && !fallbackSrc && (
    <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-red-800/20 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 bg-red-600/30 rounded-full flex items-center justify-center mx-auto mb-2">
          <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <p className="text-red-400 text-xs">图片加载失败</p>
      </div>
    </div>
  )

  return (
    <motion.div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0.7 }}
      transition={{ duration: 0.3 }}
    >
      {/* 占位符 */}
      {!isLoaded && !hasError && placeholderElement}
      
      {/* 错误占位符 */}
      {errorPlaceholder}
      
      {/* 实际图片 */}
      {isInView && !hasError && (
        <picture>
          {/* WebP格式支持 */}
          {generateWebPSrc && (
            <source
              srcSet={generateWebPSrc}
              type="image/webp"
              sizes={sizes}
            />
          )}
          
          {/* 响应式图片源 */}
          {generateSrcSet && (
            <source
              srcSet={generateSrcSet}
              sizes={sizes}
            />
          )}

          {/* 默认图片 */}
          <motion.img
            src={imageSrc}
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
      
      {/* 加载指示器 */}
      {!isLoaded && isInView && showLoadingSpinner && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </motion.div>
  )
}

export default EnhancedImage
