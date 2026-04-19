import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { motion } from 'framer-motion'
import { Plus, Search, Building2, MapPin, Globe, Pen } from 'lucide-react'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'

const AdminCompanies = () => {
    useGetAllCompanies()
    const { companies } = useSelector((store) => store.company)
    const navigate = useNavigate()
    const [search, setSearch] = useState('')

    const filtered = companies?.filter((c) =>
        c.name?.toLowerCase().includes(search.toLowerCase())
    ) || []

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-violet-50/20 dark:from-gray-950 dark:to-gray-900'>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 pt-24 pb-12'>
                <div className='flex flex-wrap items-center justify-between gap-4 mb-8'>
                    <div>
                        <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>My Companies</h1>
                        <p className='text-gray-500 dark:text-gray-400 mt-1'>{filtered.length} companies registered</p>
                    </div>
                    <Button
                        onClick={() => navigate('/admin/companies/create')}
                        className='bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg shadow-violet-500/25 flex items-center gap-2'
                    >
                        <Plus className='w-4 h-4' /> New Company
                    </Button>
                </div>

                {/* Search */}
                <div className='flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 shadow-sm mb-6'>
                    <Search className='w-4 h-4 text-gray-400' />
                    <input
                        type='text'
                        placeholder='Search companies...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='flex-1 bg-transparent text-sm outline-none text-gray-900 dark:text-white placeholder:text-gray-400'
                    />
                </div>

                {filtered.length === 0 ? (
                    <div className='text-center py-24 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl border border-white/60 dark:border-gray-700/50'>
                        <Building2 className='w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4' />
                        <h3 className='text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2'>No Companies Yet</h3>
                        <p className='text-gray-400 dark:text-gray-500 mb-6 text-sm'>Register a company to start posting jobs</p>
                        <Button onClick={() => navigate('/admin/companies/create')}
                            className='bg-gradient-to-r from-violet-600 to-purple-600 text-white'>
                            <Plus className='w-4 h-4 mr-2' /> Register Company
                        </Button>
                    </div>
                ) : (
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
                        {filtered.map((company, index) => (
                            <motion.div
                                key={company._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.08 }}
                                className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-white/60 dark:border-gray-700/50 rounded-2xl shadow-lg p-5 hover:shadow-xl transition-all duration-300'
                            >
                                <div className='flex items-start justify-between mb-4'>
                                    <div className='flex items-center gap-3'>
                                        <Avatar className='h-12 w-12 rounded-xl border-2 border-white dark:border-gray-700 shadow'>
                                            <AvatarImage src={company.logo} alt={company.name} className='object-contain' />
                                            <AvatarFallback className='rounded-xl bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/50 dark:to-purple-900/50 text-violet-700 dark:text-violet-300 font-bold'>
                                                {company.name?.slice(0, 2).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className='font-bold text-gray-900 dark:text-white'>{company.name}</h3>
                                            {company.location && (
                                                <div className='flex items-center gap-1 text-xs text-gray-400 mt-0.5'>
                                                    <MapPin className='w-3 h-3' />{company.location}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                                        className='p-1.5 hover:bg-violet-50 dark:hover:bg-violet-900/30 rounded-lg text-gray-400 hover:text-violet-600 transition-colors'
                                    >
                                        <Pen className='w-4 h-4' />
                                    </button>
                                </div>

                                {company.description && (
                                    <p className='text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2'>{company.description}</p>
                                )}

                                {company.website && (
                                    <a href={company.website} target='_blank' rel='noopener noreferrer'
                                        className='flex items-center gap-1.5 text-xs font-medium text-violet-600 dark:text-violet-400 hover:underline'>
                                        <Globe className='w-3.5 h-3.5' />{company.website}
                                    </a>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminCompanies
