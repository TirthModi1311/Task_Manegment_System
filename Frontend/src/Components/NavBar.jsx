import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = ({ darkMode, setDarkMode, onLogout }) => {
  const [userName, setUserName] = useState(
    () =>
      localStorage.getItem("userName") ||
      localStorage.getItem("name") ||
      "User"
  );

  const navigate = useNavigate();

  useEffect(() => {
    const storedName =
      localStorage.getItem("userName") ||
      localStorage.getItem("name");

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUserName(storedName || "User");
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="brand-icon">📦</span>
        <h2>TASKVIEW</h2>
      </div>

      <div className="nav-actions">
        <span className="welcome-text">
          🔔 Welcome, {userName}!
        </span>

        <button
          className="theme-btn"
          onClick={() => setDarkMode((prev) => !prev)}
          title="Toggle Light/Dark Theme"
          aria-label="Toggle light and dark theme"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar
