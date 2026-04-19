import React from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, Github, Twitter, Linkedin, Heart } from 'lucide-react'

const Footer = () => {
    const year = new Date().getFullYear()

    const links = {
        'For Job Seekers': [
            { label: 'Browse Jobs', to: '/jobs' },
            { label: 'Search Jobs', to: '/browse' },
            { label: 'My Profile', to: '/profile' },
        ],
        'For Recruiters': [
            { label: 'Post a Job', to: '/admin/jobs/create' },
            { label: 'My Companies', to: '/admin/companies' },
            { label: 'View Applicants', to: '/admin/jobs' },
        ],
        'Company': [
            { label: 'About Us', to: '/' },
            { label: 'Privacy Policy', to: '/' },
            { label: 'Terms of Service', to: '/' },
        ],
    }

    return (
        <footer className='bg-gray-950 text-white'>
            <div className='max-w-7xl mx-auto px-4 py-16'>
                <div className='grid md:grid-cols-4 gap-10 mb-12'>
                    {/* Brand */}
                    <div>
                        <Link to='/' className='flex items-center gap-2 mb-4'>
                            <div className='w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shadow-lg'>
                                <Briefcase className='w-5 h-5 text-white' />
                            </div>
                            <span className='text-xl font-bold text-white'>
                                Job<span className='text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400'>Portal</span>
                            </span>
                        </Link>
                        <p className='text-sm text-gray-400 leading-relaxed mb-6'>
                            India's fastest-growing job portal connecting talented professionals with top companies nationwide.
                        </p>
                        <div className='flex items-center gap-3'>
                            {[
                                { icon: Github, href: 'https://github.com' },
                                { icon: Twitter, href: 'https://twitter.com' },
                                { icon: Linkedin, href: 'https://linkedin.com' },
                            ].map(({ icon: Icon, href }) => (
                                <a key={href} href={href} target='_blank' rel='noopener noreferrer'
                                    className='w-9 h-9 rounded-xl bg-gray-800 hover:bg-violet-700 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300'>
                                    <Icon className='w-4 h-4' />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(links).map(([title, items]) => (
                        <div key={title}>
                            <h3 className='text-sm font-semibold text-white mb-4'>{title}</h3>
                            <ul className='space-y-2.5'>
                                {items.map(({ label, to }) => (
                                    <li key={label}>
                                        <Link to={to} className='text-sm text-gray-400 hover:text-violet-400 transition-colors duration-200'>
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className='pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4'>
                    <p className='text-sm text-gray-500'>© {year} JobPortal. All rights reserved.</p>
                    <p className='text-sm text-gray-500 flex items-center gap-1'>
                        Made with <Heart className='w-3.5 h-3.5 text-red-500 fill-red-500' /> in India
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
