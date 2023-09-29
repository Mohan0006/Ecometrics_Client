import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useSelector, useDispatch } from "react-redux";
import { toggleMode } from '../../actions/modeActions';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const state = useSelector((state) => state.modeReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDarkModeToggle = () => {
        dispatch(toggleMode());
    };

    const handleLocation = () => {
        navigate('/location');
    };

    // Define the semi-transparent background color
    const backgroundColor = state.darkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(217, 167, 134, 0.8)';

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: backgroundColor,
                color: 'white', // Text color remains white in both modes
            }}
        >
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="home" onClick={() => {navigate('/')}}>
                    <HomeIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Ecometrics
                </Typography>
                <IconButton
                    edge="end" 
                    color="inherit"
                    aria-label="weather"
                    onClick={handleLocation}
                >
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    </Typography>
                    <LocationOnIcon/>
                </IconButton>
                <IconButton
                    color="inherit"
                    aria-label="dark-light-toggle"
                    onClick={handleDarkModeToggle}
                    sx={{ marginLeft: 3 }}
                >
                    {state.darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
                <Switch
                    checked={state.darkMode}
                    onChange={handleDarkModeToggle}
                    color="default"
                />
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
