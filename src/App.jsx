import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { PageLoader } from './components/LoadingSpinner'
import MobilePerformanceMonitor from './components/MobilePerformanceMonitor'
import MobileGestureHandler from './components/MobileGestureHandler'

// 懒加载页面组件
const Home = lazy(() => import('./pages/Home'))
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


function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-mystic-900">
          <Navbar />
          <MobileGestureHandler>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
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

              </Routes>
            </Suspense>
          </MobileGestureHandler>
          <Footer />
          
          {/* 移动端性能监控组件 */}
          <MobilePerformanceMonitor />
        </div>
      </Router>
    </HelmetProvider>
  )
}

export default App 