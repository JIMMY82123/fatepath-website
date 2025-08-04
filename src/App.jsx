import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import BaziForm from './pages/BaziForm'
import LoveForm from './pages/LoveForm'
import TalismanForm from './pages/TalismanForm'
import PaymentGuide from './pages/PaymentGuide'
import PaymentSuccess from './pages/PaymentSuccess'
import WealthSign from './pages/WealthSign'
import { usePageTracking } from './hooks/useAnalytics'

function App() {
  // 启用页面浏览跟踪
  usePageTracking();
  return (
    <Router>
      <div className="min-h-screen bg-mystic-900">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/form-bazi" element={<BaziForm />} />
            <Route path="/form-love" element={<LoveForm />} />
            <Route path="/form-talisman" element={<TalismanForm />} />
            <Route path="/wealth-sign" element={<WealthSign />} />
            <Route path="/payment/:service" element={<PaymentGuide />} />
            <Route path="/payment-success/:service" element={<PaymentSuccess />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </Router>
  )
}

export default App 