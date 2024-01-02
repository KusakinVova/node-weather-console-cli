import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
  console.log(`${chalk.bgRed(' ERROR ')}  ${error}`);
};

const printSuccess = (message) => {
  console.log(`${chalk.bgGreen(' SUCCESS ')}  ${message}`);
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

const printWeather = (res, icon) => {
  console.log(
    dedent`${chalk.bgYellow(' WEATHER ')} WEATHER in city ${res.name}
    ${icon}  ${res.weather[0].description}
    Temperature: ${res.main.temp} (like as ${res.main.feels_like})
    Humidity: ${res.main.humidity}%
    Wind speed: ${res.wind.speed}`,
  );
};

export { printError, printSuccess, printHelp, printWeather };
