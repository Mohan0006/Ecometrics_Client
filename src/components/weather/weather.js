import React from 'react';
import './weather.css'
import {
    Grid,
    Typography,
} from '@mui/material';

function Weather(props) {
    const {
        temperature,
        condition,
        humidity,
        windSpeed,
        windDirection,
        pressure,
        precipitation,
        cloudCover,
        visibility,
        uvIndex,
        feelsLike,
        timestamp,
        code,
        isDay,
    } = props.data;
    function getWeatherIcon(code, isDay) {
        let iconName;
        console.log(code);
        switch (code) {
            case 1000:
                iconName = 'clear';
                break;
            case 1003:
                iconName = 'partly-cloudy';
                break;
            case 1006:
                iconName = 'cloudy';
                break;
            case 1009:
                iconName = 'overcast';
                break;
            case 1030:
                iconName = 'fog';
                break;
            case 1063:
            case 1066:
            case 1069:
            case 1072:
                iconName = 'drizzle';
                break;
            case 1087:
                iconName = 'thunderstorms';
                break;
            case 1114:
            case 1117:
                iconName = 'blizzard';
                break;
            case 1135:
            case 1147:
                iconName = 'fog';
                break;
            case 1150:
            case 1153:
            case 1168:
            case 1171:
                iconName = 'rain';
                break;
            case 1180:
            case 1183:
            case 1186:
            case 1189:
            case 1192:
            case 1195:
                iconName = 'rain';
                break;
            case 1198:
            case 1201:
                iconName = 'rain';
                break;
            case 1204:
            case 1207:
                iconName = 'light-sleet';
                break;
            case 1210:
            case 1213:
            case 1216:
            case 1219:
            case 1222:
            case 1225:
                iconName = 'light-snow';
                break;
            case 1237:
                iconName = 'ice-pellets';
                break;
            case 1240:
            case 1243:
            case 1246:
                iconName = 'light-rain-shower';
                break;
            case 1249:
            case 1252:
                iconName = 'light-sleet-showers';
                break;
            case 1255:
            case 1258:
                iconName = 'light-snow-showers';
                break;
            case 1261:
            case 1264:
                iconName = 'light-showers-of-ice-pellets';
                break;
            case 1273:
            case 1276:
                iconName = 'light-rain-with-thunder';
                break;
            case 1279:
            case 1282:
                iconName = 'thunderstorms';
                break;
            default:
                iconName = 'default';
                break;
        }

        // Add day/night suffix for conditions that have both images
        if (['clear', 'partly-cloudy', 'cloudy', 'overcast', 'fog'].includes(iconName)) {
            iconName += isDay ? '-day' : '-night';
        }
        console.log(iconName);
        return `/Icons/Weather/${iconName}.svg`;
    }


    return (
        <div className="weather-container">
            <Grid container>
                <Grid item xs={12} md={4} sm={4} className="icon">
                    <h2>Weather Condition: {condition}</h2>
                    <img src={getWeatherIcon(code, isDay)} alt="Weather Condition" ></img>
                </Grid>
                <Grid item xs={12} md={8} sm={8}>
                    <Grid container>
                        <Grid item xs={6} md={3} sm={3} className="sub-icons">
                            <h2>Temperature: {temperature}°C</h2>
                            <img src="Icons/thermometer.svg" alt="Weather Condition" ></img>
                        </Grid>
                        <Grid item xs={6} md={3} sm={3}className="sub-icons" >
                            <h2>Humidity: {humidity}</h2>
                            <img src="Icons/humidity.svg" alt="Weather Condition" ></img>
                        </Grid>
                        <Grid item xs={6} md={3} sm={3} className="sub-icons">
                            <h2>Feels Like: {feelsLike}°C</h2>
                            <img src="Icons/feels.svg" alt="Weather Condition" ></img>
                        </Grid>
                        <Grid item xs={6} md={3} sm={3} className="sub-icons">
                            <h2>Pressure: {pressure}</h2>
                            <img src="Icons/barometer.svg" alt="Weather Condition" ></img>
                        </Grid>
                        <Grid item xs={6} md={3} sm={3} className="sub-icons">
                            <h2>Wind Speed: {windSpeed}</h2>
                            <img src="Icons/wind.svg" alt="Weather Condition" ></img>
                        </Grid>
                        <Grid item xs={6} md={3} sm={3} className="sub-icons">
                            <h2>Wind Direction: {windDirection}</h2>
                            <img src="Icons/compass.svg" alt="Weather Condition" ></img>
                        </Grid>
                        <Grid item xs={6} md={3} sm={3} className="sub-icons">
                            <h2>UV Index: {uvIndex}</h2>
                            <img src="Icons/uv-index.svg" alt="Weather Condition" ></img>
                        </Grid>
                        <Grid item xs={6} md={3} sm={3} className="sub-icons">
                            <h2>Precipitation: {precipitation}</h2>
                            <img src="Icons/rain.svg" alt="Weather Condition" ></img>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </div>
    );
}

export default Weather;
