import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, X } from 'lucide-react'

const Jobs = () => {
    useGetAllJobs()
    const { allJobs, searchJobQuery } = useSelector((store) => store.job)
    const [filterJobs, setFilterJobs] = useState(allJobs)
    const [localSearch, setLocalSearch] = useState('')
    const [filterOpen, setFilterOpen] = useState(false)

    useEffect(() => {
        let filtered = allJobs
        const q = (localSearch || searchJobQuery || '').toLowerCase()
        if (q) {
            filtered = allJobs.filter((j) =>
                j.title?.toLowerCase().includes(q) ||
                j.description?.toLowerCase().includes(q) ||
                j.location?.toLowerCase().includes(q) ||
                j?.company?.name?.toLowerCase().includes(q)
            )
        }
        setFilterJobs(filtered)
    }, [allJobs, localSearch, searchJobQuery])

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-violet-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-violet-950/10'>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 pt-24 pb-10'>
                {/* Page Header */}
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>Find Your Perfect <span className='text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600'>Job</span></h1>
                    <p className='text-gray-500 dark:text-gray-400'>{filterJobs?.length} jobs found</p>
                </div>

                {/* Search + Filter Toggle for Mobile */}
                <div className='flex gap-3 mb-6 md:hidden'>
                    <div className='flex-1 flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 shadow-sm'>
                        <Search className='w-4 h-4 text-gray-400' />
                        <input
                            type='text'
                            placeholder='Search jobs...'
                            value={localSearch}
                            onChange={(e) => setLocalSearch(e.target.value)}
                            className='flex-1 bg-transparent text-sm outline-none text-gray-900 dark:text-white placeholder:text-gray-400'
                        />
                        {localSearch && <button onClick={() => setLocalSearch('')}><X className='w-4 h-4 text-gray-400' /></button>}
                    </div>
                    <button
                        onClick={() => setFilterOpen(!filterOpen)}
                        className='flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:border-violet-400 transition-colors'
                    >
                        <SlidersHorizontal className='w-4 h-4' /> Filters
                    </button>
                </div>

                <div className='flex gap-6'>
                    {/* Filter Sidebar */}
                    <aside className={`${filterOpen ? 'block' : 'hidden'} md:block w-full md:w-72 flex-shrink-0`}>
                        <FilterCard filterJobs={filterJobs} setFilterJobs={setFilterJobs} allJobs={allJobs} />
                    </aside>

                    {/* Job Grid */}
                    <main className='flex-1'>
                        {/* Desktop Search */}
                        <div className='hidden md:flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 shadow-sm mb-6'>
                            <Search className='w-4 h-4 text-gray-400' />
                            <input
                                type='text'
                                placeholder='Search by title, company, location...'
                                value={localSearch}
                                onChange={(e) => setLocalSearch(e.target.value)}
                                className='flex-1 bg-transparent text-sm outline-none text-gray-900 dark:text-white placeholder:text-gray-400'
                            />
                            {localSearch && <button onClick={() => setLocalSearch('')}><X className='w-4 h-4 text-gray-400 hover:text-gray-600' /></button>}
                        </div>

                        {filterJobs?.length === 0 ? (
                            <div className='flex flex-col items-center justify-center py-24 text-center'>
                                <div className='w-20 h-20 rounded-full bg-violet-50 dark:bg-violet-900/20 flex items-center justify-center mb-4'>
                                    <Search className='w-10 h-10 text-violet-400' />
                                </div>
                                <h3 className='text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2'>No jobs found</h3>
                                <p className='text-gray-500 dark:text-gray-400 text-sm max-w-xs'>Try adjusting your search or filters to find what you're looking for</p>
                                <button onClick={() => setLocalSearch('')} className='mt-4 text-sm text-violet-600 dark:text-violet-400 hover:underline'>
                                    Clear search
                                </button>
                            </div>
                        ) : (
                            <div className='h-[calc(100vh-200px)] overflow-y-auto pr-1 scroll-smooth'>
                                <div className='grid grid-cols-1 xl:grid-cols-2 gap-5'>
                                    <AnimatePresence>
                                        {filterJobs?.map((job, index) => (
                                            <motion.div
                                                key={job._id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ delay: index * 0.04, duration: 0.3 }}
                                            >
                                                <Job job={job} />
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Jobs
