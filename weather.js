#!/usr/bin/env node

import { getArgs } from './helpers/args.js';
import { getWeather } from './services/api.serviece.js';
import { printError, printHelp, printSuccess } from './services/log.service.js';
import { getKeyValue, saveKeyValue } from './services/storage.service.js';

import { TOKEN_DICTIONARY } from './services/dictionary.js';

const saveToken = async (token) => {
  if (!token.length) {
    printError('You didn`t give a token');
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess('Token has been saved');
  } catch (error) {
    printError(e.message);
  }
};

const showWeather = async () => {
  try {
    const city = 'Antalya';
    const weather = await getWeather(city);
    console.log(weather);
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
    printSuccess('Save city');
  }
  if (args.t) {
    return saveToken(args.t);
  }
  showWeather();
};

initCLI();
