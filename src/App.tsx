import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import Home from "./pages/home";
import { Bus } from "./pages/bus"; // Corrected import
import { Carpool } from "./pages/carpool"; // Corrected import
import Rides from "./pages/rides";
import OfferRidesPage from "./pages/offerRides";
import BookingPage from "./pages/bookingPage";
import NotFoundPage from "./pages/NotFoundPage";
import { TripsPage } from "./pages/trips"; // Corrected import
import { OfferTouristicTripsPage } from "./pages/offerTouristicTrips"; // New import
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar02 } from "@/components/ui/shadcn-io/navbar-02/index"; 
import Profile from "./pages/dashboard/profile";
import RatingsReceived from "./pages/dashboard/ratingsReceived";
import RatingsGiven from "./pages/dashboard/ratingsGiven";
import Ratings from "./pages/dashboard/ratings";
import SiteFooter from "./components/siteFooter";
import { Toaster } from "@/components/ui/sonner";

// Placeholder component for Trip Details
const TripDetailsPage = () => {
  const { tripId } = useParams();
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-4xl font-bold">Trip Details Page</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Viewing details for Trip ID: <strong>{tripId}</strong>
      </p>
      <p className="mt-2 text-sm text-gray-500">
        (This is a placeholder. A full implementation would fetch and display data for this specific trip.)
      </p>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <Navbar02 className="fixed" />
        <Routes>
          <Route path="/toaster" element={<Toaster />} />
          <Route path="/" element={<Home />} />
          <Route path="/carpool" element={<Carpool />} />
          <Route path="/bus" element={<Bus />} />
          <Route path="/rides" element={<Rides />} />
          <Route path="/offerRides" element={<OfferRidesPage />} />
          <Route path="/booking/:rideId" element={<BookingPage />} />
          
          {/* New and Updated Trip Routes */}
          <Route path="/trips" element={<TripsPage />} />
          <Route path="/trips/:tripId" element={<TripDetailsPage />} />
          <Route path="/offer-touristic-trips" element={<OfferTouristicTripsPage />} />

          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/vehicles" element={<Bus />} />
          <Route path="/dashboard/ratingsReceived" element={<RatingsReceived />} />
          <Route path="/dashboard/ratingsGiven" element={<RatingsGiven />} />
          <Route path="/dashboard/ratings" element={<Ratings />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
        <SiteFooter />
        <Toaster />
      </ThemeProvider>
    </Router>
  );
};

export default App;
