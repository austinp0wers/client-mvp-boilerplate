import React from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home/home";
import Login from "./pages/Login/login";
import { RequireAuth } from "react-auth-kit";
import Signup from "./pages/Signup/signup";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth loginPath="/login">
              <Home />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
