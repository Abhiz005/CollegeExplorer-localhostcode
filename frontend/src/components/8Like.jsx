import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";

const LikeButton = ({ likeCount, onLike }) => {
  const [isLiking, setIsLiking] = useState(false); // Track if a like is in progress
  const { isAuthenticated } = useAuthStore();

  const handleLikeClick = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in to use this feature.");
      return;
    }

    if (isLiking) return; // Prevent multiple clicks
    setIsLiking(true);

    try {
      await onLike(); // Call the parent's like function
      toast.success("You liked this!");
    } catch (error) {
      toast.error("Failed to like. Please try again.");
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="like-button">
      <button
        onClick={handleLikeClick}
        className="like-icon"
        disabled={isLiking}
      >
        <img
          src="./images/likeIcon.png"
          className={`likeIcon ${isLiking ? "liked" : ""}`}
          alt="like icon"
        />
      </button>
      {likeCount > 0 && <span className="like-count">{likeCount}</span>}
    </div>
  );
};

export default LikeButton;
