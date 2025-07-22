import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import CityList from './CityList';
import BoxStats from './BoxStats';
import SearchBar from './SearchBar';
import CityDetail from './CityDetail';
import ChartSection from './ChartSection';
import majorCities from './cities';

const API_KEY = "b524914287514b9e87023f7687023770";

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [userCity, setUserCity] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [view, setView] = useState('dashboard');

  useEffect(() => {
    const fetchMajorCitiesWeather = async () => {
      const data = await Promise.all(majorCities.map(async (city) => {
        const res = await fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${API_KEY}`);
        const json = await res.json();
        return json.data[0];
      }));
      setWeatherData(data);
    };

    const fetchUserCity = async () => {
      try {
        const ipRes = await fetch('https://ipapi.co/json/');
        const ipData = await ipRes.json();
        const city = ipData.city;
        setUserCity(city);
      } catch {
        setUserCity('Unavailable');
      }
    };

    fetchUserCity();
    fetchMajorCitiesWeather();
  }, []);

  const hottest = weatherData.reduce((prev, curr) => (curr.temp > prev.temp ? curr : prev), weatherData[0] || {});
  const coldest = weatherData.reduce((prev, curr) => (curr.temp < prev.temp ? curr : prev), weatherData[0] || {});

  return (
    <Router>
      <div className="layout">
        <div className="sidebar">
          <h2>WeatherDash</h2>
          <Link to="/">Dashboard</Link>
          <Link to="/search">Search</Link>
        </div>
        <div className="dashboard">
          <Routes>
            <Route path="/" element={
              <>
                <h1>🌍 World Weather Dashboard 🌍</h1>
                <div className="stats-box">
                  <BoxStats title="Your City" value={userCity ? userCity : 'Loading...'} />
                  <BoxStats title="Hottest City" value={hottest?.city_name ? `${hottest.city_name}: ${hottest.temp}°C` : 'Loading...'} />
                  <BoxStats title="Coldest City" value={coldest?.city_name ? `${coldest.city_name}: ${coldest.temp}°C` : 'Loading...'} />
                </div>
                <div className="main-section">
                  <CityList weatherData={weatherData} />
                  <ChartSection weatherData={weatherData} />
                </div>
              </>
            } />
            <Route path="/search" element={
              <>
                <SearchBar setSearchResult={setSearchResult} apiKey={API_KEY} />
                {searchResult && <CityList weatherData={[searchResult]} />} 
              </>
            } />
            <Route path="/detail/:city" element={<CityDetail apiKey={API_KEY} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
