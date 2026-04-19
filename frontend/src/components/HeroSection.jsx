import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchJobQuery } from '@/redux/jobSlice'
import { Search, TrendingUp, Users, Briefcase, Star } from 'lucide-react'
import { motion } from 'framer-motion'

const stats = [
    { label: 'Jobs Posted', value: '10K+', icon: Briefcase },
    { label: 'Companies', value: '500+', icon: Users },
    { label: 'Hired', value: '50K+', icon: TrendingUp },
    { label: 'Rating', value: '4.9★', icon: Star },
]

const HeroSection = () => {
    const [query, setQuery] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchJobHandler = () => {
        dispatch(setSearchJobQuery(query))
        navigate('/browse')
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') searchJobHandler()
    }

    return (
        <section className='relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-16'>
            {/* Animated Background */}
            <div className='absolute inset-0 -z-10'>
                <div className='absolute inset-0 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 dark:from-gray-950 dark:via-violet-950/30 dark:to-gray-950' />
                <div className='absolute top-20 left-10 w-72 h-72 bg-violet-300/30 dark:bg-violet-700/20 rounded-full blur-3xl animate-pulse' />
                <div className='absolute bottom-20 right-10 w-96 h-96 bg-purple-300/30 dark:bg-purple-700/20 rounded-full blur-3xl animate-pulse' style={{ animationDelay: '1s' }} />
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-200/20 dark:bg-indigo-800/10 rounded-full blur-3xl' />
            </div>

            <div className='max-w-5xl mx-auto px-4 text-center'>
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-md border border-violet-200/50 dark:border-violet-500/30 shadow-lg mb-6'
                >
                    <span className='w-2 h-2 rounded-full bg-violet-500 animate-pulse' />
                    <span className='text-sm font-medium text-violet-700 dark:text-violet-300'>🚀 No. 1 Job Portal in India</span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className='text-5xl md:text-7xl font-extrabold leading-tight mb-6 text-gray-900 dark:text-white'
                >
                    Search, Apply &{' '}
                    <br className='hidden md:block' />
                    Get{' '}
                    <span className='text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-600'>
                        Your Dream Job
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className='text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10'
                >
                    Connect with top companies. Discover opportunities that match your skills and aspirations.
                </motion.p>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className='flex items-center max-w-2xl mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/40 dark:border-gray-700/50 shadow-2xl rounded-2xl p-2 gap-2'
                >
                    <Search className='ml-3 w-5 h-5 text-gray-400 flex-shrink-0' />
                    <input
                        type='text'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder='Job title, company, or keyword...'
                        className='flex-1 bg-transparent px-2 py-2.5 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none text-sm md:text-base'
                    />
                    <button
                        onClick={searchJobHandler}
                        className='px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 flex items-center gap-2 whitespace-nowrap text-sm'
                    >
                        <Search className='w-4 h-4' />
                        Find Jobs
                    </button>
                </motion.div>

                {/* Popular Searches */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className='flex flex-wrap justify-center gap-2 mt-6'
                >
                    <span className='text-sm text-gray-500 dark:text-gray-400 pt-1'>Popular:</span>
                    {['Frontend Developer', 'React', 'Node.js', 'Data Science', 'DevOps'].map((tag) => (
                        <button
                            key={tag}
                            onClick={() => { setQuery(tag); dispatch(setSearchJobQuery(tag)); navigate('/browse') }}
                            className='px-3 py-1 text-xs font-medium text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/30 border border-violet-200/50 dark:border-violet-700/50 rounded-full hover:bg-violet-100 dark:hover:bg-violet-900/50 transition-colors'
                        >
                            {tag}
                        </button>
                    ))}
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto'
                >
                    {stats.map(({ label, value, icon: Icon }) => (
                        <div key={label} className='flex flex-col items-center p-4 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border border-white/40 dark:border-gray-700/40 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300'>
                            <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/50 dark:to-purple-900/50 flex items-center justify-center mb-2'>
                                <Icon className='w-5 h-5 text-violet-600 dark:text-violet-400' />
                            </div>
                            <span className='text-2xl font-bold text-gray-900 dark:text-white'>{value}</span>
                            <span className='text-xs text-gray-500 dark:text-gray-400 mt-0.5'>{label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className='absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1'
            >
                <div className='w-5 h-8 border-2 border-gray-400 dark:border-gray-600 rounded-full flex items-start justify-center p-1'>
                    <div className='w-1 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce' />
                </div>
            </motion.div>
        </section>
    )
}

export default HeroSection
