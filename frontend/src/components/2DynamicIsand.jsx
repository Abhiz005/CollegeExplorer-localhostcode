import React, { useEffect, useState } from "react";

const DynamicIsland = () => {
  const [message, setMessage] = useState(
    "FOR THE LATEST FEES AND SAVINGS TOOLS, PLEASE LOGIN"
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 420) {
        setMessage("FOR LATEST FEE PLEASE LOGIN");
      } else {
        setMessage("FOR THE LATEST FEES AND SAVINGS TOOLS, PLEASE LOGIN");
      }
    };

    // Set the initial message based on the screen size
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const dynamicIsland = document.getElementById("dynamicIsland");
    setTimeout(() => {
      dynamicIsland.classList.add("show");
    }, 300); // wait for 0.3s before showing the popup

    setTimeout(() => {
      dynamicIsland.classList.replace("show", "hide");
    }, 4500); // show the popup for 4.5s then start closing animation
  }, []);

  return (
    <div className="pop">
      <div id="dynamicIsland" className="dynamic-island">
        {message}
      </div>
    </div>
  );
};

export default DynamicIsland;
