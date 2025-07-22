import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from 'recharts';

function ChartSection({ weatherData }) {
  const tempData = weatherData.map(city => ({ name: city.city_name, temp: city.temp }));
  const humidityData = weatherData.map(city => ({ name: city.city_name, humidity: city.rh }));

  return (
    <div className="charts">
      <h2>Charts</h2>
      <div className="chart-box">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={tempData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temp" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-box">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={humidityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="humidity" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ChartSection;