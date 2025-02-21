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
  const [savedColleges, setSavedColleges] = useState([]);
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

  useEffect(() => {
    const fetchSavedCollegesWithFees = async () => {
      try {
        // Fetch saved colleges for user
        const savedResponse = await axios.get(
          `http://localhost:4001/getsave?user_id=${user._id}`
        );
        const savedData = savedResponse.data;

        // Merge saved colleges with detailed college data
        const updatedSavedColleges = savedData.map((saved) => {
          const college = colleges.find((col) => col._id === saved.college_id);

          if (!college) return saved; // Skip if college is not found

          // Find course details dynamically using saved.course_name
          const courseDetails = college.courses[saved.course_name];

          return {
            ...saved,
            collegeName: college.name,
            location: college.location,
            image: college.image,
            fees: courseDetails ? courseDetails.fees : ["Not Available"], // Get fees
          };
        });

        setSavedColleges(updatedSavedColleges);
      } catch (error) {
        console.error("Error fetching saved colleges:", error);
      }
    };

    if (user?._id && colleges.length > 0) {
      fetchSavedCollegesWithFees();
    }
  }, [user, colleges]);

  // Fetch all colleges
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
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (!isConfirmed) {
      return;
    }

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
                const college = colleges.find(
                  (col) => col._id === review.college_id
                );

                return (
                  <div key={review._id} className="review-item">
                    {editingReview === review._id ? (
                      <form className="edit-form" onSubmit={handleEditSubmit}>
                        <input
                          type="text"
                          name="name"
                          value={editFormData.name}
                          onChange={handleEditChange}
                          className="edit-name"
                          required
                        />
                        <textarea
                          name="description"
                          value={editFormData.description}
                          onChange={handleEditChange}
                          className="edit-description"
                          required
                        />
                        <button type="submit" className="save-button">
                          Save
                        </button>
                        <button
                          onClick={() => setEditingReview(null)}
                          className="cancel-button"
                        >
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
                          <strong>College Name: </strong>
                          {college ? college.name : "Unknown College"}
                        </p>
                        <p>
                          <strong>Course Name: </strong>
                          {review ? review.course_id : "Unknown Course"}
                        </p>
                        <p>
                          <strong>Your Review: </strong>
                          {review.description}
                        </p>

                        <button
                          className="edit-button"
                          onClick={() => handleEditClick(review)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteReview(review._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                );
              })
            )}
          </motion.div>

          <motion.div className="card">
            <h3 className="card-title">Your Saved Colleges List</h3>
            {savedColleges.length === 0 ? (
              <p>No colleges saved yet.</p>
            ) : (
              savedColleges.map((saved) => (
                <div key={saved._id} className="saved-college-box">
                  <p>
                    <strong>College Name: </strong>
                    {saved.collegeName || "Unknown College"}
                  </p>
                  <p>
                    <strong>Course Name: </strong>
                    {saved.course_name}
                  </p>
                  <p>
                    <strong>Location: </strong>
                    {saved.location || "Unknown"}
                  </p>
                  <p>
                    <strong>Fees: </strong>
                    {saved.fees?.join(", ") || "N/A"}
                  </p>
                </div>
              ))
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
