import React from "react";

// import react router
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

// import Components
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

// import pages
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <div className="relative flex min-h-screen flex-row bg-primary p-8">
        <Sidebar />
        <div className="mx-auto max-w-[1280px] flex-1 max-sm:w-full sm:pr-5">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
