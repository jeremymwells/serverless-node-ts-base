import { InitConfig } from './init.config';

const initConfig = new InitConfig();

// add any static configuration here

export const config = {
  ...initConfig,
  up: true,
  'env.STATIC_FILES_PATH': process.env.STATIC_FILES_PATH,
};
