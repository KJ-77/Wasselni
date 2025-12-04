import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cognitoPoolConfig } from '@/config/auth';
import { calculateAge, createUserInDatabase } from '@/lib/utils';

// Initialize the Cognito User Pool
const userPool = new CognitoUserPool(cognitoPoolConfig);

const Auth = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Form state
  const [activeTab, setActiveTab] = useState('signin');

  // Sign In fields
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Sign Up fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [formattedName, setFormattedName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  // UI state
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');

  // Store signup data for database creation after verification
  const [pendingUserData, setPendingUserData] = useState<{
    firstName: string;
    lastName: string;
    phone: string;
    birthdate: string;
    gender: string;
    address: string;
    password: string;
  } | null>(null);

  /**
   * Handle Sign In
   *
   * Uses amazon-cognito-identity-js to authenticate directly
   * No redirect to external Cognito hosted UI
   */
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      await auth.signIn(signInEmail, signInPassword);
      // Success! Redirect to page they tried to access, or home
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Sign in failed');
    }
  };

  /**
   * Handle Sign Up
   *
   * Creates a new user account with all required attributes
   */
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (!birthdate) {
      setError('Birthdate is required');
      return;
    }

    if (!gender) {
      setError('Gender is required');
      return;
    }

    if (!address) {
      setError('Address is required');
      return;
    }

    setIsLoading(true);

    // Build the attribute list with all required fields
    const attributeList = [
      new CognitoUserAttribute({ Name: 'email', Value: email }),
      new CognitoUserAttribute({ Name: 'given_name', Value: firstName }),
      new CognitoUserAttribute({ Name: 'family_name', Value: lastName }),
      new CognitoUserAttribute({ Name: 'name', Value: formattedName || `${firstName} ${lastName}` }),
      new CognitoUserAttribute({ Name: 'phone_number', Value: phone }),
      new CognitoUserAttribute({ Name: 'birthdate', Value: birthdate }),
      new CognitoUserAttribute({ Name: 'gender', Value: gender }),
      new CognitoUserAttribute({ Name: 'address', Value: address }),
    ];

    userPool.signUp(
      email,
      password,
      attributeList,
      [],
      (err, result) => {
        setIsLoading(false);

        if (err) {
          setError(err.message || 'Sign up failed');
          return;
        }

        console.log('Sign up success, user:', result?.user.getUsername());
        setPendingEmail(email);

        // Store user data (including password) for auto sign-in and database creation after verification
        setPendingUserData({
          firstName,
          lastName,
          phone,
          birthdate,
          gender,
          address,
          password,
        });

        setShowVerification(true);
        setMessage('Verification code sent! Check your email and spam folder.');

        // Clear password fields from form (data is stored in pendingUserData)
        setPassword('');
        setConfirmPassword('');
      }
    );
  };

  /**
   * Handle Email Verification
   * After verification, automatically sign in the user and create their database record
   */
  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    const cognitoUser = new CognitoUser({
      Username: pendingEmail,
      Pool: userPool,
    });

    cognitoUser.confirmRegistration(verificationCode, true, async (err, result) => {
      if (err) {
        setIsLoading(false);
        setError(err.message || 'Verification failed');
        return;
      }

      console.log('Verification success:', result);

      // After successful verification, sign in the user automatically
      if (pendingUserData) {
        try {
          // Sign in the user to get an authenticated session
          await auth.signIn(pendingEmail, pendingUserData.password);

          // Wait a brief moment for auth context to update
          await new Promise(resolve => setTimeout(resolve, 500));

          // Get the authenticated user to access their attributes
          const currentUser = userPool.getCurrentUser();
          if (!currentUser) {
            setError('Verification succeeded, but auto sign-in failed. Please sign in manually.');
            setIsLoading(false);
            setShowVerification(false);
            setActiveTab('signin');
            setSignInEmail(pendingEmail);
            return;
          }

          currentUser.getSession((sessionErr: Error | null, session: any) => {
            if (sessionErr || !session) {
              console.error('Error getting session:', sessionErr);
              setError('Verification succeeded, but failed to get session. Please sign in manually.');
              setIsLoading(false);
              setShowVerification(false);
              setActiveTab('signin');
              setSignInEmail(pendingEmail);
              return;
            }

            // Get user attributes from the authenticated session
            currentUser.getUserAttributes(async (attrErr, attributes) => {
              if (attrErr) {
                console.error('Error getting user attributes:', attrErr);
                setError('Verification succeeded, but failed to get user data. Please contact support.');
                setIsLoading(false);
                return;
              }

              // Extract the sub (user ID) from attributes
              const subAttribute = attributes?.find(attr => attr.Name === 'sub');
              if (!subAttribute) {
                console.error('No sub attribute found');
                setError('Verification succeeded, but user ID not found. Please contact support.');
                setIsLoading(false);
                return;
              }

              const userId = subAttribute.Value;

              // Calculate age from birthdate
              const age = calculateAge(pendingUserData.birthdate);

              // Create user in database
              try {
                await createUserInDatabase({
                  id: userId,
                  full_name: `${pendingUserData.firstName} ${pendingUserData.lastName}`,
                  gender: pendingUserData.gender,
                  age,
                  email: pendingEmail,
                  phone_number: pendingUserData.phone,
                  address: pendingUserData.address,
                });

                console.log('User created in database successfully');
                setMessage('Account created successfully! Redirecting...');

                // Clear all pending data including password
                setPendingEmail('');
                setPendingUserData(null);
                setVerificationCode('');
                setShowVerification(false);

                // Redirect to home page after a brief moment
                setTimeout(() => {
                  setIsLoading(false);
                  const from = location.state?.from?.pathname || '/';
                  navigate(from, { replace: true });
                }, 1000);
              } catch (dbErr: any) {
                console.error('Error creating user in database:', dbErr);
                setError('Account verified, but failed to complete setup. Please contact support.');
                setIsLoading(false);
              }
            });
          });
        } catch (signInErr: any) {
          console.error('Error during auto sign-in:', signInErr);
          setError('Verification succeeded, but auto sign-in failed. Please sign in manually.');
          setIsLoading(false);
          setShowVerification(false);
          setActiveTab('signin');
          setSignInEmail(pendingEmail);
          setPendingUserData(null);
        }
      } else {
        // No pending user data (shouldn't happen, but handle gracefully)
        setIsLoading(false);
        setMessage('Email verified! You can now sign in.');
        setShowVerification(false);
        setActiveTab('signin');
        setSignInEmail(pendingEmail);
        setPendingEmail('');
        setVerificationCode('');
      }
    });
  };

  /**
   * Resend Verification Code
   */
  const handleResendCode = () => {
    setError('');
    setMessage('');

    const cognitoUser = new CognitoUser({
      Username: pendingEmail,
      Pool: userPool,
    });

    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        setError(err.message || 'Failed to resend code');
        return;
      }

      // Show delivery method and destination
      const deliveryMedium = result.CodeDeliveryDetails.DeliveryMedium; // EMAIL or SMS
      const destination = result.CodeDeliveryDetails.Destination;

      if (deliveryMedium === 'EMAIL') {
        setMessage(`Verification code sent to ${destination}. Check your spam folder if you don't see it.`);
      } else if (deliveryMedium === 'SMS') {
        setMessage(`Verification code sent via SMS to ${destination}. Note: SMS delivery requires AWS SNS configuration.`);
      } else {
        setMessage(`Verification code sent to ${destination}`);
      }
    });
  };

  // If user is already authenticated, redirect to home
  if (auth.isAuthenticated) {
    navigate('/');
    return null;
  }

  // Show verification form after successful sign-up
  if (showVerification) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Verify Your Email</CardTitle>
            <CardDescription>
              We sent a verification code to {pendingEmail}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerifyEmail} className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                  {error}
                </div>
              )}
              {message && (
                <div className="p-3 text-sm text-green-600 bg-green-50 rounded-md">
                  {message}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Verify Email'}
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={handleResendCode}
              >
                Resend Code
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main auth form with tabs
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to Wasselni</CardTitle>
          <CardDescription>
            Sign in to your account or create a new one
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Sign In Tab */}
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                {error && (
                  <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                    {error}
                  </div>
                )}
                {message && (
                  <div className="p-3 text-sm text-green-600 bg-green-50 rounded-md">
                    {message}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="signInEmail">Email</Label>
                  <Input
                    id="signInEmail"
                    type="email"
                    placeholder="you@example.com"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signInPassword">Password</Label>
                  <Input
                    id="signInPassword"
                    type="password"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading || auth.isLoading}>
                  {isLoading || auth.isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>

            {/* Sign Up Tab */}
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                {error && (
                  <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="formattedName">Full Name (Formatted)</Label>
                  <Input
                    id="formattedName"
                    type="text"
                    placeholder="e.g., Mr. John Doe"
                    value={formattedName}
                    onChange={(e) => setFormattedName(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Optional: Leave blank to auto-generate from first/last name
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1234567890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Format: +[country code][number] (e.g., +1234567890)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthdate">Birthdate</Label>
                  <Input
                    id="birthdate"
                    type="date"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={gender} onValueChange={setGender} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="123 Main St, City, Country"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Creating Account...' : 'Sign Up'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
