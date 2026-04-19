import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge } from './ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { MapPin, DollarSign, Briefcase, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate()

    if (!job) return null

    const companyName = job?.company?.name || 'Company'
    const initials = companyName.slice(0, 2).toUpperCase()

    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            onClick={() => navigate(`/description/${job._id}`)}
            className='group p-5 rounded-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-white/60 dark:border-gray-700/50 shadow-md hover:shadow-xl hover:shadow-violet-500/10 cursor-pointer transition-all duration-300'
        >
            <div className='flex items-center gap-3 mb-3'>
                <Avatar className='h-10 w-10 rounded-xl border-2 border-white dark:border-gray-700 shadow'>
                    <AvatarImage src={job?.company?.logo} alt={companyName} className='object-contain' />
                    <AvatarFallback className='rounded-xl bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/50 dark:to-purple-900/50 text-violet-700 dark:text-violet-300 font-bold text-xs'>
                        {initials}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h3 className='font-semibold text-sm text-gray-900 dark:text-white'>{companyName}</h3>
                    <div className='flex items-center gap-1 text-xs text-gray-400'>
                        <MapPin className='w-3 h-3' /> {job?.location}
                    </div>
                </div>
            </div>

            <h2 className='font-bold text-base text-gray-900 dark:text-white mb-1 line-clamp-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors'>
                {job?.title}
            </h2>
            <p className='text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2'>{job?.description}</p>

            <div className='flex flex-wrap gap-1.5 mb-3'>
                <Badge variant='outline' className='text-xs bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800'>
                    <Briefcase className='w-3 h-3 mr-1' />{job?.position} Pos
                </Badge>
                <Badge variant='outline' className='text-xs bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800'>
                    {job?.jobType}
                </Badge>
                <Badge variant='outline' className='text-xs bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'>
                    <DollarSign className='w-3 h-3 mr-1' />{job?.salary} LPA
                </Badge>
            </div>

            <div className='flex items-center gap-1 text-xs font-medium text-violet-600 dark:text-violet-400 group-hover:gap-2 transition-all'>
                View Details <ArrowRight className='w-3 h-3' />
            </div>
        </motion.div>
    )
}

export default LatestJobCards
