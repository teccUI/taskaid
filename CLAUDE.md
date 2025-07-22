# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TaskAid is a web-first, Firebase-powered task manager for solo professionals. It's designed to be lightweight and focused on individual productivity without team collaboration features.

**Target User:** 25+ year-old knowledge workers who want a private alternative to complex project management tools.

**Core Experience:** Clean two-pane dashboard with drag-and-drop tasks into user-defined buckets, featuring live analytics and mobile-responsive design.

## Development Status

This is currently a **planning phase repository** - the actual codebase has not been implemented yet. The repository contains:
- `README.md`: Product specification and target user description
- `phases.md`: Detailed 6-phase implementation plan

## Planned Tech Stack (from phases.md)

**Frontend:**
- React + TypeScript with Vite
- Tailwind CSS for styling
- React Router DOM for routing
- React Hook Form + Zod for form validation
- @dnd-kit/core for drag-and-drop functionality
- Lucide React for icons
- Date-fns for date utilities

**Backend:**
- Firebase Authentication (Email/Password)
- Firestore for data storage
- Firebase Cloud Functions for backend logic

**Project Structure (Planned):**
```
src/
├── assets/          # Static assets
├── components/      # Reusable UI components
│   ├── auth/       # Authentication components
│   ├── layout/     # Layout components
│   ├── tasks/      # Task-related components
│   ├── buckets/    # Bucket-related components
│   ├── analytics/  # Analytics components
│   └── ui/         # Generic UI components
├── pages/          # Top-level page components
├── hooks/          # Custom React hooks
├── lib/            # Utility functions and Firebase config
└── contexts/       # React context providers
```

## Development Commands (When Implemented)

Based on the planned Vite + React setup:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint (if configured)

## Key Architecture Decisions

**Authentication Flow:**
- Email/password authentication with 7-day session persistence
- AuthContext provides user state across the app
- ProtectedRoute component guards dashboard access

**Data Architecture:**
- Firestore collections: `tasks`, `buckets`, `users/{uid}/analytics/daily/{date}`
- Real-time updates using Firestore's `onSnapshot`
- Cascading delete: deleting a bucket removes associated tasks

**Core Features:**
1. **Task Management:** CRUD operations with confirmation modals for destructive actions
2. **Bucket Organization:** User-defined categories with drag-and-drop assignment
3. **Analytics:** Live task counts, daily completion stats, streak tracking
4. **Soft Delete:** Tasks marked for deletion with 10-second undo option

**Mobile Strategy:**
- Desktop: Two-pane layout (tasks left, buckets right)
- Mobile: Tabbed switcher between Tasks and Buckets views
- Collapsible analytics bar (hidden by default on mobile)

## Implementation Phases

The project follows a 6-phase implementation plan:
0. **Foundation** - Project setup, dependencies, Firebase configuration
1. **Authentication** - User signup/login, route protection
2. **App Shell** - Main dashboard layout and navigation
3. **Task CRUD** - Task creation, editing, deletion with confirmation
4. **Bucket CRUD** - Bucket management and task organization
5. **Drag & Drop** - Core interaction using @dnd-kit
6. **Polish** - Analytics, theme toggle, undo functionality

## Important Implementation Notes

- All destructive actions require confirmation modals
- Firebase security rules must restrict data access to authenticated users
- Cloud Functions handle cascading deletes and analytics calculations
- Theme switching uses Tailwind's `darkMode: 'class'` configuration
- Soft delete pattern with scheduled cleanup for permanent deletion

## Implementation Phases:
