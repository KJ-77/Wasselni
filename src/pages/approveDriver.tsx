import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { CheckCircle2, AlertCircle, Loader2, Car, User, FileText } from 'lucide-react';

const ApproveDriver = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Extract parameters from URL
  const userId = searchParams.get('userId');
  const licenseNumber = searchParams.get('licenseNumber');
  const fatherName = searchParams.get('fatherName');
  const motherName = searchParams.get('motherName');
  const nationality = searchParams.get('nationality');
  const userName = searchParams.get('userName');
  const userEmail = searchParams.get('userEmail');

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  // Validate required parameters
  useEffect(() => {
    if (!userId || !licenseNumber || !fatherName || !motherName || !nationality) {
      setError('Missing required application data. Invalid approval link.');
    }
  }, [userId, licenseNumber, fatherName, motherName, nationality]);

  /**
   * Handle driver approval - creates driver in database
   */
  const handleApprove = async () => {
    setShowApproveDialog(false);
    setError('');
    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      // Prepare payload for POST /drivers
      const payload = {
        user_id: userId,
        license_number: parseInt(licenseNumber || '0', 10),
        fathers_name: fatherName,
        mothers_name: motherName,
        nationality: nationality,
      };

      console.log('Creating driver with payload:', payload);

      // Step 1: Create driver in database
      const createDriverResponse = await fetch(`${apiUrl}/drivers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!createDriverResponse.ok) {
        const errorText = await createDriverResponse.text();
        throw new Error(`Failed to create driver: ${createDriverResponse.status} ${errorText}`);
      }

      console.log('Driver created successfully in database');

      // Step 2: Add user to Cognito Driver group
      const cognitoPayload = {
        sub: userId,
      };

      console.log('Adding user to Cognito Driver group:', cognitoPayload);

      const cognitoResponse = await fetch(`${apiUrl}/cognito/add-to-driver-group`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cognitoPayload),
      });

      if (!cognitoResponse.ok) {
        const errorText = await cognitoResponse.text();
        console.error('Failed to add user to Cognito group:', errorText);
        // Don't throw error - driver was created, just log the Cognito failure
        setError('Driver created but failed to add to Cognito group. Please add manually.');
      } else {
        console.log('User added to Cognito Driver group successfully');
      }

      setSuccess(true);

      // Redirect after 3 seconds
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (err: any) {
      console.error('Error approving driver:', err);
      setError(err.message || 'Failed to approve driver application. Please try again.');
      setIsLoading(false);
    }
  };

  /**
   * Handle rejection - close dialog and navigate home
   */
  const handleReject = () => {
    setShowRejectDialog(false);
    // You can add API call here later to log rejection
    setTimeout(() => {
      navigate('/');
    }, 500);
  };

  // Show success message
  if (success) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-900 dark:text-green-100">Driver Approved!</AlertTitle>
          <AlertDescription className="text-green-800 dark:text-green-200">
            {userName || 'The applicant'} has been successfully approved as a driver and added to the database.
            Redirecting to home...
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Show error if invalid link
  if (error && !isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="mt-6 text-center">
          <Button onClick={() => navigate('/')}>Go to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Car className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Driver Application Review</h1>
        </div>
        <p className="text-muted-foreground">
          Review the application details and approve or reject the driver application.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Applicant Information
          </CardTitle>
          <CardDescription>
            Review the details submitted by the applicant
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-sm font-semibold text-muted-foreground">Full Name</Label>
              <p className="text-base">{userName || 'N/A'}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-semibold text-muted-foreground">Email</Label>
              <p className="text-base">{userEmail || 'N/A'}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-semibold text-muted-foreground">User ID (Cognito Sub)</Label>
              <p className="text-base font-mono text-sm">{userId}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-semibold text-muted-foreground">Nationality</Label>
              <p className="text-base">{nationality}</p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Driver License Details</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-sm font-semibold text-muted-foreground">License Number</Label>
                <p className="text-base font-mono">{licenseNumber}</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h3 className="text-lg font-semibold mb-3">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-sm font-semibold text-muted-foreground">Father's Name</Label>
                <p className="text-base">{fatherName}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-semibold text-muted-foreground">Mother's Name</Label>
                <p className="text-base">{motherName}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert className="mb-6 border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
        <AlertCircle className="h-4 w-4 text-yellow-600" />
        <AlertTitle className="text-yellow-900 dark:text-yellow-100">Action Required</AlertTitle>
        <AlertDescription className="text-yellow-800 dark:text-yellow-200">
          By clicking "Approve Application", you will create this driver in the database and grant them driver privileges.
          This action will allow them to offer rides on the platform.
        </AlertDescription>
      </Alert>

      <div className="flex gap-3">
        <Button
          onClick={() => setShowRejectDialog(true)}
          variant="outline"
          disabled={isLoading}
          className="flex-1"
        >
          Reject Application
        </Button>
        <Button
          onClick={() => setShowApproveDialog(true)}
          disabled={isLoading}
          className="flex-1 gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Approving...
            </>
          ) : (
            <>
              <CheckCircle2 className="h-4 w-4" />
              Approve Application
            </>
          )}
        </Button>
      </div>

      <p className="text-center text-sm text-muted-foreground mt-6">
        Note: Images were sent in the application email. Please review them before approving.
      </p>

      {/* Approve Confirmation Dialog */}
      <AlertDialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to approve this driver?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will create a driver account for <strong>{userName}</strong> and grant them
              access to offer rides on the platform. This action cannot be undone.
              <div className="mt-4 p-3 bg-muted rounded-md">
                <p className="text-sm font-semibold mb-1">Driver Details:</p>
                <ul className="text-sm space-y-1">
                  <li>• License Number: {licenseNumber}</li>
                  <li>• Email: {userEmail}</li>
                  <li>• Nationality: {nationality}</li>
                </ul>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleApprove} disabled={isLoading}>
              {isLoading ? 'Approving...' : 'Yes, Approve Driver'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Confirmation Dialog */}
      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Driver Application?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reject the driver application for <strong>{userName}</strong>?
              <div className="mt-4 p-3 bg-muted rounded-md">
                <p className="text-sm">
                  You may want to email <strong>{userEmail}</strong> with feedback about why
                  their application was rejected.
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleReject}
              className="bg-destructive hover:bg-destructive/90"
            >
              Yes, Reject Application
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

// Add Label component if not already imported
const Label = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <label className={className}>{children}</label>
);

export default ApproveDriver;
