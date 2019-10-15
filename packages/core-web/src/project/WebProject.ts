import { deepFreeze, logger } from '@dynamics/core-common';
import {
  IProject, IProjectConfig
} from '@dynamics/core-types';

declare function requirejs(moduleNames: string[], cb?: (modules: any) => void): void;

const CONFIG_FILE_NAME = 'dynamic.config.json';
const CONFIG_FILE_NOT_FOUND = `${CONFIG_FILE_NAME} not found.`;

class WebProject implements IProject {

  private _config!: Promise<IProjectConfig>;

  constructor() {
    this._config = this._initConfig();
  }

  async getConfig() {
    return this._config;
  }

  private _initConfig(): Promise<IProjectConfig> {
    return new Promise((resolve, reject) => {
      requirejs([`json!${CONFIG_FILE_NAME}`], (config: IProjectConfig | void) => {
        if (config) {
          resolve(deepFreeze(config));
        } else {
          reject(new Error(CONFIG_FILE_NOT_FOUND));
        }
      });
    });
  }
}

export default WebProject;
