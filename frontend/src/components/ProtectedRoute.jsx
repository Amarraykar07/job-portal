import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

// ProtectedRoute: Only allows authenticated users
export const ProtectedRoute = ({ children }) => {
    const { user } = useSelector((store) => store.auth)
    if (!user) return <Navigate to='/login' replace />
    return children
}

// RecruiterRoute: Only allows recruiter role
export const RecruiterRoute = ({ children }) => {
    const { user } = useSelector((store) => store.auth)
    if (!user) return <Navigate to='/login' replace />
    if (user.role !== 'recruiter') return <Navigate to='/' replace />
    return children
}

// StudentRoute: Only allows student role
export const StudentRoute = ({ children }) => {
    const { user } = useSelector((store) => store.auth)
    if (!user) return <Navigate to='/login' replace />
    if (user.role !== 'student') return <Navigate to='/' replace />
    return children
}

export default ProtectedRoute
