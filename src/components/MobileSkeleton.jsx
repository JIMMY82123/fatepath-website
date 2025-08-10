import { motion } from 'framer-motion'
import { isMobile } from '../utils/mobileOptimization.js'

// 移动端优化的骨架屏基础组件
const MobileSkeleton = ({ 
  className = '', 
  width = 'w-full', 
  height = 'h-4',
  rounded = 'rounded',
  delay = 0 
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: delay * 0.1 }}
    className={`${width} ${height} ${rounded} bg-mystic-700/50 animate-pulse ${className}`}
    style={{
      willChange: 'opacity',
      transform: 'translateZ(0)'
    }}
  />
)

// 移动端卡片骨架屏
export const MobileCardSkeleton = () => (
  <div className="mystic-card p-4 sm:p-6 space-y-3 sm:space-y-4 animate-optimized">
    <MobileSkeleton height="h-5 sm:h-6" width="w-3/4" delay={0} />
    <MobileSkeleton height="h-3 sm:h-4" width="w-full" delay={1} />
    <MobileSkeleton height="h-3 sm:h-4" width="w-2/3" delay={2} />
    <div className="flex flex-wrap gap-2 sm:gap-3">
      <MobileSkeleton height="h-7 sm:h-8" width="w-16 sm:w-20" rounded="rounded-full" delay={3} />
      <MobileSkeleton height="h-7 sm:h-8" width="w-20 sm:w-24" rounded="rounded-full" delay={4} />
    </div>
  </div>
)

// 移动端列表骨架屏
export const MobileListSkeleton = ({ count = 3 }) => (
  <div className="space-y-3 sm:space-y-4">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="flex items-center space-x-3 sm:space-x-4">
        <MobileSkeleton 
          height="h-10 sm:h-12" 
          width="w-10 sm:w-12" 
          rounded="rounded-full" 
          delay={index}
        />
        <div className="flex-1 space-y-2">
          <MobileSkeleton height="h-3 sm:h-4" width="w-3/4" delay={index + 1} />
          <MobileSkeleton height="h-2 sm:h-3" width="w-1/2" delay={index + 2} />
        </div>
      </div>
    ))}
  </div>
)



// 移动端表单骨架屏
export const MobileFormSkeleton = () => (
  <div className="mystic-card p-4 sm:p-6 space-y-4 sm:space-y-6">
    {/* 表单标题 */}
    <div className="space-y-2">
      <MobileSkeleton height="h-6 sm:h-8" width="w-2/3" delay={0} />
      <MobileSkeleton height="h-4" width="w-full" delay={1} />
    </div>
    
    {/* 表单字段 */}
    <div className="space-y-4">
      <div className="space-y-2">
        <MobileSkeleton height="h-4" width="w-20" delay={2} />
        <MobileSkeleton height="h-12" width="w-full" rounded="rounded-lg" delay={3} />
      </div>
      <div className="space-y-2">
        <MobileSkeleton height="h-4" width="w-24" delay={4} />
        <MobileSkeleton height="h-12" width="w-full" rounded="rounded-lg" delay={5} />
      </div>
      <div className="space-y-2">
        <MobileSkeleton height="h-4" width="w-16" delay={6} />
        <MobileSkeleton height="h-12" width="w-full" rounded="rounded-lg" delay={7} />
      </div>
    </div>
    
    {/* 提交按钮 */}
    <MobileSkeleton height="h-12" width="w-full" rounded="rounded-lg" delay={8} />
  </div>
)

// 移动端服务卡片骨架屏
export const MobileServiceSkeleton = () => (
  <div className="mystic-card p-4 sm:p-6 space-y-4">
    {/* 服务图标 */}
    <div className="flex justify-center">
      <MobileSkeleton height="h-16 sm:h-20" width="w-16 sm:w-20" rounded="rounded-full" delay={0} />
    </div>
    
    {/* 服务标题 */}
    <div className="text-center space-y-2">
      <MobileSkeleton height="h-5 sm:h-6" width="w-3/4 mx-auto" delay={1} />
      <MobileSkeleton height="h-4" width="w-full" delay={2} />
    </div>
    
    {/* 服务描述 */}
    <div className="space-y-2">
      <MobileSkeleton height="h-3" width="w-full" delay={3} />
      <MobileSkeleton height="h-3" width="w-2/3" delay={4} />
    </div>
    
    {/* 价格和按钮 */}
    <div className="flex items-center justify-between">
      <MobileSkeleton height="h-6" width="w-20" delay={5} />
      <MobileSkeleton height="h-10" width="w-24" rounded="rounded-lg" delay={6} />
    </div>
  </div>
)

// 移动端导航骨架屏
export const MobileNavSkeleton = () => (
  <div className="fixed top-0 w-full z-50 bg-mystic-900/80 backdrop-blur-md border-b border-mystic-700/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <MobileSkeleton height="h-6 sm:h-8" width="w-6 sm:w-8" rounded="rounded" delay={0} />
          <MobileSkeleton height="h-6" width="w-20" delay={1} />
        </div>
        
        {/* 菜单按钮 */}
        <MobileSkeleton height="h-8" width="w-8" rounded="rounded" delay={2} />
      </div>
    </div>
  </div>
)

// 移动端页面加载骨架屏
export const MobilePageSkeleton = () => (
  <div className="min-h-screen bg-mystic-900 pt-20 px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto">
      {/* 页面标题 */}
      <div className="text-center mb-8 sm:mb-12 space-y-4">
        <MobileSkeleton height="h-8 sm:h-12" width="w-3/4 mx-auto" delay={0} />
        <MobileSkeleton height="h-4 sm:h-6" width="w-full mx-auto" delay={1} />
      </div>
      
      {/* 页面内容 */}
      <div className="space-y-6 sm:space-y-8">
        <MobileCardSkeleton />
        <MobileCardSkeleton />
        <MobileCardSkeleton />
      </div>
    </div>
  </div>
)

// 移动端优化的加载动画
export const MobileLoadingAnimation = ({ text = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center py-8 sm:py-12">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ 
        duration: 1, 
        repeat: Infinity, 
        ease: "linear" 
      }}
      className="w-8 h-8 sm:w-12 sm:h-12 text-gold-400"
      style={{
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}
    >
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </motion.div>
    
    {text && (
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-4 text-mystic-300 text-sm sm:text-base font-medium"
      >
        {text}
      </motion.p>
    )}
  </div>
)

export default MobileSkeleton 