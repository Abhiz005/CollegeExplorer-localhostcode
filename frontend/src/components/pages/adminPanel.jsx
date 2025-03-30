import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PipeAnimation from "../PipeAnimation";
const AdminPanel = () => {
  const [stats, setStats] = useState({
    users: 0,
    colleges: 0,
    reviews: 0,
  });

  useEffect(() => {
    setTimeout(() => {
      setStats({
        users: 120,
        colleges: 45,
        reviews: 230,
      });
    }, 1000);
  }, []);

  return (
    <div className="admin-panel">
      <PipeAnimation />
      <div className="animated-background"></div>
      <motion.div
        className="admin-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="admin-title">Admin Dashboard</h1>
        <motion.div
          className="stats-container"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {Object.entries(stats).map(([key, value]) => (
            <motion.div
              key={key}
              className="stat-card"
              whileHover={{ scale: 1.05 }}
            >
              <h2>{key.charAt(0).toUpperCase() + key.slice(1)}</h2>
              <p>{value}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="actions-container"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {[
            "Add User",
            "Remove User",
            "Add College",
            "Remove College",
            "Add Review",
            "Remove Review",
          ].map((action) => (
            <motion.button
              key={action}
              className="action-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {action}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminPanel;
