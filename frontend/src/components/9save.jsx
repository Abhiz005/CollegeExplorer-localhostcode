import { useState } from "react";
import { Bookmark } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuthStore } from "./store/authStore";

function SaveButton({ collegeId }) {
  const [isSaved, setIsSaved] = useState(false);
  const { isAuthenticated, user } = useAuthStore();

  const handleSaveClick = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in to use this feature.");
      return;
    }

    try {
      if (!isSaved) {
        // Save the college
        await axios.post("http://localhost:4001/save", {
          user_id: user._id,
          college_id: collegeId,
        });
        toast.success("College saved successfully!");
      } else {
        // Unsave the college
        await axios.post("http://localhost:4001/unsave", {
          user_id: user._id,
          college_id: collegeId,
        });
        toast.error("College unsaved!");
      }
      setIsSaved(!isSaved);
    } catch (error) {
      toast.error("Error saving college.");
      console.error(error);
    }
  };

  return (
    <div>
      <button
        className="save-button"
        onClick={handleSaveClick}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <Bookmark size={32} stroke="white" fill={isSaved ? "white" : "none"} />
      </button>
    </div>
  );
}

export default SaveButton;
