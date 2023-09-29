import React from 'react';
import './air.css';
import {
    Grid,
} from '@mui/material';

function Air(data) {
    const {
        airQualityIndex,
        co,
        no2,
        o3,
        so2,
        pm2_5,
        pm10,
        nh3,
        timestamp
    } = data.data;

    // Define data for pollutants
    const pollutants = [
        { name: 'CO', value: co },
        { name: 'NO2', value: no2 },
        { name: 'O3', value: o3 },
        { name: 'SO2', value: so2 },
        { name: 'PM2.5', value: pm2_5 },
        { name: 'PM10', value: pm10 },
        { name: 'NH3', value: nh3 }
    ];

    function getAirQualityText() {
        switch (airQualityIndex) {
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

    return (
        <div className="air-container">
            <Grid container>
                <Grid item sm={12} md={6} xs={12} id="air-quality-grid">
                    <img src="/Icons/air-quality-sensor.gif" alt="air-quality" />
                    <h2>Air Quality: {getAirQualityText()}</h2>
                </Grid>
                <Grid item sm={12} md={6} xs={12}>
                    <table className="pollutant-table">
                        <thead>
                            <tr>
                                <th>Pollutant</th>
                                <th>Value (Concentration in μg/m3)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pollutants.map((pollutant, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                    <td className="pollutant-cell">{pollutant.name}</td>
                                    <td>{pollutant.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Grid>
            </Grid>

        </div>
    );
}

export default Air;
