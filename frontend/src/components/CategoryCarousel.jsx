import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchJobQuery } from '@/redux/jobSlice'
import { motion } from 'framer-motion'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Code2, Database, Server, BarChart3, Smartphone, Cloud, Cpu, Shield } from 'lucide-react'

const categories = [
    { label: 'Frontend Dev', icon: Code2, color: 'from-blue-500 to-cyan-500', bg: 'from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/40' },
    { label: 'Backend Dev', icon: Server, color: 'from-green-500 to-emerald-500', bg: 'from-green-50 to-emerald-50 dark:from-green-950/40 dark:to-emerald-950/40' },
    { label: 'Full Stack', icon: Database, color: 'from-violet-500 to-purple-500', bg: 'from-violet-50 to-purple-50 dark:from-violet-950/40 dark:to-purple-950/40' },
    { label: 'Data Science', icon: BarChart3, color: 'from-orange-500 to-red-500', bg: 'from-orange-50 to-red-50 dark:from-orange-950/40 dark:to-red-950/40' },
    { label: 'Mobile Dev', icon: Smartphone, color: 'from-pink-500 to-rose-500', bg: 'from-pink-50 to-rose-50 dark:from-pink-950/40 dark:to-rose-950/40' },
    { label: 'DevOps', icon: Cloud, color: 'from-indigo-500 to-blue-500', bg: 'from-indigo-50 to-blue-50 dark:from-indigo-950/40 dark:to-blue-950/40' },
    { label: 'AI/ML', icon: Cpu, color: 'from-yellow-500 to-orange-500', bg: 'from-yellow-50 to-orange-50 dark:from-yellow-950/40 dark:to-orange-950/40' },
    { label: 'Cybersecurity', icon: Shield, color: 'from-teal-500 to-green-500', bg: 'from-teal-50 to-green-50 dark:from-teal-950/40 dark:to-green-950/40' },
]

const CategoryCarousel = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleCategoryClick = (label) => {
        dispatch(setSearchJobQuery(label))
        navigate('/browse')
    }

    return (
        <section className='py-20 bg-white dark:bg-gray-950'>
            <div className='max-w-7xl mx-auto px-4'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className='text-center mb-12'
                >
                    <span className='inline-block px-3 py-1 text-xs font-semibold text-violet-600 bg-violet-50 dark:bg-violet-900/30 dark:text-violet-400 rounded-full mb-3'>Explore Categories</span>
                    <h2 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white'>Browse by <span className='text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600'>Category</span></h2>
                    <p className='text-gray-500 dark:text-gray-400 mt-3 max-w-lg mx-auto'>Find the perfect role in your field of expertise</p>
                </motion.div>

                <Carousel className='w-full max-w-5xl mx-auto' opts={{ align: 'start', loop: true }}>
                    <CarouselContent className='-ml-4'>
                        {categories.map((cat, index) => {
                            const Icon = cat.icon
                            return (
                                <CarouselItem key={index} className='pl-4 md:basis-1/3 lg:basis-1/4'>
                                    <motion.button
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ y: -4, scale: 1.02 }}
                                        onClick={() => handleCategoryClick(cat.label)}
                                        className={`w-full p-5 rounded-2xl bg-gradient-to-br ${cat.bg} border border-white/60 dark:border-gray-700/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-3 group cursor-pointer`}
                                    >
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon className='w-6 h-6 text-white' />
                                        </div>
                                        <span className='font-semibold text-sm text-gray-800 dark:text-gray-200 text-center'>{cat.label}</span>
                                    </motion.button>
                                </CarouselItem>
                            )
                        })}
                    </CarouselContent>
                    <CarouselPrevious className='hidden md:flex -left-4 shadow-lg bg-white dark:bg-gray-800 hover:bg-violet-50 dark:hover:bg-violet-900/30' />
                    <CarouselNext className='hidden md:flex -right-4 shadow-lg bg-white dark:bg-gray-800 hover:bg-violet-50 dark:hover:bg-violet-900/30' />
                </Carousel>
            </div>
        </section>
    )
}

export default CategoryCarousel
