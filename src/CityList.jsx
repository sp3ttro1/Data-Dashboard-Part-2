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
            </tr>
          </thead>
          <tbody>
            {weatherData.map((city) => (
              <tr key={city.city_name}>
                <td>{city.city_name}</td>
                <td>{city.weather.description}</td>
                <td>{city.temp} °C</td>
                <td>{new Date(city.ob_time).toLocaleTimeString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CityList;