import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * 自定义Hook：路由跳转时自动滚动到页面顶部
 * 确保用户在切换页面时从顶部开始查看内容
 */
const useScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    // 平滑滚动到页面顶部
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [pathname])
}

export default useScrollToTop
