import { TOGGLE_MODE } from "../actionTypes/actionTypes";

const initialState = {
  darkMode: false,
};

const modeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MODE:
      return {
        ...state,
        darkMode: !state.darkMode,
      };

    default:
      return state;
  }
};

export default modeReducer;
