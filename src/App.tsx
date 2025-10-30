import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Bus from "./pages/bus";
import Carpool from "./pages/carpool";
// import Navbar from "./components/navbar";
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar02 } from "@/components/ui/shadcn-io/navbar-02/index"; 


const App = () => {
  return (
    <Router>
      <ThemeProvider>
         <Navbar02 />
        <Routes>
          
          <Route path="/" element= {<Home />} />
          <Route path="/carpool" element={<Carpool />} />
          <Route path="/Bus" element={<Bus />} />
          {/* <Route path="/*" element={<NotFoundPage />} /> */}
        </Routes>
      </ThemeProvider>
     
      </Router>
  );
};

export default App;
