import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../components/store/authStore";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    logout(); // Perform logout action
  };
  const handleDashBoardRedirect = () => {
    navigate("/dashboardPage"); // Redirect to login page
  };
  const handleLoginRedirect = () => {
    navigate("/login"); // Redirect to login page
  };

  const handleNavigateToSection = (sectionId) => {
    navigate(`/#${sectionId}`); // Navigate to the root with the section hash
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the section
      }
    }, 100); // Delay ensures page navigation before scrolling
  };

  useEffect(() => {
    // Ensure the active link highlights correctly based on the current path
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`m-c ${activeLink === "Home" ? "active" : ""}`}
                onClick={() => {
                  setActiveLink("Home");
                  handleNavigateToSection("Home");
                }}
              >
                Home
              </motion.button>
            </motion.div>
          </li>
          <li>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`m-c ${activeLink === "DashBoard" ? "active" : ""}`}
                onClick={() => {
                  setActiveLink("DashBoard"); // Set active link for DashBoard
                  handleDashBoardRedirect();
                }}
              >
                DashBoard
              </motion.button>
            </motion.div>
          </li>
          <li>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`m-c ${activeLink === "Review" ? "active" : ""}`}
                onClick={() => {
                  setActiveLink("Review"); // Set active link for Review
                  handleNavigateToSection("review");
                }}
              >
                Review
              </motion.button>
            </motion.div>
          </li>
          <li>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`m-c ${activeLink === "Map" ? "active" : ""}`}
                onClick={() => {
                  setActiveLink("Map"); // Set active link for Map
                  handleNavigateToSection("map");
                }}
              >
                Map
              </motion.button>
            </motion.div>
          </li>
          <li>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`m-c ${activeLink === "FeedBack" ? "active" : ""}`}
                onClick={() => {
                  setActiveLink("FeedBack"); // Set active link for FeedBack
                  handleNavigateToSection("feedback");
                }}
              >
                FeedBack
              </motion.button>
            </motion.div>
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
