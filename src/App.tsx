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
import { Toaster } from "@/components/ui/sonner"




const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <Navbar02 className="fixed" />
        <Routes>
          <Route path="/" element= {<Home />} />
          <Route path="/carpool" element={<Carpool />} />
          <Route path="/Bus" element={<Bus />} />
          <Route path="/rides" element={<Rides />} /> {/* New route for rides */}
          <Route path="/offerRides" element={<OfferRidesPage />} /> {/* New route for offer rides */}
          <Route path="/booking/:rideId" element={<BookingPage />} /> {/* New route for booking page */}
          <Route path="/trips" element={<TripsPage />} /> {/* New route for trips page */}
          <Route path="/tripDetails/:tripId" element={<TripDetailsPage />} /> {/* New route for trip details page */}
          <Route path="/tripBooking/:tripId" element={<TripBookingPage />} /> {/* New route for trip booking page */}
          <Route path="/offerTouristicTrips" element={<OfferTouristicTripsPage />} /> {/* New route for offer touristic trips */}
          <Route path="/quick-start-guide" element={<QuickStartGuide />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/vehicles" element={<Bus />} />
          <Route
            path="/dashboard/ratingsReceived"
            element={<RatingsReceived />}
          />
          <Route path="/dashboard/ratingsGiven" element={<RatingsGiven />} />
          <Route path="/dashboard/ratings" element={<Ratings />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
        <SiteFooter />
        <Toaster position="top-right" />
      </ThemeProvider>
    </Router>
  );
};

export default App;
