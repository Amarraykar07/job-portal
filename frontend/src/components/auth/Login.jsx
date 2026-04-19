import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { USER_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Loader2, Mail, Lock, Briefcase, Eye, EyeOff } from 'lucide-react'
import { motion } from 'framer-motion'

const Login = () => {
    const [input, setInput] = useState({ email: '', password: '', role: 'student' })
    const [showPass, setShowPass] = useState(false)
    const { loading, user } = useSelector((store) => store.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (user) navigate('/')
    }, [user])

    const changeHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value })

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            })
            if (res.data.success) {
                dispatch(setUser(res.data.user))
                toast.success(res.data.message)
                navigate('/')
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Login failed')
        } finally {
            dispatch(setLoading(false))
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-violet-950/20 flex'>
            {/* Left Decorative Panel */}
            <div className='hidden lg:flex lg:w-1/2 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 relative overflow-hidden flex-col items-center justify-center p-12'>
                <div className='absolute inset-0'>
                    <div className='absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-2xl' />
                    <div className='absolute bottom-20 right-20 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl' />
                </div>
                <div className='relative z-10 text-center'>
                    <div className='w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/30'>
                        <Briefcase className='w-10 h-10 text-white' />
                    </div>
                    <h1 className='text-4xl font-extrabold text-white mb-4'>Welcome Back!</h1>
                    <p className='text-violet-200 text-lg max-w-sm'>Continue your journey to finding the perfect job opportunity</p>
                    <div className='mt-12 grid grid-cols-2 gap-4 max-w-xs mx-auto'>
                        {[['10K+', 'Jobs Available'], ['500+', 'Companies'], ['50K+', 'Hired'], ['4.9★', 'Rating']].map(([v, l]) => (
                            <div key={l} className='bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center'>
                                <div className='text-2xl font-bold text-white'>{v}</div>
                                <div className='text-xs text-violet-200 mt-0.5'>{l}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Form Panel */}
            <div className='flex-1 flex items-center justify-center p-6'>
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className='w-full max-w-md'
                >
                    {/* Logo for Mobile */}
                    <div className='lg:hidden flex items-center gap-2 mb-8'>
                        <div className='w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center'>
                            <Briefcase className='w-5 h-5 text-white' />
                        </div>
                        <span className='text-xl font-bold text-gray-900 dark:text-white'>
                            Job<span className='text-violet-600'>Portal</span>
                        </span>
                    </div>

                    <div className='mb-8'>
                        <h2 className='text-3xl font-extrabold text-gray-900 dark:text-white'>Sign In</h2>
                        <p className='text-gray-500 dark:text-gray-400 mt-2'>Welcome back! Please enter your details.</p>
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

                    <form onSubmit={submitHandler} className='space-y-5'>
                        <div>
                            <label className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block'>Email address</label>
                            <div className='relative'>
                                <Mail className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                                <input
                                    type='email'
                                    name='email'
                                    value={input.email}
                                    onChange={changeHandler}
                                    placeholder='you@example.com'
                                    required
                                    className='w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all'
                                />
                            </div>
                        </div>

                        <div>
                            <label className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block'>Password</label>
                            <div className='relative'>
                                <Lock className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    name='password'
                                    value={input.password}
                                    onChange={changeHandler}
                                    placeholder='Enter your password'
                                    required
                                    className='w-full pl-10 pr-12 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all'
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowPass(!showPass)}
                                    className='absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
                                >
                                    {showPass ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type='submit'
                            disabled={loading}
                            className='w-full py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 text-sm'
                        >
                            {loading ? (
                                <span className='flex items-center gap-2'>
                                    <Loader2 className='w-4 h-4 animate-spin' /> Signing in...
                                </span>
                            ) : 'Sign In'}
                        </Button>
                    </form>

                    <p className='text-center text-sm text-gray-500 dark:text-gray-400 mt-6'>
                        Don't have an account?{' '}
                        <Link to='/signup' className='font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 transition-colors'>
                            Sign up for free
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    )
}

export default Login
