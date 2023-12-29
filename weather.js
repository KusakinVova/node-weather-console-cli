#!/usr/bin/env node

import { getArgs } from './helpers/args.js';
import { printError, printHelp, printSuccess } from './services/log.service.js';
import { getKeyValue, saveKeyValue } from './services/storage.service.js';

const saveToken = async (token) => {
  try {
    await saveKeyValue('token', token);
    printSuccess('Token has been saved');
  } catch (error) {
    printError(e.message);
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);
  console.log(args);

  if (args.h) {
    printHelp();
  }
  if (args.s) {
    printSuccess('Save city');
  }
  if (args.t) {
    return saveToken(args.t);
  }
};

initCLI();
