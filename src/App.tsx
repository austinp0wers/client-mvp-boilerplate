import React from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home/home";
import Login from "./pages/Login/login";
import { RequireAuth } from "react-auth-kit";
import Signup from "./pages/Signup/signup";
import SideBar from "./components/sideBar";
import ProductPage from "./pages/Product/product";
function App() {
  return (
    <div className="App flex">
      {/* <SideBar /> */}
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth loginPath="/login">
                <ProductPage />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
