# 💼 JobPortal — Full Stack MERN Job Portal

A premium, production-ready **Job Portal** web application built with the MERN stack. Inspired by LinkedIn, Indeed, and Internshala — featuring a modern Glassmorphism UI, role-based access control, real-time job search, and a complete recruiter dashboard.

---

## 🌟 Live Preview

> **Frontend:** http://localhost:5173  
> **Backend API:** http://localhost:8000/api/v1

---

## ✨ Features

### 👤 For Job Seekers (Students)
- 🔍 **Live Job Search** — Search by title, company, or keyword
- 🗂️ **Filter Jobs** — By Location, Job Type, and Salary range
- 📄 **Job Details Page** — Full description, requirements, apply button
- ✅ **One-Click Apply** — Apply with duplicate prevention
- 📊 **Applied Jobs Tracker** — View status: Pending / Accepted / Rejected
- 🧑 **Profile Management** — Edit bio, skills, phone; upload profile photo & resume
- 🔖 **Category Carousel** — Browse by Frontend, Backend, AI/ML, DevOps, etc.

### 🏢 For Recruiters
- 📝 **Post Jobs** — Full job posting form with all fields
- 🏗️ **Company Management** — Register, edit name/description/logo/website
- 👥 **Applicant Management** — View all applicants, accept or reject inline
- 📋 **Jobs Dashboard** — Table with applicant count per job

### 🎨 UI / UX
- **Glassmorphism design** — Frosted glass cards, blur backgrounds
- **Dark / Light mode** — Toggle persisted to localStorage
- **Smooth animations** — Powered by Framer Motion
- **Sticky Navbar** — With scroll blur effect and mobile hamburger menu
- **Toast notifications** — Real-time feedback via Sonner
- **Loading skeletons** — No jarring blank states
- **Fully responsive** — Mobile, tablet, and desktop

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite 7, Tailwind CSS 4 |
| **State Management** | Redux Toolkit |
| **Routing** | React Router DOM v7 |
| **Animations** | Framer Motion |
| **HTTP Client** | Axios |
| **UI Components** | Radix UI (via shadcn) |
| **Icons** | Lucide React |
| **Notifications** | Sonner |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas + Mongoose |
| **Auth** | JWT (HTTP-only cookies) |
| **File Uploads** | Multer (memory storage) |
| **Password Hashing** | bcryptjs |

---

## 📁 Project Structure

```
job portal/
├── backend/                    # Express.js API Server
│   ├── controllers/
│   │   ├── user.controller.js      # Register, Login, Logout, Update Profile
│   │   ├── job.controller.js       # Post, Get, Get by ID, Admin Jobs
│   │   ├── company.controller.js   # Register, Get, Update Company
│   │   └── application.controller.js # Apply, Get Applied, Applicants, Status
│   ├── models/
│   │   ├── user.model.js
│   │   ├── job.model.js
│   │   ├── company.model.js
│   │   └── application.model.js
│   ├── routes/
│   │   ├── user.route.js
│   │   ├── job.route.js
│   │   ├── company.route.js
│   │   └── application.route.js
│   ├── middlewares/
│   │   ├── isAuthenticated.js      # JWT verification middleware
│   │   └── multer.js               # File upload (memory storage)
│   ├── utils/
│   │   └── db.js                   # MongoDB connection
│   ├── .env
│   └── index.js                    # Entry point + CORS config
│
└── frontend/                   # React + Vite SPA
    └── src/
        ├── components/
        │   ├── auth/
        │   │   ├── Login.jsx           # Split-panel login with role switcher
        │   │   └── Signup.jsx          # Signup with photo preview
        │   ├── shared/
        │   │   ├── Navbar.jsx          # Sticky glassmorphism navbar
        │   │   └── Footer.jsx          # Multi-column footer
        │   ├── admin/
        │   │   ├── AdminJobs.jsx       # Recruiter jobs table
        │   │   ├── AdminCompanies.jsx  # Company cards grid
        │   │   ├── PostJob.jsx         # Job posting form
        │   │   ├── CompanyCreate.jsx   # Register company
        │   │   ├── CompanySetup.jsx    # Edit company profile
        │   │   └── Applicants.jsx      # Applicant management
        │   ├── ui/                     # Reusable shadcn components
        │   ├── Home.jsx
        │   ├── HeroSection.jsx
        │   ├── CategoryCarousel.jsx
        │   ├── LatestJobs.jsx
        │   ├── LatestJobCards.jsx
        │   ├── Jobs.jsx                # Jobs listing with filters
        │   ├── Job.jsx                 # Job card component
        │   ├── Browse.jsx              # Search results page
        │   ├── JobDescription.jsx      # Job details + apply
        │   ├── Profile.jsx             # User profile + applied jobs
        │   ├── AppliedJobTable.jsx     # Applied jobs list
        │   ├── FilterCard.jsx          # Sidebar filters
        │   ├── ProtectedRoute.jsx      # Route guards
        │   └── NotFound.jsx            # 404 page
        ├── hooks/
        │   ├── useGetAllJobs.jsx
        │   ├── useGetAllAdminJobs.jsx
        │   ├── useGetJobById.jsx
        │   └── useGetAllCompanies.jsx
        ├── redux/
        │   ├── store.js
        │   ├── authSlice.js
        │   ├── jobSlice.js
        │   ├── companySlice.js
        │   └── applicationSlice.js
        └── utils/
            └── constant.js             # All API endpoints
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- npm

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd "job portal"
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/
PORT=8000
SECRET_KEY=your_super_secret_jwt_key
```

Start the backend:
```bash
npm run dev
# Server running at http://localhost:8000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
# App running at http://localhost:5173
```

---

## 🔐 API Endpoints

### User (`/api/v1/user`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/register` | ❌ | Register new user |
| POST | `/login` | ❌ | Login & receive JWT cookie |
| GET | `/logout` | ❌ | Clear JWT cookie |
| POST | `/profile/update` | ✅ | Update profile info & resume |

### Jobs (`/api/v1/job`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/post` | ✅ Recruiter | Create a new job |
| GET | `/get?keyword=` | ✅ | Get all jobs (with search) |
| GET | `/get/:id` | ✅ | Get single job by ID |
| GET | `/getadminjobs` | ✅ Recruiter | Get recruiter's jobs |

### Companies (`/api/v1/company`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/register` | ✅ | Register new company |
| GET | `/get` | ✅ | Get recruiter's companies |
| GET | `/get/:id` | ✅ | Get company by ID |
| PUT | `/update/:id` | ✅ | Update company |

### Applications (`/api/v1/application`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/apply/:id` | ✅ Student | Apply to a job |
| GET | `/get` | ✅ Student | Get logged-in user's applications |
| GET | `/:id/applicants` | ✅ Recruiter | Get applicants for a job |
| POST | `/status/:id/update` | ✅ Recruiter | Accept / Reject applicant |

---

## 🗺️ Route Map

| Route | Access | Page |
|-------|--------|------|
| `/` | Public | Home |
| `/login` | Public | Login |
| `/signup` | Public | Sign Up |
| `/jobs` | Student | Job Listings |
| `/browse` | Student | Browse / Search |
| `/description/:id` | Student | Job Details + Apply |
| `/profile` | Student | Profile + Applied Jobs |
| `/admin/jobs` | Recruiter | Manage Posted Jobs |
| `/admin/jobs/create` | Recruiter | Post New Job |
| `/admin/jobs/:id/applicants` | Recruiter | Review Applicants |
| `/admin/companies` | Recruiter | Companies Dashboard |
| `/admin/companies/create` | Recruiter | Register Company |
| `/admin/companies/:id` | Recruiter | Edit Company |
| `*` | Public | 404 Not Found |

---

## 👥 User Roles

| Role | Can Do |
|------|--------|
| **Student** | Browse jobs, apply, track applications, manage profile |
| **Recruiter** | Post jobs, manage companies, review & act on applicants |

> Role is selected at signup and enforced both at the API level (JWT middleware) and frontend (ProtectedRoute).

---

## 🧑‍💻 Developer

**Amar Raykar**  
Full Stack Developer — MERN Stack  
📧 raykaramar7@gmail.com

---

## 📄 License

This project is for educational purposes. MIT License.
