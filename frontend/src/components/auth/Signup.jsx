import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { USER_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Loader2, Mail, Lock, User, Phone, Briefcase, Eye, EyeOff, Image } from 'lucide-react'
import { motion } from 'framer-motion'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: 'student',
        file: null,
    })
    const [showPass, setShowPass] = useState(false)
    const [preview, setPreview] = useState(null)
    const { loading, user } = useSelector((store) => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (user) navigate('/')
    }, [user])

    const changeHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value })

    const fileHandler = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setInput({ ...input, file })
            setPreview(URL.createObjectURL(file))
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('fullname', input.fullname)
        formData.append('email', input.email)
        formData.append('phoneNumber', input.phoneNumber)
        formData.append('password', input.password)
        formData.append('role', input.role)
        if (input.file) formData.append('file', input.file)

        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            })
            if (res.data.success) {
                navigate('/login')
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Registration failed')
        } finally {
            dispatch(setLoading(false))
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-violet-950/20 flex'>
            {/* Right Form Panel */}
            <div className='flex-1 flex items-center justify-center p-6'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='w-full max-w-md'
                >
                    {/* Logo */}
                    <div className='flex items-center gap-2 mb-8'>
                        <div className='w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center'>
                            <Briefcase className='w-5 h-5 text-white' />
                        </div>
                        <span className='text-xl font-bold text-gray-900 dark:text-white'>
                            Job<span className='text-violet-600'>Portal</span>
                        </span>
                    </div>

                    <div className='mb-8'>
                        <h2 className='text-3xl font-extrabold text-gray-900 dark:text-white'>Create Account</h2>
                        <p className='text-gray-500 dark:text-gray-400 mt-2'>Start your journey to finding the perfect job</p>
                    </div>

                    {/* Role Selector */}
                    <div className='flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl mb-6'>
                        {['student', 'recruiter'].map((role) => (
                            <button
                                key={role}
                                type='button'
                                onClick={() => setInput({ ...input, role })}
                                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 capitalize ${input.role === role
                                    ? 'bg-white dark:bg-gray-900 text-violet-600 dark:text-violet-400 shadow-md'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                    }`}
                            >
                                {role === 'student' ? '🎓 Student' : '🏢 Recruiter'}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={submitHandler} className='space-y-4'>
                        {/* Profile Photo */}
                        <div className='flex items-center gap-4'>
                            <div className='w-14 h-14 rounded-full border-2 border-dashed border-violet-300 dark:border-violet-700 flex items-center justify-center overflow-hidden bg-violet-50 dark:bg-violet-900/20 flex-shrink-0'>
                                {preview
                                    ? <img src={preview} alt='preview' className='w-full h-full object-cover rounded-full' />
                                    : <Image className='w-6 h-6 text-violet-400' />
                                }
                            </div>
                            <div className='flex-1'>
                                <label className='text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1'>Profile Photo (optional)</label>
                                <input type='file' accept='image/*' onChange={fileHandler}
                                    className='w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-violet-50 file:text-violet-700 dark:file:bg-violet-900/30 dark:file:text-violet-400 hover:file:bg-violet-100 dark:hover:file:bg-violet-900/40 cursor-pointer' />
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block'>Full Name</label>
                                <div className='relative'>
                                    <User className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                                    <input type='text' name='fullname' value={input.fullname} onChange={changeHandler} placeholder='Amar Raykar' required
                                        className='w-full pl-9 pr-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-violet-500 transition-all' />
                                </div>
                            </div>
                            <div>
                                <label className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block'>Phone Number</label>
                                <div className='relative'>
                                    <Phone className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                                    <input type='text' name='phoneNumber' value={input.phoneNumber} onChange={changeHandler} placeholder='9876543210' required
                                        className='w-full pl-9 pr-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-violet-500 transition-all' />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block'>Email address</label>
                            <div className='relative'>
                                <Mail className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                                <input type='email' name='email' value={input.email} onChange={changeHandler} placeholder='you@example.com' required
                                    className='w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-violet-500 transition-all' />
                            </div>
                        </div>

                        <div>
                            <label className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block'>Password</label>
                            <div className='relative'>
                                <Lock className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                                <input type={showPass ? 'text' : 'password'} name='password' value={input.password} onChange={changeHandler} placeholder='Min. 8 characters' required
                                    className='w-full pl-10 pr-12 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-violet-500 transition-all' />
                                <button type='button' onClick={() => setShowPass(!showPass)}
                                    className='absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'>
                                    {showPass ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
                                </button>
                            </div>
                        </div>

                        <Button type='submit' disabled={loading}
                            className='w-full py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 text-sm'>
                            {loading ? (
                                <span className='flex items-center gap-2'>
                                    <Loader2 className='w-4 h-4 animate-spin' /> Creating account...
                                </span>
                            ) : 'Create Account'}
                        </Button>
                    </form>

                    <p className='text-center text-sm text-gray-500 dark:text-gray-400 mt-6'>
                        Already have an account?{' '}
                        <Link to='/login' className='font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 transition-colors'>
                            Sign in
                        </Link>
                    </p>
                </motion.div>
            </div>

            {/* Right Decorative Panel */}
            <div className='hidden lg:flex lg:w-2/5 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 relative overflow-hidden flex-col items-center justify-center p-12'>
                <div className='absolute inset-0'>
                    <div className='absolute top-16 right-16 w-56 h-56 bg-white/10 rounded-full blur-2xl' />
                    <div className='absolute bottom-24 left-8 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl' />
                </div>
                <div className='relative z-10 text-center'>
                    <h2 className='text-3xl font-extrabold text-white mb-4'>Join Thousands of Professionals</h2>
                    <p className='text-violet-200 mb-8 max-w-xs'>Create your free account and get hired by top companies</p>
                    {['✓ Free forever', '✓ Apply to unlimited jobs', '✓ Track your applications', '✓ Get noticed by recruiters'].map((f) => (
                        <div key={f} className='text-left text-sm text-violet-100 mb-2'>{f}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Signup
