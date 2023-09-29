const initialState = {
    airQualityIndex: null,
    co: null,
    no: null,
    no2: null,
    o3: null,
    so2: null,
    pm2_5: null,
    pm10: null,
    nh3: null,
    timestamp: null,
};

const airReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AIR_DATA':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export default airReducer;
