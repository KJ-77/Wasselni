import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserSession } from 'amazon-cognito-identity-js';
import { cognitoPoolConfig } from '@/config/auth';

// Initialize the Cognito User Pool
const userPool = new CognitoUserPool(cognitoPoolConfig);

// Define the shape of our auth context
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: CognitoUser | null;
  userAttributes: Record<string, string> | null;
  userGroups: string[];
  driverId: number | null;
  hasRole: (role: string) => boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  error: string | null;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<CognitoUser | null>(null);
  const [userAttributes, setUserAttributes] = useState<Record<string, string> | null>(null);
  const [userGroups, setUserGroups] = useState<string[]>([]);
  const [driverId, setDriverId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Helper function to extract groups from session
  const extractGroups = (session: CognitoUserSession): string[] => {
    const idToken = session.getIdToken();
    const payload = idToken.payload;
    return payload['cognito:groups'] || [];
  };

  // Fetch driver DB ID from backend using Cognito sub
  const fetchDriverId = async (cognitoSub: string) => {
    try {
      const apiUrl = 'https://rl4ynabhzk.execute-api.me-central-1.amazonaws.com';
      const response = await fetch(`${apiUrl}/drivers?user_id=${cognitoSub}`);
      if (response.ok) {
        const drivers = await response.json();
        if (drivers && drivers.length > 0) {
          setDriverId(drivers[0].id);
          console.log('[AuthContext] Driver ID fetched:', drivers[0].id);
        }
      }
    } catch (err) {
      console.error('[AuthContext] Error fetching driver ID:', err);
    }
  };

  // Check if user is already authenticated on mount
  useEffect(() => {
    const currentUser = userPool.getCurrentUser();
    if (currentUser) {
      currentUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
        if (err) {
          console.error('Session error:', err);
          setIsLoading(false);
          return;
        }

        if (session && session.isValid()) {
          setUser(currentUser);
          setIsAuthenticated(true);
          setUserGroups(extractGroups(session));

          // Get user attributes
          currentUser.getUserAttributes((err, attributes) => {
            if (err) {
              console.error('Error getting attributes:', err);
            } else if (attributes) {
              const attrs: Record<string, string> = {};
              attributes.forEach(attr => {
                attrs[attr.Name] = attr.Value;
              });
              setUserAttributes(attrs);

              // Fetch driver ID if user is in Driver group
              const groups = extractGroups(session);
              if (groups.includes('Driver') && attrs['sub']) {
                fetchDriverId(attrs['sub']);
              }
            }
            setIsLoading(false);
          });
        } else {
          setIsLoading(false);
        }
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  // Sign in method
  const signIn = (email: string, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setError(null);
      setIsLoading(true);

      const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
      });

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (session: CognitoUserSession) => {
          console.log('Authentication successful:', session);
          setUser(cognitoUser);
          setIsAuthenticated(true);
          setUserGroups(extractGroups(session));

          // Get user attributes
          cognitoUser.getUserAttributes((err, attributes) => {
            if (err) {
              console.error('Error getting attributes:', err);
              setError(err.message);
            } else if (attributes) {
              const attrs: Record<string, string> = {};
              attributes.forEach(attr => {
                attrs[attr.Name] = attr.Value;
              });
              setUserAttributes(attrs);

              // Fetch driver ID if user is in Driver group
              const groups = extractGroups(session);
              if (groups.includes('Driver') && attrs['sub']) {
                fetchDriverId(attrs['sub']);
              }
            }
            setIsLoading(false);
            resolve();
          });
        },
        onFailure: (err) => {
          console.error('Authentication failed:', err);
          setError(err.message || 'Authentication failed');
          setIsLoading(false);
          reject(err);
        },
        newPasswordRequired: (userAttributes, requiredAttributes) => {
          // Handle new password required scenario
          console.log('New password required:', userAttributes, requiredAttributes);
          setError('New password required. Please contact support.');
          setIsLoading(false);
          reject(new Error('New password required'));
        },
      });
    });
  };

  // Sign out method
  const signOut = () => {
    const currentUser = userPool.getCurrentUser();
    if (currentUser) {
      currentUser.signOut();
    }
    setUser(null);
    setUserAttributes(null);
    setUserGroups([]);
    setDriverId(null);
    setIsAuthenticated(false);
    setError(null);
  };

  // Helper function to check if user has a specific role
  const hasRole = (role: string): boolean => {
    return userGroups.includes(role);
  };

  const value = {
    isAuthenticated,
    isLoading,
    user,
    userAttributes,
    userGroups,
    driverId,
    hasRole,
    signIn,
    signOut,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
