import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RoleProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
  fallbackPath?: string;
}

/**
 * RoleProtectedRoute component that requires specific roles
 * Redirects to /auth if user is not authenticated
 * Shows error message if authenticated but lacks required role
 */
const RoleProtectedRoute = ({
  children,
  allowedRoles,
  fallbackPath = '/'
}: RoleProtectedRouteProps) => {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Show loading state while checking authentication
  if (auth.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!auth.isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Get user's groups/roles from Cognito
  const userGroups = auth.userGroups || [];

  // Check if user has any of the allowed roles
  const hasRequiredRole = allowedRoles.some(role => userGroups.includes(role));

  // Not authorized - show error message
  if (!hasRequiredRole) {
    // Check if the required role is "Driver" - show special message
    const requiresDriver = allowedRoles.includes('Driver');

    if (requiresDriver) {
      return (
        <div className="container mx-auto px-4 py-16 max-w-2xl">
          <Alert className="mb-6 border-blue-500 bg-blue-50 dark:bg-blue-950">
            <Car className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-900 dark:text-blue-100">Driver Access Required</AlertTitle>
            <AlertDescription className="text-blue-800 dark:text-blue-200">
              This page is only accessible to registered drivers. Become a driver to access this feature!
            </AlertDescription>
          </Alert>

          <div className="bg-card p-8 rounded-lg border">
            <div className="flex items-center gap-3 mb-4">
              <Car className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold">Become a Driver</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Join our community of drivers and start offering rides! Apply now to become a verified driver and unlock access to driver features.
            </p>
            <div className="flex gap-3">
              <Button onClick={() => window.history.back()} variant="outline">
                Go Back
              </Button>
              <Button onClick={() => navigate('/apply-driver')} className="gap-2">
                <Car className="h-4 w-4" />
                Apply to Become a Driver
              </Button>
            </div>
          </div>
        </div>
      );
    }

    // For other roles, show generic access denied
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            You don't have permission to access this page. This page is only available to users with the following role(s): {allowedRoles.join(', ')}.
          </AlertDescription>
        </Alert>

        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Need Access?</h2>
          <p className="text-muted-foreground mb-6">
            If you believe you should have access to this page, please contact support or check your account settings.
          </p>
          <div className="flex gap-3">
            <Button onClick={() => window.history.back()} variant="outline">
              Go Back
            </Button>
            <Button onClick={() => window.location.href = fallbackPath}>
              Go to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // User is authenticated and has required role
  return <>{children}</>;
};

export default RoleProtectedRoute;
