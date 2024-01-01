import { getKeyValue } from './storage.service.js';
import { TOKEN_DICTIONARY } from './dictionary.js';
import axios from 'axios';

const getWeather = async (city) => {
  const api_lang = 'en';
  const api_units = 'metric';
  const token = process.env.TOKEN ?? (await getKeyValue(TOKEN_DICTIONARY.token));
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

export { getWeather };
