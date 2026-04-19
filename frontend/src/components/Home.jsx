import React from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Briefcase, Users, Building2, TrendingUp } from 'lucide-react'

const Home = () => {
  const { user } = useSelector((store) => store.auth)

  return (
    <div className='min-h-screen'>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />

      {/* CTA Banner */}
      {!user && (
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className='py-20 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 relative overflow-hidden'
        >
          <div className='absolute inset-0'>
            <div className='absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl' />
            <div className='absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl' />
          </div>
          <div className='relative max-w-4xl mx-auto px-4 text-center'>
            <h2 className='text-4xl font-extrabold text-white mb-4'>Ready to Start Your Career Journey?</h2>
            <p className='text-violet-200 text-lg mb-8 max-w-xl mx-auto'>
              Join thousands of professionals who found their dream job on JobPortal
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <a href='/signup' className='px-8 py-3.5 bg-white text-violet-700 font-bold rounded-xl hover:bg-gray-50 shadow-xl transition-all duration-300'>
                Get Started — It's Free
              </a>
              <a href='/jobs' className='px-8 py-3.5 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300'>
                Browse Jobs →
              </a>
            </div>
          </div>
        </motion.section>
      )}

      <Footer />
    </div>
  )
}

export default Home
