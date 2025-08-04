import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';

// 自动页面浏览跟踪Hook
export const usePageTracking = () => {
  const location = useLocation();
  
  useEffect(() => {
    // 页面加载时跟踪页面浏览
    trackPageView(document.title, location.pathname);
  }, [location]);
}; 