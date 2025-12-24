import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { PageLoader } from './components/LoadingSpinner'
import MobilePerformanceMonitor from './components/MobilePerformanceMonitor'
import MobileGestureHandler from './components/MobileGestureHandler'
import ScrollToTopButton from './components/ScrollToTopButton'
import MobileErrorBoundary from './components/MobileErrorBoundary'
import { mobileDiagnostics } from './utils/mobileDiagnostics'

// 直接导入Home组件，避免移动端懒加载问题
import Home from './pages/Home'
import RedirectToServices from './components/RedirectToServices'

// 懒加载其他页面组件
const Services = lazy(() => import('./pages/Services'))
const Contact = lazy(() => import('./pages/Contact'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Testimonials = lazy(() => import('./pages/Testimonials'))
const FreeBaziReport = lazy(() => import('./pages/FreeBaziReport'))
const WealthSign = lazy(() => import('./pages/WealthSign'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Resources = lazy(() => import('./pages/Resources'))
const DatasetDetail = lazy(() => import('./pages/DatasetDetail'))
const LoveCompatibilityTest = lazy(() => import('./pages/LoveCompatibilityTest'))
const AnimationDemo = lazy(() => import('./pages/AnimationDemo'))

function App() {
  useEffect(() => {
    // 添加全局错误处理
    const handleError = (event) => {
      console.error('Global Error:', event.error);
    };

    const handleUnhandledRejection = (event) => {
      console.error('Unhandled Promise Rejection:', event.reason);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return (
    <HelmetProvider>
      <MobileErrorBoundary>
        <Router>
          <div className="min-h-screen bg-mystic-900">
            <Navbar />
            <MobileGestureHandler>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={
                    <Suspense fallback={<PageLoader />}>
                      <Home />
                    </Suspense>
                  } />
                  <Route path="/services" element={<Services />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/testimonials" element={<Testimonials />} />
                  <Route path="/free-bazi-report" element={<FreeBaziReport />} />
                  <Route path="/wealth-sign" element={<WealthSign />} />
                  
                  {/* 重定向旧的一次性服务路由到新的会员制服务页面 */}
                  <Route path="/bazi-form" element={<RedirectToServices />} />
                  <Route path="/form-bazi-discount" element={<RedirectToServices />} />
                  <Route path="/bazi-discount-thank-you" element={<RedirectToServices />} />
                  <Route path="/love-form" element={<RedirectToServices />} />
                  <Route path="/talisman-form" element={<RedirectToServices />} />
                  <Route path="/payment-guide" element={<RedirectToServices />} />
                  <Route path="/payment-success" element={<RedirectToServices />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/resources/:datasetId" element={<DatasetDetail />} />
                  <Route path="/love-compatibility-test" element={<LoveCompatibilityTest />} />
                  <Route path="/animation-demo" element={<AnimationDemo />} />
                </Routes>
              </Suspense>
            </MobileGestureHandler>
            <Footer />
            
            {/* 移动端性能监控组件 - 已隐藏 */}
            {/* <MobilePerformanceMonitor /> */}
            
            {/* 移动端回到顶部按钮 */}
            <ScrollToTopButton />
          </div>
        </Router>
      </MobileErrorBoundary>
    </HelmetProvider>
  )
}

export default App 