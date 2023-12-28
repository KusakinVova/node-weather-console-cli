import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
  console.log(chalk.bgRed('ERROR' + ' ' + error));
};

const printSuccess = (message) => {
  console.log(chalk.bgGreen('SUCCESS' + ' ' + message));
};

const printHelp = () => {
  console.log(
    dedent`${chalk.bgCyan(' HELP ')}
    Without params - show weather
    -s [CITY] - for install
    -h - show Help 
    -t [API_KEY] - save token 
    `,
  );
};

export { printError, printSuccess, printHelp };
