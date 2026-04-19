import React from 'react'
import { useSelector } from 'react-redux'
import LatestJobCards from './LatestJobCards'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const LatestJobs = () => {
    useGetAllJobs()
    const { allJobs } = useSelector((store) => store.job)

    return (
        <section className='py-20 bg-gradient-to-br from-gray-50 to-violet-50/30 dark:from-gray-950 dark:to-violet-950/10'>
            <div className='max-w-7xl mx-auto px-4'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className='flex flex-wrap items-center justify-between mb-10 gap-4'
                >
                    <div>
                        <span className='inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-violet-600 bg-violet-50 dark:bg-violet-900/30 dark:text-violet-400 rounded-full mb-3'>
                            <Sparkles className='w-3 h-3' /> Fresh Opportunities
                        </span>
                        <h2 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white'>
                            <span className='text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600'>Latest & Top </span>
                            Job Openings
                        </h2>
                        <p className='text-gray-500 dark:text-gray-400 mt-2'>Discover roles that align with your career goals</p>
                    </div>
                    <Link
                        to='/jobs'
                        className='px-5 py-2.5 text-sm font-semibold text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-700 rounded-xl hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-colors'
                    >
                        View All Jobs →
                    </Link>
                </motion.div>

                {allJobs?.length === 0 ? (
                    <div className='text-center py-16'>
                        <div className='w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mx-auto mb-4'>
                            <Sparkles className='w-8 h-8 text-violet-500' />
                        </div>
                        <h3 className='text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1'>No jobs yet</h3>
                        <p className='text-gray-500 dark:text-gray-400 text-sm'>Check back soon for new opportunities</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {allJobs?.slice(0, 6).map((job, index) => (
                            <motion.div
                                key={job._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                            >
                                <LatestJobCards job={job} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default LatestJobs
