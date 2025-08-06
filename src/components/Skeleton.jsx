import { motion } from 'framer-motion'

// 博客文章骨架屏
export const BlogSkeleton = () => (
  <div className="space-y-6">
    {/* 标题骨架 */}
    <div className="space-y-4">
      <div className="h-8 bg-mystic-700 rounded animate-pulse w-3/4"></div>
      <div className="h-4 bg-mystic-700 rounded animate-pulse w-1/2"></div>
    </div>
    
    {/* 图片骨架 */}
    <div className="h-64 bg-mystic-700 rounded-lg animate-pulse"></div>
    
    {/* 内容骨架 */}
    <div className="space-y-3">
      <div className="h-4 bg-mystic-700 rounded animate-pulse"></div>
      <div className="h-4 bg-mystic-700 rounded animate-pulse"></div>
      <div className="h-4 bg-mystic-700 rounded animate-pulse w-5/6"></div>
      <div className="h-4 bg-mystic-700 rounded animate-pulse"></div>
      <div className="h-4 bg-mystic-700 rounded animate-pulse w-4/5"></div>
    </div>
  </div>
)

// 博客列表骨架屏
export const BlogListSkeleton = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[1, 2, 3, 4, 5, 6].map((item) => (
      <motion.div
        key={item}
        className="mystic-card p-6 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: item * 0.1 }}
      >
        {/* 图片骨架 */}
        <div className="h-48 bg-mystic-700 rounded-lg animate-pulse"></div>
        
        {/* 标题骨架 */}
        <div className="h-6 bg-mystic-700 rounded animate-pulse"></div>
        
        {/* 摘要骨架 */}
        <div className="space-y-2">
          <div className="h-4 bg-mystic-700 rounded animate-pulse"></div>
          <div className="h-4 bg-mystic-700 rounded animate-pulse w-3/4"></div>
        </div>
        
        {/* 元信息骨架 */}
        <div className="flex justify-between items-center">
          <div className="h-4 bg-mystic-700 rounded animate-pulse w-20"></div>
          <div className="h-4 bg-mystic-700 rounded animate-pulse w-16"></div>
        </div>
      </motion.div>
    ))}
  </div>
)

// 服务卡片骨架屏
export const ServiceSkeleton = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[1, 2, 3].map((item) => (
      <motion.div
        key={item}
        className="mystic-card p-8 text-center space-y-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: item * 0.2 }}
      >
        {/* 图标骨架 */}
        <div className="w-16 h-16 bg-mystic-700 rounded-full mx-auto animate-pulse"></div>
        
        {/* 标题骨架 */}
        <div className="h-8 bg-mystic-700 rounded animate-pulse w-3/4 mx-auto"></div>
        
        {/* 描述骨架 */}
        <div className="space-y-2">
          <div className="h-4 bg-mystic-700 rounded animate-pulse"></div>
          <div className="h-4 bg-mystic-700 rounded animate-pulse w-5/6"></div>
        </div>
        
        {/* 价格骨架 */}
        <div className="h-6 bg-mystic-700 rounded animate-pulse w-20 mx-auto"></div>
        
        {/* 按钮骨架 */}
        <div className="h-12 bg-mystic-700 rounded-lg animate-pulse"></div>
      </motion.div>
    ))}
  </div>
)

// 通用骨架屏
export const Skeleton = ({ 
  className = '', 
  width = 'w-full', 
  height = 'h-4',
  rounded = 'rounded'
}) => (
  <div 
    className={`${height} ${width} ${rounded} bg-mystic-700 animate-pulse ${className}`}
  />
)

// 文本骨架屏
export const TextSkeleton = ({ lines = 3, className = '' }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton 
        key={index}
        width={index === lines - 1 ? 'w-3/4' : 'w-full'}
      />
    ))}
  </div>
)

// 卡片骨架屏
export const CardSkeleton = ({ className = '' }) => (
  <div className={`mystic-card p-6 space-y-4 ${className}`}>
    <Skeleton height="h-6" width="w-3/4" />
    <TextSkeleton lines={3} />
    <div className="flex justify-between items-center">
      <Skeleton width="w-20" />
      <Skeleton width="w-16" />
    </div>
  </div>
)

export default Skeleton
