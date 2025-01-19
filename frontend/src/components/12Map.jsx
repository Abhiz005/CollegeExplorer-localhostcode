import React from "react";

function Map({ latitude, longitude }) {
  const mapUrl = `https://maps.gomaps.pro/maps/embed//place?key=AlzaSyf7STzoadEPUrQUhQW1I-h2CmTNjMelI-h&center=${latitude},${longitude}&q=${latitude},${longitude}&zoom=15`;

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
