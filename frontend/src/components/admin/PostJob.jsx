import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from '../shared/Navbar'
import { JOB_API_END_POINT, COMPANY_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Loader2, Briefcase, MapPin, DollarSign, Clock, Users, FileText, Building2, ArrowLeft } from 'lucide-react'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'

const PostJob = () => {
    useGetAllCompanies()
    const { companies } = useSelector((store) => store.company)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState({
        title: '',
        description: '',
        requirements: '',
        salary: '',
        location: '',
        jobType: '',
        experience: '',
        position: '',
        companyId: '',
    })

    const changeHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value })

    const submitHandler = async (e) => {
        e.preventDefault()
        if (!input.companyId) {
            toast.error('Please select or create a company first')
            return
        }
        try {
            setLoading(true)
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/admin/jobs')
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Failed to post job')
        } finally {
            setLoading(false)
        }
    }

    const fields = [
        { name: 'title', label: 'Job Title', placeholder: 'e.g. Senior React Developer', icon: Briefcase, col: 2 },
        { name: 'location', label: 'Location', placeholder: 'e.g. Bangalore / Remote', icon: MapPin, col: 1 },
        { name: 'jobType', label: 'Job Type', placeholder: 'Full Time / Part Time / Internship', icon: Clock, col: 1 },
        { name: 'salary', label: 'Salary (LPA)', placeholder: 'e.g. 12', icon: DollarSign, col: 1, type: 'number' },
        { name: 'experience', label: 'Experience (years)', placeholder: 'e.g. 2', icon: Users, col: 1, type: 'number' },
        { name: 'position', label: 'Positions', placeholder: 'e.g. 5', icon: Users, col: 1, type: 'number' },
    ]

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-violet-50/20 dark:from-gray-950 dark:to-gray-900'>
            <Navbar />
            <div className='max-w-4xl mx-auto px-4 pt-24 pb-12'>
                <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/admin/jobs')}
                    className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 mb-6 transition-colors'
                >
                    <ArrowLeft className='w-4 h-4' /> Back to Jobs
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-white/60 dark:border-gray-700/50 rounded-2xl shadow-xl p-8'
                >
                    <div className='mb-8'>
                        <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Post a New Job</h1>
                        <p className='text-gray-500 dark:text-gray-400 mt-1'>Fill in the details to attract the right candidates</p>
                    </div>

                    {companies.length === 0 ? (
                        <div className='text-center py-12 bg-orange-50 dark:bg-orange-900/10 rounded-xl border border-orange-200 dark:border-orange-800'>
                            <Building2 className='w-12 h-12 text-orange-400 mx-auto mb-3' />
                            <h3 className='font-semibold text-orange-700 dark:text-orange-400 mb-2'>No Company Registered</h3>
                            <p className='text-sm text-orange-600/70 dark:text-orange-400/70 mb-4'>You need to register a company before posting a job</p>
                            <Button onClick={() => navigate('/admin/companies/create')}
                                className='bg-orange-500 hover:bg-orange-600 text-white'>
                                Register Company
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={submitHandler} className='space-y-6'>
                            <div className='grid md:grid-cols-2 gap-5'>
                                {fields.map(({ name, label, placeholder, icon: Icon, col, type }) => (
                                    <div key={name} className={col === 2 ? 'md:col-span-2' : ''}>
                                        <Label className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1.5'>
                                            <Icon className='w-3.5 h-3.5 text-violet-500' /> {label}
                                        </Label>
                                        <Input
                                            name={name}
                                            type={type || 'text'}
                                            value={input[name]}
                                            onChange={changeHandler}
                                            placeholder={placeholder}
                                            required
                                            className='bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-violet-500'
                                        />
                                    </div>
                                ))}

                                {/* Company Select */}
                                <div>
                                    <Label className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1.5'>
                                        <Building2 className='w-3.5 h-3.5 text-violet-500' /> Company
                                    </Label>
                                    <select
                                        name='companyId'
                                        value={input.companyId}
                                        onChange={changeHandler}
                                        required
                                        className='w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent'
                                    >
                                        <option value=''>Select a company</option>
                                        {companies.map((c) => (
                                            <option key={c._id} value={c._id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Requirements */}
                            <div>
                                <Label className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1.5'>
                                    <FileText className='w-3.5 h-3.5 text-violet-500' /> Requirements (comma-separated)
                                </Label>
                                <textarea
                                    name='requirements'
                                    value={input.requirements}
                                    onChange={changeHandler}
                                    placeholder='React, Node.js, MongoDB, REST APIs...'
                                    rows={3}
                                    required
                                    className='w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-violet-500 resize-none'
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <Label className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1.5'>
                                    <FileText className='w-3.5 h-3.5 text-violet-500' /> Job Description
                                </Label>
                                <textarea
                                    name='description'
                                    value={input.description}
                                    onChange={changeHandler}
                                    placeholder='Describe the role, responsibilities, and what you are looking for...'
                                    rows={5}
                                    required
                                    className='w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-violet-500 resize-none'
                                />
                            </div>

                            <div className='flex justify-end gap-3'>
                                <Button type='button' variant='outline' onClick={() => navigate('/admin/jobs')}>Cancel</Button>
                                <Button type='submit' disabled={loading}
                                    className='px-8 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg shadow-violet-500/25'>
                                    {loading ? <><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Posting...</> : 'Post Job'}
                                </Button>
                            </div>
                        </form>
                    )}
                </motion.div>
            </div>
        </div>
    )
}

export default PostJob
