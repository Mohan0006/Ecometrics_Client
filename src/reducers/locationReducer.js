import { ADD_COORDINATES } from "../actionTypes/actionTypes";

const initialState = {
  latitude: 0,
  longitude: 0,
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COORDINATES:
      return {
        ...state,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      };

    default:
      return state;
  }
};

export default locationReducer;
