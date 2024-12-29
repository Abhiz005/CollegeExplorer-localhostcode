import React from "react";

const Info = ({ name, location, fees }) => {
  return (
    <div className="infobox">
      <div className="head">
        <p>{name}</p>
      </div>
      <div className="content">
        <div className="location">
          <span className="label">Location -</span>
          <span className="value">{location}</span>
        </div>
        <div className="fee-section">
          <div className="fee">
            <p>Fee</p>
            <p>(Updated 1 years ago)</p>
          </div>
          <div className="fee-values">
            {fees.map((fee, idx) => (
              <p key={idx}>{fee}/-</p>
            ))}
          </div>
          <div className="fee-years">
            <p>1st year</p>
            <p>2nd year</p>
            <p>3rd year</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
