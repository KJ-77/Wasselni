import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import emailjs from '@emailjs/browser';
import imageCompression from 'browser-image-compression';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Car, Upload, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const ApplyDriver = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  // Form state
  const [drivingLicenseNumber, setDrivingLicenseNumber] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [nationality, setNationality] = useState('');
  const [drivingLicenseImage, setDrivingLicenseImage] = useState<File | null>(null);
  const [selfieImage, setSelfieImage] = useState<File | null>(null);

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Preview URLs
  const [licensePreview, setLicensePreview] = useState<string | null>(null);
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);

  /**
   * Handle file selection and preview
   */
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: (file: File | null) => void,
    setPreview: (url: string | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }

      setFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  /**
   * Compress image to reduce size for EmailJS free plan (50KB limit)
   */
  const compressImage = async (file: File): Promise<File> => {
    const options = {
      maxSizeMB: 0.02, // Target ~20KB per image (40KB total for 2 images)
      maxWidthOrHeight: 800, // Reduce dimensions
      useWebWorker: true,
      fileType: 'image/jpeg', // Convert to JPEG for better compression
    };

    try {
      const compressedFile = await imageCompression(file, options);
      console.log(`Compressed ${file.name}: ${(file.size / 1024).toFixed(2)}KB → ${(compressedFile.size / 1024).toFixed(2)}KB`);
      return compressedFile;
    } catch (error) {
      console.error('Error compressing image:', error);
      throw new Error('Failed to compress image');
    }
  };

  /**
   * Convert file to base64 for email attachment
   */
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate all fields
      if (!drivingLicenseNumber || !fatherName || !motherName || !nationality) {
        setError('Please fill in all required fields');
        setIsLoading(false);
        return;
      }

      if (!drivingLicenseImage || !selfieImage) {
        setError('Please upload both required images');
        setIsLoading(false);
        return;
      }

      // Get user email and name
      const userEmail = auth.userAttributes?.email || 'Unknown';
      const userName = auth.userAttributes?.name || 'Unknown User';

      // Compress images first to fit EmailJS free plan 50KB limit
      console.log('Compressing images...');
      const compressedLicense = await compressImage(drivingLicenseImage);
      const compressedSelfie = await compressImage(selfieImage);

      // Convert compressed images to base64
      const licenseBase64 = await fileToBase64(compressedLicense);
      const selfieBase64 = await fileToBase64(compressedSelfie);

      // Check total size (just for logging)
      const totalSize = (licenseBase64.length + selfieBase64.length) / 1024;
      console.log(`Total payload size: ${totalSize.toFixed(2)}KB`);

      // Prepare email template parameters
      const templateParams = {
        user_name: userName,
        user_email: userEmail,
        driving_license_number: drivingLicenseNumber,
        father_name: fatherName,
        mother_name: motherName,
        nationality: nationality,
        driving_license_image: licenseBase64,
        selfie_image: selfieBase64,
        application_date: new Date().toLocaleDateString(),
      };

      // Send email using EmailJS
      // Note: You'll need to replace these with your actual EmailJS credentials
      await emailjs.send(
        'service_ng29dlh',
        'template_mnkf3pf',
        templateParams,
        'rhp2vNTKa0sC1H8uz'
      );

      setSuccess(true);
      setIsLoading(false);

      // Redirect after 3 seconds
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (err: any) {
      console.error('Error submitting application:', err);
      setError('Failed to submit application. Please try again.');
      setIsLoading(false);
    }
  };

  // If user is already a driver, redirect to home
  if (auth.userGroups?.includes('Driver')) {
    navigate('/');
    return null;
  }

  // If not authenticated, redirect to auth page
  if (!auth.isAuthenticated && !auth.isLoading) {
    navigate('/auth');
    return null;
  }

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

  // Show success message
  if (success) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-900 dark:text-green-100">Application Submitted!</AlertTitle>
          <AlertDescription className="text-green-800 dark:text-green-200">
            Your driver application has been submitted successfully. We will review your application and get back to you via email. Redirecting to home...
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Car className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Apply to Become a Driver</h1>
        </div>
        <p className="text-muted-foreground">
          Fill out the form below to apply for driver status. We'll review your application and contact you via email.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Driver Application Form</CardTitle>
          <CardDescription>
            Please provide accurate information and upload clear images of your documents.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>

              <div className="space-y-2">
                <Label htmlFor="fatherName">Father's Name *</Label>
                <Input
                  id="fatherName"
                  type="text"
                  placeholder="Enter your father's name"
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motherName">Mother's Name *</Label>
                <Input
                  id="motherName"
                  type="text"
                  placeholder="Enter your mother's name"
                  value={motherName}
                  onChange={(e) => setMotherName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality *</Label>
                <Input
                  id="nationality"
                  type="text"
                  placeholder="Enter your nationality"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Driver License Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Driver License Information</h3>

              <div className="space-y-2">
                <Label htmlFor="drivingLicenseNumber">Driving License Number *</Label>
                <Input
                  id="drivingLicenseNumber"
                  type="text"
                  placeholder="Enter your driving license number"
                  value={drivingLicenseNumber}
                  onChange={(e) => setDrivingLicenseNumber(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="drivingLicenseImage">Driving License Image *</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="drivingLicenseImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setDrivingLicenseImage, setLicensePreview)}
                    required
                    className="cursor-pointer"
                  />
                  {drivingLicenseImage && (
                    <Upload className="h-5 w-5 text-green-600" />
                  )}
                </div>
                {licensePreview && (
                  <div className="mt-2 border rounded-lg p-2">
                    <img
                      src={licensePreview}
                      alt="Driving license preview"
                      className="max-h-48 mx-auto rounded"
                    />
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Upload a clear image of your driving license (max 5MB)
                </p>
              </div>
            </div>

            {/* Personal Identification */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Identification</h3>

              <div className="space-y-2">
                <Label htmlFor="selfieImage">Personal Selfie *</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="selfieImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setSelfieImage, setSelfiePreview)}
                    required
                    className="cursor-pointer"
                  />
                  {selfieImage && (
                    <Upload className="h-5 w-5 text-green-600" />
                  )}
                </div>
                {selfiePreview && (
                  <div className="mt-2 border rounded-lg p-2">
                    <img
                      src={selfiePreview}
                      alt="Selfie preview"
                      className="max-h-48 mx-auto rounded"
                    />
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Upload a clear selfie photo (max 5MB)
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/')}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} className="gap-2">
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    <Car className="h-4 w-4" />
                    Submit Application
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplyDriver;
