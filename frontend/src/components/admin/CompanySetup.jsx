import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { Loader2, Building2, ArrowLeft, Globe, MapPin, FileText } from 'lucide-react'

const CompanySetup = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState({ name: '', description: '', website: '', location: '', file: null })

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${id}`, { withCredentials: true })
                if (res.data.success) {
                    const c = res.data.company
                    setInput({ name: c.name || '', description: c.description || '', website: c.website || '', location: c.location || '', file: null })
                }
            } catch (err) { console.log(err) }
        }
        if (id) fetchCompany()
    }, [id])

    const changeHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value })
    const fileHandler = (e) => setInput({ ...input, file: e.target.files?.[0] })

    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', input.name)
        formData.append('description', input.description)
        formData.append('website', input.website)
        formData.append('location', input.location)
        if (input.file) formData.append('file', input.file)
        try {
            setLoading(true)
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/admin/companies')
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Update failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-violet-50/20 dark:from-gray-950 dark:to-gray-900'>
            <Navbar />
            <div className='max-w-2xl mx-auto px-4 pt-24 pb-12'>
                <motion.button
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/admin/companies')}
                    className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 mb-6 transition-colors'>
                    <ArrowLeft className='w-4 h-4' /> Back to Companies
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-white/60 dark:border-gray-700/50 rounded-2xl shadow-xl p-8'>
                    <div className='flex items-center gap-3 mb-6'>
                        <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/50 dark:to-purple-900/50 flex items-center justify-center'>
                            <Building2 className='w-6 h-6 text-violet-600 dark:text-violet-400' />
                        </div>
                        <div>
                            <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Company Setup</h1>
                            <p className='text-sm text-gray-500 dark:text-gray-400'>Complete your company profile</p>
                        </div>
                    </div>

                    <form onSubmit={submitHandler} className='space-y-5'>
                        <div>
                            <Label className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1.5'><Building2 className='w-3.5 h-3.5 text-violet-500' /> Company Name</Label>
                            <Input name='name' value={input.name} onChange={changeHandler} placeholder='Your company name' className='bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl' />
                        </div>
                        <div>
                            <Label className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1.5'><FileText className='w-3.5 h-3.5 text-violet-500' /> Description</Label>
                            <textarea name='description' value={input.description} onChange={changeHandler} rows={4}
                                placeholder='What does your company do?'
                                className='w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-violet-500 resize-none' />
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <Label className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1.5'><Globe className='w-3.5 h-3.5 text-violet-500' /> Website</Label>
                                <Input name='website' value={input.website} onChange={changeHandler} placeholder='https://company.com' className='bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl' />
                            </div>
                            <div>
                                <Label className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1.5'><MapPin className='w-3.5 h-3.5 text-violet-500' /> Location</Label>
                                <Input name='location' value={input.location} onChange={changeHandler} placeholder='e.g. Bangalore' className='bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl' />
                            </div>
                        </div>
                        <div>
                            <Label className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block'>Company Logo</Label>
                            <Input type='file' accept='image/*' onChange={fileHandler} className='bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer' />
                        </div>
                        <div className='flex gap-3 pt-2'>
                            <Button type='button' variant='outline' onClick={() => navigate('/admin/companies')} className='flex-1'>Cancel</Button>
                            <Button type='submit' disabled={loading}
                                className='flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg shadow-violet-500/25'>
                                {loading ? <><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Saving...</> : 'Save Changes'}
                            </Button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    )
}

export default CompanySetup
