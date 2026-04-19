# JobPortal — Frontend

React 19 + Vite 7 + Tailwind CSS 4 frontend for the JobPortal MERN application.

## Tech Stack
- **React 19** with Vite 7
- **Tailwind CSS 4** for styling
- **Redux Toolkit** for state management
- **React Router DOM v7** for routing
- **Framer Motion** for animations
- **Axios** for API calls
- **Radix UI / shadcn** for accessible components
- **Lucide React** for icons
- **Sonner** for toast notifications

## Getting Started

```bash
npm install
npm run dev       # Dev server at http://localhost:5173
npm run build     # Production build
npm run preview   # Preview production build
```

## Environment
The frontend connects to the backend at `http://localhost:8000`.  
See `src/utils/constant.js` to update API base URLs.

## Project Structure

```
src/
├── components/        # All UI components
│   ├── auth/          # Login, Signup
│   ├── shared/        # Navbar, Footer
│   ├── admin/         # Recruiter dashboard pages
│   └── ui/            # Reusable shadcn primitives
├── hooks/             # Custom data-fetching hooks
├── redux/             # Store + slices (auth, job, company, application)
└── utils/             # API endpoint constants
```

See the [root README](../README.md) for the full project documentation.
