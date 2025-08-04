import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'
import { useEffect, Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { PageLoader } from './components/LoadingSpinner'

// 懒加载页面组件
const Home = lazy(() => import('./pages/Home'))
const Services = lazy(() => import('./pages/Services'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Contact = lazy(() => import('./pages/Contact'))
const FAQ = lazy(() => import('./pages/FAQ'))
const BaziForm = lazy(() => import('./pages/BaziForm'))
const BaziFormDiscount = lazy(() => import('./pages/BaziFormDiscount'))
const FreeBaziReport = lazy(() => import('./pages/FreeBaziReport'))
const LoveForm = lazy(() => import('./pages/LoveForm'))
const TalismanForm = lazy(() => import('./pages/TalismanForm'))
const Privacy = lazy(() => import('./pages/Privacy'))
const PaymentGuide = lazy(() => import('./pages/PaymentGuide'))
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess'))
const WealthSign = lazy(() => import('./pages/WealthSign'))
import { initMobileOptimizations } from './utils/mobileOptimization'
import performanceMonitor from './utils/performanceMonitor'
import ErrorBoundary from './components/ErrorBoundary'
// import { usePageTracking } from './hooks/useAnalytics'

function App() {
  // 启用页面浏览跟踪
  // usePageTracking();
  
  // 初始化移动端优化和性能监控
  useEffect(() => {
    initMobileOptimizations();
    performanceMonitor.init();
  }, []);
  
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <Router>
          <div className="min-h-screen bg-mystic-900">
            <Navbar />
            <AnimatePresence mode="wait">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/contact" element={<Contact />} />
                                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/form-bazi" element={<BaziForm />} />
                    <Route path="/form-bazi-discount" element={<BaziFormDiscount />} />
                    <Route path="/free-bazi-report" element={<FreeBaziReport />} />
                    <Route path="/form-love" element={<LoveForm />} />
                    <Route path="/form-talisman" element={<TalismanForm />} />
                    <Route path="/privacy" element={<Privacy />} />
                  <Route path="/wealth-sign" element={<WealthSign />} />
                  <Route path="/payment/:service" element={<PaymentGuide />} />
                  <Route path="/payment-success/:service" element={<PaymentSuccess />} />
                </Routes>
              </Suspense>
            </AnimatePresence>
            <Footer />
          </div>
        </Router>
      </HelmetProvider>
    </ErrorBoundary>
  )
}

export default App 