import React, {useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLocation } from '../actions/locationAction';
import { useNavigate } from 'react-router-dom';

function LocationComponent() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.locationReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch(addLocation(
            position.coords.latitude,
            position.coords.longitude
          ));
          navigate('/location-based-eco-metrics');
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <div>
      {state.latitude && state.longitude ? (
        <p>
          Latitude: {state.latitude}, Longitude: {state.longitude}
        </p>
      ) : (
        <p>Please enable your location to get instant weather updates...</p>
      )}
    </div>
  );
}

export default LocationComponent;
