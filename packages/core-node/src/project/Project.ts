import { logger } from '@dynamics/core-common';
import {
  IProject, IProjectConfig, IRuntimeProjectConfig
} from '@dynamics/core-types';
import merge from 'lodash.merge';
import walk from '../fs/walk';
import defaultConfig from './defaultConfig';

const CONFIG_FILE_NAME = 'dynamic.config.js';

class Project implements IProject {

  constructor(runtimeConfig: IRuntimeProjectConfig) {
    const cwd = process.cwd();
    const tmpConfig = merge(defaultConfig, runtimeConfig);
    walk(CONFIG_FILE_NAME, cwd,
      (result) => {
        //
      },
      (error) => {
        logger.error(error);
      }
    );
  }

  getConfig(): IProjectConfig {
    return {
      log: {
        level: 0
      },
      package: {
        ignored: [],
        startup: [],
        stopped: [],
      },
      path: {
        root: ''
      }
    };
  }
}

export default Project;
