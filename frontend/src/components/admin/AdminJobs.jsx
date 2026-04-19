import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from '../shared/Navbar'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { motion } from 'framer-motion'
import { Plus, Search, Edit2, MapPin, DollarSign, Calendar, Briefcase } from 'lucide-react'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'

const AdminJobs = () => {
    useGetAllAdminJobs()
    const { allAdminJobs } = useSelector((store) => store.job)
    const navigate = useNavigate()
    const [search, setSearch] = useState('')

    const filtered = allAdminJobs?.filter((j) =>
        j.title?.toLowerCase().includes(search.toLowerCase()) ||
        j.company?.name?.toLowerCase().includes(search.toLowerCase())
    ) || []

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-violet-50/20 dark:from-gray-950 dark:to-gray-900'>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 pt-24 pb-12'>
                <div className='flex flex-wrap items-center justify-between gap-4 mb-8'>
                    <div>
                        <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>My Posted Jobs</h1>
                        <p className='text-gray-500 dark:text-gray-400 mt-1'>{filtered.length} jobs found</p>
                    </div>
                    <Button
                        onClick={() => navigate('/admin/jobs/create')}
                        className='bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg shadow-violet-500/25 flex items-center gap-2'
                    >
                        <Plus className='w-4 h-4' /> Post New Job
                    </Button>
                </div>

                {/* Search */}
                <div className='flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 shadow-sm mb-6'>
                    <Search className='w-4 h-4 text-gray-400' />
                    <input
                        type='text'
                        placeholder='Search by title or company...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='flex-1 bg-transparent text-sm outline-none text-gray-900 dark:text-white placeholder:text-gray-400'
                    />
                </div>

                {filtered.length === 0 ? (
                    <div className='text-center py-24 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl border border-white/60 dark:border-gray-700/50'>
                        <Briefcase className='w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4' />
                        <h3 className='text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2'>No Jobs Posted Yet</h3>
                        <p className='text-gray-400 dark:text-gray-500 mb-6 text-sm'>Start by posting your first job opening</p>
                        <Button onClick={() => navigate('/admin/jobs/create')}
                            className='bg-gradient-to-r from-violet-600 to-purple-600 text-white'>
                            <Plus className='w-4 h-4 mr-2' /> Post First Job
                        </Button>
                    </div>
                ) : (
                    <div className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-white/60 dark:border-gray-700/50 rounded-2xl shadow-xl overflow-hidden'>
                        {/* Table */}
                        <div className='overflow-x-auto'>
                            <table className='w-full'>
                                <thead className='bg-gray-50/80 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800'>
                                    <tr>
                                        {['Company', 'Job Title', 'Date', 'Type', 'Salary', 'Applicants', 'Action'].map((h) => (
                                            <th key={h} className='text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-5 py-4'>
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-50 dark:divide-gray-800'>
                                    {filtered?.map((job, index) => (
                                        <motion.tr
                                            key={job._id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.04 }}
                                            className='hover:bg-violet-50/30 dark:hover:bg-violet-900/10 transition-colors group'
                                        >
                                            <td className='px-5 py-4'>
                                                <div className='font-medium text-sm text-gray-900 dark:text-white'>{job?.company?.name}</div>
                                            </td>
                                            <td className='px-5 py-4'>
                                                <div className='font-semibold text-sm text-gray-900 dark:text-white'>{job?.title}</div>
                                                <div className='flex items-center gap-1 text-xs text-gray-400 mt-0.5'>
                                                    <MapPin className='w-3 h-3' />{job?.location}
                                                </div>
                                            </td>
                                            <td className='px-5 py-4'>
                                                <div className='flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400'>
                                                    <Calendar className='w-3.5 h-3.5' />
                                                    {new Date(job.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </div>
                                            </td>
                                            <td className='px-5 py-4'>
                                                <Badge className='bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800 text-xs'>
                                                    {job?.jobType}
                                                </Badge>
                                            </td>
                                            <td className='px-5 py-4'>
                                                <div className='flex items-center gap-1 text-sm font-medium text-green-600 dark:text-green-400'>
                                                    <DollarSign className='w-3.5 h-3.5' />{job?.salary} LPA
                                                </div>
                                            </td>
                                            <td className='px-5 py-4'>
                                                <Badge className='bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/20 dark:text-violet-400 dark:border-violet-800 text-xs'>
                                                    {job?.applications?.length || 0} Applied
                                                </Badge>
                                            </td>
                                            <td className='px-5 py-4'>
                                                <Button
                                                    size='sm'
                                                    variant='outline'
                                                    onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                    className='text-violet-600 border-violet-200 hover:bg-violet-50 dark:text-violet-400 dark:border-violet-800 dark:hover:bg-violet-900/30 text-xs'
                                                >
                                                    View Applicants
                                                </Button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminJobs
