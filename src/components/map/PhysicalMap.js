import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Tooltip } from "react-leaflet"; // Import Tooltip from react-leaflet
import "./PhysicalMap.css";

function PhysicalMap() {
  const markers = [
    {
      name: "Rocky Mountains",
      position: [40, -105],
    },
    {
      name: "Great Lakes",
      position: [45, -85],
    },
    // Add more markers for other features as needed
  ];

  return (
    <div className="physical-map">
      <MapContainer
        center={[40, -95]} // Adjust the initial map center (latitude and longitude)
        zoom={4} // Adjust the initial zoom level
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map((marker, index) => (
          <Marker position={marker.position} key={index}>
            <Tooltip>{marker.name}</Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default PhysicalMap;
