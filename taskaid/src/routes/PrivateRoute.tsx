// src/routes/PrivateRoute.tsx

import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext'; // <-- THE CORRECTED IMPORT

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, loading } = useAuth();

  // 1. If we are still checking the auth status, show a loading indicator
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // 2. If loading is finished and there's no user, redirect to the landing page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // 3. If loading is finished and there IS a user, render the children (the Dashboard)
  return <>{children}</>;
}