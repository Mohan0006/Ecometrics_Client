import { ADD_COORDINATES } from "../actionTypes/actionTypes";

const addLocation = (latitude, longitude) => {
    return {
        type: ADD_COORDINATES,
        payload: {
            latitude,
            longitude
        }
    };
}

export { addLocation };