import { deepFreeze, logger } from '@dynamics/core-common';
import {
  IProject,
  IProjectConfig,
  IRuntimeProjectConfig,
  IUserProjectConfig
} from '@dynamics/core-types';
import merge from 'lodash.merge';
import path from 'path';
import walk from '../fs/walk';
import defaultConfig from './defaultConfig';

const CONFIG_FILE_NAME = 'dynamic.config.js';
const CONFIG_FILE_NOT_FOUND = `${CONFIG_FILE_NAME} not found, default config is used.`;

class NodeProject implements IProject {

  private _config!: Promise<IProjectConfig>;

  constructor(runtimeConfig: IRuntimeProjectConfig) {
    this._config = this._initConfig(runtimeConfig);
  }

  async getConfig() {
    return this._config;
  }

  private _initConfig(runtimeConfig: IRuntimeProjectConfig): Promise<IProjectConfig> {
    return new Promise((resolve, reject) => {
      const cwd = process.cwd();
      const mergedConfig: IUserProjectConfig = merge(defaultConfig, runtimeConfig);
      walk(CONFIG_FILE_NAME, cwd,
        (result) => {
          let config: IUserProjectConfig;
          let dir: string;
          if (result) {
            try {
              dir = result.dir;
              config = merge(mergedConfig, require(result.file));
            } catch (e) {
              logger.warn(e);
              dir = cwd;
              config = mergedConfig;
            }
          } else {
            logger.info(CONFIG_FILE_NOT_FOUND, '%format');
            dir = cwd;
            config = mergedConfig;
          }
          resolve(deepFreeze(getPathResolvedConfig(dir, config)));
        },
        (error) => {
          logger.error(error);
          reject(error);
        }
      );
    });
  }
}

function getPathResolvedConfig(
  dir: string, config: IUserProjectConfig
): IProjectConfig {
  return merge(config, {
    realPath: {
      root: path.resolve(dir, config.path.root)
    }
  });
}

export default NodeProject;
