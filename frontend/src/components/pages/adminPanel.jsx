import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PipeAnimation from "../PipeAnimation";
import axios from "axios";

const AdminPanel = () => {
  const [stats, setStats] = useState({ users: 0, colleges: 0, reviews: 0 });
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showRemoveUser, setShowRemoveUser] = useState(false);
  const [showRemoveReview, setShowRemoveReview] = useState(false);
  const [selectedAction, setSelectedAction] = useState("");
  const [colleges, setColleges] = useState([]);
  const [showRemoveCollege, setShowRemoveCollege] = useState(false);

  // ✅ Fetch Stats
  const fetchStats = async () => {
    try {
      const response = await axios.get("http://localhost:4001/admin/stats");
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  // ✅ Fetch Users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4001/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // ✅ Fetch Reviews
  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:4001/admin/reviews");
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  // ✅ Delete User
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:4001/admin/users/${userId}`);
      alert("User deleted successfully!");
      fetchStats();
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  // ✅ Delete Review
  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:4001/admin/reviews/${reviewId}`);
      alert("Review deleted successfully!");
      fetchStats();
      fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Failed to delete review.");
    }
  };
  const fetchColleges = async () => {
    try {
      const response = await axios.get("http://localhost:4001/admin/colleges");
      setColleges(response.data);
    } catch (error) {
      console.error("Error fetching colleges:", error);
    }
  };
  const handleDeleteCollege = async (collegeId) => {
    try {
      await axios.delete(`http://localhost:4001/admin/colleges/${collegeId}`);
      alert("College deleted successfully!");
      fetchStats(); // Update stats
      fetchColleges(); // Refresh college list
    } catch (error) {
      console.error("Error deleting college:", error);
      alert("Failed to delete college.");
    }
  };

  useEffect(() => {
    fetchStats();
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

        {/* ✅ Stats Section */}
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

        {/* ✅ Action Buttons */}
        <motion.div
          className="actions-container"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {[
            "Remove User",
            "Add College",
            "Remove College",
            "Remove Review",
          ].map((action) => (
            <motion.button
              key={action}
              className="action-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setSelectedAction(action);
                if (action === "Remove User") {
                  setShowRemoveUser(true);
                  fetchUsers();
                } else if (action === "Remove Review") {
                  setShowRemoveReview(true);
                  fetchReviews();
                } else if (action === "Remove College") {
                  setShowRemoveCollege(true);
                  fetchColleges();
                }
              }}
            >
              {action}
            </motion.button>
          ))}
        </motion.div>

        {/* ✅ Remove User Section */}
        {selectedAction === "Remove User" && showRemoveUser && (
          <motion.div
            className="remove-user-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Remove User</h2>
            {users.length === 0 ? (
              <p>No users found.</p>
            ) : (
              <ul>
                {users.map((user) => (
                  <li key={user._id}>
                    {user.name} ({user.email}){" "}
                    <button onClick={() => handleDeleteUser(user._id)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <button onClick={() => setShowRemoveUser(false)}>Close</button>
          </motion.div>
        )}

        {/* ✅ Remove Review Section */}
        {selectedAction === "Remove Review" && showRemoveReview && (
          <motion.div
            className="remove-user-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Remove Review</h2>
            {reviews.length === 0 ? (
              <p>No reviews found.</p>
            ) : (
              <ul>
                {reviews.map((review) => (
                  <li key={review._id}>
                    <div>
                      <strong>{review.name}</strong> - {review.description}
                    </div>
                    <button onClick={() => handleDeleteReview(review._id)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <button onClick={() => setShowRemoveReview(false)}>Close</button>
          </motion.div>
        )}
        {selectedAction === "Remove College" && showRemoveCollege && (
          <motion.div className="remove-user-section">
            <h2>Remove College</h2>
            {colleges.length === 0 ? (
              <p>No colleges found.</p>
            ) : (
              <ul>
                {colleges.map((college) => (
                  <li key={college._id}>
                    <div>
                      <strong>{college.name}</strong> - {college.location}
                    </div>
                    <button onClick={() => handleDeleteCollege(college._id)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <button onClick={() => setShowRemoveCollege(false)}>Close</button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminPanel;
