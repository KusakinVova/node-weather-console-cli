import { getKeyValue } from './storage.service.js';
import { DICTIONARY } from './dictionary.js';
import axios from 'axios';

const getIcon = (icon) => {
  switch (icon.slice(0, -1)) {
    case '01':
      return '☀️';
    case '02':
      return '🌤️';
    case '03':
      return '☁️';
    case '04':
      return '☁️';
    case '09':
      return '🌧️';
    case '10':
      return '🌦️';
    case '11':
      return '🌩️';
    case '13':
      return '❄️';
    case '50':
      return '🌫️';
  }
};

const getWeather = async (city) => {
  const api_lang = 'en';
  const api_units = 'metric';
  const token = process.env.TOKEN ?? (await getKeyValue(DICTIONARY.token));
  if (!token) {
    throw new Error('Token is missing, need add API_TOKEN from openweathermap.org');
  }

  const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: city,
      appid: token,
      lang: api_lang,
      units: api_units,
    },
  });

  return data;
};

export { getWeather, getIcon };
