import { combineReducers } from 'redux';
import locationReducer from './locationReducer';
import modeReducer from './modeReducer';
import airReducer from './airReducer';
import weatherReducer from './weatherReducer';

const rootReducer = combineReducers({
    locationReducer,
    modeReducer,
    airReducer,
    weatherReducer, 
  });
  
  export default rootReducer;