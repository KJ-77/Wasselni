import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Frontpage from "./pages/frontpage";
import Home from "./pages/home";
import Navbar from "./components/navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
        <Routes>
          
          <Route path="/" element= {<Home />} />
          <Route path="/frontpage" element={<Frontpage />} />
          {/* <Route path="/*" element={<NotFoundPage />} /> */}
        </Routes>
      </Router>
  );
};

export default App;
