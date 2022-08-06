import "./App.css";

import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import UserApi from "./Api/user/index";

const App = () => {
  const [userLoggedin, setuserLoggedin] = useState(null);

  useEffect(() => {
    const userlogged = async () => {
      const isvalid = await UserApi.tokenVerify();
      console.log(isvalid);
      setuserLoggedin(isvalid);
    };
    userlogged();
  }, []);

  return (
    <Router>
      {userLoggedin != null && (
        <div className="App" id="deactivateSidebar">
          <Routes>
            <Route
              path="/"
              element={
                <UnprotectedRoute UserLogin={userLoggedin}>
                  <RegisterPage />
                </UnprotectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <UnprotectedRoute UserLogin={userLoggedin}>
                  <LoginPage />
                </UnprotectedRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute UserLogin={userLoggedin}>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      )}
    </Router>
  );
};

const ProtectedRoute = ({ UserLogin, children }) => {
  if (!UserLogin) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
const UnprotectedRoute = ({ UserLogin, children }) => {
  if (UserLogin) {
    return <Navigate to="/home" replace />;
  }
  return children;
};

export default App;
