import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuthStore } from "./store/authStore";

function SaveButton({ collegeId, location, fees, selectedCourse }) {
  const [isSaved, setIsSaved] = useState(false);
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && user && collegeId) {
      axios
        .get("http://localhost:4001/isSaved", {
          params: {
            user_id: user._id,
            college_id: collegeId,
            course_name: selectedCourse || "default",
          },
        })
        .then((response) => setIsSaved(response.data.isSaved))
        .catch((error) => console.error("Error checking save status", error));
    }
  }, [isAuthenticated, user, collegeId, selectedCourse]);

  const handleSaveClick = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in to use this feature.");
      return;
    }

    try {
      const courseToSave = selectedCourse || "default";

      if (!isSaved) {
        await axios.post("http://localhost:4001/save", {
          user_id: user._id,
          college_id: collegeId,
          course_name: courseToSave,
          location,
          fees,
        });
        toast.success("College saved successfully!");
      } else {
        // IMPORTANT: Pass the same course_name to unsave
        await axios.post("http://localhost:4001/unsave", {
          user_id: user._id,
          college_id: collegeId,
          course_name: courseToSave,
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
