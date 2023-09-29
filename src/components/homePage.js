import React from 'react';
import { useSelector } from 'react-redux';  // Assuming you're using Redux for state management
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import './homePage.css';
import WeatherMap from './map/WeatherMap';
import AirQualityMap from './map/AirQualityMap';
import Map from './Map';
function HomePage() {
    const darkMode = useSelector(state => state.modeReducer.darkMode);  // Replace with your actual state
    
    if (darkMode) {
        document.body.classList.add('dark-background');
        document.body.classList.remove('light-background');
      } else {
        document.body.classList.add('light-background');
        document.body.classList.remove('dark-background');
      }

    const cardBgColor = darkMode ?'rgba(41, 41, 41, 0.3)' : 'rgba(245, 245, 245, 0.8)';
    const textColor = darkMode ? '#fff' : '#000';
    const boxBgColor = 'transparent'
    return (
        <Box sx={{ marginTop: 1, padding: 3, backgroundColor: boxBgColor }}>

            <Typography variant="h6" color={textColor}>
                Ecometrics offers real-time air quality and weather insights for your location. Understand trends, make informed choices, and stay connected to your environment with ease. Breathe better, live smarter with Ecometrics.

            </Typography>
            <Grid container spacing={3} sx={{ marginTop: 3 }} >
                {/* Graph Cards */}
                <Grid item xs={12} md={12}>
                    <Card sx={{ backgroundColor: cardBgColor }} >
                        <CardContent>   
                            <Typography variant="h6" color={textColor}>
                                <Map/>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Card sx={{ backgroundColor: cardBgColor }} id="weather-map">
                        <CardContent>
                            <Typography variant="h6" color={textColor}>
                                <WeatherMap />
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Card sx={{ backgroundColor: cardBgColor }}>
                        <CardContent>
                            <Typography variant="h6" color={textColor}>
                                <AirQualityMap/>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                
            </Grid>
        </Box>
    );
}

export default HomePage;
