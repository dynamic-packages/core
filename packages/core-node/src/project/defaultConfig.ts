import { IProjectConfig, LoggerLevel } from '@dynamics/core-types';

const config: IProjectConfig = {
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
