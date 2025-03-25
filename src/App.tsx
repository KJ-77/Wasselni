import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Frontpage from "./pages/frontpage";

const App = () => {
  return (
    
      <Router>
        <Routes>
          
          <Route path="/" element= {<Frontpage />} />
          {/* <Route path="/*" element={<NotFoundPage />} /> */}
        </Routes>
      </Router>
  );
};

export default App;
