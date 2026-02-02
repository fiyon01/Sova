import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SystemLayout from "./layout/SystemLayout";
import Home from "./pages/Home";
import Voices from "./pages/Voices";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./pages/auth/Signup";
import AuthSignup from "./pages/auth/AuthSignup";
import Profile from "./pages/profile";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* SYSTEM LAYOUT */}
        {/* AUTH LAYOUT */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth-signup" element={<AuthSignup />} />

        <Route element={<SystemLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/voices" element={<Voices />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </Router>
  );
};

export default App;
