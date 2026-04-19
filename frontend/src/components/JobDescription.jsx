import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from './shared/Navbar'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { toast } from 'sonner'
import { setSingleJob } from '@/redux/jobSlice'
import { motion } from 'framer-motion'
import {
    MapPin, DollarSign, Briefcase, Clock, Users, BookOpen,
    ArrowLeft, CheckCircle2, Building2, Globe, Calendar
} from 'lucide-react'

const JobDescription = () => {
    const { id: jobId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { singleJob } = useSelector((store) => store.job)
    const { user } = useSelector((store) => store.auth)
    const [applied, setApplied] = useState(false)
    const [applying, setApplying] = useState(false)
    const [loading, setLoading] = useState(true)

    const isApplied =
        applied ||
        singleJob?.applications?.some((app) => app.applicant === user?._id || app === user?._id)

    useEffect(() => {
        const fetchJob = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job))
                }
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchJob()
    }, [jobId])

    const applyJobHandler = async () => {
        if (!user) {
            toast.error('Please login to apply')
            navigate('/login')
            return
        }
        try {
            setApplying(true)
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true })
            if (res.data.success) {
                setApplied(true)
                toast.success(res.data.message)
                dispatch(setSingleJob({ ...singleJob, applications: [...(singleJob?.applications || []), { applicant: user._id }] }))
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to apply')
        } finally {
            setApplying(false)
        }
    }

    if (loading) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-gray-50 to-violet-50/20 dark:from-gray-950 dark:to-gray-900'>
                <Navbar />
                <div className='max-w-5xl mx-auto px-4 pt-24'>
                    <div className='animate-pulse space-y-6'>
                        <div className='h-8 bg-gray-200 dark:bg-gray-800 rounded-xl w-3/4' />
                        <div className='h-64 bg-gray-200 dark:bg-gray-800 rounded-2xl' />
                        <div className='h-48 bg-gray-200 dark:bg-gray-800 rounded-2xl' />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-violet-50/20 dark:from-gray-950 dark:to-gray-900'>
            <Navbar />
            <div className='max-w-5xl mx-auto px-4 pt-24 pb-12'>
                <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate(-1)}
                    className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 mb-6 transition-colors'
                >
                    <ArrowLeft className='w-4 h-4' /> Back to Jobs
                </motion.button>

                <div className='grid lg:grid-cols-3 gap-6'>
                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='lg:col-span-2 space-y-6'
                    >
                        {/* Job Header Card */}
                        <div className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-white/60 dark:border-gray-700/50 rounded-2xl shadow-xl p-6'>
                            <div className='flex items-start gap-4 mb-6'>
                                <Avatar className='h-16 w-16 rounded-2xl border-2 border-white dark:border-gray-700 shadow-lg'>
                                    <AvatarImage src={singleJob?.company?.logo} alt={singleJob?.company?.name} className='object-contain' />
                                    <AvatarFallback className='rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/50 dark:to-purple-900/50 text-violet-700 dark:text-violet-300 font-bold text-lg'>
                                        {singleJob?.company?.name?.slice(0, 2).toUpperCase() || 'CO'}
                                    </AvatarFallback>
                                </Avatar>
                                <div className='flex-1'>
                                    <h1 className='text-2xl font-bold text-gray-900 dark:text-white mb-1'>{singleJob?.title}</h1>
                                    <div className='flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400'>
                                        <Building2 className='w-4 h-4' />
                                        <span>{singleJob?.company?.name}</span>
                                        <span>·</span>
                                        <MapPin className='w-4 h-4' />
                                        <span>{singleJob?.location}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className='flex flex-wrap gap-2 mb-4'>
                                <Badge className='bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800 px-3 py-1'>
                                    <Briefcase className='w-3.5 h-3.5 mr-1.5' /> {singleJob?.position} Positions
                                </Badge>
                                <Badge className='bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800 px-3 py-1'>
                                    <Clock className='w-3.5 h-3.5 mr-1.5' /> {singleJob?.jobType}
                                </Badge>
                                <Badge className='bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 px-3 py-1'>
                                    <DollarSign className='w-3.5 h-3.5 mr-1.5' /> {singleJob?.salary} LPA
                                </Badge>
                                <Badge className='bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800 px-3 py-1'>
                                    <Users className='w-3.5 h-3.5 mr-1.5' /> {singleJob?.experienceLevel}+ yrs exp
                                </Badge>
                            </div>

                            <div className='flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500'>
                                <Calendar className='w-3.5 h-3.5' />
                                Posted on {singleJob?.createdAt ? new Date(singleJob.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                            </div>
                        </div>

                        {/* Description */}
                        <div className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-white/60 dark:border-gray-700/50 rounded-2xl shadow-xl p-6'>
                            <div className='flex items-center gap-2 mb-4'>
                                <BookOpen className='w-5 h-5 text-violet-600' />
                                <h2 className='text-lg font-bold text-gray-900 dark:text-white'>Job Description</h2>
                            </div>
                            <p className='text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line'>{singleJob?.description}</p>
                        </div>

                        {/* Requirements */}
                        {singleJob?.requirements?.length > 0 && (
                            <div className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-white/60 dark:border-gray-700/50 rounded-2xl shadow-xl p-6'>
                                <h2 className='text-lg font-bold text-gray-900 dark:text-white mb-4'>Requirements</h2>
                                <ul className='space-y-2.5'>
                                    {singleJob.requirements.map((req, i) => (
                                        <li key={i} className='flex items-start gap-2.5'>
                                            <CheckCircle2 className='w-4 h-4 text-green-500 mt-0.5 flex-shrink-0' />
                                            <span className='text-sm text-gray-600 dark:text-gray-400'>{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </motion.div>

                    {/* Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className='space-y-6'
                    >
                        {/* Apply CTA */}
                        <div className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-white/60 dark:border-gray-700/50 rounded-2xl shadow-xl p-6 sticky top-24'>
                            <h3 className='font-bold text-gray-900 dark:text-white mb-4'>Ready to Apply?</h3>

                            {isApplied ? (
                                <div className='flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl mb-4'>
                                    <CheckCircle2 className='w-5 h-5 text-green-500' />
                                    <span className='text-sm font-medium text-green-700 dark:text-green-400'>Application Submitted!</span>
                                </div>
                            ) : (
                                <Button
                                    onClick={applyJobHandler}
                                    disabled={applying}
                                    className='w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg shadow-violet-500/25 py-3 text-sm font-semibold mb-4 disabled:opacity-70'
                                >
                                    {applying ? (
                                        <span className='flex items-center gap-2'>
                                            <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                                            Applying...
                                        </span>
                                    ) : (
                                        'Apply Now'
                                    )}
                                </Button>
                            )}

                            <div className='space-y-3 text-sm'>
                                <div className='flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800'>
                                    <span className='text-gray-500 dark:text-gray-400'>Role</span>
                                    <span className='font-medium text-gray-900 dark:text-white'>{singleJob?.title}</span>
                                </div>
                                <div className='flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800'>
                                    <span className='text-gray-500 dark:text-gray-400'>Location</span>
                                    <span className='font-medium text-gray-900 dark:text-white'>{singleJob?.location}</span>
                                </div>
                                <div className='flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800'>
                                    <span className='text-gray-500 dark:text-gray-400'>Experience</span>
                                    <span className='font-medium text-gray-900 dark:text-white'>{singleJob?.experienceLevel} years</span>
                                </div>
                                <div className='flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800'>
                                    <span className='text-gray-500 dark:text-gray-400'>Salary</span>
                                    <span className='font-medium text-green-600 dark:text-green-400'>₹{singleJob?.salary} LPA</span>
                                </div>
                                <div className='flex items-center justify-between py-2'>
                                    <span className='text-gray-500 dark:text-gray-400'>Total Applicants</span>
                                    <span className='font-medium text-gray-900 dark:text-white'>{singleJob?.applications?.length || 0}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default JobDescription
