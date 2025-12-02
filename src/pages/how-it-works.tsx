
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Shield, Users, DollarSign } from "lucide-react";

const HowItWorks = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 py-20 ">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50">
          How Wasselni Works
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          A seamless, secure and community-driven way to share rides across cities and regions. Find a ride, offer a seat, and travel smarter together — with transparent pricing, live messaging and built-in safety measures.
        </p>
      </header>

      {/* For Passengers Section */}
      <section className="mt-20 mb-20">
        <h2 className="text-3xl font-bold text-center mb-20 text-gray-800 dark:text-gray-200">For Passengers</h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center px-4">
            <div className="bg-primary text-white rounded-full p-3 mb-3">
              <CheckCircle size={36} />
            </div>
            <h3 className="text-lg font-semibold mb-2">1. Search & Select</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Search by route or pickup point, filter by date, time, price and vehicle type, then choose the seat that suits you.</p>
          </div>
          <div className="flex flex-col items-center px-4">
            <div className="bg-primary text-white rounded-full p-3 mb-3">
              <Users size={36} />
            </div>
            <h3 className="text-lg font-semibold mb-2">2. Confirm & Communicate</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Confirm your booking and use in-app messaging to coordinate pickup details with the driver. View driver profile, rating and vehicle details before you travel.</p>
          </div>
          <div className="flex flex-col items-center px-4">
            <div className="bg-primary text-white rounded-full p-3 mb-3">
              <DollarSign size={36} />
            </div>
            <h3 className="text-lg font-semibold mb-2">3. Pay, Ride & Review</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Pay securely in the app. After your trip, leave a review to help the community — ratings help everyone make better choices.</p>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-10 text-gray-800 dark:text-gray-200">Quick Tips</h2>
        <ul className="list-disc list-inside  text-gray-700 dark:text-gray-300 space-y-4 max-w-3xl mt-15">
          <li>Always check the driver's rating and recent reviews before booking.</li>
          <li>Confirm pickup points and arrive 5–10 minutes early to avoid delays.</li>
          <li>Use in-app chat to share live updates or changes to pickup time.</li>
        </ul>
      </section>

      {/* For Drivers Section */}
      <section className="mt-20 mb-40">
        <h2 className="text-3xl font-bold text-center mb-20 text-gray-800 dark:text-gray-200">For Drivers</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="bg-secondary text-white rounded-full p-4 mb-4">
              <CheckCircle size={40} />
            </div>
            <h3 className="text-xl font-semibold mb-2">1. Offer a Ride</h3>
            <p className="text-gray-600 dark:text-gray-400">Share your travel plans by offering a ride. Set your own schedule, route, and price per seat.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-secondary text-white rounded-full p-4 mb-4">
              <Users size={40} />
            </div>
            <h3 className="text-xl font-semibold mb-2">2. Manage Bookings</h3>
            <p className="text-gray-600 dark:text-gray-400">Accept booking requests from passengers. You can review their profiles before accepting.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-secondary text-white rounded-full p-4 mb-4">
              <DollarSign size={40} />
            </div>
            <h3 className="text-xl font-semibold mb-2">3. Earn Money</h3>
            <p className="text-gray-600 dark:text-gray-400">Get paid automatically after the ride is completed. It's an easy way to cover your travel costs.</p>
          </div>
        </div>
      </section>

      {/* Safety and Trust Section */}
      <section className="mb-6">
        <Card className="bg-white dark:bg-gray-800 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-3xl font-bold text-gray-900 dark:text-gray-50">
              <Shield size={32} className="text-green-500"/>
              Trust and Safety are Our Priority
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <div className="flex items-start gap-4">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold">Verified Profiles</h4>
                <p>We perform identity checks and phone verification for drivers and frequent passengers to keep the community trusted.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold">Secure Payments & Clear Policies</h4>
                <p>Payments are processed securely in-app. Cancellations, refunds and dispute processes are transparent and managed through our support team.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold">Community Reviews & Support</h4>
                <p>Driver and passenger reviews are visible on profiles. Our 24/7 support team helps resolve issues and moderate reports.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default HowItWorks;
