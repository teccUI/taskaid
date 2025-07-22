# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start Vite development server with hot reload
- `npm run build` - Build for production (runs TypeScript check then Vite build)
- `npm run lint` - Run ESLint on all files
- `npm run preview` - Preview production build locally

### Environment Setup
Create a `.env` file in the root with Firebase configuration:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## Architecture

### Tech Stack
- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Routing**: React Router DOM v7
- **Forms**: React Hook Form + Zod validation
- **Drag & Drop**: @dnd-kit for task management
- **Icons**: Lucide React

### Project Structure
- `src/components/` - Reusable UI components
  - `ui/` - shadcn/ui base components (button, card, dialog, input)
  - `layout/` - Layout components (Header)
  - `buckets/` - Bucket-related components for task organization
  - `task/` - Task management components
- `src/contexts/` - React contexts (AuthContext for Firebase auth)
- `src/firebase/` - Firebase configuration and services
- `src/pages/` - Page components (LandingPage, DashboardPage)
- `src/routes/` - Routing setup (AppRouter, PrivateRoute)
- `src/lib/` - Utility functions
- `src/hooks/` - Custom React hooks

### Key Architecture Patterns

#### Authentication Flow
- Firebase Auth integration via `AuthContext`
- `PrivateRoute` component protects authenticated pages
- Auth state managed globally with React Context
- Environment variables for Firebase config

#### Component Organization
- shadcn/ui components for consistent design system
- Path aliases configured (`@/` maps to `src/`)
- Two-pane dashboard layout (TaskList + BucketGrid)
- Responsive design with Tailwind CSS

#### State Management
- React Context for global auth state
- Component-level state for UI interactions
- Firebase Firestore for persistent data

### Important Files
- `src/firebase/config.ts` - Firebase initialization and service exports
- `src/contexts/AuthContext.tsx` - Authentication context and hooks
- `src/routes/PrivateRoute.tsx` - Route protection logic
- `src/pages/DashboardPage.tsx` - Main application interface
- `components.json` - shadcn/ui configuration
- `vite.config.ts` - Vite configuration with path aliases

### Development Notes
- Uses TypeScript strict mode
- ESLint configuration for React + TypeScript
- Hot reload enabled in development
- Import paths use `@/` alias for cleaner imports
- Firebase services initialized once and exported from config