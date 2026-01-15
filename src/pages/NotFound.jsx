import React from 'react'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft, BookOpen, Star, Compass } from 'lucide-react'
import SEO from '../components/SEO'
import LazyImage from '../components/LazyImage'

const NotFound = () => {
  return (
    <>
      <SEO 
        title="404 - Page Not Found | Chinese Astrology & Bazi Analysis | FatePath"
        description="The page you're looking for doesn't exist. Explore our Chinese astrology services and Bazi analysis tools. Bazi, also known as Four Pillars in Chinese astrology, offers deep insights into your destiny."
        keywords="chinese astrology, bazi, four pillars, chinese numerology, bazi analysis, chinese astrology reading, bazi chart, chinese astrology calculator"
        canonical="https://fatepath.me/404"
        noIndex={true}
      />
      <div className="min-h-screen bg-mystic-900 pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* 404 Header Section */}
          <section className="text-center py-12 mb-12">
            <h1 className="text-6xl md:text-8xl font-bold text-gold-400 mb-4">404</h1>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Page Not Found - Chinese Astrology Resources
            </h2>
            <p className="text-xl text-mystic-300 mb-8">
              The page you're looking for doesn't exist or has been moved. Bazi, also known as Four Pillars in Chinese astrology, is a powerful system for understanding your destiny through Chinese astrology principles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="bg-gradient-to-r from-gold-400 to-gold-600 text-mystic-900 px-8 py-4 rounded-lg text-lg font-bold hover:from-gold-500 hover:to-gold-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Home className="h-5 w-5" />
                Go Home
              </Link>
              <button
                onClick={() => window.history.back()}
                className="bg-mystic-700 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-mystic-600 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="h-5 w-5" />
                Go Back
              </button>
            </div>
          </section>

          {/* Chinese Astrology Introduction Section */}
          <section className="py-12 mb-12 bg-mystic-800/50 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Star className="h-8 w-8 text-gold-400" />
              Discover Chinese Astrology & Bazi Analysis
            </h2>
            <p className="text-lg text-mystic-200 mb-6 leading-relaxed">
              Chinese astrology is an ancient system that has guided millions for thousands of years. Bazi, also known as Four Pillars in Chinese astrology, is one of the most accurate methods in Chinese astrology for predicting life events and understanding personality traits through Chinese astrology principles.
            </p>
            <p className="text-lg text-mystic-200 mb-6 leading-relaxed">
              Our Chinese astrology platform offers comprehensive Bazi analysis tools. Bazi, also known as Four Pillars in Chinese astrology, combines the wisdom of Chinese astrology with modern analysis techniques to provide detailed insights into your Chinese astrology chart.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-mystic-900/50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gold-400 mb-4 flex items-center gap-2">
                  <BookOpen className="h-6 w-6" />
                  Free Bazi Report
                </h3>
                <p className="text-mystic-200 mb-4">
                  Get your free personalized Bazi reading based on Chinese astrology principles. Bazi, also known as Four Pillars in Chinese astrology, reveals your Chinese astrology destiny through comprehensive Chinese astrology analysis.
                </p>
                <Link
                  to="/free-bazi-report"
                  className="text-gold-400 hover:text-gold-300 font-semibold"
                >
                  Get Free Report →
                </Link>
              </div>
              <div className="bg-mystic-900/50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gold-400 mb-4 flex items-center gap-2">
                  <Compass className="h-6 w-6" />
                  Bazi Tools
                </h3>
                <p className="text-mystic-200 mb-4">
                  Explore our Chinese astrology tools for Bazi analysis. Bazi, also known as Four Pillars in Chinese astrology, can be analyzed using various Chinese astrology calculators and Chinese astrology techniques.
                </p>
                <Link
                  to="/resources"
                  className="text-gold-400 hover:text-gold-300 font-semibold"
                >
                  View Tools →
                </Link>
              </div>
            </div>
          </section>

          {/* What is Chinese Astrology Section */}
          <section className="py-12 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              What is Chinese Astrology?
            </h2>
            <p className="text-lg text-mystic-200 mb-6 leading-relaxed">
              Chinese astrology is a complex system that has been practiced for over 2,000 years. Chinese astrology uses the principles of the Five Elements, Yin and Yang, and the Chinese zodiac to provide insights through Chinese astrology analysis. Bazi, also known as Four Pillars in Chinese astrology, is a core component of Chinese astrology that analyzes your birth chart using Chinese astrology methods.
            </p>
            <p className="text-lg text-mystic-200 mb-6 leading-relaxed">
              The accuracy of Chinese astrology, especially Bazi analysis, has made Chinese astrology one of the most respected systems worldwide. Chinese astrology practitioners use Bazi, also known as Four Pillars in Chinese astrology, to predict career success, relationships, health, and wealth through Chinese astrology principles.
            </p>
            <div className="bg-gradient-to-r from-gold-500/20 to-yellow-500/20 border border-gold-500/30 rounded-lg p-6 mt-8">
              <h3 className="text-2xl font-bold text-gold-400 mb-4">
                Why Choose Chinese Astrology?
            </h3>
              <p className="text-mystic-200 mb-4 leading-relaxed">
                Chinese astrology offers detailed insights that other systems cannot match. Bazi, also known as Four Pillars in Chinese astrology, provides precise timing predictions through Chinese astrology analysis. Our Chinese astrology experts use advanced Chinese astrology techniques to deliver accurate Chinese astrology readings.
              </p>
              <p className="text-mystic-200 leading-relaxed">
                Whether you're new to Chinese astrology or an experienced practitioner, our Chinese astrology platform provides comprehensive Bazi analysis. Chinese astrology has helped millions understand their destiny, and Bazi, also known as Four Pillars in Chinese astrology, is the most accurate method in Chinese astrology for personal analysis.
              </p>
            </div>
          </section>

          {/* Popular Chinese Astrology Services */}
          <section className="py-12 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              Popular Chinese Astrology Services
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-mystic-800/50 rounded-lg p-6">
                <LazyImage
                  src="/images/bazi-reading.jpg"
                  alt="Free Bazi reading service using Chinese astrology principles"
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold text-gold-400 mb-3">
                  Free Bazi Reading
                </h3>
                <p className="text-mystic-200 mb-4">
                  Get a comprehensive Bazi analysis using Chinese astrology. Bazi, also known as Four Pillars in Chinese astrology, reveals your Chinese astrology destiny through professional Chinese astrology analysis.
                </p>
                <Link
                  to="/free-bazi-report"
                  className="text-gold-400 hover:text-gold-300 font-semibold"
                >
                  Try Free Reading →
                </Link>
              </div>
              <div className="bg-mystic-800/50 rounded-lg p-6">
                <LazyImage
                  src="/images/bazi-tools.jpg"
                  alt="Bazi analysis tools for Chinese astrology calculations"
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold text-gold-400 mb-3">
                  Bazi Tools
                </h3>
                <p className="text-mystic-200 mb-4">
                  Access professional Chinese astrology tools for Bazi analysis. Bazi, also known as Four Pillars in Chinese astrology, can be calculated using our Chinese astrology calculators and Chinese astrology resources.
                </p>
                <Link
                  to="/resources"
                  className="text-gold-400 hover:text-gold-300 font-semibold"
                >
                  Explore Tools →
                </Link>
              </div>
              <div className="bg-mystic-800/50 rounded-lg p-6">
                <LazyImage
                  src="/images/chinese-astrology-services.jpg"
                  alt="Professional Chinese astrology consultation services"
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold text-gold-400 mb-3">
                  Professional Services
                </h3>
                <p className="text-mystic-200 mb-4">
                  Book a detailed Chinese astrology consultation with our Chinese astrology experts. Bazi, also known as Four Pillars in Chinese astrology, provides accurate predictions through personalized Chinese astrology readings.
                </p>
                <Link
                  to="/services"
                  className="text-gold-400 hover:text-gold-300 font-semibold"
                >
                  View Services →
                </Link>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-12 mb-12 text-center bg-gradient-to-r from-mystic-800 to-mystic-900 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Start Your Chinese Astrology Journey Today
            </h2>
            <p className="text-lg text-mystic-300 mb-8 max-w-2xl mx-auto">
              Discover the power of Chinese astrology through Bazi analysis. Bazi, also known as Four Pillars in Chinese astrology, offers the most accurate insights in Chinese astrology. Experience professional Chinese astrology analysis and unlock your Chinese astrology destiny.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/free-bazi-report"
                className="bg-gradient-to-r from-gold-400 to-gold-600 text-mystic-900 px-8 py-4 rounded-lg text-lg font-bold hover:from-gold-500 hover:to-gold-700 transition-all duration-300"
              >
                Get Free Bazi Report
              </Link>
              <Link
                to="/blog"
                className="bg-mystic-700 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-mystic-600 transition-all duration-300"
              >
                Read Chinese Astrology Blog
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default NotFound
