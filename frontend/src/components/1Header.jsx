import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../components/store/authStore";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const { isAuthenticated, logout } = useAuthStore();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    logout(); // Perform logout action
  };

  const handleLoginRedirect = () => {
    window.location.href = "/login"; // Redirect to login page
  };

  useEffect(() => {
    // This effect ensures that if the user is logged out, the menu will reflect the "Login" button
  }, [isAuthenticated]);

  return (
    <>
      <header className="header">
        <a href="/" className="logo">
          <img src="./images/logo.png" alt="LOGO" className="logoimg" />
        </a>
        <span className="logo-name">COLLEGE EXPLORER</span>
        <nav className="navbar">
          <div
            className={`container1 ${menuOpen ? "change" : ""}`}
            onClick={toggleMenu}
            id="menu-icon"
          >
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
        </nav>
      </header>

      <div className={`navbar1 ${menuOpen ? "show" : ""}`}>
        <ul className="menu">
          <li>
            <a
              href="#"
              className={activeLink === "Home" ? "active" : ""}
              onClick={() => setActiveLink("Home")}
            >
              Home
            </a>
          </li>
          <li>
            <a href="/dashboardPage">DashBoard</a>
          </li>
          <li>
            <a
              href="#review"
              className={activeLink === "Review" ? "active" : ""}
              onClick={() => setActiveLink("Review")}
            >
              Review
            </a>
          </li>
          <li>
            <a
              href="#map"
              className={activeLink === "Map" ? "active" : ""}
              onClick={() => setActiveLink("Map")}
            >
              Map
            </a>
          </li>
          <li>
            <a
              href="#feedback"
              className={activeLink === "FeedBack" ? "active" : ""}
              onClick={() => setActiveLink("FeedBack")}
            >
              FeedBack
            </a>
          </li>
          <li>
            {isAuthenticated ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="logout-button-container"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="logout-button"
                >
                  Logout
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="login-button-container"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLoginRedirect}
                  className="login-button"
                >
                  Login
                </motion.button>
              </motion.div>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
