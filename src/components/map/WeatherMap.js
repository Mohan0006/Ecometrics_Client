import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import './MapStyles.css'
function WeatherMap() {
  const [map, setMap] = useState(null); // State to store the map instance
  const [markerGroup, setMarkerGroup] = useState(null); // State to store the marker layer group

  useEffect(() => {
    if (!map) {
      // Initialize the map only once
      const newMap = L.map("map").setView([13.5566525, 80.0250859], 13);

      // Create a marker layer group
      const newMarkerGroup = L.layerGroup().addTo(newMap);

      newMap.on("click", async function (e) {
        const latlng = e.latlng;

        try {
          const response = await axios.get(
            `https://ecometrics-server.onrender.com/api/v1/weather/?latitude=${latlng.lat}&longitude=${latlng.lng}`
          );

          const currentWeather = response.data.current;
          const weatherResponse = {
            temperature: currentWeather.temp_c,
            condition: currentWeather.condition.text,
            humidity: currentWeather.humidity,
            timestamp: currentWeather.last_updated,
          };
          const localDateTime = new Date(currentWeather.last_updated);

          const message = `
            <div style="font-weight: 200;">
              Date & Time : ${localDateTime} <br/> <hr>
              City Name : <b>${response.data.location.name !== '' ? response.data.location.name : "Unknown"}</b> <br/><hr>
              Weather : <b>${weatherResponse.condition}</b><br/>
              Temperature : ${weatherResponse.temperature} &#176;C <br/>
              Humidity : ${weatherResponse.humidity} &#176;C <br/>
            </div>
          `;

          // Clear previous markers
          newMarkerGroup.clearLayers();

          // Create a custom icon using a red marker
          const customIcon = L.divIcon({
            className: "leaflet-div-icon",
            html: `<div style="color: red;"><i class="fa-fw fas fa-map-marker"></i></div>`,
          });

          // Create a marker at the clicked location and bind the popup with the message
          const marker = L.marker(latlng, { icon: customIcon }).addTo(newMarkerGroup);
          marker.bindPopup(message).openPopup();
        } catch (error) {
          // Clear previous markers
          newMarkerGroup.clearLayers();
          // Create a custom icon using a red marker
          const customIcon = L.divIcon({
            className: "leaflet-div-icon",
            html: `<div style="color: red;"><i class="fa-fw fas fa-map-marker"></i></div>`,
          });
          const marker = L.marker(latlng, { icon: customIcon }).addTo(newMarkerGroup);
          marker.bindPopup("Data Unavailable").openPopup();
          console.error("Error fetching weather data:", error);
        }
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(newMap);

      // Store the map and marker group instances in the state
      setMap(newMap);
      setMarkerGroup(newMarkerGroup);
    }
  }, [map]);

  return (
    <div className="map">
      <h2>WeatherSpotter Map: <h6>(Click on any point on the map to get weather updates at that location)</h6></h2>
      <div id="map"></div>
    </div>
  );
}

export default WeatherMap;
