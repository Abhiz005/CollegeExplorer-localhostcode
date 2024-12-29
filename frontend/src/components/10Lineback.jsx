import React from "react";

const Lineback = ({ courseName }) => {
  const displayCourseName = courseName === "Colleges" ? "" : courseName;

  return (
    <div className="two-lines">
      <div className="line">
        <p id="topline">
          <span className="colorful-text">{`Top ${displayCourseName} Colleges`}</span>
        </p>
      </div>
      <div className="line"></div>
    </div>
  );
};

export default Lineback;
