import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuthStore } from "./store/authStore";

function LikeButton({ collegeId, selectedCourse, likeCount, onLike }) {
  const [isLiked, setIsLiked] = useState(false);
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
      toast.error("Please log in to use this feature.");
      return;
    }

    try {
      let response;
      const courseToSave = selectedCourse || "default";

      if (!isLiked) {
        response = await axios.post("http://localhost:4001/like", {
          user_id: user._id,
          college_id: collegeId,
          course_name: courseToSave,
        });
        toast.success("Liked successfully!");
        onLike(likeCount + 1); // Increment like count manually
      } else {
        response = await axios.post("http://localhost:4001/unlike", {
          user_id: user._id,
          college_id: collegeId,
          course_name: courseToSave,
        });
        toast.error("Unliked successfully!");
        onLike(likeCount - 1); // Decrement like count manually
      }

      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error liking/unliking:", error);
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div>
      <button
        className="like-button"
        onClick={handleLikeClick}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <Heart size={32} stroke="white" fill={isLiked ? "red" : "none"} />
        <span style={{ color: "white", fontSize: "16px" }}>{likeCount}</span>
      </button>
    </div>
  );
}

export default LikeButton;
