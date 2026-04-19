import React, { useEffect, useState } from 'react'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { Badge } from './ui/badge'
import { motion } from 'framer-motion'
import { Briefcase, Building2, MapPin, Calendar, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const AppliedJobTable = () => {
    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, { withCredentials: true })
                if (res.data.success) setApplications(res.data.applications)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchAppliedJobs()
    }, [])

    const statusConfig = {
        pending: { label: 'Pending', class: 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800' },
        accepted: { label: 'Accepted', class: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' },
        rejected: { label: 'Rejected', class: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800' },
    }

    if (loading) {
        return (
            <div className='space-y-3'>
                {[1, 2, 3].map(i => (
                    <div key={i} className='h-16 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse' />
                ))}
            </div>
        )
    }

    if (applications.length === 0) {
        return (
            <div className='text-center py-12'>
                <Briefcase className='w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3' />
                <h3 className='font-semibold text-gray-600 dark:text-gray-400 mb-1'>No applications yet</h3>
                <p className='text-sm text-gray-400 dark:text-gray-500'>Start applying to jobs to track your progress</p>
            </div>
        )
    }

    return (
        <div className='space-y-3'>
            {applications.map((app, index) => {
                const job = app.job
                const status = app.status || 'pending'
                return (
                    <motion.div
                        key={app._id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.06 }}
                        onClick={() => navigate(`/description/${job?._id}`)}
                        className='flex items-center gap-4 p-4 bg-gray-50/80 dark:bg-gray-800/50 hover:bg-violet-50/50 dark:hover:bg-violet-900/10 border border-gray-100 dark:border-gray-700 rounded-xl cursor-pointer group transition-all duration-200'
                    >
                        <div className='flex-1 min-w-0'>
                            <div className='flex items-center gap-2 mb-1'>
                                <Building2 className='w-3.5 h-3.5 text-gray-400 flex-shrink-0' />
                                <span className='text-xs text-gray-500 dark:text-gray-400 truncate'>{job?.company?.name || 'Company'}</span>
                            </div>
                            <h4 className='font-semibold text-sm text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors truncate'>
                                {job?.title}
                            </h4>
                            <div className='flex items-center gap-3 mt-1'>
                                <span className='flex items-center gap-1 text-xs text-gray-400'>
                                    <MapPin className='w-3 h-3' /> {job?.location}
                                </span>
                                <span className='flex items-center gap-1 text-xs text-gray-400'>
                                    <Calendar className='w-3 h-3' />
                                    {new Date(app.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                                </span>
                            </div>
                        </div>
                        <Badge className={`flex-shrink-0 text-xs px-2.5 py-1 ${statusConfig[status]?.class}`}>
                            {statusConfig[status]?.label}
                        </Badge>
                    </motion.div>
                )
            })}
        </div>
    )
}

export default AppliedJobTable
