import React from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

const Browse = () => {
    useGetAllJobs()
    const { allJobs, searchJobQuery } = useSelector((store) => store.job)

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-violet-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-violet-950/10'>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 pt-24 pb-10'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='mb-8'
                >
                    <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
                        {searchJobQuery
                            ? <>Results for "<span className='text-violet-600 dark:text-violet-400'>{searchJobQuery}</span>"</>
                            : <>Browse <span className='text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600'>All Jobs</span></>
                        }
                    </h1>
                    <p className='text-gray-500 dark:text-gray-400'>{allJobs?.length} jobs found</p>
                </motion.div>

                {allJobs?.length === 0 ? (
                    <div className='flex flex-col items-center justify-center py-24 text-center'>
                        <div className='w-20 h-20 rounded-full bg-violet-50 dark:bg-violet-900/20 flex items-center justify-center mb-4'>
                            <Search className='w-10 h-10 text-violet-400' />
                        </div>
                        <h3 className='text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2'>No jobs found</h3>
                        <p className='text-gray-500 dark:text-gray-400 text-sm'>Try a different keyword or browse all jobs</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {allJobs?.map((job, index) => (
                            <motion.div
                                key={job._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.06 }}
                            >
                                <Job job={job} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Browse
