/* Основной компонент приложения, который будет отвечать за управление состояниями и отображение прогнозов на день и ближайшие пять дней. */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CitySelector from './CitySelector';
import WeatherDisplay from './WeatherDisplay';

const App = () => {
  const [city, setCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!city) return;

      console.log("Selected city:", city);
      setLoading(true);
      setError(null);

      const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
      console.log("API Key:", apiKey);
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&exclude=minutely,hourly&appid=${apiKey}&units=metric`;

      try {
        const response = await axios.get(url);
        setWeatherData(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Ошибка загрузки данных. Попробуйте снова.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Прогноз погоды</h1>
      <CitySelector onSelectCity={setCity} />
      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weatherData && <WeatherDisplay data={weatherData} />}
    </div>
  );
};

export default App;

