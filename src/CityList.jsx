import { Link } from "react-router-dom";

function CityList({ weatherData }) {
  return (
    <div className="city-section">
      <h2>Major Cities Weather</h2>
      <div className="city-box">
        <table>
          <thead>
            <tr>
              <th>City</th>
              <th>Weather</th>
              <th>Temp</th>
              <th>Local Time</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {weatherData.map((city) => (
              <tr key={city.city_name}>
                <td>{city.city_name}</td>
                <td>{city.weather.description}</td>
                <td>{city.temp} °C</td>
                <td>{new Date(city.ob_time).toLocaleTimeString()}</td>
                <td>
                  <Link to={`/detail/${city.city_name}`} style={{ textDecoration: 'none', color: 'blue' }}>🔎</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CityList;