import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

const LoadingSpinner = ({ 
  size = 'md', 
  text = 'Loading...', 
  fullScreen = false,
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  const spinner = (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex flex-col items-center justify-center ${className}`}
    >
      {/* 旋转的加载图标 */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 1, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className={`${sizeClasses[size]} text-gold-400`}
      >
        <Loader2 className="w-full h-full" />
      </motion.div>

      {/* 加载文字 */}
      {text && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`mt-3 text-mystic-300 ${textSizes[size]} font-medium`}
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-mystic-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {spinner}
      </div>
    )
  }

  return spinner
}

// 页面加载组件
export const PageLoader = ({ text = 'Loading page...' }) => (
  <div className="min-h-screen bg-mystic-900 flex items-center justify-center">
    <LoadingSpinner size="lg" text={text} />
  </div>
)

// 内容加载组件
export const ContentLoader = ({ text = 'Loading content...' }) => (
  <div className="flex items-center justify-center py-12">
    <LoadingSpinner size="md" text={text} />
  </div>
)

// 按钮加载组件
export const ButtonLoader = ({ text = 'Loading...' }) => (
  <div className="flex items-center space-x-2">
    <LoadingSpinner size="sm" text="" />
    <span className="text-sm">{text}</span>
  </div>
)

// 骨架屏组件
export const Skeleton = ({ 
  className = '', 
  width = 'w-full', 
  height = 'h-4',
  rounded = 'rounded' 
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className={`${width} ${height} ${rounded} bg-mystic-700 animate-pulse ${className}`}
  />
)

// 卡片骨架屏
export const CardSkeleton = () => (
  <div className="mystic-card p-6 space-y-4">
    <Skeleton height="h-6" width="w-3/4" />
    <Skeleton height="h-4" width="w-full" />
    <Skeleton height="h-4" width="w-2/3" />
    <div className="flex space-x-2">
      <Skeleton height="h-8" width="w-20" rounded="rounded-full" />
      <Skeleton height="h-8" width="w-24" rounded="rounded-full" />
    </div>
  </div>
)

// 列表骨架屏
export const ListSkeleton = ({ count = 3 }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="flex items-center space-x-4">
        <Skeleton height="h-12" width="w-12" rounded="rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton height="h-4" width="w-3/4" />
          <Skeleton height="h-3" width="w-1/2" />
        </div>
      </div>
    ))}
  </div>
)

// 表格骨架屏
export const TableSkeleton = ({ rows = 5, columns = 4 }) => (
  <div className="overflow-hidden">
    <div className="grid grid-cols-4 gap-4 p-4 border-b border-mystic-700">
      {Array.from({ length: columns }).map((_, index) => (
        <Skeleton key={index} height="h-4" />
      ))}
    </div>
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="grid grid-cols-4 gap-4 p-4 border-b border-mystic-700/50">
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton key={colIndex} height="h-4" />
        ))}
      </div>
    ))}
  </div>
)

export default LoadingSpinner 