import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TemperatureMap() {
  const [map, setMap] = useState(null);
  const [userMarker, setUserMarker] = useState(null);
  const [infowindow, setInfowindow] = useState(null);

  useEffect(() => {
    locate();
  }, []);

  const locate = () => {
    navigator.geolocation.getCurrentPosition(initialize, fail, { timeout: 3000 });
  };

  const initialize = (position) => {
    let currentLocation;
    if (position.coords) {
      currentLocation = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    } else {
      currentLocation = position;
    }

    const mapOptions = {
      zoom: 7,
      center: currentLocation,
      mapTypeId: window.google.maps.MapTypeId.TERRAIN,
    };

    const map = new window.google.maps.Map(document.getElementById('map'), mapOptions);

    const infowindow = new window.google.maps.InfoWindow();

    setMap(map);
    setInfowindow(infowindow);

    const userMarker = new window.google.maps.Marker({
      position: currentLocation,
      map,
    });

    setUserMarker(userMarker);

    getWeather(currentLocation);

    window.google.maps.event.addListener(map, 'click', (event) => {
      createMarker(event.latLng);
    });

    window.google.maps.event.addListener(userMarker, 'click', (evt) => {
      getWeather(evt.latLng);
    });
  };

  const createMarker = (location) => {
    if (userMarker === null) {
      const userMarker = new window.google.maps.Marker({
        position: location,
        map: map,
      });
      setUserMarker(userMarker);
      getWeather(location);
    } else {
      userMarker.setPosition(location);
      getWeather(location);
    }
  };


  const getWeather = (location) => {
    const weatherUrl = `http://localhost:4000/api/v1/weather/`;

    const latitude = location.lat();
    const longitude = location.lng();

    axios
    .get(weatherUrl, { params: { latitude, longitude } })
    .then((response) => {
      console.log(response.data);
        const currentWeather = response.data.current;
        const weatherResponse = {
            temperature: currentWeather.temp_c,
            condition: currentWeather.condition.text,
            humidity: currentWeather.humidity,
            timestamp: currentWeather.last_updated,
        };
        const localDateTime = new Date(currentWeather.last_updated);

        const infoMessage = `
          <div style={'font-weight':200}>
            Date & Time : ${localDateTime} <br/> <hr>
            City Name : <b>${response.data.location.name !== '' ? response.data.location.name : "Unknown"}</b> <br/><hr>
            Weather : <b>${weatherResponse.condition}</b><br/>
            Temperature : ${weatherResponse.temperature} &#176;C <br/>
            Humidity : ${weatherResponse.humidity} &#176;C <br/>
          </div>
        `;

        infowindow.close();
        infowindow.setContent(infoMessage);
        infowindow.open(map, userMarker);
    })
    .catch((error) => {
        console.error('Error fetching weather data:', error);
        // fail();
    });
  };
  const fail = () => {
    alert('navigator.geolocation failed, may not be supported, setting default location');
    initialize(new window.google.maps.LatLng(17.4468019, 78.3102378));
  };

  return <div id="map" style={{ height: '100vh' }}></div>;
}

export default TemperatureMap;
