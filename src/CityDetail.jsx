import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function CityDetail({ apiKey }) {
  const { city } = useParams();
  const [cityData, setCityData] = useState(null);

  useEffect(() => {
    const fetchCity = async () => {
      const res = await fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}`);
      const json = await res.json();
      setCityData(json.data[0]);
    }
    fetchCity();
  }, [city, apiKey]);

  if (!cityData) return <p>Loading...</p>;

  return (
    <div className="detail-view">
      <h2>Weather Details: {cityData.city_name}</h2>
      <p>Temperature: {cityData.temp}°C</p>
      <p>Weather: {cityData.weather.description}</p>
      <p>Humidity: {cityData.rh}%</p>
      <p>Wind Speed: {cityData.wind_spd} m/s</p>
      <p>Pressure: {cityData.pres} mb</p>
    </div>
  );
}

export default CityDetail;