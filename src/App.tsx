import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Frontpage from "./pages/frontpage";
import Home from "./pages/home";
import Navbar from "./components/navbar";
import { ThemeProvider } from "@/components/theme-provider"

const App = () => {
  return (
    <Router>
      <ThemeProvider>
         <Navbar />
        <Routes>
          
          <Route path="/" element= {<Home />} />
          <Route path="/frontpage" element={<Frontpage />} />
          {/* <Route path="/*" element={<NotFoundPage />} /> */}
        </Routes>
      </ThemeProvider>
     
      </Router>
  );
};

export default App;
