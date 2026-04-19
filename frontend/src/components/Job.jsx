import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Bookmark, MapPin, Clock, DollarSign, Briefcase } from 'lucide-react'
import { motion } from 'framer-motion'

const daysAgo = (mongodbTime) => {
    const createdAt = new Date(mongodbTime)
    const currentTime = new Date()
    const timeDiff = currentTime - createdAt
    return Math.floor(timeDiff / (1000 * 24 * 60 * 60))
}

const Job = ({ job }) => {
    const navigate = useNavigate()

    if (!job) return null

    const days = daysAgo(job?.createdAt)
    const companyName = job?.company?.name || 'Company'
    const initials = companyName.slice(0, 2).toUpperCase()

    return (
        <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className='group relative p-5 rounded-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-white/60 dark:border-gray-700/50 shadow-lg hover:shadow-2xl hover:shadow-violet-500/10 cursor-pointer transition-all duration-300'
        >
            {/* Gradient glow on hover */}
            <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-50/0 to-purple-50/0 group-hover:from-violet-50/50 group-hover:to-purple-50/50 dark:group-hover:from-violet-900/10 dark:group-hover:to-purple-900/10 transition-all duration-300 -z-0' />

            <div className='relative z-10'>
                {/* Header */}
                <div className='flex items-start justify-between mb-4'>
                    <Badge
                        variant='secondary'
                        className={`text-xs font-medium ${days === 0
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                            }`}
                    >
                        <Clock className='w-3 h-3 mr-1 inline' />
                        {days === 0 ? 'Today' : `${days}d ago`}
                    </Badge>
                    <button className='p-2 rounded-full hover:bg-violet-50 dark:hover:bg-violet-900/30 text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors'>
                        <Bookmark className='w-4 h-4' />
                    </button>
                </div>

                {/* Company */}
                <div className='flex items-center gap-3 mb-4'>
                    <Avatar className='h-12 w-12 rounded-xl border-2 border-white dark:border-gray-700 shadow-md'>
                        <AvatarImage src={job?.company?.logo} alt={companyName} className='object-contain' />
                        <AvatarFallback className='rounded-xl bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/50 dark:to-purple-900/50 text-violet-700 dark:text-violet-300 font-bold text-sm'>
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className='font-semibold text-gray-900 dark:text-white'>{companyName}</h3>
                        <div className='flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-0.5'>
                            <MapPin className='w-3 h-3' />
                            {job?.location}
                        </div>
                    </div>
                </div>

                {/* Job Info */}
                <div className='mb-4'>
                    <h2 className='font-bold text-lg text-gray-900 dark:text-white mb-1 line-clamp-1'>{job?.title}</h2>
                    <p className='text-sm text-gray-500 dark:text-gray-400 line-clamp-2'>{job?.description}</p>
                </div>

                {/* Tags */}
                <div className='flex flex-wrap items-center gap-2 mb-5'>
                    <Badge variant='outline' className='text-xs bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800'>
                        <Briefcase className='w-3 h-3 mr-1' />
                        {job?.position} Position{job?.position > 1 ? 's' : ''}
                    </Badge>
                    <Badge variant='outline' className='text-xs bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800'>
                        {job?.jobType}
                    </Badge>
                    <Badge variant='outline' className='text-xs bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'>
                        <DollarSign className='w-3 h-3 mr-1' />
                        {job?.salary} LPA
                    </Badge>
                </div>

                {/* Actions */}
                <div className='flex items-center gap-2'>
                    <Button
                        variant='outline'
                        size='sm'
                        onClick={() => navigate(`/description/${job?._id}`)}
                        className='flex-1 border-violet-200 text-violet-700 hover:bg-violet-50 dark:border-violet-700 dark:text-violet-400 dark:hover:bg-violet-900/30 font-medium'
                    >
                        View Details
                    </Button>
                    <Button
                        size='sm'
                        className='flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-md shadow-violet-500/20 font-medium'
                    >
                        Apply Now
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}

export default Job
