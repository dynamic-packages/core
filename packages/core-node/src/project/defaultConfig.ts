import { IUserProjectConfig, LoggerLevel } from '@dynamics/core-types';

const config: IUserProjectConfig = {
  log: {
    level: LoggerLevel.info
  },
  package: {
    ignored: [],
    startup: [],
    stopped: [],
  },
  path: {
    root: './'
  }
};

export default config;
