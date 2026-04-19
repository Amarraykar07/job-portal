import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '@/redux/authSlice'
import { USER_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { toast } from 'sonner'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'
import { LogOut, User2, Briefcase, Sun, Moon, Menu, X, ChevronDown } from 'lucide-react'

const Navbar = () => {
    const { user } = useSelector((store) => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }, [dark])

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setUser(null))
                navigate('/')
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Logout failed')
        }
    }

    const navLinks = user?.role === 'recruiter'
        ? [
            { label: 'Home', to: '/' },
            { label: 'Companies', to: '/admin/companies' },
            { label: 'Jobs', to: '/admin/jobs' },
        ]
        : [
            { label: 'Home', to: '/' },
            { label: 'Jobs', to: '/jobs' },
            { label: 'Browse', to: '/browse' },
        ]

    const initials = user?.fullname?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-white/20'
            : 'bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm'
            }`}>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>
                    {/* Logo */}
                    <Link to='/' className='flex items-center gap-2 group'>
                        <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shadow-lg group-hover:shadow-violet-400/40 transition-all duration-300'>
                            <Briefcase className='w-4 h-4 text-white' />
                        </div>
                        <span className='text-xl font-bold text-gray-900 dark:text-white'>
                            Job<span className='text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600'>Portal</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className='hidden md:flex items-center gap-8'>
                        <ul className='flex items-center gap-6'>
                            {navLinks.map(({ label, to }) => (
                                <li key={to}>
                                    <Link
                                        to={to}
                                        className='text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200 relative group'
                                    >
                                        {label}
                                        <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-600 group-hover:w-full transition-all duration-300 rounded-full' />
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Dark mode toggle */}
                        <button
                            onClick={() => setDark(!dark)}
                            className='p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
                        >
                            {dark ? <Sun className='w-4 h-4 text-yellow-500' /> : <Moon className='w-4 h-4 text-gray-600' />}
                        </button>

                        {/* Auth Section */}
                        {!user ? (
                            <div className='flex items-center gap-3'>
                                <Link to='/login'>
                                    <Button variant='ghost' className='text-gray-700 dark:text-gray-300 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/20'>
                                        Login
                                    </Button>
                                </Link>
                                <Link to='/signup'>
                                    <Button className='bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300'>
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <button className='flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group'>
                                        <Avatar className='h-8 w-8 ring-2 ring-violet-500/50 group-hover:ring-violet-500 transition-all'>
                                            <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                            <AvatarFallback className='bg-gradient-to-br from-violet-500 to-purple-600 text-white text-xs font-bold'>
                                                {initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <ChevronDown className='w-3.5 h-3.5 text-gray-500 group-hover:text-violet-500 transition-colors' />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className='w-72 p-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl overflow-hidden' align='end'>
                                    <div className='p-4 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20'>
                                        <div className='flex gap-3 items-center'>
                                            <Avatar className='h-12 w-12 ring-2 ring-violet-400'>
                                                <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                                <AvatarFallback className='bg-gradient-to-br from-violet-500 to-purple-600 text-white text-sm font-bold'>
                                                    {initials}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h4 className='font-semibold text-gray-900 dark:text-white'>{user?.fullname}</h4>
                                                <p className='text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2'>
                                                    {user?.profile?.bio || 'No bio added'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='p-2'>
                                        {user?.role !== 'recruiter' && (
                                            <Link to='/profile'>
                                                <button className='w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-violet-50 dark:hover:bg-violet-900/20 hover:text-violet-600 rounded-lg transition-colors group'>
                                                    <User2 className='w-4 h-4 group-hover:text-violet-600 transition-colors' />
                                                    View Profile
                                                </button>
                                            </Link>
                                        )}
                                        <button
                                            onClick={logoutHandler}
                                            className='w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors group'
                                        >
                                            <LogOut className='w-4 h-4' />
                                            Logout
                                        </button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className='md:hidden flex items-center gap-2'>
                        <button onClick={() => setDark(!dark)} className='p-2 rounded-full bg-gray-100 dark:bg-gray-800'>
                            {dark ? <Sun className='w-4 h-4 text-yellow-500' /> : <Moon className='w-4 h-4 text-gray-600' />}
                        </button>
                        <button onClick={() => setMobileOpen(!mobileOpen)} className='p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'>
                            {mobileOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <div className='md:hidden pb-4 pt-2 space-y-1 border-t border-gray-100 dark:border-gray-800'>
                        {navLinks.map(({ label, to }) => (
                            <Link key={to} to={to} onClick={() => setMobileOpen(false)}
                                className='block px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-violet-50 dark:hover:bg-violet-900/20 hover:text-violet-600 rounded-lg transition-colors'>
                                {label}
                            </Link>
                        ))}
                        {!user ? (
                            <div className='flex gap-2 px-4 pt-2'>
                                <Link to='/login' className='flex-1'><Button variant='outline' className='w-full'>Login</Button></Link>
                                <Link to='/signup' className='flex-1'><Button className='w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white'>Sign Up</Button></Link>
                            </div>
                        ) : (
                            <button onClick={logoutHandler} className='w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors'>
                                <LogOut className='w-4 h-4' /> Logout
                            </button>
                        )}
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
