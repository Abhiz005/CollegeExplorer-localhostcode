import React from "react";

function Map({ latitude, longitude }) {
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    longitude - 0.01
  }%2C${latitude - 0.01}%2C${longitude + 0.01}%2C${
    latitude + 0.01
  }&layer=mapnik&marker=${latitude}%2C${longitude}`;

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
