import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowLeft, Share2, BookOpen, User, Tag, AlertCircle, Loader2 } from 'lucide-react'
import SEO from '../components/SEO'
import LazyImage from '../components/LazyImage'

import { blogPostsData } from '../data/blogPostsData'

const BlogPost = () => {
  const { slug } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    setIsLoading(true)
    setHasError(false)

    if (!blogPostsData[slug]) {
      setHasError(true)
      setIsLoading(false)
      return
    }

    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0)
      }
      setIsLoading(false)
    }, 600)

    const handleError = (event) => {
      console.error('JavaScript error caught:', event.error)
      setHasError(true)
      setIsLoading(false)
    }

    const handleUnhandledRejection = (event) => {
      console.error('Unhandled promise rejection:', event.reason)
      setHasError(true)
      setIsLoading(false)
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [slug])

  const blogPost = blogPostsData[slug] || blogPostsData['understanding-bazi-chart-beginners-guide']

  if (isLoading) {
    return (
      <div className="min-h-screen bg-mystic-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-16 w-16 text-gold-400 animate-spin mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-white mb-4">Loading Your Destiny Report...</h1>
          <p className="text-mystic-300">Please wait while we prepare your personalized analysis.</p>
        </div>
      </div>
    )
  }

  if (hasError) {
    return (
      <div className="min-h-screen bg-mystic-900 pt-20 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-white mb-4">Oops! Something Went Wrong</h1>
          <p className="text-mystic-300 mb-6">
            We’re having trouble loading your destiny report. Please check your connection and try again.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => {
                setHasError(false)
                setIsLoading(true)
                setRetryCount(prev => prev + 1)
                window.location.reload()
              }}
              className="w-full bg-gradient-to-r from-gold-400 to-gold-600 text-white px-6 py-3 rounded-lg hover:from-gold-500 hover:to-gold-700 transition-all duration-300"
            >
              Try Again
            </button>
            <Link
              to="/blog"
              className="block w-full bg-mystic-700 text-white px-6 py-3 rounded-lg hover:bg-mystic-600 transition-all duration-300"
            >
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen bg-mystic-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Blog Post Not Found</h1>
          <p className="text-mystic-300 mb-8">The blog post you’re looking for doesn’t exist.</p>
          <Link
            to="/blog"
            className="bg-gradient-to-r from-gold-400 to-gold-600 text-white px-6 py-3 rounded-lg hover:from-gold-500 hover:to-gold-700 transition-all duration-300"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blogPost.title,
        text: blogPost.excerpt,
        url: window.location.href
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const canonicalUrl = `https://fatepath.me/blog/${slug}`
  const articleImage = blogPost.image || blogPost.coverImage || '/og-image.svg'
  const authorName = blogPost.author || 'FatePath'

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "headline": blogPost.title,
    "description": blogPost.excerpt,
    "image": `https://fatepath.me${articleImage}`,
    "author": {
      "@type": "Person",
      "name": authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": "FatePath",
      "logo": {
        "@type": "ImageObject",
        "url": "https://fatepath.me/favicon.svg"
      }
    },
    "datePublished": blogPost.date,
    "dateModified": blogPost.date,
    "articleSection": blogPost.category || 'BaZi',
    "keywords": blogPost.tags.join(', '),
    "inLanguage": "en-US"
  }

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Blog",
        "item": "https://fatepath.me/blog"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": blogPost.title,
        "item": canonicalUrl
      }
    ]
  }

  return (
      <>
        {/* Fallback for users with JavaScript disabled */}
        <noscript>
        <div style={{
          backgroundColor: '#0f172a',
          color: '#e2e8f0',
          padding: '20px',
          fontFamily: 'Arial, sans-serif',
          minHeight: '100vh'
        }}>
          <h1 style={{color: '#facc15', fontSize: '2rem', marginBottom: '1rem'}}>
            {blogPost.title}
          </h1>
          <p style={{fontSize: '1.1rem', marginBottom: '2rem'}}>
            {blogPost.excerpt}
          </p>
          <div style={{marginBottom: '2rem'}}>
            <strong>Author:</strong> {blogPost.author} | 
            <strong>Date:</strong> {blogPost.date} | 
            <strong>Read Time:</strong> {blogPost.readTime}
          </div>
          <div style={{
            backgroundColor: '#1e293b',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #334155'
          }}>
            <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
          </div>
          <p style={{marginTop: '2rem', fontSize: '0.9rem', color: '#94a3b8'}}>
            JavaScript is required for the full interactive experience. 
            Please enable JavaScript to view the complete article with animations and enhanced features.
          </p>
        </div>
      </noscript>

      <SEO 
        title={`${blogPost.title} | FatePath Chinese Astrology Blog`}
        description={blogPost.excerpt}
        keywords={`${blogPost.tags.join(', ')}, chinese astrology, bazi analysis, destiny reading`}
        author={blogPost.author}
        ogTitle={blogPost.title}
        ogDescription={blogPost.excerpt}
        ogImage={`https://fatepath.me${articleImage}`}
        ogUrl={canonicalUrl}
        canonical={canonicalUrl}
        structuredData={[articleStructuredData, breadcrumbStructuredData]}
      />

      <main className="min-h-screen bg-mystic-900 pt-20">
        {/* Back to Blog Button */}
        <div className="container mx-auto px-4 py-6">
          <Link
            to="/blog"
            className="inline-flex items-center text-gold-400 hover:text-gold-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <section className="py-12 bg-gradient-to-br from-mystic-800 to-mystic-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-block px-4 py-2 bg-gold-400/20 text-gold-400 rounded-full text-sm font-medium mb-6">
                  {blogPost.category}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  {blogPost.title}
                </h1>
                <p className="text-xl text-mystic-300 mb-8 max-w-3xl mx-auto">
                  {blogPost.excerpt}
                </p>
                
                {/* Article Meta */}
                <div className="flex flex-wrap items-center justify-center gap-6 text-mystic-400 mb-8">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>{blogPost.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{blogPost.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{blogPost.readTime}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {blogPost.tags.map((tag, index) => (
                    <Link
                      key={index}
                      to={`/blog?tag=${tag}`}
                      className="px-3 py-1 bg-mystic-700 text-mystic-300 rounded-full text-sm hover:bg-mystic-600 hover:text-white transition-all duration-200 cursor-pointer"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="inline-flex items-center px-6 py-3 bg-mystic-700 hover:bg-mystic-600 text-white rounded-lg transition-colors"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Article
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-16 bg-mystic-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-12"
              >
                <LazyImage
                  src={blogPost.image}
                  alt={`${blogPost.title} - Featured image`}
                  className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
                  fallbackSrc="/images/blog-placeholder.jpg"
                />
              </motion.div>

              <motion.article
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="prose prose-lg prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
              />
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="py-16 bg-mystic-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white text-center mb-12">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {blogPost.relatedPosts.map((post, index) => (
                  <motion.article
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-mystic-700 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
                  >
                    <Link to={`/blog/${post.slug}`}>
                      <LazyImage
                        src={post.image}
                        alt={`${post.title} - Related post thumbnail`}
                        className="w-full h-48 object-cover"
                        fallbackSrc="/images/blog-placeholder.jpg"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-mystic-300 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center text-gold-400 hover:text-gold-300 font-semibold transition-colors">
                          Read More
                          <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-mystic-800 to-mystic-900">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Discover Your Destiny?
              </h2>
              <p className="text-xl text-mystic-300 mb-8 max-w-2xl mx-auto">
                Get your personalized BaZi reading and unlock the ancient wisdom 
                that will guide your life's journey.
              </p>
                                    <Link
                        to="/free-bazi-report"
                        className="bg-gradient-to-r from-gold-400 to-gold-600 text-white px-10 py-5 rounded-lg text-xl font-bold hover:from-gold-500 hover:to-gold-700 transition-all duration-300 transform hover:scale-105"
                      >
                        Start Your Free Reading
                      </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )

}

export default BlogPost
