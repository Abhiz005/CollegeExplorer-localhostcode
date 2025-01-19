import React, { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast"; // Import toast and Toaster from react-hot-toast

function FeedBack() {
  const [formData, setFormData] = useState({
    name: "",
    collegeName: "",
    note: "",
    email: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Extract form data from input fields
    const name = event.target.name.value;
    const collegeName = event.target.collegeName.value;
    const note = event.target.note.value;
    const email = event.target.email.value;

    const formData = {
      name,
      collegeName,
      note,
      email,
    };

    try {
      // Send feedback to the backend
      const response = await axios.post(
        "http://localhost:4001/college/feedback",
        formData
      );

      if (response.data.success) {
        // Show success toast with a faster duration (e.g., 1500ms)
        toast.success("Feedback sent successfully!", {
          duration: 1500, // Short duration for quick pop-up
          position: "top-center", // Optional: position at the top-center
          style: { backgroundColor: "#4caf50", color: "white" }, // Optional: custom style
        });
      } else {
        // Show error toast with a faster duration
        toast.error(
          response.data.message ||
            "Error sending feedback. Please try again later.",
          {
            duration: 1500,
            position: "top-center",
            style: { backgroundColor: "#f44336", color: "white" },
          }
        );
      }
    } catch (error) {
      console.error("Error sending feedback:", error);
      // Show error toast notification if there's an error during request
      toast.error("Error sending feedback. Please try again later.", {
        duration: 1500,
        position: "top-center",
        style: { backgroundColor: "#f44336", color: "white" },
      });
    }
  };

  return (
    <div>
      <div className="line-container">
        <span className="labelline" id="feedback">
          FeedBack
        </span>
        <div className="line-with-bend"></div>
      </div>
      <div className="feedback-container">
        <h2>FeedBack</h2>
        <p className="feedback-subtitle">
          [YOU CAN GIVE YOUR COLLEGE REVIEW OR ANY SUGGESTIONS FOR IMPROVEMENT
          ON THE WEBSITE. WE WILL SURELY REVIEW IT!!]
        </p>
        <form className="feedback-form" onSubmit={handleSubmit}>
          <label htmlFor="name">NAME:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="collegeName">COLLEGE NAME:</label>
          <input
            type="text"
            id="collegeName"
            name="collegeName"
            placeholder="Your College Name"
            value={formData.collegeName}
            onChange={handleChange}
            required
          />

          <label htmlFor="note">NOTE:</label>
          <textarea
            id="note"
            name="note"
            placeholder="Your feedback or suggestion..."
            value={formData.note}
            onChange={handleChange}
            required
          ></textarea>

          <label htmlFor="email">Your Email id:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="feedback-button-container">
            <button type="submit" className="feedback-button">
              SEND
            </button>
          </div>
        </form>
      </div>

      {/* Add Toaster for displaying toasts */}
      <Toaster />
    </div>
  );
}

export default FeedBack;
