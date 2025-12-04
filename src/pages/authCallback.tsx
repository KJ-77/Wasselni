import { useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';

/**
 * Auth Callback Handler
 *
 * This page handles the OAuth callback from Cognito.
 * After signing in, Cognito redirects here with an authorization code.
 * The react-oidc-context library automatically:
 * 1. Extracts the code from the URL
 * 2. Exchanges it for tokens
 * 3. Stores the tokens
 * 4. Updates the auth state
 *
 * We just need to wait for that to complete and redirect the user.
 */
const AuthCallback = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Wait for auth processing to complete
    if (auth.isLoading) {
      return;
    }

    // Handle errors (e.g., user denied consent, invalid code)
    if (auth.error) {
      console.error('Auth error:', auth.error);
      navigate('/auth?error=' + encodeURIComponent(auth.error.message));
      return;
    }

    // Success! User is authenticated
    if (auth.isAuthenticated) {
      // You could redirect to the page they were trying to access
      // For now, go to home
      navigate('/');
      return;
    }

    // If not loading, not error, and not authenticated, something went wrong
    // This shouldn't normally happen
    navigate('/auth');
  }, [auth.isLoading, auth.isAuthenticated, auth.error, navigate]);

  // Show loading state while processing
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Completing sign in...</p>
      </div>
    </div>
  );
};

export default AuthCallback;