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

// 懒加载其他页面组件
const Services = lazy(() => import('./pages/Services'))
const Contact = lazy(() => import('./pages/Contact'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Testimonials = lazy(() => import('./pages/Testimonials'))
const FreeBaziReport = lazy(() => import('./pages/FreeBaziReport'))
const BaziForm = lazy(() => import('./pages/BaziForm'))
const BaziFormDiscount = lazy(() => import('./pages/BaziFormDiscount'))
const BaziDiscountThankYou = lazy(() => import('./pages/BaziDiscountThankYou'))
const LoveForm = lazy(() => import('./pages/LoveForm'))
const TalismanForm = lazy(() => import('./pages/TalismanForm'))
const WealthSign = lazy(() => import('./pages/WealthSign'))
const PaymentGuide = lazy(() => import('./pages/PaymentGuide'))
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Resources = lazy(() => import('./pages/Resources'))
const DatasetDetail = lazy(() => import('./pages/DatasetDetail'))
const LoveCompatibilityTest = lazy(() => import('./pages/LoveCompatibilityTest'))

// 移动端检测函数
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         window.innerWidth <= 768;
}

// 简化的移动端加载组件
const MobileLoader = () => (
  <div className="min-h-screen bg-mystic-900 flex items-center justify-center">
    <div className="text-center text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-400 mx-auto mb-4"></div>
      <p className="text-lg">正在加载...</p>
      <p className="text-sm text-mystic-300 mt-2">移动端优化中</p>
    </div>
  </div>
)

function App() {
  useEffect(() => {
    // 添加全局错误处理
    const handleError = (event) => {
      console.error('Global Error:', event.error);
      
      // 移动端显示友好的错误信息
      if (isMobile()) {
        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = `
          <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: #1a1a1a; color: white; padding: 20px; display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 9999;">
            <h2 style="margin-bottom: 16px; color: #fbbf24;">页面加载出现问题</h2>
            <p style="margin-bottom: 20px; text-align: center;">请刷新页面重试，如果问题持续存在，请检查网络连接</p>
            <button onclick="window.location.reload()" style="background: #fbbf24; color: #1a1a1a; padding: 12px 24px; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">刷新页面</button>
          </div>
        `;
        document.body.appendChild(errorDiv);
      }
    };

    const handleUnhandledRejection = (event) => {
      console.error('Unhandled Promise Rejection:', event.reason);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // 移动端性能优化
    if (isMobile()) {
      console.log('移动端检测到，启用优化模式');
      
      // 运行移动端诊断
      setTimeout(() => {
        mobileDiagnostics.quickDiagnostics().then(result => {
          if (result.summary.includes('问题')) {
            console.warn('移动端诊断发现问题，建议检查设备兼容性');
          }
        });
      }, 1000);
      
      // 延迟加载非关键资源
      setTimeout(() => {
        // 可以在这里延迟加载一些非关键的功能
      }, 2000);
    }

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return (
    <HelmetProvider>
      <MobileErrorBoundary>
        <Router>
          {isMobile() ? (
            // 移动端简化版本 - 减少复杂组件避免白屏
            <div className="min-h-screen bg-mystic-900">
              <Navbar />
              <Routes>
                <Route path="/" element={
                  <Suspense fallback={<MobileLoader />}>
                    <Home />
                  </Suspense>
                } />
                <Route path="/services" element={
                  <Suspense fallback={<MobileLoader />}>
                    <Services />
                  </Suspense>
                } />
                <Route path="/contact" element={
                  <Suspense fallback={<MobileLoader />}>
                    <Contact />
                  </Suspense>
                } />
                <Route path="/faq" element={
                  <Suspense fallback={<MobileLoader />}>
                    <FAQ />
                  </Suspense>
                } />
                <Route path="/testimonials" element={
                  <Suspense fallback={<MobileLoader />}>
                    <Testimonials />
                  </Suspense>
                } />
                <Route path="/free-bazi-report" element={
                  <Suspense fallback={<MobileLoader />}>
                    <FreeBaziReport />
                  </Suspense>
                } />
                <Route path="/bazi-form" element={
                  <Suspense fallback={<MobileLoader />}>
                    <BaziForm />
                  </Suspense>
                } />
                <Route path="/form-bazi-discount" element={
                  <Suspense fallback={<MobileLoader />}>
                    <BaziFormDiscount />
                  </Suspense>
                } />
                <Route path="/bazi-discount-thank-you" element={
                  <Suspense fallback={<MobileLoader />}>
                    <BaziDiscountThankYou />
                  </Suspense>
                } />
                <Route path="/love-form" element={
                  <Suspense fallback={<MobileLoader />}>
                    <LoveForm />
                  </Suspense>
                } />
                <Route path="/talisman-form" element={
                  <Suspense fallback={<MobileLoader />}>
                    <TalismanForm />
                  </Suspense>
                } />
                <Route path="/wealth-sign" element={
                  <Suspense fallback={<MobileLoader />}>
                    <WealthSign />
                  </Suspense>
                } />
                <Route path="/payment-guide" element={
                  <Suspense fallback={<MobileLoader />}>
                    <PaymentGuide />
                  </Suspense>
                } />
                <Route path="/payment-success" element={
                  <Suspense fallback={<MobileLoader />}>
                    <PaymentSuccess />
                  </Suspense>
                } />
                <Route path="/privacy" element={
                  <Suspense fallback={<MobileLoader />}>
                    <Privacy />
                  </Suspense>
                } />
                <Route path="/blog" element={
                  <Suspense fallback={<MobileLoader />}>
                    <Blog />
                  </Suspense>
                } />
                <Route path="/blog/:slug" element={
                  <Suspense fallback={<MobileLoader />}>
                    <BlogPost />
                  </Suspense>
                } />
                <Route path="/resources" element={
                  <Suspense fallback={<MobileLoader />}>
                    <Resources />
                  </Suspense>
                } />
                <Route path="/resources/:datasetId" element={
                  <Suspense fallback={<MobileLoader />}>
                    <DatasetDetail />
                  </Suspense>
                } />
                <Route path="/love-compatibility-test" element={
                  <Suspense fallback={<MobileLoader />}>
                    <LoveCompatibilityTest />
                  </Suspense>
                } />
              </Routes>
              <Footer />
            </div>
          ) : (
            // 桌面端完整版本
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
                    <Route path="/bazi-form" element={<BaziForm />} />
                    <Route path="/form-bazi-discount" element={<BaziFormDiscount />} />
                    <Route path="/bazi-discount-thank-you" element={<BaziDiscountThankYou />} />
                    <Route path="/love-form" element={<LoveForm />} />
                    <Route path="/talisman-form" element={<TalismanForm />} />
                    <Route path="/wealth-sign" element={<WealthSign />} />
                    <Route path="/payment-guide" element={<PaymentGuide />} />
                    <Route path="/payment-success" element={<PaymentSuccess />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/resources/:datasetId" element={<DatasetDetail />} />
                    <Route path="/love-compatibility-test" element={<LoveCompatibilityTest />} />
                  </Routes>
                </Suspense>
              </MobileGestureHandler>
              <Footer />
              
              {/* 移动端性能监控组件 - 仅在桌面端显示 */}
              <MobilePerformanceMonitor />
              
              {/* 移动端回到顶部按钮 - 仅在桌面端显示 */}
              <ScrollToTopButton />
            </div>
          )}
        </Router>
      </MobileErrorBoundary>
    </HelmetProvider>
  )
}

export default App 