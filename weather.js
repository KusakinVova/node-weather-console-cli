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
  const city = 'Antalya';
  const data = await getWeather(city);
  console.log(data);
};

const initCLI = () => {
  const args = getArgs(process.argv);
  //   console.log(args);

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
