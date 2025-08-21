import React from 'react'

const Home = () => {
  return (
    <main className="min-h-screen bg-mystic-900">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Feeling Lost?
              <span className="block text-gold-400">Find Your Life Direction</span>
            </h1>
            <p className="text-xl md:text-2xl text-mystic-300 mb-8 max-w-3xl mx-auto">
              Stuck in life? Unlock the ancient wisdom of Chinese astrology with professional BaZi readings. 
              Discover your true life purpose, career direction, and relationship path through traditional Chinese numerology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-gold-400 to-gold-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-gold-500 hover:to-gold-700 transition-all duration-300 transform hover:scale-105">
                Get Free BaZi Report
              </button>
              <button className="border-2 border-gold-400 text-gold-400 px-8 py-4 rounded-lg font-semibold hover:bg-gold-400 hover:text-white transition-all duration-300">
                View Services
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Simple Content Section */}
      <section className="py-20 bg-mystic-800">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Welcome to FatePath
            </h2>
            <p className="text-xl text-mystic-300 max-w-2xl mx-auto">
              Your journey to discover ancient Chinese wisdom starts here.
            </p>
          </div>
        </div>
      </section>

      {/* Test Section */}
      <section className="py-20 bg-mystic-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Test Section
          </h2>
          <p className="text-xl text-mystic-300 mb-8">
            If you can see this, the page is working!
          </p>
          <div className="bg-mystic-800 rounded-lg p-8 max-w-2xl mx-auto">
            <p className="text-mystic-300">
              This is a simple test to ensure the page renders correctly on mobile devices.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home

 