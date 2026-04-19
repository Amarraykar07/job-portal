import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { USER_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { toast } from 'sonner'
import { setUser } from '@/redux/authSlice'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Mail, Phone, Pen, X, FileText, Plus, Loader2, User2,
    Briefcase, CheckCircle2, ExternalLink, Shield
} from 'lucide-react'
import AppliedJobTable from './AppliedJobTable'

const Profile = () => {
    const { user } = useSelector((store) => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [editOpen, setEditOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState({
        fullname: user?.fullname || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        bio: user?.profile?.bio || '',
        skills: user?.profile?.skills?.join(', ') || '',
        file: null,
    })

    if (!user) {
        navigate('/login')
        return null
    }

    const changeHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value })
    const fileHandler = (e) => setInput({ ...input, file: e.target.files?.[0] })

    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('fullname', input.fullname)
        formData.append('email', input.email)
        formData.append('phoneNumber', input.phoneNumber)
        formData.append('bio', input.bio)
        formData.append('skills', input.skills)
        if (input.file) formData.append('file', input.file)

        try {
            setLoading(true)
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            })
            if (res.data.success) {
                dispatch(setUser(res.data.user))
                toast.success(res.data.message)
                setEditOpen(false)
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Profile update failed')
        } finally {
            setLoading(false)
        }
    }

    const skills = user?.profile?.skills || []
    const initials = user?.fullname?.split(' ').map((n) => n[0]).join('').toUpperCase() || 'U'

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-violet-50/20 dark:from-gray-950 dark:to-gray-900'>
            <Navbar />
            <div className='max-w-5xl mx-auto px-4 pt-24 pb-12'>
                <div className='grid md:grid-cols-3 gap-6'>
                    {/* Profile Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='md:col-span-1 space-y-5'
                    >
                        <div className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-white/60 dark:border-gray-700/50 rounded-2xl shadow-xl p-6 text-center'>
                            <div className='relative inline-block mb-4'>
                                <Avatar className='h-24 w-24 ring-4 ring-violet-200 dark:ring-violet-800 shadow-xl'>
                                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                    <AvatarFallback className='h-24 w-24 text-2xl font-bold bg-gradient-to-br from-violet-500 to-purple-600 text-white'>
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                                <div className='absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-900' />
                            </div>
                            <h2 className='text-xl font-bold text-gray-900 dark:text-white'>{user?.fullname}</h2>
                            <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>{user?.profile?.bio || 'No bio added'}</p>
                            <Badge className={`mt-3 ${user?.role === 'recruiter' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' : 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400'}`}>
                                {user?.role === 'recruiter' ? <Shield className='w-3 h-3 mr-1' /> : <User2 className='w-3 h-3 mr-1' />}
                                {user?.role === 'recruiter' ? 'Recruiter' : 'Job Seeker'}
                            </Badge>

                            <button
                                onClick={() => setEditOpen(true)}
                                className='mt-4 w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800 rounded-xl hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-colors'
                            >
                                <Pen className='w-4 h-4' /> Edit Profile
                            </button>
                        </div>

                        {/* Contact Info */}
                        <div className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-white/60 dark:border-gray-700/50 rounded-2xl shadow-xl p-5'>
                            <h3 className='font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
                                <Mail className='w-4 h-4 text-violet-500' /> Contact
                            </h3>
                            <div className='space-y-3'>
                                <div className='flex items-center gap-3'>
                                    <Mail className='w-4 h-4 text-gray-400 flex-shrink-0' />
                                    <span className='text-sm text-gray-700 dark:text-gray-300 break-all'>{user?.email}</span>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <Phone className='w-4 h-4 text-gray-400 flex-shrink-0' />
                                    <span className='text-sm text-gray-700 dark:text-gray-300'>+91 {user?.phoneNumber}</span>
                                </div>
                            </div>
                        </div>

                        {/* Skills */}
                        <div className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-white/60 dark:border-gray-700/50 rounded-2xl shadow-xl p-5'>
                            <h3 className='font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
                                <Briefcase className='w-4 h-4 text-violet-500' /> Skills
                            </h3>
                            {skills.length > 0 ? (
                                <div className='flex flex-wrap gap-2'>
                                    {skills.map((skill, i) => (
                                        <Badge key={i} variant='secondary' className='bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300 border-0 px-3 py-1'>
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            ) : (
                                <p className='text-sm text-gray-400 dark:text-gray-500'>No skills added yet</p>
                            )}
                        </div>

                        {/* Resume */}
                        <div className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-white/60 dark:border-gray-700/50 rounded-2xl shadow-xl p-5'>
                            <h3 className='font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
                                <FileText className='w-4 h-4 text-violet-500' /> Resume
                            </h3>
                            {user?.profile?.resume ? (
                                <a
                                    href={user.profile.resume}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='flex items-center gap-2 px-4 py-2.5 bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 rounded-xl text-sm font-medium text-violet-600 dark:text-violet-400 hover:bg-violet-100 dark:hover:bg-violet-900/40 transition-colors'
                                >
                                    <FileText className='w-4 h-4' />
                                    {user.profile.resumeOriginalName || 'Download Resume'}
                                    <ExternalLink className='w-3.5 h-3.5 ml-auto' />
                                </a>
                            ) : (
                                <p className='text-sm text-gray-400 dark:text-gray-500'>No resume uploaded</p>
                            )}
                        </div>
                    </motion.div>

                    {/* Applied Jobs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className='md:col-span-2'
                    >
                        <div className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-white/60 dark:border-gray-700/50 rounded-2xl shadow-xl p-6'>
                            <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2'>
                                <CheckCircle2 className='w-5 h-5 text-violet-500' /> Applied Jobs
                            </h3>
                            <AppliedJobTable />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Edit Modal */}
            <AnimatePresence>
                {editOpen && (
                    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className='w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto'
                        >
                            <div className='flex items-center justify-between mb-6'>
                                <h2 className='text-xl font-bold text-gray-900 dark:text-white'>Edit Profile</h2>
                                <button onClick={() => setEditOpen(false)} className='p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors'>
                                    <X className='w-5 h-5 text-gray-500' />
                                </button>
                            </div>

                            <form onSubmit={submitHandler} className='space-y-4'>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div>
                                        <Label className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block'>Full Name</Label>
                                        <Input name='fullname' value={input.fullname} onChange={changeHandler} placeholder='Your name'
                                            className='bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl' />
                                    </div>
                                    <div>
                                        <Label className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block'>Email</Label>
                                        <Input name='email' type='email' value={input.email} onChange={changeHandler} placeholder='Email'
                                            className='bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl' />
                                    </div>
                                </div>
                                <div>
                                    <Label className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block'>Phone Number</Label>
                                    <Input name='phoneNumber' value={input.phoneNumber} onChange={changeHandler} placeholder='Phone number'
                                        className='bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl' />
                                </div>
                                <div>
                                    <Label className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block'>Bio</Label>
                                    <textarea
                                        name='bio'
                                        value={input.bio}
                                        onChange={changeHandler}
                                        placeholder='Write a short bio...'
                                        rows={3}
                                        className='w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-violet-500 resize-none'
                                    />
                                </div>
                                <div>
                                    <Label className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block'>Skills (comma-separated)</Label>
                                    <Input name='skills' value={input.skills} onChange={changeHandler} placeholder='React, Node.js, Python...'
                                        className='bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl' />
                                </div>
                                <div>
                                    <Label className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block'>Resume (PDF)</Label>
                                    <Input type='file' accept='.pdf' onChange={fileHandler}
                                        className='bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer' />
                                </div>
                                <div className='flex gap-3 pt-2'>
                                    <Button type='button' variant='outline' onClick={() => setEditOpen(false)} className='flex-1'>Cancel</Button>
                                    <Button type='submit' disabled={loading}
                                        className='flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white'>
                                        {loading ? <><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Saving...</> : 'Save Changes'}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Profile
