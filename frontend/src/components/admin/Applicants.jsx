import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { ArrowLeft, Users, Mail, Phone, Calendar, FileText, ExternalLink, ChevronDown } from 'lucide-react'

const Applicants = () => {
    const { id: jobId } = useParams()
    const navigate = useNavigate()
    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(null)

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${jobId}/applicants`, { withCredentials: true })
                if (res.data.success) setJob(res.data.job)
            } catch (err) { console.log(err) }
            finally { setLoading(false) }
        }
        fetchApplicants()
    }, [jobId])

    const updateStatus = async (applicationId, status) => {
        try {
            setUpdating(applicationId)
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${applicationId}/update`, { status }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            })
            if (res.data.success) {
                toast.success(res.data.message)
                setJob((prev) => ({
                    ...prev,
                    applications: prev.applications.map((app) =>
                        app._id === applicationId ? { ...app, status } : app
                    )
                }))
            }
        } catch (err) { toast.error(err?.response?.data?.message || 'Update failed') }
        finally { setUpdating(null) }
    }

    const statusConfig = {
        pending: 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800',
        accepted: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800',
        rejected: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-violet-50/20 dark:from-gray-950 dark:to-gray-900'>
            <Navbar />
            <div className='max-w-6xl mx-auto px-4 pt-24 pb-12'>
                <motion.button
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/admin/jobs')}
                    className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 mb-6 transition-colors'>
                    <ArrowLeft className='w-4 h-4' /> Back to Jobs
                </motion.button>

                <div className='mb-6'>
                    <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-1'>
                        Applicants for <span className='text-violet-600 dark:text-violet-400'>{job?.title}</span>
                    </h1>
                    <div className='flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm'>
                        <Users className='w-4 h-4' /> {job?.applications?.length || 0} applicant{job?.applications?.length !== 1 ? 's' : ''}
                    </div>
                </div>

                <div className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-white/60 dark:border-gray-700/50 rounded-2xl shadow-xl overflow-hidden'>
                    {loading ? (
                        <div className='p-8 space-y-4'>
                            {[1, 2, 3].map(i => <div key={i} className='h-16 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse' />)}
                        </div>
                    ) : job?.applications?.length === 0 ? (
                        <div className='text-center py-16'>
                            <Users className='w-14 h-14 text-gray-300 dark:text-gray-700 mx-auto mb-3' />
                            <h3 className='font-semibold text-gray-600 dark:text-gray-400 text-lg mb-1'>No Applicants Yet</h3>
                            <p className='text-gray-400 dark:text-gray-500 text-sm'>Applications will appear here once candidates apply</p>
                        </div>
                    ) : (
                        <div className='overflow-x-auto'>
                            <table className='w-full'>
                                <thead className='bg-gray-50/80 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800'>
                                    <tr>
                                        {['Applicant', 'Contact', 'Applied', 'Resume', 'Status', 'Action'].map((h) => (
                                            <th key={h} className='text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-5 py-4'>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-50 dark:divide-gray-800'>
                                    {job?.applications?.map((app, i) => {
                                        const applicant = app.applicant
                                        const initials = applicant?.fullname?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'
                                        return (
                                            <motion.tr key={app._id}
                                                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className='hover:bg-violet-50/20 dark:hover:bg-violet-900/5 transition-colors'>
                                                <td className='px-5 py-4'>
                                                    <div className='flex items-center gap-3'>
                                                        <Avatar className='h-9 w-9 ring-2 ring-white dark:ring-gray-800'>
                                                            <AvatarImage src={applicant?.profile?.profilePhoto} alt={applicant?.fullname} />
                                                            <AvatarFallback className='bg-gradient-to-br from-violet-500 to-purple-600 text-white text-xs font-bold'>{initials}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className='font-semibold text-sm text-gray-900 dark:text-white'>{applicant?.fullname}</div>
                                                            <div className='text-xs text-gray-400'>{applicant?.profile?.bio?.slice(0, 30) || 'No bio'}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='px-5 py-4'>
                                                    <div className='space-y-1'>
                                                        <div className='flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400'>
                                                            <Mail className='w-3 h-3' />{applicant?.email}
                                                        </div>
                                                        <div className='flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400'>
                                                            <Phone className='w-3 h-3' />+91 {applicant?.phoneNumber}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='px-5 py-4'>
                                                    <div className='flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400'>
                                                        <Calendar className='w-3.5 h-3.5' />
                                                        {new Date(app.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </div>
                                                </td>
                                                <td className='px-5 py-4'>
                                                    {applicant?.profile?.resume ? (
                                                        <a href={applicant.profile.resume} target='_blank' rel='noopener noreferrer'
                                                            className='flex items-center gap-1.5 text-xs font-medium text-violet-600 dark:text-violet-400 hover:underline'>
                                                            <FileText className='w-3.5 h-3.5' /> View CV <ExternalLink className='w-3 h-3' />
                                                        </a>
                                                    ) : (
                                                        <span className='text-xs text-gray-400'>No resume</span>
                                                    )}
                                                </td>
                                                <td className='px-5 py-4'>
                                                    <Badge className={`text-xs px-2.5 py-1 ${statusConfig[app.status] || statusConfig.pending}`}>
                                                        {app.status || 'pending'}
                                                    </Badge>
                                                </td>
                                                <td className='px-5 py-4'>
                                                    <select
                                                        value={app.status || 'pending'}
                                                        onChange={(e) => updateStatus(app._id, e.target.value)}
                                                        disabled={updating === app._id}
                                                        className='text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-2.5 py-1.5 text-gray-700 dark:text-gray-300 outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50 cursor-pointer'
                                                    >
                                                        <option value='pending'>Pending</option>
                                                        <option value='accepted'>Accept</option>
                                                        <option value='rejected'>Reject</option>
                                                    </select>
                                                </td>
                                            </motion.tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Applicants
