import { useState, useEffect } from "react";
import { ThumbsUp } from "lucide-react"; // Changed Heart to ThumbsUp
import axios from "axios";
import { useAuthStore } from "./store/authStore";
import { motion } from "framer-motion";

function LikeButton({ collegeId, selectedCourse, likeCount, onLike }) {
  const [isLiked, setIsLiked] = useState(false);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("white"); // State for message color
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && user && collegeId) {
      axios
        .get("http://localhost:4001/isLiked", {
          params: {
            user_id: user._id,
            college_id: collegeId,
            course_name: selectedCourse || "default",
          },
        })
        .then((response) => setIsLiked(response.data.isLiked))
        .catch((error) => console.error("Error checking like status", error));
    }
  }, [isAuthenticated, user, collegeId, selectedCourse]);

  const handleLikeClick = async () => {
    if (!isAuthenticated) {
      setMessage("Please log in to use this feature.");
      setMessageColor("white"); // Default message color
      return;
    }

    try {
      const courseToSave = selectedCourse || "default";

      if (!isLiked) {
        await axios.post("http://localhost:4001/like", {
          user_id: user._id,
          college_id: collegeId,
          course_name: courseToSave,
        });
        onLike(likeCount + 1);
        setMessage("Liked!");
        setMessageColor("green"); // Green for "Liked!"
      } else {
        await axios.post("http://localhost:4001/unlike", {
          user_id: user._id,
          college_id: collegeId,
          course_name: courseToSave,
        });
        onLike(likeCount - 1);
        setMessage("Unliked!");
        setMessageColor("red"); // Red for "Unliked!"
      }

      setIsLiked(!isLiked);
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.error("Error liking/unliking:", error);
      setMessage("An error occurred.");
      setMessageColor("white");
    }
  };

  return (
    <div className="like-button-container">
      <button className="like-button" onClick={handleLikeClick}>
        <motion.div
          whileTap={{ scale: 1.2 }}
          animate={{ scale: isLiked ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <ThumbsUp size={32} stroke="white" fill={isLiked ? "blue" : "none"} />
        </motion.div>
        <span className="like-count">{likeCount}</span>
      </button>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="like-message"
          style={{ color: messageColor }} // Apply dynamic color
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}

export default LikeButton;
