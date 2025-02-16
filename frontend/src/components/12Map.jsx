import React from "react";

function Map({ latitude, longitude }) {
  const mapUrl = `https://maps.gomaps.pro/maps/embed/v1/place?key=AlzaSyybNflaefCxAn6q9mk4oR3imS0YJ-gp36D&center=${latitude},${longitude}&q=${latitude},${longitude}&zoom=15`;

  return (
    <div>
      <div className="line-container">
        <div className="Map-margin">
          <span className="labelline" id="map">
            Map
          </span>
        </div>
        <div className="line-with-bend"></div>
      </div>
      <div className="Map-container">
        <iframe
          src={mapUrl}
          width="100%"
          height="580"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="GoMap"
        ></iframe>
      </div>
    </div>
  );
}

export default Map;
