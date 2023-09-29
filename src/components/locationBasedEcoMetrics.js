import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  useMediaQuery,
} from '@mui/material';
import { setAirData } from '../actions/airActions';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import './LocationBasedEcoMetrics.css'; // Import the CSS file where you define the hover effect class
import { setWeatherData } from '../actions/weatherActions';

function LocationBasedEcoMetrics() {
  const dispatch = useDispatch();
  const latitude = useSelector((state) => state.locationReducer.latitude);
  const longitude = useSelector((state) => state.locationReducer.longitude);
  const darkMode = useSelector((state) => state.modeReducer.darkMode);
  const airData = useSelector((state) => state.airReducer);
  const weatherData = useSelector((state) => state.weatherReducer);

  const isSmScreen = useMediaQuery('(max-width:600px)');

  // Make an API call to your backend when the component mounts
  useEffect(() => {
    const weatherUrl = `http://localhost:4000/api/v1/weather/`;
    const airUrl = `http://localhost:4000/api/v1/air/`;
    const airResponse = {};
    const weatherResponse = {};

    axios
      .get(airUrl, { params: { latitude, longitude } })
      .then((response) => {
        airResponse.airQualityIndex = response.data.main.aqi;
        airResponse.co = response.data.components.co;
        airResponse.no = response.data.components.no;
        airResponse.no2 = response.data.components.no2;
        airResponse.o3 = response.data.components.o3;
        airResponse.so2 = response.data.components.so2;
        airResponse.pm2_5 = response.data.components.pm2_5;
        airResponse.pm10 = response.data.components.pm10;
        airResponse.nh3 = response.data.components.nh3;
        airResponse.timestamp = response.data.dt;
        dispatch(setAirData(airResponse));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    axios
      .get(weatherUrl, { params: { latitude, longitude } })
      .then((response) => {
        console.log(response.data.current);
        weatherResponse.temperature = response.data.current.temp_c;
        weatherResponse.condition = response.data.current.condition.text;
        weatherResponse.windSpeed = response.data.current.wind_kph;
        weatherResponse.windDirection = response.data.current.wind_dir;
        weatherResponse.humidity = response.data.current.humidity;
        weatherResponse.timestamp = response.data.current.last_updated;
        weatherResponse.pressure = response.data.current.pressure_mb;
        weatherResponse.precipitation = response.data.current.precip_mm;
        weatherResponse.cloudCover = response.data.current.cloud;
        weatherResponse.visibility = response.data.current.vis_km;
        weatherResponse.uvIndex = response.data.current.uv;
        weatherResponse.feelsLike = response.data.current.feelslike_c;
        dispatch(setWeatherData(weatherResponse));
      })
  }, [latitude, longitude, dispatch]);

  // Define an array of air quality metrics to render on the left
  const airQualityMetrics = [
    { label: 'Air Quality Index', value: airData.airQualityIndex },
    { label: 'CO', value: airData.co },
    { label: 'NO2', value: airData.no2 },
    { label: 'O3', value: airData.o3 },
    { label: 'SO2', value: airData.so2 },
    { label: 'PM2.5', value: airData.pm2_5 },
    { label: 'PM10', value: airData.pm10 },
    { label: 'NH3', value: airData.nh3 },
  ];

  // Define an array of weather metrics to render on the right
  const weatherMetrics = [
    { label: 'Temperature', value: weatherData.temperature },
    { label: 'Condition', value: weatherData.condition },
    { label: 'Wind Speed', value: weatherData.windSpeed },
    { label: 'Wind Direction', value: weatherData.windDirection },
    { label: 'Humidity', value: weatherData.humidity },
    { label: 'Pressure', value: weatherData.pressure },
    { label: 'Precipitation', value: weatherData.precipitation },
    { label: 'Cloud Cover', value: weatherData.cloudCover },
    { label: 'Visibility', value: weatherData.visibility },
    { label: 'UV Index', value: weatherData.uvIndex },
    { label: 'Feels Like', value: weatherData.feelsLike },
  ];

  const headingStyle = {
    backgroundColor: darkMode ? '#333' : '#3f51b5',
    color: darkMode ? 'white' : '#fff',
    padding: '16px',
    borderRadius: '4px',
    marginBottom: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10px',
    transition: 'background-color 0.2s, color 0.2s',
  };

  const cardStyle = {
    padding: '16px',
    textAlign: 'left', // Align left for air quality metrics
    color: darkMode ? 'white' : 'black',
    backgroundColor: darkMode ? 'black' : 'white',
    boxShadow: darkMode
      ? '0px 0px 8px rgba(255, 0, 0, 0.1)'
      : '0px 0px 4px rgba(0, 0, 0, 0.1)',
    margin: '8px', // Reduced margin between cards
    cursor: 'pointer',
  };

  return (
    <div>
      <Grid container spacing={isSmScreen ? 2 : 3}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Paper style={{ ...headingStyle, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h5" style={{ fontWeight: 'bold' }}>
              Air Metrics ☁️
            </Typography>
            <IconButton component={Link} to="/past-trends" >
              📈
            </IconButton>
          </Paper>
          <Grid container spacing={isSmScreen ? 2 : 3}>
            {airQualityMetrics.map((metric, index) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                <Card
                  className="card" // Add the "card" class for hover effect
                  style={cardStyle}
                >
                  <CardContent>
                    <Typography variant="h6">{metric.label}</Typography>
                    <p>{metric.value}</p>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Paper style={{ ...headingStyle, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h5" style={{ fontWeight: 'bold' }}>
              Weather Metrics ☁️


            </Typography>
            <IconButton component={Link} to="/past-trends" >
              📈
            </IconButton>
          </Paper>
          <Grid container spacing={isSmScreen ? 2 : 3}>
            {weatherMetrics.map((metric, index) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                <Card
                  className="card" // Add the "card" class for hover effect
                  style={cardStyle}
                >
                  <CardContent>
                    <Typography variant="h6">{metric.label}</Typography>
                    <p>{metric.value}</p>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default LocationBasedEcoMetrics;
