import React, { useState } from "react";
import { toast } from "react-hot-toast"; // Import toast
import { useAuthStore } from "./store/authStore"; // Import the auth store

const LikeButton = ({ likeCount, onLike }) => {
  const [liked, setLiked] = useState(false);
  const { isAuthenticated } = useAuthStore(); // Get login status from the auth store

  const handleLikeClick = () => {
    if (!isAuthenticated) {
      // Show toast notification if not logged in
      toast.error("Please log in to use this feature.");
      return;
    }

    setLiked(true);
    onLike();

    // Show success toast for like action
    toast.success("You liked this!");
    setTimeout(() => {
      setLiked(false);
    }, 1000);
  };

  return (
    <div className="like-button">
      <button onClick={handleLikeClick} className="like-icon">
        <img
          src="./images/likeIcon.png"
          className={`likeIcon ${liked ? "liked" : ""}`}
          alt="like icon"
        />
      </button>
      {likeCount > 0 && <span className="like-count">{likeCount}</span>}
      {liked && <div className="like-popup">Liked!</div>}
    </div>
  );
};

export default LikeButton;
