import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";
import Header from "../1Header";

const DashboardPage = () => {
  const { user, logout } = useAuthStore();
  const [userReviews, setUserReviews] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
  });

  // Fetch user reviews
  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4001/review-add/user/reviews/${user._id}`
        );
        setUserReviews(response.data);
      } catch (error) {
        console.error("Error fetching user reviews:", error);
      }
    };

    if (user?._id) {
      fetchUserReviews();
    }
  }, [user]);

  // Fetch colleges
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get("http://localhost:4001/college/");
        setColleges(response.data);
      } catch (error) {
        console.error("Error fetching colleges:", error);
      }
    };

    fetchColleges();
  }, []);

  const handleEditClick = (review) => {
    setEditingReview(review._id);
    setEditFormData({ name: review.name, description: review.description });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:4001/review-add/review-update/${editingReview}`,
        {
          name: editFormData.name,
          description: editFormData.description,
        }
      );
      setUserReviews(
        userReviews.map((review) =>
          review._id === editingReview
            ? {
                ...review,
                name: editFormData.name,
                description: editFormData.description,
              }
            : review
        )
      );
      setEditingReview(null);
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(
        `http://localhost:4001/review-add/review-delete/${reviewId}`
      );
      setUserReviews(userReviews.filter((review) => review._id !== reviewId));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div>
      <Header />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="dashboard-container"
      >
        <h2 className="dashboard-title">Dashboard</h2>

        <div className="dashboard-content">
          <motion.div className="card">
            <h3 className="card-title">Profile Information</h3>
            <p className="card-text">Name: {user.name}</p>
            <p className="card-text">Email: {user.email}</p>
          </motion.div>

          <motion.div className="card">
            <h3 className="card-title">Account Activity</h3>
            <p className="card-text">
              <span className="font-bold">Joined: </span>
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="card-text">
              <span className="font-bold">Last Login: </span>
              {formatDate(user.lastLogin)}
            </p>
          </motion.div>

          <motion.div className="card">
            <h3 className="card-title">Your Reviews</h3>
            {userReviews.length === 0 ? (
              <p>No reviews written yet.</p>
            ) : (
              userReviews.map((review) => {
                // Find the college corresponding to review.college_id
                const college = colleges.find(
                  (college) => college._id === review.college_id
                );

                return (
                  <div key={review._id} className="review-item">
                    {editingReview === review._id ? (
                      <form onSubmit={handleEditSubmit}>
                        <input
                          type="text"
                          name="name"
                          value={editFormData.name}
                          onChange={handleEditChange}
                          required
                        />
                        <textarea
                          name="description"
                          value={editFormData.description}
                          onChange={handleEditChange}
                          required
                        />
                        <button type="submit">Save</button>
                        <button onClick={() => setEditingReview(null)}>
                          Cancel
                        </button>
                      </form>
                    ) : (
                      <>
                        <p>
                          <strong>Your Name: </strong>
                          {review.name}
                        </p>
                        <p>
                          <strong>Your Review: </strong>
                          {review.description}
                        </p>
                        <p>
                          <strong>College:</strong>{" "}
                          {college ? college.name : "Unknown College"}
                        </p>
                        <p>
                          <strong>Course:</strong> {review.course_id}
                        </p>
                        <button onClick={() => handleEditClick(review)}>
                          Edit
                        </button>
                        <button onClick={() => handleDeleteReview(review._id)}>
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                );
              })
            )}
          </motion.div>
        </div>

        <motion.div className="logout-button-container">
          <motion.button onClick={logout} className="logout-button">
            Logout
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
