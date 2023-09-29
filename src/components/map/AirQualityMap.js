import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import './MapStyles.css'
function AirQualityMap() {
    const [map, setMap] = useState(null); // State to store the map instance
    const [markerGroup, setMarkerGroup] = useState(null); // State to store the marker layer group
    
    function getAirQualityText(aqi) {
        switch (aqi) {
            case 1:
                return 'Good';
            case 2:
                return 'Fair';
            case 3:
                return 'Moderate';
            case 4:
                return 'Poor';
            case 5:
                return 'Very Poor';
            default:
                return 'Unknown';
        }
    }

    useEffect(() => {
        if (!map) {
            // Initialize the map only once
            const newMap = L.map("air-map").setView([13.5566525, 80.0250859], 13);

            // Create a marker layer group
            const newMarkerGroup = L.layerGroup().addTo(newMap);

            newMap.on("click", async function (e) {
                const latlng = e.latlng;

                try {
                    const response = await axios.get(
                        `https://ecometrics-server.onrender.com/api/v1/air/?latitude=${latlng.lat}&longitude=${latlng.lng}`
                    );

                    const data = response.data;
                    const airData = {
                        aqi: data.main.aqi,
                        co: response.data.components.co,
                        no2: response.data.components.no2,
                        o3: response.data.components.o3,
                        so2: response.data.components.so2,
                        pm2_5: response.data.components.pm2_5,
                        pm10: response.data.components.pm10,
                        nh3: response.data.components.nh3,
                        timestamp: response.data.dt,
                    };

                    const localDateTime = new Date(response.data.dt);

                    const message = `
                <div style="font-weight: 200;">
                    Air Quality: <b>${getAirQualityText(airData.aqi)}</b><br /><hr />
                    CO: ${airData.co}<br />
                    NO2: ${airData.no2}<br />
                    O3: ${airData.o3}<br />
                    SO2: ${airData.so2}<br />
                    PM2.5: ${airData.pm2_5}<br />
                    PM10: ${airData.pm10}<br />
                    NH3: ${airData.nh3}<br />
                </div>`;

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
                    console.error("Error fetching air quality data:", error);
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
            <h2>Air Quality: <h6>(Click on any point on the map to get weather updates at that location)</h6></h2>
            <div id="air-map"></div>
        </div>
    );
}

export default AirQualityMap;
