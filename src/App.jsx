import React from "react";

// import react router
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// import Components
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

// import pages
import { Home, Onboarding, Profile } from "./pages";

// import useGlobalContext
import { useGlobalContext } from "./context";

// import privy
import { usePrivy } from "@privy-io/react-auth";

const App = () => {
  // destructure global context
  const { currentUser } = useGlobalContext();

  // destructure usePrivy
  const { user, authenticated, ready, login } = usePrivy();

  // destructure useNavigate
  const navigate = useNavigate();

  useNavigate(() => {
    if (ready && !authenticated) {
      login();
    } else if (user && !currentUser) {
      navigate("/onboarding");
    }
  }, [ready, authenticated, currentUser, user]);

  return (
    <>
      <div className="relative flex min-h-screen flex-row bg-primary p-8">
        <Sidebar />
        <div className="mx-auto max-w-[1280px] flex-1 max-sm:w-full sm:pr-5">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
