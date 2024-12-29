import React from "react";

function FeedBack() {
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
        <form className="feedback-form">
          <label htmlFor="name">NAME:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            required
          />

          <label htmlFor="collegeName">COLLEGE NAME:</label>
          <input
            type="text"
            id="collegeName"
            name="collegeName"
            placeholder="Your College Name"
            required
          />

          <label htmlFor="note">NOTE:</label>
          <textarea
            id="note"
            name="note"
            placeholder="Your feedback or suggestion..."
            required
          ></textarea>

          <label htmlFor="email">Your Email id:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email Address"
            required
          />

          <div className="feedback-button-container">
            <button className="feedback-button">SEND</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FeedBack;
