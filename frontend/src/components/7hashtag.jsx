import React from "react";

const NumberBadge = ({ number }) => {
  return (
    <div className="number-badge">
      <div className="starburst">
        <span>#{number}</span>
      </div>
    </div>
  );
};

export default NumberBadge;
