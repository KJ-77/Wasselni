import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Bus from "./pages/bus";
import Carpool from "./pages/carpool";
import Rides from "./pages/rides"; // Import the Rides component
import OfferRidesPage from "./pages/offerRides"; // Import the Offer Rides page
// import Navbar from "./components/navbar";
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar02 } from "@/components/ui/shadcn-io/navbar-02/index"; 
import Profile from "./pages/dashboard/profile";
import RatingsReceived from "./pages/dashboard/ratingsReceived";
import RatingsGiven from "./pages/dashboard/ratingsGiven";
import Ratings from "./pages/dashboard/ratings";
import SiteFooter from "./components/siteFooter";



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
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/vehicles" element={<Bus />} />
          <Route path="/dashboard/ratingsReceived" element={<RatingsReceived />} />
          <Route path="/dashboard/ratingsGiven" element={<RatingsGiven />} />
          <Route path="/dashboard/ratings" element={<Ratings />} />
          {/* <Route path="/*" element={<NotFoundPage />} /> */}
        </Routes>
        <SiteFooter />
      </ThemeProvider>
     
      </Router>
  );
};

export default App;
