
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const QuickStartGuide = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 py-20">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          Quick Start Guide
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Your journey with Wasselni starts here. Find or offer a ride in minutes.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-semibold text-gray-900 dark:text-gray-50">
              <span role="img" aria-label="car icon" className="text-3xl">🚗</span>
              Looking for a Ride?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-4 text-gray-700 dark:text-gray-300">
              <li>
                <span className="font-semibold">Search for Your Destination:</span> Use our intuitive search bar on the homepage. Enter your starting point and destination to see available rides.
              </li>
              <li>
                <span className="font-semibold">Choose Your Ride:</span> Browse through the list of available rides. Check the driver's profile, vehicle details, and reviews from other passengers.
              </li>
              <li>
                <span className="font-semibold">Book and Pay Securely:</span> Once you find the perfect ride, book it directly on the platform. Our secure payment system ensures your peace of mind.
              </li>
              <li>
                <span className="font-semibold">Enjoy Your Trip:</span> Communicate with your driver, meet at the designated pickup point, and enjoy a comfortable and affordable ride.
              </li>
            </ol>
            <div className="mt-6 text-center">
              <Link to="/rides" className="inline-block w-full md:w-auto">
                <Button size="lg" className="w-full md:w-auto">
                  Find a Ride Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-semibold text-gray-900 dark:text-gray-50">
              <span role="img" aria-label="waving hand icon" className="text-3xl">👋</span>
              Want to Offer a Ride?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-4 text-gray-700 dark:text-gray-300">
              <li>
                <span className="font-semibold">Publish Your Ride:</span> Click on the "Offer a Ride" button. Fill in your route details, schedule, and the price per seat.
              </li>
              <li>
                <span className="font-semibold">Manage Your Bookings:</span> Get notified when passengers book a seat. You can review their profiles and accept bookings.
              </li>
              <li>
                <span className="font-semibold">Drive and Earn:</span> Meet your passengers and enjoy the journey together. Your earnings will be transferred to you securely after the ride is completed.
              </li>
              <li>
                <span className="font-semibold">Build Your Reputation:</span> Receive ratings and reviews from your passengers to build a trustworthy profile in the Wasselni community.
              </li>
            </ol>
            <div className="mt-6 text-center">
              <Link to="/offerRides" className="inline-block w-full md:w-auto">
                <Button size="lg" className="w-full md:w-auto">
                  Offer a Ride Today <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
          Ready to Get Started?
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Join the Wasselni community today and start experiencing a new way to travel.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/our-story" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">Read Our Story</Button>
          </Link>
          <Link to="/register" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto">Join Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuickStartGuide;
