import React, { useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { motion } from 'framer-motion'
import { RotateCcw, SlidersHorizontal } from 'lucide-react'

const filterData = [
    { filterType: 'Location', array: ['Delhi', 'Bangalore', 'Hyderabad', 'Mumbai', 'Pune', 'Chennai', 'Remote'] },
    { filterType: 'Job Type', array: ['Full Time', 'Part Time', 'Contract', 'Internship', 'Freelance'] },
    { filterType: 'Salary (LPA)', array: ['0-5', '5-10', '10-15', '15-20', '20+'] },
]

const FilterCard = ({ allJobs = [], setFilterJobs }) => {
    const [selected, setSelected] = useState({})

    const handleChange = (filterType, value) => {
        const newSelected = { ...selected, [filterType]: value }
        setSelected(newSelected)
        applyFilters(newSelected)
    }

    const applyFilters = (filters) => {
        let result = allJobs
        if (filters['Location']) {
            result = result.filter((j) =>
                j.location?.toLowerCase().includes(filters['Location'].toLowerCase())
            )
        }
        if (filters['Job Type']) {
            result = result.filter((j) =>
                j.jobType?.toLowerCase().includes(filters['Job Type'].toLowerCase())
            )
        }
        if (filters['Salary (LPA)']) {
            const range = filters['Salary (LPA)']
            result = result.filter((j) => {
                if (range === '20+') return j.salary >= 20
                const [min, max] = range.split('-').map(Number)
                return j.salary >= min && j.salary <= max
            })
        }
        setFilterJobs(result)
    }

    const resetFilters = () => {
        setSelected({})
        setFilterJobs(allJobs)
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-white/60 dark:border-gray-700/50 rounded-2xl shadow-lg p-5 sticky top-24'
        >
            <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center gap-2'>
                    <SlidersHorizontal className='w-4 h-4 text-violet-600' />
                    <h2 className='font-bold text-gray-900 dark:text-white'>Filters</h2>
                </div>
                {Object.keys(selected).length > 0 && (
                    <button
                        onClick={resetFilters}
                        className='flex items-center gap-1 text-xs text-violet-600 dark:text-violet-400 hover:text-violet-800 transition-colors font-medium'
                    >
                        <RotateCcw className='w-3 h-3' /> Reset
                    </button>
                )}
            </div>

            <hr className='border-gray-100 dark:border-gray-800 mb-4' />

            <div className='space-y-6'>
                {filterData.map((data, i) => (
                    <div key={i}>
                        <h3 className='text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3'>{data.filterType}</h3>
                        <RadioGroup
                            value={selected[data.filterType] || ''}
                            onValueChange={(val) => handleChange(data.filterType, val)}
                            className='space-y-2'
                        >
                            {data.array.map((item, j) => {
                                const id = `${data.filterType}-${j}`
                                return (
                                    <div key={j} className='flex items-center gap-2.5 cursor-pointer'>
                                        <RadioGroupItem
                                            id={id}
                                            value={item}
                                            className='border-gray-300 dark:border-gray-600 text-violet-600'
                                        />
                                        <Label
                                            htmlFor={id}
                                            className={`text-sm cursor-pointer transition-colors ${selected[data.filterType] === item
                                                ? 'text-violet-600 dark:text-violet-400 font-medium'
                                                : 'text-gray-600 dark:text-gray-400'
                                                }`}
                                        >
                                            {item}
                                        </Label>
                                    </div>
                                )
                            })}
                        </RadioGroup>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

export default FilterCard
