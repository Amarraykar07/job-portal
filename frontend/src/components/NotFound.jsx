import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Search } from 'lucide-react'

const NotFound = () => {
    return (
        <div className='min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-violet-950/20 flex items-center justify-center p-4'>
            <div className='absolute inset-0 -z-10'>
                <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-violet-200/30 dark:bg-violet-800/10 rounded-full blur-3xl' />
                <div className='absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-200/30 dark:bg-purple-800/10 rounded-full blur-3xl' />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='text-center max-w-lg'
            >
                <motion.div
                    animate={{ rotate: [0, -5, 5, -5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                    className='text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-violet-600 to-purple-600 mb-4'
                >
                    404
                </motion.div>

                <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>Page Not Found</h1>
                <p className='text-gray-500 dark:text-gray-400 mb-8'>
                    Oops! The page you're looking for doesn't exist or has been moved. Let's get you back on track.
                </p>

                <div className='flex flex-col sm:flex-row items-center justify-center gap-3'>
                    <Link to='/'>
                        <button className='flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/25 transition-all duration-300'>
                            <Home className='w-4 h-4' /> Go Home
                        </button>
                    </Link>
                    <Link to='/jobs'>
                        <button className='flex items-center gap-2 px-6 py-3 border border-violet-200 dark:border-violet-800 text-violet-600 dark:text-violet-400 font-semibold rounded-xl hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-colors'>
                            <Search className='w-4 h-4' /> Browse Jobs
                        </button>
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}

export default NotFound
