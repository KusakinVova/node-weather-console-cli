#!/usr/bin/env node

import { getArgs } from './helpers/args.js';

const initCLI = () => {
  const args = getArgs(process.argv);
  console.log(args);

  if (args.h) {
    console.log('Show help');
  }
  if (args.s) {
    console.log('Save city');
  }
  if (args.t) {
    console.log('Save token');
  }
};

initCLI();
