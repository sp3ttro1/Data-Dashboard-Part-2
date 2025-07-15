import { useEffect, useState } from 'react';
import './App.css';
import CityList from './CityList';
import BoxStats from './BoxStats';
import SearchBar from './SearchBar';
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

  const handleDashboardClick = () => {
    setSearchResult(null);
    setView('dashboard');
  };

  const handleSearchClick = () => {
    setView('search');
  };

  return (
    <div className="layout">
      <div className="sidebar">
        <h2>WeatherDash</h2>
        <button onClick={handleDashboardClick}>Dashboard</button>
        <button onClick={handleSearchClick}>Search</button>
      </div>

      <div className="dashboard">
        <h1>🌍 World Weather Dashboard 🌍</h1>

        {view === 'dashboard' && (
          <>
            <div className="stats-box">
              <BoxStats title="Your City" value={userCity ? userCity : 'Loading...'} />
              <BoxStats title="Hottest City" value={hottest?.city_name ? `${hottest.city_name}: ${hottest.temp}°C` : 'Loading...'} />
              <BoxStats title="Coldest City" value={coldest?.city_name ? `${coldest.city_name}: ${coldest.temp}°C` : 'Loading...'} />
            </div>
            <CityList weatherData={weatherData} />
          </>
        )}

        {view === 'search' && (
          <>
            <SearchBar setSearchResult={setSearchResult} apiKey={API_KEY} />
            {searchResult && <CityList weatherData={[searchResult]} />}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
