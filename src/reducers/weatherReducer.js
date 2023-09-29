const initialState = {
    temperature : null,
    condition : null,
    windSpeed : null,
    windDirection : null,
    humidity : null,
    timestamp : null,
    pressure : null,
    precipitation : null,
    cloudCover : null,
    visibility : null,
    uvIndex : null,
    feelsLike : null
};


const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_WEATHER_DATA':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export default weatherReducer;
