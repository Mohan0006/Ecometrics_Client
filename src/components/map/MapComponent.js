import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const MapComponent = () => {
    const [temperature, setTemperature] = useState(null);
    const [clickedLatLng, setClickedLatLng] = useState(null);

    const handleMapClick = async (event) => {
        const { latlng } = event;

        console.log("Click");
        // Record the latitude and longitude
        setClickedLatLng(latlng);

        try {
            // Replace with your actual weather API endpoint
            const response = await axios.get(
                `http://localhost:4000/api/v1/weather/?lattitude=${latlng.lat}&longitude=${latlng.lng}`
            );

            // Assuming the API response contains temperature information
            setTemperature(response.data.current.temp_c);
        } catch (error) {
            console.error('Error fetching temperature data:', error);
        }
    };
    return (
        <div>
            
            <MapContainer
                center={[51.505, -0.09]}
                zoom={13}
                style={{ height: '400px', width: '100%' }}
                onClick={handleMapClick}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {clickedLatLng && (
                    <Marker position={clickedLatLng}>
                        <Popup>
                            Latitude: {clickedLatLng.lat}, Longitude: {clickedLatLng.lng}
                            <br />
                            Temperature: {temperature}°C
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
};

export default MapComponent;
