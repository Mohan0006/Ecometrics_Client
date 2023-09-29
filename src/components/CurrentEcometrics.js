import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setAirData } from '../actions/airActions';
import { toggleMode } from '../actions/modeActions';
import './styles.css';  
import { setWeatherData } from '../actions/weatherActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faSun } from '@fortawesome/free-solid-svg-icons';
import {
    Grid,
    Typography,
} from '@mui/material'; // You can change the icon as needed
import Weather from './weather/weather';
import Air from './air/air';
import { useNavigate } from 'react-router-dom';
import ActivitySuggestion from './activity/activitySuggestion';

function CurrentEcometrics() {
    const dispatch = useDispatch();
    const latitude = useSelector((state) => state.locationReducer.latitude);
    const longitude = useSelector((state) => state.locationReducer.longitude);
    const darkMode = useSelector((state) => state.modeReducer.darkMode);
    const airData = useSelector((state) => state.airReducer);
    const weatherData = useSelector((state) => state.weatherReducer);
    
    const [activities,setActivities] = useState([]);   
    
      
    const navigate = useNavigate();

    const [localTime, setLocalTime] = useState('');
    const [cityName, setCityName] = useState('');
    const [cityCode, setCityCode] = useState('');
    const [localDate, setLocalDate] = useState('');

    if (darkMode) {
        document.body.classList.add('dark-background');
        document.body.classList.remove('light-background');
    } else {
        document.body.classList.add('light-background');
        document.body.classList.remove('dark-background');
    }
    
    function categorizeWindSpeed(windSpeedKmph) {
        if (windSpeedKmph < 5) {
          return 0;
        } else if (windSpeedKmph < 20) {
          return 1;
        } else if (windSpeedKmph < 40) {
          return 2;
        } else {
          return 3;
        }
      }
    
      function getConditionNumber(weatherCode) {
        let conditionNumber;
      
        switch (weatherCode) {
          case 1000:
            conditionNumber = 0; // Sunny
            break;
          case 1003:
            conditionNumber = 1; // Partly Cloudy
            break;
          case 1006:
          case 1009:
            conditionNumber = 2; // Cloudy or Overcast
            break;
          case 1030:
          case 1135:
          case 1147:
            conditionNumber = 3; // Foggy
            break;
          case 1210:
          case 1213:
          case 1216:
          case 1219:
          case 1222:
          case 1225:
          case 1255:
          case 1258:
            conditionNumber = 4; // Snowy
            break;
          case 1063:
          case 1066:
          case 1069:
          case 1072:
          case 1150:
          case 1153:
          case 1168:
          case 1171:
          case 1180:
          case 1183:
          case 1186:
          case 1189:
          case 1192:
          case 1195:
          case 1198:
          case 1201:
          case 1204:
          case 1207:
          case 1237:
          case 1240:
          case 1243:
          case 1246:
          case 1249:
          case 1252:
          case 1261:
          case 1264:
          case 1273:
          case 1276:
          case 1279:
          case 1282:
            conditionNumber = 2; // Rainy
            break;
          case 1087:
            conditionNumber = 2; // Thunderstorms
            break;
          case 1114:
          case 1117:
            conditionNumber = 4; // Blizzard
            break;
          default:
            conditionNumber = 4; // Default condition for unknown codes
            break;
        }
      
        return conditionNumber;
      }

    function getDateTime(utcTime) {
        // Parse the UTC time (assuming it's in a format like 'HH:mm:ss')
        const [hours, minutes, seconds] = utcTime.split(':').map(Number);
        const currentTimeUTC = new Date();
        currentTimeUTC.setUTCHours(hours, minutes, seconds);

        // Define threshold times for day and night in UTC
        const dayStartTimeUTC = new Date();
        dayStartTimeUTC.setUTCHours(6, 0, 0);
        const nightStartTimeUTC = new Date();
        nightStartTimeUTC.setUTCHours(18, 0, 0);
    }
    useEffect(() => {
        const weatherUrl = `https://ecometrics-server.onrender.com/api/v1/weather/`;
        const weatherForecastUrl = `https://ecometrics-server.onrender.com/api/v1/weather/forecast/`;
        const airUrl = `https://ecometrics-server.onrender.com/api/v1/air/`;
        const activityUrl = `https://dl-model-server.onrender.com/predict/`;
    
        // Create an array of promises for all the GET requests
        const getRequests = [
            axios.get(airUrl, { params: { latitude, longitude } }),
            axios.get(weatherForecastUrl, { params: { latitude, longitude } }),
            axios.get(weatherUrl, { params: { latitude, longitude } }),
        ];
    
        // Use Promise.all to wait for all GET requests to complete
        Promise.all(getRequests)
            .then((responses) => {
                // Destructure the responses
                const [airResponse, weatherForecastResponse, weatherResponse] = responses;
    
                const airData = {
                    airQualityIndex: airResponse.data.main.aqi,
                    co: airResponse.data.components.co,
                    no2: airResponse.data.components.no2,
                    o3: airResponse.data.components.o3,
                    so2: airResponse.data.components.so2,
                    pm2_5: airResponse.data.components.pm2_5,
                    pm10: airResponse.data.components.pm10,
                    nh3: airResponse.data.components.nh3,
                    timestamp: airResponse.data.dt,
                };
    
                dispatch(setAirData(airData));
    
                console.log(weatherForecastResponse.data);
    
                const currentWeather = weatherResponse.data.current;
                const weatherData = {
                    temperature: currentWeather.temp_c,
                    condition: currentWeather.condition.text,
                    windSpeed: currentWeather.wind_kph,
                    windDirection: currentWeather.wind_dir,
                    humidity: currentWeather.humidity,
                    timestamp: currentWeather.last_updated,
                    pressure: currentWeather.pressure_mb,
                    precipitation: currentWeather.precip_mm,
                    cloudCover: currentWeather.cloud,
                    visibility: currentWeather.vis_km,
                    uvIndex: currentWeather.uv,
                    feelsLike: currentWeather.feelslike_c,
                    code: currentWeather.condition.code,
                    isDay: currentWeather.is_day,
                };
    
                dispatch(setWeatherData(weatherData));
                getDateTime(weatherData.timestamp);
    
                // if ((weatherData.isDay === false || weatherData.isDay === 0) && darkMode === false) {
                //     dispatch(toggleMode());
                // }
    
                // Set local date and time
                const localDateTime = new Date(currentWeather.last_updated);
                setLocalDate(localDateTime.toLocaleDateString());
                setLocalTime(localDateTime.toLocaleTimeString());
                setCityName(weatherResponse.data.location.name);
                setCityCode(weatherResponse.data.location.region);

                const activityBody = {
                    data: [
                        [weatherData.temperature],
                        [weatherData.humidity],
                        [weatherData.precipitation],
                        [categorizeWindSpeed(weatherData.windSpeed)],
                        [getConditionNumber(weatherData.code)],
                    ],
                };
    
                const headers = {
                    'Content-Type': 'application/json',
                };
                
                axios
                    .post(activityUrl, activityBody, { headers: headers }) // Pass the URL, body, and headers in the configuration object
                    .then((response) => {
                        console.log(response.data);
                        setActivities(response.data);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [latitude, longitude, dispatch, darkMode]);
    

    return (
        <div>

            <Grid container className="location-refresh">
                <Grid item xs={12} md={12}  sm={12} id={darkMode ? 'current-weather-dark' : 'current-weather-light'}>
                    <Grid container>
                        <Grid item xs={12} md={8} sm={8}>
                            <h5>{cityName}, {cityCode}</h5>
                            <h5>{localDate}</h5>
                            <h5>{localTime} (last updated)</h5>

                        </Grid>
                        <Grid item xs={12} md={4} sm={4} id="refresh">
                            <a href="#" onClick={() => navigate('/location')}>
                                Refresh <FontAwesomeIcon icon={faSyncAlt} />
                            </a>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>


            <Grid container >
                <Grid item xs={12} sm={12} md={12} lg={12} >
                    <Weather data={weatherData} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Air data={airData} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <ActivitySuggestion data = {activities}/>
                </Grid>
            </Grid>





        </div>

    );
}

export default CurrentEcometrics;
