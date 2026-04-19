import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { Loader2, Building2, ArrowLeft } from 'lucide-react'

const CompanyCreate = () => {
    const navigate = useNavigate()
    const [companyName, setCompanyName] = useState('')
    const [loading, setLoading] = useState(false)

    const registerCompany = async () => {
        if (!companyName.trim()) {
            toast.error('Please enter a company name')
            return
        }
        try {
            setLoading(true)
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate(`/admin/companies/${res.data.company._id}`)
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Failed to register company')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-violet-50/20 dark:from-gray-950 dark:to-gray-900'>
            <Navbar />
            <div className='max-w-2xl mx-auto px-4 pt-24 pb-12'>
                <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/admin/companies')}
                    className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 mb-6 transition-colors'
                >
                    <ArrowLeft className='w-4 h-4' /> Back to Companies
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-white/60 dark:border-gray-700/50 rounded-2xl shadow-xl p-8'
                >
                    <div className='flex items-center gap-3 mb-6'>
                        <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/50 dark:to-purple-900/50 flex items-center justify-center'>
                            <Building2 className='w-6 h-6 text-violet-600 dark:text-violet-400' />
                        </div>
                        <div>
                            <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Register Company</h1>
                            <p className='text-sm text-gray-500 dark:text-gray-400'>What'll be your company name?</p>
                        </div>
                    </div>

                    <div className='bg-violet-50/60 dark:bg-violet-900/10 border border-violet-200/50 dark:border-violet-800/50 rounded-xl p-4 mb-6'>
                        <p className='text-sm text-violet-700 dark:text-violet-300'>
                            💡 You can change it later. This name will be displayed on job postings.
                        </p>
                    </div>

                    <div className='space-y-5'>
                        <div>
                            <Label className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block'>Company Name</Label>
                            <Input
                                type='text'
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && registerCompany()}
                                placeholder='e.g. Google, TechCorp, Startup Inc.'
                                className='bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl text-sm'
                            />
                        </div>

                        <div className='flex gap-3 pt-2'>
                            <Button variant='outline' onClick={() => navigate('/admin/companies')} className='flex-1'>Cancel</Button>
                            <Button
                                onClick={registerCompany}
                                disabled={loading}
                                className='flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg shadow-violet-500/25'
                            >
                                {loading ? <><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Registering...</> : 'Continue →'}
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default CompanyCreate
