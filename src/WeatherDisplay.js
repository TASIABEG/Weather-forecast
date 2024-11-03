/* Компонент для отображения погоды (на день и на 5 дней). */
import React from 'react';

const WeatherDisplay = ({ data }) => {
  const { current, daily } = data;

  // Логируем данные
  console.log(data);

  // Проверка на наличие данных
  if (!data || !current || !daily) {
    return <p>Данные о погоде недоступны.</p>;
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div>
      <h2>Погода сейчас</h2>
      <p>Температура: {current.temp}°C</p>
      <p>Погода: {current.weather[0].description}</p>
      <p>Максимальная температура: {current.temp_max}°C</p>
      <p>Минимальная температура: {current.temp_min}°C</p>

      <h2>Прогноз на ближайшие 5 дней</h2>
      {daily.slice(1, 6).map((day, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <p>
            <strong>{formatDate(day.dt)}</strong>: {day.temp.day}°C, {day.weather[0].description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default WeatherDisplay;

