/* Компонент для выбора города. */
import React from 'react';
import Select from 'react-select';

const cities = [
  { value: 'moscow', label: 'Москва', lat: 55.7558, lon: 37.6173 },
  { value: 'london', label: 'Лондон', lat: 51.5074, lon: -0.1278 },
  // Можно добавить другие города
];

const CitySelector = ({ onSelectCity }) => {
  const handleCityChange = (selectedCity) => {
    onSelectCity(selectedCity ? { ...selectedCity } : null);
  };

  return (
    <Select
      options={cities}
      onChange={handleCityChange}
      placeholder="Выберите город"
      isClearable
      styles={{
        control: (base) => ({
          ...base,
          width: '300px',
          margin: '0 auto',
          borderColor: '#ccc',
          boxShadow: 'none',
          '&:hover': {
            borderColor: '#aaa',
          },
        }),
      }}
    />
  );
};

export default CitySelector;