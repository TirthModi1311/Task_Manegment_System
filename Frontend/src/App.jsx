
import { useState } from "react";
import {  BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import NavBar from "./Components/NavBar";
import "./App.css";

import DashBoard from "./Pages/DashBoard";
import LoginPage from "./Pages/LoginPage";
import Registration from "./Pages/Registration";

const App = () => {

  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );

  const [darkMode, setDarkMode] = useState(false);

  const handleLoginSuccess = (jwtToken) => {
    
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <BrowserRouter>
      <div className={`app ${darkMode ? "dark" : "light"}`}>
        {token && (
          <NavBar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            onLogout={handleLogout}
          />
        )}

        <main className="content">
          <Routes>
            {/* Login Route */}
            <Route
              path="/login"
              element={
                token ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <LoginPage
                    onLoginSuccess={handleLoginSuccess}
                  />
                )
              }
            />

            {/* Registration Route */}
            <Route
              path="/register"
              element={
                token ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Registration />
                )
              }
            />

            {/* Protected Dashboard Route */}
            <Route
              path="/dashboard"
              element={
                token ? (
                  <DashBoard token={token} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Default Route */}
            <Route
              path="*"
              element={
                <Navigate
                  to={token ? "/dashboard" : "/login"}
                  replace
                />
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
