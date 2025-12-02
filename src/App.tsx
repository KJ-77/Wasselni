import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/home";
import Bus from "./pages/bus";
import Carpool from "./pages/carpool";
import Rides from "./pages/rides"; // Import the Rides component
import OfferRidesPage from "./pages/offerRides"; // Import the Offer Rides page
import BookingPage from "./pages/bookingPage"; // Import the Booking page
import NotFoundPage from "./pages/NotFoundPage"; // Import the Not Found page
import TripsPage from "./pages/trips"; // Import the Trips page
import OfferTouristicTripsPage from "./pages/offerTouristicTrips"; // Import the Offer Touristic Trips page
import TripBookingPage from "./pages/tripBookingPage"; // Import the Trip Booking page
import TripDetailsPage from "./pages/tripDetails"; // Import the Trip Details page
import QuickStartGuide from "./pages/quick-start-guide";
import HowItWorks from "./pages/how-it-works";
import OurStory from "./pages/our-story";
// import Navbar from "./components/navbar";
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar02 } from "@/components/ui/shadcn-io/navbar-02/index";
import Profile from "./pages/dashboard/profile";
import RatingsReceived from "./pages/dashboard/ratingsReceived";
import RatingsGiven from "./pages/dashboard/ratingsGiven";
import Ratings from "./pages/dashboard/ratings";
import SiteFooter from "./components/siteFooter";
import Auth from './pages/auth';
import { Toaster } from "@/components/ui/sonner"
import ProtectedRoute from "@/components/ProtectedRoute";
import RoleProtectedRoute from "@/components/RoleProtectedRoute";




const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <Navbar02 />
        <Routes>
          <Route path="/" element= {<Home />} />
          <Route path="/carpool" element={<Carpool />} />
          <Route path="/Bus" element={<Bus />} />
          <Route path="/rides" element={<Rides />} />
          <Route
            path="/offerRides"
            element={
              <RoleProtectedRoute allowedRoles={['Driver']}>
                <OfferRidesPage />
              </RoleProtectedRoute>
            }
          /> {/* Driver role required */}
          <Route
            path="/booking/:rideId"
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            }
          /> 
          <Route path="/trips" element={<TripsPage />} /> {/* New route for trips page */}
          <Route path="/tripDetails/:tripId" element={<TripDetailsPage />} /> {/* New route for trip details page */}
          <Route
            path="/tripBooking/:tripId"
            element={
              <ProtectedRoute>
                <TripBookingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/offerTouristicTrips"
            element={
              <RoleProtectedRoute allowedRoles={['Driver']}>
                <OfferTouristicTripsPage />
              </RoleProtectedRoute>
            }
          /> {/* Driver role required */}
          <Route path="/quick-start-guide" element={<QuickStartGuide />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route
            path="/dashboard/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/ratingsReceived"
            element={
              <ProtectedRoute>
                <RatingsReceived />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/ratingsGiven"
            element={
              <ProtectedRoute>
                <RatingsGiven />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/ratings"
            element={
              <ProtectedRoute>
                <Ratings />
              </ProtectedRoute>
            }
          />
          <Route path="/auth" element={<Auth />} /> {/* authentication page */}
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
        <SiteFooter />
        <Toaster position="top-right" />
      </ThemeProvider>
    </Router>
  );
};

export default App;
