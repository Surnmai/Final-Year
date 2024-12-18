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

const App = () => {
  return (
    <Router>
      <div className="bg-primary relative flex min-h-screen flex-row p-4">
        <Sidebar />
        <div className="mx-auto max-w-[1280px] flex-1 max-sm:w-full sm:pr-5">
          {/* Navbar  */}
          <Routes>
            <Route path="/" element={<div className="text-white">Home</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
