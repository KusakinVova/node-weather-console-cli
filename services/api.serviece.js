import https from 'https';
import { getKeyValue } from './storage.service.js';
import { TOKEN_DICTIONARY } from './dictionary.js';
import { error } from 'console';
import axios from 'axios';

const getWeather = async (city) => {
  const api_lang = 'en';
  const api_units = 'metric';
  const token = await getKeyValue(TOKEN_DICTIONARY.token);
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

  //   const url = new URL('https://api.openweathermap.org/data/2.5/weather');
  //   url.searchParams.append('q', city);
  //   url.searchParams.append('appid', token);
  //   url.searchParams.append('lang', 'en');
  //   url.searchParams.append('units', 'metric');

  //   const result = await https.get(url, (response) => {
  //     let res = '';
  //     response.on('data', (chunk) => (res += chunk));
  //     response.on('end', () => {
  //       console.log(res);
  //     });
  //   });

  //   console.log(url);
  //   console.log(result);
};

export { getWeather };
