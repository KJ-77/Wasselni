import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Frontpage from "./pages/frontpage";
import Home from "./pages/home";
import Bus from "./pages/bus";
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
          <Route path="/frontpage" element={<Frontpage />} />
          <Route path="/Bus" element={<Bus />} />
          {/* <Route path="/*" element={<NotFoundPage />} /> */}
        </Routes>
      </ThemeProvider>
     
      </Router>
  );
};

export default App;
