import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Home, ArrowLeft, BookOpen, Star, Compass } from 'lucide-react'
import SEO from '../components/SEO'
import LazyImage from '../components/LazyImage'

const NotFound = () => {
  const { t } = useTranslation()
  return (
    <>
      <SEO 
        title={t('notFound.seoTitle')}
        description={t('notFound.seoDescription')}
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
              {t('notFound.title')}
            </h2>
            <p className="text-xl text-mystic-300 mb-8">
              {t('notFound.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="bg-gradient-to-r from-gold-400 to-gold-600 text-mystic-900 px-8 py-4 rounded-lg text-lg font-bold hover:from-gold-500 hover:to-gold-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Home className="h-5 w-5" />
                {t('notFound.goHome')}
              </Link>
              <button
                onClick={() => window.history.back()}
                className="bg-mystic-700 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-mystic-600 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="h-5 w-5" />
                {t('notFound.goBack')}
              </button>
            </div>
          </section>

          {/* Chinese Astrology Introduction Section */}
          <section className="py-12 mb-12 bg-mystic-800/50 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Star className="h-8 w-8 text-gold-400" />
              {t('notFound.discoverTitle')}
            </h2>
            <p className="text-lg text-mystic-200 mb-6 leading-relaxed">
              {t('notFound.discoverDesc1')}
            </p>
            <p className="text-lg text-mystic-200 mb-6 leading-relaxed">
              {t('notFound.discoverDesc2')}
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-mystic-900/50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gold-400 mb-4 flex items-center gap-2">
                  <BookOpen className="h-6 w-6" />
                  {t('notFound.card1.title')}
                </h3>
                <p className="text-mystic-200 mb-4">
                  {t('notFound.card1.description')}
                </p>
                <Link
                  to="/free-bazi-report"
                  className="text-gold-400 hover:text-gold-300 font-semibold"
                >
                  {t('notFound.card1.link')} →
                </Link>
              </div>
              <div className="bg-mystic-900/50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gold-400 mb-4 flex items-center gap-2">
                  <Compass className="h-6 w-6" />
                  {t('notFound.card2.title')}
                </h3>
                <p className="text-mystic-200 mb-4">
                  {t('notFound.card2.description')}
                </p>
                <Link
                  to="/resources"
                  className="text-gold-400 hover:text-gold-300 font-semibold"
                >
                  {t('notFound.card2.link')} →
                </Link>
              </div>
            </div>
          </section>

          {/* What is Chinese Astrology Section */}
          <section className="py-12 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              {t('notFound.whatIsTitle')}
            </h2>
            <p className="text-lg text-mystic-200 mb-6 leading-relaxed">
              {t('notFound.whatIsDesc1')}
            </p>
            <p className="text-lg text-mystic-200 mb-6 leading-relaxed">
              {t('notFound.whatIsDesc2')}
            </p>
            <div className="bg-gradient-to-r from-gold-500/20 to-yellow-500/20 border border-gold-500/30 rounded-lg p-6 mt-8">
              <h3 className="text-2xl font-bold text-gold-400 mb-4">
                {t('notFound.whyChooseTitle')}
            </h3>
              <p className="text-mystic-200 mb-4 leading-relaxed">
                {t('notFound.whyChooseDesc1')}
              </p>
              <p className="text-mystic-200 leading-relaxed">
                {t('notFound.whyChooseDesc2')}
              </p>
            </div>
          </section>

          {/* Popular Chinese Astrology Services */}
          <section className="py-12 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              {t('notFound.popularServicesTitle')}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-mystic-800/50 rounded-lg p-6">
                <LazyImage
                  src="/images/bazi-reading.jpg"
                  alt={t('notFound.service1.alt')}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold text-gold-400 mb-3">
                  {t('notFound.service1.title')}
                </h3>
                <p className="text-mystic-200 mb-4">
                  {t('notFound.service1.description')}
                </p>
                <Link
                  to="/free-bazi-report"
                  className="text-gold-400 hover:text-gold-300 font-semibold"
                >
                  {t('notFound.service1.link')} →
                </Link>
              </div>
              <div className="bg-mystic-800/50 rounded-lg p-6">
                <LazyImage
                  src="/images/bazi-tools.jpg"
                  alt={t('notFound.service2.alt')}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold text-gold-400 mb-3">
                  {t('notFound.service2.title')}
                </h3>
                <p className="text-mystic-200 mb-4">
                  {t('notFound.service2.description')}
                </p>
                <Link
                  to="/resources"
                  className="text-gold-400 hover:text-gold-300 font-semibold"
                >
                  {t('notFound.service2.link')} →
                </Link>
              </div>
              <div className="bg-mystic-800/50 rounded-lg p-6">
                <LazyImage
                  src="/images/chinese-astrology-services.jpg"
                  alt={t('notFound.service3.alt')}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold text-gold-400 mb-3">
                  {t('notFound.service3.title')}
                </h3>
                <p className="text-mystic-200 mb-4">
                  {t('notFound.service3.description')}
                </p>
                <Link
                  to="/services"
                  className="text-gold-400 hover:text-gold-300 font-semibold"
                >
                  {t('notFound.service3.link')} →
                </Link>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-12 mb-12 text-center bg-gradient-to-r from-mystic-800 to-mystic-900 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              {t('notFound.ctaTitle')}
            </h2>
            <p className="text-lg text-mystic-300 mb-8 max-w-2xl mx-auto">
              {t('notFound.ctaDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/free-bazi-report"
                className="bg-gradient-to-r from-gold-400 to-gold-600 text-mystic-900 px-8 py-4 rounded-lg text-lg font-bold hover:from-gold-500 hover:to-gold-700 transition-all duration-300"
              >
                {t('notFound.ctaButton1')}
              </Link>
              <Link
                to="/blog"
                className="bg-mystic-700 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-mystic-600 transition-all duration-300"
              >
                {t('notFound.ctaButton2')}
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default NotFound
