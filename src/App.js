import './App.css';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import store from "./store";
import HomePage from './components/homePage';
import NavBar from './components/navbar/navbar';
import LocationComponent from './components/locationPage';
import CurrentEcometrics from './components/CurrentEcometrics';
import Map from './components/Map';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/location" element={<LocationComponent />} />
          {/* <Route path="/location-based-eco-metrics" element={<LocationBasedEcoMetrics />} /> */}
          <Route path="/location-based-eco-metrics" element={<CurrentEcometrics />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
