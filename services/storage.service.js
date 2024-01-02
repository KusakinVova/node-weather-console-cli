import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

const filePath = join(homedir(), 'weather-cli-data.json');

const saveKeyValue = async (key, value) => {
  let data = {};
  if (await isExist(filePath)) {
    const fileData = await promises.readFile(filePath);
    data = JSON.parse(fileData);
  }
  data[key] = value;
  await promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key) => {
  if (await isExist(filePath)) {
    const fileData = await promises.readFile(filePath);
    const data = JSON.parse(fileData);
    return data[key];
  }
  return undefined;
};

const isExist = async (path) => {
  // this function check variable PATH
  try {
    await promises.stat(path);
    return true;
  } catch (error) {
    return false;
  }
};

export { saveKeyValue, getKeyValue };
