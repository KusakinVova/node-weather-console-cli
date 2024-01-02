#!/usr/bin/env node

import { getArgs } from './helpers/args.js';
import { getWeather, getIcon } from './services/api.service.js';
import { printError, printHelp, printSuccess, printWeather } from './services/log.service.js';
import { getKeyValue, saveKeyValue } from './services/storage.service.js';

import { DICTIONARY } from './services/dictionary.js';

const saveToken = async (token) => {
  if (!token.length) {
    printError('You didn`t give a token');
    return;
  }
  try {
    await saveKeyValue(DICTIONARY.token, token);
    printSuccess('Token has been saved');
  } catch (error) {
    printError(e.message);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError('You didn`t give a city');
    return;
  }
  try {
    await saveKeyValue(DICTIONARY.city, city);
    printSuccess('City has been saved');
  } catch (error) {
    printError(e.message);
  }
};

const showWeather = async (newCity) => {
  try {
    let res;

    if (newCity !== '' && newCity !== undefined) {
      res = await getWeather(newCity);
      saveCity(newCity);
    } else if (process.env.CITY) {
      res = await getWeather(process.env.CITY);
    } else {
      const city = await getKeyValue(DICTIONARY.city);
      if (city !== undefined) {
        res = await getWeather(city);
      } else {
        printError('Please setup you CITY');
        return;
      }
    }
    printWeather(res, getIcon(res.weather[0].icon));
    // console.log(weather);
  } catch (e) {
    if (e?.response?.status == 404) {
      printError('City is not correct');
    } else if (e?.response?.status == 401) {
      printError('Token is not correct');
    } else {
      printError(e.message);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);
  //   console.log(process.env?.TOKEN);

  if (args.h) {
    printHelp();
  }
  if (args.s) {
    showWeather(args.s);
    return;
  }
  if (args.t) {
    return saveToken(args.t);
  }

  return showWeather();
};

initCLI();
