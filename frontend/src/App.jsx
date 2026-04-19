import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import PostJob from './components/admin/PostJob'
import AdminJobs from './components/admin/AdminJobs'
import AdminCompanies from './components/admin/AdminCompanies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import Applicants from './components/admin/Applicants'
import NotFound from './components/NotFound'
import { ProtectedRoute, RecruiterRoute, StudentRoute } from './components/ProtectedRoute'

const appRouter = createBrowserRouter([
  // Public Routes
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '*', element: <NotFound /> },

  // Student Routes
  {
    path: '/jobs',
    element: <ProtectedRoute><Jobs /></ProtectedRoute>
  },
  {
    path: '/browse',
    element: <ProtectedRoute><Browse /></ProtectedRoute>
  },
  {
    path: '/profile',
    element: <ProtectedRoute><Profile /></ProtectedRoute>
  },
  {
    path: '/description/:id',
    element: <ProtectedRoute><JobDescription /></ProtectedRoute>
  },

  // Recruiter / Admin Routes
  {
    path: '/admin/jobs',
    element: <RecruiterRoute><AdminJobs /></RecruiterRoute>
  },
  {
    path: '/admin/jobs/create',
    element: <RecruiterRoute><PostJob /></RecruiterRoute>
  },
  {
    path: '/admin/jobs/:id/applicants',
    element: <RecruiterRoute><Applicants /></RecruiterRoute>
  },
  {
    path: '/admin/companies',
    element: <RecruiterRoute><AdminCompanies /></RecruiterRoute>
  },
  {
    path: '/admin/companies/create',
    element: <RecruiterRoute><CompanyCreate /></RecruiterRoute>
  },
  {
    path: '/admin/companies/:id',
    element: <RecruiterRoute><CompanySetup /></RecruiterRoute>
  },
])

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
