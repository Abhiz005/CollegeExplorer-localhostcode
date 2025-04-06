import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import axios from "axios";
import { useAuthStore } from "./store/authStore";
import { motion } from "framer-motion";

function SaveButton({ collegeId, location, fees, selectedCourse }) {
  const [isSaved, setIsSaved] = useState(false);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("white"); // Message color state
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
      setMessage("Please log in to use this feature.");
      setMessageColor("white");
      setTimeout(() => setMessage(""), 2000);
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
        setMessage("Saved!");
        setMessageColor("green"); // Green for "Saved!"
      } else {
        await axios.post("http://localhost:4001/unsave", {
          user_id: user._id,
          college_id: collegeId,
          course_name: courseToSave,
        });
        setMessage("Unsaved!");
        setMessageColor("red"); // Red for "Unsaved!"
      }

      setIsSaved(!isSaved);
      setTimeout(() => setMessage(""), 2000); // Hide message after 2 seconds
    } catch (error) {
      console.error("Error saving college.", error);
      setMessage("An error occurred.");
      setMessageColor("white");
    }
  };

  return (
    <div className="save-button-container">
      <button className="save-button" onClick={handleSaveClick}>
        <motion.div
          whileTap={{ scale: 1.2 }}
          animate={{ scale: isSaved ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <Bookmark
            size={32}
            stroke="white"
            fill={isSaved ? "white" : "none"}
          />
        </motion.div>
      </button>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="save-message"
          style={{ color: messageColor }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}

export default SaveButton;
